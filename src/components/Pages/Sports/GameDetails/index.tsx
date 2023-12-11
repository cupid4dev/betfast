/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { BetDialog } from "@/components/UI/GameOverview/BetDialog";
import LineChart from "@/components/UI/LineChart";
import { Button, Card, Dialog, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { getEventCategories } from "@/redux/slice";
import { useSearchParams } from "next/navigation";
import SportIcon from "@/components/UI/SportIcon";
import {
  ts2DateOptions,
  ts2TimeOptions,
  ts2TodayTomorrow,
} from "@/utils/timestamp";
import { Market, Participant } from "@/types/event";

export default function GameDetails() {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState({
    eventAccount: "",
    eventName: "",
    participants: new Array<Participant>(),
    eventStart: 0,
    estimatedEnd: 0,
    category: "",
    categoryTitle: "",
    eventGroup: "",
    eventGroupTitle: "",
    displayPriority: 0,
    markets: new Array<Market>(),
  });
  const [isBack, setIsBack] = React.useState(true);
  const [team, setTeam] = React.useState(0);
  const [selectedMarketIndex, setSelectedMarketIndex] = React.useState(0);

  const eventCategories = useSelector(getEventCategories);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const eventGroup = searchParams.get("eventGroup");
  const eventAccount = searchParams.get("eventAccount");

  const handleOffer = (isBack: boolean, team: number, market: any) => {
    setIsBack(isBack);
    setTeam(team);
    setSelectedMarketIndex(market);
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
          {ts2TimeOptions(details.eventStart)},{" "}
          {ts2TodayTomorrow(details.eventStart)}&nbsp; ~&nbsp;
        </Typography>
        <Typography variant="h6" className="float-left">
          {ts2TimeOptions(details.estimatedEnd)},{" "}
          {ts2TodayTomorrow(details.estimatedEnd)}&nbsp;
        </Typography>
        <br />
      </div>
      <div className="flex">
        <div className="float-left">
          <LineChart />
        </div>
      </div>
      {details.eventStart * 1000 < new Date().getTime() ? (
        <div>This game is finished!</div>
      ) : (
        details.markets.map((market, index) => (
          <Card key={index} className="p-4 my-2">
            <div className="relative mx-auto md:flex items-center w-full text-blue-gray-900">
              <div className="md:float-left mr-auto">
                <Typography variant="h3" className="md:ml-4">
                  {market.marketName}
                </Typography>
              </div>
              <div className="flex md:block mr-4">
                <Typography variant="h6" className="text-right">
                  {ts2TimeOptions(details.eventStart)}
                </Typography>
                <Typography variant="h6">
                  &nbsp;{ts2DateOptions(details.eventStart)}
                </Typography>
              </div>
              {new Date().getTime() > details.eventStart * 1000 ? (
                <Button variant="gradient" className="h-full">
                  FINISHED
                </Button>
              ) : (
                <div className={`grid grid-cols-${market.outcomes.length} gap-${market.outcomes.length} md:flex`}>
                  {market.outcomes.map((outcome: any, mIndex: number) => (
                    <div className="my-2 col-span-1" key={mIndex}>
                      <Typography
                        variant="paragraph"
                        className="text-center text-ellipsis overflow-hidden max-w-160px mg-auto truncate"
                      >
                        {outcome}
                      </Typography>
                      <div className="md:flex">
                        <Button
                          variant="gradient"
                          color="cyan"
                          className="md:mr-4 md:float-left w-full md:w-[100px] px-1 my-1"
                          onClick={() => {
                            handleOffer(true, mIndex, index);
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="gradient"
                          color="deep-orange"
                          className="md:float-right w-full md:w-[100px] px-1 my-1"
                          onClick={() => {
                            handleOffer(false, mIndex, index);
                          }}
                        >
                          Lay
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))
      )}
      <Dialog open={open} handler={() => {}}>
        <BetDialog
          handleOpen={handleOffer}
          details={details}
          isBack={isBack}
          team={team}
          marketIndex={selectedMarketIndex}
        />
      </Dialog>
    </div>
  );
}
