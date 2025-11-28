# Shubham Singh - Portfolio

🌐 **Live Site:** [shubhamsinngh.com](https://shubhamsinngh.com)

A modern, performant portfolio website built with Next.js 14, showcasing professional experience in Site Reliability Engineering, Platform Engineering, DevSecOps, and AI Ops.

![Portfolio Preview](/public/og-image.png)

## ✨ Features

- **Modern UI/UX** - Sleek dark theme with gradient accents, smooth animations powered by Framer Motion
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- **SEO Optimized** - Comprehensive meta tags, structured data (JSON-LD), sitemap, and Open Graph images
- **Performance Focused** - Image optimization, compression, security headers, and Vercel analytics
- **Blog System** - Built-in blog with markdown-style content and dynamic OG image generation
- **Interactive Components** - Lamp effect hero, reveal cards, spotlight effects, and animated skill categories

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, CSS Variables |
| **Animations** | Framer Motion |
| **Icons** | Lucide React, Tabler Icons |
| **Analytics** | Vercel Analytics, Speed Insights |
| **Deployment** | Vercel |

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── logos/              # Company logos & certificates
│   ├── og-image.png        # Open Graph image
│   ├── robots.txt          # SEO robots configuration
│   └── SHUBHAM_RESUME_'25.pdf
├── src/
│   ├── app/
│   │   ├── components/     # Shared components
│   │   │   ├── ui/         # UI primitives (navbar, cards, effects)
│   │   │   ├── hero.tsx    # Hero section with lamp effect
│   │   │   └── footer.tsx  # Site footer
│   │   ├── awards/         # Awards & recognitions page
│   │   ├── blog/           # Blog section with dynamic routing
│   │   │   ├── [slug]/     # Individual blog post pages
│   │   │   └── blog-data.ts # Blog content
│   │   ├── contact/        # Contact page
│   │   ├── experience/     # Professional experience timeline
│   │   ├── projects/       # Featured projects
│   │   ├── publications/   # Research publications
│   │   ├── skills/         # Technical skills showcase
│   │   ├── story/          # Personal story & testimonials
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Homepage
│   │   ├── sitemap.ts      # Dynamic sitemap generation
│   │   └── globals.css     # Global styles
│   └── utils/
│       └── cn.ts           # Class name utility (clsx + tailwind-merge)
├── tailwind.config.ts      # Tailwind configuration with custom plugins
├── next.config.mjs         # Next.js configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/shubhamcommits/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server (runs on port 3001)
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the site.

### Production Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, executive summary, skills overview, and testimonials |
| `/story` | Personal journey and detailed testimonials |
| `/experience` | Professional experience at Salesforce, Airtel, Amway, Legitmark, Octonius |
| `/projects` | Featured projects (Tangerine Platform, Remix Recipe, CoffeeTrace) |
| `/skills` | 14+ skill categories with 100+ technologies |
| `/publications` | Research papers and publications |
| `/awards` | Awards and recognitions |
| `/blog` | Technical blog posts on AI Ops, Kubernetes, and more |
| `/contact` | Contact information and booking |

## 🎨 Key UI Components

- **LampContainer** - Animated lamp effect for hero sections
- **HeroHighlight** - Gradient highlight background effect
- **RevealCard** - Scroll-triggered reveal animations
- **ExperienceCard** - Expandable experience cards with timeline
- **ProjectCard** - Project showcase with tech stack badges
- **Navbar** - Responsive navigation with mobile drawer
- **Spotlight** - Interactive spotlight effect

## ⚡ Performance & SEO

### Optimizations
- Image optimization with AVIF/WebP formats
- SWC minification enabled
- Compression enabled
- Security headers (HSTS, XSS Protection, etc.)
- DNS prefetch control

### SEO Features
- Comprehensive meta tags
- JSON-LD structured data (Person schema)
- Dynamic sitemap generation
- Open Graph & Twitter cards
- Canonical URLs
- Keyword optimization for SRE, DevOps, AI Ops, Kubernetes

## 🔧 Configuration

### Environment Variables

No environment variables required for basic setup. Vercel Analytics and Speed Insights are automatically configured.

### Tailwind Customization

Custom Tailwind plugins are configured for:
- CSS variables for all colors
- Custom dot pattern backgrounds
- Spotlight animation keyframes

## 📦 Dependencies

### Production
- `next` - React framework
- `react` / `react-dom` - UI library
- `framer-motion` - Animation library
- `@tabler/icons-react` / `lucide-react` - Icon libraries
- `@vercel/analytics` / `@vercel/speed-insights` - Analytics
- `clsx` / `tailwind-merge` - Class name utilities
- `tailwindcss-animate` - Animation utilities

### Development
- `typescript` - Type safety
- `tailwindcss` - Utility CSS
- `eslint` / `eslint-config-next` - Linting
- `postcss` - CSS processing

## 🚢 Deployment

The site is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with zero configuration

### Alternative Platforms

Can also be deployed to:
- Netlify
- AWS Amplify
- Docker containers
- Any Node.js hosting

## 👤 Author

**Shubham Singh**
- Member of Technical Staff at Salesforce
- Engineering Manager at Legitmark
- Site Reliability Engineer | DevSecOps | AI Ops

### Connect
- 🌐 Website: [shubhamsinngh.com](https://shubhamsinngh.com)
- 💼 LinkedIn: [linkedin.com/in/shubham-sinngh](https://www.linkedin.com/in/shubham-sinngh/)
- 🐙 GitHub: [github.com/shubhamcommits](https://github.com/shubhamcommits)
- 🐦 Twitter: [@shubhamsinngh_](https://twitter.com/shubhamsinngh_)
- 📧 Email: shubham.sinngh@outlook.com

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using Next.js and deployed on Vercel
</p>
