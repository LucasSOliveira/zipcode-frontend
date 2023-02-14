
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Outlet />
      <footer className=" my-2 flex justify-center w-full h-[5%]">
        <h3>Design by - Typed <span className="text-color-secondary">IO</span></h3>
      </footer>
    </>
  );
};

export default Main;
