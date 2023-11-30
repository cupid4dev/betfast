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

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960, // && setIsNavOpen(false),
    );
    fetchEventCategories(dispatch);
  }, []);

  React.useEffect(() => {
    if (!program || !wallet) {
      return;
    }
    fetchOrders(program, wallet, dispatch);
  }, [program, wallet]);

  return eventCategories.length == 0 ? (
    <div className="fixed w-full h-full t-0 l-0 backdrop-blur-xl bg-white place-content-center grid z-50">
      <Spinner className="h-16 w-16" />
    </div>
  ) : (
    <Navbar className="mx-auto p-2 max-w-none rounded-none lg:pl-6 fixed t-0 z-30">
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
            <Typography variant="h4" className="mr-4">
              <span className="inline-block align-middle">BETFAST</span>
            </Typography>
          </Link>

          <div className="float-left mr-4">
            <Link href="/home">
              <Button variant={"gradient"}>Home</Button>
            </Link>
          </div>

          <div className="float-left">
            <Link href="/mytrades">
              <Button variant={"text"}>My Trades</Button>
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
