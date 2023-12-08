"use client";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { BiTennisBall } from "react-icons/bi";
import { TbBallFootball } from "react-icons/tb";
import { LiaHockeyPuckSolid } from "react-icons/lia";
import { CiBasketball } from "react-icons/ci";
import { TbBallBaseball } from "react-icons/tb";
import { GiCrosshair } from "react-icons/gi";
import { BiCricketBall } from "react-icons/bi";
import { MdSportsEsports } from "react-icons/md";
import { MdSportsMma } from "react-icons/md";
import { GiBoxingGlove } from "react-icons/gi";
import { MdSportsGolf } from "react-icons/md";
import { MdOutlineSportsRugby } from "react-icons/md";
import { RiBilliardsFill } from "react-icons/ri";

export default function SportIcon({ sportName }: { sportName: string }) {
  return sportName == "TENNIS" ? (
    <BiTennisBall className="h-5 w-5" />
  ) : sportName == "AMERICAN_FOOTBALL" ? (
    <IoAmericanFootballOutline className="h-5 w-5" />
  ) : sportName == "ICEHOCKEY" ? (
    <LiaHockeyPuckSolid className="h-5 w-5" />
  ) : sportName == "BASKETBALL" || sportName == "CBB" ? (
    <CiBasketball className="h-5 w-5" />
  ) : sportName == "BASEBALL" ? (
    <TbBallBaseball className="h-5 w-5" />
  ) : sportName == "CSGO" ? (
    <GiCrosshair className="h-5 w-5" />
  ) : sportName == "CRICKET" || sportName == "T20" ? (
    <BiCricketBall className="h-5 w-5" />
  ) : sportName == "ESPORTS" || sportName == "DOTA" || sportName == "LOL" ? (
    <MdSportsEsports className="h-5 w-5" />
  ) : sportName == "MMA" ? (
    <MdSportsMma className="h-5 w-5" />
  ) : sportName == "BOXING" ? (
    <GiBoxingGlove className="h-5 w-5" />
  ) : sportName == "GOLF" ? (
    <MdSportsGolf className="h-5 w-5" />
  ) : sportName == "RUGBY" ? (
    <MdOutlineSportsRugby className="h-5 w-5" />
  ) : sportName == "SNOOKER" ? (
    <RiBilliardsFill className="h-5 w-5" />
  ) : (
    <TbBallFootball className="h-5 w-5" />
  );
}
