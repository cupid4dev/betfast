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

export default function SportIcon({
  sportName,
  color = "white",
}: {
  sportName: string;
  color: string;
}) {
  return sportName == "TENNIS" ? (
    <BiTennisBall className="h-5 w-5" color={color} />
  ) : sportName == "AMERICAN_FOOTBALL" ? (
    <IoAmericanFootballOutline className="h-5 w-5" color={color} />
  ) : sportName == "ICEHOCKEY" ? (
    <LiaHockeyPuckSolid className="h-5 w-5" color={color} />
  ) : sportName == "BASKETBALL" || sportName == "CBB" ? (
    <CiBasketball className="h-5 w-5" color={color} />
  ) : sportName == "BASEBALL" ? (
    <TbBallBaseball className="h-5 w-5" color={color} />
  ) : sportName == "CSGO" ? (
    <GiCrosshair className="h-5 w-5" color={color} />
  ) : sportName == "CRICKET" || sportName == "T20" ? (
    <BiCricketBall className="h-5 w-5" color={color} />
  ) : sportName == "ESPORTS" || sportName == "DOTA" || sportName == "LOL" ? (
    <MdSportsEsports className="h-5 w-5" color={color} />
  ) : sportName == "MMA" ? (
    <MdSportsMma className="h-5 w-5" color={color} />
  ) : sportName == "BOXING" ? (
    <GiBoxingGlove className="h-5 w-5" color={color} />
  ) : sportName == "GOLF" ? (
    <MdSportsGolf className="h-5 w-5" color={color} />
  ) : sportName == "RUGBY" ? (
    <MdOutlineSportsRugby className="h-5 w-5" color={color} />
  ) : sportName == "SNOOKER" ? (
    <RiBilliardsFill className="h-5 w-5" color={color} />
  ) : (
    <TbBallFootball className="h-5 w-5" color={color} />
  );
}
