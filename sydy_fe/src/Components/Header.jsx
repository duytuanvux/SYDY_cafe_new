import { Link, NavLink } from "react-router-dom";
import Profile from "./Profile";
import { useSelector } from "react-redux";
function Header() {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <header className="bg-base-grey sticky top-0 z-50">
      <nav className="flex flex-row items-center gap-0">
        <div className="flex items-center justify-center basis-3/12">
          <Link to="" className="m-4">
            <img className="w-32" src="/assets/img/logo-primary.png" alt="" />
          </Link>
        </div>
        <ul className="flex flex-row basis-6/12 items-center justify-center gap-8 uppercase text-base-cream">
          <NavLink to={""}>Trang chủ</NavLink>
          <NavLink hidden to={"foods"}>Đồ ăn</NavLink>
          <NavLink to={"drinks"}>Thức uống</NavLink>
          <NavLink to={"news"}>Tin tức</NavLink>
        </ul>
        {userInfo ? <Profile /> : <div>
        <Link to="/login">
          <button>
            Login
          </button>
        </Link>
        <Link to="/register">
          <button>
            Register
          </button>
        </Link>
      </div>}
      </nav>
    </header>
  )
}

export default Header;
