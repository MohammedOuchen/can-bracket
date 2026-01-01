# 🏆 CAN Bracket - Africa Cup of Nations Predictions

A modern, interactive web application for predicting the knockout stage of the Africa Cup of Nations (CAN) hosted in Morocco. Built with Vue 3, Vite, and Tailwind CSS.

## ✨ Features

- **Match-by-Match Flow**: Predict matches one at a time with a focused, step-by-step experience
- **Drag & Drop Interaction**: Intuitive drag and drop interface for selecting winners (desktop)
- **Mobile-Friendly**: Touch-optimized buttons for mobile devices
- **Automatic Progression**: Winners automatically advance to the next round
- **Final Recap Card**: Beautiful summary card showing the champion and complete knockout path
- **Local Storage**: Your predictions are automatically saved and restored
- **Morocco/CAN Theme**: Styled with official tournament colors (red, green, gold)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd can-bracket
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎮 How to Use

1. **Start Predicting**: Begin with the Round of 16 matches
2. **Select Winners**: Drag a team card to the drop zone, or click the team button on mobile
3. **Progress Through Rounds**: After completing each round, the next round automatically populates
4. **View Final Recap**: Once all matches are complete, see your predicted champion and full bracket

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Composition API** - Modern Vue 3 API
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Drag & Drop** - Native browser API (no external libraries)

## 📁 Project Structure

```
can-bracket/
├── src/
│   ├── components/       # Vue components
│   │   ├── MatchStep.vue
│   │   ├── TeamCard.vue
│   │   ├── DropZone.vue
│   │   ├── ProgressStepper.vue
│   │   └── FinalRecapCard.vue
│   ├── composables/      # Vue composables
│   │   └── useBracket.js
│   ├── data/            # Static data
│   │   └── teams.js
│   ├── assets/          # Styles and assets
│   │   └── main.css
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Customization

The app uses custom colors defined in `tailwind.config.js`:

- Morocco Red: `#c1272d`
- CAN Green: `#006233`
- Gold: `#FFD700`

You can modify these colors or add new teams in `src/data/teams.js`.

## 📝 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

Built for the Africa Cup of Nations (CAN) tournament predictions.
