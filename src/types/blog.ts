export interface Author {
  id: string;
  name: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author?: Author;
  categories?: Category[];
  created_at: string;
  updated_at: string;
  status: string;
  tags?: string[];
  view_count?: number; // Added based on user request
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface PostsResponse {
  data: Post[];
  meta: Meta;
}

export interface PostResponse {
  data: Post;
}
