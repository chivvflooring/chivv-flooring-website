# CHIVV Flooring Phase 3 Audit and Implementation Record

Updated September 10, 2026. This repository has not been deployed by Codex.

## Pre-change inventory

The audit covered every HTML route, the six existing service pages, eight existing area pages, global header/footer/mobile CTAs, the Netlify estimate form and confirmation route, attribution JavaScript, structured data, canonicals, Open Graph/Twitter metadata, sitemap, robots rules, security headers, images, local links, 404 handling, and the automated audit scripts.

The inherited site had a sound static foundation: unique canonicals, indexable-page sitemap coverage, a Netlify multipart form with optional photos, a honeypot, first-touch UTM/referrer capture, attempt-versus-confirmed conversion separation, telephone tracking, responsive navigation, two genuine project images, and no hard-coded reviews. The largest gaps were absent text CTAs and tracking, no source-page context on form submissions, incomplete high-value remodeling/replacement coverage, shallow priority-area content, and no dedicated Sandy Springs, Brookhaven, Dunwoody, or East Cobb route.

## Phase 3 implementation

1. Added original service guides for flooring removal/replacement and bathroom, shower, walk-in conversion, and tile remodeling. These pages address distinct homeowner planning questions rather than multiplying city/service doorway pages.
2. Rebuilt Johns Creek/30022, Alpharetta, Buckhead/Atlanta and added Sandy Springs, Brookhaven, Dunwoody, and East Cobb/Marietta pages with useful scope, preparation, service-choice, estimate, and FAQ content. Country Club of the South appears only as a truthful service-area reference; no office or completed project is claimed.
3. Connected local pages to the relevant installation, engineered hardwood, replacement, refinishing, stair, bathroom, shower, and tile resources. Expanded the home-page service and priority-area discovery grids.
4. Added tap-to-text alongside call and estimate actions sitewide, including a three-action mobile bar.
5. Expanded the short Netlify form for city/ZIP and the new services while preserving project size, timing, details, optional photo upload, honeypot, and confirmation behavior.
6. Added privacy-conscious `page_context`, `text_click`, and `estimate_cta_click` attribution. Existing first-touch landing page, referrer host, UTM fields, `gclid`, form attempt, and confirmed lead behavior remain intact. Form contents are not put into browser storage or analytics events.
7. Added page-specific Service and BreadcrumbList structured data to new and rebuilt priority pages, always pointing to the one existing CHIVV Flooring business entity and never inventing an address, office, rating, review, credential, warranty, or project claim.
8. Expanded the automated audit to require text CTAs, funnel fields, and all conversion event hooks. Updated the sitemap for every indexable canonical URL.

## Owner follow-up (outside this repository)

1. Verify the exact public Google Business Profile name, primary category, secondary categories, service-area settings, phone, website URL, and hours in the profile itself. Keep one legitimate profile; do not create city listings without staffed, eligible locations.
2. Add the new service categories/services in Google Business Profile only when they accurately match work CHIVV Flooring currently performs. Link the profile website field to the canonical homepage and use tagged URLs for GBP posts/campaign links, for example `utm_source=google&utm_medium=organic&utm_campaign=gbp`.
3. Publish owner-approved project photos regularly to the legitimate profile. Supply factual city, material, and scope details so the website can later add real case studies without inventing neighborhood work.
4. Continue requesting reviews through the existing live Google review link, without incentives or fabricated language. Respond to reviews from the business account.
5. Connect an owner-controlled GA4/Google Tag Manager property, map `phone_click`, `text_click`, and confirmed `generate_lead` as conversions, and test consent/configuration before using reports.
6. Verify the apex-domain Search Console property, submit `https://chivvflooring.com/sitemap.xml`, and inspect priority URLs after an approved deployment.
7. Confirm Netlify notification recipients and submit one real end-to-end lead on the deployed site, including an allowed photo, to validate delivery and the thank-you conversion.
8. Replace or expand the two current project images only with CHIVV-owned photography and approved factual descriptions. Provide verified address, licensing, insurance, financing, warranty, and credential information before any such claims are added.

# Phase 4 Customer Acquisition Audit and Implementation Record

Updated September 11, 2026. The repository was audited from the Phase 3 production commit. The execution environment could not connect to the public domain through its network proxy, so live headers, deployed Netlify processing, analytics vendor delivery, and real-device rendering require owner verification after deployment.

## Scope and findings

The audit rechecked all 26 HTML documents: homepage, contact/estimate, confirmation, 404, about/reputation pages, eight priority service guides, and thirteen service-area pages. It also covered shared navigation/footer/mobile actions, all internal asset and page references, titles, descriptions, H1 counts, canonical mappings, JSON-LD parsing/business references, sitemap parity, robots directives, responsive CSS, image dimensions/alternative text, Netlify form markup, optional upload, attribution storage, and conversion event logic.

Phase 3's page coverage, local content, funnel fields, CTAs, canonicals, sitemap, and privacy protections were sound. The genuine defect found was that `page_context` on the submitted form always became `/contact.html`; therefore an estimate begun on a service or location page lost that source-page context. Confirmed `generate_lead` events also lacked landing, source-page, referrer, and campaign dimensions even though the form submission retained them.

The visible Text action was also confined to the mobile action bar on the homepage, six inherited service pages, and five inherited area pages. Desktop visitors on those pages did not have Text beside the primary Estimate and Call choices.

## Phase 4 changes

- Estimate CTA clicks now retain the non-sensitive source path for 30 minutes. The form uses that path as `page_context`, with the contact path as a safe fallback for direct visits.
- Added Text beside Estimate and Call in the hero of every service and location page and on the homepage, giving desktop, tablet, and mobile visitors the same short conversion choices.
- Form-attempt and confirmed-lead events now carry the allowed landing, source-page, referrer-host, and UTM attribution dimensions. The short-lived confirmation marker remains mandatory, is consumed once, and contains no name, email, phone, city, service selection, project description, photo, or other form response.
- Automated attribution tests now exercise an Instagram-tagged service arrival, estimate CTA transition, form attempt, confirmed lead, refresh deduplication, campaign replacement, blocked storage, malformed storage, expiration, and direct traffic.
- The repository audit now enforces exact canonical-to-file mapping, parses JSON-LD, rejects structured street/postal addresses, confirms the shared business entity reference, requires exact sitemap parity, checks robots directives, and validates the Netlify POST/multipart/honeypot/thank-you configuration.
- Added owner-ready Google Business Profile, social lead, and multichannel lead-generation plans. They explicitly separate repository work from owner-controlled accounts and prohibit invented profiles, IDs, locations, reviews, project claims, and ad spend.

## Owner verification required

1. Deploy only after review, then submit one genuine test estimate (including an allowed photo) and verify Netlify receipt, notification, redirect, and one confirmed lead event.
2. Supply an owner-controlled GA4 Measurement ID (`G-...`) or GTM Web Container ID (`GTM-...`), required access, consent/privacy requirements, and approved event mappings. No identifier was present, so none was invented.
3. Validate desktop, tablet, and mobile behavior on real browsers/devices; verify phone and SMS handlers on devices that support them.
4. Complete the legitimate GBP actions in `GOOGLE-BUSINESS-PROFILE-PLAN.md`; verify social accounts before adding URLs; do not create city offices or profiles.
5. Confirm the deployed sitemap status and priority URL indexing in the already owner-controlled apex Search Console property. No DNS or ownership changes are part of this work.
