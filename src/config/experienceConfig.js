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
  // 2. STAGE 1: CONTACT QUESTION / SECRET WORD
  // ─────────────────────────────────────────────────────────────
  secretEntry: {
    smallHeading: "A LITTLE SECRET BEFORE WE BEGIN",
    mainHeading: "One little question...",
    placeholder: "Enter the secret word...",
    buttonText: "UNLOCK MY STORY →",
    secretWord: "aruna akkow",
    acceptedWords: ["aruna akkow"],
    errorMessage: "Not quite... Check the hint below!",
    hintPrompt: "Need a hint?",
    hintText: "Think of how your name is saved in my phone contacts 📱",
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
      caption: "Our first conversation that lasted 2 hours and 30 minutes.",
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
      text: "My dear Akka,",
    },
    {
      id: "p1",
      type: "body",
      text: "If I had to name one person who means the most to me in this world, it would always be you. No matter what happens in life—whether I am happy, troubled, confused, or facing a tough situation—you are always the first person I think of and the first person I reach out to.",
    },
    {
      id: "p2",
      type: "body",
      text: "You have always been my greatest pillar of support, someone with whom I can share absolutely anything without hesitation. From my studies to my career decisions, and through every small doubt, you have constantly encouraged me, believed in me, and helped me grow into who I am today.",
    },
    {
      id: "p3",
      type: "body",
      text: "I still treasure the days of growing up together—our playful arguments, innocent secrets, late-night conversations, and laughter that echoed through our home. No matter how many years go by, you will forever remain my second mother first, my protector, and my safe haven.",
    },
    {
      id: "p4",
      type: "body",
      text: "You are far more than just an elder sister—you are my pride, my confidante, and my greatest blessing. Thank you for your patient heart, your quiet sacrifices, and your unconditional love that guides me every day.",
    },
    {
      id: "banter",
      type: "banter",
      text: "To be completely honest, I rarely say all these emotional things out loud... if I did, you'd probably just burst out laughing and tease me! But it was truly in my heart, so I wanted to write it down for you here.",
    },
    {
      id: "closing",
      type: "closing",
      text: "Happy Birthday, Akka ❤️",
    },
    {
      id: "signoff",
      type: "signoff",
      text: "Love you always and forever, NAVIN",
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // 5. STAGE 5: BIRTHDAY CELEBRATION & CONFIGURABLE AUDIO
  // ─────────────────────────────────────────────────────────────
  celebration: {
    surpriseWord: "SURPRISE",
    blowButtonText: "BLOW THE CANDLE",
    videoSource: "./candle.mp4",
    aspectRatio: "3:4",
    // Configurable audio assets
    birthdayBgmSource: "./sound.mp3",
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
  // 6. STAGE 6: GRANDFATHER TRIBUTE SECTION
  // Automatic pen-writing typewriter + subtle sparkles
  // ─────────────────────────────────────────────────────────────
  grandfatherTribute: {
    sectionTag: "In Everlasting Love & Reverence",
    title: "A Tribute to Our Beloved Grandfather",
    paragraphs: [
      "To our dearest Thatha — Your presence was our sheltering tree, your gentle words were our guiding light, and your silent blessings remain the foundation of everything we achieve.",
      "Though time has carried you into the quiet embrace of the stars, not a single milestone in our lives passes without feeling your loving hand placed upon our heads. We feel your warmth in our family's togetherness and your strength in the values you gave us.",
      "On this special birthday, we honor your timeless memory, your noble dignity, and the boundless love you showered upon us all. You will forever live in our hearts, our prayers, and every step of our lives.",
    ],
    closing: "Forever loved, forever missed, forever our guardian angel.",
  },

  // ─────────────────────────────────────────────────────────────
  // 7. STAGE 7: FINAL FOOTER
  // Exactly: "Crafted by Naveen"
  // ─────────────────────────────────────────────────────────────
  footer: {
    craftedBy: "Crafted by Naveen",
  },
};
