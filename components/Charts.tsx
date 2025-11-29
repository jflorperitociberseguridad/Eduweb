import React from 'react';

export const SimpleLineChart = ({ data, color = "#4f46e5" }: { data: any[], color?: string }) => {
  const height = 200;
  const width = 600;
  const padding = 20;
  const maxVal = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - (d.value / maxVal) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1={padding} y1={padding + i * ((height - 2*padding)/4)} x2={width-padding} y2={padding + i * ((height - 2*padding)/4)} stroke="#e5e7eb" strokeWidth="1" />
            ))}
            <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points={`${padding},${height-padding} ${points} ${width-padding},${height-padding}`} fill={color} fillOpacity="0.1" />
            {data.map((d, i) => {
                const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
                const y = height - (d.value / maxVal) * (height - padding * 2) - padding;
                return (
                    <g key={i} className="group">
                        <circle cx={x} cy={y} r="4" fill="white" stroke={color} strokeWidth="2" />
                        <rect x={x - 20} y={y - 30} width="40" height="20" rx="4" fill="#1f2937" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        <text x={x} y={y - 16} textAnchor="middle" fill="white" fontSize="10" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{d.value}</text>
                    </g>
                );
            })}
            {data.map((d, i) => {
                const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
                return <text key={i} x={x} y={height} textAnchor="middle" fill="#9ca3af" fontSize="10">{d.label}</text>
            })}
        </svg>
    </div>
  );
};

export const SimpleBarChart = ({ data, color = "#3b82f6" }: { data: any[], color?: string }) => {
    const height = 200;
    const width = 600;
    const padding = 20;
    const maxVal = Math.max(...data.map(d => d.value)) * 1.1;
    const barWidth = (width - padding * 2) / data.length - 20;
   
    return (
      <div className="w-full overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
             {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                 const y = height - padding - (t * (height - 2*padding));
                 return <line key={i} x1={padding} y1={y} x2={width-padding} y2={y} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4" />
             })}
                
             {data.map((d, i) => {
                 const x = padding + i * ((width - padding * 2) / data.length) + 10;
                 const barHeight = (d.value / maxVal) * (height - 2 * padding);
                 const y = height - barHeight - padding;
                 return (
                     <g key={i} className="group">
                         <rect x={x} y={y} width={barWidth} height={barHeight} rx="6" fill={color} className="transition-all duration-500 hover:opacity-80" />
                         <text x={x + barWidth/2} y={y - 8} textAnchor="middle" fill="#4b5563" fontSize="12" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity">{d.value}</text>
                         <text x={x + barWidth/2} y={height} textAnchor="middle" fill="#9ca3af" fontSize="11" fontWeight="500">{d.label}</text>
                     </g>
                 );
             })}
          </svg>
      </div>
    );
  };

export const SkillRadar = ({ data }: { data: any[] }) => {
  const size = 220;
  const center = size / 2;
  const radius = size / 2 - 40;
  const categories = data.map(d => d.title.split(' ')[0]); 
  const values = data.map(d => d.progress / 100);
   
  const points = values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
    const x = center + radius * v * Math.cos(angle);
    const y = center + radius * v * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative flex justify-center items-center py-4">
        <svg width={size} height={size} className="overflow-visible">
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            <circle cx={center} cy={center} r={radius * 0.66} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            <circle cx={center} cy={center} r={radius * 0.33} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            
            {categories.map((_, i) => {
               const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
               const x = center + radius * Math.cos(angle);
               const y = center + radius * Math.sin(angle);
               return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            })}

            <polygon points={points} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
            {values.map((v, i) => {
                const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
                const x = center + radius * v * Math.cos(angle);
                const y = center + radius * v * Math.sin(angle);
                return <circle key={i} cx={x} cy={y} r="4" fill="#6366f1" stroke="white" strokeWidth="2" />
            })}
            
            {categories.map((cat, i) => {
               const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
               const x = center + (radius + 25) * Math.cos(angle);
               const y = center + (radius + 25) * Math.sin(angle);
               return (
                   <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[11px] fill-slate-600 font-bold uppercase tracking-wider">
                       {cat}
                   </text>
               )
            })}
        </svg>
    </div>
  );
};