import { Link } from "react-router-dom";
import Button from "./button";
import { useAuth } from "@/context/auth.context";

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <div className="w-full flex relative justify-center">
      <div className="absolute hidden sm:block top-10 right-10 text-6xl animate-spin">
        🎮
      </div>

      <div className="absolute bottom-20 left-10 text-4xl animate-bounce">
        🎲
      </div>

      <div className="flex items-center justify-between w-full bg-black border-4 border-cyan-400 p-6 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
        <div className="flex items-center space-x-6">
          <Link to="/lobby">
            <div className="w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-cyan-400 border-4 border-white flex items-center justify-center text-black font-black text-xl sm:text-2xl shadow-[0_0_20px_rgba(236,72,153,0.6)]">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          </Link>
          <div>
            <h1 className="text-base sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 tracking-wider">
              PLAYER: {user?.username?.toUpperCase()}
            </h1>
            <p className="text-yellow-400 font-mono text-lg animate-pulse">
              {">>> STAY READY <<<"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-x-4">
          <Link
            to="/lobby/leaderboard"
            className="text-cyan-400 font-mono text-lg"
          >
            <div className="flex">
              <div className="text-cyan-400 hidden sm:block font-mono text-lg">
                Leaderboard
              </div>
              <div className="text-cyan-400 font-mono text-lg">🏆</div>
            </div>
          </Link>
          <Button
            variant="ghost"
            onClick={logout}
            className="sm:hidden !p-0 !border-none !bg-none"
          >
            🚪
          </Button>
          <Button className="hidden sm:flex" onClick={logout}>
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
