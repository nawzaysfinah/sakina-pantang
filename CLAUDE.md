# Sakina — 44-Day Postpartum Refugio
## Claude Code Deployment Instructions

This is a single-page HTML app. The goal is to:
1. Create a GitHub repository called `sakina-pantang`
2. Push `index.html` to it
3. Deploy to Netlify via CLI and get a live URL

---

## Prerequisites to confirm before starting

```bash
gh --version        # GitHub CLI — must be authenticated
netlify --version   # Netlify CLI — must be authenticated
git --version       # Git
```

If not authenticated:
```bash
gh auth login                    # follow prompts
netlify login                    # opens browser
```

---

## Step 1 — Create GitHub repo and push

```bash
cd ~/path/to/sakina-pantang      # wherever you put the index.html

git init
git add index.html
git commit -m "feat: Sakina 44-day postpartum refugio — initial deploy"

gh repo create sakina-pantang \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description="Sakina — 44-day halal postpartum confinement program"

echo "✓ Repo live at: https://github.com/nawzaysfinah/sakina-pantang"
```

---

## Step 2 — Deploy to Netlify

```bash
# Link or create Netlify site
netlify sites:create --name sakina-pantang

# Deploy to production
netlify deploy --dir=. --prod

# This will output:
# Website URL: https://sakina-pantang.netlify.app
```

If the site name `sakina-pantang` is taken, try `sakina-refugio` or `sakina-pantang-sg`.

---

## Step 3 — Connect GitHub to Netlify (optional, enables auto-deploy on push)

```bash
netlify link --name sakina-pantang
```

Then in Netlify dashboard:
- Site settings → Build & deploy → Link to GitHub repo
- Branch: `main`
- Publish directory: `.` (root)
- Build command: (leave empty — it's plain HTML)

After linking, every `git push` auto-deploys.

---

## Step 4 — Verify

```bash
netlify open --site        # opens live site in browser
netlify status             # shows site info and URL
```

Expected output:
```
Current Netlify User  : Syaz
NetlifySite Name      : sakina-pantang
NetlifySite ID        : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Admin URL             : https://app.netlify.com/sites/sakina-pantang
Site URL              : https://sakina-pantang.netlify.app
```

---

## File structure (keep it simple)

```
sakina-pantang/
└── index.html          # entire app — self-contained, no build step
```

No `package.json`, no build process, no dependencies. Just HTML.

---

## Future updates

To update the site after editing `index.html`:

```bash
git add index.html
git commit -m "update: [describe change]"
git push                 # auto-deploys if connected to Netlify
```

Or for a manual deploy without GitHub:
```bash
netlify deploy --dir=. --prod
```

---

## If you want a custom domain later

```bash
netlify domains:add sakina.sg        # or whatever domain you own
```

Then point your DNS CNAME to `sakina-pantang.netlify.app`.

---

## Notes

- The app uses `localStorage` to track completed days — data stays in the user's browser
- No backend, no database, no server costs
- Fully mobile-responsive
- Safe to share publicly — no personal data stored server-side
