/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Spinner,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import ConnectWalletButton from "../UI/ConnectWalletButton";
import API_URL from "@/constants/apiUrl";
import { getEventCategories, setEventCategories } from "@/redux/slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
    link: "",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link href={link} key={key}>
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
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
  let fetchTimer: any = null;
  const eventCategories = useSelector(getEventCategories);

  const fetchEventCategories = () => {
    if (fetchTimer) {
      clearInterval(fetchTimer);
    }
    fetchTimer = setInterval(() => {
      axios
        .get(API_URL)
        .then((data) => {
          dispatch(setEventCategories(data.data.eventCategories));
        })
        .catch(() => {});
    }, 5000);
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960, // && setIsNavOpen(false),
    );
    fetchEventCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return eventCategories.length == 0 ? (
    <div className="fixed w-full h-full t-0 l-0 backdrop-blur-xl bg-white/30 place-content-center grid">
      <Spinner className="h-16 w-16" />
    </div>
  ) : (
    <Navbar className="mx-auto p-2 max-w-none rounded-none lg:pl-6 fixed t-0">
      <div className="relative mx-auto flex items-center width-100 text-blue-gray-900">
        <Link href="/home" className="float-left">
          {" "}
          <img
            src="/logo.png" // Path to your logo image inside the public folder
            alt="Logo"
            width={50} // Set the width of the image
            height={50} // Set the height of the image
          />
        </Link>
        <div className="flex mr-auto cursor-pointer py-1.5 font-medium">
          <Link href="/home">
            <Typography
              variant="h4"
              className="mr-4"
              onClick={() => {
                // setIsHome(1);
              }}
            >
              <span className="inline-block align-middle">BETFAST</span>
            </Typography>
          </Link>

          <div className="float-left mr-4">
            <Link href="/home">
              <Button
                variant={"gradient"}
                onClick={() => {
                  // setIsHome(1);
                }}
              >
                Home
              </Button>
            </Link>
          </div>

          <div className="float-left">
            <Link href="/mytrades">
              <Button
                variant={"text"}
                onClick={() => {
                  // setIsHome(0);
                }}
              >
                My Trades
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex customized-wallet">
          <ConnectWalletButton />
          <ProfileMenu />
        </div>
      </div>
    </Navbar>
  );
}
