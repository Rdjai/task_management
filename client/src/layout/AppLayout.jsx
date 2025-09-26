import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>

    );
};

export default AppLayout;
