# TheHomeFlipping.com Content Engine

Automated SEO blog content generator powered by AI. Generates daily blog posts targeting house flipping keywords to drive organic traffic.

## Features

- **AI-Powered Content Generation**: Uses OpenAI GPT-4 to create comprehensive, SEO-optimized articles
- **Keyword Management**: Priority-based keyword queue with pillar/spoke content strategy
- **Automated Scheduling**: Daily content generation via cron jobs
- **Git Integration**: Auto-commit and push to trigger site rebuilds
- **Logging**: Comprehensive logging for monitoring and debugging

## Quick Start

### 1. Install Dependencies

```bash
cd content-engine
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-api-key-here
```

### 3. Generate Content

```bash
# Generate 1 article
npm run generate

# Generate 3 articles
npm run generate 3

# Generate and publish
npm run publish 1
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run generate [n]` | Generate n articles (default: 1) |
| `npm run publish [n]` | Generate and publish n articles |
| `npm run schedule` | Start daily scheduler |
| `npm run schedule -- --now` | Run generation immediately |
| `node src/index.js stats` | Show keyword statistics |
| `node src/index.js next` | Show next keyword to generate |

## Keyword Management

Keywords are stored in `data/keywords.json`. Each keyword has:

- **keyword**: The target search term
- **searchVolume**: Monthly search volume
- **difficulty**: SEO difficulty score (0-100)
- **intent**: informational, commercial, or transactional
- **pillar**: Content pillar category
- **priority**: 1 (highest) to 3 (lowest)
- **status**: pending, generated, or published

### Adding Keywords

Edit `data/keywords.json` directly or use the import script:

```bash
npm run keywords:import path/to/keywords.csv
```

## Content Pillars

The engine organizes content into pillars for internal linking:

1. **getting-started**: Beginner guides
2. **financials**: ARV, ROI, profit calculations
3. **finding-deals**: Property sourcing
4. **renovation**: Rehab management
5. **financing**: Funding options
6. **business**: Legal, tax, structure
7. **tools**: Spreadsheets, calculators

## Scheduling

The scheduler runs daily at the configured hour (default: 9 AM).

### Running as a Service (PM2)

```bash
npm install -g pm2
pm2 start src/scheduler.js --name "content-engine"
pm2 save
pm2 startup
```

### Running with Windows Task Scheduler

Create a scheduled task to run:
```
node C:\path\to\content-engine\src\scheduler.js --now
```

## Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | - | Your OpenAI API key (required) |
| `OPENAI_MODEL` | gpt-4-turbo-preview | Model to use |
| `CONTENT_OUTPUT_DIR` | ../website/content/blog | Output directory |
| `MIN_WORD_COUNT` | 1500 | Minimum article length |
| `MAX_WORD_COUNT` | 2500 | Maximum article length |
| `DAILY_POST_COUNT` | 1 | Articles per day |
| `PUBLISH_HOUR` | 9 | Hour to publish (24h) |
| `AUTO_COMMIT` | false | Auto-commit to git |
| `AUTO_PUSH` | false | Auto-push to remote |

## Output Format

Generated articles are saved as MDX files with frontmatter:

```mdx
---
title: "How to Flip Houses for Beginners: Complete 2024 Guide"
description: "Learn how to flip houses..."
date: "2024-12-27"
slug: "how-to-flip-houses-for-beginners"
tags: ["house-flipping", "beginners", "real-estate"]
readingTime: 8
keyword: "how to flip houses for beginners"
pillar: "getting-started"
author: "TheHomeFlipping Team"
---

# How to Flip Houses for Beginners: Complete 2024 Guide

...article content...
```

## Cost Estimation

With GPT-4 Turbo:
- ~$0.03-0.05 per article (input + output tokens)
- 30 articles/month ≈ $1-2/month

## Troubleshooting

### "No pending keywords"
Add more keywords to `data/keywords.json` or reset status of existing keywords.

### "OpenAI API error"
Check your API key and ensure you have credits available.

### Articles not publishing
Verify `CONTENT_OUTPUT_DIR` path exists and is writable.

## License

MIT
