import { getTranslations } from 'next-intl/server';
import { BlogCard } from '@/components/BlogCard';
import { Sidebar } from '@/components/blog/Sidebar';
import { CommentSection } from '@/components/blog/CommentSection';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPosts } from '@/services/blog';
import { Link } from '@/i18n/routing';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default async function BlogsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const t = await getTranslations('Common');
    const resolvedSearchParams = await searchParams;

    const page = Number(resolvedSearchParams.page) || 1;
    const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';
    const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : 'All';

    const { data: posts, meta } = await getPosts(page, 12, search, category); // Increased limit to 12 for 4-col grid

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-8">
                {/* Controls */}
                <form className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 sticky top-20 z-10 backdrop-blur-md bg-opacity-90">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            name="search"
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            defaultValue={search}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-2 items-center">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            name="category"
                            defaultValue={category}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All Categories</option>
                            <option value="Tech">Tech</option>
                            <option value="Design">Design</option>
                        </select>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Apply</button>
                    </div>
                </form>

                {/* Main Content - Full Width Grid */}
                <main className="w-full">
                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[500px]">
                        {posts.map(post => (
                            <BlogCard key={post.id} post={{
                                id: post.slug || post.id,
                                title: post.title,
                                excerpt: post.excerpt || '',
                                author: post.author?.name || 'Unknown',
                                date: new Date(post.created_at).toLocaleDateString(),
                                imageUrl: post.featured_image || 'https://placehold.co/600x400',
                                category: post.categories?.[0]?.name || 'General',
                                views: post.view_count || 0,
                            }} />
                        ))}
                        {posts.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No blogs found.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {meta.total_pages > 1 && (
                        <Pagination className="mt-12">
                            <PaginationContent>
                                {page > 1 ? (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={`/blogs?page=${page - 1}&search=${search}&category=${category}`}
                                        />
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            className="pointer-events-none opacity-50"
                                            aria-disabled="true"
                                        />
                                    </PaginationItem>
                                )}

                                {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map((p) => (
                                    <PaginationItem key={p}>
                                        <PaginationLink
                                            href={`/blogs?page=${p}&search=${search}&category=${category}`}
                                            isActive={page === p}
                                        >
                                            {p}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {page < meta.total_pages ? (
                                    <PaginationItem>
                                        <PaginationNext
                                            href={`/blogs?page=${page + 1}&search=${search}&category=${category}`}
                                        />
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            className="pointer-events-none opacity-50"
                                            aria-disabled="true"
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    )}
                </main>
            </div>
        </div>
    );
}
