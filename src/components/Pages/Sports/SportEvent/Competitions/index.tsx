"use client";

import SportIcon from "@/components/UI/SportIcon";
import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

export default function CompetitionPage({ event }: { event: any }) {
  return (
    <div>
      {event.eventGroup &&
        event.eventGroup.map((eg: any, egIndex: number) => (
          <div key={egIndex} className="mt-4 w-full">
            <Link href={`/sports/league?sport=${event.id}&league=${eg.id}`}>
              <Card className="p-2 w-full">
                <div className="flex my-2 w-full">
                  <div className="mt-1 float-left">
                    <SportIcon sportName={event.id} />
                  </div>
                  <Typography variant="h5" className="float-left">
                    &nbsp;{eg.title}
                  </Typography>
                  <div className="float-right ml-auto ">
                    <BiRightArrowAlt className="float-right mt-1" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        ))}
    </div>
  );
}
