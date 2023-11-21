import React from 'react';
import Link from "next/link";
import { BetDialog } from "./BetDialog";
import {
  Button,
  Typography, 
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function GameOverview({
  finished
}: {
  finished: boolean
}) {
  const [open, setOpen] = React.useState(false);

  const handleOffer = () => {
    setOpen(!open);
  }

  return <div>
    <div className="relative mx-auto flex items-center w-full text-blue-gray-900">
    <div className="float-left mr-auto">
        <Typography variant="paragraph" className="flex"><img className="h-5 w-5" src="https://seeklogo.com/images/W/wta-logo-C8481584E6-seeklogo.com.png" alt="WTA"/>
          &nbsp;WTA WOMEN SINGLES
        </Typography>
        <Typography variant="h6"> Julia Riera vs Despina Papamichail </Typography>
        <Typography variant="paragraph" className="text-link"> Liquidity: <Link href="#">$0 USDC</Link> </Typography>
      </div>
      <div className="mr-4">
        <Typography variant="h6" className="text-right">19:00</Typography>
        <Typography variant="h6">Mon 20 Nov</Typography>
      </div>
      
      { finished 
      ? <Button variant="gradient" className="h-full">FINISHED</Button> 
      : <div className="flex">
        <div className="ml-4">
          <Typography variant="paragraph" className="text-center">Julia Riera</Typography>
          <div className="flex">
            <Button variant="gradient" color="cyan" className="mr-4 float-left" onClick={() => {handleOffer();}}>Offer</Button>
            <Button variant="gradient" color="deep-orange" className="float-right" onClick={() => {handleOffer();}}>Offer</Button>
          </div>
        </div>
        <div className="ml-4">
          <Typography variant="paragraph" className="text-center">Despina Papamichali</Typography>
          <div className="flex">
            <Button variant="gradient" color="cyan" className="mr-4 float-left" onClick={() => {handleOffer();}}>Offer</Button>
            <Button variant="gradient" color="deep-orange" className="float-right" onClick={() => {handleOffer();}}>Offer</Button>
          </div>
        </div>
      </div>}
      <Dialog open={open} handler={handleOffer}>
        <BetDialog handleOpen={handleOffer}/>
      </Dialog>
    </div>
  </div>
};