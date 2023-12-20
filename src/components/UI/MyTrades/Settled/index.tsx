"use client";

import { getMarkets, getOrders } from "@/redux/slice";
import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export default function SettledPage() {
  const orders = useSelector(getOrders);
  const markets = useSelector(getMarkets);

  return (
    <div>
      {!orders || !orders.map
        ? ""
        : orders.map(
            (order: any, index: number) =>
              !order.orderStatus.open &&
              !order.orderStatus.matched && (
                <div key={index}>
                  <Card className="p-4 relative mx-auto md:flex-row items-center w-full my-2 bg-secondary_4">
                    <div className="md:float-left mr-auto">
                      <Typography variant="h5" className="mb-2 text-gray-200">
                        {!markets[order.market]
                          ? ""
                          : markets[order.market].title}
                      </Typography>
                      <Typography variant="h4" className="ml-2 text-white">
                        {order.orderStatus.settledWin
                          ? "You Won!"
                          : order.orderStatus.settledLose
                            ? "You Lost!"
                            : order.orderStatus.cancelled
                              ? "Order Cancelled!"
                              : "Voided!"}
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
                                disabled
                                className={`h-full px-0 w-full md:mx-2 md:w-200px ${
                                  order.marketOutcomeIndex == mIndex
                                    ? order.forOutcome
                                      ? "bg-transparent border-primary_4 border-2 text-primary_4"
                                      : "bg-transparent border-gray-200 border-2 text-gray-200"
                                    : "gray"
                                }`}
                              >
                                {outcome.title}
                              </Button>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </Card>
                </div>
              ),
          )}
    </div>
  );
}
