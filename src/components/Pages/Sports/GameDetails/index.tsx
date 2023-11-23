/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { BetDialog } from "@/components/UI/GameOverview/BetDialog";
import LineChart from "@/components/UI/LineChart";
import { Button, Dialog, Typography } from "@material-tailwind/react";

export default function GameDetails() {
  const TABLE_HEAD = ["Selection", "Last Traded", "Back", "Lay"];
  const [open, setOpen] = React.useState(false);

  const handleOffer = () => {
    setOpen(!open);
  };

  return (
    <div className="p-4">
      <Typography variant="paragraph" className="flex">
        <img
          className="h-5 w-5"
          src="https://seeklogo.com/images/W/wta-logo-C8481584E6-seeklogo.com.png"
          alt="WTA"
        />
        &nbsp;WTA WOMEN SINGLES
      </Typography>
      <br />
      <Typography variant="h2">Julia Riera vs Despina Papamichail</Typography>
      <div className="flex">
        <Typography variant="h6" className="float-left">
          19:00 - Today&nbsp;
        </Typography>
        <Typography variant="paragraph" className="float-left">
          Liquidity:&nbsp;
        </Typography>
        <Typography variant="paragraph" className="float-left">
          $ 0 USDC&nbsp;
        </Typography>
        <Typography variant="paragraph" className="float-left">
          | Traded:&nbsp;
        </Typography>
        <Typography variant="paragraph" className="float-left">
          $ 0 USDC&nbsp;
        </Typography>
        <br />
      </div>
      <Button variant="gradient" className="my-2">
        Match Winner
      </Button>
      <div className="flex">
        <div className="float-left">
          <LineChart />
        </div>
      </div>
      <div className="relative mx-auto flex items-center w-full text-blue-gray-900">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr key={1}>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="h5">Julia Riera</Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="paragraph" className="text-right">
                  -
                </Typography>
                <Typography variant="paragraph" className="text-right">
                  - %
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex w-full">
                  <div className="float-left w-full p-2">
                    <Button variant="gradient" className="w-full">
                      -
                    </Button>
                  </div>
                  <div className="float-left w-full p-2">
                    <Button variant="gradient" className="w-full">
                      -
                    </Button>
                  </div>
                  <div className="float-left w-full p-2">
                    <Button
                      variant="gradient"
                      className="w-full"
                      color="cyan"
                      onClick={() => {
                        handleOffer();
                      }}
                    >
                      Offer
                    </Button>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex w-full">
                  <div className="float-left w-full p-2">
                    <Button
                      variant="gradient"
                      className="w-full"
                      color="deep-orange"
                      onClick={() => {
                        handleOffer();
                      }}
                    >
                      Offer
                    </Button>
                  </div>
                  <div className="float-left w-full p-2">
                    <Button variant="gradient" className="w-full">
                      -
                    </Button>
                  </div>
                  <div className="float-left w-full p-2">
                    <Button variant="gradient" className="w-full">
                      -
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
            <tr key={2}>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="h5">Despina Papamichail</Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="paragraph" className="text-right">
                  -
                </Typography>
                <Typography variant="paragraph" className="text-right">
                  - %
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex w-full">
                  <div className="float-left w-full p-2">
                    <Button variant="gradient" className="w-full">
                      -
                    </Button>
                  </div>
                  <div className="float-left w-full p-2">
                    <Button variant="gradient" className="w-full">
                      -
                    </Button>
                  </div>
                  <div className="float-left w-full p-2">
                    <Button
                      variant="gradient"
                      className="w-full"
                      color="cyan"
                      onClick={() => {
                        handleOffer();
                      }}
                    >
                      Offer
                    </Button>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex w-full">
                  <div className="float-left w-full p-2">
                    <Button
                      variant="gradient"
                      className="w-full"
                      color="deep-orange"
                      onClick={() => {
                        handleOffer();
                      }}
                    >
                      Offer
                    </Button>
                  </div>
                  <div className="float-left w-full p-2">
                    <Button variant="gradient" className="w-full">
                      -
                    </Button>
                  </div>
                  <div className="float-left w-full p-2">
                    <Button variant="gradient" className="w-full">
                      -
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Dialog open={open} handler={handleOffer}>
        <BetDialog
          handleOpen={handleOffer}
          details={undefined}
          isBack={false}
          team={0}
        />
      </Dialog>
    </div>
  );
}
