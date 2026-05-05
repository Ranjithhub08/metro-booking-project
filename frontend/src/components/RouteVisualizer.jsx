import { useEffect, useRef, useState } from "react";
import { CITIES } from "../data/metroData";

export default function RouteVisualizer({ cityId, path = [], interchanges = [] }) {
  const svgRef = useRef(null);
  const [trainPos, setTrainPos] = useState(0);
  const [animating, setAnimating] = useState(false);

  // FIXED: useEffect must come before any conditional return (Rules of Hooks)
  useEffect(() => {
    if (path.length < 2) return;
    setTrainPos(0);
    setAnimating(true);
    let frame;
    let start = null;
    const duration = Math.min(3000, path.length * 400);
    const animate = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setTrainPos(progress);
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setAnimating(false);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [path.join(",")]);

  const city = CITIES[cityId];
  if (!city || path.length < 2) return null;

  const stationMap = {};
  city.stations.forEach(s => { stationMap[s.id] = s; });
  const pathStations = path.map(id => stationMap[id]).filter(Boolean);

  // Calculate bounding box
  const xs = pathStations.map(s => s.x);
  const ys = pathStations.map(s => s.y);
  const minX = Math.min(...xs) - 60;
  const maxX = Math.max(...xs) + 60;
  const minY = Math.min(...ys) - 60;
  const maxY = Math.max(...ys) + 60;
  const vw = maxX - minX;
  const vh = maxY - minY;

  // Train position interpolation
  const getTrainXY = () => {
    if (pathStations.length < 2) return null;
    const totalSegments = pathStations.length - 1;
    const pos = trainPos * totalSegments;
    const segIdx = Math.min(Math.floor(pos), totalSegments - 1);
    const t = pos - segIdx;
    const a = pathStations[segIdx];
    const b = pathStations[segIdx + 1];
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  };

  const trainXY = getTrainXY();

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-slate-300 text-xs font-semibold tracking-wider uppercase">Route Visualization</span>
        <span className="ml-auto text-slate-500 text-xs">{path.length} stations</span>
      </div>
      <div className="overflow-x-auto p-4">
        <svg
          ref={svgRef}
          viewBox={`${minX} ${minY} ${vw} ${vh}`}
          className="w-full"
          style={{ minWidth: Math.max(vw, 400), height: Math.max(vh, 200), maxHeight: 300 }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect x={minX} y={minY} width={vw} height={vh} fill="url(#grid)" />

          {pathStations.slice(0, -1).map((s, i) => {
            const next = pathStations[i + 1];
            const lineColor = city.lines[s.line]?.color || "#6366f1";
            const isInterchange = interchanges.includes(next.id) || interchanges.includes(s.id);
            return (
              <line key={i} x1={s.x} y1={s.y} x2={next.x} y2={next.y}
                stroke={lineColor} strokeWidth={isInterchange ? 4 : 3}
                strokeLinecap="round" filter="url(#glow)" opacity={0.9} />
            );
          })}

          {pathStations.map((s, i) => {
            const lineColor = city.lines[s.line]?.color || "#6366f1";
            const isFirst = i === 0;
            const isLast = i === pathStations.length - 1;
            const isInterchange = interchanges.includes(s.id);
            const r = isFirst || isLast ? 10 : isInterchange ? 8 : 6;
            return (
              <g key={s.id}>
                {(isFirst || isLast) && (
                  <circle cx={s.x} cy={s.y} r={r + 6} fill={lineColor} opacity={0.2} />
                )}
                <circle cx={s.x} cy={s.y} r={r}
                  fill={isFirst || isLast ? lineColor : isInterchange ? "#f59e0b" : "#1e293b"}
                  stroke={lineColor} strokeWidth={isFirst || isLast ? 0 : 2.5}
                  filter={isFirst || isLast ? "url(#glow)" : undefined} />
                {isInterchange && <circle cx={s.x} cy={s.y} r={3} fill="#f59e0b" />}
                <text x={s.x} y={s.y - r - 6} textAnchor="middle"
                  fill={isFirst ? "#a78bfa" : isLast ? "#34d399" : isInterchange ? "#fbbf24" : "rgba(255,255,255,0.6)"}
                  fontSize={isFirst || isLast ? 11 : 9}
                  fontWeight={isFirst || isLast ? "bold" : "normal"}
                  fontFamily="system-ui, sans-serif">
                  {s.name.length > 14 ? s.name.slice(0, 13) + "…" : s.name}
                </text>
              </g>
            );
          })}

          {trainXY && (
            <g>
              <circle cx={trainXY.x} cy={trainXY.y} r={10} fill="#fff" opacity={0.15} />
              <circle cx={trainXY.x} cy={trainXY.y} r={7} fill="#fff" />
              <text x={trainXY.x} y={trainXY.y + 4} textAnchor="middle" fontSize="8" fill="#1e293b">🚇</text>
            </g>
          )}
        </svg>
      </div>

      <div className="px-4 py-3 border-t border-slate-800 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-3 h-3 rounded-full bg-violet-400" /> Source
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-3 h-3 rounded-full bg-emerald-400" /> Destination
        </div>
        {interchanges.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-3 h-3 rounded-full bg-amber-400" /> Interchange
          </div>
        )}
        {Object.entries(city.lines).map(([id, line]) => (
          <div key={id} className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-8 h-0.5 rounded" style={{ backgroundColor: line.color }} />
            {line.name}
          </div>
        ))}
      </div>
    </div>
  );
}
