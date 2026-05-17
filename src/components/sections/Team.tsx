"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { TeamCard } from "@/components/ui/TeamCard";
import { SectionDivider } from "../ui/SectionDivider";
import { Users } from "lucide-react";

const MEMBERS = [
  { id: "victor_r", img: "/team/victor-rocha.jpg" },
  { id: "matheus", img: "/team/matheus.jpg" },
  { id: "victor_g", img: "/team/victor-gabriel.jpg" },
  { id: "natan", img: "/team/natan.jpg" },
] as const;

export function Team() {
  const { t } = useLanguage();
  const labels = Object.values(t.about.stats_labels);

  return (
    <section
      id="team"
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden"
    >
      <SectionDivider position="top" />

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-3xl h-[30vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%,rgba(167,139,250,0.07),transparent 70%)",
        }}
      />

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl xl:max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div
            className="mb-5 sm:mb-6 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full"
            style={{
              background:
                "linear-gradient(135deg,rgba(167,139,250,0.14),rgba(232,121,249,0.08))",
              border: "1px solid rgba(167,139,250,0.22)",
              boxShadow: "0 0 28px -8px rgba(167,139,250,0.28)",
            }}
          >
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <h2
            className="font-bold tracking-tight mb-4 sm:mb-5"
            style={{ fontSize: "clamp(1.75rem,4.5vw,3.5rem)" }}
          >
            {t.about.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            {t.about.description}
          </p>
        </motion.div>

        {/* Grid
            mobile:  1 col (full width cards)
            sm:      2 col
            xl:      4 col
            2xl:     4 col with larger gap
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-7 2xl:gap-8">
          {MEMBERS.map(({ id, img }, i) => {
            const data = t.about.team[id as keyof typeof t.about.team];
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 55,
                  damping: 16,
                  delay: i * 0.08,
                }}
                className="w-full flex justify-center"
              >
                <TeamCard
                  name={data.name}
                  role={data.role}
                  bio={data.bio}
                  stats={data.stats}
                  labels={labels}
                  imageSrc={img}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
