# CHIVV Flooring Website

Static lead-generation website for CHIVV Flooring, serving Metro Atlanta and North Atlanta.

## Business rules

- Canonical domain: `https://chivvflooring.com`
- Phone: `678-571-7028` / `tel:+16785717028`
- Position CHIVV Flooring as a flooring specialist.
- Preserve the red/black visual identity.
- Never fabricate reviews, ratings, certifications, warranties, addresses, project details, or other claims.
- Do not change DNS, Netlify domain settings, Google Search Console, or publish production changes without owner approval.

## Local validation

Run:

```bash
npm run audit
```

The audit checks page metadata, canonical URLs, sitemap coverage, local links, image accessibility, the required phone CTA, and accidental use of the `www` hostname.

## Current routes

- Core: home, about, reviews, contact
- Services: hardwood installation, refinishing, engineered hardwood, LVP/laminate, stairs/trim, floor preparation, flooring replacement, and bathroom/shower/tile remodeling
- Priority areas: Johns Creek/30022, Alpharetta, Sandy Springs, Buckhead/Atlanta, Roswell, Milton, Brookhaven, Dunwoody, East Cobb/Marietta, and Cumming

The form is configured for Netlify Forms and redirects successful submissions to `/thank-you.html`. The front end emits privacy-conscious `estimate_cta_click`, `estimate_form_attempt`, `generate_lead`, `phone_click`, and `text_click` events with the page path but no form contents. These `dataLayer` events remain inert until an owner-approved analytics container is installed.
