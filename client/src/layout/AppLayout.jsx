import { Outlet } from "react-router-dom";
import Navbar from "@/pages/component/navbar";
import Footer from "@/pages/component/footer";

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
