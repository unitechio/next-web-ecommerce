"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Send } from 'lucide-react';

export function CommentSection() {
    const t = useTranslations('Common');
    const [comments, setComments] = useState<{ id: number, user: string, text: string }[]>([
        { id: 1, user: "Alice", text: "Great content!" },
        { id: 2, user: "Bob", text: "Very helpful, thanks." }
    ]);
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setComments([...comments, { id: Date.now(), user: "Guest", text: newComment }]);
        setNewComment("");
    };

    return (
        <div className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 mt-12">
            <h3 className="text-2xl font-bold mb-6">{t('comments')}</h3>

            <div className="space-y-4 mb-8">
                {comments.map((c) => (
                    <div key={c.id} className="bg-white dark:bg-black p-4 rounded-xl shadow-sm">
                        <div className="font-semibold text-sm mb-1">{c.user}</div>
                        <div className="text-gray-600 dark:text-gray-300">{c.text}</div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-4 pr-12 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                    placeholder={t('searchPlaceholder').replace('Search', 'Write a comment')} // Hacky override or just string
                    rows={3}
                />
                <button
                    type="submit"
                    className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
