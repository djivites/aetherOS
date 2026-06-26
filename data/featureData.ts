export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: 'database' | 'cog-8-tooth' | 'chart-pie' | 'arrow-trending-up' | 'shield-check' | 'link';
  bgColor: string;
  borderColor: string;
  glowColor: string;
  accentColor: string; // Forsythia or Deep Saffron
}

export const featureData: FeatureItem[] = [
  {
    id: 'unified-data',
    title: 'Unified Data',
    tagline: 'Connect and centralize',
    description: 'Connect all your data sources in one place.',
    iconName: 'database',
    bgColor: 'bg-brand-noir/90',
    borderColor: 'border-[#114C5A]/15 hover:border-[#FFC801]/60',
    glowColor: 'shadow-[#FFC801]/5',
    accentColor: 'text-[#FFC801]'
  },
  {
    id: 'smart-automation',
    title: 'Smart Automation',
    tagline: 'Autonomous AI agents',
    description: 'Automate workflows with autonomous AI agents.',
    iconName: 'cog-8-tooth',
    bgColor: 'bg-brand-noir/90',
    borderColor: 'border-[#114C5A]/15 hover:border-[#FF9932]/60',
    glowColor: 'shadow-[#FF9932]/5',
    accentColor: 'text-[#FF9932]'
  },
  {
    id: 'advanced-analytics',
    title: 'Advanced Analytics',
    tagline: 'Real-time insights',
    description: 'Real-time insights with powerful analytics.',
    iconName: 'chart-pie',
    bgColor: 'bg-brand-noir/90',
    borderColor: 'border-[#114C5A]/15 hover:border-[#FFC801]/60',
    glowColor: 'shadow-[#FFC801]/5',
    accentColor: 'text-[#FFC801]'
  },
  {
    id: 'ai-predictions',
    title: 'AI Predictions',
    tagline: 'Machine learning',
    description: 'Predict trends and outcomes with machine learning.',
    iconName: 'arrow-trending-up',
    bgColor: 'bg-brand-noir/90',
    borderColor: 'border-[#114C5A]/15 hover:border-[#FF9932]/60',
    glowColor: 'shadow-[#FF9932]/5',
    accentColor: 'text-[#FF9932]'
  },
  {
    id: 'data-governance',
    title: 'Data Governance',
    tagline: 'Security & compliance',
    description: 'Enterprise-grade security and compliance.',
    iconName: 'shield-check',
    bgColor: 'bg-brand-noir/90',
    borderColor: 'border-[#114C5A]/15 hover:border-[#FFC801]/60',
    glowColor: 'shadow-[#FFC801]/5',
    accentColor: 'text-[#FFC801]'
  },
  {
    id: 'easy-integrations',
    title: 'Easy Integrations',
    tagline: 'Connect 100+ tools',
    description: 'Connect with 100+ tools in one click.',
    iconName: 'link',
    bgColor: 'bg-brand-noir/90',
    borderColor: 'border-[#114C5A]/15 hover:border-[#FF9932]/60',
    glowColor: 'shadow-[#FF9932]/5',
    accentColor: 'text-[#FF9932]'
  }
];
