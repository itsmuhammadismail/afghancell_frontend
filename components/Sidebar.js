import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddCardIcon from "@mui/icons-material/AddCard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRef, useState } from "react";

const MyDrawer = () => {
  const rechargeRef = useRef();

  const handleClick = () => {
    if (rechargeRef.current.style.height == "auto") {
      rechargeRef.current.style.height = "0px";
    } else {
      rechargeRef.current.style.height = "auto";
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Link href="/">
          <a>
            <Image
              src="/logos/afghancell.svg"
              alt=""
              width={100}
              height={150}
            />
          </a>
        </Link>
      </div>
      <ul>
        <Link href="/">
          <a>
            <li className="p-[1rem] flex items-center gap-[1rem] hover:bg-[#377DFF] hover:text-white">
              <DashboardIcon /> Dashboard
            </li>
          </a>
        </Link>
        <li
          onClick={handleClick}
          className="p-[1rem] flex items-center justify-between gap-[1rem] hover:bg-[#377DFF] cursor-pointer hover:text-white"
        >
          <div className="flex items-center gap-[1rem]">
            <AddCardIcon /> Recharge Manager
          </div>
          <ArrowDropDownIcon />
        </li>

        <ul className="trans h-0 overflow-hidden" ref={rechargeRef}>
          <Link href="/recharge">
            <a>
              <li className="p-[1rem] pl-[3rem] flex items-center gap-[1rem] hover:bg-[#377DFF] hover:text-white">
                <AddCardIcon /> Recharge
              </li>
            </a>
          </Link>
          <Link href="/recharge-history">
            <a>
              <li className="p-[1rem] pl-[3rem] flex items-center gap-[1rem] hover:bg-[#377DFF] hover:text-white">
                <AssessmentIcon /> Recharge History
              </li>
            </a>
          </Link>
        </ul>

        <Link href="/customers">
          <a>
            <li className="p-[1rem] flex items-center gap-[1rem] hover:bg-[#377DFF] hover:text-white">
              <GroupIcon /> Customers
            </li>
          </a>
        </Link>
        <Link href="/topup-report">
          <a>
            <li className="p-[1rem] flex items-center gap-[1rem] hover:bg-[#377DFF] hover:text-white">
              <AssessmentIcon /> Topup Report
            </li>
          </a>
        </Link>
        <Link href="/order">
          <a>
            <li className="p-[1rem] flex items-center gap-[1rem] hover:bg-[#377DFF] hover:text-white">
              <ShoppingCartIcon /> Orders
            </li>
          </a>
        </Link>
      </ul>
    </div>
  );
};

const Sidebar = (props) => {
  const { window } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { md: 280 }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        <MyDrawer />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
        open
      >
        <MyDrawer />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
