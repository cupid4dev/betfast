"use client";
import React from "react";
import GameOverview from "@/components/UI/GameOverview";
import { getEventCategories } from "@/redux/slice";
import { Card, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function League() {
  const searchParams = useSearchParams();
  const sport = searchParams.get("sport");
  const league = searchParams.get("league");

  const eventCategories = useSelector(getEventCategories);
  const [selectedLeague, setSelectedLeague] = React.useState({
    title: "",
  });

  React.useEffect(() => {
    const sIndex = eventCategories.findIndex((v: any) => {
      return v.id == sport;
    });
    if (sIndex == -1) {
      return;
    }
    const lIndex = eventCategories[sIndex].eventGroup.findIndex((v: any) => {
      return v.id == league;
    });
    if (lIndex == -1) {
      return;
    }
    setSelectedLeague(eventCategories[sIndex].eventGroup[lIndex]);
  }, [eventCategories, sport, league]);

  return (
    <div>
      <div className="py-4 px-4">
        <Typography variant="h2">{selectedLeague.title}</Typography>
        <p>&nbsp;</p>
        <Typography variant="h5">Monday, 20 November, 2023</Typography>
        <Card className="w-full px-4 py-4">
          <GameOverview finished />
          <hr className="border-blue-gray-50 my-4" />
          <GameOverview finished={false} />
        </Card>
        <p>&nbsp;</p>
        <Typography variant="h5">Tuesday, 21 November, 2023</Typography>
        <Card className="w-full px-4 py-4">
          <GameOverview finished />
          <hr className="border-blue-gray-50 my-4" />
          <GameOverview finished={false} />
        </Card>
      </div>
    </div>
  );
}
