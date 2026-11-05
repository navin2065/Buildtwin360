/**
 * =========================================================================
 * THE UNWRITTEN CHAPTER – MASTER CONFIGURATION
 * =========================================================================
 * 
 * Centralized configuration for:
 * 1. Recipient & Sender Details (Arunadevi & NAVIN)
 * 2. Secret Contact Entry ("aruna akkow")
 * 3. Categorized Gallery Photographs with Exact Project Filenames & Captions
 * 4. Sibling Letter for Fixed Single-Page Parchment UI
 * 5. Birthday Celebration, Video & Configurable Audio
 * 6. Grandfather Tribute Section
 * 7. Final Footer ("Crafted by your Thambi, NAVIN")
 */

export const EXPERIENCE_CONFIG = {
  // ─────────────────────────────────────────────────────────────
  // 1. RECIPIENT & SENDER DETAILS
  // ─────────────────────────────────────────────────────────────
  recipient: {
    fullName: "Arunadevi",
    preferredName: "Arunadevi",
    nickname: "Akka",
    dob: "09 November 2002",
    relationship: "Elder Sister",
    senderName: "NAVIN",
    senderTitle: "Your Thambi",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. STAGE 1: PASSWORD ENTRY
  // ─────────────────────────────────────────────────────────────
  secretEntry: {
    mainHeading: "Welcome to Your Birthday Surprise",
    placeholder: "Enter the Password",
    buttonText: "Continue",
    secretWord: "aruna akkow",
    acceptedWords: ["aruna akkow"],
    errorMessage: "Not quite... Check the hint below!",
    hintPrompt: "Need a Hint?",
    hintText: "Type how I have saved your contact in my mobile.",
    backgroundImage: "./chapter-forest.png",
  },

  // ─────────────────────────────────────────────────────────────
  // 3. GALLERY CATEGORIES & PHOTOGRAPHS
  // Using user's actual filenames and category groupings
  // ─────────────────────────────────────────────────────────────
  galleryCategories: [
    { key: "All", label: "All" },
    { key: "Personal", label: "Personal" },
    { key: "Saree", label: "Saree" },
    { key: "Elegant", label: "Elegant" },
    { key: "Family", label: "Family" },
    { key: "Our Memories", label: "Our Memories" },
    { key: "Graduation & Achievements", label: "Graduation & Achievements" },
    { key: "Special Moments", label: "Special Moments" },
  ],

  galleryMemories: [
    // ── Family and relationships ──
    {
      id: "mother",
      filename: "mother.jpeg",
      src: "./images/mother.jpeg",
      category: "Family",
      tag: "Mother & Daughter",
      caption: "Wrapped in mother’s unconditional love and gentle embrace.",
    },
    {
      id: "dad",
      filename: "dad.jpeg",
      src: "./images/dad.jpeg",
      category: "Family",
      tag: "Father's Pride",
      caption: "Father's guiding strength, quiet wisdom, and lifelong protection.",
    },
    {
      id: "grandma",
      filename: "grandma.jpeg",
      src: "./images/grandma.jpeg",
      category: "Family",
      tag: "Grandmother's Love",
      caption: "Cherished by grandmother's tender blessings and boundless warmth.",
    },
    {
      id: "brothers",
      filename: "brothers.jpeg",
      src: "./images/brothers.jpeg",
      category: "Family",
      tag: "Younger Brothers",
      caption: "Her two younger brothers, always standing proudly by her side.",
    },
    {
      id: "sister-1",
      filename: "sister 1.jpeg",
      src: "./images/sister 1.jpeg",
      category: "Family",
      tag: "Sister Love",
      caption: "Sweet smiles and shared childhood memories with younger sister.",
    },
    {
      id: "sister-2",
      filename: "sister 2.jpeg",
      src: "./images/sister 2.jpeg",
      category: "Family",
      tag: "Sisterhood",
      caption: "A bond of sisters that grows closer with every passing year.",
    },
    {
      id: "sister-and-grandma",
      filename: "sister and grandma.jpeg",
      src: "./images/sister and grandma.jpeg",
      category: "Family",
      tag: "Generations of Love",
      caption: "Generations of warmth — sister and grandmother together.",
    },

    // ── Our memories ──
    {
      id: "our-gang-1",
      filename: "Our Gang 1.jpeg",
      src: "./images/Our Gang 1.jpeg",
      category: "Our Memories",
      tag: "Our Gang",
      caption: "Our gang together, celebrating youth and unforgettable fun.",
    },
    {
      id: "our-gang-2",
      filename: "our gang 2.jpeg",
      src: "./images/our gang 2.jpeg",
      category: "Our Memories",
      tag: "The Circle",
      caption: "Laughter, mischief, and memories with our favourite gang.",
    },
    {
      id: "us-1",
      filename: "us 1.jpeg",
      src: "./images/us 1.jpeg",
      category: "Our Memories",
      tag: "Akka & Thambi",
      caption: "Arunadevi and me — sharing a sibling bond like no other.",
    },
    {
      id: "us-2",
      filename: "us 2.jpeg",
      src: "./images/us 2.jpeg",
      category: "Our Memories",
      tag: "Growing Together",
      caption: "Side by side through every phase of life, learning, and dreams.",
    },
    {
      id: "us-3",
      filename: "us 3.jpeg",
      src: "./images/us 3.jpeg",
      category: "Our Memories",
      tag: "Lifelong Anchor",
      caption: "Together through thick and thin, forever your younger brother.",
    },
    {
      id: "that-call",
      filename: "that 2.30hrs call.jpeg",
      src: "./images/that 2.30hrs call.jpeg",
      category: "Our Memories",
      tag: "My Longest Call",
      caption: "You are the only person I have ever spoken with for 2 hours and 30 minutes in a single call. I have never had such a long conversation with anyone else.",
    },

    // ── Personal photographs ──
    {
      id: "self-1",
      filename: "self 1.jpeg",
      src: "./images/self 1.jpeg",
      category: "Personal",
      tag: "Natural Poise",
      caption: "Natural elegance, calm thoughts, and effortless charm.",
    },
    {
      id: "self-2",
      filename: "self 2.jpeg",
      src: "./images/self 2.jpeg",
      category: "Personal",
      tag: "Gentle Smile",
      caption: "A gentle smile that brightens even the quietest afternoons.",
    },
    {
      id: "self-3",
      filename: "self 3.jpeg",
      src: "./images/self 3.jpeg",
      category: "Personal",
      tag: "Radiance",
      caption: "Radiant confidence walking into each new tomorrow.",
    },
    {
      id: "self-4",
      filename: "self 4.jpeg",
      src: "./images/self 4.jpeg",
      category: "Personal",
      tag: "Inner Grace",
      caption: "Reflections of grace, standing tall with a pure heart.",
    },
    {
      id: "self-5",
      filename: "self 5.jpeg",
      src: "./images/self 5.jpeg",
      category: "Personal",
      tag: "Dreaming Forward",
      caption: "Dreaming ahead with hopeful eyes and serene joy.",
    },
    {
      id: "self-6",
      filename: "self 6.jpeg",
      src: "./images/self 6.jpeg",
      category: "Personal",
      tag: "Peaceful Mind",
      caption: "Simple moments of peace and beauty in everyday life.",
    },
    {
      id: "self-7",
      filename: "self 7.jpeg",
      src: "./images/self 7.jpeg",
      category: "Personal",
      tag: "Quiet Dignity",
      caption: "Poise, dignity, and a smile that speaks for itself.",
    },
    {
      id: "self-8",
      filename: "self 8.jpeg",
      src: "./images/self 8.jpeg",
      category: "Personal",
      tag: "Timeless Light",
      caption: "Quiet strength and elegance captured in timeless light.",
    },

    // ── Saree photographs ──
    {
      id: "saree-1",
      filename: "saree 1.jpeg",
      src: "./images/saree 1.jpeg",
      category: "Saree",
      tag: "Heritage Grace",
      caption: "Graceful in traditional saree, carrying our heritage with pride.",
    },
    {
      id: "saree-2",
      filename: "saree 2.jpeg",
      src: "./images/saree 2.jpeg",
      category: "Saree",
      tag: "Silk Modesty",
      caption: "A timeless traditional look that shines with modesty and beauty.",
    },
    {
      id: "saree-3",
      filename: "saree 3.jpeg",
      src: "./images/saree 3.jpeg",
      category: "Saree",
      tag: "Festive Poise",
      caption: "Festive elegance in silk, celebrating special moments with poise.",
    },
    {
      id: "saree-4",
      filename: "saree 4.jpeg",
      src: "./images/saree 4.jpeg",
      category: "Saree",
      tag: "Dignity in Folds",
      caption: "Dignity and grace woven into every fold of the saree.",
    },
    {
      id: "saree-5",
      filename: "saree 5.jpeg",
      src: "./images/saree 5.jpeg",
      category: "Saree",
      tag: "Vibrant Spirit",
      caption: "Bright festive colors reflecting your warm and vibrant spirit.",
    },
    {
      id: "saree-6",
      filename: "saree 6.jpeg",
      src: "./images/saree 6.jpeg",
      category: "Saree",
      tag: "South Indian Charm",
      caption: "Classic South Indian beauty illuminated with golden charm.",
    },
    {
      id: "saree-7",
      filename: "saree 7.jpeg",
      src: "./images/saree 7.jpeg",
      category: "Saree",
      tag: "Sophisticated Silk",
      caption: "Sophisticated traditional style, shining gracefully in every frame.",
    },
    {
      id: "saree-8",
      filename: "saree 8.jpeg",
      src: "./images/saree 8.jpeg",
      category: "Saree",
      tag: "Festive Splendor",
      caption: "Standing with poise and radiant joy in festive silk attire.",
    },

    // ── Elegant ──
    {
      id: "elegant",
      filename: "elegant.jpeg",
      src: "./images/elegant.jpeg",
      category: "Elegant",
      tag: "Golden Elegance",
      caption: "Her elegant traditional appearance, glowing under evening lights.",
    },

    // ── Graduation & Achievements ──
    {
      id: "graduation-1",
      filename: "graduation.jpeg",
      src: "./images/graduation.jpeg",
      category: "Graduation & Achievements",
      tag: "Convocation",
      caption: "The crowning milestone of graduation — hard work and proud success.",
    },
    {
      id: "graduation-2",
      filename: "graduation 2.jpeg",
      src: "./images/graduation 2.jpeg",
      category: "Graduation & Achievements",
      tag: "Academic Pride",
      caption: "Wearing the convocation gown with pride, stepping into the future.",
    },
    {
      id: "perumai-achievements",
      filename: "perumai achievements.jpeg",
      src: "./images/perumai achievements.jpeg",
      category: "Graduation & Achievements",
      tag: "Proud Achievements",
      caption: "Her proud achievements and the respect earned along the way.",
    },

    // ── Special Moments ──
    {
      id: "golden-heart",
      filename: "golden heart.jpeg",
      src: "./images/golden heart.jpeg",
      category: "Special Moments",
      tag: "Maternal Warmth",
      caption: "A warm mother-and-child moment filled with tender love.",
    },
    {
      id: "dance",
      filename: "dance.jpeg",
      src: "./images/dance.jpeg",
      category: "Special Moments",
      tag: "Dance & Rhythm",
      caption: "Her graceful dance memory, expressing joy and cultural rhythm.",
    },
    {
      id: "grow",
      filename: "grow.jpeg",
      src: "./images/grow.jpeg",
      category: "Special Moments",
      tag: "Life Journey",
      caption: "From innocent childhood memories to the inspiring woman today.",
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // 4. STAGE 4: SIBLING LETTER CONTENT (TRADITIONAL PEN-WRITING)
  // Character-by-character typewriter + pen animation + sparkles
  // ─────────────────────────────────────────────────────────────
  letterSections: [
    {
      id: "greeting",
      type: "greeting",
      text: "Dear Akka,",
    },
    {
      id: "p1",
      type: "body",
      text: "Beyond my family, you are the first person who has made me feel this comfortable and safe sharing everything about myself. Apart from my mother and my own sister, I have never been this open with anyone else.",
    },
    {
      id: "p2",
      type: "body",
      text: "I have never shared so much of myself with another person before. My happiness, sadness, problems, worries, random thoughts, and even the smallest things happening in my life — I have shared them all with you without hesitation. You became someone I could talk to freely, without having to think twice about what to say or how to say it.",
    },
    {
      id: "p3",
      type: "body",
      text: "I don't know exactly when or how this bond became so special to me. But somewhere along the way, you became more than just a colleague or a friend. You became like another elder sister in my life — someone I genuinely care about, trust, and feel grateful to have.",
    },
    {
      id: "p4",
      type: "body",
      text: "Sometimes, it is not the big things that make a relationship special. It is the little conversations, random laughs, silly moments, and simple memories that stay in our hearts forever. Even the ordinary moments we have shared have become beautiful memories to me, and I will always cherish them.",
    },
    {
      id: "p5",
      type: "body",
      text: "Thank you for being part of my journey all this time. Thank you for listening to me, understanding me, guiding me, and making me feel comfortable being myself. You may not realise it, but your presence has made many ordinary days in my life feel a little more special.",
    },
    {
      id: "p6",
      type: "body",
      text: "Even today, I sometimes wonder why I do so many things for you or why I always want to do something special for you. Honestly, I don't have a perfect answer. I just know that I genuinely want to do it for you. Maybe it is simply because I see you as my own sister, and I care for you just like family. Your happiness matters to me, and seeing you smile makes me happy too.",
    },
    {
      id: "p-apology",
      type: "body",
      text: "There is one more thing I want to tell you from the bottom of my heart. I know there may have been times when my words or actions hurt you, even when I never intended them to. Sometimes, what I try to express may come across differently from what I actually feel. But please believe me, whatever I have said or shared with you, I have never said it with the intention of hurting you. Whatever I have tried to tell you, I have always meant it for your good and because I genuinely care about you. Maybe my choice of words or the way I express my thoughts has sometimes made things sound different from what I truly meant. I may not always express myself perfectly, and I know there may have been moments when I failed to make you understand my intentions. But I have never wanted anything bad for you. In everything I do, I always think about how you might feel and try my best not to do anything that could hurt you. If I have ever hurt you in any way, I am truly sorry, Akka. It was never what my heart intended. I hope you will always understand the care, concern, and respect I have for you.",
    },
    {
      id: "p7",
      type: "body",
      text: "And one thing I want you to remember: You are never alone.",
    },
    {
      id: "p8",
      type: "body",
      text: "Whatever situation you face, whatever problems come your way, I will always be there to stand beside you. Whether it is a problem at work, a difficult situation in life, or a moment when you simply need someone to listen, you can always count on me.",
    },
    {
      id: "p9",
      type: "body",
      text: "Please don't be afraid of facing difficult times alone. I may not have a solution for everything, and I may not always know the right words to say, but I will always be there to support you, listen to you, and face things with you. You don't have to pretend to be strong all the time. Even on your difficult days, you can always be yourself with me.",
    },
    {
      id: "p10",
      type: "body",
      text: "And no matter how much life changes, one thing will never change — the bond I share with you. I may not be able to make every day perfect for you, but I will always try to bring a smile to your face whenever I can. You will always have a Thambi who cares for you, believes in you, supports you, and wishes nothing but the best for you.",
    },
    {
      id: "p11",
      type: "body",
      text: "On your birthday, I don't wish you just happiness for one day. I wish you a lifetime filled with peace, good health, confidence, success, and countless reasons to smile. May you achieve everything your heart dreams of. May every new chapter of your life bring you beautiful opportunities, wonderful memories, and all the happiness you deserve.",
    },
    {
      id: "p12",
      type: "body",
      text: "Finally, I just want to say that I am truly happy and grateful that I got someone like you in my life. Not every special bond needs a name or an explanation. Some relationships simply become a beautiful part of our lives, and for me, you are one of them.",
    },
    {
      id: "p13",
      type: "body",
      text: "Thank you for being my another sister, Akka. Thank you for all the memories, all the conversations, and this beautiful journey together.",
    },
    {
      id: "closing",
      type: "closing",
      text: "Happy Birthday, Akka! Keep smiling, keep shining, and always be happy.",
    },
    {
      id: "signoff",
      type: "signoff",
      text: "With love and respect,\nYour Thambi,\nNAVIN ❤️",
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // 5. STAGE 5: BIRTHDAY CELEBRATION & THREE-STAGE AUDIO
  // ─────────────────────────────────────────────────────────────
  celebration: {
    surpriseWord: "SURPRISE",
    blowButtonText: "BLOW THE CANDLE",
    videoSource: "./candle.mp4",
    aspectRatio: "478/850",
    // EXACT THREE STAGES AUDIO
    // Stage 1: Opening, Password, Memories & Cover Letter
    openingBgmSource: "./birthday-piano.mp3",
    // Stage 2: Blow the Candle & Birthday Video
    birthdayVideoBgmSource: "./sound.mp3",
    // Stage 3: Grandfather Tribute
    grandfatherBgmSource: "./sound2.mp3",
    candleBlowSoundSource: null, // Custom blow sound fallback
    // Selected orbiting memory photos: ONLY Arunadevi's solo photographs
    orbitPhotos: [
      { id: "saree-1", src: "./images/saree 1.jpeg" },
      { id: "self-1", src: "./images/self 1.jpeg" },
      { id: "saree-3", src: "./images/saree 3.jpeg" },
      { id: "self-3", src: "./images/self 3.jpeg" },
      { id: "saree-5", src: "./images/saree 5.jpeg" },
      { id: "self-7", src: "./images/self 7.jpeg" },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. STAGE 6: GRANDFATHER'S LETTER SECTION
  // Top 16:9 Photograph (public/images/thatha.jpg)
  // Followed by automatic word-by-word typewriter letter
  // Plays public/sound2.mp3 during this stage
  // ─────────────────────────────────────────────────────────────
  grandfatherLetter: {
    photo: "./images/thatha.jpg",
    bgmSource: "./sound2.mp3",
    sectionTag: "In Everlasting Love & Reverence",
    title: "A Tribute to Our Beloved Grandfather",
    paragraphs: [
      "My Dear Granddaughter ❤️",
      "The Happiest Birthday to You, My Dear Granddaughter!",
      "My dear little one,",
      "If I were beside you right now, I would hold your hands, look into your eyes, and wish you a very happy birthday with all the love in my heart.",
      "You may not be able to see me standing beside you, but never think that I am far away from you. I am always with you, in every step you take, in every smile you share, and in every moment of your life.",
      "And listen to me carefully, my dear…",
      "Never feel that you are alone just because you cannot see me. I am still with you, and I will always be a part of your life. So please, don't spend your days worrying about my absence. Whenever you miss me, remember the love and beautiful memories we shared.",
      "I want to see you happy. I want to see you smiling, laughing, and living your life without fear. Whatever situation life brings you, face it bravely. Don't lose hope when things become difficult. Be strong, think wisely, and make your decisions with confidence. You are stronger than you think, and I believe in you.",
      "There may be days when you feel tired, when things don't happen the way you expect, or when you feel like giving up. On those days, take a deep breath, wipe your tears, and remind yourself that you can get through anything. Don't let one difficult day take away your beautiful smile.",
      "Always respect yourself, value your happiness, and never forget how special you are. Choose what makes your heart peaceful. Keep growing, keep learning, and keep chasing your dreams. I will always be proud of the person you are becoming.",
      "And one more thing, my dear granddaughter… Never think that you have to face everything alone. Whenever you look at the sky, remember that the love I have for you will always remain in your heart. No distance, no time, and no situation can change that bond.",
      "Today is your special day. So smile a little more, laugh a little louder, enjoy every moment, and make beautiful memories. That is the birthday gift I would wish for you.",
      "Happy Birthday once again, my precious granddaughter!",
      "Keep smiling, stay brave, and always be happy.",
      "With endless love and blessings,\nYour Thatha ❤️",
    ],
    closing: "",
  },

  // Legacy alias for compatibility
  grandfatherTribute: {
    photo: "./images/thatha.jpg",
    bgmSource: "./sound2.mp3",
    sectionTag: "In Everlasting Love & Reverence",
    title: "A Tribute to Our Beloved Grandfather",
    paragraphs: [
      "My Dear Granddaughter ❤️",
      "The Happiest Birthday to You, My Dear Granddaughter!",
      "My dear little one,",
      "If I were beside you right now, I would hold your hands, look into your eyes, and wish you a very happy birthday with all the love in my heart.",
      "You may not be able to see me standing beside you, but never think that I am far away from you. I am always with you, in every step you take, in every smile you share, and in every moment of your life.",
      "And listen to me carefully, my dear…",
      "Never feel that you are alone just because you cannot see me. I am still with you, and I will always be a part of your life. So please, don't spend your days worrying about my absence. Whenever you miss me, remember the love and beautiful memories we shared.",
      "I want to see you happy. I want to see you smiling, laughing, and living your life without fear. Whatever situation life brings you, face it bravely. Don't lose hope when things become difficult. Be strong, think wisely, and make your decisions with confidence. You are stronger than you think, and I believe in you.",
      "There may be days when you feel tired, when things don't happen the way you expect, or when you feel like giving up. On those days, take a deep breath, wipe your tears, and remind yourself that you can get through anything. Don't let one difficult day take away your beautiful smile.",
      "Always respect yourself, value your happiness, and never forget how special you are. Choose what makes your heart peaceful. Keep growing, keep learning, and keep chasing your dreams. I will always be proud of the person you are becoming.",
      "And one more thing, my dear granddaughter… Never think that you have to face everything alone. Whenever you look at the sky, remember that the love I have for you will always remain in your heart. No distance, no time, and no situation can change that bond.",
      "Today is your special day. So smile a little more, laugh a little louder, enjoy every moment, and make beautiful memories. That is the birthday gift I would wish for you.",
      "Happy Birthday once again, my precious granddaughter!",
      "Keep smiling, stay brave, and always be happy.",
      "With endless love and blessings,\nYour Thatha ❤️",
    ],
    closing: "",
  },

  // ─────────────────────────────────────────────────────────────
  // 7. STAGE 7: FINAL FOOTER
  // Exactly: "Crafted by your Thambi, NAVIN"
  // ─────────────────────────────────────────────────────────────
  footer: {
    craftedBy: "Crafted by your Thambi, NAVIN",
  },
};
