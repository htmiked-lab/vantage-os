# Tiipikids Landing Pages — Netlify Deploy

This folder is deploy-ready for Netlify as a drag-and-drop site.
The included `netlify.toml` wires up clean URLs for the three ad landing pages.

## Live URL mapping

| Clean URL         | Source file            |
| ----------------- | ---------------------- |
| `/bath-buddy`     | `bath-buddy.html`      |
| `/beach-pool`     | `beach-pool.html`      |
| `/summer-bundle`  | `summer-bundle.html`   |
| `/`               | 302 → `https://tiipikids.com` |

## Deploy (drag-and-drop)

1. Sign in to the Netlify dashboard: <https://app.netlify.com/>
2. Go to **Sites → Add new site → Deploy manually**.
3. Drag the **entire `landing-pages/` folder** (this whole folder) onto the drop zone.
4. Wait for the upload to finish. Netlify assigns a random `*.netlify.app` URL.
5. Rename the site (Site settings → Change site name) to something like `tiipikids-landing`
   so URLs become e.g. `https://tiipikids-landing.netlify.app/bath-buddy`.
6. (Optional) Attach a custom domain such as `go.tiipikids.com` under
   Site settings → Domain management → Add custom domain.

## Deploy (Netlify CLI, if you prefer)

```bash
# From the repo root
npm install -g netlify-cli
netlify login
netlify deploy --dir=landing-pages --prod
```

## Updating a page

Edit the HTML file in this folder, then re-deploy:

- **Drag-and-drop:** drag the updated folder onto the site's "Deploys" page in Netlify.
- **CLI:** run `netlify deploy --dir=landing-pages --prod` again.

No build step is needed — these are static HTML files with inline CSS.

## Verifying the deploy

After deploy, smoke-test each URL:

- `https://<your-site>.netlify.app/bath-buddy`
- `https://<your-site>.netlify.app/beach-pool`
- `https://<your-site>.netlify.app/summer-bundle`

Each should render immediately without showing `.html` in the URL bar.
