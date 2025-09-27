import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "@/component/footer";

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>

    );
};

export default AppLayout;
