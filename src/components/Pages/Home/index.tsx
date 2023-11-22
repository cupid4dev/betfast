/* eslint-disable @next/next/no-img-element */
"use client";
import GameOverview from "@/components/UI/GameOverview";
import { Card, Carousel, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiTennisRacket } from "react-icons/gi";
export default function HomePage() {
  return (
    <div>
      <div className="py-4 px-4">
        <Carousel className="rounded-xl carousel">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>

      <div className="px-4">
        <Typography variant="h6" className="flex">
          <GiTennisRacket className="h-5 w-5" />
          &nbsp;Upcoming Tennis
        </Typography>
        <Card className="w-full px-4 py-4">
          <GameOverview finished={false} />
          <hr className="border-blue-gray-50 my-4" />
          <GameOverview finished={false} />
          <hr className="border-blue-gray-50 my-4" />
          <Typography variant="h5" className="mg-auto">
            <Link href="/home" className="flex">
              See all Upcoming Tennis&nbsp;{" "}
              <FaLongArrowAltRight className="mt-4px" />{" "}
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
