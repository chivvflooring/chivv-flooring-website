# CHIVV Flooring Google Business Profile Plan

Updated September 11, 2026. This is an owner checklist, not evidence that any category, address, service, hour, credential, or project is currently verified. Maintain **one legitimate profile** and follow Google's current eligibility and service-area rules. Do not create virtual offices, city profiles, or unstaffed locations.

## Responsibility boundary

### Implemented in the website

- One consistent business entity: CHIVV Flooring / CHIVV Flooring LLC, `678-571-7028`, and `https://chivvflooring.com/`, with no street address published.
- One `HomeAndConstructionBusiness` entity is referenced by page-specific Service and breadcrumb schema.
- Canonical service and location landing pages, sitemap discovery, Call/Text/Estimate actions, and privacy-conscious campaign attribution.
- Support for tagged GBP visits and conversion events in the data layer. A verified GA4/GTM container is still required to transmit those events.

### Owner must perform in Google Business Profile

- Confirm profile eligibility, ownership, exact legal/customer-facing name, physical/service-area configuration, categories, hours, phone, and services in the owner-controlled profile.
- Never add an address unless it is a real, eligible, customer-facing location operated according to Google's current rules. If customers are not served at the address, configure the profile as a service-area business and hide the address.
- Verify each category and service against work the company currently performs before publishing. Google options can change; choose only options visible in the live profile editor.

## Categories for owner verification

**Primary category candidates — select one, only after checking the live category list and the company's actual core business:**

1. **Flooring contractor** — recommended candidate if installation/replacement is the primary business.
2. **Wood floor installation service** — candidate if available and hardwood installation is demonstrably the primary activity.
3. **Floor refinishing service** — candidate only if refinishing is the primary activity, not merely a service offered.

**Secondary category candidates — owner must confirm current availability and factual fit:** flooring contractor, wood floor installation service, floor refinishing service, tile contractor, bathroom remodeler, and stair contractor. Do not select every possible category; use the smallest accurate set describing services actively delivered.

## Services for owner verification

Add concise services that match actual work and the live category structure:

- Hardwood flooring installation
- Engineered hardwood installation
- Hardwood floor replacement
- Hardwood sanding and refinishing
- Flooring removal and replacement
- LVP installation
- Laminate flooring installation
- Stair treads and staircase flooring
- Tile installation
- Bathroom remodeling
- Shower remodeling
- Walk-in shower conversion
- Floor preparation and subfloor repair

Use factual descriptions. Do not add unverified pricing, warranties, financing, brands, licenses, or claims.

## Service areas

Prioritize the smallest truthful footprint rather than an inflated radius. Recommended owner-verification order:

1. Johns Creek, including ZIP 30022
2. Sandy Springs
3. Atlanta (with Buckhead described in posts/services where relevant)
4. Alpharetta
5. Roswell
6. Milton
7. Brookhaven, Dunwoody, Marietta/East Cobb, Cumming, and the surrounding Metro Atlanta service area

Country Club of the South may be discussed as part of the Johns Creek/30022 service area, but it should not be presented as an office or a completed-project claim. Confirm every area is genuinely served before adding it.

## Website and attribution

- Canonical website URL: `https://chivvflooring.com/`
- Suggested tagged profile website URL: `https://chivvflooring.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_profile`
- Example post link: append a descriptive, non-sensitive campaign such as `?utm_source=google&utm_medium=organic&utm_campaign=gbp_post_hardwood` to the most relevant canonical service page.
- Keep campaign names stable and lowercase. Never put customer names, phone numbers, email addresses, project notes, or other personal information in URLs.

## Factual business-description framework

Owner should fill and verify the bracketed facts before publication:

> CHIVV Flooring provides [verified active flooring/remodeling services] for homeowners in [verified service areas]. The team helps customers plan [verified specialties] and offers in-home project estimates. Contact CHIVV Flooring by phone, text, or the website estimate form to discuss project scope, material, timing, and site conditions.

Avoid city-office language, superlatives, promotional offers, keyword lists, review excerpts, years in business, credentials, project totals, or warranty claims unless documented and approved.

## Photo publishing plan

1. Obtain permission and confirm CHIVV owns or is authorized to publish every image.
2. Each month, publish a balanced set of current exterior-free work examples: before, preparation, installation/progress, detail, and finished result.
3. Record an internal factual caption sheet: date, broad city (not a private address), service, material, room type, and permission status.
4. Avoid customer faces, house numbers, paperwork, vehicle plates, access codes, and embedded location metadata where privacy is a concern.
5. Do not reuse stock imagery as claimed project work. Add website case studies only when the owner supplies verified facts and approved images.

## Genuine review workflow

1. After real work reaches an appropriate completion milestone, ask every eligible customer consistently for an honest review; do not gate by expected sentiment.
2. Send the owner-verified Google review link by the customer's permitted contact channel.
3. Do not offer incentives, draft a positive review for the customer, use employees/family as customers, or fabricate reviews.
4. Log only operational status in the owner’s secure system; do not put private customer data in website analytics.
5. Respond from the business account with a brief, non-private acknowledgement. Never confirm private project details the reviewer did not publish.
6. Monitor review volume, response rate, themes, and policy issues monthly—never manufacture a target rating.

## GBP posts and content

Publish useful, factual posts 1–2 times per month as capacity allows: hardwood selection, replacement planning, refinishing expectations, stairs, bathroom/shower scope, preparation, care education, and authorized project progress. Link each post to the closest service/location page or estimate page with a unique `utm_campaign`. Do not state that a pictured project occurred in a named community unless verified.

## Google Maps measurement

- In GA4, compare sessions and conversions where `utm_source=google`, `utm_medium=organic`, and campaign begins with `gbp_`.
- Track `phone_click`, `text_click`, `estimate_cta_click`, `estimate_form_attempt`, and confirmed `generate_lead`; treat only the confirmation event as a completed website lead.
- Reconcile website form confirmations and call/text inquiries with the owner’s lead log monthly. Use aggregate counts, service requested, qualified status, and booked outcome—never upload private form contents into browser analytics.
- Review GBP Performance data alongside Search Console and GA4. Annotate website/profile changes and avoid attributing causation from ranking changes alone.
- Owner must provide a verified GA4 Measurement ID (`G-...`) or GTM Web Container ID (`GTM-...`), account access, consent requirements, and conversion configuration approval before tags are installed.
