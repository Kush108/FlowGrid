# FlowGrid — A Grid of Intelligent Utilities

A futuristic, mobile-first homepage for FlowGrid.ca - a collection of AI-powered micro-tools.

## Features

- 🎨 **Futuristic Design**: Dark theme with neon accents, glassmorphism effects, and smooth animations
- 📱 **Mobile-First**: Fully responsive design optimized for all devices
- ✨ **Interactive Grid**: Animated tool tiles with hover effects and 3D transforms
- 🎮 **Gamified Elements**: Cursor trail effects and hidden easter eggs
- 🚀 **Smooth Animations**: Powered by Framer Motion for fluid transitions
- 🎯 **Modern Stack**: Next.js 14+ with App Router, TypeScript, and TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
FlowGrid/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Global styles
├── components/
│   ├── CursorTrail.tsx     # Custom cursor trail effect
│   ├── Hero.tsx            # Hero section with animated headline
│   ├── ToolGrid.tsx        # Main interactive grid
│   ├── GridTile.tsx        # Individual tool tile component
│   ├── ComingSoonModal.tsx # Modal for coming soon tools
│   ├── WhySection.tsx      # Animated statements section
│   ├── FutureExpansion.tsx # Future tools teaser
│   └── Footer.tsx          # Minimal footer
└── package.json
```

## Customization

### Adding New Tools

Edit `components/ToolGrid.tsx` and add new tools to the `tools` array:

```typescript
{
  title: 'Your Tool Name',
  description: 'Tool description',
  status: 'live' | 'beta' | 'coming-soon',
  subdomain: 'yoursubdomain', // Only for 'live' status
  icon: '🎯',
}
```

### Styling

- Colors are defined in `tailwind.config.ts`
- Custom animations in `app/globals.css`
- Component styles use TailwindCSS classes

## Deployment

Build for production:

```bash
npm run build
npm start
```

Deploy to Vercel:

```bash
vercel
```

## Technologies

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library

## License

Private project for FlowGrid.ca
