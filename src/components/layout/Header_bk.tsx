"use client";

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
    const t = useTranslations('Navigation');
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/blogs', label: t('blogs') },
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-sm'
                    : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Blog<span className="text-foreground">App</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
                    <Link href="/login" className="text-sm font-medium hover:underline">
                        {t('login')}
                    </Link>
                    <Link
                        href="/register"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-shadow hover:shadow-lg"
                    >
                        {t('register')}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-black border-t dark:border-gray-800"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-800"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex items-center justify-between pt-4">
                                <LanguageSwitcher />
                                <ThemeToggle />
                            </div>
                            <div className="flex flex-col space-y-2 pt-2">
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 border rounded-md">
                                    {t('login')}
                                </Link>
                                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 bg-blue-600 text-white rounded-md">
                                    {t('register')}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
