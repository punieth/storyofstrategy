import UrbanCompanyApp from "./page";
import "@components/urbancompany/globals.css";

const UrbanCompanyPrototypeShowcase = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="uc-shell uc-shell-desktop">
          <div className="uc-shell-inner">
            <div className="uc-theme w-full h-full rounded-3xl border border-border bg-background shadow-xl overflow-hidden" data-embedded="true">
              <UrbanCompanyApp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UrbanCompanyPrototypeShowcase;
