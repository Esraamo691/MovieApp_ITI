import Navbar from './Navbar/Navbar'
import Footer from "./Pages/Footer/Footer"; 
import { Outlet } from 'react-router-dom'

<<<<<<< HEAD
export default function Layout() {
  return <>
  <Navbar/>
  <Outlet/>
  <Footer/>
  </>
}
=======
// export default function Layout() {
//   return <>
//   <Navbar/>
//   <Outlet/>
//   </>
// }

const Layout = () => {
  return (
    <div 
      className="layout" 
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
  
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
>>>>>>> origin/eman
