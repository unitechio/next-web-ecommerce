"use client";

import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('Navigation'); // Or 'AboutPage' if I added it

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-8">{t('about')}</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                We are a passionate team of writers and developers building a community around technology, design, and innovation.
                Our goal is to share knowledge and inspire creativity.
            </p>
        </div>
    );
}
