# TENET | Human-Governed Agentic Automation Company

An agentic-automation holding company website representing TENET as a modern parent enterprise. The founder acts as the sole human strategist and decision-maker at the top level, with all operational execution carried out by structured specialist AI agents coordinating with other task agents.

## 🚀 Live URL

**Primary domain:** `https://tenet.is-a.dev`
**Fallback:** `https://tenet.pages.dev` (Cloudflare Pages)

## 🛠️ Technology Stack

- **Core Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Fonts**: Inter, JetBrains Mono (Google Fonts)
- **Hosting**: Cloudflare Pages / GitHub Pages (Zero-cost)
- **Domain**: is-a.dev (Free forever)

No database, backend, environment variables, or API keys are required.

## 📁 Project Structure

```text
TENET/
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages CI/CD
├── is-a-dev-registration/
│   └── tenet.json             # is-a.dev domain registration file
├── public/
│   └── favicon.svg            # Custom brand favicon
├── src/
│   ├── components/            # UI Section Components
│   │   ├── About.tsx          # Founder info & core design cards
│   │   ├── AgenticModel.tsx   # Execution framework & agent grid
│   │   ├── Contact.tsx        # mailto: contact channels & form
│   │   ├── Footer.tsx         # Semantic footer with social links
│   │   ├── Governance.tsx     # Compliance pillars
│   │   ├── Hero.tsx           # SVG network animation & CTAs
│   │   ├── Navbar.tsx         # Sticky nav with section observer
│   │   ├── Process.tsx        # Timeline steps
│   │   ├── Services.tsx       # Service capability grid
│   │   └── Ventures.tsx       # Child ventures & connection hub
│   ├── data/
│   │   └── siteData.ts        # Structured content (single source of truth)
│   ├── styles/
│   │   └── globals.css        # Animations, scrollbar & utilities
│   ├── App.tsx                # Root layout & accessibility skip link
│   ├── main.tsx               # Application entry
│   └── vite-env.d.ts          # TypeScript Vite types
├── index.html                 # SEO meta tags, Open Graph, Twitter Cards
├── package.json               # Dependencies & scripts
├── tailwind.config.js         # Design system tokens
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite config (base: '/')
```

## ⚙️ Local Development

### Prerequisites
Node.js v18+ installed.

### Install & Run
```bash
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Build for Production
```bash
npm run build
```
Output: `dist/` directory — ready for any static hosting.

---

## ☁️ Deployment Guide (Zero-Cost)

### Option A: Cloudflare Pages (Recommended)

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com) (free, no credit card)
2. Click **"Create a project"** → **"Connect to Git"**
3. Select your `muniraja92/tenet` GitHub repo
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `20`
5. Click **"Save and Deploy"**
6. Site is live at `tenet.pages.dev`

### Option B: GitHub Pages

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "TENET Agentic Automation Company"
   git branch -M main
   git remote add origin https://github.com/muniraja92/tenet.git
   git push -u origin main
   ```
2. Go to **Settings** → **Pages** → Source: **GitHub Actions**
3. The included `.github/workflows/deploy.yml` will auto-deploy on push
4. Site is live at `muniraja92.github.io/tenet`

### Custom Domain: tenet.is-a.dev (Free)

1. Fork [github.com/is-a-dev/register](https://github.com/is-a-dev/register)
2. Copy `is-a-dev-registration/tenet.json` to `domains/tenet.json` in the fork
3. Submit a Pull Request
4. Wait for approval (1–3 days)
5. Add `tenet.is-a.dev` as custom domain in your hosting platform:
   - **Cloudflare Pages:** Dashboard → Custom domains → Add `tenet.is-a.dev`
   - **GitHub Pages:** Settings → Pages → Custom domain → `tenet.is-a.dev`
6. HTTPS is automatic

---

## ✏️ Customization & Content

All content is centralized in `src/data/siteData.ts`.

**Configured:**
- ✅ Founder: Muniraja Pasupuleti (LinkedIn linked)
- ✅ Email: fbi.muniraja@gmail.com
- ✅ WhatsApp: linked (number hidden)
- ✅ LinkedIn: [Profile](https://www.linkedin.com/in/muniraja-pasupuleti-27637954/)
- ✅ GitHub: [muniraja92](https://github.com/muniraja92)
- ✅ OG/Twitter URLs: `tenet.is-a.dev`

**Customizable:**
1. **Ventures**: Change status from `planned` to `active` when launched
2. **Favicon**: Replace `public/favicon.svg` with finalized brand mark
3. **Content**: Edit any section via `siteData.ts`
