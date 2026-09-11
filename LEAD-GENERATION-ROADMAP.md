# CHIVV Flooring Customer Acquisition Roadmap

Updated September 11, 2026. Objective: move a qualified Metro Atlanta homeowner from a relevant landing page to Call, Text, or a confirmed estimate request, then measure lead quality without sacrificing accuracy or privacy.

## Channel plan

| Channel | Target customer and market | Landing page | Conversion action | Tracking method | Owner action required | Website action required/status |
|---|---|---|---|---|---|---|
| **A. Google organic search** | Homeowners actively researching priority flooring/remodeling services; Johns Creek/30022, Sandy Springs, Buckhead/Atlanta, Alpharetta, Roswell, and Milton first | Closest canonical service or substantive location page | Call, Text, Estimate | Search Console queries/pages plus GA4 events and confirmed-lead reconciliation | Inspect priority URLs, monitor queries, provide verified project facts/photos | Canonicals, sitemap, internal links, local/service content, and CTAs implemented; continue evidence-led improvements, not doorway pages |
| **B. Google Maps / GBP** | Nearby high-intent searchers in the verified service area | Tagged homepage, service page, or location page | Call, website Estimate, GBP interaction | GBP Performance plus stable `utm_source=google&utm_medium=organic&utm_campaign=gbp_*`; reconcile leads | Maintain one eligible profile, verify categories/services/areas/hours, publish authorized photos, respond to genuine reviews | GBP landing attribution and plan implemented; install approved analytics ID when supplied |
| **C. Google paid search readiness** | High-intent service searchers in owner-approved ZIPs/areas | Matching service page or estimate page | Confirmed Estimate or phone lead | Google Ads auto-tagging (`gclid`), UTMs, GA4/GTM conversions, call reporting configured by owner | Approve budget, account, geographic exclusions, keywords, conversion values, privacy and call-tracking approach; do not launch until validation | `gclid`, UTM, landing and page context persist; never swap the published phone without explicit approval |
| **D. Instagram/Facebook organic** | Visual-research homeowners considering transformations and education | Matching service guide; verified local page only for genuinely local content | Text, Call, Estimate | Platform-tagged UTMs and website event funnel | Verify profiles, secure photo permissions, publish factual content, answer messages | Social landing support and campaign matrix implemented |
| **E. Instagram/Facebook paid readiness** | Homeowners by approved service area and service interest, after a defined qualification standard | One service-specific page per test | Confirmed Estimate; qualified lead downstream | Platform UTMs, approved Pixel/CAPI, GA4 events, secure offline lead status | Approve accounts, budget, consent/privacy, creative rights, audience, and qualified-lead definition; do not spend yet | No pixel ID invented; provide ID/configuration before implementation and test before launch |
| **F. Genuine review generation** | Actual customers after a real project milestone | Owner-verified Google review destination; `/reviews.html` for reputation context | Honest review or referral | GBP review trend and secure request log; no review gating | Ask consistently without incentives, verify link, respond without private details | Existing reputation page remains; never fabricate or republish without permission |
| **G. Referral/direct traffic** | Past-customer referrals and homeowners who know CHIVV | Homepage or `/contact.html` | Call, Text, Estimate | Direct/referrer attribution plus optional form discovery source; secure lead log | Use consistent domain/phone in referral materials and record source with consent | Funnel supports direct visits; contact form includes optional discovery source |
| **H. Conversion optimization** | All qualified visitors, especially mobile | Current landing page → `/contact.html` → `/thank-you.html` | Call, Text, confirmed Estimate | `phone_click`, `text_click`, `estimate_cta_click`, `estimate_form_attempt`, confirmed `generate_lead`; landing/page/campaign context | Define qualified lead and booked job, review monthly, authorize tests | Short form, optional photos, source context, and confirmed-only lead logic implemented; test one hypothesis at a time |

## Market/service sequence

1. **Johns Creek / 30022 and Country Club of the South service area:** hardwood installation/replacement/refinishing, engineered hardwood, stairs, and relevant remodeling. Do not claim an office or unverified project.
2. **Sandy Springs and Buckhead/Atlanta:** replacement, refinishing, engineered hardwood, stairs, bathroom/shower, and tile according to actual service fit.
3. **Alpharetta, Roswell, and Milton:** connect each local planning page to the relevant high-revenue service guide and estimate path.
4. **Brookhaven, Dunwoody, East Cobb/Marietta, Cumming, and Metro Atlanta:** maintain useful coverage; expand only when Search Console demand or verified project evidence supports it.

## Measurement architecture and privacy

- The site pushes five vendor-neutral data-layer events: `estimate_cta_click`, `estimate_form_attempt`, confirmed `generate_lead`, `phone_click`, and `text_click`.
- A lead is generated only on the thank-you page when a short-lived submission marker exists. A click or attempted submission is not a lead.
- Campaign, original landing page, external referrer host, and estimate source-page path are non-sensitive attribution dimensions. The site does not store or send form answers in browser analytics/storage.
- Owner must provide either a verified GA4 Measurement ID (`G-...`) or GTM Web Container ID (`GTM-...`), access/permissions, consent requirements, cross-domain needs, desired data retention, and approval of event/conversion mappings. No container ID has been invented.
- In the secure lead workflow, record confirmed, contacted, qualified, quoted, booked, lost, service, and broad market. Use aggregated outcome data to evaluate channels; do not expose private lead details to client-side analytics.

## 30/60/90-day owner roadmap

**Days 1–30:** deploy after review; run a real Netlify submission with an allowed photo; confirm notification delivery; provide analytics/GTM access; validate events in DebugView/Tag Assistant; verify GBP facts/categories/service areas; inspect sitemap and priority URLs in Search Console.

**Days 31–60:** publish authorized project/education content, begin the genuine review workflow, reconcile inquiries with confirmed leads, and identify the highest-quality service/market combinations. Correct tracking before judging channels.

**Days 61–90:** improve the best-supported pages using real query and lead data; test one CTA/form hypothesis; prepare a tightly scoped paid-search or paid-social experiment only if the owner approves accounts, budget, privacy, geography, creative, and conversion validation. Do not measure success by traffic alone.

## Success scorecard

Review monthly: qualified leads, booked opportunities, qualification rate, confirmed estimate completion rate, phone/text inquiries, service/market mix, landing-page conversion rate, source/campaign completeness, cost per qualified lead (only if paid campaigns later launch), and reasons leads are unqualified. Protect trust: no fabricated locations, work, reviews, credentials, pricing, or claims.
