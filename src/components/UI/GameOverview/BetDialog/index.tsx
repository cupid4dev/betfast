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
import { Event } from "@/types/event";
import { createOrderUiStake } from "@monaco-protocol/client";
import { useProgram } from "@/context/ProgramContext";

export function BetDialog({
  handleOpen,
  details,
  isBack,
  team,
}: {
  handleOpen: any;
  details: Event;
  isBack: boolean;
  team: number;
}) {
  const wallet = useWallet();
  const program = useProgram().program;
  const [stake, setStake] = React.useState(0);
  const [odds, setOdds] = React.useState(1);

  const handleStake = (e: any) => {
    setStake(e.target.value);
  }

  const handleOdds = (e: any) => {
    setOdds(e.target.value);
  }

  const handleOrder = async () => {
    const market = details.markets.length == 1 ? details.markets[0] : 
      details.markets.find( m => {
        return m.marketName == "Winner" || m.marketName == "Full Time Result"
    });
    
    if(!program){
      return;
    }

    if(!market){
      return;
    }

    const order = await createOrderUiStake(
      program,
      new PublicKey(market.marketAccount),
      team,
      isBack,
      Number(odds),
      Number(stake)
    );
  }

  return (
    <div className="p-4 relative">
      <div className="flex">
        <Typography variant="h6" className="gradient-back float-left">
          {isBack ? "BACK" : "LAY"}
        </Typography>
        <Typography variant="h6" className="float-left">
          &nbsp;{details.participants[team].name}
        </Typography>
      </div>
      <Typography variant="paragraph" className="font-bold">
        Winner
      </Typography>
      <Typography variant="small" className="">
        {details.eventName}
      </Typography>
      <div className="flex my-2">
        <div className="w-full float-left">
          <Input label="Enter Stake.." crossOrigin={""} type="number" value={stake} onChange={handleStake}/>
        </div>
        <div className="float-right ml-2">
          <Input
            label="Odds"
            value={odds}
            type="number"
            crossOrigin={""}
            step="0.01"
            onChange={handleOdds}
          />
        </div>
      </div>
      <div className="flex">
        <Typography variant="small">Profit:&nbsp;</Typography>
        <Typography variant="small" className="profit-color">
          {(stake * odds).toFixed(3)}
        </Typography>
      </div>
      {wallet.connected ? (
        <Button variant="gradient" className="flex mg-auto my-2" onClick={handleOrder}>
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
      </div>
    </div>
  );
}
