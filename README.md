# Javlon Ilyasov — Portfolio

> React + Vite + Tailwind CSS 4 + TypeScript  
> Twemoji (iPhone emojis) · WaveEmoji animatsiyalar · Spotify playlist · Dark/Light theme · UZ/EN tillari

---

## 🚀 Vercel da deploy qilish (eng oson yo'l)

### 1-qadam — GitHub ga push qiling

```bash
cd portfolio_final
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Ilyasov09/portfolio.git
git push -u origin main
```

### 2-qadam — Vercel ga ulang

1. **[vercel.com](https://vercel.com)** ga kiring → "Add New Project"
2. GitHub repo ni tanlang
3. Settings **avtomatik aniqlanadi**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy** tugmasini bosing

✅ **Tamom!** Vercel avtomatik HTTPS, CDN va har yangi push da deploy qiladi.

---

## 💻 Lokal ishga tushirish

```bash
# 1. O'rnatish
npm install

# 2. Dev server
npm run dev

# 3. Production build
npm run build

# 4. Build ni tekshirish
npm run preview
```

---

## 🖼️ Rasm qo'shish

**Barcha rasmlar bir joyda:**

```
src/
└── assets/
    └── images/       ← shu papkaga rasmingizni tashlang
        ├── profile.jpg
        ├── avatar.png
        └── README.md
```

**Rasmni ishlatish:**

```tsx
import profileImg from "@/assets/images/profile.jpg";

<img src={profileImg} alt="Javlon" />
```

> Rasm qo'shilgach Vite uni avtomatik optimallashtiradi va hash bilan chiqaradi.

---

## 🎵 Spotify playlist

`App.tsx` dagi `Interests` komponentida iframe manzili:

```tsx
src="https://open.spotify.com/embed/playlist/7npUa7F0wedFQmGu3SuSXC?utm_source=generator&theme=0"
```

O'z playlistingizni ulash uchun Spotify dan **playlist ID** ni olib, shu URL dagi ID ni almashtiring.

---

## 🍎 iPhone Emoji (Twemoji)

Barcha emojilar `WaveEmoji` komponenti orqali iPhone uslubida ko'rsatiladi:

```tsx
import WaveEmoji from "./components/WaveEmoji";

<WaveEmoji emoji="🚀" size={24} />
```

- **Hover / click** → bounce + rang particles + ping effekti
- Barcha qurilmalarda bir xil ko'rinadi (Twemoji CDN)
- Fallback: CDN ishlamasa native emoji ko'rsatiladi

---

## 🗂️ Loyiha tuzilmasi

```
portfolio_final/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json          ← SPA routing
├── package.json
├── src/
│   ├── main.tsx
│   ├── assets/
│   │   └── images/      ← RASMLAR SHU YERDA
│   ├── styles/
│   │   ├── index.css
│   │   ├── fonts.css
│   │   ├── tailwind.css
│   │   └── theme.css    ← CSS o'zgaruvchilar + WaveEmoji animatsiyalar
│   └── app/
│       ├── App.tsx       ← Asosiy komponent
│       └── components/
│           └── WaveEmoji.tsx  ← iPhone emoji komponenti
```

---

## 🔧 Ma'lumotlarni o'zgartirish

`App.tsx` dagi quyidagi ob'ektlarni tahrirlang:

| O'zgaruvchi | Maqsad |
|-------------|--------|
| `socialLinks` | GitHub, Instagram, Telegram, Email manzillar |
| `skillsList` | Ko'nikmalar va foizlar |
| `toolsList` | Ishlatadigan vositalar |
| `translations.uz.projects` | Loyihalar (UZ) |
| `translations.en.projects` | Loyihalar (EN) |

---

## 📦 Paketlar

| Paket | Versiya | Maqsad |
|-------|---------|--------|
| `@twemoji/api` | ^15.1.0 | iPhone emoji rendering |
| `lucide-react` | 0.487.0 | Ikonkalar |
| `tailwindcss` | 4.1.12 | Uslublash |
| `vite` | 6.3.5 | Build tool |
| `react` | 18.3.1 | UI framework |
