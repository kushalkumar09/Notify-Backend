import { Outlet} from "react-router";
import Header from "./Nav";

export default function Layout() {
    return (
      <main className="flex flex-col">        
        <Header />
            <br></br>            
        <Outlet/>
      </main>
    );
}