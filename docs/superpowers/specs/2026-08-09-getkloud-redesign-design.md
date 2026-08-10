# GetKloud Modern Multi-Page Redesign

**Date:** 2026-08-09  
**Goal:** Production-ready multi-page marketing site to replace getkloud.in  
**Stack:** Plain HTML / CSS / JS  

## Decisions

- **Scope:** Full site — Home, About, How We Work, Contact, Services hub + 7 service pages  
- **Visual:** Daylight Steel (light atmosphere, teal-steel accent `#1F6F8B`, ink `#173246`)  
- **Homepage:** Full-bleed hero + Cloud / Hosting / Email gateways  
- **Motion:** Flow-first sitewide; cinematic heroes on Home, Cloud, Email, Website Development  
- **Leads:** mailto + WhatsApp + tel (no server)  
- **Architecture:** Shared shell CSS/JS; real multi-page HTML for SEO  

## Structure

```
index.html, about.html, how-we-work.html, contact.html
services/{index,cloud-services,email-solutions,lead-generation,
          google-ranking,ecommerce,website-development,business-automation}.html
css/{tokens,base,layout,components,animations}.css
js/{site,animate,forms}.js
assets/
```

## Content source

Service copy, process steps, contact details, and client names adapted from https://getkloud.in/
