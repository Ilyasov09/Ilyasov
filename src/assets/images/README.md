# Images / Icons Folder

Bu papkaga o'z rasmlaringizni yuklashingiz mumkin.

## Skill Iconlari

Hozirda skill ikonalari avtomatik ravishda `devicons` CDN orqali yuklanadi:
- HTML → html5-original.svg
- CSS → css3-original.svg
- JavaScript → javascript-original.svg
- React → react-original.svg
- Python → python-original.svg
- Git → git-original.svg
- Figma → figma-original.svg

### O'zingizning ikonalaringizni qo'yish uchun:

1. Bu papkaga rasmni yuklang, masalan: `react-icon.svg`
2. `App.tsx` dagi `SKILL_ICON_URLS` obyektini yangilang:
```js
const SKILL_ICON_URLS = {
  React: "/src/assets/images/react-icon.svg",
  // ...
};
```

## Avatar / Profil rasm

`avatar.jpg` yoki `avatar.png` nomida bu papkaga profil rasmingizni yuklang,
keyin `ProfileCard` komponentida `JI` matnini `<img src="/src/assets/images/avatar.jpg"/>` bilan almashtiring.

## Rasm formatlari qo'llab-quvvatlanadi:
- `.svg` — eng yaxshi (kichik o'lcham, o'tkir)
- `.png` — shaffof fon bilan
- `.jpg` / `.webp` — fotolar uchun
