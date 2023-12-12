"use client";

import { useProgram } from "@/context/ProgramContext";
import { getECMarkets, getMarkets, getOrders } from "@/redux/slice";
import { fetchOrders } from "@/utils/fetchData";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { cancelOrder } from "@monaco-protocol/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SportIcon from "../../SportIcon";
import { ts2DateOptions, ts2TimeOptions } from "@/utils/timestamp";

export default function ActivedPage() {
  const orders = useSelector(getOrders);
  const markets = useSelector(getMarkets);
  const ecMarkets = useSelector(getECMarkets);
  const program = useProgram().program;
  const wallet = useWallet();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedPk, setSelectedPk] = React.useState("");

  const handleOpen = () => setOpen(!open);
  const handleCancelOrder = async () => {
    if (!program) {
      return;
    }
    const orderPk = new PublicKey(selectedPk);
    const cancelledOrder = await cancelOrder(program, orderPk);

    if (cancelledOrder.success) {
      toast.success("Order cancelled!");
      handleOpen();
      fetchOrders(program, wallet, dispatch);
    } else {
      toast.error("Failed to cancel!");
    }
  };

  return (
    <div>
      {!orders || !orders.map
        ? ""
        : orders.map(
            (order: any, index: number) =>
              (order.orderStatus.open || order.orderStatus.matched) && (
                <div key={index}>
                  {ecMarkets[order.market] == undefined ? (
                    <Card className="p-4 relative mx-auto block md:flex-row items-center w-full my-2 min-h-[120px] bg-secondary_4">
                      <div className="md:float-left mr-auto">
                        <Typography variant="h5" className="mb-2 text-white">
                          {!markets[order.market]
                            ? ""
                            : markets[order.market].title}
                        </Typography>
                        <Typography variant="h6" className="ml-2 text-gray-200">
                          {order.orderStatus.open ? "Open" : "Matched"}
                        </Typography>
                        <Typography variant="h6" className="ml-2 text-gray-400">
                          Expected Price:{" "}
                          <span className="text-highlight">
                            {order.expectedPrice}
                          </span>
                        </Typography>
                      </div>
                      {markets[order.market] && (
                        <div
                          className={`md:w-[300px] w-full grid grid-cols-${
                            markets[order.market].outcomes.length
                          } gap-${
                            markets[order.market].outcomes.length
                          } md:float-right md:ml-auto`}
                        >
                          {markets[order.market].outcomes.map(
                            (outcome: any, mIndex: number) => (
                              <div className="md:float-left" key={mIndex}>
                                <Button
                                  disabled={order.marketOutcomeIndex != mIndex}
                                  className={`h-full px-0 w-full mx-2 md:w-200px ${
                                    order.marketOutcomeIndex == mIndex
                                      ? order.forOutcome
                                        ? "bg-transparent border-primary_4 border-2 text-primary_4"
                                        : "bg-transparent border-gray-200 border-2 text-gray-200"
                                      : "gray"
                                  }`}
                                  onClick={() => {
                                    handleOpen(),
                                      setSelectedPk(order.publicKey);
                                  }}
                                >
                                  {outcome.title}
                                </Button>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </Card>
                  ) : (
                    <Card className="p-4 relative mx-auto md:flex-row items-center w-full my-2 min-h-[120px] bg-secondary_4">
                      <div className="md:float-left mr-auto">
                        <Typography
                          variant="paragraph"
                          className="flex text-gray-200"
                        >
                          <SportIcon
                            color="white"
                            sportName={ecMarkets[order.market].category}
                          />
                          &nbsp;{ecMarkets[order.market].eventGroupTitle} -{" "}
                          {ecMarkets[order.market].categoryTitle}
                        </Typography>
                        <Typography variant="h5" className="mb-2 text-white">
                          {ecMarkets[order.market].eventName} (
                          {ts2TimeOptions(ecMarkets[order.market].eventStart)}{" "}
                          {ts2DateOptions(ecMarkets[order.market].eventStart)})
                        </Typography>
                        <Typography variant="h6" className="ml-2 text-gray-200">
                          {!markets[order.market]
                            ? ""
                            : markets[order.market].title}
                        </Typography>
                        <Typography variant="h6" className="ml-2 text-gray-400">
                          Expected Price:{" "}
                          <span className="text-highlight">
                            {order.expectedPrice}
                          </span>
                        </Typography>
                      </div>
                      {markets[order.market] && (
                        <div
                          className={`md:w-[300px] w-full grid grid-cols-${
                            markets[order.market].outcomes.length
                          } gap-${
                            markets[order.market].outcomes.length
                          } md:float-right md:ml-auto`}
                        >
                          {markets[order.market].outcomes.map(
                            (outcome: any, mIndex: number) => (
                              <div className="md:float-left" key={mIndex}>
                                <Button
                                  disabled={order.marketOutcomeIndex != mIndex}
                                  className={`h-full px-0 w-full mx-2 md:w-200px ${
                                    order.marketOutcomeIndex == mIndex
                                      ? order.forOutcome
                                        ? "bg-transparent border-primary_4 border-2 text-primary_4"
                                        : "bg-transparent border-gray-200 border-2 text-gray-200"
                                      : "gray"
                                  }`}
                                  onClick={() => {
                                    handleOpen(),
                                      setSelectedPk(order.publicKey);
                                  }}
                                >
                                  {outcome.title}
                                </Button>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </Card>
                  )}
                </div>
              ),
          )}
      <ToastContainer position="bottom-right" theme="colored" />
      <Dialog open={open} handler={handleOpen} className="bg-secondary_4">
        <DialogBody>
          <Typography variant="h5" className="text-center text-white">
            Are you sure to cancel your order?
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-4 text-white"
          >
            <span>No</span>
          </Button>
          <Button
            onClick={handleCancelOrder}
            className="mr-16 bg-transparent border-2 border-primary_light"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
