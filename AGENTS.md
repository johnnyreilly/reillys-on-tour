# CLAUDE.md

> Also see [AGENTS.md](./AGENTS.md) — shared project documentation for other AI coding agents.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A travel blog documenting the Reilly family's adventures, built with **Docusaurus 3.10.0** and deployed to GitHub Pages at `https://johnnyreilly.github.io/reillys-on-tour/`.

## Common Commands

```bash
npm start          # Dev server with hot reload
npm run build      # Generate static site in build/
npm run serve      # Serve the built site locally
npm run typecheck  # Type-check TypeScript files
npm run clear      # Clear generated files
```

No linting or test scripts are configured.

## Architecture

- **`blog/`** — 64 travel blog posts (2006–2025), each in its own directory containing `index.md` and associated images. This is the primary content.
- **`static/`** — Static assets served at the root (favicons, profile images, web manifest).
- **`src/`** — Minimal custom code; only `src/css/custom.css` is actively used.
- **`docusaurus.config.ts`** — Main config: site metadata, Google Analytics, JSON-LD structured data, navbar/footer, blog plugin settings.
- **`from-blogger-to-docusaurus/`** — One-off migration utility (Blogger XML → Docusaurus Markdown). Not part of the site build.

## Blog Post Structure

Each post lives at `blog/YYYY-MM-DD-slug/index.md` with frontmatter:

```yaml
---
title: "Post Title"
authors: johnnyreilly
tags: []
hide_table_of_contents: false
slug: post-slug
image: ./image.jpg
---
```

Posts route to the site root (`/`), with the archive at `/blog`. The docs feature is disabled — this is a pure blog site.

## Deployment

CI/CD runs via GitHub Actions (`.github/workflows/`). On push to `main`, the site builds and deploys to GitHub Pages automatically using Node 22.
