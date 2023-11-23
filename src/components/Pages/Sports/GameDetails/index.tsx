/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { BetDialog } from "@/components/UI/GameOverview/BetDialog";
import LineChart from "@/components/UI/LineChart";
import { Button, Dialog, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { getEventCategories } from "@/redux/slice";
import { useSearchParams } from "next/navigation";
import SportIcon from "@/components/UI/SportIcon";
import { ts2TimeOptions, ts2TodayTomorrow } from "@/constants/functions";

export default function GameDetails() {
  const TABLE_HEAD = ["Selection", "Last Traded", "Back", "Lay"];
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState({
    eventGroupTitle: "",
    category: "",
    eventName: "",
    eventStart: 0,
    participants: [{ name: "" }, { name: "" }],
  });
  const [isBack, setIsBack] = React.useState(true);
  const [team, setTeam] = React.useState(0);

  const eventCategories = useSelector(getEventCategories);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const eventGroup = searchParams.get("eventGroup");
  const eventAccount = searchParams.get("eventAccount");

  const handleOffer = (isBack: boolean, team: number) => {
    setIsBack(isBack);
    setTeam(team);
    setOpen(!open);
  };

  React.useEffect(() => {
    if (eventCategories.length == 0) {
      return;
    }
    setDetails(
      eventCategories
        .findLast((ec: any) => ec.id == category)
        .eventGroup.findLast((eg: any) => eg.id == eventGroup)
        .events.findLast((e: any) => e.eventAccount == eventAccount),
    );
  }, [category, eventAccount, eventCategories, eventGroup]);

  return details == undefined ? (
    <></>
  ) : (
    <div className="p-4">
      <Typography variant="paragraph" className="flex">
        <SportIcon sportName={details.category} />
        &nbsp;{details.eventGroupTitle}
      </Typography>
      <br />
      <Typography variant="h2">{details.eventName}</Typography>
      <div className="flex">
        <Typography variant="h6" className="float-left">
          {ts2TimeOptions(details.eventStart)} -{" "}
          {ts2TodayTomorrow(details.eventStart)}&nbsp;
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
                <Typography variant="h5">
                  {details.participants[0].name}
                </Typography>
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
                        handleOffer(true, 0);
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
                        handleOffer(false, 0);
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
                <Typography variant="h5">
                  {details.participants[1].name}
                </Typography>
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
                        handleOffer(true, 1);
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
                        handleOffer(false, 1);
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
      <Dialog open={open} handler={() => {}}>
        <BetDialog
          handleOpen={handleOffer}
          details={details}
          isBack={isBack}
          team={team}
        />
      </Dialog>
    </div>
  );
}
