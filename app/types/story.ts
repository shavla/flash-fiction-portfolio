// What a story list needs: the details from the --- block of a story file
export type StoryMeta = {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
};

// A full story, ready to read
export type Story = StoryMeta & {
  content: string;
};
