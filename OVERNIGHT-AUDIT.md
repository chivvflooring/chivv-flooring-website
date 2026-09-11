# Overnight Customer-Acquisition Audit

Updated September 11, 2026. Scope: the Phase 4 repository snapshot available in this environment. No deployment or external-account change was made.

## Executive report

### A. What was audited

All 26 HTML documents (24 canonical/indexable routes plus the noindex 404 and confirmation routes), shared CSS and JavaScript, navigation, footer and mobile action bar, eight service pages, thirteen area pages, form and Netlify markup, thank-you conversion, campaign attribution, metadata, headings, canonicals, sitemap/robots, JSON-LD, security headers, internal links, images, accessibility, responsive rules, repository history, automated tests and documentation were reviewed.

### B. What was fixed

- Removed the unsupported `priceRange` value from business JSON-LD everywhere. No address, rating, review, credential or other unsupported business claim was added.
- Standardized high-intent hero buttons on the homepage and all service/area pages to **Request a Free In-Home Estimate** while preserving the existing phone, SMS, form URLs and attribution behavior.
- Added a keyboard skip link and explicit main-content target to every page, expanded visible focus treatment to links/buttons and preserved minimum 48px primary-button targets.
- Expanded the audit to reject duplicate titles/descriptions, missing language/skip landmarks, unsupported rating/review/pricing schema, and regression of the primary CTA wording.

### C. What was improved

The site now states the requested primary conversion more consistently and has stronger keyboard navigation. Automated checks guard the most costly acquisition regressions. Existing Phase 1–4 content, canonical architecture, Netlify form name, upload support, honeypot, source capture, short-lived confirmation marker and no-PII analytics design remain intact.

### D. Test results

`npm run check` validates metadata, unique canonicals, exact sitemap parity, local links/assets, JSON-LD parsing and factual guardrails, Call/Text/Estimate CTAs, form architecture and attribution. The lead-source suite covers tagged arrival, internal CTA context, form attempt, confirmed lead, refresh deduplication, source replacement, blocked/malformed storage, expiry and direct traffic. Static routes were also served locally and checked with HTTP requests. Real Netlify delivery, external analytics dispatch, search results and device phone/SMS handlers still require post-deployment verification.

### E. Competitive findings

Live search and social research was attempted, but outbound browsing was denied by the environment proxy (HTTP 401/403). No competitor was represented as a current search-result winner without evidence. The reusable research matrix and responsible follow-up are in `COMPETITOR-RESEARCH.md`. Common opportunity hypotheses requiring live validation are: immediate mobile contact choices, service-intent landing pages, genuine project proof, practical FAQs and a clear estimate process.

### F. SEO opportunities

1. Keep hardwood installation, engineered hardwood, replacement and refinishing as separate intent destinations.
2. Use the existing substantive combined bathroom/shower/tile guide rather than thin city-service permutations.
3. Strengthen only pages that receive impressions or have verified project evidence; do not create doorway pages.
4. Add owner-approved case studies with factual service, material and broad service area.
5. Use Search Console query/page data to refine titles and copy after deployment rather than guessing search volume.

### G–J. Channel readiness

- **GBP:** maintain one eligible service-area profile; owner actions are separated from code in `GOOGLE-BUSINESS-PROFILE-PLAN.md`.
- **LSA:** complete verification externally, then validate landing links, response workflow and qualified outcomes; see `LEAD-GENERATION-ROADMAP.md`.
- **Google Ads:** service-led campaigns, location controls, negatives, UTMs and launch gates are in `GOOGLE-ADS-READINESS.md`.
- **Instagram/Facebook:** an evidence-led organic/paid framework and owner requirements are in `SOCIAL-LEAD-PLAN.md`; 30 safe placeholder concepts are in `30-DAY-SOCIAL-CONTENT-PLAN.md`.

### K. Owner input required

Verified service scope and service areas; legitimate GBP/LSA status; hours; insurance/license/credential wording if it may be published; GA4/GTM and Meta identifiers plus consent decisions; Netlify notification recipients; ad budget and lead-value assumptions; approved project photos/video and factual caption sheets; permission to publish; genuine review links; and downstream won/lost/revenue outcomes.

### L. Top 10 next actions by expected business value

1. Submit one deployed end-to-end Netlify estimate and confirm receipt plus one `generate_lead`.
2. Complete LSA verification without shortcuts; define rapid owner response and lead-dispute procedures.
3. Fully verify and complete one legitimate GBP, including service areas, services, hours and estimate URL.
4. Connect an owner-controlled analytics implementation and validate the five-event funnel without PII.
5. Start the secure lead-quality log described in `LEAD-QUALITY-MEASUREMENT.md`.
6. Obtain 10–20 owner-approved project photo/video sets with factual scope sheets.
7. Publish genuine project evidence and request reviews consistently without gating or incentives.
8. Use Search Console data to prioritize existing pages and content updates.
9. Pilot tightly bounded search ads only after conversion and qualification tracking passes.
10. Run the 30-day organic calendar, measure qualified inquiries, and reuse only proven topics in paid tests.

### M. Blocked by external access

Latest remote `main` could not be fetched because this checkout has no Git remote. Public search/social access failed through the environment proxy. Live domain headers, Netlify processing, Search Console, GBP, LSA, GA4/GTM, Google Ads and Meta accounts were not accessed. Browser automation packages are not present; real-device QA remains an owner acceptance step.

### N. What should not be done

Do not create fake offices, city profiles, doorway pages, fabricated reviews/ratings/projects, broad untargeted ad campaigns, unverified schema claims, stock imagery presented as CHIVV work, tracking IDs guessed in source, analytics containing form PII, or a conversion fired on click/attempt. These actions create policy, trust, measurement and wasted-spend risk.

## Prioritized opportunity backlog

| Priority | Problem / business impact | Recommendation | Implemented | Owner input | External platform |
|---|---|---|---|---|---|
| P0 | End-to-end delivery cannot be proven locally; missed forms would lose leads | Deployed Netlify submission and notification test | No | Recipient and test authorization | Netlify |
| P1 | Unsupported pricing schema could misrepresent the business | Remove and prevent regression | Yes | No | No |
| P1 | Primary CTA language varied | Standardize free in-home estimate CTA | Yes | No | No |
| P1 | Events are inert without approved analytics | Install/validate owner-controlled GA4 or GTM | No | ID, access, consent | GA4/GTM |
| P1 | Lead counts do not show profitability | Record qualification, estimate and revenue outcomes securely | Documentation | Workflow owner | CRM/sheet |
| P1 | Limited genuine project media constrains trust and social output | Supply authorized before/process/after sets and facts | No | Required | GBP/social |
| P1 | LSA is pending | Finish legitimate verification and response workflow | No | Required | Google LSA |
| P2 | Keyboard users lacked a direct content skip | Add skip links and stronger focus/tap treatment | Yes | No | No |
| P2 | SEO decisions lack query/impression evidence | Review Search Console monthly | No | Access | Search Console |
| P2 | Paid search may waste spend before qualification is measured | Use service/location structure, negatives and launch gates | Documentation | Budget/value | Google Ads |
| P3 | Retargeting may help later but adds consent/complexity | Consider only after traffic, rights and privacy decisions | No | Required | Meta/Google |

## Media and performance notes

Two WebP files (about 132KB and 160KB) are used for visible project photography; JPG fallbacks remain larger but are not loaded by page markup. Images have intrinsic dimensions, descriptive alt text, async decoding, and below-fold images are lazy loaded. The hero is intentionally eager/high priority. CSS and JavaScript are small and local; no font, analytics or third-party render-blocking script is installed. Most valuable next media: authorized whole-room before/after pairs, substrate/removal, glue-down and nail-down process, stair details, refinishing progression, bathroom/shower waterproofing/process and finished wide/detail views—with a factual owner-approved caption sheet.

## Security and privacy notes

No account credentials should be committed. Current front-end storage is session-scoped, time-limited and restricted to campaign/path/referrer-host fields plus a one-use confirmation marker. Form responses and uploaded images are not copied into analytics or browser storage. Security headers deny camera/geolocation/microphone use, set HSTS, frame and MIME protections, and use a strict-origin referrer policy.
