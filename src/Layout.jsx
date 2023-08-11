import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <main className="py-10">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
