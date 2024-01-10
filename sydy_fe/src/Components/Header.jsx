import { Link, NavLink } from "react-router-dom";
import Profile from "./Profile";
import { useSelector } from "react-redux";
function Header() {
  const userInfo = useSelector((state) => state.auth.user);
  return (
    <header className="bg-base-grey sticky top-0 z-50">
      <nav className="flex flex-row items-center gap-0">
        <div className="flex items-center justify-center basis-3/12">
          <Link to="" className="m-4">
            <img className="w-32" src="/assets/img/logo-primary.png" alt="" />
          </Link>
        </div>
        <ul className="flex flex-row basis-6/12 items-center justify-center gap-8 uppercase text-base-cream">
          <NavLink to={""}>Home</NavLink>
          <NavLink hidden to={"foods"}>
            Đồ ăn
          </NavLink>
          <NavLink to={"drinks"}>Drink</NavLink>
          <NavLink to={"about"}>About us</NavLink>
        </ul>
        {userInfo ? (
          <Profile />
        ) : (
          <div className="flex flex-row basis-3/12 items-center justify-center gap-1 uppercase text-base-cream">
            <NavLink to={"login"}>Login</NavLink>
            <p>/</p>
            <NavLink to={"register"}>Register</NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
