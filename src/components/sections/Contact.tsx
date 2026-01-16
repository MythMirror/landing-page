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
} from "lucide-react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { ContactNetwork } from "../3d/ContactNetwork";

// Estados Compartilhados
const cardStyles = cn(
  "h-full p-8 rounded-3xl border shadow-xl backdrop-blur-xl transition-all relative overflow-hidden group flex flex-col",
  "bg-white/80 border-slate-200 dark:bg-white/5 dark:border-white/10"
);

// Redes Sociais
const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/mythmirror",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/mythmirror",
    icon: FaLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/mythmirror",
    icon: FaGithub,
  },
];

export function Contact() {
  const { t, language } = useLanguage();

  // Estados
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);
  const [b2cStatus, setB2cStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [b2bStatus, setB2bStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Handlers
  const openModal = (type: "privacy" | "terms") => setModalType(type);

  const currentLegalData = modalType
    ? legalContent[language as "pt" | "en"][modalType]
    : null;

  async function handleSubscribe(
    e: React.FormEvent<HTMLFormElement>,
    type: "b2c" | "b2b"
  ) {
    e.preventDefault();
    const setStatus = type === "b2c" ? setB2cStatus : setB2bStatus;

    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    formData.append("type", type);

    try {
      const result = await subscribeToBrevo(formData);

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        console.error(result.message);
      }
    } catch (error) {
      setStatus("error");
      console.error("Erro de conexão");
    }
  }

  return (
    <section
      id="contact"
      className="relative pt-32 pb-10 overflow-hidden bg-background border-t border-border/40"
    >
      <ContactNetwork />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary uppercase tracking-widest border border-primary/20"
          >
            <HeartHandshake className="w-4 h-4" />
            {t.contact.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            {t.contact.title}
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            {t.contact.description}
          </p>
        </div>

        {/* Grid de Formulários */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-32 items-stretch">
          {/* Lado Esquerdo: Waitlist (B2C) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className={cardStyles}>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-[80px] group-hover:bg-accent/30 transition-colors pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent">
                  <Mail className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {t.contact.newsletter.title}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t.contact.newsletter.desc}
                </p>

                <div className="mt-auto">
                  {b2cStatus === "success" ? (
                    // MENSAGEM DE SUCESSO B2C
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col gap-3"
                    >
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 shrink-0" />
                        <div>
                          <p className="font-bold text-sm">
                            {t.contact.success.b2c.title}
                          </p>
                          <p className="text-xs opacity-80">
                            {t.contact.success.b2c.message}
                          </p>
                        </div>
                      </div>
                      {/* Aviso de Spam */}
                      <div className="flex items-start gap-2 px-2 text-xs text-muted-foreground/80">
                        <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                        <p>{t.contact.success.b2c.spam_warning}</p>
                      </div>
                    </motion.div>
                  ) : (
                    // FORMULÁRIO B2C
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={(e) => handleSubscribe(e, "b2c")}
                    >
                      <div className="flex-1">
                        <NeonInput
                          name="email"
                          type="email"
                          placeholder={t.contact.newsletter.placeholder}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={b2cStatus === "loading"}
                        className="group relative w-full px-6 py-3 bg-accent text-white font-bold rounded-lg overflow-hidden shadow-[0_0_20px_var(--color-accent)] hover:scale-105 transition-transform cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {b2cStatus === "loading" ? (
                            <>
                              {t.contact.form.sending}{" "}
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              {t.contact.newsletter.button}{" "}
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </span>
                        {b2cStatus !== "loading" && (
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        )}
                      </button>
                    </form>
                  )}

                  {b2cStatus !== "success" && (
                    <p className="mt-4 text-xs text-muted-foreground/60 text-center">
                      {t.contact.form.security_note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito: Parceiros (B2B) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className={cardStyles}>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {t.contact.b2b.title}
                  </h3>
                </div>

                <p className="text-muted-foreground mb-8">
                  {t.contact.b2b.desc}
                </p>

                {b2bStatus === "success" ? (
                  // MENSAGEM DE SUCESSO B2B
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-auto flex flex-col gap-4"
                  >
                    <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-primary flex flex-col items-center text-center gap-4">
                      <div className="p-4 rounded-full bg-primary/20">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          {t.contact.success.b2b.title}
                        </h4>
                        <p className="text-sm opacity-80 mt-1">
                          {t.contact.success.b2b.message}
                        </p>
                      </div>
                    </div>
                    {/* Aviso de Spam */}
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/80 text-center">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <p>{t.contact.success.b2b.spam_warning}</p>
                    </div>
                  </motion.div>
                ) : (
                  // FORMULÁRIO B2B
                  <form
                    className="space-y-6 mt-auto"
                    onSubmit={(e) => handleSubscribe(e, "b2b")}
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 ml-1">
                        {t.contact.b2b.fields.company}
                      </label>
                      <NeonInput
                        name="company"
                        placeholder="Ex: Google, Ong Viva..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 ml-1">
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
                      <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 ml-1">
                        {t.contact.b2b.fields.message}
                      </label>
                      <NeonTextarea
                        name="message"
                        rows={3}
                        placeholder="Conte-nos sobre sua visão..."
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={b2bStatus === "loading"}
                        className="w-full py-4 bg-transparent border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {b2bStatus === "loading" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            {t.contact.b2b.button}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/40 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">MythMirror</span>
            <span>{t.contact.footer.rights}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => openModal("privacy")}
              className="hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            >
              {t.contact.footer.links.privacy}
            </button>
            <button
              onClick={() => openModal("terms")}
              className="hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            >
              {t.contact.footer.links.terms}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-2 rounded-full bg-secondary/50 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer flex items-center justify-center"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
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
