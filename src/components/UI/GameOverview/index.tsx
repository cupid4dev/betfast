/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { BetDialog } from "./BetDialog";
import { Button, Typography, Dialog } from "@material-tailwind/react";
import { ts2DateOptions, ts2TimeOptions } from "@/utils/timestamp";
import SportIcon from "../SportIcon";

export default function GameOverview({
  details,
}: {
  finished: boolean;
  details: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [isBack, setIsBack] = React.useState(true);
  const [selectedTeam, setSelectedTeam] = React.useState(0);
  const [defaultPrice, setDefaultPrice] = React.useState(0);

  const handleOffer = (
    argIsBack: boolean = true,
    argSelectedTeam: number = 0,
    price: number = 0,
  ) => {
    setIsBack(argIsBack);
    setSelectedTeam(argSelectedTeam);
    setOpen(!open);
    setDefaultPrice(price);
  };

  return (
    details && (
      <div>
        <div className="relative mx-auto grid md:flex items-center w-full text-blue-gray-900">
          <Link
            className="float-left mr-auto"
            href={"/sports/gamedetails?eventAccount=" + details.eventAccount}
          >
            <Typography variant="paragraph" className="flex text-gray-400">
              <SportIcon sportName={details.category} color={"white"} />
              &nbsp;{details.eventGroupTitle}
            </Typography>
            <Typography variant="h6" className="text-white">
              {" "}
              {details.participants[0].name} vs {details.participants[1].name}{" "}
            </Typography>
            <Typography variant="paragraph" className="text-gray-400">
              {" "}
              Liquidity:{" "}
              <span className="text-highlight">
                ${details.totalLiquidity.toFixed(2)} USDC
              </span>{" "}
              <br className="md:hidden" />
              <span className="hidden md:inline-flex">
                {" "}
                |&nbsp;
              </span>Traded:{" "}
              <span className="text-highlight">
                ${details.totalMatched.toFixed(2)} USDC
              </span>
            </Typography>
          </Link>
          <div className="mr-4 flex md:block text-gray-400">
            <Typography variant="h6" className="text-right">
              {ts2TimeOptions(details.eventStart)}
            </Typography>
            <Typography variant="h6">
              &nbsp;{ts2DateOptions(details.eventStart)}
            </Typography>
          </div>

          {new Date().getTime() > details.eventStart * 1000 &&
          (!details.marketWithMP ||
            (details.marketWithMP.length > 0 &&
              !details.marketWithMP[0].inplay)) ? (
            <Button variant="gradient" disabled className="h-full">
              FINISHED
            </Button>
          ) : (
            <div
              className={`grid grid-cols-${details.marketsWithMP[0].outcomes.length} gap-${details.marketsWithMP[0].outcomes.length} md:flex`}
            >
              {details.marketsWithMP[0].outcomes.map(
                (outcome: any, index: number) => (
                  <div className="my-2 col-span-1 md:mx-2" key={index}>
                    <Typography
                      variant="paragraph"
                      className="text-center text-ellipsis overflow-hidden max-w-160px mg-auto truncate text-white"
                    >
                      {outcome}
                    </Typography>
                    <div className="md:flex">
                      <div>
                        <Button
                          className="md:mr-4 md:float-left w-full md:w-[100px] px-1 my-1 bg-transparent border-primary_4 border-2 text-primary_4"
                          onClick={() => {
                            handleOffer(
                              true,
                              index,
                              details.marketsWithMP[0].mp[index].maxAgainst <= 0
                                ? 1
                                : details.marketsWithMP[0].mp[index].maxAgainst,
                            );
                          }}
                        >
                          {details.marketsWithMP[0].mp[index].maxAgainst <= 0
                            ? "Back"
                            : details.marketsWithMP[0].mp[index].maxAgainst}
                        </Button>
                        <div className="text-gray-400 text-center md:mr-4">
                          {details.marketsWithMP[0].mp[index]
                            .maxAgainstLiquidity <= 0
                            ? " "
                            : details.marketsWithMP[0].mp[index]
                                .maxAgainstLiquidity}
                        </div>
                      </div>
                      <div>
                        <Button
                          className="md:float-right w-full md:w-[100px] px-1 my-1 bg-transparent border-highlight border-2 text-highlight"
                          onClick={() => {
                            handleOffer(
                              false,
                              index,
                              details.marketsWithMP[0].mp[index].minFor <= 0
                                ? 1
                                : details.marketsWithMP[0].mp[index].minFor,
                            );
                          }}
                        >
                          {details.marketsWithMP[0].mp[index].minFor <= 0
                            ? "Back"
                            : details.marketsWithMP[0].mp[index].minFor}
                        </Button>
                        <div className="text-gray-400 text-center">
                          {details.marketsWithMP[0].mp[index].minForLiquidity <=
                          0
                            ? " "
                            : details.marketsWithMP[0].mp[index]
                                .minForLiquidity}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
          <Dialog open={open} handler={() => {}}>
            <BetDialog
              handleOpen={handleOffer}
              details={details}
              isBack={isBack}
              team={selectedTeam}
              marketIndex={-1}
              defaultPrice={defaultPrice}
            />
          </Dialog>
        </div>
      </div>
    )
  );
}
