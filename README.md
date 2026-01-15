<p align="center">
  <img src="https://raw.githubusercontent.com/codesbykhairannoor/playforcalm/main/public/logo.png" width="120" alt="PlayForCalm Logo" />
</p>

<h1 align="center">🍃 PlayForCalm</h1>
<p align="center"><i>A Zen-Oriented Interactive Web Experience for Focus & Mental Clarity</i></p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/TailwindCSS-Utility--First-38BDF8?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Framer--Motion-Animation-EF476F" />
  <img src="https://img.shields.io/github/actions/workflow/status/codesbykhairannoor/playforcalm/ci.yml?label=CI&logo=github" />
</p>

---

## 🧠 About the Project

**PlayForCalm** is an interactive web application designed to improve **focus, clarity, and mental balance** through calm digital experiences.

Instead of dopamine-heavy mechanics, the project prioritizes:
- 🧘 mindful interaction
- 🧠 cognitive clarity
- 🔁 consistency over competition

Classic puzzles like **Sudoku** and **Memory Games** are used as tools for focus training — not stress or pressure.

---

## ✨ Features Overview

| Feature | Description |
|------|------------|
| 🌍 **Multi-language i18n** | Instant language switching without reload |
| 🧘 **Zen UI/UX** | Low-contrast colors & calm motion |
| 📱 **Responsive Layout** | Adaptive navbar (desktop & mobile) |
| 🔥 **Gamification** | Focus streaks & leveling system |
| ⚡ **Optimized Performance** | Minimal CLS & fast rendering |

---

## 🛠️ Tech Stack

```ts
const stack = {
  framework: "Next.js 15 (App Router)",
  styling: "Tailwind CSS",
  animation: "Framer Motion",
  state: "React Context API",
  i18n: "Custom JSON Dictionary",
  icons: "Lucide React",
  build: "Turbopack",
};


📦 playforcalm
 ┣ 📂 app
 ┃ ┣ 📜 layout.tsx        # Root layout + providers
 ┃ ┣ 📜 icon.tsx          # Dynamic favicon (Edge Runtime)
 ┃ ┗ 📜 page.tsx          # Main entry
 ┣ 📂 components
 ┃ ┣ 📂 layout            # Navbar, Footer
 ┃ ┗ 📂 ui                # Buttons, overlays, cards
 ┣ 📂 context             # Language & Gamification state
 ┣ 📂 dictionaries        # i18n JSON files
 ┗ 📂 public              # Static assets


🎞️ UX Philosophy (Why It Feels Calm)
graph TD
A[Minimal UI] --> B[Lower Cognitive Load]
B --> C[Better Focus]
C --> D[Consistent Usage]

🎨 Color palette avoids harsh contrast
🎞️ Animations are state-based, not decorative
⏱️ Transitions guide attention, not distract it

🧪 Development Workflow
feat/*     # new features
fix/*      # bug fixes
refactor/* # structural improvements

✅ Pull Request based workflow
🔄 CI pipeline for build validation
🧹 Consistent code formatting