/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { getSportById, updateSport } from "@/redux/slice";
import { Spinner, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import MatchesPage from "./Matches";
import CompetitionPage from "./Competitions";
import axios from "axios";
import mpRouter from "@/constants/mpRouter";

export default function SportEventPage() {
  const dispatch = useDispatch();

  const tabData = [
    {
      label: "Matches",
      value: "matches",
    },
    {
      label: "Competitions",
      value: "competitions",
    },
  ];
  const searchParams = useSearchParams();
  const event = searchParams.get("event");
  const sport = useSelector(getSportById("" + event));

  React.useEffect(() => {
    setTimeout(() => {
      axios.get(mpRouter.API_URL + "/sport?id=" + event).then((data) => {
        if (data.status == 200) {
          dispatch(
            updateSport({
              id: event,
              sport: data.data.sport,
            }),
          );
        }
      });
    }, 0);
  }, [event]);

  return !sport ? (
    <div className="w-full h-full t-0 l-0 backdrop-blur-xl place-content-center grid z-[500]">
      <Spinner className="h-16 w-16 text-gray-900/50" color="teal" />
    </div>
  ) : (
    <div>
      <div className="py-4 px-4">
        <Typography variant="h2" className="text-white">
          {sport.title}
        </Typography>

        <Tabs value="matches" className="mt-4">
          <TabsHeader className="w-200px bg-transparent border-2 border-primary_light custom-tab">
            {tabData.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabData.map(({ value }) => (
              <TabPanel key={value} value={value}>
                {value == "matches" ? (
                  <MatchesPage sport={sport} />
                ) : (
                  <CompetitionPage sport={sport} />
                )}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
