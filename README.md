## CareAlign CDI — Clinical Documentation Intelligence Platform

CareAlign CDI is a Next.js 14+ application that helps value-based care teams improve Hierarchical Condition Category (HCC) capture and Risk Adjustment Factor (RAF) scoring. Clinicians paste encounter notes and receive AI-assisted guidance to document chronic conditions precisely and compliantly.

### Tech Stack
- Next.js App Router with TypeScript
- Tailwind CSS 4 for design system
- Firebase Authentication & Firestore (client SDK)
- OpenAI/Anthropic (server API route integration planned)
- Vercel for hosting

### Project Structure
```
src/
  app/                    # Route handlers (App Router)
    (auth)/               # Public auth pages
    (protected)/          # Authenticated sections
    layout.tsx            # Root layout with navigation/footer
    globals.css           # Tailwind base + design tokens
  components/
    auth/                 # Auth provider & guard
    layout/               # Navbar, footer, providers
    ui/                   # Shared UI elements
  lib/
    firebase/             # Firebase client bootstrap
  types/                  # Shared TypeScript contracts
```

### Environment Variables
Copy `.env.example` to `.env.local` and populate the values from your Firebase project and AI provider of choice.

```powershell
Copy-Item .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `OPENAI_API_KEY` | Optional — GPT-4 based analysis |
| `ANTHROPIC_API_KEY` | Optional — Claude based analysis |

### Firebase Setup Checklist
1. Create a Firebase project and enable Email/Password authentication.
2. Register a Web App and copy the configuration values into `.env.local`.
3. (Optional) Create a Firestore database in *Native mode* for note history.

### Scripts
```powershell
npm install        # Install dependencies
npm run dev        # Start Next.js in development mode
npm run build      # Produce a production build
npm start          # Serve the production build
npm run lint       # Run ESLint (Next.js core-web-vitals ruleset)
```

### Next Steps
- Implement secure server actions/API routes for AI analysis (`/app/api/analyze`).
- Persist note submissions and AI responses to Firestore.
- Build the dashboard/history views surfaced via the navigation.
- Integrate organization-level role management if needed.

### Design Notes
- Clinical aesthetic: calm whites/blues, high legibility, responsive between 1280px+ desktop and tablet breakpoints.
- RAF impact is color-coded (emerald = high, amber = medium, slate = low).
- Copy-to-clipboard shortcuts help providers transfer guidance into their EHR quickly.

