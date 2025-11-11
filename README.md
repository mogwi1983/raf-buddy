# raf-buddy
Documentation tool to improve HCC capture rate thereby optimizing RAF

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the app.

## Environment Variables

Copy `env.example` to `.env.local` and set the required Firebase credentials (and optional AI keys) before running the app.

## Tech Stack

- Next.js 14 App Router with TypeScript and Tailwind CSS
- Firebase Authentication & Firestore (client SDK)
- Placeholder AI analysis flow ready for OpenAI/Anthropic integration

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – run the production build
- `npm run lint` – lint the codebase
