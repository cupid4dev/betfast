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

export function BetDialog({
  handleOpen,
  details,
  isBack,
  team,
}: {
  handleOpen: any;
  details: any;
  isBack: boolean;
  team: number;
}) {
  const wallet = useWallet();

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
          <Input label="Enter Stake.." crossOrigin={""} type="number" />
        </div>
        <div className="float-right ml-2">
          <Input
            label="Odds"
            defaultValue={1.67}
            type="number"
            crossOrigin={""}
            step="0.01"
          />
        </div>
      </div>
      <div className="flex">
        <Typography variant="small">Profit:&nbsp;</Typography>
        <Typography variant="small" className="profit-color">
          -
        </Typography>
      </div>
      {wallet.connected ? (
        <Button variant="gradient" className="flex mg-auto my-2">
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
