import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DropDown, {
  DropDownButton,
  DropDownLink,
  DropDownMenu,
} from "./DropDown";
import { useState } from "react";
import Avatar, { AvatarImg } from "./Avatar";

function NavBar() {
  const { user, loading } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-card text-foreground max-w-200 p-5 mx-auto gap-10 flex justify-between items-center shadow-2xl">
      <h1 className="text-primary text-3xl font-serif">Explore</h1>
      <div className="gap-3 hidden sm:flex">
        <p className="text-muted-foreground cursor-pointer hover:underline">
          <Link to="/posts">Posts</Link>
        </p>
        <p className="text-muted-foreground cursor-pointer hover:underline">
          <Link to="/authors">Authors</Link>
        </p>
        <p className="text-muted-foreground">|</p>
        <p className="text-muted-foreground cursor-pointer hover:underline">
          <Link to="/about">About</Link>
        </p>
        <p className="text-muted-foreground cursor-pointer hover:underline">
          <Link to="/contact">Contact</Link>
        </p>
      </div>
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
            <DropDownLink className="flex justify-between hover:bg-transparent">
              <p className="font-serif">@{user?.username}</p>
              <Button
                onClick={() => setOpenMenu(false)}
                className="!size-6 text-center flex justify-center"
              >
                X
              </Button>
            </DropDownLink>
            <hr />
            {user?.isAuthor ? (
              <>
                <DropDownLink>
                  <Link to="/me/posts" className="block">
                    My posts
                  </Link>
                </DropDownLink>
                <hr />
                <DropDownLink>
                  <Link to="/new" className="block">
                    Craete New Post
                  </Link>
                </DropDownLink>
                <hr />
              </>
            ) : null}

            <DropDownLink className="sm:hidden">
              <Link to="/posts" className="block">
                Posts
              </Link>
            </DropDownLink>
            <hr className="sm:hidden" />
            <DropDownLink className="sm:hidden">
              <Link to="/authors" className="block">
                Authors
              </Link>
            </DropDownLink>
            <hr className="sm:hidden" />
            <DropDownLink className="sm:hidden">
              <Link to="/about" className="block">
                About
              </Link>
            </DropDownLink>
            <hr className="sm:hidden" />
            <DropDownLink className="sm:hidden">
              <Link to="/contact" className="block">
                Contact
              </Link>
            </DropDownLink>
            <hr className="sm:hidden" />
            <DropDownLink>
              <Link to="/me/posts" className="block">
                Settings
              </Link>
            </DropDownLink>
            <hr />
            <DropDownLink className="hover:bg-transparent w-1/1 flex justify-center">
              <Button
                outline
                className="!h-10"
                onClick={() => navigate("/logout")}
              >
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
