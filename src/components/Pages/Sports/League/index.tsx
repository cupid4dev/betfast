/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import GameOverview from "@/components/UI/GameOverview";
import { getLeagueById, updateLeague } from "@/redux/slice";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import mpRouter from "@/constants/mpRouter";

export default function League() {
  const searchParams = useSearchParams();
  const leagueId = searchParams ? searchParams.get("league") : "";
  const dispatch = useDispatch();
  const league = useSelector(getLeagueById("" + leagueId));

  React.useEffect(() => {
    setTimeout(() => {
      axios.get(mpRouter.API_URL + "/league?id=" + leagueId).then((data) => {
        if (data.status == 200) {
          dispatch(
            updateLeague({
              id: leagueId,
              league: data.data.league,
            }),
          );
        }
      });
    }, 0);
  }, [leagueId]);

  return !league ? (
    <div className="w-full h-full t-0 l-0 backdrop-blur-xl place-content-center grid z-[500]">
      <Spinner className="h-16 w-16 text-gray-900/50" color="teal" />
    </div>
  ) : (
    <div>
      <div className="py-4 px-4">
        <Typography variant="h2" className="text-white">
          {league.title}
        </Typography>
        {Object.keys(league.events).map((day: any, eIndex: number) => (
          <div key={eIndex}>
            <p>&nbsp;</p>
            <Typography variant="h5" className="text-gray-200">
              {day}
            </Typography>
            <Card className="w-full px-4 py-4 bg-secondary_4">
              {league.events[day].map((item: any, iIndex: number) => (
                <div key={iIndex}>
                  <GameOverview finished details={item} />
                  {league.events[day][iIndex + 1] !== undefined && (
                    <hr className="border-blue-gray-50 my-4" />
                  )}
                </div>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
