# Visibility Audit: aureliabridges.com

**SEO · AEO · GEO** — analysis only, no site files modified.

| | |
|---|---|
| Source | repo @ `e07a7f3` |
| Date | 26 August 2026 |
| Pages reviewed | 6 |
| Findings | 41 — **7 Critical**, **14 High**, **11 Medium**, **9 Low** |

---

## The verdict

This site is in the top decile of therapist websites **for craft** and the bottom half **for
discoverability**. Those are not in tension — they are different jobs, and only one has been done.

The HTML is clean and semantic. Canonicals are on every page. `lang="en-IE"` is correct. There is a
skip link, a `prefers-reduced-motion` block, and an `IntersectionObserver` fallback. The FAQ's
JSON-LD matches its DOM one-for-one across all thirteen questions — meticulous work most agencies
get wrong.

But the site ships **no `robots.txt`, no `sitemap.xml`, no `og:image`, structured data on only two
of six pages, no `Person` entity, not one outbound link to an authoritative source, and eight named
clinical conditions that are icon captions rather than pages.** Competitors hold
`waterfordcounselling.ie`, `waterfordanxietycounselling.ie` and `waterfordcbt.ie`; the IACP
directory lists roughly 53 rival therapists in the county.

The gap is not quality. It is that a beautiful brochure was published where a discoverable practice
was needed. Nearly everything below is fixable in hours — **seven Critical findings, and the first
four are file-creation tasks.**

---

## Credit where it is due — do not "fix" these

- **FAQ structured data is faithful.** 13 `Question` nodes, 13 `.faq-item` blocks, text identical.
  Drifted FAQ markup is a manual-action risk; this is clean.
- **Canonical tags on all six pages**, self-referencing and absolute — neutralising the GitHub Pages
  `/about` vs `/about.html` duplication problem.
- **Genuine accessibility intent.** Skip link, `focus-visible` styling, `Escape` to close the mobile
  menu (`script.js:38-43`), a real `prefers-reduced-motion` override (`styles.css:1535-1547`), and a
  non-`IntersectionObserver` fallback (`script.js:97-100`).
- **Both Google Maps iframes carry `loading="lazy"`** (`practical.html:81-90`, `contact.html:210-219`).
- **Images have explicit `width`/`height`** — no layout shift from them.
- **Crisis resources are prominent and repeated** on every page. Ethically right, and rewarded by
  Google's health-content quality guidance.
- **The FAQ copy is answer-shaped** — self-contained, plain-language. The best AEO asset on the site.

---

## Crawl foundation — 6 findings

Everything here is a **missing file**. The repo root contains only the six HTML files, `styles.css`,
`script.js`, `CNAME`, `README.md` and `images/`.

### TECH-01 · Critical — No `robots.txt`; the file 404s in production
GitHub Pages serves a default `robots.txt` only for `*.github.io` hosts. On a custom domain it serves
nothing. No sitemap declaration, no crawl guidance, and no explicit position on AI crawlers
(`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).

**Fix** — Add a root `robots.txt`: allow all, declare `Sitemap: https://aureliabridges.com/sitemap.xml`.
Decide deliberately whether AI crawlers are permitted; for a practice that wants to be cited by
generative engines the answer is yes, and stating it explicitly beats ambiguity.

### TECH-02 · Critical — No `sitemap.xml`
Six pages, zero discovery scaffolding. A sitemap is how you get `lastmod` signals, how you diagnose
indexing in Search Console, and how you confirm all six pages are known. Search currently surfaces
`approach.html` for the practice name — a one-page footprint where six were published.

**Fix** — Hand-write a six-URL sitemap with accurate `<lastmod>` values, reference it from
`robots.txt`, submit in Google Search Console and Bing Webmaster Tools. Fifteen minutes.

### TECH-03 · Medium — No custom `404.html`
A mistyped URL lands on GitHub's generic branded 404 — no navigation, no contact details, no crisis
numbers. For a site whose visitors may be in distress this is a real cost, not a cosmetic one.

**Fix** — Add `404.html` using the existing header/footer, with nav, phone number and crisis block intact.

### TECH-04 · Medium — No `llms.txt`
The emerging convention for giving generative engines a curated summary of what a site is. Not a
ranking factor and no engine guarantees it is read — but it costs one file, and this practice's
entire GEO problem is that models have nothing authoritative to anchor to.

**Fix** — Add a short `llms.txt`: who Aurelia is, credentials, modality, location, services, fees,
links to the six pages. Speculative, low-cost insurance.

### TECH-05 · Low — `.html` extensions in public URLs
GitHub Pages resolves both `/about` and `/about.html`. Canonicals correctly nominate the `.html` form,
so there is no duplicate-content problem — but the extensionless URL is cleaner and is what every
competitor uses. Evidence: `about.html:8` and equivalents.

**Fix** — Optional. If ever restructured, move to `/about/index.html` and 301 the old paths. Leaving
this alone is defensible.

### TECH-06 · Low — `README.md` is UTF-16LE and renders as mojibake
`file README.md` → *Unicode text, UTF-16, little-endian, with CRLF*. GitHub renders it garbled. No SEO
impact, but the repository is a public artefact of the practice and currently looks broken.

**Fix** — Re-save as UTF-8 with LF endings; write two real sentences describing the site.

---

## Structured data & the entity graph — 7 findings

**The largest single gap on the site** and the root cause of most of the GEO weakness.

| Page | Organization / LocalBusiness | Person | Service / Offer | FAQPage | Breadcrumb |
|---|---|---|---|---|---|
| `index.html` | ProfessionalService | absent | absent | — | absent |
| `about.html` | absent | absent | — | — | absent |
| `approach.html` | absent | absent | absent | — | absent |
| `practical.html` | absent | — | absent | — | absent |
| `faq.html` | absent | — | — | present | absent |
| `contact.html` | absent | — | — | — | absent |

### SD-01 · Critical — Structured data on two of six pages
Only `index.html` (`ProfessionalService`, lines 28-45) and `faq.html` (`FAQPage`) carry JSON-LD. The
About page — the most important page for establishing who this practitioner is — has none. The fees
page, which publishes exact prices, has none. The contact page, which carries the full NAP, has none.

**Fix** — Ship one shared, cross-linked `@graph` on every page: `LocalBusiness` + `Person` + `WebSite`
as the persistent spine, with page-specific nodes layered on top.

### SD-02 · Critical — No `Person` entity anywhere
For generative engines this is *the* defect. A model asked "who is a Gestalt therapist in Waterford?"
needs a node it can resolve, attribute and cite. The site names Aurelia Bridges in prose on every page
and in structured data on none. The practice is modelled; the practitioner is not — and in solo
private practice the practitioner *is* the brand.

**Fix** — Add a `Person` node with `name`, `jobTitle`, `image`, `alumniOf`, `memberOf` (IACP, PSI),
`knowsAbout`, `worksFor` and `sameAs`. Bind it to the business with `@id`.

### SD-03 · High — `ProfessionalService` is skeletal
`index.html:28-45` carries name, url, telephone, email, `priceRange` and address. Missing: `@id`,
`geo`, `openingHoursSpecification`, `image`, `logo`, `sameAs`, `areaServed`, `hasOfferCatalog`,
`availableLanguage`. For local search `geo` and opening hours are the fields that let Google reconcile
the site with the Business Profile.

**Fix** — Promote to `@type: ["ProfessionalService", "MedicalBusiness"]`, populate every field, make
`areaServed` explicit (Waterford City, Co. Waterford, plus online across Ireland).

### SD-04 · High — No `sameAs`; the entity has no corroboration
`sameAs` is how an engine confirms that the Aurelia Bridges on this website is the same one in the
IACP register, on the Google Business Profile, and in any directory. Without it every mention is an
unverified island. You already have a verified Business Profile; nothing on the site points to it.

**Fix** — Add `sameAs` arrays to both the `Person` and business nodes: Google Business Profile, IACP
directory profile, PSI, Psychology Today / LocallyIrish listings.

### SD-05 · High — Exact fees are published but not marked up
`practical.html:159-181` states €80 (individual, 60 min) and €100 (couples, 60 min) — precisely what an
answer engine wants for "how much is therapy in Waterford" — as styled `<div>` text, invisible as data.
Meanwhile `index.html:36` says only `"priceRange": "€€"`, vaguer than the truth the site already tells.

**Fix** — Add `Service` nodes with nested `Offer` / `PriceSpecification` (EUR 80, EUR 100) and
`hasOfferCatalog`. Keep human-readable prices exactly in sync with the markup.

### SD-06 · Low — No `BreadcrumbList`
A flat six-page site gains little today. It matters the moment condition pages exist (ONP-03).

**Fix** — Defer; add it as part of the service-page build.

### SD-07 · Low — `FAQPage` rich results no longer display; reset the expectation
Not a defect, a correction. Google restricted FAQ rich results to authoritative government and
health-authority sites in August 2023. This markup will not produce the SERP accordion it was
presumably built for. Its remaining value — genuine — is clean machine-parseable Q&A for answer
engines and language models.

**Fix** — Keep it. Do not delete it, and do not expect SERP accordions from it.

---

## On-page SEO — 8 findings

### ONP-03 · Critical — Eight clinical conditions are icon captions, not pages
The homepage "Who I Work With" grid (`index.html:161-250`) names anxiety, depression, grief & loss,
relationships, self-esteem, PTSD & trauma, burnout, abuse & trauma. Each gets an SVG and a single
`<h3>`. No body text. No page. No link.

These are the highest-commercial-intent queries in the niche — someone searching "anxiety counselling
Waterford" is far closer to booking than someone searching a therapist's name. Competitors built their
businesses on this: `waterfordanxietycounselling.ie` is an exact-match domain for one of these eight
terms. This site names all eight and ranks for none, because there is nothing to rank.

Note also that "PTSD & Trauma" and "Abuse & Trauma" are near-duplicates — a sign the grid was filled to
eight for visual symmetry rather than built from search demand.

**Fix** — Build four to six genuine landing pages of 800–1,200 words: anxiety, couples, grief, trauma
first. Each needs its own `<h1>`, `Service` schema, FAQ block, and a real explanation of how Gestalt
therapy addresses that presentation. **The single highest-return item in this audit.**

### ONP-01 · High — The homepage `<h1>` is a personal name
`<h1>Aurelia Bridges</h1>` (`index.html:79`). The strongest on-page relevance signal is spent on a
zero-volume query, while the phrase describing the business — "Psychotherapy and Psychology Service in
Waterford" — is demoted to a `<p>` two lines below (`index.html:81`). Brand-name H1s are defensible once
a brand has recognition; this practice does not yet have it.

**Fix** — Swap the hierarchy. Make the H1 something like *"Psychotherapy & Counselling in Waterford"*
and set the name as the prominent line above or below. The name stays in the `<title>`, the schema and
the logo — it loses nothing.

### ONP-02 · High — The homepage meta description advertises a service that does not exist
`index.html:7` promises "individual, couples, and **family** therapy." Family therapy appears nowhere on
the site; the three services actually offered are individual, couples, and online/telephone
(`index.html:121-149`). A factual error in the text Google is most likely to show as the snippet.

**Fix** — Correct the description to match the services, or add family therapy to the site. Do not leave
the two disagreeing.

### ONP-04 · High — Content is thin on five of six pages
Word counts *including* shared nav and footer boilerplate: home 563, about 590, approach 724,
practical 537, contact 364. Strip ~200 words of chrome and most pages carry 350–520 words of real copy.
Only the FAQ (~1,830) has depth — and it is, unsurprisingly, the page that ranks.

Length is not a ranking factor in itself. But 400 words cannot demonstrate expertise on a topic where
Google applies its strictest quality standards, and gives a language model almost nothing to extract.

**Fix** — Treat the FAQ as the model. Deepen About (training, Gestalt lineage, who she works with and
who she does not) and Approach (what a session actually looks like, minute to minute).

### ONP-05 · High — Two contextual internal links exist on the entire site
Every other internal link is shared nav or footer. The exceptions are `about.html:169` and
`index.html:263` — both pointing at Approach, both with generic anchor text. No keyword-bearing anchor
text appears anywhere. Navigation links are discounted precisely because they are site-wide; in-body
editorial links carry the topical signal.

**Fix** — Link contextually from prose with descriptive anchors: "Gestalt therapy for anxiety",
"session fees and cancellation policy", "what happens in a first session". Every FAQ answer is a natural
place for one.

### ONP-06 · High — Zero outbound links to authoritative sources
Verified across all six files: the only external `href`s are two Google Fonts `preconnect`s, the font
stylesheet, and the site's own canonicals. Not one link to IACP, PSI, the HSE, Samaritans or Pieta
House — even though Samaritans, Pieta House and the crisis text line are named on *every page* as
unlinked plain text next to `tel:` links (`index.html:334-353`).

Outbound citation to recognised authorities is a documented trust signal, exactly what Google's
health-content guidance looks for, and one of the clearer ways a generative model corroborates
legitimacy. It costs nothing and is currently at zero.

**Fix** — Link the IACP and PSI mentions in the footer's "Professional" column, link Aurelia's own IACP
register entry from About, and link Samaritans and Pieta House alongside the existing phone links.

### ONP-07 · High — No `og:image` or `twitter:card` on any page
Open Graph title, description, type, url, site_name and locale are all present and correct on all six
pages — thorough work — and then the one tag determining what a share actually *looks like* is missing.
Every link shared to WhatsApp, Facebook, Instagram DM or iMessage renders as a bare grey rectangle.

For a therapy practice, where referral is overwhelmingly word-of-mouth and links get passed privately,
this is a direct conversion loss.

**Fix** — Produce a 1200×630 share image (the therapy room photograph with the practice name set over it
would work), add `og:image`, `og:image:width`, `og:image:height`, `og:image:alt` and
`twitter:card=summary_large_image` to every page.

### ONP-08 · Low — `og:type` is `website` on the About page
`about.html:14`. A biography page is better described as `profile`, which permits `profile:first_name`
and `profile:last_name` — small additional entity signal, essentially free.

---

## Answer-engine optimisation — 5 findings

AEO asks one narrow question: **can a machine lift a correct, self-contained answer off this page and
attribute it?** The FAQ says yes. Nothing else on the site does.

### AEO-01 · Medium — FAQ answers are collapsed by CSS, and long answers will be clipped
`.faq-answer { max-height: 0; overflow: hidden; }` (`styles.css:1054-1058`), expanding to
`max-height: 600px` (`styles.css:1066-1068`). The text *is* in the served HTML, so crawlers read it —
this is not a hidden-content penalty. But the fixed 600px ceiling will silently truncate any answer that
grows past it, and content requiring interaction is weighted less confidently by some extractive systems.

**Fix** — Replace with native `<details>/<summary>`, or `grid-template-rows: 0fr → 1fr`, which animates
to true content height with no ceiling. Consider having the first two answers open by default.

### AEO-02 · Medium — FAQ buttons have no `aria-controls` binding
Each `.faq-question` correctly carries and updates `aria-expanded` (`faq.html:192` et seq.,
`script.js:56-79`), but there is no `aria-controls` and the answer panel has no `id`. A screen reader is
told a control expanded, but not what it expanded. It also weakens the machine-readable
question-to-answer pairing AEO depends on.

**Fix** — Give each `.faq-answer` a unique `id` and point `aria-controls` at it. Resolved automatically
by moving to `<details>`.

### AEO-03 · Medium — No liftable definition of Gestalt therapy
`approach.html:70-72` explains Gestalt therapy genuinely well across several paragraphs, but never states
a crisp standalone one- or two-sentence definition a model can quote verbatim. Extractive systems reward
exactly that shape. "What is Gestalt therapy?" is a real query with real volume and this page should own it.

**Fix** — Open the section with a single bolded definitional sentence directly under the H1, then let the
existing explanation follow. Mirror it in a `DefinedTerm` schema node.

### AEO-04 · Medium — Fees are styled cards, not a table
"How much does therapy cost in Waterford?" is a high-frequency extractive query. The answer is on the
site (`practical.html:159-175`) but expressed as decorative pricing cards. A genuine `<table>` with
service, duration and price columns is markedly easier to lift correctly.

**Fix** — Render fees as a real table (styling can stay identical); add reduced-fee and payment-method
notes as rows or a caption. Pair with the `Offer` schema from SD-05.

### AEO-05 · Medium — No freshness signal on any page
No `dateModified`, no `datePublished`, no visible "last reviewed" date. The only date on the site is
`© 2026` in the footer (`index.html:413`). Both search engines and language models discount undated
health-adjacent content, and models frequently decline to cite a source they cannot date.

**Fix** — Add `dateModified` to the schema on every page and a visible "Last reviewed: [month year]" on
About, Approach, Practical Info and FAQ. Keep them honest.

---

## Generative-engine optimisation — 4 findings

GEO asks: **when someone asks ChatGPT, Gemini or Claude to recommend a therapist in Waterford, is there
enough here for the model to name this practice with confidence?** Today: no. The blocker is not content
volume — it is that the model cannot establish *who this person is* and cannot corroborate it anywhere else.

### GEO-01 · Critical — The practitioner is described three different ways
- `index.html:80` — "M.Psy., MIACP"
- `about.html:67` — "MGR Master of Psychology | Accredited IACP | Graduate Member PSI"
- `index.html:100` — prose: "a psychologist and psychotherapist"

Entity resolution depends on consistency. A model encountering three credential strings for one name has
three weak signals instead of one strong one, and will hedge or omit rather than assert. The same
inconsistency undermines the NAP-consistency logic local search relies on.

Two observations, offered as flags rather than conclusions. First, **"MGR"** is the Polish *magister*
title; it is unlikely to be parsed correctly by a model trained predominantly on Irish and UK credential
conventions, and unlikely to be recognised by an Irish client reading the page. Second, the prose describes
Aurelia as **"a psychologist"** while the credentials state *graduate* (not chartered) PSI membership — a
distinction worth confirming against current IACP and PSI guidance on how members may describe themselves.

*Per instruction, this audit flags the inconsistency and does not propose replacement wording. The choice
is Aurelia's.*

**Fix** — Settle on one canonical credential string, confirm it against IACP/PSI guidance, then use it
identically in every `<title>`, every meta description, the `Person` schema, the Google Business Profile
and every directory listing. One string, everywhere, without exception.

### GEO-02 · High — The site and the Google Business Profile are not connected
The Business Profile exists and is verified — the most valuable local asset the practice has. But nothing
on the website references it and nothing in the schema corroborates it. The two run as unrelated entities.

Note a concrete NAP discrepancy: the schema at `index.html:39` omits "Cork Road", which `practical.html:94`
includes.

**Fix** — Make the on-site NAP byte-identical to the Business Profile. Add matching `geo` coordinates and
opening hours to the schema, and add the Business Profile URL to `sameAs`. Separately and off-site: a steady
trickle of genuine Google reviews is the strongest single lever for local visibility, subject to IACP
guidance on soliciting client feedback.

### GEO-03 · High — There is nothing on the site worth quoting
Generative engines cite sources supplying something specific: a statistic, a named methodology, a
distinctive protocol, a dated claim, an identified author. This site offers warm, well-written, entirely
general reassurance. Reread `index.html:251` as a model would: "you'll be met with warmth, respect, and
genuine care" is true, kind, and completely interchangeable with every other therapy site in Ireland.

No author byline block, no publication or review date, no citation of any source, no numbers of any kind,
and no claim that could only be made about this practice.

**Fix** — Add specificity a model can hold onto: years in practice, the specific Gestalt training institute
and qualification, session structure, typical course length, languages spoken, which presentations are and
are not accepted.

### GEO-04 · Medium — The off-site citation footprint is one directory listing deep
A search for the practice surfaces `approach.html` and a LocallyIrish.ie listing. That is close to the
floor. Generative models weight corroboration across independent sources heavily.

**Fix** — Off-site, outside the repo, but the highest-leverage item after the Critical fixes: complete the
IACP directory profile, list on Psychology Today Ireland, ensure NAP and credentials match the site exactly
on each, then reference them all from `sameAs`.

---

## Performance — 3 findings

### PERF-01 · High — Unoptimised JPEGs, one served at 2048px
`aurelia-profile.jpeg` is 238 KB and `therapy-room.jpeg` is 283 KB — 521 KB of images on a site whose entire
CSS and JS come to ~34 KB. No WebP or AVIF, no `srcset`, so a phone downloads the same bytes as a desktop.
`therapy-room.jpeg` is declared at its full intrinsic `2048×1536` on both `practical.html:100` and
`contact.html:229` and then scaled down by CSS — a mobile visitor downloads roughly four times the pixels
they can display.

**Fix** — Convert both to WebP with JPEG fallback via `<picture>`, generate 400/800/1600px variants, add
`srcset` + `sizes`. Expect ~70% reduction. Both already have `loading="lazy"` and explicit dimensions.

### PERF-02 · Medium — Google Fonts is render-blocking on every page
Two `preconnect`s plus a blocking stylesheet request to a third-party origin before first paint, for two
families — one a `300..900` variable axis (`index.html:22-24` and equivalents). `display=swap` is correctly
set, but the round trip still delays render.

Second dimension: serving fonts from Google transmits every visitor's IP to a third country. A German court
has already ruled that unlawful without consent under GDPR, and this is a health-adjacent Irish site with no
privacy notice (TRUST-02).

**Fix** — Self-host both families as subsetted WOFF2 in the repo. Removes a third-party round trip and the
privacy exposure, at perhaps 60 KB served same-origin.

### PERF-03 · Low — Two Google Maps iframes, correctly lazy-loaded
Noted for completeness rather than as a fault. Both embeds carry `loading="lazy"` and a descriptive `title`
(`practical.html:81-90`, `contact.html:210-219`) — better than most implementations. The remaining cost is
that each still pulls a heavy third-party bundle once scrolled into view and, like the fonts, sets cookies
and transmits visitor data to Google.

**Fix** — Consider a static map image linking out to Google Maps. Only worth doing alongside TRUST-02.

---

## Trust, conversion & compliance — 4 findings

Not conventional SEO findings, but they bear directly on rankings: Google applies its highest scrutiny to
health topics, and a site whose contact path is broken and whose privacy claims are unsupported struggles on
exactly those criteria.

### TRUST-02 · Critical — No privacy policy, while the site asserts GDPR compliance on every page
The footer of all six pages lists "GDPR Compliant" as a professional credential (`index.html:398`). The
contact form states submissions are "stored securely in accordance with GDPR" (`contact.html:198`). There is
no privacy policy page, no data protection notice, and no consent mechanism anywhere. The cookie notice that
once existed was removed in commit `03df191`.

Meanwhile the site collects personal data through a form on a mental-health website — data close to
special-category in this context — and loads two Google services (Fonts and Maps) that transmit visitor IP
addresses to a third country before any consent is sought.

This is a compliance exposure first and an E-E-A-T problem second. But it is genuinely both: an unsupported
trust claim on a health site is precisely the pattern quality raters are instructed to penalise.

**Fix** — Add a genuine privacy policy and data protection notice covering what is collected, why, the lawful
basis, retention, third-party processors and data subject rights. Have it reviewed by someone qualified —
this audit does not offer legal advice, only the observation that the current claim is unsupported.

### TRUST-01 · High — The contact form is a `mailto:` handoff
`script.js:103-140` intercepts the submit event, URL-encodes the fields into a `mailto:` string and sets
`window.location.href`. Consequences:

- Visitors using Gmail or Outlook in a browser with no OS mail client see nothing happen, or an error.
- No delivery confirmation and no record; a failed enquiry is silently lost and neither party knows.
- The message is exposed in the visitor's own mail client — meaningful when the content may be a disclosure
  about their mental health.
- No spam protection.
- Conversion is unmeasurable, so no recommendation in this audit can ever be validated.

The code does show a fallback note after redirecting, which is thoughtful — but it appears *after* the
navigation is triggered, so many users never see it.

**Fix** — Move to a real form backend (Formspree, Netlify Forms, Web3Forms — free tiers, work on static
hosting). Add honeypot spam protection, a genuine on-page success state, and a thank-you URL trackable as a
conversion.

### TRUST-03 · High — No analytics of any kind
No Google Analytics, no Search Console verification tag, no privacy-first alternative. Nothing about this
site is measurable: not traffic, not queries, not indexing status, not whether any of these fixes work.

This compounds every other finding. Without Search Console there is no way to see which pages are indexed,
what queries they surface for, or whether the sitemap in TECH-02 was ever processed.

**Fix** — Set up Google Search Console first — free, needs no cookie banner, and the only tool showing
indexing state. For visitor analytics prefer a cookieless option (Plausible, Fathom, Cloudflare Web
Analytics) to avoid deepening TRUST-02.

### TRUST-04 · Medium — No social proof, with a real constraint attached
No testimonials, reviews or ratings anywhere. Ordinarily a straightforward recommendation; here it is not,
because IACP ethical guidance places real limits on soliciting and publishing client testimonials, and a
naive "add reviews" recommendation would be professionally inappropriate.

**Fix** — Build trust through unambiguously available routes: verifiable accreditation (link the IACP register
entry), the therapy room photograph already on the site, transparent fees, a clear cancellation policy, named
training credentials. Google Business Profile reviews sit outside the site and should be approached with IACP
guidance in hand.

---

## Markup & accessibility — 4 findings

Lower severity, listed because accessibility and clean markup feed E-E-A-T and because two are latent bugs
rather than stylistic preferences.

### A11Y-03 · Medium — Most page content is `opacity: 0` until JavaScript runs
`.fade-in` sets `opacity: 0` (`styles.css:1311-1315`) and is revealed by `IntersectionObserver`. The
implementation is careful — there is a non-IO fallback and a `prefers-reduced-motion` override that resets
opacity, both more than most sites manage.

The residual risk is narrow but total: if `script.js` fails to load at all — network error, blocked script, an
exception thrown earlier — the fallback never executes and the majority of every page renders permanently
invisible. Google renders JavaScript so indexing is unaffected; the exposure is to real visitors.

**Fix** — Have the script add a `js-enabled` class to `<html>` as its first action, and scope the `opacity: 0`
rule to `.js-enabled .fade-in`. Content then defaults to visible and only hides when the script that will
reveal it is confirmed running.

### A11Y-01 · Low — `.section-header` is applied to two different element types
On the homepage it sits on the `<h2>` itself (`index.html:93`); on About and Practical Info it wraps the
heading in a `<div>` (`about.html:97`, `practical.html:75`). The CSS at `styles.css:182-192` — which includes a
descendant `.section-header p` rule — is written for the wrapper form, so the homepage usage silently gets only
half the intended styling.

**Fix** — Pick one pattern site-wide. The wrapper form is the one the CSS actually supports.

### A11Y-02 · Low — Heading level skipped in the crisis sections
The crisis block opens at `<h3>` with no `<h2>` in that section (`index.html:332`, `contact.html:239`), so the
document outline jumps from `h1` to `h3`. Minor, but it is one of the more prominent blocks on the page and
sits outside the heading hierarchy.

**Fix** — Promote to `<h2>` and adjust styling, or introduce a section-level `<h2>` above it.

### A11Y-04 · Low — Open mobile menu does not trap focus
`Escape` closes the menu and correctly returns focus to the toggle (`script.js:21-44`) — properly done. But
while open, tabbing continues into the page content behind the overlay, which is unreachable visually.

**Fix** — Trap focus within the nav while open, or set `inert` on `<main>` and `<footer>` when active.

---

## Roadmap

The tiers are genuinely sequential — Tier 2 depends on Tier 1 existing, and Tier 3 only pays off once the
first two are in place.

### Tier 1 — Foundations · ≈ one working day · highest return
1. **Create `robots.txt` and `sitemap.xml`**, submit both in Search Console. *(TECH-01, TECH-02)*
2. **Verify the site in Google Search Console.** Nothing else can be measured until this exists. *(TRUST-03)*
3. **Fix the family-therapy claim** in the homepage meta description — a factual error. *(ONP-02)*
4. **Settle one canonical credential string**, confirmed against IACP/PSI guidance. *(GEO-01)*
5. **Ship a full schema graph** on all six pages: `LocalBusiness` + `Person` + `Service`/`Offer`, cross-linked
   by `@id`, with `sameAs` pointing at the Business Profile and IACP. *(SD-01 – SD-05, GEO-02)*
6. **Add `og:image` and `twitter:card`** to every page. *(ONP-07)*
7. **Link out to IACP, PSI, Samaritans and Pieta House** where they are already named. *(ONP-06)*
8. **Rewrite the homepage `<h1>`** to lead with service and location. *(ONP-01)*

### Tier 2 — Substance · two to three weeks
1. **Build four to six condition landing pages** — anxiety, couples, grief, trauma first. 800–1,200 words each,
   own schema, own FAQ. The largest single opportunity in this audit. *(ONP-03)*
2. **Write a real privacy policy** and get it reviewed. *(TRUST-02)*
3. **Replace the `mailto:` form** with a real backend, success state and conversion tracking. *(TRUST-01)*
4. **Optimise images** — WebP, `srcset`, correctly-sized variants. *(PERF-01)*
5. **Self-host the fonts.** Faster, and removes a privacy exposure. *(PERF-02)*
6. **Add a `404.html`** carrying nav, contact details and crisis numbers. *(TECH-03)*
7. **Convert the FAQ accordion** to `<details>` and add the fee table. *(AEO-01, AEO-02, AEO-04)*

### Tier 3 — Compounding · ongoing
1. **Build the off-site citation footprint** — IACP directory, Psychology Today Ireland, Counselling Directory —
   identical NAP and credentials on each, then reference from `sameAs`. *(GEO-04)*
2. **Add specificity a model can cite**: years in practice, training institute, session structure, typical course
   length. *(GEO-03)*
3. **Deepen About and Approach** toward the FAQ's standard. *(ONP-04)*
4. **Add contextual internal links** with descriptive anchor text. *(ONP-05)*
5. **Add `dateModified` and visible review dates**, then keep them honest. *(AEO-05)*
6. **Add `llms.txt`** as low-cost GEO insurance. *(TECH-04)*
7. **Cultivate Google Business Profile reviews**, guided by IACP ethics on client feedback. *(GEO-02, TRUST-04)*

---

## Scope & limitations

### What this audit is based on
All findings derive from the repository at commit `e07a7f3`, which for a static site published directly from
that repository is the source of truth for every technical claim. Every `file:line` citation was verified
against the working tree.

**Direct fetches of the live site were blocked by the audit environment's network egress policy.** Production-only
signals were therefore not observed first-hand: actual HTTP response headers, real Core Web Vitals field data,
live indexing depth, and confirmation that `robots.txt` and `sitemap.xml` genuinely 404 in production rather than
merely being absent from the repo. The repository evidence makes those inferences safe, but they are inferences,
and worth a thirty-second confirmation in a browser.

Off-site observations come from web search: the site surfaces `approach.html` and one LocallyIrish.ie listing, and
the competitive set named in this audit is drawn from live search results.

### What this audit deliberately does not do
- **No files were changed.** The agreed scope was analysis only. Every fix above is a recommendation.
- **No credential wording is proposed.** GEO-01 flags the inconsistency and the regulatory question; the wording is
  Aurelia's decision, to be taken with IACP and PSI guidance.
- **No legal advice is given.** TRUST-02 reports that a GDPR compliance claim is made and that no supporting privacy
  notice exists. What to do about that needs someone qualified.
- **No testimonial strategy is recommended** beyond noting the IACP ethical constraint. TRUST-04 stops where
  professional guidance begins.
