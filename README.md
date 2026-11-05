# REX AI — v0.1

A mobile-first AI assistant web app that can also be installed on Android as a Progressive Web App (PWA).

## Features
- Responsive dark interface
- AI chat through a server-side API route
- Hindi speech input in supported browsers
- PWA manifest and service worker for installability
- API key stays on the server, never in browser JavaScript

## Run / deploy
1. Import this repository into Vercel.
2. In Vercel Project Settings → Environment Variables, add `GROQ_API_KEY`.
3. Optional: add `GROQ_MODEL` to choose a model supported by your Groq account.
4. Deploy. Open the deployment URL in Chrome on Android and use the browser's Install app option.

The app interface can load without a key, but live AI replies require the server-side key. Do not commit API keys or passwords to GitHub.

## Android
This first version is an installable PWA. It can be added to the Android home screen. A native APK wrapper can be added as a later milestone after the web app is tested.

## Project structure
- `index.html` — app structure
- `style.css` — responsive dark UI
- `app.js` — chat, voice input, install prompt
- `api/chat.js` — secure server-side AI endpoint
- `manifest.json`, `sw.js`, `icon.svg` — PWA support
- `vercel.json` — deployment configuration
