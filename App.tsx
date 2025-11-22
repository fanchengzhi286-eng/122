import React, { useState, useMemo } from 'react';
import GlobeViz from './components/GlobeViz';
import Sidebar from './components/Sidebar';
import { GLOBAL_DATA } from './constants';
import { CountryData } from './types';
import { Activity, Info } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const totalGlobalGDP = useMemo(() => {
    // Just summing our dataset for the visualization total
    return GLOBAL_DATA.reduce((acc, curr) => acc + curr.gdp, 0);
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  });

  return (
    <div className="relative w-full h-screen bg-space-900 overflow-hidden">
      
      {/* 3D Globe Container */}
      <div className="absolute inset-0 z-0">
        <GlobeViz 
          data={GLOBAL_DATA} 
          onCountrySelect={(country) => {
            setSelectedCountry(country);
            setShowIntro(false);
          }} 
        />
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-10 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="pointer-events-auto max-w-[70%] md:max-w-xs">
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-1 drop-shadow-md">
              EcoSphere <span className="text-accent-cyan font-light">3D</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-sm hidden sm:block">
              Interactive visualization of global economic distribution. 
              Click on a data tower to analyze the economy with Gemini AI.
            </p>
            {/* Mobile simplified subtitle */}
            <p className="text-gray-400 text-xs sm:hidden">
              Tap a tower to analyze economy.
            </p>
          </div>

          {/* Global Stats Widget */}
          <div className="hidden md:block bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 pointer-events-auto">
            <div className="flex items-center space-x-3 mb-2">
              <Activity className="text-green-400" size={18} />
              <span className="text-gray-300 text-xs uppercase font-semibold">Tracked GDP Volume</span>
            </div>
            <div className="text-3xl font-mono text-white font-bold">
              {formatter.format(totalGlobalGDP * 1_000_000_000)}
            </div>
          </div>
        </div>
      </div>

      {/* Intro Tooltip (disappears on interaction) */}
      {showIntro && !selectedCountry && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none animate-pulse w-full text-center px-4">
          <div className="inline-flex bg-black/60 backdrop-blur text-white px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/20 items-center gap-2 justify-center">
             <Info size={16} />
             <span className="text-xs md:text-sm">Click a country tower to explore</span>
          </div>
        </div>
      )}

      {/* Sidebar Detail View */}
      <div className={`absolute inset-y-0 right-0 z-20 transition-transform duration-500 transform ${selectedCountry ? 'translate-x-0' : 'translate-x-full'} w-full sm:w-auto`}>
        <Sidebar 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      </div>

      {/* Mobile Tip */}
      <div className="absolute bottom-8 w-full text-center pointer-events-none md:hidden">
        <p className="text-white/50 text-[10px] uppercase tracking-widest">Pinch to zoom • Drag to rotate</p>
      </div>
    </div>
  );
};

export default App;