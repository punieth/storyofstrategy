import React from 'react';
import { BaseEdge, EdgeLabelRenderer, type EdgeProps, getSmoothStepPath } from 'reactflow';
import { cn } from '../lib/utils';

const TransactionEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isPositive = data?.tone === 'positive';
  const isNegative = data?.tone === 'negative';
  const color = isPositive ? '#10b981' : isNegative ? '#ef4444' : '#64748b';

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, stroke: color, strokeWidth: 2, opacity: 0.3 }} />
      
      {/* Moving "Money Packet" Orb */}
      <circle r="6" fill={color} className="animate-flow-orb">
        <animateMotion dur="1.5s" repeatCount="indefinite" path={edgePath} />
      </circle>

      {/* Floating Label (Amount) */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className={cn(
              "flex flex-col items-center rounded-lg px-3 py-1.5 shadow-lg border backdrop-blur-sm",
              isPositive ? "bg-emerald-50/90 border-emerald-200 text-emerald-700" : 
              isNegative ? "bg-rose-50/90 border-rose-200 text-rose-700" : 
              "bg-slate-50/90 border-slate-200 text-slate-600"
          )}>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-0.5">{data?.label}</div>
            <div className="text-sm font-bold font-mono">
                {data?.amount}
            </div>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default TransactionEdge;
