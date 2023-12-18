"use client";

import SportIcon from "@/components/UI/SportIcon";
import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function CompetitionPage({ sport }: { sport: any }) {
  return (
    <div>
      {sport.competitions &&
        sport.competitions.map((eg: any, egIndex: number) => (
          <div key={egIndex} className="mt-4 w-full">
            <Link href={`/sports/league?league=${eg.id}`}>
              <Card className="p-2 w-full bg-secondary_4">
                <div className="flex my-2 w-full">
                  <div className="mt-1 float-left">
                    <SportIcon sportName={sport.id} color="white" />
                  </div>
                  <Typography variant="h5" className="float-left text-white">
                    &nbsp;{eg.title}
                  </Typography>
                  <div className="float-right ml-auto mr-2">
                    <FaLongArrowAltRight className="mt-4px" color="white" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        ))}
    </div>
  );
}
