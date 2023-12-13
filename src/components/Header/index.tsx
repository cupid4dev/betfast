/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Navbar, Typography, Button, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import ConnectWalletButton from "../UI/ConnectWalletButton";
import { getEventCategories } from "@/redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventCategories, fetchOrders } from "@/utils/fetchData";
import { useProgram } from "@/context/ProgramContext";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ComplexNavbar() {
  const dispatch = useDispatch();
  const program = useProgram().program;
  const wallet = useWallet();
  const eventCategories = useSelector(getEventCategories);
  // const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    // setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    fetchEventCategories(dispatch);
  }, []);

  React.useEffect(() => {
    if (!program || !wallet) {
      return;
    }
    fetchOrders(program, wallet, dispatch);
  }, [program, wallet]);

  return eventCategories.length == 0 ? (
    <div className="fixed w-full h-full t-0 l-0 backdrop-blur-xl bg-secondary_back place-content-center grid z-[500]">
      <Spinner className="h-16 w-16 text-gray-900/50" color="teal" />
    </div>
  ) : (
    <Navbar className="mx-auto p-2 max-w-none rounded-none lg:pl-6 fixed t-0 z-[100] w-screen bg-primary_light border-none">
      <div className="relative mx-auto flex items-center width-100">
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
            <Typography variant="h4" className="mr-4 logo-text">
              <span className="inline-block align-middle">BETFAST</span>
            </Typography>
          </Link>

          <div className="float-left mx-2">
            <Link href="/home">
              <Button variant={"text"} className="header-button text-white">
                Home
              </Button>
            </Link>
          </div>

          <div className="float-left">
            <Link href="/mytrades">
              <Button variant={"text"} className="header-button text-white">
                My Trades
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex customized-wallet">
          <ConnectWalletButton />
          {/* <ProfileMenu /> */}
        </div>
      </div>
    </Navbar>
  );
}
