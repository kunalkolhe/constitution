# 🇮🇳 Bhartiya Samvidhan (Samajho Apna Adhikar)

A stunning, interactive, and educational web experience designed to make the Constitution of India accessible to everyone. Built with a warm, modern light theme, immersive scroll animations, and a rich educational feature set spanning 17 pages, this project brings the world's longest written constitution to life.

## ✨ Features

- ☀️ **Warm, Modern UI/UX:** A light cream theme (`#FFF8F0`) with charcoal text, accented by the Indian tricolors (Saffron `#FF6B00`, Green `#138808`, Navy Blue `#0A0F5C`, Gold `#FFD700`) — the floating navbar and footer stay dark for contrast against it.
- 🎬 **Scroll-Triggered Animations:** Built with `framer-motion`, the site features a cinematic scroll-scrubbed hero, dynamic storytelling overlays, parallax scrolling, and beautiful entrance animations throughout.
- 🎨 **Signature Design Touches:** A custom trailing cursor, a subtle film-grain texture, hand-drawn squiggle underline accents, 3D tilt-on-hover cards, and magnetic hero buttons — small, deliberate details rather than a generic template feel.
- 📜 **The Preamble:** An elegant, typography-driven presentation of the Soul of India, with tap-to-explain key terms (Sovereign, Socialist, Secular, Democratic, Republic) in a side drawer.
- 🛡️ **Fundamental Rights & Duties:** Interactive flip cards and expandable article breakdowns explaining citizen rights and responsibilities in simple, accessible language.
- ⚖️ **Directive Principles, Emergency Provisions & Amendments:** Dedicated deep-dive pages covering the moral compass of governance, emergency powers, and how the Constitution evolves.
- 🏛️ **Government Structure:** Visual breakdowns of the Legislature, Executive, and Judiciary.
- 🗺️ **Interactive States & UTs Map:** Click any of India's 28 states or 8 Union Territories on an SVG map to see its capital, formation year, legislature, and any special constitutional provisions.
- ⏳ **Evolution Timeline & History:** A breathtaking "Sticky Scroll" journey mapping historical milestones from the 1928 Nehru Report to the 2023 Women's Reservation Bill, plus a dedicated history page with archival photography and a scrolling era gallery.
- 📖 **All 448 Articles & Glossary:** A searchable reference of the Constitution's 25 Parts and most important articles, plus an A–Z glossary of legal terms like *Habeas Corpus* and *Mandamus*.
- 🧭 **Explore Directory:** One directory page linking every constitutional topic in the app.
- ⚡ **Interactive Quiz:** A 44-question civics quiz bank, drawing a fresh random 10-question round each playthrough, with a streak system, XP tracking, and celebratory confetti. Best scores optionally sync to a backend (see below) and appear as an "All-Time Best" on the menu.
- 🎭 **Rights Simulator:** Step into real-world scenarios and pick which fundamental right protects you — with instant feedback and explanations.
- 📚 **Resource Hub:** Curated external links, Wikipedia articles, and video documentaries to learn more.
- 🌐 **Multi-Language Navigation:** The navbar and footer are translated into real, hand-written Hindi (not machine translation) via a lightweight custom i18n layer, with more languages easy to add. Page body content additionally offers Google Translate for 9 more Indian languages.
- 🔒 **Optional Cross-Device Progress:** An anonymous, opt-in backend (Drizzle ORM + Postgres) that — once configured — remembers a device's best quiz XP/streak so it survives a cleared cache. The app works perfectly on `localStorage` alone if you skip this.
- ♿ **Accessibility:** Labeled icon-only controls, screen-reader text alongside color-only states, and a branded, visible focus ring.
- 🔍 **SEO-Ready:** Every page ships its own distinct `<title>` and description instead of one generic tag site-wide.
- 🧪 **Tested:** A Vitest + React Testing Library suite covering quiz scoring, streak logic, the simulator, and language persistence — including a regression test for a real timer bug that was once fixed.
- 🛟 **Graceful Failure:** A branded 404 page and error boundaries replace Next.js's default crash/error screens.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript
- **Database (optional):** [Drizzle ORM](https://orm.drizzle.team/) + [Postgres](https://www.postgresql.org/)
- **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)
- **Interactive Map:** [@react-map/india](https://www.npmjs.com/package/@react-map/india)

## 🚀 Getting Started

First, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/yourusername/savidhan.git

# Navigate to the directory
cd savidhan

# Install dependencies
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Environment Variables (optional)

The app runs fully featured with **zero configuration** — quiz progress and language preference simply live in the browser's `localStorage`. Copy `.env.example` to `.env` and set `DATABASE_URL` only if you also want quiz best-scores to survive a cleared cache:

```bash
cp .env.example .env
# then edit .env with a real Postgres connection string
# (a free instance from Neon, Supabase, or Railway all work)

npm run db:push   # creates the `progress` table
```

Without `DATABASE_URL` set, the relevant API route (`/api/progress`) responds gracefully instead of erroring, and the app behaves exactly as if the database code didn't exist.

## 🧪 Testing

```bash
npm test          # run the suite once
npm run test:watch  # watch mode while developing
```

## 📂 Project Structure

```
├── public/
│   ├── animations/       # Optimized WEBP frame sequence for the scroll-scrubbed hero
│   └── images/           # Historical images and graphics
├── drizzle/               # Generated SQL migrations (created by `npm run db:generate`)
├── src/
│   ├── app/               # Next.js App Router pages — one folder per route
│   │   ├── api/           # Route handlers (frames list, optional progress sync)
│   │   ├── [route]/page.tsx    # Each page's UI (Client Component)
│   │   ├── [route]/layout.tsx  # Each route's page-specific <title>/description
│   │   ├── error.tsx      # Branded runtime-error boundary
│   │   ├── not-found.tsx  # Branded 404 page
│   │   └── global-error.tsx    # Catches crashes in the root layout itself
│   ├── components/
│   │   ├── shared/        # Navbar, Footer, AudioPlayer, CustomCursor, TiltCard, MagneticButton, Squiggle
│   │   ├── home/           # Homepage-only sections (hero, stats, feature cards, etc.)
│   │   └── history/        # History-page-only sections
│   ├── context/            # LanguageContext (current language + translation lookup)
│   ├── translations/       # Hand-written UI-chrome translations (English, Hindi, …)
│   ├── db/                 # Drizzle schema + client (optional backend)
│   ├── lib/                 # Small shared utilities (e.g. anonymous device ID)
│   └── data/                # Static content data (states, quiz simulator scenarios)
├── vitest.config.mts        # Test runner configuration
└── drizzle.config.ts        # Migration tool configuration
```

## 🤝 Contributing

Contributions are always welcome! If you want to add new constitutional articles, improve translations, or enhance the UI, feel free to open a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please run `npm test` and `npm run lint` before opening a PR.

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
*"The Constitution is not a mere lawyers' document, it is a vehicle of Life, and its spirit is always the spirit of Age." — Dr. B.R. Ambedkar*
