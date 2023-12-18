/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import GameOverview from "@/components/UI/GameOverview";
import { getUpcomings, updateUpcomings } from "@/redux/slice";
import { Card, Carousel, Spinner, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SportIcon from "@/components/UI/SportIcon";
import axios from "axios";
import mpRouter from "@/constants/mpRouter";
export default function HomePage() {
  const dispatch = useDispatch();
  const upcomings = useSelector(getUpcomings);

  React.useEffect(() => {
    axios.get(mpRouter.API_URL + "/upcomings").then((data) => {
      if (data.status == 200) {
        dispatch(updateUpcomings(data.data.upcomings));
      }
    });
  }, []);

  return upcomings.length == 0 ? (
    <div className="w-full h-full t-0 l-0 backdrop-blur-xl place-content-center grid z-[500]">
      <Spinner className="h-16 w-16 text-gray-900/50" color="teal" />
    </div>
  ) : (
    <div>
      <div className="py-4 px-4 h-fit">
        <Carousel className="rounded-xl carousel">
          <img
            src="/banner/1.png"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="/banner/2.png"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="/banner/3.png"
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <img
            src="/banner/4.png"
            alt="image 4"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>

      {upcomings.map((upcomingSport: any, index: number) => (
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
