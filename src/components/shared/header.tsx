import { LogOut } from "lucide-react";
import Button from "./button";
import { useAuth } from "@/context/auth.context";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <div className="w-full flex justify-center">
      <nav className="flex fixed max-w-7xl w-full justify-between items-center p-4">
        <Link to="/lobby">
          <h1 className="text-2xl !text-white font-bold">Lobby</h1>
        </Link>

        <p className="text-white text-sm">{user?.username}</p>

        <div className="flex items-center gap-4">
          <Link to="/lobby/leaderboard">
            <p className="text-white text-sm">Leaderboard</p>
          </Link>
          <Button
            className="!bg-transparent sm:flex hidden !text-white hover:!text-primary"
            onClick={logout}
          >
            <LogOut className="size-5" />
            Logout
          </Button>

          <Button
            className="!bg-transparent sm:hidden flex !text-white hover:!text-primary"
            onClick={logout}
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
