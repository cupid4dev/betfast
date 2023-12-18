"use client";

import GameOverview from "@/components/UI/GameOverview";
import SportIcon from "@/components/UI/SportIcon";
import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function MatchesPage({ sport }: { sport: any }) {
  return (
    <div>
      {sport &&
        sport.matches.map((league: any, leagueIndex: number) => (
          <div key={leagueIndex} className="mt-4">
            <Typography variant="h6" className="flex my-2 text-white">
              <SportIcon sportName={sport.id} color="white" />
              &nbsp;{league.title}
            </Typography>
            <Card className="w-full px-4 py-4 bg-secondary_4">
              {league.games.map((game: any, gIndex: number) => (
                <div key={gIndex}>
                  <GameOverview finished={false} details={game} />
                  <hr className="border-blue-gray-50 my-4" />
                </div>
              ))}
              <Typography variant="h5" className="mg-auto text-white">
                <Link
                  href={`/sports/league?sport=${sport.id}&league=${league.id}`}
                  className="flex"
                >
                  See all {league.title} matches!&nbsp;{" "}
                  <FaLongArrowAltRight className="mt-4px" />{" "}
                </Link>
              </Typography>
            </Card>
          </div>
        ))}
    </div>
  );
}
