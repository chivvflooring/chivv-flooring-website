# Qualified Lead Measurement

Updated September 11, 2026. This is a future operating model, not a CRM implementation.

## Funnel and status model

Website funnel: **Landing page → Call/Text/Estimate CTA → estimate form attempt → confirmed lead → qualified business outcome**. `generate_lead` means a valid confirmation redirect was reached once; it does not mean the job is qualified or won.

Use exactly one current status per inquiry: **New → Contacted → Qualified → Estimate Scheduled → Estimate Sent → Won**. Terminal alternatives: **Lost** or **Spam / Unqualified**. Keep a timestamped status history if the chosen secure system supports it.

## Recommended secure fields

- unique lead ID; created date; assigned owner;
- source/channel/campaign, original landing page and source page;
- requested service and city/service area;
- estimated project-size band (not needed in browser analytics);
- current status and qualification reason;
- next action/date and response time;
- estimate value, won/lost date, loss reason and realized revenue where appropriate;
- permission/communication notes in the secure business system only.

Names, phones, emails, descriptions, uploads and exact addresses belong only in the secured lead-management system with appropriate access and retention—not GA4, URLs, the data layer or browser storage.

## Qualification framework

Owner should define factual thresholds for: service offered, service area, project-size fit, homeowner/decision-maker status, timing, site/material feasibility and willingness to schedule an estimate. Record a neutral reason when unqualified. Do not use protected characteristics or proxy criteria.

## Reporting

Review weekly: new leads, contact rate, response time, qualification rate, estimates scheduled/sent, source-page drop-off and spam. Review monthly: won rate, revenue and gross-profit proxy by source/service/market, lead-to-estimate time and loss reasons. Counts are directional until source matching and offline outcomes are consistently maintained. Do not promise ROI or lead volume without real cost and revenue data.

## Privacy and access

Use an owner-approved CRM or access-controlled sheet; least privilege, MFA, documented retention and deletion, no public links, and no credentials in this repository. Upload offline conversions only after the owner approves platform terms, consent and hashing/data-handling requirements.
