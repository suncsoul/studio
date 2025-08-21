export type StoryQuestion = {
  id: string;
  question: string;
  choices: { id: string; text: string; isCorrect: boolean }[];
  correctExplanation: string;
};

export type Story = {
  id: string;
  title: string;
  summary: string;
  emoji?: string;
  questions: StoryQuestion[];
};

export type Character = {
  id: string;
  name: string;
  emoji?: string;
  summary: string;
};

export type Book = {
  slug: string;
  name: string;
  color: string; // Tailwind bg-gradient color token
  emoji?: string;
  characters: Character[];
  stories: Story[];
};

export const bookNames: string[] = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Seed colors for playful gradients
const gradientPalette = [
  'from-rose-400 to-pink-500',
  'from-amber-300 to-yellow-400',
  'from-emerald-300 to-teal-400',
  'from-sky-300 to-blue-400',
  'from-violet-300 to-fuchsia-400',
  'from-lime-300 to-green-400',
  'from-orange-300 to-amber-400',
  'from-cyan-300 to-sky-400',
];

const defaultStories: Story[] = [];
const defaultCharacters: Character[] = [];

// Rich examples for a few books to demonstrate structure
const genesis: Partial<Book> = {
  emoji: '🌍',
  characters: [
    { id: 'god', name: 'God', emoji: '✨', summary: 'Creator of the world and everything in it.' },
    { id: 'adam', name: 'Adam', emoji: '🧔', summary: 'The first man created by God.' },
    { id: 'eve', name: 'Eve', emoji: '👩', summary: 'The first woman created by God.' },
    { id: 'noah', name: 'Noah', emoji: '🛶', summary: 'Built the ark and survived the great flood.' },
    { id: 'abraham', name: 'Abraham', emoji: '⭐', summary: 'Father of many nations; trusted God.' },
    { id: 'sarah', name: 'Sarah', emoji: '🤱', summary: 'Abraham’s wife; mother of Isaac.' },
    { id: 'isaac', name: 'Isaac', emoji: '👶', summary: 'Son of Abraham and Sarah.' },
    { id: 'jacob', name: 'Jacob', emoji: '🧭', summary: 'Father of the twelve tribes of Israel.' },
    { id: 'joseph', name: 'Joseph', emoji: '🌈', summary: 'Had a colorful coat; rose to power in Egypt.' },
  ],
  stories: [
    {
      id: 'creation',
      title: 'Creation Adventure',
      emoji: '✨',
      summary: 'Discover the 7-day creation story in a fun, interactive way!',
      questions: [
        {
          id: 'q1',
          question: 'On which day did God create the sun, moon, and stars?',
          choices: [
            { id: 'c1', text: 'Day 1', isCorrect: false },
            { id: 'c2', text: 'Day 2', isCorrect: false },
            { id: 'c3', text: 'Day 4', isCorrect: true },
            { id: 'c4', text: 'Day 7', isCorrect: false },
          ],
          correctExplanation: 'The lights in the sky were created on Day 4!'
        },
        {
          id: 'q2',
          question: 'Who were the first people God created?',
          choices: [
            { id: 'c1', text: 'Abraham and Sarah', isCorrect: false },
            { id: 'c2', text: 'Adam and Eve', isCorrect: true },
            { id: 'c3', text: 'Noah and his wife', isCorrect: false },
            { id: 'c4', text: 'Moses and Miriam', isCorrect: false },
          ],
          correctExplanation: 'Adam and Eve were the first people.'
        }
      ]
    },
    {
      id: 'noah-ark',
      title: 'Noah’s Ark Rescue',
      emoji: '🌧️',
      summary: 'Help Noah prepare the ark and care for the animals!',
      questions: [
        {
          id: 'q1',
          question: 'How many days did it rain during the flood?',
          choices: [
            { id: 'c1', text: '10 days', isCorrect: false },
            { id: 'c2', text: '20 days', isCorrect: false },
            { id: 'c3', text: '40 days', isCorrect: true },
            { id: 'c4', text: '100 days', isCorrect: false },
          ],
          correctExplanation: 'It rained for 40 days and 40 nights.'
        }
      ]
    },
    {
      id: 'joseph-dreams',
      title: 'Joseph and the Colorful Dreams',
      emoji: '🌈',
      summary: 'Follow Joseph from dreams to destiny in Egypt.',
      questions: [
        {
          id: 'q1',
          question: 'What special gift did Joseph receive from his father?',
          choices: [
            { id: 'c1', text: 'A golden crown', isCorrect: false },
            { id: 'c2', text: 'A colorful coat', isCorrect: true },
            { id: 'c3', text: 'A sword', isCorrect: false },
            { id: 'c4', text: 'A chariot', isCorrect: false },
          ],
          correctExplanation: 'Joseph received a beautiful colorful coat.'
        }
      ]
    }
  ]
};

const exodus: Partial<Book> = {
  emoji: '🧺',
  characters: [
    { id: 'moses', name: 'Moses', emoji: '👶➡️🧔', summary: 'Led Israel out of Egypt by God’s power.' },
    { id: 'aaron', name: 'Aaron', emoji: '🗣️', summary: 'Moses’ brother and helper.' },
    { id: 'pharaoh', name: 'Pharaoh', emoji: '👑', summary: 'King of Egypt who resisted God.' },
    { id: 'miriam', name: 'Miriam', emoji: '🥁', summary: 'Sister of Moses; led the women in song.' },
  ],
  stories: [
    {
      id: 'burning-bush',
      title: 'The Burning Bush',
      emoji: '🔥',
      summary: 'Moses meets God in a bush that burns but does not burn up.',
      questions: [
        {
          id: 'q1',
          question: 'What did God tell Moses to remove near the bush?',
          choices: [
            { id: 'c1', text: 'His hat', isCorrect: false },
            { id: 'c2', text: 'His sandals', isCorrect: true },
            { id: 'c3', text: 'His cloak', isCorrect: false },
            { id: 'c4', text: 'His staff', isCorrect: false },
          ],
          correctExplanation: 'He was on holy ground.'
        }
      ]
    },
    {
      id: 'red-sea',
      title: 'Crossing the Red Sea',
      emoji: '🌊',
      summary: 'Walk with Israel through the sea on dry ground!',
      questions: [
        {
          id: 'q1',
          question: 'What did Moses raise to part the sea?',
          choices: [
            { id: 'c1', text: 'A sword', isCorrect: false },
            { id: 'c2', text: 'His staff', isCorrect: true },
            { id: 'c3', text: 'A flag', isCorrect: false },
            { id: 'c4', text: 'A lantern', isCorrect: false },
          ],
          correctExplanation: 'He lifted his staff as God commanded.'
        }
      ]
    }
  ]
};

export const books: Book[] = bookNames.map((name, index) => {
  const slug = slugify(name);
  const color = gradientPalette[index % gradientPalette.length];
  const base: Book = {
    slug,
    name,
    color,
    emoji: undefined,
    characters: defaultCharacters,
    stories: defaultStories,
  };

  if (name === 'Genesis') {
    return { ...base, ...genesis } as Book;
  }
  if (name === 'Exodus') {
    return { ...base, ...exodus } as Book;
  }
  return base;
});

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

