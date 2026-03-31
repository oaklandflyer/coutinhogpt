import { AnimatePresence, motion } from 'framer-motion';

const chapters = [
  ['Arrival', 'Andrew Coutinho', 'Product · Operations · Leadership · Creative Strategy'],
  ['Positioning', 'Founder Energy. Executive Clarity.', 'Pittsburgh-based. London-connected. Built for global scale.'],
  ['Experience', 'Organizations Built, Not Just Joined.', 'ASF Visuals, Global Shapers, Pitt leadership, national initiatives.'],
  ['Impact', 'Execution That Compounds.', 'Systems, events, and partnerships delivered with ownership.'],
  ['Capabilities', 'Cross-Disciplinary by Design.', 'Product & Strategy · Operations · Communication · Digital'],
  ['Contact', 'Let’s Build What’s Next.', 'Open to product, strategy, operations, and leadership-track opportunities.'],
];

export default function OverlayUI({ activeChapter }) {
  const [tag, title, subtitle] = chapters[activeChapter] ?? chapters[0];

  return (
    <div className="overlay-shell">
      <div className="overlay-top">ASF VISUALS LLC · INTERACTIVE PORTFOLIO</div>

      <AnimatePresence mode="wait">
        <motion.section
          key={tag}
          className="chapter-copy"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -45 }}
          transition={{ duration: 0.72, ease: [0.2, 0.65, 0.2, 1] }}
        >
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            {tag}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65 }}
          >
            {title}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {subtitle}
          </motion.h2>
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
