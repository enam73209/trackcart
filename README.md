# TrackCart

A production-style analytics engineering project built to master modern web analytics implementation from browser-side tracking to server-side tagging across multiple domains.

---

## Tech Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS

---

## Project Structure

```text
trackcart/
├── landing-site/
└── checkout-site/
```

### Applications

#### Landing Site

- Product listing
- Buy Now flow
- Browser-side GA4 tracking

#### Checkout Site

- Checkout experience
- Thank You page
- Browser-side GA4 tracking

---

## Deployment

### Landing Site

https://trackcart-phi.vercel.app/

### Checkout Site

https://trackcart-checkout.vercel.app/

---

## Analytics Progress

### Module 0

- ✅ GA4 Property created
- ✅ Two GA4 Web Data Streams
- ✅ Two deployed Next.js applications

### Module 1 – Segment 2

Implemented manual browser-side Google Analytics 4 integration using `gtag.js`.

#### Completed

- ✅ Manual GA4 installation
- ✅ Separate Measurement IDs for each application
- ✅ Environment-aware Debug Mode
- ✅ Automatic `page_view` tracking
- ✅ GA4 DebugView verification
- ✅ Browser Network (`collect`) verification

---

## Current Analytics Architecture

```text
Browser
    │
    ▼
gtag.js
    │
    ▼
Google Analytics 4
```

---

## Upcoming Modules

- Manual Ecommerce Event Tracking
- Cross-Domain Tracking
- Google Ads Attribution
- Google Tag Manager (Web)
- Data Layer Architecture
- Advanced Ecommerce Tracking
- Meta Pixel
- Meta Conversion API
- Server-side GTM
- Enhanced Conversions
- Consent Mode v2
- Measurement Protocol

---

## Learning Goal

The objective of this project is to learn how to design, implement, debug, and optimize a production-ready analytics stack rather than simply installing tracking tools.
