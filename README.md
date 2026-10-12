# OKHLA PROPERTIES — static website

Open `index.html` in a browser. No install needed.

## Add or edit a property
Open `js/property-data.js`, copy one property object, change the `id` (e.g. `property-013`) and details, save.

## Change images
Images are web links in each property's `images` list (first one = cover). Replace with any link
(`https://...`) or a local file path like `images/properties/property-001/cover.jpg`.
Hero image: change the `url(...)` in `index.html` (`class="hero"`).
Current photos are illustrative Unsplash samples, not real property photos.

## Videos
Add paths/links to `videos: []`, e.g. `videos: ["videos/properties/property-001/walkthrough.mp4"]`.

## Language
Translations are in `js/main.js` (object `T`, `en` and `hi`). Optional per-property text: `desc: { en: "", hi: "" }`.

## Media tool
`media-tool.html` previews files in your browser only (no upload) and generates path snippets.

## Contact number
Phone/WhatsApp are set once at the top of `js/main.js` (`PHONE`, `WA`) and in a few static links.
