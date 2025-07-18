
const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-black relative overflow-hidden">
    {/* Animated Background Grid */}
    <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      ></div>
    </div>
    {/* Neon Border */}
    <div className="absolute inset-0 border-4 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)] pointer-events-none z-10"></div>
    {/* Main Content */}
    {children}
  </div>
);

export default SiteLayout;