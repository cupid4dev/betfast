/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ActivedPage from "@/components/UI/MyTrades/Actived";

export default function MyTradesPage() {
  const data = [
    {
      label: "Active",
      value: "active",
      desc: `No active trades.`,
    },
    {
      label: "Settled",
      value: "settled",
      desc: `No settled trades`,
    },
  ];
 
  return (
    <div className="p-4">
      <Typography variant="h2">My Trades</Typography>
      <Typography variant="paragraph">
        View your currently active and previously settled trades.
      </Typography>
      <br />
      <Tabs value="active">
        <TabsHeader className="w-200px">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value }) => (
            <TabPanel key={value} value={value}>
              { value == "active" ? <ActivedPage/> : <></> }
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
