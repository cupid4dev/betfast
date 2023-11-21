import React from "react";
import {
  Typography,
  Input,
  Button,
  IconButton
} from "@material-tailwind/react";
import { RiDeleteBinLine } from "react-icons/ri";

export function BetDialog({handleOpen}: {
  handleOpen: any
}) {
  
  return <div className="p-4 relative">
  <div className="flex">
    <Typography variant="h6" className="gradient-back float-left">BACK</Typography>
    <Typography variant="h6" className="float-left">&nbsp;Kansas City Chiefs</Typography>
  </div>
  <Typography variant="paragraph" className="font-bold">Winner</Typography>
  <Typography variant="small" className="">Kansas City Chiefs vs Philadelphia Eagles</Typography>
  <div className="flex my-2">
    <div className="w-full float-left">
      <Input label="Enter Stake.." crossOrigin={""} type="number" />
    </div>
    <div className="float-right ml-2">
      <Input label="Odds" defaultValue={1.67} type="number" crossOrigin={""} step="0.01"/>
    </div>
  </div>
  <div className="flex">
    <Typography variant="small">Profit:&nbsp;</Typography>
    <Typography variant="small" className="profit-color">-</Typography>
  </div>
  <Button variant="text" className="flex mg-auto my-2">Connect Wallet to place order</Button>
  <div className="absolute t-0 r-0 p-2">
    <IconButton variant="gradient" className="mx-2" onClick={()=>{
      handleOpen();
    }}>
      <RiDeleteBinLine className='w-5 h-5'/>
    </IconButton>
  </div>
</div>
}