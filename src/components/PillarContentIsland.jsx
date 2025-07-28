import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import LucideIconIsland from "./LucideIconIsland.jsx";

marked.setOptions({ breaks: true });

export default function PillarContentIsland({ pillars }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!userInteracted) {
        setActiveIdx((idx) => (idx + 1) % pillars.length);
      }
    }, 15000); // 15 sekund
    return () => clearInterval(intervalRef.current);
  }, [userInteracted, pillars.length]);

  const handlePillarClick = (idx) => {
    setActiveIdx(idx);
    setUserInteracted(true);
  };

  if (!pillars || pillars.length === 0) return null;

  return (
    <div className="pillars-layout">
      <style>{`
        .pillars-layout {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          align-items: start;
        }

        /* Prawa kolumna - nawigacja */
        .pillars-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          grid-column: 2;
          grid-row: 1;
        }

        .pillar-nav-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(0, 169, 255, 0.05);
          border: 1px solid rgba(0, 169, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pillar-nav-item:hover,
        .pillar-nav-item.active {
          background: rgba(0, 169, 255, 0.1);
          border-color: rgba(0, 169, 255, 0.3);
          transform: translateY(-2px);
        }

        .pillar-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--accent-blue), #0056b3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .pillar-text h3 {
          color: var(--text-main);
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .pillar-text p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Lewa kolumna - content */
        .pillars-content {
          grid-column: 1;
          grid-row: 1;
        }

        .pillar-content-display {
          background: rgba(0, 169, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid rgba(0, 169, 255, 0.1);
          min-height: 300px;
        }

        .pillar-content-title {
          color: var(--text-main);
          margin: 0 0 1.5rem 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .pillar-content {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1rem;
        }

        .pillar-content strong {
          color: var(--text-main);
        }

        @media (max-width: 768px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            display: flex;
            flex-direction: column;
          }

          /* Na mobile: najpierw nawigacja (prawa kolumna) */
          .pillars-nav {
            order: 1;
            grid-column: 1;
            width: 100%;
          }

          /* Potem content (lewa kolumna) */
          .pillars-content {
            order: 2;
            grid-column: 1;
            width: 100%;
          }

          .pillar-nav-item {
            padding: 1rem;
            gap: 0.75rem;
          }

          .pillar-icon {
            width: 40px;
            height: 40px;
          }

          .pillar-text h3 {
            font-size: 1.1rem;
          }

          .pillar-text p {
            font-size: 0.9rem;
          }

          .pillar-content-display {
            padding: 1.5rem;
            min-height: 200px;
          }
        }

        @media (max-width: 480px) {
          .pillars-grid {
            gap: 1.5rem;
          }

          .pillars-nav {
            gap: 1rem;
          }

          .pillar-nav-item {
            padding: 0.75rem;
          }

          .pillar-content-display {
            padding: 1rem;
          }
        }
      `}</style>
      <div className="pillars-grid">
        {/* Prawa kolumna - nawigacja (icon, title, description) */}
        <div className="pillars-nav">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`pillar-nav-item ${index === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(index)}
            >
              <div className="pillar-icon">
                <LucideIconIsland name={pillar.icon} size={32} strokeWidth={2} />
              </div>
              <div className="pillar-text">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lewa kolumna - content */}
        <div className="pillars-content">
          <div className="pillar-content-display">
            <h4 className="pillar-content-title">{pillars[activeIdx]?.title}</h4>
            <div
              className="pillar-content"
              dangerouslySetInnerHTML={{
                __html: pillars[activeIdx]?.content?.replace(/\n/g, '<br/>') || ''
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
