import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import Footer from "@/component/footer.jsx";

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
