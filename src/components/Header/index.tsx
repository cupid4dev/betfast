/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Navbar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import ConnectWalletButton from "../UI/ConnectWalletButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/utils/fetchData";
import { useProgram } from "@/context/ProgramContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { getBFEmail, updateBFEmail, updateBFUser } from "@/redux/slice";
import {
  ChevronDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { MdOutlineWorkHistory } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/profile/viewprofile",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    link: "/help",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    link: "#",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();

  const closeMenu = (isLastItem) => {
    setIsMenuOpen(false);
    if (isLastItem) {
      localStorage.setItem("betfast-email", "");
      localStorage.setItem("betfast-user", "");
      dispatch(updateBFEmail(""));
      dispatch(updateBFUser({}));
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 py-2 pr-2 pl-2 lg:ml-auto"
        >
          <GrUserManager className="h-5 w-5 text-white" />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform text-white ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-secondary_3 border-secondary_4">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          // eslint-disable-next-line react/jsx-key
          return (
            <Link href={link} key={label}>
              <MenuItem
                onClick={() => {
                  closeMenu(isLastItem);
                }}
                className={`flex items-center gap-2 rounded text-white ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}
export default function ComplexNavbar() {
  const dispatch = useDispatch();
  const program = useProgram().program;
  const wallet = useWallet();
  const bfEmail = useSelector(getBFEmail);

  React.useEffect(() => {
    if (!program || !wallet) {
      return;
    }
    fetchOrders(program, wallet, dispatch);
  }, [program, wallet]);

  return (
    <Navbar className="mx-auto p-2 max-w-none rounded-none lg:pl-6 fixed t-0 z-[100] w-screen bg-primary_light border-none">
      <div className="relative mx-auto flex items-center width-100">
        <Link href="/home" className="float-left">
          {" "}
          <img
            src="/logo.png" // Path to your logo image inside the public folder
            alt="Logo"
            width={100} // Set the width of the image
            height={50} // Set the height of the image
          />
        </Link>
        <div className="flex mr-auto cursor-pointer py-1.5 font-medium">
          <div className="float-left mx-2">
            <Link href="/home">
              <Button
                variant={"text"}
                className="header-button text-white hidden md:block"
              >
                Home
              </Button>
              <Button
                variant={"text"}
                className="header-button text-white md:hidden"
              >
                <IoHomeOutline className="h-5 w-5 m-2" />
              </Button>
            </Link>
          </div>

          {bfEmail && (
            <div className="float-left">
              <Link href="/mytrades">
                <Button
                  variant={"text"}
                  className="header-button text-white hidden md:block"
                >
                  My Trades
                </Button>
                <Button
                  variant={"text"}
                  className="header-button text-white md:hidden"
                >
                  <MdOutlineWorkHistory className="h-5 w-5 m-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {bfEmail ? (
          <div className="flex customized-wallet md:mr-4">
            <ConnectWalletButton />
            <ProfileMenu />
          </div>
        ) : (
          <div className="flex">
            <a href="https://betfast.com/register">
              <Button className="p-2 mx-1 bg-secondary_4 text-primary_4 border-2 border-secondary_4">
                Join
              </Button>
            </a>
            <Link href="/login" className="">
              <Button className="p-2 mx-1 bg-secondary_4 border-primary_4 border-2 text-primary_4 md:mr-4">
                Log In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Navbar>
  );
}
