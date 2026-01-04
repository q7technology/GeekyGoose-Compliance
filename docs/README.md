# GeekyGoose Compliance - GitHub Pages Documentation

This directory contains the source files for the GeekyGoose Compliance documentation website, which is hosted on GitHub Pages.

## 🌐 Live Site

Once deployed, the documentation will be available at:
- **GitHub Pages URL**: `https://ggcompli.github.io/GeekyGoose-Compliance/`
- **Custom Domain** (if configured): `https://docs.geekygoose.io`

## 📁 Directory Structure

```
docs/
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html         # Custom HTML layout
├── assets/
│   └── css/
│       └── style.scss       # Custom CSS styles
├── index.md                 # Home page
├── license.md               # License information
├── commercial.md            # Commercial licensing
├── trademark.md             # Trademark policy
├── contributing.md          # Contributing guide
└── README.md               # This file
```

## 🚀 Deployment Instructions

### Method 1: Enable GitHub Pages (Recommended)

1. **Push this code to GitHub:**
   ```bash
   git add docs/
   git commit -m "Add GitHub Pages documentation site"
   git push origin main
   ```

2. **Enable GitHub Pages in repository settings:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select:
     - **Branch**: `main`
     - **Folder**: `/docs`
   - Click **Save**

3. **Wait for deployment:**
   - GitHub will automatically build and deploy your site
   - This usually takes 1-2 minutes
   - You'll see a message with your site URL

4. **Visit your site:**
   - Go to `https://ggcompli.github.io/GeekyGoose-Compliance/`
   - The site should be live!

### Method 2: Custom Domain (Optional)

If you want to use a custom domain like `docs.geekygoose.io`:

1. **Configure DNS:**
   - Add a `CNAME` record pointing to `ggcompli.github.io`
   - Or add `A` records for GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

2. **Add CNAME file:**
   ```bash
   echo "docs.geekygoose.io" > docs/CNAME
   git add docs/CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

3. **Configure in GitHub:**
   - Go to **Settings** → **Pages**
   - Enter your custom domain in the **Custom domain** field
   - Check **Enforce HTTPS**

## 🛠️ Local Development

To test the site locally before deploying:

### Prerequisites

Install Ruby and Jekyll:

```bash
# On macOS
brew install ruby
gem install bundler jekyll

# On Ubuntu/Debian
sudo apt-get install ruby-full build-essential
gem install bundler jekyll

# On Windows
# Use RubyInstaller: https://rubyinstaller.org/
```

### Run Locally

```bash
# Navigate to docs directory
cd docs/

# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve

# Open in browser
open http://localhost:4000
```

The site will auto-reload when you make changes to the files.

## 📝 Editing Content

### Adding a New Page

1. Create a new Markdown file in the `docs/` directory:
   ```bash
   touch docs/my-new-page.md
   ```

2. Add front matter at the top:
   ```markdown
   ---
   layout: default
   title: My New Page
   ---

   # My New Page

   Content here...
   ```

3. Add a link to the navigation in `docs/_layouts/default.html`:
   ```html
   <li><a href="{{ '/my-new-page' | relative_url }}">My New Page</a></li>
   ```

### Editing Existing Pages

Simply edit the Markdown files in the `docs/` directory:
- `index.md` - Home page
- `license.md` - License information
- `commercial.md` - Commercial licensing
- `trademark.md` - Trademark policy
- `contributing.md` - Contributing guide

Changes will be live after pushing to GitHub (or immediately if running locally).

## 🎨 Customizing Styles

### Edit CSS

Edit `docs/assets/css/style.scss` to customize the site's appearance:

```scss
/* Add your custom styles here */
.my-custom-class {
  color: #0366d6;
}
```

### Change Theme

Edit `docs/_config.yml` to change the Jekyll theme:

```yaml
theme: jekyll-theme-cayman  # Current theme
# Or try: jekyll-theme-minimal, jekyll-theme-slate, etc.
```

## 🔧 Configuration

### Site Settings

Edit `docs/_config.yml` to configure:

```yaml
title: GeekyGoose Compliance
description: Your description here
url: "https://ggcompli.github.io"
baseurl: "/GeekyGoose-Compliance"

# Add your settings
github_username: ggcompli
twitter:
  username: geekygoose
```

## 📊 Analytics (Optional)

To add Google Analytics:

1. Get your Google Analytics tracking ID (e.g., `G-XXXXXXXXXX`)

2. Add to `_config.yml`:
   ```yaml
   google_analytics: G-XXXXXXXXXX
   ```

3. Jekyll will automatically include the tracking code

## 🐛 Troubleshooting

### Site Not Showing Up

1. **Check GitHub Pages is enabled:**
   - Settings → Pages → Source should be set to `main` branch and `/docs` folder

2. **Check build status:**
   - Go to repository **Actions** tab
   - Look for Pages build workflow
   - Check for errors in the build log

3. **Clear browser cache:**
   - Sometimes the old version is cached
   - Try opening in incognito/private mode

### Styling Not Working

1. **Check file paths:**
   - Ensure `style.scss` is in `docs/assets/css/`
   - Front matter (`---`) must be at the top of `style.scss`

2. **Check imports:**
   - Make sure `@import "{{ site.theme }}"` is in `style.scss`

### 404 Errors

1. **Check baseurl:**
   - If using GitHub Pages at `username.github.io/repo-name/`
   - Set `baseurl: "/repo-name"` in `_config.yml`

2. **Check links:**
   - Use `{{ '/page' | relative_url }}` for internal links
   - Don't use absolute URLs

## 📚 Resources

- **Jekyll Documentation**: https://jekyllrb.com/docs/
- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **Markdown Guide**: https://www.markdownguide.org/
- **Jekyll Themes**: https://jekyllrb.com/docs/themes/

## 🤝 Contributing to Docs

To contribute to the documentation:

1. Fork the repository
2. Edit files in the `docs/` directory
3. Test locally with `bundle exec jekyll serve`
4. Submit a pull request

See [CONTRIBUTING.md](contributing.md) for more details.

## 📄 License

The documentation is licensed under the same license as the main project (AGPLv3).

---

**Questions?** Open an issue or contact [admin@geekygoose.io](mailto:admin@geekygoose.io)
