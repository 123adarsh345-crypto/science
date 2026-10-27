import React, { useState, useEffect } from 'react';
import { Compass, Orbit, Sparkles, Calendar, Radio, Globe, RefreshCw } from 'lucide-react';

export const TodayInSpace: React.FC<{ onAskAi?: (topic: string) => void }> = ({ onAskAi }) => {
  // Real-time simulated orbit coordinates for International Space Station (ISS)
  const [issPos, setIssPos] = useState({
    lat: 28.5,
    lng: -80.6,
    alt: 422,
    speed: 27580,
  });

  const [currentFactIdx, setCurrentFactIdx] = useState(0);

  const cosmicFacts = [
    'Neutron stars can spin at a rate of 600 rotations per second. One sugar-cube-sized chunk would weigh about 1 billion tons on Earth!',
    'There is a giant reservoir of water floating in deep space around a quasar, containing 140 trillion times more water than all Earth’s oceans combined.',
    'Venus is the only planet in the solar system to spin clockwise on its axis (retrograde rotation).',
    'One day on Pluto is about 6.4 Earth days long, and its moon Charon never rises or sets—it hangs permanently in the same spot in Pluto’s sky.',
    'The footprints left on the Moon by Apollo astronauts will stay there for at least 100 million years because the Moon has no atmosphere or wind erosion.',
    'If two pieces of the same type of metal touch in space, they will permanently bond together in a process called cold welding.'
  ];

  const upcomingEvents = [
    {
      title: 'Perseid Meteor Shower Peak',
      date: 'August 12-13',
      rate: 'Up to 100 meteors/hour',
      desc: 'Earth plows through the debris trail of Comet Swift-Tuttle, producing swift, bright fireballs.',
    },
    {
      title: 'Jupiter at Opposition',
      date: 'Late Autumn',
      rate: 'Magnitude -2.9',
      desc: 'Jupiter makes its closest approach to Earth, with its Great Red Spot and 4 Galilean moons visible in binoculars.',
    },
    {
      title: 'Geminids Meteor Shower',
      date: 'December 13-14',
      rate: '120 meteors/hour',
      desc: 'The king of meteor showers, originating from rocky asteroid 3200 Phaethon rather than an icy comet.',
    },
  ];

  // Tick the ISS coordinates smoothly along its 51.6° inclination orbit
  useEffect(() => {
    const interval = setInterval(() => {
      setIssPos(prev => {
        let nextLng = prev.lng + 0.8;
        if (nextLng > 180) nextLng = -180;
        const nextLat = Math.sin(nextLng * 0.05) * 51.6;
        return {
          ...prev,
          lng: Math.round(nextLng * 10) / 10,
          lat: Math.round(nextLat * 10) / 10,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Hero Strip: Cosmic Fact of the Day */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-purple-950/50 to-gray-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60">
                Astronomy Fact of the Day
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-white">
              "{cosmicFacts[currentFactIdx]}"
            </h3>
            <p className="text-xs text-gray-400">
              Verified astrophysical insight from the UBT (Universal E-books Technology) knowledge archives.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
            <button
              onClick={() => setCurrentFactIdx(i => (i + 1) % cosmicFacts.length)}
              className="px-4 py-2.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 border border-gray-700 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Cosmic Fact</span>
            </button>
            {onAskAi && (
              <button
                onClick={() => onAskAi(cosmicFacts[currentFactIdx])}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-950 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explain in Deep Dive</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Live ISS Telemetry & Upcoming Celestial Phenomena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: International Space Station Live Telemetry (6 cols) */}
        <div className="lg:col-span-6 bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <h4 className="text-base font-bold text-white font-display">
                International Space Station (ISS) Tracker
              </h4>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
              LIVE TELEMETRY
            </span>
          </div>

          {/* Telemetry Coordinates Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">Current Latitude</span>
              <span className="text-cyan-300 font-mono font-bold text-base">
                {issPos.lat > 0 ? `${issPos.lat}° N` : `${Math.abs(issPos.lat)}° S`}
              </span>
            </div>

            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">Current Longitude</span>
              <span className="text-cyan-300 font-mono font-bold text-base">
                {issPos.lng > 0 ? `${issPos.lng}° E` : `${Math.abs(issPos.lng)}° W`}
              </span>
            </div>

            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">Orbital Altitude</span>
              <span className="text-amber-300 font-mono font-bold text-base">
                {issPos.alt} km (~262 miles)
              </span>
            </div>

            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-gray-400 block text-[10px] uppercase font-mono">Orbital Velocity</span>
              <span className="text-emerald-300 font-mono font-bold text-base">
                {issPos.speed.toLocaleString()} km/h (7.66 km/s)
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            The ISS circles the globe approximately every 90 to 92 minutes at an orbital inclination of 51.6 degrees. Astronauts onboard experience 16 sunrises and sunsets every single day!
          </p>
        </div>

        {/* Right: Upcoming Skywatching Calendar (6 cols) */}
        <div className="lg:col-span-6 bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h4 className="text-base font-bold text-white font-display">
              Upcoming Celestial Phenomena
            </h4>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((evt, idx) => (
              <div key={idx} className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{evt.title}</span>
                  <span className="text-cyan-300 font-mono text-[11px] font-semibold">{evt.date}</span>
                </div>
                <p className="text-xs text-gray-300 leading-normal">{evt.desc}</p>
                <div className="text-[10px] font-mono text-amber-400 pt-0.5">Peak Zenith: {evt.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
