# Crawler (Crawl4AI Integration)

This directory contains web scraping modules using Crawl4AI.

## 📁 Structure

```
crawler/
├── extractors/     # Data extraction logic
├── parsers/        # HTML/content parsers
├── utils/          # Crawler utilities
└── tests/          # Crawler tests
```

## 🎯 Key Responsibilities

- Competitor website scraping
- Data extraction and parsing
- Rate limiting and politeness
- Anti-bot detection handling
- Raw data collection

## 📦 Key Dependencies (To Be Added)

- Crawl4AI
- Playwright (async)
- BeautifulSoup4 (parsing)
- playwright-stealth

## 🕷️ Crawling Strategy

1. **Stealth Mode**: Use browser fingerprint masking
2. **Rate Limiting**: Respect robots.txt and implement delays
3. **Retry Logic**: Exponential backoff for failed requests
4. **Data Extraction**: Structured data output (JSON)

## 📝 For Interns

Start with:
1. Understanding Crawl4AI async patterns
2. Learn about anti-bot detection and mitigation
3. Study extractor patterns in `extractors/`
4. Review parser implementations in `parsers/`

## ⚠️ Important Notes

- Always implement random delays between requests
- Use rotating proxies in production
- Test locally with rate limiting enabled
