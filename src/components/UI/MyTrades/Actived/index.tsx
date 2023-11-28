'use client'

import { getMarkets, getOrders } from "@/redux/slice";
import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react"
import { useSelector } from "react-redux";

export default function ActivedPage(){
  const orders = useSelector(getOrders);
  const markets = useSelector(getMarkets);

  return <div>
    {!orders || !orders.map? "" : orders.map((order: any, index: number) => (
      (order.orderStatus.open || order.orderStatus.matched) && <div key={index}>
        <Card className="p-4 relative mx-auto flex-row items-center w-full">
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
                <Button disabled={order.marketOutcomeIndex != mIndex} variant="gradient" className="mx-2 w-200px" color={order.marketOutcomeIndex == mIndex ? "deep-orange" : "gray"}>{outcome.title}</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    ))}
  </div>
};