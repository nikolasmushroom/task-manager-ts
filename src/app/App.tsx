import "./App.css";
import { Header } from "common/components";
import { Outlet } from "react-router-dom";
import { Preloader } from "common/components/Preloader/Preloader";
import { useInitializeApp } from "common/hooks/useApp";


export const App = () => {
  const {isInitialized} = useInitializeApp();
  return (
    <div>
      {!isInitialized ? <Preloader /> : <>
        <Header />
        <Outlet />
      </>}
    </div>

  );
};
