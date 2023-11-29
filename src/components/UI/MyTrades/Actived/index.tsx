'use client'

import { useProgram } from "@/context/ProgramContext";
import { getMarkets, getOrders } from "@/redux/slice";
import { fetchOrders } from "@/utils/fetchData";
import { Button, Card, Dialog, DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import { cancelOrder } from "@monaco-protocol/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ActivedPage(){
  const orders = useSelector(getOrders);
  const markets = useSelector(getMarkets);
  const program = useProgram().program;
  const wallet = useWallet();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedPk, setSelectedPk] = React.useState("");
 
  const handleOpen = () => setOpen(!open);
  const handleCancelOrder = async () => {
    if(!program){
      return;
    }
    const orderPk = new PublicKey(selectedPk);
    const cancelledOrder = await cancelOrder(program, orderPk)

    if(cancelledOrder.success){
      toast.success("Order cancelled!");
      handleOpen();
      fetchOrders(program, wallet, dispatch);
    } else {
      toast.error("Failed to cancel!");
    }
  }

  return <div>
    {!orders || !orders.map? "" : orders.map((order: any, index: number) => (
      (order.orderStatus.open || order.orderStatus.matched) && <div key={index}>
        <Card className="p-4 relative mx-auto flex-row items-center w-full my-2">
          <div className="float-left mr-auto">
            <Typography variant="h5" className="mb-2">{!markets[order.market] ? "" : markets[order.market].title}</Typography>
            <Typography variant="h6" className="ml-2">{
              order.orderStatus.open ? "Open" : "Matched"
            }</Typography>
            <Typography variant="h6" className="ml-2 text-primary">Expected Price: {order.expectedPrice}</Typography>
          </div>
          <div className="float-right ml-auto">
            {markets[order.market] && markets[order.market].outcomes.map((outcome: any, mIndex: number) => (
              <div className="float-left" key={mIndex}>
                <Button 
                  disabled={order.marketOutcomeIndex != mIndex} 
                  variant="gradient" 
                  className="mx-2 w-200px" 
                  color={order.marketOutcomeIndex == mIndex ? ( order.forOutcome ? "cyan" : "deep-orange") : "gray"}
                  onClick={() => {handleOpen(), setSelectedPk(order.publicKey)}}
                >{outcome.title}</Button>
              </div>
            ))}
          </div>
        </Card>
        <ToastContainer
          position="bottom-right" 
          theme="colored"
        />
        <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <Typography variant="h3" className="text-center text-black">Are you sure to cancel your order?</Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-4"
          >
            <span>No</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCancelOrder} className="mr-16">
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
    ))}
  </div>
};