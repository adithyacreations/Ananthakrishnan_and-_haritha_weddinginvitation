# Kerala Wedding Invitation

A cinematic, responsive Kerala wedding invitation built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Run locally

From this folder, run:

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Personalize

### Kerala artwork and movement

The supplied artwork is integrated into the invitation margins, the illustrated
traditions section, and the wedding schedule. On phones, the illustrated cards
stack vertically for normal page scrolling. Illustrations move
gently as the page scrolls; jasmine tassels sway and the backwater boat drifts.
The operating system's **Reduce motion** preference disables these movements.

Edit `artwork` in `src/config/wedding.ts` to change all illustration paths,
descriptions, captions, and section wording. Set `artwork.enabled` to `false`
to hide the decorative artwork sections. The cover is configured separately in
`opening.illustration`. It uses `images/artwork/wedding-cover.jpeg` and crops
below the printed lettering so the names and date come from the live page text.
The story portraits use `images/HARITHA.jpeg` and `images/PODI.jpeg`.

Original supplied PNGs are preserved in `artwork-sources/`. The six displayed
illustrations are optimized WebP files in `images/artwork/` (under 0.9 MB total)
and are lazy loaded. Duplicate attachments were stored once. The boat reference
has a baked-in checkerboard and watermark, so the page uses an original SVG boat
instead. The existing couple portraits and MP3 have not been modified.

Root-level `images/` and `audios/` folders are served by the Vite asset plugin
in development and copied into `dist/` during the production build.

Edit [`src/config/wedding.ts`](src/config/wedding.ts) to update the couple and family names, addresses and phone numbers, invitation copy, story text, date and timezone, event schedule, venue, optional guest sections, photographs, and music path. Optional dress-code and guest-information sections can be enabled or disabled in this file.

The family album section is no longer rendered in `App.tsx`. Its reusable gallery component and configuration remain available if needed later. Family contacts are hidden with `guestInformation.enabled: false`.

Guest sharing uses `sharing.message` and `sharing.deployedUrl`. Set `deployedUrl` to the public invitation URL before publishing; when it is empty, the current website URL is used. The WhatsApp action opens a composed message for the guest to review and send; copying the URL reports success or failure based on the browser clipboard result.

RSVP uses the published [Tally form](https://tally.so/r/bZj76g) with its two required questions: Guest Name and attendance (Yes/No). Edit the form in Tally to change its questions; the website does not create inputs or submit responses itself. Tally handles submission, its existing Thank You page, and your existing Google Sheets integration. No guest responses or counts are displayed on the website. Set `rsvp.enabled` to `false` to hide the section.

The standard embed uses Tally's official script for dynamic height, a transparent background, and a hidden form title. A direct form link remains available if an embed is blocked. URLs and section copy are editable under `rsvp` in `src/config/wedding.ts`.

In Tally, choose **Customize → Custom**: background `#faf5e9`, text `#53322e`, button and accent `#761a22`, and font **DM Sans** to match the website's form/control typography. The surrounding heading retains the site's Cormorant Garamond serif. These basic colors and fonts are free; no custom CSS, custom domain, or branding-removal upgrade is needed. Host CSS cannot style the iframe's fields. Keep both questions required and retain your existing Thank You page and Google Sheets integration. See [Tally customization](https://tally.so/help/customize-your-form) and [standard embeds](https://tally.so/help/embed-your-form).

To verify the complete submission flow, submit one clearly identified test RSVP yourself, confirm the Tally Thank You page, and check that one row arrives in your connected sheet. Rendering the form alone cannot verify that private integration.

The countdown targets **6:00 AM IST on 10 December 2026**. The marriage ceremony is scheduled from **5:00 to 6:00 AM**. Its timestamp includes the `+05:30` offset, and `Asia/Kolkata` is used to display the event time. The journey to Guruvayoor is listed separately on 9 December at 2:00 PM, followed by the wedding function on the morning of 10 December.

The existing local assets are referenced directly:

- `images/HARITHA.jpeg`
- `images/couple-hero.png`
- `images/PODI.jpeg`
- `audios/kerala-wedding-music.mp3`

Vite serves the root-level asset folders at `/images/...` and `/audios/...` during development and includes them in `dist` during builds without moving or changing the originals. The player attempts audible playback when the page opens and again when a guest chooses “Open the Invitation.” Browsers may block audible autoplay until a visitor interacts; the floating control remains available to play or pause music.

The illustrated cover has a soft text reveal. Portraits, invitation details, and event cards reveal as guests scroll. Decorative glimmers pause off screen, and the page respects reduced-motion preferences.

## Deploy

Run `npm run build` and publish the generated `dist/` folder with a static host such as Netlify, Vercel, or GitHub Pages. Configure the host to serve `index.html` for app routes if routes are added later.

Before deployment, set `sharing.deployedUrl` to the exact public invitation URL, run `npm run build`, and publish `dist/`. To check the production build locally, run `npm run preview` and open the local URL printed by Vite.
