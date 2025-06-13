# 🌐 GitHub + jsDelivr CDN Cheatsheet

jsDelivr is a free CDN for any file in a public GitHub repo.

---

## 🔧 jsDelivr GitHub URL Format

```
https://cdn.jsdelivr.net/gh/<username>/<repo>@<branch-or-commit>/<path/to/file>
```

- `@<branch>` is optional (default branch is used).
- Use `@<commit>` to pin the file version (recommended).

---

## ✅ Usage Examples

### 🟨 JavaScript
```html
<script src="https://cdn.jsdelivr.net/gh/user/repo/js/main.js"></script>
```

### 🟦 CSS
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/user/repo/css/style.css">
```

### 🟪 Fonts (WOFF2)
```css
@font-face {
  font-family: 'MyFont';
  src: url('https://cdn.jsdelivr.net/gh/user/repo/fonts/my-font.woff2') format('woff2');
}
```

### 🟥 Images
```html
<img src="https://cdn.jsdelivr.net/gh/user/repo/images/logo.png" alt="Logo">
```

### 🟩 Video (MP4)
```html
<video controls>
  <source src="https://cdn.jsdelivr.net/gh/user/repo/videos/demo.mp4" type="video/mp4">
</video>
```

### 🟫 JSON
```js
fetch("https://cdn.jsdelivr.net/gh/user/repo/data/config.json")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📌 Pin to a Commit
Replace `@branch` with `@commit-hash` for stability:

```
https://cdn.jsdelivr.net/gh/user/repo@a1b2c3d4/js/main.js
```

---

## 🧪 Test Your Links
Open in browser or check with DevTools > Network.

---

## 🔗 Example from Real Use

**GitHub:**  
https://raw.githubusercontent.com/dduyg/LiminalLoop/main/06/kemalizm.mp4

**jsDelivr:**  
https://cdn.jsdelivr.net/gh/dduyg/LiminalLoop/06/kemalizm.mp4

**Use in HTML:**  
```html
<video controls>
  <source src="https://cdn.jsdelivr.net/gh/dduyg/LiminalLoop/06/kemalizm.mp4" type="video/mp4">
</video>
```

---

🧠 Tip: Works for all public files including SVG, MP3, ZIP, JSON, etc.