import { Outlet} from "react-router";
import Header from "./Nav";

export default function Layout() {
    return (
      <main className="flex flex-col min-h-screen bg-gray-100">
        <Header />

        {/* Add some vertical spacing between the header and the content */}

        <Outlet />
      </main>
    );
}