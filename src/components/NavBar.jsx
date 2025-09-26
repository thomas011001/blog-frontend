import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DropDown, {
  DropDownButton,
  DropDownLink,
  DropDownMenu,
} from "./DropDown";
import { useEffect, useRef, useState } from "react";
import Avatar, { AvatarImg } from "./Avatar";
import confirmOrder from "./confirmOrder";

function NavBar() {
  const { user, loading, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    confirmOrder(logout, "Are You Sure To Logout?");
  };

  return (
    <nav
      ref={dropdownRef}
      className="bg-card text-foreground max-w-200 w-full p-5 mx-auto gap-10 flex justify-between items-center shadow-2xl"
    >
      <h1>
        <Link
          className="text-primary text-3xl font-serif hover:underline"
          to={"/"}
        >
          Online Blog
        </Link>
      </h1>
      {!user && !loading ? (
        <div className="gap-2 flex">
          <Link to="/signup">
            <Button>Join Us</Button>
          </Link>
        </div>
      ) : (
        <DropDown>
          <DropDownButton handle={() => setOpenMenu(!openMenu)}>
            <Avatar>
              <AvatarImg
                src={user?.avatarUrl}
                width={40}
                className="rounded-full aspect-square"
              />
            </Avatar>
          </DropDownButton>
          <DropDownMenu state={openMenu}>
            <DropDownLink
              onClick={() => setOpenMenu(false)}
              className="flex justify-between hover:bg-transparent"
            >
              <p className="font-serif">@{user?.username}</p>
              <Button
                onClick={() => setOpenMenu(false)}
                className="!size-6 text-center flex justify-center"
              >
                X
              </Button>
            </DropDownLink>
            <hr />
            <DropDownLink onClick={() => setOpenMenu(false)}>
              <Link to="/" className="block">
                Home
              </Link>
            </DropDownLink>
            <hr />
            {user?.isAuthor ? (
              <>
                <DropDownLink onClick={() => setOpenMenu(false)}>
                  <Link to={`uesrs/${user.id}`} className="block">
                    Profile
                  </Link>
                </DropDownLink>
                <hr />
                <DropDownLink onClick={() => setOpenMenu(false)}>
                  <Link to="/new" className="block">
                    Craete New Post
                  </Link>
                </DropDownLink>
                <hr />
              </>
            ) : null}

            <DropDownLink onClick={() => setOpenMenu(false)}>
              <Link to="/settings" className="block">
                Settings
              </Link>
            </DropDownLink>
            <hr />
            <DropDownLink
              onClick={() => setOpenMenu(false)}
              className="hover:bg-transparent w-1/1 flex justify-center"
            >
              <Button outline className="!h-10" onClick={logoutHandler}>
                Logout
              </Button>
            </DropDownLink>
          </DropDownMenu>
        </DropDown>
      )}
    </nav>
  );
}

export default NavBar;
