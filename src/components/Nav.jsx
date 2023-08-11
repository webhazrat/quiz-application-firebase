import logo from "../assets/logo.png";
import Account from "./Account";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div className="bg-white py-3 border-b border-gray-200">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between">
            <ul className="flex items-center gap-2">
              <li>
                <Link to="/">
                  <img src={logo} alt="logo" className="h-9 w-auto" />
                </Link>
              </li>
            </ul>
            <Account />
          </nav>
        </div>
      </div>
    </>
  );
}
