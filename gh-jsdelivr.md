# 🌐 Using GitHub + jsDelivr CDN
jsDelivr allows you to serve *any static file* from a *public GitHub repository*—fast, free, and reliable. This is useful for:
- Web projects
- Hosting assets (scripts, styles, media)
- Sharing static content without backend setup

## 🔧 jsDelivr GitHub URL Format
```
https://cdn.jsdelivr.net/gh/<username>/<repo>@<branch-or-commit>/<path/to/file>
```

- `@<branch>` (like `@main`) is optional; it defaults to the default branch.
- `@<commit>` is recommended for production use to avoid surprises when files change.

## ✅ Usage Examples

### 🟨 JavaScript File
GitHub Path:
```
https://github.com/user/my-repo/blob/main/js/main.js
```

jsDelivr URL:
```
https://cdn.jsdelivr.net/gh/user/my-repo/js/main.js
```

**Use in HTML:**
```html
<script src="https://cdn.jsdelivr.net/gh/user/my-repo/js/main.js"></script>
```

### 🟦 CSS File
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/user/my-repo/css/style.css">
```

### 🟪 Font File (`woff2`, `ttf`)
```css
@font-face {
  font-family: 'MyFont';
  src: url('https://cdn.jsdelivr.net/gh/user/my-repo/fonts/my-font.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

### 🟥 Image (`.png`, `.jpg`, `.svg`)

```html
<img src="https://cdn.jsdelivr.net/gh/user/my-repo/images/logo.png" alt="Logo">
```

### 🟩 Video File (`.mp4`)
```html
<video controls>
  <source src="https://cdn.jsdelivr.net/gh/user/my-repo/videos/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

### 🟫 JSON File
```
fetch("https://cdn.jsdelivr.net/gh/user/my-repo/data/config.json")
  .then(res => res.json())
  .then(data => console.log(data));
```

## 📌 Pinning to a Commit (Best Practice)
To prevent breaking changes when files are updated, pin the file to a **specific commit**.

1. Go to the GitHub file.
2. Click the file → click the "Copy permalink" (with commit hash).
3. Replace `main` with the commit hash:

**Example:**
```
https://cdn.jsdelivr.net/gh/user/my-repo@a1b2c3d4/js/main.js
```

## 💡 Tips
- Files must be in **public** repositories.
- Use the `gh/` prefix for GitHub; there's also support for `npm` and `WordPress`.
- jsDelivr automatically uses the best CDN node worldwide for fast delivery.
- 🧠 Works for all public files including SVG, MP3, ZIP, JSON, etc.

## 🔗 Real Example from Your Case

**GitHub File:**
```
https://raw.githubusercontent.com/dduyg/LiminalLoop/main/06/kemalizm.mp4
```

**jsDelivr URL:**
```
https://cdn.jsdelivr.net/gh/dduyg/LiminalLoop/06/kemalizm.mp4
```

**Usage:**
```html
<video controls>
  <source src="https://cdn.jsdelivr.net/gh/dduyg/LiminalLoop/06/kemalizm.mp4" type="video/mp4">
</video>
```

## 🧪 Test Your Links
To verify a jsDelivr link:

- Open it in the browser.
- Check DevTools → Network to confirm it's loading via CDN.
