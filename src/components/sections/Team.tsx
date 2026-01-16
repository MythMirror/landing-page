"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { TeamCard } from "@/components/ui/TeamCard";
import { SectionDivider } from "../ui/SectionDivider";

export function Team() {
  const { t } = useLanguage();

  const labels = Object.values(t.about.stats_labels);

  // Mapeamento das Imagens
  const memberImages = {
    victor_r: "/team/victor-rocha.jpg",
    matheus: "/team/matheus.jpg",
    victor_g: "/team/victor-gabriel.jpg",
    natan: "/team/natan.jpg",
  };

  const teamMembers = [
    { id: "victor_r", data: t.about.team.victor_r, img: memberImages.victor_r },
    { id: "matheus", data: t.about.team.matheus, img: memberImages.matheus },
    { id: "victor_g", data: t.about.team.victor_g, img: memberImages.victor_g },
    { id: "natan", data: t.about.team.natan, img: memberImages.natan },
  ];

  return (
    <section
      id="team"
      className="relative py-24 md:py-32 overflow-hidden bg-background/50"
    >
      <SectionDivider position="top" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm"
          >
            {/* Ícone de Grupo */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            {t.about.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {t.about.description}
          </motion.p>
        </div>

        {/* Grid da Equipe */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 place-items-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 50, delay: index * 0.1 }}
              className="w-full h-full flex justify-center"
            >
              <TeamCard
                name={member.data.name}
                role={member.data.role}
                bio={member.data.bio}
                stats={member.data.stats}
                labels={labels}
                imageSrc={member.img}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
