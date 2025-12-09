import { Post, PostResponse, PostsResponse } from "@/types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export async function getPosts(page = 1, limit = 9, search = '', category = ''): Promise<PostsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search) params.append('search', search);
  if (category && category !== 'All') params.append('category_id', category);

  const url = `${API_BASE_URL}/blog/posts?${params.toString()}`;
  
  console.log(`Fetching posts from: ${url}`);

  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
        console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
        return { data: [], meta: { page, limit, total: 0, total_pages: 0 } };
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { data: [], meta: { page, limit, total: 0, total_pages: 0 } };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const url = `${API_BASE_URL}/blog/posts/${slug}`;
  console.log(`Fetching post from: ${url}`);

  try {
    const res = await fetch(url, {
        cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 404) return null;
        console.error(`Failed to fetch post: ${res.status} ${res.statusText}`);
        return null; 
    }

    const json = await res.json(); // Don't enforce strict type here locally to simple parsing errors, but cast result
    return json.data || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getRelatedPosts(id: string): Promise<Post[]> {
  // Placeholder: Fetch generic posts for now, ideally backend has a related endpoint
  const res = await getPosts(1, 5);
  return res.data.filter(p => p.id !== id);
}
