import { useEffect, useMemo, useState } from 'react';
import WorldScene from './scene/WorldScene';
import OverlayUI from './components/OverlayUI';

const CHAPTERS = 6;

function useImmersiveControls() {
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
      setProgress(Math.min(Math.max(pct, 0), 1));
    };

    const onMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * -2,
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return { progress, mouse };
}

export default function App() {
  const { progress, mouse } = useImmersiveControls();

  const activeChapter = useMemo(
    () => Math.min(CHAPTERS - 1, Math.floor(progress * CHAPTERS + 0.0001)),
    [progress]
  );

  return (
    <div className="experience-root">
      <div className="scene-layer">
        <WorldScene progress={progress} activeChapter={activeChapter} mouse={mouse} />
      </div>

      <OverlayUI activeChapter={activeChapter} />

      <div className="chapter-rail" aria-hidden="true">
        {Array.from({ length: CHAPTERS }).map((_, i) => (
          <span key={i} className={i <= activeChapter ? 'dot active' : 'dot'} />
        ))}
      </div>

      <div className="scroll-track" />
    </div>
  );
}
