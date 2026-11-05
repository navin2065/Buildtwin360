# 📖 The Unwritten Chapter – Customization & Image Guide
## For Arunadevi (Born 09 November 2002 • Elder Sister)

All content, photos, captions, and personal letter texts are centralized in:
👉 `src/config/experienceConfig.js`

You can either replace the existing images in `public/images/` or change the image paths directly in `src/config/experienceConfig.js`.

---

## 🗂️ Central Configuration: `src/config/experienceConfig.js`

### 1. Personal Details (`recipient`)
```javascript
recipient: {
  fullName: "Arunadevi",
  preferredName: "Arunadevi",
  nickname: "Akka",
  dob: "09 November 2002",
  birthYear: 2002,
  relationship: "Elder Sister",
  senderTitle: "Your Younger Brother",
  senderName: "Your Thambi",
}
```

### 2. Screen 1: The Secret Word (`secretEntry`)
- Configured secret answer: `"aruna akkow"` (case-insensitive & whitespace trimmed)
- Accepted variations: `["aruna akkow", "arunaakkow", "aruna akko", "aruna akka", "aruna"]`
- Hint provided: `"Think of how your name is saved in my phone contacts 📱"`
- Small Heading: `"A LITTLE SECRET BEFORE WE BEGIN"`
- Main Heading: `"One little question..."`
- Description: `"Every story has a secret. Before you open this chapter, tell me the special name that only I call you."`
- Button: `"UNLOCK MY STORY →"`
- Error message with unlimited retries: `"Not quite... Here's a little hint: Think of our special memories."`
- On correct entry, a golden butterfly flutters into the illuminated open book, initiating the page-opening transition and starting ambient sound!

### 3. Screen 2: The First Page (`prologue`)
- Short emotional prologue addressed to Arunadevi.

### 4. Screen 3: Our Memories (`memories`)
Edit photo paths, titles, and captions in `src/config/experienceConfig.js`:
- `mem-1` (`/images/M1.jpg`): Childhood Footsteps
- `mem-2` (`/images/M2.jpg`): Simple Evenings
- `mem-3` (`/images/M3.jpg`): Milestone
- `mem-4` (`/images/M4.jpg`): Guiding Light
- `mem-5` (`/images/M5.jpg`): Constant Anchor
- `mem-6` (`/images/sibling-hero.jpg`): Sibling Heritage

*Note: Clicking any photo opens the full-screen cinematic lightbox without cropping faces!*

### 5. Screen 4: The Chapters of Us (`chaptersOfUs`)
5 interactive chapters depicting the sibling journey:
1. **Childhood Memories**
2. **Little Moments**
3. **Laughter We Shared**
4. **Things I Never Said**
5. **The Bond That Never Changes**

### 6. Screen 5: A Letter From My Heart (`letter`)
- Salutation: `My Dearest Akka Arunadevi,`
- Paragraphs written from a younger brother's heart.
- Sibling banter postscript.
- Signature: `Your Younger Brother (Thambi) ❤️`

### 7. Screen 6: The Things I Wish For You (`wishes`)
5 profound wishes displayed on gilded manuscript cards.

### 8. Screen 7: Cake Celebration Finale (`finale`)
- Real MP4 video: `public/candle.mp4`
- "Make a Wish & Blow the Candle ✨"
- Golden confetti burst & falling photo ribbons.
- Closing dedication & brother's typed signature.

---

## 🚀 Deployment (Vercel)
The project is built with standard Vite and React 19.
Run `npm run build` to generate the production build in `dist/`. All asset paths (`/candle.mp4`, `/sound.mp3`, `/chapter-forest.png`) work out-of-the-box on Vercel.
