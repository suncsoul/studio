export type BibleStory = {
  id: string;
  title: string;
  summary: string;
  prompt?: string; // interactive question/prompt
  points?: number; // reward points for completing
};

export type BibleCharacter = {
  id: string;
  name: string;
  funFact?: string;
  color?: string; // UI accent color for character
  stories: BibleStory[];
};

export type BibleBook = {
  id: string; // slug
  name: string;
  themeColor: string; // base color for KPI card
  iconEmoji: string; // simple emoji icon
  characters: BibleCharacter[];
};

export const BIBLE_BOOKS: BibleBook[] = [
  // Pentateuch
  {
    id: "genesis",
    name: "Genesis",
    themeColor: "#FF8A65",
    iconEmoji: "🌅",
    characters: [
      {
        id: "god",
        name: "God",
        funFact: "Created everything in six days!",
        color: "#FFA726",
        stories: [
          {
            id: "creation",
            title: "Creation",
            summary: "God creates the world in six days and rests on the seventh.",
            prompt: "What is your favorite thing in creation? Draw or describe it!",
            points: 10,
          },
        ],
      },
      {
        id: "adam-eve",
        name: "Adam & Eve",
        funFact: "First people in the Bible.",
        color: "#66BB6A",
        stories: [
          {
            id: "garden-of-eden",
            title: "Garden of Eden",
            summary: "Adam and Eve live in a beautiful garden and learn about choices.",
            prompt: "If you could plant one tree in Eden, what would it be?",
            points: 10,
          },
        ],
      },
      {
        id: "noah",
        name: "Noah",
        funFact: "Built a giant boat called an ark!",
        color: "#29B6F6",
        stories: [
          {
            id: "ark",
            title: "Noah's Ark",
            summary: "Noah builds an ark and animals come two by two.",
            prompt: "Pick two animals to ride the ark with you.",
            points: 15,
          },
        ],
      },
      {
        id: "abraham",
        name: "Abraham & Sarah",
        funFact: "Parents of many nations.",
        color: "#AB47BC",
        stories: [
          {
            id: "promise",
            title: "God's Promise",
            summary: "God promises Abraham a big family like the stars!",
            prompt: "How many stars can you count in a dark sky?",
            points: 15,
          },
        ],
      },
      {
        id: "joseph",
        name: "Joseph",
        funFact: "Had a colorful coat and amazing dreams.",
        color: "#EF5350",
        stories: [
          {
            id: "coat-and-dreams",
            title: "Coat and Dreams",
            summary: "Joseph's bright coat and dreams guide his future.",
            prompt: "Design your dream coat colors!",
            points: 15,
          },
        ],
      },
    ],
  },
  {
    id: "exodus",
    name: "Exodus",
    themeColor: "#26A69A",
    iconEmoji: "🧭",
    characters: [
      {
        id: "moses",
        name: "Moses",
        funFact: "Parted the Red Sea!",
        color: "#26C6DA",
        stories: [
          {
            id: "burning-bush",
            title: "Burning Bush",
            summary: "God speaks to Moses from a bush that burns but doesn't burn up.",
            prompt: "If a bush could talk, what would it say to you?",
            points: 15,
          },
          {
            id: "red-sea",
            title: "Red Sea Escape",
            summary: "The sea splits so everyone can walk through!",
            prompt: "How would you feel walking on a dry sea floor?",
            points: 20,
          },
        ],
      },
    ],
  },
  // For brevity, include placeholders for other books with empty character arrays.
  { id: "leviticus", name: "Leviticus", themeColor: "#8D6E63", iconEmoji: "📜", characters: [] },
  { id: "numbers", name: "Numbers", themeColor: "#7E57C2", iconEmoji: "🔢", characters: [] },
  { id: "deuteronomy", name: "Deuteronomy", themeColor: "#5C6BC0", iconEmoji: "📖", characters: [] },
  { id: "joshua", name: "Joshua", themeColor: "#42A5F5", iconEmoji: "🏹", characters: [] },
  { id: "judges", name: "Judges", themeColor: "#26C6DA", iconEmoji: "⚖️", characters: [] },
  { id: "ruth", name: "Ruth", themeColor: "#66BB6A", iconEmoji: "🌾", characters: [] },
  { id: "1-samuel", name: "1 Samuel", themeColor: "#FF7043", iconEmoji: "🛡️", characters: [] },
  { id: "2-samuel", name: "2 Samuel", themeColor: "#29B6F6", iconEmoji: "🛡️", characters: [] },
  { id: "1-kings", name: "1 Kings", themeColor: "#8BC34A", iconEmoji: "👑", characters: [] },
  { id: "2-kings", name: "2 Kings", themeColor: "#9CCC65", iconEmoji: "👑", characters: [] },
  { id: "1-chronicles", name: "1 Chronicles", themeColor: "#FFCA28", iconEmoji: "📜", characters: [] },
  { id: "2-chronicles", name: "2 Chronicles", themeColor: "#FFA726", iconEmoji: "📜", characters: [] },
  { id: "ezra", name: "Ezra", themeColor: "#26A69A", iconEmoji: "🏗️", characters: [] },
  { id: "nehemiah", name: "Nehemiah", themeColor: "#00ACC1", iconEmoji: "🏗️", characters: [] },
  { id: "esther", name: "Esther", themeColor: "#EC407A", iconEmoji: "👑", characters: [] },
  { id: "job", name: "Job", themeColor: "#78909C", iconEmoji: "💬", characters: [] },
  { id: "psalms", name: "Psalms", themeColor: "#42A5F5", iconEmoji: "🎵", characters: [] },
  { id: "proverbs", name: "Proverbs", themeColor: "#FFD54F", iconEmoji: "💡", characters: [] },
  { id: "ecclesiastes", name: "Ecclesiastes", themeColor: "#8D6E63", iconEmoji: "🕰️", characters: [] },
  { id: "song-of-songs", name: "Song of Songs", themeColor: "#F06292", iconEmoji: "💞", characters: [] },
  { id: "isaiah", name: "Isaiah", themeColor: "#26C6DA", iconEmoji: "🕊️", characters: [] },
  { id: "jeremiah", name: "Jeremiah", themeColor: "#FF7043", iconEmoji: "📝", characters: [] },
  { id: "lamentations", name: "Lamentations", themeColor: "#90A4AE", iconEmoji: "😢", characters: [] },
  { id: "ezekiel", name: "Ezekiel", themeColor: "#9CCC65", iconEmoji: "🌪️", characters: [] },
  { id: "daniel", name: "Daniel", themeColor: "#29B6F6", iconEmoji: "🦁", characters: [] },
  { id: "hosea", name: "Hosea", themeColor: "#66BB6A", iconEmoji: "❤️", characters: [] },
  { id: "joel", name: "Joel", themeColor: "#AB47BC", iconEmoji: "🌾", characters: [] },
  { id: "amos", name: "Amos", themeColor: "#8D6E63", iconEmoji: "🌩️", characters: [] },
  { id: "obadiah", name: "Obadiah", themeColor: "#FFB74D", iconEmoji: "🗻", characters: [] },
  { id: "jonah", name: "Jonah", themeColor: "#26C6DA", iconEmoji: "🐳", characters: [] },
  { id: "micah", name: "Micah", themeColor: "#90CAF9", iconEmoji: "⚖️", characters: [] },
  { id: "nahum", name: "Nahum", themeColor: "#9E9D24", iconEmoji: "🌋", characters: [] },
  { id: "habakkuk", name: "Habakkuk", themeColor: "#29B6F6", iconEmoji: "❓", characters: [] },
  { id: "zephaniah", name: "Zephaniah", themeColor: "#66BB6A", iconEmoji: "🎺", characters: [] },
  { id: "haggai", name: "Haggai", themeColor: "#FF7043", iconEmoji: "🏗️", characters: [] },
  { id: "zechariah", name: "Zechariah", themeColor: "#7E57C2", iconEmoji: "🌟", characters: [] },
  { id: "malachi", name: "Malachi", themeColor: "#FF8A65", iconEmoji: "📣", characters: [] },
  // New Testament
  { id: "matthew", name: "Matthew", themeColor: "#42A5F5", iconEmoji: "📖", characters: [] },
  { id: "mark", name: "Mark", themeColor: "#26A69A", iconEmoji: "🦁", characters: [] },
  { id: "luke", name: "Luke", themeColor: "#66BB6A", iconEmoji: "🐂", characters: [] },
  { id: "john", name: "John", themeColor: "#29B6F6", iconEmoji: "🦅", characters: [] },
  { id: "acts", name: "Acts", themeColor: "#FFA726", iconEmoji: "🔥", characters: [] },
  { id: "romans", name: "Romans", themeColor: "#AB47BC", iconEmoji: "🏛️", characters: [] },
  { id: "1-corinthians", name: "1 Corinthians", themeColor: "#8D6E63", iconEmoji: "💬", characters: [] },
  { id: "2-corinthians", name: "2 Corinthians", themeColor: "#90A4AE", iconEmoji: "💬", characters: [] },
  { id: "galatians", name: "Galatians", themeColor: "#66BB6A", iconEmoji: "🌿", characters: [] },
  { id: "ephesians", name: "Ephesians", themeColor: "#42A5F5", iconEmoji: "🛡️", characters: [] },
  { id: "philippians", name: "Philippians", themeColor: "#FF7043", iconEmoji: "😊", characters: [] },
  { id: "colossians", name: "Colossians", themeColor: "#26C6DA", iconEmoji: "🏛️", characters: [] },
  { id: "1-thessalonians", name: "1 Thessalonians", themeColor: "#7E57C2", iconEmoji: "📬", characters: [] },
  { id: "2-thessalonians", name: "2 Thessalonians", themeColor: "#5C6BC0", iconEmoji: "📬", characters: [] },
  { id: "1-timothy", name: "1 Timothy", themeColor: "#8BC34A", iconEmoji: "📜", characters: [] },
  { id: "2-timothy", name: "2 Timothy", themeColor: "#9CCC65", iconEmoji: "📜", characters: [] },
  { id: "titus", name: "Titus", themeColor: "#FFCA28", iconEmoji: "📜", characters: [] },
  { id: "philemon", name: "Philemon", themeColor: "#26A69A", iconEmoji: "🤝", characters: [] },
  { id: "hebrews", name: "Hebrews", themeColor: "#00ACC1", iconEmoji: "⛪", characters: [] },
  { id: "james", name: "James", themeColor: "#66BB6A", iconEmoji: "🔧", characters: [] },
  { id: "1-peter", name: "1 Peter", themeColor: "#29B6F6", iconEmoji: "🪨", characters: [] },
  { id: "2-peter", name: "2 Peter", themeColor: "#90CAF9", iconEmoji: "🪨", characters: [] },
  { id: "1-john", name: "1 John", themeColor: "#FF7043", iconEmoji: "❤️", characters: [] },
  { id: "2-john", name: "2 John", themeColor: "#EC407A", iconEmoji: "❤️", characters: [] },
  { id: "3-john", name: "3 John", themeColor: "#AB47BC", iconEmoji: "❤️", characters: [] },
  { id: "jude", name: "Jude", themeColor: "#8D6E63", iconEmoji: "🛡️", characters: [] },
  { id: "revelation", name: "Revelation", themeColor: "#EF5350", iconEmoji: "🌟", characters: [] },
];

export function getAllBibleBooks(): BibleBook[] {
  return BIBLE_BOOKS;
}

export function getBibleBookById(bookId: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === bookId);
}

