import Link from "next/link";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Header = ({ heading, toggleDrawer }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  const [cookie, removeCookie] = useCookies(["token"]);

  const logout = () => {
    removeCookie("token");
    window.location.href = "/";
  };
  return (
    <header className="p-[2rem] flex justify-between items-center ">
      <div className="flex items-center gap-4">
        <MenuIcon onClick={toggleDrawer} className="hideIcon" />
        <h1 className="text-[1.5rem] font-semibold">{heading}</h1>
      </div>

      <div className="relative">
        <div
          onClick={handleClick}
          className="flex items-center gap-4 rounded-full bg-white cursor-pointer"
        >
          <Avatar>A</Avatar>
          <p className="hidden md:block">Afghan Cell</p>
          <ArrowDropDownIcon />
        </div>

        {open && (
          <div className="absolute bg-white w-full top-[2.8rem] rounded-lg min-w-[10rem] right-0 z-[1000] cursor-pointer">
            <ul>
              <Link href="/profile">
                <a>
                  <li className="m-3 flex gap-4">
                    <AccountCircleIcon /> Edit Profile
                  </li>
                </a>
              </Link>
              <li className="m-3 flex gap-4" onClick={logout}>
                <LogoutIcon /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
