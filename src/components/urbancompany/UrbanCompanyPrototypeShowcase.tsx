import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import UrbanCompanyApp from "./page";
import "@components/urbancompany/globals.css";

const Overlay = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[999] flex flex-col bg-slate-950/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-[0_6px_16px_rgba(15,23,42,0.35)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          Interactive Prototype
        </div>
        <button
          className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-slate-900"
          onClick={onClose}
        >
          <span className="text-[10px]">Close</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 bg-white/10 font-bold transition group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white">
            ✕
          </span>
        </button>
      </div>
      <div className="relative flex-1 overflow-auto px-2 pb-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)]" />
        <div className="uc-shell mx-auto max-w-full uc-shell-overlay relative">
          <div className="uc-shell-inner">
            <div className="uc-theme w-full h-full rounded-3xl border border-border bg-background shadow-xl overflow-hidden" data-embedded="true">
              <UrbanCompanyApp />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const UrbanCompanyPrototypeShowcase = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex justify-center">
        <div className="uc-shell uc-shell-desktop">
          <div className="uc-shell-inner">
            <div className="uc-theme w-full h-full rounded-3xl border border-border bg-background shadow-xl overflow-hidden" data-embedded="true">
              <UrbanCompanyApp />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col items-center gap-4">
        <div className="w-full text-center">
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[4px_4px_0_0_#000] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
            onClick={() => setOpen(true)}
          >
            Launch Interactive Prototype
          </button>
          <p className="mt-2 text-xs text-gray-600">
            Opens a full-screen preview. Best experienced in portrait mode.
          </p>
        </div>
      </div>

      {open && <Overlay onClose={() => setOpen(false)} />}
    </>
  );
};

export default UrbanCompanyPrototypeShowcase;
