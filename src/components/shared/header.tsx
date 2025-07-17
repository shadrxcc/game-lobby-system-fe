import { LogOut, Trophy } from "lucide-react";
import Button from "./button";
import { useAuth } from "@/context/auth.context";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <div className="w-full flex justify-center">
      <nav className="flex fixed max-w-7xl w-full justify-between items-center p-4">
        <Link to="/lobby">
          <img src="/avatar.png" alt="avatar" className="size-8 rounded-full" />
        </Link>

        <div className="sm:flex hidden items-center gap-2">
          <p className="text-white text-center text-xs">{user?.username}</p>
        </div>
        <div className="sm:flex hidden items-center gap-4">
          <Link to="/lobby/leaderboard" className="flex items-center gap-1">
            <Trophy className="size-5 text-white" />
            <p className="text-white text-xs">Leaderboard</p>
          </Link>
          <Button
            className="!bg-transparent !text-white hover:!text-primary"
            onClick={logout}
          >
            <LogOut className="size-5" />
            Logout
          </Button>
        </div>

        <div className="flex sm:hidden items-center gap-3">
          <Link
            to="/lobby/leaderboard"
            className="flex items-center"
            title="Leaderboard"
          >
            <Trophy className="size-6 text-white" />
          </Link>
          <Button
            className="!bg-transparent flex !text-white hover:!text-primary p-2"
            onClick={logout}
            title="Logout"
          >
            <LogOut className="size-6" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
