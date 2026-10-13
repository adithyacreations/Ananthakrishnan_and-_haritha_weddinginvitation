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

Edit [`src/config/wedding.ts`](src/config/wedding.ts) to update the couple and family names, addresses and phone numbers, invitation copy, story text, date and timezone, event schedule, venue, optional guest sections, photographs, and music path. Optional dress-code and guest-information sections can be enabled or disabled in this file.

The gallery reads from `gallery.items` in the same configuration. Add an item with a real local `/images/...` path, useful alt text, a short caption, an object position, and its `landscape` or `portrait` orientation. The gallery filters out images that fail to load. Its lightbox supports Escape, the arrow keys, and Tab navigation.

Guest sharing uses `sharing.message` and `sharing.deployedUrl`. Set `deployedUrl` to the public invitation URL before publishing; when it is empty, the current website URL is used. The WhatsApp action opens a composed message for the guest to review and send; copying the URL reports success or failure based on the browser clipboard result.

RSVP is disabled by default because no submission service is configured. To preview the clearly marked demo form, set `rsvp.enabled` to `true`; demo responses are not sent or saved. To receive real RSVPs, connect a form endpoint that accepts a JSON `POST` and set `rsvp.submissionUrl` to that endpoint before enabling the form. The page reports success only when the endpoint returns an HTTP success status. Configure endpoint privacy, validation, and storage with your chosen provider.

The countdown targets **6:00 AM IST on 10 December 2026**. The marriage ceremony is scheduled from **5:00 to 6:00 AM**. Its timestamp includes the `+05:30` offset, and `Asia/Kolkata` is used to display the event time. The journey to Guruvayoor is listed separately on 9 December at 2:00 PM, followed by the wedding function on the morning of 10 December.

The existing local assets are referenced directly:

- `images/bride-portrait.png`
- `images/couple-hero.png`
- `images/groom-portrait.png`
- `audios/kerala-wedding-music.mp3`

Vite serves the root-level asset folders at `/images/...` and `/audios/...` during development and includes them in `dist` during builds without moving or changing the originals. The player attempts audible playback when the page opens and again when a guest chooses “Open the Invitation.” Browsers may block audible autoplay until a visitor interacts; the floating control remains available to play or pause music.

The opening scene uses a staggered photo, border, text, gold-dust, and jasmine-petal reveal. Portraits, invitation details, gallery images, and event cards reveal as guests scroll. Decorative section glimmers pause when their section leaves view, and motion is simplified for reduced-motion preferences and small screens.

## Deploy

Run `npm run build` and publish the generated `dist/` folder with a static host such as Netlify, Vercel, or GitHub Pages. Configure the host to serve `index.html` for app routes if routes are added later.

Before deployment, set `sharing.deployedUrl` to the exact public invitation URL, run `npm run build`, and publish `dist/`. To check the production build locally, run `npm run preview` and open the local URL printed by Vite.
