import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export default function Layout() {
  return (
    <>
      <main className="px-5 min-h-dvh flex flex-col">
        <NavBar />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
