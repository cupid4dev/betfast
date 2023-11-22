"use client";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { GiTennisRacket } from "react-icons/gi";
import { TbBallFootball } from "react-icons/tb";
import { GiHockey } from "react-icons/gi";
import { CiBasketball } from "react-icons/ci";
import { TbCricket } from "react-icons/tb";
import { GiCrosshair } from "react-icons/gi";

export default function SportIcon({ sportName }: { sportName: string }) {
  return sportName == "TENNIS" ? (
    <GiTennisRacket className="h-5 w-5" />
  ) : sportName == "AMERICAN_FOOTBALL" ? (
    <IoAmericanFootballOutline className="h-5 w-5" />
  ) : sportName == "ICEHOCKEY" ? (
    <GiHockey className="h-5 w-5" />
  ) : sportName == "BASKETBALL" ? (
    <CiBasketball className="h-5 w-5" />
  ) : sportName == "T20" ? (
    <TbCricket className="h-5 w-5" />
  ) : sportName == "CSGO" ? (
    <GiCrosshair className="h-5 w-5" />
  ) : (
    <TbBallFootball className="h-5 w-5" />
  );
}
