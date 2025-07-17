import { Outlet } from "react-router-dom";
import Header from "../shared/header";

const LobbyLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default LobbyLayout;