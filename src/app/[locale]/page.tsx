"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  Play,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const common = useTranslations("Common");

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Zap className="h-4 w-4" />
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-7xl">
              {t("hero.title.before")}{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
                {t("hero.title.highlight")}
              </span>{" "}
              {t("hero.title.after")}
            </h1>

            <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl">
              {t("hero.description")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-accent-foreground font-medium transition-all hover:shadow-lg hover:shadow-accent/30">
                {common("start")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="group inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-3 font-medium transition-all hover:bg-secondary/80">
                <Play className="h-5 w-5 fill-accent text-accent" />
                {common("watchDemo")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-5xl text-balance">
              {t("features.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {t("features.description")}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: t("features.items.0.title"),
                description: t("features.items.0.desc"),
              },
              {
                icon: Shield,
                title: t("features.items.1.title"),
                description: t("features.items.1.desc"),
              },
              {
                icon: TrendingUp,
                title: t("features.items.2.title"),
                description: t("features.items.2.desc"),
              },
              {
                icon: Users,
                title: t("features.items.3.title"),
                description: t("features.items.3.desc"),
              },
              {
                icon: Globe,
                title: t("features.items.4.title"),
                description: t("features.items.4.desc"),
              },
              {
                icon: Smartphone,
                title: t("features.items.5.title"),
                description: t("features.items.5.desc"),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-lg border border-border/50 bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl text-balance">
              {t("testimonials.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {t("testimonials.description")}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid gap-8 md:grid-cols-3"
          >
            {t.raw("testimonials.items").map((item: any, index: number) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 },
                }}
                className="rounded-lg border border-border/50 bg-card p-8"
              >
                <div className="mb-4 flex gap-1">
                  {"⭐".repeat(item.rating)}
                </div>
                <p className="mb-6 leading-relaxed text-muted-foreground italic">
                  "{item.text}"
                </p>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-accent">{item.role}</p>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl text-balance">
              {t("usecases.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {t("usecases.description")}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.raw("usecases.items").map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-lg border border-border/50 bg-card p-6 text-center transition-all hover:shadow-lg hover:border-accent/50"
              >
                <div className="mb-3 text-4xl">{item.icon}</div>
                <h3 className="mb-2 font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-accent/20 to-transparent p-12 text-center backdrop-blur-sm border border-accent/20"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary-foreground text-balance">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
              {t("cta.description")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="rounded-full bg-primary-foreground px-8 py-3 font-medium text-primary transition-all hover:shadow-lg hover:shadow-primary-foreground/30">
                {common("contact")}
              </button>
              <button className="rounded-full border border-primary-foreground px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary-foreground/10">
                {common("explore")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
