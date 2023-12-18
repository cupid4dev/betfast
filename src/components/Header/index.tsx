/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Navbar, Button } from "@material-tailwind/react";
import Link from "next/link";
import ConnectWalletButton from "../UI/ConnectWalletButton";
import { useDispatch } from "react-redux";
import { fetchOrders } from "@/utils/fetchData";
import { useProgram } from "@/context/ProgramContext";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ComplexNavbar() {
  const dispatch = useDispatch();
  const program = useProgram().program;
  const wallet = useWallet();

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
