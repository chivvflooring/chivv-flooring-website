# Google Ads Readiness

Updated September 11, 2026. Planning only: no account, billing, campaign, tracking ID or spend was created.

## Campaign architecture and landing mapping

| Campaign | Ad-group themes | Landing page | Priority markets |
|---|---|---|---|
| Hardwood installation | installer, contractor, nail-down hardwood | `/services/hardwood-installation.html` | Buckhead/Atlanta, Sandy Springs, Johns Creek, Alpharetta, Milton, Roswell |
| Engineered hardwood | engineered installer, glue-down engineered | `/services/engineered-hardwood.html` | Same Tier 1 split after volume review |
| Flooring replacement | removal/replacement, replace hardwood/floors | `/services/flooring-replacement.html` | Tier 1; expand only with qualified results |
| Refinishing | hardwood/wood floor sanding and refinishing | `/services/refinishing.html` | Tier 1 |
| Flooring contractor | contractor/installer | Relevant substantive area page | Tight geo controls and service qualifiers |
| Bathroom/shower | bathroom remodel, shower remodel, walk-in/tile shower | `/services/bathroom-shower-remodeling.html` | Buckhead/Atlanta and Sandy Springs first; validate actual scope/capacity |

Prefer service-led campaigns with tightly controlled location targeting over one campaign per city. Separate brand terms from non-brand service terms. Do not claim 24/7, pricing, financing, credentials or availability unless verified.

## Negative-keyword themes for review

DIY/how-to, jobs/careers, salary, training/classes/course/school, wholesale/distributor, manufacturer instructions/manual, tools/rental, free materials/samples, cleaning products, clipart/photos, and unrelated automotive/gym/furniture uses of “flooring.” Review search terms before excluding; “free estimate” is commercial and must not be blocked merely because it contains “free.” Add competitor names only through an owner/legal policy decision.

## Conversion and launch requirements

- Primary: confirmed `generate_lead`, not CTA click or form attempt.
- Secondary diagnostics: `phone_click`, `text_click`, `estimate_cta_click`, `estimate_form_attempt`.
- Decide how qualified phone calls will be counted; do not silently replace the legitimate published number.
- Reconcile leads to Qualified, Estimate Scheduled/Sent and Won outcomes before value bidding.
- Validate consent/privacy requirements before Google tags or enhanced/offline conversions.
- Test Netlify delivery and conversion deduplication on the deployed site.

## UTM strategy

Retain auto-tagging where approved and use lowercase stable values, e.g. `utm_source=google&utm_medium=cpc&utm_campaign=hardwood_install_tier1&utm_content={approved_ad_variant}`. Never place a person, phone, email, address or project description in a URL. Existing code preserves `gclid`, UTMs, first landing and estimate source for 30 minutes in session storage; only non-sensitive attribution reaches event objects.

## Tracking validation checklist

1. Owner supplies Ads/GA4/GTM accounts and IDs; never invent them.
2. Preview/debug shows one click event per interaction.
3. Form attempt is not marked as a completed lead.
4. Successful Netlify redirect produces one `generate_lead`; refresh produces zero.
5. Landing page, page context, referrer host and UTMs are present and contain no form fields.
6. Calls/texts work on real mobile devices.
7. Test leads are marked and excluded from business reporting.
8. Qualified/won outcomes reconcile to the secure lead log.

## Owner decisions required

Monthly test budget and loss limit; service capacity; accepted cities/radius and exclusions; minimum job criteria; business hours and response owner; verified claims; call-measurement approach; conversion values; consent/privacy configuration; and approval of every ad/creative. Start narrow, use phrase/exact controls where appropriate, review search terms frequently and pause spend that produces unqualified demand.
