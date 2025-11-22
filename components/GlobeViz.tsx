import React, { useEffect, useRef, useState, useMemo } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { CountryData } from '../types';

interface GlobeVizProps {
  data: CountryData[];
  onCountrySelect: (country: CountryData) => void;
}

const GlobeViz: React.FC<GlobeVizProps> = ({ data, onCountrySelect }) => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [hovered, setHovered] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate initialization
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    }
  }, []);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const maxGdp = Math.max(...data.map(d => d.gdp));
    
    return data.map(d => {
      // Simple GDP-based logic: Higher GDP = Higher Altitude
      const normalizedGdp = d.gdp / maxGdp;
      
      // If the country has a predefined color, use it, otherwise interpolate
      // For this viz, let's prioritize the predefined constant color for clarity,
      // but we could also calculate it based on normalizedGdp.
      const finalColor = d.color || '#3B82F6'; 

      return {
        ...d,
        // Normalize altitude: max height 0.5, min height 0.1
        altitude: normalizedGdp * 0.5 + 0.05,
        color: finalColor
      };
    });
  }, [data]);

  const handlePointClick = (point: object) => {
    const country = point as CountryData;
    onCountrySelect(country);
    
    // Focus on the country
    if (globeEl.current) {
      globeEl.current.pointOfView({
        lat: country.lat,
        lng: country.lng,
        altitude: 1.5
      }, 1500);
      globeEl.current.controls().autoRotate = false;
    }
  };

  return (
    <div className="cursor-move relative">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Points/Towers
        pointsData={processedData}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d: any) => d.id === hovered ? '#ffffff' : d.color}
        pointAltitude="altitude"
        pointRadius={(d: any) => d.id === hovered ? 0.6 : 0.4}
        pointsMerge={true}
        pointResolution={32}
        onPointClick={handlePointClick}
        onPointHover={(point: any) => {
            setHovered(point ? point.id : null);
            document.body.style.cursor = point ? 'pointer' : 'default';
        }}

        // Atmosphere
        atmosphereColor="#3a228a"
        atmosphereAltitude={0.15}

        // Labels
        labelsData={processedData}
        labelLat="lat"
        labelLng="lng"
        labelText="id"
        labelSize={0.5}
        labelDotRadius={0.3}
        labelColor={() => 'rgba(255, 255, 255, 0.75)'}
        labelResolution={2}
        labelAltitude={(d: any) => d.altitude + 0.05}
      />
      
      {/* Simple Legend */}
      <div className="absolute bottom-8 left-8 pointer-events-none select-none bg-black/50 p-4 rounded-lg backdrop-blur-sm border border-white/10">
        <div className="text-white text-xs font-bold mb-2 uppercase tracking-wider">GDP Visualization</div>
        <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-[10px] text-gray-300">Tower Height = GDP Scale</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
                <span className="text-[10px] text-gray-300">Region Color Coded</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeViz;