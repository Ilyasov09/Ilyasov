<div align="center">

# ⚡ Javlon Ilyasov — Personal Portfolio

<p align="center">
  <strong>Modern, highly responsive personal developer portfolio featuring fluid animations, bilingual localization, dynamic Spotify integration, and curated dark/light themes.</strong>
</p>

<p align="center">
  <a href="https://portfolio-ebon-psi-38.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

[🌐 Live Preview](https://portfolio-ebon-psi-38.vercel.app) • [💼 Featured Projects](#-featured-projects) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Getting Started](#-getting-started)

</div>

---

## 📖 Overview

This repository houses the source code for the official portfolio website of **Javlon Ilyasov**. Engineered with a mobile-first philosophy, the site presents technical skills, featured web applications, personal milestones, and live Spotify integration through an ultra-clean glassmorphic aesthetic.

### ✨ Key Features

- **🌓 Dynamic Theme Switching:** Immersive Dark and Light modes accompanied by custom radial burst transitions.
- **🌐 Bilingual Support (i18n):** Real-time language switching between Uzbek (`uz`) and English (`en`).
- **🎧 Live Spotify Integration:** Interactive dual-playlist embedded widget connecting visitors with currently played curation.
- **📱 Responsive Ergonomics:** Adaptive desktop layout with custom precision cursor alongside native-feeling mobile bottom navigation.
- **🎨 Glassmorphic Visuals:** Curated HSL accents, smooth aurora background animations, particle physics, and responsive hover elevations.
- **📊 Interactive Timeline:** Visual narrative highlighting coding milestones and growth path.

---

## 🛠️ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Type-safe declarative component architecture |
| **Build & Tooling** | [Vite 6](https://vitejs.dev/) | Instant HMR development server and optimized bundle generation |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Variables | Utility-first responsive styling and tokenized theme palette |
| **Icons & Typography** | [Lucide React](https://lucide.dev/) + [Twemoji](https://twemoji.twitter.com/) | Consistent icon set and cross-platform Apple-style emoji rendering |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge delivery, CDN caching, and automated CI/CD pipeline |

---

## 📁 Project Structure

```
Ilyasov/
├── index.html              # HTML5 entry point & metadata
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript strict compiler options
├── vercel.json             # Vercel SPA routing redirects
├── package.json            # Dependencies & scripts
└── src/
    ├── main.tsx            # Application bootstrapping
    ├── assets/             # Brand graphics & profile imagery
    ├── styles/             # Modular styling architecture
    │   ├── fonts.css       # Web font configurations
    │   ├── index.css       # Global reset styles
    │   ├── tailwind.css    # Tailwind engine directives
    │   └── theme.css       # Tokenized color system & keyframes
    └── app/
        ├── App.tsx         # Main interactive portfolio interface
        └── components/
            └── WaveEmoji.tsx # Interactive emoji particle component
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- `npm`, `pnpm`, or `yarn` package manager

### 1. Clone the repository

```bash
git clone https://github.com/Ilyasov09/Ilyasov.git
cd Ilyasov
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to view the application with Hot Module Replacement (HMR).

### 4. Build for production

```bash
npm run build
```

The compiled and optimized assets will be emitted to the `dist/` directory, ready for deployment.

---

## 🚢 Deployment

The project is pre-configured for instant deployment on [Vercel](https://vercel.com):

1. Connect your GitHub repository to Vercel.
2. Vercel automatically detects the **Vite** preset:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Hit **Deploy**. The `vercel.json` file ensures proper client-side route handling.

---

## 📬 Contact & Connect

- **Developer:** Javlon Ilyasov
- **Telegram:** [@ilyasov09](https://t.me/ilyasov09)
- **Channel:** [@cyberdevuz](https://t.me/cyberdevuz)
- **GitHub:** [@Ilyasov09](https://github.com/Ilyasov09)
- **Email:** [javlonilyasov97@gmail.com](mailto:javlonilyasov97@gmail.com)

---

<div align="center">
  <sub>© 2026 Javlon Ilyasov. Designed & developed with focus and passion.</sub>
</div>
