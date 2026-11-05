import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { STORY_STAGES } from '../config/experienceConfig';

export default function NavigationControl({ currentStage, onSelectStage }) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't show the full menu banner on Screen 1 to keep the opening cinematic and clean,
  // but if past Screen 1, provide quick chapter access
  const currentIndex = STORY_STAGES.findIndex((s) => s.key === currentStage);
  const currentStageInfo = STORY_STAGES[currentIndex] || STORY_STAGES[0];

  const handleSelect = (stageKey) => {
    soundEngine.playCardClick();
    onSelectStage(stageKey);
    setIsOpen(false);
  };

  return (
    <>
      {/* Discreet floating chapter bookmark pill (Bottom-left) */}
      <div className="fixed bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-40">
        <button
          onClick={() => {
            soundEngine.playCardClick();
            setIsOpen(!isOpen);
          }}
          className="px-3 py-1 sm:py-1.5 rounded-full bg-[#070e0a]/90 hover:bg-[#0f1f17] border border-gold-500/35 hover:border-gold-400/60 shadow-[0_4px_18px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 text-[11px] sm:text-xs text-gold-300 cursor-pointer"
        >
          <span className="text-gold-400 font-cinzel text-[11px] font-semibold">
            {currentStageInfo.roman}
          </span>
          <span className="text-gold-500/40 hidden xs:inline">•</span>
          <span className="font-serif text-champagne-200 text-[11px] hidden xs:inline">
            {currentStageInfo.label}
          </span>
          <svg
            className={`w-3 h-3 text-gold-400 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Chapter Index Popover Drawer */}
        {isOpen && (
          <div className="absolute bottom-10 left-0 w-56 sm:w-72 max-h-[60vh] overflow-y-auto no-scrollbar rounded-2xl glass-card-forest p-3 shadow-[0_15px_40px_rgba(0,0,0,0.85)] border border-gold-500/40 animate-fade-in">
            <div className="text-[9px] sm:text-[10px] uppercase font-cinzel tracking-widest text-gold-400/80 mb-2 pb-1 border-b border-gold-500/20">
              Storybook Chapters
            </div>
            <div className="space-y-1">
              {STORY_STAGES.map((s) => {
                const isActive = s.key === currentStage;
                return (
                  <button
                    key={s.key}
                    onClick={() => handleSelect(s.key)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-serif flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gold-500/20 text-gold-200 font-semibold border-l-2 border-gold-400'
                        : 'text-champagne-300/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate text-[11px] sm:text-xs">{s.label}</span>
                    <span className="text-[9px] font-cinzel text-gold-400/70 ml-2">
                      {s.roman}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
