'use client';

import { useState } from 'react';
import GridTile from './GridTile';
import ComingSoonModal from './ComingSoonModal';

interface Tool {
  title: string;
  description: string;
  status: 'live' | 'beta' | 'coming-soon';
  subdomain?: string;
  icon: string;
}

const tools: Tool[] = [
  {
    title: 'PR Timeline Analyzer',
    description: 'Analyze and visualize pull request timelines',
    status: 'live',
    subdomain: 'pr',
    icon: '📊',
  },
  {
    title: 'Acne AI Advisor',
    description: 'AI-powered skincare guidance and recommendations',
    status: 'coming-soon',
    icon: '🧴',
  },
  {
    title: 'Visa Interview Simulator',
    description: 'Practice visa interviews with AI-powered scenarios',
    status: 'coming-soon',
    icon: '✈️',
  },
  {
    title: 'Micro Tools Lab',
    description: 'Collection of experimental micro-utilities',
    status: 'coming-soon',
    icon: '🔬',
  },
  {
    title: 'Experimental AI Games',
    description: 'Playful AI-powered interactive experiences',
    status: 'coming-soon',
    icon: '🎮',
  },
];

export default function ToolGrid() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [comingSoonClicks, setComingSoonClicks] = useState<number[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleComingSoonClick = (index: number) => {
    const tool = tools[index];
    setSelectedTool(tool.title);

    // Easter egg logic: track rapid clicks on coming-soon tools
    const now = Date.now();
    setComingSoonClicks((prev) => {
      const recent = prev.filter((time) => now - time < 2000);
      const updated = [...recent, now];
      
      if (updated.length >= 3 && !showEasterEgg) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
      }
      
      return updated;
    });
  };

  return (
    <>
      {/* Easter Egg Message */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="glass rounded-xl p-6 border border-neon-green/50 animate-glow-pulse">
            <p className="text-neon-green font-semibold text-lg">
              You found a hidden node. The grid is expanding.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {tools.map((tool, index) => (
          <GridTile
            key={tool.title}
            title={tool.title}
            description={tool.description}
            status={tool.status}
            subdomain={tool.subdomain}
            icon={<span className="text-4xl">{tool.icon}</span>}
            onComingSoonClick={() => handleComingSoonClick(index)}
          />
        ))}
      </div>

      <ComingSoonModal
        isOpen={selectedTool !== null}
        onClose={() => setSelectedTool(null)}
        toolName={selectedTool || ''}
      />
    </>
  );
}
