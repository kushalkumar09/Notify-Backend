import { Outlet} from "react-router";
import Header from "./Nav";

export default function Layout() {
    return (
      <main>        
        <Header />
            <br></br>            
        <Outlet/>
      </main>
    );
}