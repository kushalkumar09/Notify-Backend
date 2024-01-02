import { Outlet} from "react-router";
import Header from "./Nav";
import Footer from "./Footer";

export default function Layout() {
    return (
      <main className="flex flex-col min-h-screen bg-gray-100">
        <Header />

        {/* Add some vertical spacing between the header and the content */}

        <Outlet />
        <div className="mt-4"></div>
        <Footer/>
      </main>
    );
}