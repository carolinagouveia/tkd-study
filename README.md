# TKD Study

A mobile-first taekwondo study companion for belt exam preparation.

Study Korean vocabulary, stances, techniques, and forms — organised by belt level, with spaced-repetition flashcards and a step-by-step poomse walkthrough.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Routing | React Router v6 |
| State | Zustand + persist |
| PWA | vite-plugin-pwa (Workbox) |
| Storage | IndexedDB via idb-keyval |

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

```bash
npm run build    # production build
npm run preview  # preview the production build locally
```

---

## Project structure

```
src/
  components/   # UI components (shell, flashcard, movement, poomse…)
  data/         # JSON content per belt (belts.json + belts/*.json)
  hooks/        # useBelt, usePoomse, useBeltTheme…
  pages/        # BeltSelectPage, DashboardPage, FlashcardsPage…
  store/        # Zustand stores (beltStore, srStore, customVocabStore)
public/         # Static assets, PWA icons, audio files
```

---

## Belt system

The app follows the ITF Taekwondo curriculum with 11 levels (10th KUP → 1st DAN), each with its own vocabulary, movements, poomse, and exam checklist.
