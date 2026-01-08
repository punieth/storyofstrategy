import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { cn } from '../lib/utils'; // Corrected import path

interface EntityNodeProps {
    data: {
        title: string;
        color: string;
        metrics: { label: string; value: number }[];
        isSource?: boolean;
        isTarget?: boolean;
    };
}

const formatCurrency = (value: number) => `₹${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const EntityNode = memo(({ data }: EntityNodeProps) => {
    return (
        <div className={cn(
            "relative min-w-[200px] overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition-all duration-300",
            data.isSource && "border-rose-400 ring-4 ring-rose-100",
            data.isTarget && "border-emerald-400 ring-4 ring-emerald-100",
            !data.isSource && !data.isTarget && "border-slate-200"
        )}>
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100" style={{ backgroundColor: `${data.color}10` }}>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: data.color }}>
                    {data.title}
                </p>
            </div>

            {/* Metrics Body */}
            <div className="p-4 space-y-3">
                {data.metrics.map(metric => (
                    <div key={metric.label} className="flex justify-between items-end">
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                            {metric.label.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                         <span className={cn(
                             "font-mono font-semibold",
                             metric.label.toLowerCase().includes('cash') ? "text-lg text-slate-900" : "text-sm text-slate-500"
                         )}>
                            {metric.label.toLowerCase().includes('fees') ? metric.value : formatCurrency(metric.value)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Connection Handles (Invisible but necessary for ReactFlow) */}
            <Handle type="target" position={Position.Left} className="!bg-transparent !border-none" />
            <Handle type="source" position={Position.Right} className="!bg-transparent !border-none" />
        </div>
    );
});

export default EntityNode;
