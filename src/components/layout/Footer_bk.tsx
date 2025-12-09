"use client";

import { useTranslations } from 'next-intl';

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900/50 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} BlogApp. {t('rights')}
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
