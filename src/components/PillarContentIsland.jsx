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

  return (
    <div>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: stretch;
          min-height: 500px;
        }
        .about-content {
          width: 100%;
        }
        .services-pillars {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }
        .pillar {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem 1rem;
          background: rgba(31, 31, 31, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(0, 169, 255, 0.1);
          transition: 0.2s;
          width: 100%;
          cursor: pointer;
        }
        .pillar.active, .pillar:hover {
          background: rgba(31, 31, 31, 0.8);
          border-color: rgba(0, 169, 255, 0.3);
          transform: translateY(-3px) scale(1.01);
        }
        .pillar-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #00a9ff, #0088cc);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .pillar h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }
        .pillar p {
          font-size: 0.98rem;
          margin: 0;
        }
        .pillar-content-markdown {
          min-height: 120px;
          background: #181818;
          padding: 2rem 2.5rem;
          border-radius: 14px;
          color: #fff;
          box-shadow: 0 2px 16px 0 #0002;
          margin-bottom: 1.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .pillar-content-markdown h3 {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          text-align: center;
          letter-spacing: 0.01em;
        }
        .pillar-content-markdown div {
          min-height: 40px;
          font-size: 1.08rem;
          line-height: 1.7;
        }
        .pillar-content-markdown ul {
          margin: 1.2rem 0 1.5rem 0;
          padding-left: 1.2em;
        }
        .pillar-content-markdown li {
          margin-bottom: 0.5em;
          font-size: 1.05em;
        }
        .pillar-content-markdown strong {
          color: #00a9ff;
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .services-pillars {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          .pillar {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          }
          .pillar-content-markdown ul {
            columns: 1;
            -webkit-columns: 1;
            -moz-columns: 1;
          }
        }
      `}</style>
      <div className="about-grid">
        <div className="about-image about-pillar-content">
          <div className="pillar-content-container">
            <div className="pillar-content-markdown" style={{ minHeight: '120px', background: '#181818', padding: '2rem 2.5rem', borderRadius: '14px', color: '#fff', boxShadow: '0 2px 16px 0 #0002', marginBottom: '1.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center', letterSpacing: '0.01em' }}>{pillars[activeIdx].title}</h3>
              <div style={{ minHeight: '40px', fontSize: '1.08rem', lineHeight: 1.7 }}>
                {pillars[activeIdx].content && pillars[activeIdx].content.trim() !== '' && (
                  <div
                    style={{ textAlign: 'left' }}
                    className="pillar-content-html"
                    dangerouslySetInnerHTML={{ __html: marked.parse(pillars[activeIdx].content) }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="about-content">
          <div className="services-pillars">
            {pillars.map((pillar, idx) => (
              <div
                className={"pillar" + (idx === activeIdx ? " active" : "")}
                data-pillar-idx={idx}
                tabIndex={0}
                key={pillar.title + '-' + idx}
                onClick={() => handlePillarClick(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handlePillarClick(idx);
                }}
                style={{ width: '100%' }}
              >
                <div className="pillar-icon">
                  <LucideIconIsland name={pillar.icon} size={32} strokeWidth={2} />
                </div>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="stats">
            {/* Sekcja na statystyki, jak w Astro */}
          </div>
        </div>
      </div>
    </div>
  );
}
