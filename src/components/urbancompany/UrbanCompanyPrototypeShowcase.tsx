import { useState, useEffect, useRef } from "react";

export default function UrbanCompanyPrototypeShowcase() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(400); // default fallback

  const url = "https://orchestrate-home-flow.lovable.app/";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    setContainerWidth(containerRef.current.getBoundingClientRect().width);

    return () => resizeObserver.disconnect();
  }, [isMounted]);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] bg-[#fafaf7] border-[3px] border-black rounded-2xl flex items-center justify-center font-mono text-sm">
        Loading showcase...
      </div>
    );
  }

  const isMobile = containerWidth < 640;
  
  // Mobile scaling parameters
  const mobileNaturalWidth = 390; // Standard modern mobile width
  const mobileNaturalHeight = 760; // Standard modern mobile height
  const scale = isMobile ? Math.min(1, containerWidth / mobileNaturalWidth) : 1;
  const scaledHeight = mobileNaturalHeight * scale;

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-4xl mx-auto flex flex-col items-center font-mono select-none"
    >
      {isMobile ? (
        /* ======================================================== */
        /* MOBILE VIEWPORT (SCALED FOR PERFECT NATIVE PROPORTIONS)  */
        /* ======================================================== */
        <div className="w-full flex flex-col items-center">
          
          {/* Simple Clean Neo-Brutalist Toolbar for Mobile */}
          <div className="w-full bg-[#fafaf7] border-[3px] border-black rounded-t-2xl px-3 py-2 flex items-center justify-between gap-2 shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] border border-black flex-shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider text-black truncate">Home Flow App</span>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Reload */}
              <button
                onClick={handleRefresh}
                title="Reload"
                className="text-gray-500 hover:text-black border border-black bg-white rounded p-1 flex items-center justify-center shadow-[1px_1px_0_0_#000]"
              >
                <svg
                  className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
              
              {/* Launch */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 border border-black bg-[#fbbf24] text-black font-extrabold text-[9px] uppercase tracking-wider rounded shadow-[1.5px_1.5px_0_0_#000] transition-all"
              >
                Live
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Scaled Frame Viewport */}
          <div 
            className="w-full overflow-hidden border-[3px] border-t-0 border-black rounded-b-2xl shadow-[4px_4px_0_0_#000] relative bg-[#0f172a]"
            style={{ height: `${scaledHeight}px` }}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-[#0f172a] flex flex-col items-center justify-center p-4 z-30">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 animate-spin"></div>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-white">Launching App</p>
                </div>
              </div>
            )}

            {/* Scaled Iframe Container */}
            <div 
              className="absolute top-0 left-1/2"
              style={{
                width: `${mobileNaturalWidth}px`,
                height: `${mobileNaturalHeight}px`,
                transform: `translate(-50%, 0) scale(${scale})`,
                transformOrigin: "top center",
              }}
            >
              <iframe
                key={iframeKey}
                src={url}
                title="Urban Company Interactive Flow (Mobile)"
                className="w-full h-full border-none select-text"
                onLoad={() => setIsLoading(false)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* DESKTOP VIEWPORT (PREMIUM BROWSER SHELL)                  */
        /* ======================================================== */
        <div className="w-full bg-[#0f172a] border-[3px] border-black rounded-2xl shadow-[8px_8px_0_0_#000] overflow-hidden">
          
          {/* Browser Header Bar */}
          <div className="w-full bg-[#fafaf7] border-b-[3px] border-black px-3 py-2.5 flex items-center justify-between gap-3">
            
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] border border-black" />
              <span className="w-3 h-3 rounded-full bg-[#fbbf24] border border-black" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e] border border-black" />
            </div>

            {/* Tab */}
            <div className="hidden sm:flex bg-[#0f172a] border-[2.5px] border-black border-b-0 rounded-t-xl px-4 py-1.5 -mb-[15px] text-[10px] font-black uppercase tracking-wider text-white items-center gap-1.5 max-w-[200px] z-10">
              <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="truncate">Home Flow App</span>
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-md bg-white border-2 border-black rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[10px] text-gray-500 font-bold shadow-[1.5px_1.5px_0_0_rgba(0,0,0,0.15)]">
              <div className="flex items-center gap-1 truncate mr-2 select-all">
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"/>
                </svg>
                <span className="truncate">orchestrate-home-flow.lovable.app</span>
              </div>
              
              <button
                onClick={handleRefresh}
                title="Reload App"
                className="text-gray-500 hover:text-black transition-colors p-0.5 flex items-center justify-center"
              >
                <svg
                  className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
            </div>

            {/* Action */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 border-[2.5px] border-black bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-extrabold text-[10px] uppercase tracking-wider rounded-lg shadow-[2px_2px_0_0_#000] hover:translate-y-[-0.5px] hover:shadow-[3px_3px_0_0_#000] active:translate-y-[0.5px] active:shadow-[1px_1px_0_0_#000] transition-all"
              >
                Open App
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>

          </div>

          {/* Desktop Iframe container */}
          <div className="relative w-full h-[820px] bg-[#0f172a]">
            {isLoading && (
              <div className="absolute inset-0 bg-[#0f172a] flex flex-col items-center justify-center p-6 z-30">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 animate-spin"></div>
                  </div>
                  <p className="text-sm font-black uppercase tracking-wider text-white">Launching Home Flow App</p>
                </div>
              </div>
            )}

            <iframe
              key={iframeKey}
              src={url}
              title="Urban Company Interactive Flow (Desktop)"
              className="w-full h-full border-none select-text"
              onLoad={() => setIsLoading(false)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      )}

      {/* User Information Hint */}
      <div className="w-full text-center mt-3 text-xs text-gray-500 font-bold">
        💡 Click or tap inside the browser frame to interact with the orchestration flow.
      </div>
    </div>
  );
}
