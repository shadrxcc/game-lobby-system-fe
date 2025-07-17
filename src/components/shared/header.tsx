import { LogOut } from "lucide-react";
import Button from "./button";

const Header = () => {
  return (
    <div className="w-full flex justify-center">
      <nav className="flex fixed max-w-7xl w-full justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Lobby</h1>
        <div className="flex items-center gap-4">
          <Button className="!bg-transparent !text-white hover:!text-primary">
            <LogOut className="size-5" />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
