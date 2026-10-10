# Marora Ventures — Portfolio & Product Launchpad

> **"Ideas shipped, not shelved."**  
> An independent digital venture studio by **Manav Arora**. Crafting high-leverage software, e-commerce intelligence tools, and pragmatic digital products designed to eliminate friction and launch fast.

---

## 🚀 Live Demo & Flagship Feature

* **Flagship Product:** **AzASIN** — *The ultimate Amazon ASIN tool* (Chrome Extension / E-commerce SaaS).
* **Interactive Tool:** Built-in client-side **ASIN Instant Inspector** for rapid identifier validation and tracking links (Amazon, CamelCamelCamel, Keepa).
* **Visual Direction:** International Klein Blue (`#002fa7`) tech aesthetic with auto system dark/light mode toggle.
* **Hosting:** 100% free forever on **GitHub Pages** with zero build or bundler dependencies.

---

## 🛠️ Architecture & Tech Stack

This project is intentionally designed with a **zero-build static architecture**, ensuring maximum performance, zero maintenance, and native compatibility with GitHub Pages out of the box:

```
├── .nojekyll       # Bypasses GitHub Pages Jekyll processing
├── index.html      # Semantic HTML5, SEO meta, OpenGraph, JSON-LD schema
├── styles.css      # International Klein Blue tokens, dark/light themes, animations
├── main.js         # Zero-dependency JS: theme switcher, category filter, ASIN validator, modal
└── README.md       # Setup & deployment guide
```

### Key Technical Highlights:
1. **Zero Build Steps:** No Node.js build process, npm dependencies, or Webpack/Vite bundlers required. Edit and push directly.
2. **Theme Toggler (Option C):** Adapts automatically to user's system OS preference (`prefers-color-scheme`) and provides an interactive Sun/Moon toggle persisted in `localStorage`.
3. **Interactive Filter Engine:** Client-side category filtering with live badge counters (`All`, `Chrome Extension`, `Amazon Tools`, `SaaS`, `Free Tools`, `Templates`).
4. **Embedded Micro-Utility:** Includes a functional client-side ASIN validator and tracker generator right on the landing page.
5. **SEO & Social Cards:** Comprehensive OpenGraph tags, Twitter cards, and Schema.org `Organization` & `SoftwareApplication` JSON-LD structured data.

---

## 💻 Local Development & Testing

You can preview the website locally using any standard HTTP server:

### Option 1: Python (Built-in on macOS/Linux)
```bash
python3 -m http.server 8000
```
Then open your browser to [http://localhost:8000](http://localhost:8000).

### Option 2: Node.js / npx
```bash
npx serve .
```

### Option 3: VS Code / Cursor Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 How to Deploy to GitHub Pages (Free Hosting)

Deploying takes under 2 minutes with zero configuration:

### Step 1: Create a New GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `marora-ventures` or `marora-ventures.github.io`).
3. Set the repository to **Public** and do **not** initialize with a README (since this repository already has one).

### Step 2: Push Your Code to GitHub
In your local terminal inside this project folder, run:

```bash
# Add all files to git
git add .

# Commit your changes
git commit -m "feat: launch Marora Ventures umbrella portfolio and AzASIN showcase"

# Rename default branch to main if needed
git branch -M main

# Link your remote GitHub repository (replace with your actual GitHub username/repo)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/marora-ventures.git

# Push code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. On GitHub, navigate to your repository's **Settings** tab.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` and folder `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, GitHub will publish your site to:
   `https://<YOUR_GITHUB_USERNAME>.github.io/marora-ventures/`

*(Note: The included `.nojekyll` file ensures GitHub Pages serves all static assets directly without Jekyll compilation issues.)*

---

## 🏷️ Custom Domain Setup (Optional)

To point a custom domain like `maroraventures.com` to your GitHub Pages site:
1. Create a `CNAME` file in the root directory containing your domain name (e.g., `maroraventures.com`).
2. In your DNS provider (Cloudflare, Namecheap, Google Domains), add:
   - For apex domain (`maroraventures.com`): `A` records pointing to GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
   - For `www`: `CNAME` record pointing to `<YOUR_GITHUB_USERNAME>.github.io`.
3. In GitHub Repository **Settings > Pages > Custom domain**, enter your domain and check **Enforce HTTPS**.

---

## 📬 Contact & Inquiries

* **Studio:** Marora Ventures
* **Founder:** Manav Arora
* **Direct Email:** [maroraventures@gmail.com](mailto:maroraventures@gmail.com)
* **Flagship Inquiries:** Subject line: `AzASIN Early Access`
