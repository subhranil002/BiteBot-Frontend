// Finalized

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HomeLayout({ children }) {
  return (
    <>
      {/* Passing children to render the main content of the page */}
      <Navbar>{children}</Navbar>

      {/* Footer displayed at the bottom of the layout */}
      <Footer />
    </>
  );
}
