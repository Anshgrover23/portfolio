export interface BlogPost {
  id: 1;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  coverImage?: string;
}
