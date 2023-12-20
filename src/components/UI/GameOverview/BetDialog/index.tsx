/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletButton from "../../ConnectWalletButton";
import { PublicKey } from "@solana/web3.js";
import { createOrderUiStake } from "@monaco-protocol/client";
import { useProgram } from "@/context/ProgramContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchOrders } from "@/utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { getBFEmail } from "@/redux/slice";

export function BetDialog({
  handleOpen,
  details,
  isBack,
  team,
  marketIndex,
  defaultPrice,
}: {
  handleOpen: any;
  details: {
    eventAccount: string;
    eventName: string;
    participants: any[];
    eventStart: number;
    estimatedEnd: number;
    category: string;
    categoryTitle: string;
    eventGroup: string;
    eventGroupTitle: string;
    displayPriority: number;
    markets: any[];
    marketsWithMP: any[];
  };
  isBack: boolean;
  team: number;
  marketIndex: number;
  defaultPrice: number;
}) {
  const wallet = useWallet();
  const program = useProgram().program;
  const dispatch = useDispatch();
  const [stake, setStake] = React.useState(0);
  const [odds, setOdds] = React.useState(defaultPrice);
  const bfEmail = useSelector(getBFEmail);

  const handleStake = (e: any) => {
    setStake(e.target.value);
  };

  const handleOdds = (e: any) => {
    setOdds(e.target.value);
  };

  const handleOrder = async () => {
    let market;
    if (marketIndex == -1) {
      market =
        details.markets.length == 1
          ? details.markets[0]
          : details.markets.find((m) => {
              return (
                m.marketName == "Winner" || m.marketName == "Full Time Result"
              );
            });
    } else {
      market = details.markets[marketIndex];
    }

    if (!program) {
      return;
    }

    if (!market) {
      return;
    }

    try {
      const order = await createOrderUiStake(
        program,
        new PublicKey(market.marketAccount),
        team,
        isBack,
        Number(odds),
        Number(stake),
      );

      if (order.success) {
        handleOpen();
        toast.success("Your order created successfully!");
        fetchOrders(program, wallet, dispatch);
      } else {
        toast.error("Failed to create your order!");
        // console.log(order.errors);
      }
    } catch (e) {
      toast.error("Failed to create your order!");
      // console.log(e);
    }
  };

  return (
    <div className="p-4 relative bg-secondary_4 rounded-lg">
      <div className="flex">
        <Typography variant="h6" className={`text-primary_4 float-left`}>
          {isBack ? "BACK" : "LAY"}
        </Typography>
        <Typography variant="h6" className="float-left text-gray-200">
          &nbsp;
          {
            details.marketsWithMP[marketIndex == -1 ? 0 : marketIndex].outcomes[
              team
            ]
          }
        </Typography>
      </div>
      <Typography variant="paragraph" className="font-bold text-white">
        {details.marketsWithMP[marketIndex == -1 ? 0 : marketIndex].marketName}
      </Typography>
      <Typography variant="small" className="text-gray-400">
        {details.eventName}
      </Typography>
      <div className="md:flex my-2">
        <div className="w-full md:float-left">
          <Input
            label="Enter Stake.."
            crossOrigin={""}
            type="number"
            value={stake}
            color="white"
            onChange={handleStake}
          />
        </div>
        <div className="mt-2 md:mt-0 md:float-right md:ml-2">
          <Input
            label="Odds"
            value={odds}
            type="number"
            crossOrigin={""}
            step="0.01"
            color="white"
            onChange={handleOdds}
          />
        </div>
      </div>
      <div className="md:flex">
        <Typography variant="small" color="white">
          Profit:&nbsp;
        </Typography>
        <Typography variant="small" className="text-highlight">
          {(stake * odds).toFixed(3)}
        </Typography>
      </div>
      {bfEmail == "" ? (
        <Typography variant="small" className="text-gray-400">
          You need to login to start trading.
        </Typography>
      ) : wallet.connected ? (
        <Button
          className="flex mg-auto my-2 bg-primary_light"
          onClick={handleOrder}
        >
          STAKE
        </Button>
      ) : (
        <div className="customized-wallet flex justify-center">
          <ConnectWalletButton />
        </div>
      )}
      <div className="absolute t-0 r-0 p-2">
        <IconButton
          variant="gradient"
          className="mx-2"
          onClick={() => {
            handleOpen();
          }}
        >
          <RiDeleteBinLine className="w-5 h-5" />
        </IconButton>
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </div>
  );
}
