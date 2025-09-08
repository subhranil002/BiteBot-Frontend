import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function HomeLayout({ children }) {
    return (
        <>
            <Navbar>{children}</Navbar>
            <Footer />
        </>
    );
}

export default HomeLayout;
