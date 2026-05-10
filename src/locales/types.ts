export interface Translations {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
    stats: {
      apps: string;
      ecosystem: string;
      possibilities: string;
    }
  };
  nav: {
    home: string;
    ecosystem: string;
    mission: string;
    origin: string;
    team: string;
    roadmap: string;
    contact: string;
    cta: string;
  };
  ecosystem: {
    section_badge: string;
    title: string;
    description: string;
    apps: {
      athens: AppContent;
      midas: AppContent;
      orpheus: AppContent;
      themis: AppContent;
      asclepius: AppContent;
      clio: AppContent;
    };
    center_card: {
      title: string;
      subtitle: string;
      features: {
        gamification: string;
        security: string;
        progress: string;
      };
    };
    pillars: {
      learn: string;
      act: string;
      connect: string;
    };
  };
  mission: {
    badge: string;
    title: string;
    description: string;
    stats: {
      education: { value: string; label: string };
      debt: { value: string; label: string };
      mental: { value: string; label: string };
    };
    values: {
      innovation: { title: string; desc: string };
      impact: { title: string; desc: string };
      connection: { title: string; desc: string };
    };
  };
  origins: {
    badge: string;
    title: string;
    cards: {
      chaos: { title: string; desc: string };
      bridge: { title: string; desc: string };
      mirror: { title: string; desc: string };
    };
  };
  about: {
    badge: string;
    title: string;
    description: string;
    team: {
      victor_r: TeamMemberProfile;
      matheus: TeamMemberProfile;
      victor_g: TeamMemberProfile;
      natan: TeamMemberProfile;
    };
    stats_labels: {
      tech: string;
      vision: string;
      creativity: string;
      impact: string;
      execution: string;
    };
  };
  roadmap: {
    badge: string;
    title: string;
    description: string;
    steps: {
      q1: { phase: string; title: string; desc: string };
      q2: { phase: string; title: string; desc: string };
      q3: { phase: string; title: string; desc: string };
      q4: { phase: string; title: string; desc: string };
      future: { phase: string; title: string; desc: string };
    };
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    newsletter: {
      title: string;
      desc: string;
      placeholder: string;
      button: string;
      success: string;
    };
    b2b: {
      title: string;
      desc: string;
      fields: {
        company: string;
        email: string;
        message: string;
      };
      button: string;
    };
    form: {
      sending: string;
      security_note: string;
    };
    success: {
      b2c: {
        title: string;
        message: string;
        spam_warning: string;
      };
      b2b: {
        title: string;
        message: string;
        spam_warning: string;
      };
    };
    footer: {
      rights: string;
      links: { privacy: string; terms: string };
    };
  };
  legal: {
    modal: {
      close: string;
      understood: string;
      updated_label: string;
      footer_quote: string;
    };
  };
  system: {
    loading: string;
    not_found: {
      title: string;
      description: string;
      button: string;
    };
  };
}

export interface AppContent {
  name: string;
  tagline: string;
  description: string;
}

export interface TeamMemberProfile {
  name: string;
  role: string;
  bio: string;
  stats: [number, number, number, number, number];
}
