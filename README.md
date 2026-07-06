# 🇮🇳 Bhartiya Savidhan (Samajho Apna Adhikar)

A stunning, interactive, and educational web experience designed to make the Constitution of India accessible to everyone. Built with a deeply cinematic dark theme, immersive scroll animations, and a rich educational feature set, this project brings the world's longest written constitution to life.

## ✨ Features

- 🎭 **Cinematic UI/UX:** A rich, immersive dark theme (`#05050A`) accented with the Indian tricolors (Saffron `#FF6B00`, Green `#138808`, Navy Blue `#0A0F5C`).
- 🎬 **Scroll-Triggered Animations:** Built with `framer-motion`, the site features dynamic storytelling overlays, parallax scrolling, and beautiful entrance animations.
- 📜 **The Preamble:** An elegant, typography-driven presentation of the Soul of India.
- 🛡️ **Fundamental Rights & Duties:** Interactive glassmorphic cards explaining citizen rights and responsibilities in simple, accessible language.
- 🏛️ **Government Structure:** Visual breakdowns of the Legislature, Executive, and Judiciary.
- ⏳ **Evolution Timeline:** A breathtaking "Sticky Scroll" journey mapping the historical milestones from the 1928 Nehru Report to the 2023 Women's Reservation Bill, utilizing historical archival photography.
- ⚡ **Interactive Quiz:** Test your knowledge with a built-in civics quiz featuring a streak system, XP tracking, and celebratory confetti.
- 📚 **Resource Hub:** Curated external links, Wikipedia articles, and video documentaries to learn more.
- 🌐 **Localization Ready:** Infrastructure prepared for multi-language support (English, Hindi, Marathi, Bengali, Tamil, etc.).

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

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

## 📂 Project Structure

```
├── public/
│   └── images/          # Hosted historical images and graphics
├── src/
│   ├── app/             # Next.js App Router pages (quiz, timeline, preamble, etc.)
│   ├── components/      # Reusable React components (Navbar, Footer, FeatureCards)
│   └── context/         # React Context providers (e.g. Language Context)
```

## 🤝 Contributing

Contributions are always welcome! If you want to add new constitutional articles, improve translations, or enhance the UI, feel free to open a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
*“The Constitution is not a mere lawyers' document, it is a vehicle of Life, and its spirit is always the spirit of Age.” — Dr. B.R. Ambedkar*
