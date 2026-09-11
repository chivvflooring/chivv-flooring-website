# CHIVV Flooring Social Lead Plan

Updated September 11, 2026. No social profile URL is asserted by this plan. The owner must verify profile ownership and URLs before the website links to them.

## Funnel and attribution standard

Every post should send a visitor to one relevant canonical page, then offer **Call**, **Text**, or **Request a Free In-Home Estimate**. Use:

`?utm_source=instagram&utm_medium=social&utm_campaign=<stable_campaign_name>`

Replace `instagram` with `facebook` as appropriate. The website preserves approved UTM values, first landing page, external referrer host, and estimate source-page context during the estimate journey. Do not include names, contact details, addresses, or project notes in campaign parameters. A verified GA4/GTM implementation is required before data-layer events appear in analytics reports.

## Campaign matrix

| Content theme | Recommended landing destination | Example campaign | Primary conversion |
|---|---|---|---|
| Hardwood transformations | `/services/hardwood-installation.html` | `hardwood_transformations` | Estimate |
| Before/after flooring | Closest verified service page; otherwise `/` | `flooring_before_after` | Text or estimate |
| Floor removal/replacement | `/services/flooring-replacement.html` | `floor_replacement` | Estimate |
| Sanding and refinishing | `/services/refinishing.html` | `hardwood_refinishing` | Call or estimate |
| Stair treads/staircase flooring | `/services/stairs-trim.html` | `stair_transformation` | Text or estimate |
| Bathroom, shower, and tile | `/services/bathroom-shower-remodeling.html` | `bathroom_shower` | Estimate |
| Project progress | Relevant service page, only with verified facts and authorized photos | `project_progress_<service>` | Text |
| Homeowner education | The service guide that answers the question | `homeowner_education_<topic>` | Estimate |

For a genuinely local and verified campaign, a priority location page can be the destination—for example `/areas/johns-creek.html`—but never imply a project was completed in that market without evidence.

## Creative and CTA guidance

- Open with the homeowner problem, show authorized work or an educational detail, explain the next planning decision, then use one clear CTA.
- Describe material, process, location, and outcome only when the owner has verified those facts.
- Use on-platform messaging for early questions, then direct qualified prospects to the estimate form for project size, timeframe, service, city/ZIP, and optional photos.
- Use Call for urgent/high-intent conversations, Text for low-friction photo/question follow-up, and Estimate for scoped inquiries.
- Never publish customer identities, exact addresses, private interiors, reviews, pricing, warranties, or credentials without permission and verification.

## Organic publishing cadence

A sustainable starting cadence is two useful feed posts or reels weekly plus story updates when authorized work exists. Rotate transformation, preparation/process, decision education, care, stairs, and bathroom/shower topics. Reuse a topic across Instagram and Facebook, but tag platform URLs separately. Quality and factual accuracy matter more than volume.

## Paid campaign readiness (do not launch yet)

1. Owner confirms account ownership, billing authority, budget, privacy/consent requirements, verified social URLs, and target services/areas.
2. Install only an owner-approved Meta Pixel/Conversions API setup after privacy review; no ID is present or invented here.
3. Start with one service/market hypothesis per ad set and one matching landing page.
4. Define qualified-lead criteria before launch (service area, service fit, scope, timing, and reachable contact).
5. Validate UTM persistence and all five website events in analytics debug tools before spending.
6. Optimize toward confirmed/qualified outcomes rather than clicks or form starts; maintain an offline lead-status process outside browser analytics.

## Measurement

Report by source, campaign, landing page, source-page context, Call/Text/Estimate engagement, form attempts, confirmed leads, qualified leads, and booked outcomes. Form contents stay in Netlify/owner-approved lead systems, not data-layer payloads or browser analytics/storage. The owner should reconcile results monthly and pause campaigns producing low-quality or out-of-area inquiries.
