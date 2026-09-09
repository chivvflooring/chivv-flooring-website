# CHIVV Flooring Website

Static HTML/CSS/JavaScript lead-generation website for CHIVV Flooring / Bento’s Group, serving Metro Atlanta and North Atlanta.

## Business rules

- Canonical domain: `https://chivvflooring.com`
- Phone: `678-571-7028` / `tel:+16785717028`
- Lead with CHIVV Flooring’s flooring focus and include the owner-requested tile, bathroom and shower remodeling services.
- Preserve the red/black visual identity.
- Never fabricate reviews, ratings, certifications, warranties, addresses, project details, or other claims.
- Do not change DNS, Netlify domain settings, Google Search Console, or publish production changes without owner approval.

## Local validation

Run:

```bash
npm run check
```

The audit checks page metadata, canonical URLs, sitemap coverage, local links, image accessibility, the required phone CTA, and accidental use of the `www` hostname.

## Current routes

- Core: home, about, reviews, contact
- Services: hardwood installation, refinishing, engineered hardwood, LVP/laminate, stairs/trim, floor preparation, flooring replacement, tile installation, bathroom remodeling, shower remodeling
- Areas: Alpharetta, Johns Creek, Milton, Roswell, Cumming, Sandy Springs, Buckhead (Atlanta neighborhood), Marietta, Kennesaw, Atlanta

The form is configured for Netlify Forms and redirects successful submissions to `/thank-you.html`.

## Review and release status

Read REVIEW-2026-09-09.md for completed changes, test results, unresolved external checks and release requirements. Read CLAIMS-TO-VERIFY.md for preserved claims that need evidence.

These changes are prepared as a review commit, without moving main or creating a branch that could trigger hosting. No deployment is authorized. Retain the commit and verify automatic hosting behavior before attaching it to a branch or integrating it.

Run npm run check in a working Node.js checkout. This runs the existing audit and lead-attribution test plus the SEO and estimate-form suites. No dependencies need to be installed.

Serve the repository at the root of a local HTTP server for browser review; root-relative links intentionally do not target file:// previews or a repository subdirectory. Preserve the current hosting and domain configuration until its behavior is verified.

The estimate form uses native multipart POST. The optional photo input accepts one image; the 5 MB client-side limit leaves room under the host's documented 8 MB request limit. Client validation is a usability aid, not server-side security. Netlify form detection, notifications and a real received lead must be verified separately.
