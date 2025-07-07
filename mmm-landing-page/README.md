# MMM Landing Page - Halliard

This is the Marketing Mix Modeling (MMM) landing page for Halliard, built with Next.js and Tailwind CSS using the Salient template structure.

## Features

- Built with Next.js 14 and React 18
- Styled with Tailwind CSS using the Salient template design system
- Halliard brand colors and guidelines integrated
- Responsive design optimized for all devices
- SEO optimized with proper meta tags

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd Marketing/Outcomes-campaign/Landing-pages/mmm-landing-page
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
src/
├── components/          # React components
│   ├── Hero.jsx        # Hero section with main headline
│   ├── ProblemSection.jsx
│   ├── SolutionSection.jsx
│   ├── FeaturesSection.jsx
│   ├── TestimonialsSection.jsx
│   ├── UseCasesSection.jsx
│   ├── FAQSection.jsx
│   ├── CallToAction.jsx
│   ├── Button.jsx      # Reusable button component
│   └── Container.jsx   # Layout container
├── styles/
│   └── tailwind.css    # Tailwind imports
├── page.jsx            # Main page component
└── layout.jsx          # Next.js layout wrapper
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `.next` directory.

## Deployment

This site can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting service

## Customization

- **Colors**: Halliard brand colors are defined in `tailwind.config.js`
- **Content**: All content is sourced from the components in `src/components/`
- **Fonts**: Uses Inter and Lexend fonts from Google Fonts

## Brand Guidelines

- Primary Blue: #1F3FFF
- Text Black: #1F1F1F  
- Text Gray: #4B4B4B
- Logo: https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512 