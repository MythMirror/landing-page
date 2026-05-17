"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { subscribeToBrevo } from "@/app/actions/subscribe";
import { NeonInput, NeonTextarea } from "@/components/ui/ContactUi";
import { LegalModal } from "@/components/ui/LegalModal";
import { legalContent } from "@/data/legal";
import {
  Send,
  Mail,
  Building2,
  ArrowRight,
  HeartHandshake,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copyright,
} from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ContactNetwork } from "../3d/ContactNetwork";

const cardCls = cn(
  "h-full rounded-2xl sm:rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden group flex flex-col",
  "bg-white/80 border-slate-200 dark:bg-white/5 dark:border-white/10",
  "p-6 sm:p-8",
);

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/mythmirror",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/mythmirror",
    icon: LinkedinIcon,
  },
  { name: "GitHub", href: "https://github.com/mythmirror", icon: GithubIcon },
];

export function Contact() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);
  const [b2cStatus, setB2cStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [b2bStatus, setB2bStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const openModal = (type: "privacy" | "terms") => setModalType(type);
  const currentLegalData = modalType
    ? legalContent[language as "pt" | "en"][modalType]
    : null;

  async function handleSubscribe(
    e: React.FormEvent<HTMLFormElement>,
    type: "b2c" | "b2b",
  ) {
    e.preventDefault();
    const setStatus = type === "b2c" ? setB2cStatus : setB2bStatus;
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    formData.append("type", type);
    try {
      const result = await subscribeToBrevo(formData);
      setStatus(result.success ? "success" : "error");
      if (!result.success) console.error(result.message);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-10 overflow-hidden bg-background border-t border-border/30"
    >
      <ContactNetwork />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(700px,90vw)] h-[280px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%,rgba(167,139,250,0.07),transparent 65%)",
        }}
      />

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest border border-primary/20"
          >
            <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {t.contact.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-bold tracking-tight mb-4 mt-1"
            style={{ fontSize: "clamp(1.75rem,5vw,3.5rem)" }}
          >
            {t.contact.title}
          </motion.h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            {t.contact.description}
          </p>
        </div>

        {/* Forms grid — 1 col mobile, 2 col lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-14 sm:mb-18 items-stretch">
          {/* B2C */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="h-full"
          >
            <div className={cardCls}>
              <div className="absolute -top-16 -right-16 w-48 sm:w-56 h-48 sm:h-56 bg-accent/18 rounded-full blur-[70px] group-hover:bg-accent/28 transition-colors pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 sm:mb-6 text-accent">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
                  {t.contact.newsletter.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  {t.contact.newsletter.desc}
                </p>
                <div className="mt-auto">
                  {b2cStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col gap-3"
                    >
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                        <div>
                          <p className="font-bold text-sm">
                            {t.contact.success.b2c.title}
                          </p>
                          <p className="text-xs opacity-80">
                            {t.contact.success.b2c.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 px-2 text-xs text-muted-foreground/75">
                        <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                        <p>{t.contact.success.b2c.spam_warning}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <form
                      className="flex flex-col gap-3 sm:gap-4"
                      onSubmit={(e) => handleSubscribe(e, "b2c")}
                    >
                      <NeonInput
                        name="email"
                        type="email"
                        placeholder={t.contact.newsletter.placeholder}
                        required
                      />
                      <button
                        type="submit"
                        disabled={b2cStatus === "loading"}
                        className="group relative w-full px-6 py-3 sm:py-3.5 bg-accent text-white font-bold rounded-lg overflow-hidden shadow-[0_0_18px_-4px_var(--color-accent)] hover:scale-[1.02] transition-transform cursor-pointer disabled:opacity-65 text-sm sm:text-base active:scale-[0.98]"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {b2cStatus === "loading" ? (
                            <>
                              {t.contact.form.sending}
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              {t.contact.newsletter.button}
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-white/18 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </button>
                    </form>
                  )}
                  {b2cStatus !== "success" && (
                    <p className="mt-3 text-[10px] sm:text-xs text-muted-foreground/55 text-center">
                      {t.contact.form.security_note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* B2B */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="h-full"
          >
            <div className={cardCls}>
              <div className="absolute -bottom-16 -left-16 w-48 sm:w-56 h-48 sm:h-56 bg-primary/18 rounded-full blur-[70px] group-hover:bg-primary/28 transition-colors pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-5 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    {t.contact.b2b.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  {t.contact.b2b.desc}
                </p>

                {b2bStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-auto flex flex-col gap-4"
                  >
                    <div className="p-5 sm:p-6 rounded-xl bg-primary/10 border border-primary/20 text-primary flex flex-col items-center text-center gap-3 sm:gap-4">
                      <div className="p-3 sm:p-4 rounded-full bg-primary/18">
                        <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg">
                          {t.contact.success.b2b.title}
                        </h4>
                        <p className="text-xs sm:text-sm opacity-80 mt-1">
                          {t.contact.success.b2b.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    className="space-y-4 sm:space-y-5 mt-auto"
                    onSubmit={(e) => handleSubscribe(e, "b2b")}
                  >
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold uppercase text-muted-foreground mb-1.5 sm:mb-2 ml-1">
                        {t.contact.b2b.fields.company}
                      </label>
                      <NeonInput
                        name="company"
                        placeholder="Ex: Google, Ong Viva..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold uppercase text-muted-foreground mb-1.5 sm:mb-2 ml-1">
                        {t.contact.b2b.fields.email}
                      </label>
                      <NeonInput
                        name="email"
                        type="email"
                        placeholder="contato@empresa.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold uppercase text-muted-foreground mb-1.5 sm:mb-2 ml-1">
                        {t.contact.b2b.fields.message}
                      </label>
                      <NeonTextarea
                        name="message"
                        rows={3}
                        placeholder="Conte-nos sobre sua visão..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={b2bStatus === "loading"}
                      className="w-full py-3.5 sm:py-4 bg-transparent border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 text-sm sm:text-base active:scale-[0.98]"
                    >
                      {b2bStatus === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                          {t.contact.b2b.button}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Footer ────────────────────────────────────── */}
        <footer className="border-t border-border/30 pt-8 sm:pt-10">
          {/* Top: brand + socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-5 sm:mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-foreground">MythMirror</span>
              <span className="text-border/50">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Copyright className="w-3.5 h-3.5 shrink-0" />
                <span>{currentYear}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="p-2 sm:p-2.5 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200 flex items-center justify-center group"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom: rights + legal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs text-muted-foreground/60">
            <span className="text-center sm:text-left">
              {t.contact.footer.rights}
            </span>
            <div className="flex items-center gap-5 sm:gap-6">
              {(["privacy", "terms"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => openModal(type)}
                  className="relative hover:text-primary transition-colors cursor-pointer bg-transparent border-0 p-0 group"
                >
                  {t.contact.footer.links[type]}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-200 group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>
        </footer>
      </div>

      <LegalModal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        type={modalType}
        data={currentLegalData}
      />
    </section>
  );
}
