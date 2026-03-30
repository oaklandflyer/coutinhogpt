import { motion } from 'framer-motion';

const navLinks = [
  ['Positioning', '#positioning'],
  ['Experience', '#experience'],
  ['Impact', '#impact'],
  ['Capabilities', '#capabilities'],
  ['Contact', '#contact'],
];

const experiences = [
  {
    role: 'Founder · ASF Visuals LLC',
    period: 'Entrepreneurship',
    highlight: 'Built a premium service business from zero to a trusted brand, owning strategy, client delivery, and operations.',
  },
  {
    role: 'Vice Curator · Global Shapers Pittsburgh',
    period: 'Civic Leadership',
    highlight: 'Helped shape cross-sector programming and execute stakeholder-driven initiatives with citywide relevance.',
  },
  {
    role: 'Founder / President / Advisor · Fitness & Bodybuilding Club at Pitt',
    period: 'Community Scale',
    highlight: 'Launched and scaled a high-engagement student platform with repeatable systems for programming and leadership.',
  },
  {
    role: 'Co-Founder / President · National Collegiate Bodybuilding Organization',
    period: 'National Expansion',
    highlight: 'Co-created a multi-campus organization model designed for long-term governance, growth, and professional credibility.',
  },
  {
    role: 'University of Pittsburgh Leadership Roles',
    period: 'Campus Operations',
    highlight: 'Executed across events, advising, communication, and engagement where consistency and stakeholder trust mattered.',
  },
];

const impacts = [
  ['Operating System for ASF Visuals', 'Designed a repeatable client pipeline from inquiry to delivery, improving quality control and speed.'],
  ['Multi-Stakeholder Retreats & Events', 'Led planning across partners, logistics, and communications to deliver premium experiences.'],
  ['Leadership Infrastructure', 'Built onboarding, governance, and execution rhythms that enabled organizations to scale beyond founders.'],
  ['Digital Brand Surfaces', 'Directed web and digital assets to sharpen positioning, trust, and conversion for professional audiences.'],
];

const capabilities = [
  ['Product & Strategy', 'Product thinking, market intelligence, strategic planning, partnership mapping'],
  ['Operations & Execution', 'Cross-functional coordination, process design, program delivery, event operations'],
  ['Leadership & Communication', 'Stakeholder alignment, executive presence, public speaking, team development'],
  ['Creative & Digital', 'Creative direction, brand storytelling, HTML/CSS/JavaScript, photography & drone media'],
];

const rise = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.8, ease: [0.2, 0.65, 0.2, 1] },
  }),
};

export default function App() {
  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="floating-nav">
        <a className="mark" href="#top">
          <span className="mark-dot" />
          <span>
            Andrew Coutinho
            <small>ASF Visuals LLC</small>
          </span>
        </a>
        <nav>
          {navLinks.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero frame">
          <div className="aurora" aria-hidden="true" />
          <motion.p className="eyebrow" initial="hidden" animate="visible" variants={rise} custom={1}>
            Pittsburgh-based · London-connected · Recruiter-facing portfolio
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={rise} custom={2}>
            Andrew
            <br />
            Coutinho
          </motion.h1>
          <motion.p className="hero-line" initial="hidden" animate="visible" variants={rise} custom={3}>
            I build across product, operations, leadership, and creative strategy.
          </motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="visible" variants={rise} custom={4}>
            <a href="#experience">Selected Experience</a>
            <a href="#impact">Impact Highlights</a>
            <a href="#contact">Connect</a>
          </motion.div>
        </section>

        <section className="positioning frame" id="positioning">
          <motion.div
            className="split-layout"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={rise}
          >
            <p className="kicker">Positioning</p>
            <h2>Founder energy with analytical discipline.</h2>
            <p>
              Economics and Africana Studies graduate from the University of Pittsburgh. I combine strategic thinking,
              execution rigor, leadership communication, and creative direction to move complex initiatives forward.
            </p>
          </motion.div>
          <motion.aside
            className="positioning-note"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={rise}
            custom={2}
          >
            Built for product, strategy, operations, partnerships, and leadership-track opportunities.
          </motion.aside>
        </section>

        <section className="experience frame" id="experience">
          <p className="kicker">Selected Experience</p>
          <div className="experience-stack">
            {experiences.map((item, index) => (
              <motion.article
                key={item.role}
                className="exp-panel"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={rise}
                custom={index + 1}
              >
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <p>{item.highlight}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="impact frame" id="impact">
          <p className="kicker">Selected Impact</p>
          <h2>Systems, initiatives, and outcomes built with ownership.</h2>
          <div className="impact-grid">
            {impacts.map(([title, copy], i) => (
              <motion.article
                key={title}
                className="impact-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={rise}
                custom={i + 1}
              >
                <h3>{title}</h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="capabilities frame" id="capabilities">
          <p className="kicker">Capabilities</p>
          <div className="capability-rail">
            {capabilities.map(([title, detail], i) => (
              <motion.article
                key={title}
                className="capability"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={rise}
                custom={i + 1}
              >
                <h3>{title}</h3>
                <p>{detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="contact frame" id="contact">
          <motion.p className="kicker" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={rise}>
            Contact
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={rise} custom={2}>
            Available for high-impact roles and ambitious collaborations.
          </motion.h2>
          <motion.div className="contact-links" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={rise} custom={3}>
            <a href="mailto:andrew@example.com">andrew@example.com</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://asfvisuals.com" target="_blank" rel="noreferrer">
              ASF Visuals LLC
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
