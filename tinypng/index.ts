import fs from 'fs';
import path from 'path';
import tinify from 'tinify';

function setUpTinify() {
  if (!process.env.TINIFY_KEY) {
    console.log(
      'Run with: TINIFY_KEY=$YOUR_API_KEY BLOG_DIR=$YOUR_BLOG_DIRECTORY npm start',
    );
    process.exit(1);
  }

  tinify.key = process.env.TINIFY_KEY;
}

const docusaurusDirectory = '../';

async function getBlogDirsOrderedDescending() {
  const blogDirs = (
    await fs.promises.readdir(path.resolve(docusaurusDirectory, 'blog'))
  ).filter((file) =>
    fs.statSync(path.resolve(docusaurusDirectory, 'blog', file)).isDirectory(),
  );

  blogDirs.sort().reverse();

  return blogDirs;
}

function getImageFilesFromDirectory(dir: string) {
  return fs
    .readdirSync(path.resolve(docusaurusDirectory, 'blog', dir))
    .filter(
      (file) =>
        file.endsWith('.jpg') ||
        file.endsWith('.jpeg') ||
        file.endsWith('.webp') ||
        file.endsWith('.png'),
    )
    .map((file) => path.resolve(docusaurusDirectory, 'blog', dir, file))
    .filter((file) => fs.statSync(file).size > 0);
}

async function processImageFiles(imageFiles: string[]) {
  let processed = 0;
  let totalOriginalSizeKb = 0n;
  let totalNewSizeKb = 0n;
  let failed: string[] = [];

  for (const imageFilePath of imageFiles) {
    try {
      console.log(`
🖼️  Processing ${imageFilePath}
`);
      const originalImageFilePrefix = imageFilePath.substring(
        0,
        imageFilePath.lastIndexOf('.'),
      );
      const originalImageFileExtension = imageFilePath.substring(
        imageFilePath.lastIndexOf('.') + 1,
      );

      const originalStats = await fs.promises.stat(imageFilePath, {
        bigint: true,
      });
      const originalSizeKb = originalStats.size / 1024n;

      const source = tinify.fromFile(imageFilePath);

      const converted = imageFilePath.includes('/title-image.')
        ? source
            .resize({
              method: 'fit',
              width: 1200,
              height: 630,
            })
            // .convert({
            //   type: ['image/png'], // title images are always png because social media sharing doesn't support webp well enough
            // })
        : source.convert({
            type: ['image/webp', 'image/png'],
          });
      const convertedExtension = await converted.result().extension();
      const newImageFilePath = `${originalImageFilePrefix}.${convertedExtension}`;
      await converted.toFile(newImageFilePath);

      const newStats = await fs.promises.stat(newImageFilePath, {
        bigint: true,
      });
      const newSizeKb = newStats.size / 1024n;

      const imageFileName = path.basename(imageFilePath);
      const newImageFileName = path.basename(newImageFilePath);
      if (imageFileName !== newImageFileName) {
        await updateBlogPostImageReferences({
          originalImageFileExtension,
          convertedExtension,
          imageFilePath,
          imageFileName,
          newImageFileName,
        });
      }

      totalOriginalSizeKb += originalSizeKb;
      totalNewSizeKb += newSizeKb;

      console.log(`- 🔴 ${originalSizeKb}kb - ${imageFileName}
- 🟢 ${newSizeKb}kb - ${newImageFileName}
- 🔽 ${calculatePercentageReduction({ originalSizeKb, newSizeKb }).toFixed(
        2,
      )}% reduction

✅ Processed! (${++processed} of ${imageFiles.length})

----------------------`);
    } catch (e) {
      console.log(`\n❌ Failed to process ${imageFilePath}`);
      failed.push(imageFilePath);
    }
  }

  console.log(`
************************************************
* Total savings for ${imageFiles.length} images 
- 🔴 ${totalOriginalSizeKb}kb
- 🟢 ${totalNewSizeKb}kb
- 🔽 ${calculatePercentageReduction({
    originalSizeKb: totalOriginalSizeKb,
    newSizeKb: totalNewSizeKb,
  }).toFixed(2)}% reduction
************************************************
`);

  if (failed.length > 0) console.log('Failed to process', failed);
}

function calculatePercentageReduction({
  originalSizeKb,
  newSizeKb,
}: {
  originalSizeKb: bigint;
  newSizeKb: bigint;
}) {
  return (
    ((Number(originalSizeKb) - Number(newSizeKb)) / Number(originalSizeKb)) *
    100
  );
}

async function updateBlogPostImageReferences({
  originalImageFileExtension,
  convertedExtension,
  imageFilePath,
  imageFileName,
  newImageFileName,
}: {
  originalImageFileExtension: string;
  convertedExtension: string | void;
  imageFilePath: string;
  imageFileName: string;
  newImageFileName: string;
}) {
  const directory = path.dirname(imageFilePath);

  const indexMdPath = path.join(directory, 'index.md');
  const blogPostContent = await fs.promises.readFile(indexMdPath, 'utf-8');

  await fs.promises.writeFile(
    indexMdPath,
    blogPostContent.replaceAll(imageFileName, newImageFileName),
  );
  console.log(
    `- Image converted from ${originalImageFileExtension} to ${convertedExtension}. References updated in ${path.basename(
      indexMdPath,
    )}`,
  );

  await fs.promises.unlink(imageFilePath);
  console.log(`- Deleted original image: ${path.basename(imageFilePath)}`);
}

async function run() {
  setUpTinify();

  let directory = '';

  if (process.env.BLOG_DIR) {
    directory = process.env.BLOG_DIR;
  } else {
    const blogDirs = await getBlogDirsOrderedDescending();
    if (blogDirs.length === 0) {
      console.log(`No blog directories found`);
      process.exit(1);
    } else {
      directory = blogDirs[0];
    }
  }

  const imageFiles = getImageFilesFromDirectory(directory);
  console.log(`Found ${imageFiles.length} image files in ${directory}`);
  await processImageFiles(imageFiles);
}

// do it!
run();

// delete this as unused? Could compress everything in the blog directory
async function getImageFiles() {
  const blogDirs = await getBlogDirsOrderedDescending();

  const imageFiles = blogDirs.flatMap((dir) => getImageFilesFromDirectory(dir));

  imageFiles.reverse();

  return imageFiles;
}
