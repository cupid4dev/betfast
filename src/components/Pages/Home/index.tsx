/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import GameOverview from "@/components/UI/GameOverview";
import { getEventCategories } from "@/redux/slice";
import { Card, Carousel, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ts2DateOptions } from "@/utils/timestamp";
import SportIcon from "@/components/UI/SportIcon";
export default function HomePage() {
  const eventCategories = useSelector(getEventCategories);
  const [upcomingSports, setUpcomingSports] = React.useState(new Array());

  React.useEffect(() => {
    let upcomingSS = new Array();

    eventCategories.forEach((eventCategory: any) => {
      if (eventCategory.id == "HISTORICAL") {
        return;
      }

      let upcomingS = {
        id: eventCategory.id,
        title: eventCategory.title,
        games: new Array(),
        upcomingDate: 0,
      };

      eventCategory.eventGroup.forEach((eg: any) => {
        let games = [...eg.events.slice(0)];
        games.sort((a: any, b: any) => {
          return a.eventStart > b.eventStart ? 1 : -1;
        });

        if (upcomingS.upcomingDate == 0) {
          upcomingS.upcomingDate = games[0].eventStart;
        }
        let startDate = "";
        for (let i = 0; i < games.length; i++) {
          if (games[i].eventStart * 1000 < new Date().getTime()) {
            continue;
          }
          if (startDate == "") {
            startDate = ts2DateOptions(games[i].eventStart);
          }
          if (ts2DateOptions(games[i].eventStart) != startDate) {
            break;
          }
          upcomingS.games.push(games[i]);
        }
      });

      upcomingS.games.sort((a: any, b: any) => {
        return a.eventStart > b.eventStart ? 1 : -1;
      });

      upcomingS.games = upcomingS.games.filter((a: any) => {
        return (
          ts2DateOptions(a.eventStart) ==
          ts2DateOptions(upcomingS.games[0].eventStart)
        );
      });

      upcomingSS.push(upcomingS);
    });

    setUpcomingSports(upcomingSS);
  }, [eventCategories]);

  return (
    <div>
      <div className="py-4 px-4">
        <Carousel className="rounded-xl carousel">
          <img
            src="/banner/1.png"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="/banner/3.png"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="/banner/4.png"
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <img
            src="/banner/5.png"
            alt="image 4"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>

      {upcomingSports.map((upcomingSport: any, index: number) => (
        <div className="px-4 my-4" key={index}>
          <Typography variant="h6" className="flex my-2 text-primary_4">
            <SportIcon sportName={upcomingSport.id} color="text-primary_4" />
            &nbsp;Upcoming {upcomingSport.title}
          </Typography>
          <Card className="w-full px-4 py-4 bg-secondary_4">
            {upcomingSport.games.map((game: any, gIndex: number) => (
              <div key={gIndex}>
                <GameOverview finished={false} details={game} />
                <hr className="border-blue-gray-50 my-4" />
              </div>
            ))}
            <Typography variant="h5" className="mg-auto">
              <Link
                href={`/sports/event?event=${upcomingSport.id}`}
                className="flex text-white"
              >
                See all Upcoming {upcomingSport.title}&nbsp;{" "}
                <FaLongArrowAltRight className="mt-4px" color="white" />{" "}
              </Link>
            </Typography>
          </Card>
        </div>
      ))}
    </div>
  );
}
