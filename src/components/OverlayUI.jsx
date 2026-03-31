import { AnimatePresence, motion } from 'framer-motion';

const chapters = [
  {
    tag: 'Arrival',
    title: 'Andrew Coutinho',
    line: 'I build across product, operations, leadership, and creative strategy.',
  },
  {
    tag: 'Positioning',
    title: 'Founder mindset. Analytical execution.',
    line: 'Pittsburgh-based, London-connected. Economics + Africana Studies at Pitt.',
  },
  {
    tag: 'Experience',
    title: 'Leadership expressed through systems and outcomes.',
    line: 'Entrepreneurship, community leadership, and multi-stakeholder coordination.',
  },
  {
    tag: 'Impact',
    title: 'Built and scaled initiatives with real ownership.',
    line: 'From business operations to event execution and digital delivery.',
  },
  {
    tag: 'Capabilities',
    title: 'Product. Operations. Communication. Creative direction.',
    line: 'A cross-disciplinary toolkit designed for high-growth environments.',
  },
  {
    tag: 'Contact',
    title: 'Open to high-impact opportunities.',
    line: 'Product, strategy, operations, partnerships, and leadership-track roles.',
  },
];

export default function OverlayUI({ activeChapter }) {
  const chapter = chapters[activeChapter] ?? chapters[0];

  return (
    <div className="overlay-shell">
      <div className="overlay-top">ASF VISUALS LLC · PROFESSIONAL PORTFOLIO</div>

      <AnimatePresence mode="wait">
        <motion.section
          key={chapter.tag}
          className="chapter-copy"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28 }}
          transition={{ duration: 0.6, ease: [0.2, 0.65, 0.2, 1] }}
        >
          <p>{chapter.tag}</p>
          <h1>{chapter.title}</h1>
          <h2>{chapter.line}</h2>
        </motion.section>
      </AnimatePresence>

      <div className="overlay-bottom">
        <a href="mailto:andrew@example.com">Email</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://asfvisuals.com" target="_blank" rel="noreferrer">
          ASF Visuals LLC
        </a>
      </div>
    </div>
  );
}
