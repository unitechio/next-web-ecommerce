"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Calendar, User, Eye } from "lucide-react";
import Image from "next/image";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  views?: number;
  featured_image?: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group h-full flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-neutral-200/60 dark:border-zinc-800 transition-all"
    >
      <Link href={`/blogs/${post.id}`} className="flex flex-col flex-grow">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden bg-neutral-200 dark:bg-zinc-800">
          <Image
            src={post.featured_image || post.imageUrl}
            alt={post.title}
            fill
            unoptimized={true}
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Category + Views */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md">
              {post.category}
            </span>

            {post.views !== undefined && (
              <div className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500 shrink-0">
                <Eye className="w-3 h-3" />
                <span>{post.views}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold leading-snug text-[17px] mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4 flex-grow">
            {post.excerpt}
          </p>

          {/* Footer meta */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-zinc-800 text-xs text-neutral-500 dark:text-neutral-400 mt-auto">
            {/* Author */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-neutral-300 dark:bg-zinc-700 flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
              <span className="font-medium truncate max-w-[100px]">
                {post.author}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1 shrink-0">
              <Calendar className="w-3 h-3" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
