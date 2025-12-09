import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

import { Sidebar } from "@/components/blog/Sidebar";
import { CommentSection } from "@/components/blog/CommentSection";
import { getPostBySlug, getRelatedPosts } from "@/services/blog";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Eye,
  Clock,
} from "lucide-react";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;
  const t = await getTranslations("Common");

  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const relatedPosts = await getRelatedPosts(post.id);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header + Back Button */}
      <div className="border-b bg-background/60 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <Link href="/blogs">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("back")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* MAIN CONTENT */}
        <article className="w-full lg:w-3/4 mx-auto max-w-4xl">
          {/* Title + Meta */}
          <header className="mb-8">
            {/* Category */}
            <Badge variant="secondary" className="mb-4">
              {post.categories?.[0]?.name || "General"}
            </Badge>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.author?.name && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
              )}

              {post.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time>{formatDate(post.created_at)}</time>
                </div>
              )}

              {post.views !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.views.toLocaleString()} lượt xem</span>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="relative w-full h-96 mb-10 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* TOC */}
          {post.table_of_contents && (
            <Card className="mb-10 border-2">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  Mục lục
                </h2>

                {(() => {
                  try {
                    const tocItems = JSON.parse(post.table_of_contents);
                    return (
                      <nav className="space-y-2">
                        {tocItems.map((item: any, idx: number) => (
                          <a
                            key={idx}
                            href={`#${item.id}`}
                            className="block text-primary hover:underline transition-colors"
                            style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
                          >
                            {item.text}
                          </a>
                        ))}
                      </nav>
                    );
                  } catch {
                    return null;
                  }
                })()}
              </CardContent>
            </Card>
          )}

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator className="my-8" />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4" />
                <h3 className="font-semibold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <>
              <Separator className="my-8" />

              <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((item: any) => (
                  <Card
                    key={item.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    {item.featured_image && (
                      <div className="relative w-full h-48">
                        <Image
                          src={item.featured_image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-t-lg"
                          unoptimized
                        />
                      </div>
                    )}

                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {item.title}
                      </h3>

                      {item.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(item.created_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Comments */}
          <div className="mt-10">
            <CommentSection />
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-1/4">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
