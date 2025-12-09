"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Sidebar() {
    const t = useTranslations('Common');

    // Dummy related blogs
    const related = [
        { id: '1', title: 'Top 10 React Tips' },
        { id: '2', title: 'Understanding Next.js 15' },
        { id: '3', title: 'Tailwind CSS Tricks' },
        { id: '4', title: 'Why TypeScript?' },
    ];

    return (
        <div className="space-y-8 sticky top-24">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <h4 className="font-bold text-lg mb-4 border-b pb-2 dark:border-zinc-800">{t('relatedBlogs')}</h4>
                <ul className="space-y-3">
                    {related.map(item => (
                        <li key={item.id}>
                            <Link href={`/blogs/${item.id}`} className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
                <h4 className="font-bold text-lg mb-2">Subscribe</h4>
                <p className="text-blue-100 text-sm mb-4">Get the latest posts delivered right to your inbox.</p>
                <input type="email" placeholder="Email address" className="w-full px-4 py-2 rounded-lg text-black mb-2 outline-none" />
                <button className="w-full py-2 bg-black/20 hover:bg-black/30 rounded-lg transition-colors font-medium">Join Now</button>
            </div>
        </div>
    );
}
