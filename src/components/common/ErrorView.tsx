"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { FileQuestion, Lock, ShieldAlert, Construction, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorViewProps {
    code: "404" | "401" | "403" | "501";
}

export const ErrorView = ({ code }: ErrorViewProps) => {
    const t = useTranslations("Error");

    const icons = {
        "404": FileQuestion,
        "401": Lock,
        "403": ShieldAlert,
        "501": Construction,
    };

    const Icon = icons[code] || FileQuestion;

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
            <div className="mb-8 rounded-full bg-accent/10 p-8">
                <Icon className="h-16 w-16 text-accent" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl text-primary">
                {t(`${code}.title`)}
            </h1>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
                {t(`${code}.description`)}
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    {t("backHome")}
                </Link>
            </Button>
        </div>
    );
};
