# GitHub Pages Setup Guide

Quick guide to deploy your GeekyGoose Compliance documentation site.

## 🚀 Quick Deploy (5 Minutes)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add GitHub Pages documentation site"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. Click **Pages** in the left sidebar
4. Under **Source**:
   - **Branch**: Select `main`
   - **Folder**: Select `/docs`
5. Click **Save**

### Step 3: Wait for Deployment

- GitHub will build your site automatically
- Takes 1-2 minutes
- Watch the deployment at: Repository → **Actions** tab

### Step 4: Visit Your Site

Your site will be live at:
```
https://ggcompli.github.io/GeekyGoose-Compliance/
```

## ✅ That's it! Your documentation site is live!

---

## 📝 What's Included

Your GitHub Pages site includes:

- **Home Page** - Project overview and quick links
- **License Page** - Dual-license model explanation
- **Commercial License** - Enterprise licensing options
- **Trademark Policy** - Name and logo usage guidelines
- **Contributing Guide** - How to contribute to the project

---

## 🎨 Customization

### Change Repository Name

If your repository is at a different URL, update `docs/_config.yml`:

```yaml
url: "https://yourusername.github.io"
baseurl: "/your-repo-name"
repository: yourusername/your-repo-name
```

### Change Colors/Theme

Edit `docs/assets/css/style.scss` to customize colors:

```scss
/* Change header gradient */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add Your Logo

1. Add logo image to `docs/assets/images/logo.png`
2. Update `_config.yml`:
   ```yaml
   logo: /assets/images/logo.png
   ```

---

## 🌐 Custom Domain (Optional)

Want to use `docs.geekygoose.io` instead of GitHub's URL?

### 1. Configure DNS

Add a CNAME record in your DNS provider:
```
CNAME  docs  ggcompli.github.io
```

### 2. Add CNAME File

```bash
echo "docs.geekygoose.io" > docs/CNAME
git add docs/CNAME
git commit -m "Add custom domain"
git push origin main
```

### 3. Configure in GitHub

1. Go to **Settings** → **Pages**
2. Enter `docs.geekygoose.io` in **Custom domain**
3. Check **Enforce HTTPS**
4. Wait for DNS check to complete

---

## 🧪 Test Locally Before Deploying

### Install Jekyll

```bash
# macOS
brew install ruby
gem install bundler jekyll

# Ubuntu/Debian
sudo apt-get install ruby-full build-essential
gem install bundler jekyll
```

### Run Local Server

```bash
cd docs/
bundle exec jekyll serve

# Open http://localhost:4000
```

---

## 🐛 Troubleshooting

### Site Not Showing?

1. **Check Settings → Pages** - Ensure source is `main` branch, `/docs` folder
2. **Check Actions Tab** - Look for build errors
3. **Wait a few minutes** - First deploy can take up to 10 minutes
4. **Clear browser cache** - Try incognito/private mode

### 404 Errors?

Update `baseurl` in `_config.yml`:
```yaml
baseurl: "/GeekyGoose-Compliance"  # Your repo name
```

### Styling Issues?

1. Ensure `style.scss` has front matter (`---`) at the top
2. Check file is at `docs/assets/css/style.scss`
3. Clear browser cache

---

## 📚 Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Jekyll Docs**: https://jekyllrb.com/docs/
- **Full Setup Guide**: See `docs/README.md`

---

## 🎉 Success!

Your documentation site is now live and will automatically update whenever you push changes to the `docs/` folder on the `main` branch.

**Next Steps:**
1. Share your documentation URL
2. Add it to your main README
3. Link from your project website
4. Update content as needed

---

**Questions?** Contact [admin@geekygoose.io](mailto:admin@geekygoose.io)
