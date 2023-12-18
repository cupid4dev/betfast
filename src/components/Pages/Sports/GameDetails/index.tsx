/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { BetDialog } from "@/components/UI/GameOverview/BetDialog";
import LineChart from "@/components/UI/LineChart";
import {
  Button,
  Card,
  Dialog,
  Option,
  Select,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getGameById, updateGame } from "@/redux/slice";
import { useSearchParams } from "next/navigation";
import SportIcon from "@/components/UI/SportIcon";
import { ts2TimeOptions, ts2TodayTomorrow } from "@/utils/timestamp";
import axios from "axios";
import mpRouter from "@/constants/mpRouter";
import { BiMenu, BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";

export default function GameDetails() {
  const [open, setOpen] = React.useState(false);
  const [isBack, setIsBack] = React.useState(true);
  const [team, setTeam] = React.useState(0);
  const [selectedMarketIndex, setSelectedMarketIndex] = React.useState(0);
  const [selectedOutcome, setSelectedOutcome] = React.useState(0);
  const [defaultPrice, setDefaultPrice] = React.useState(1);
  const [selectedABL, setSelectedABL] = React.useState(0);

  const searchParams = useSearchParams();
  const eventAccount = searchParams.get("eventAccount");
  const dispatch = useDispatch();
  const game = useSelector(getGameById("" + eventAccount));

  const handleOffer = (
    isBack: boolean,
    team: number,
    market: any,
    price: any,
  ) => {
    setIsBack(isBack);
    setTeam(team);
    setSelectedMarketIndex(market);
    setOpen(!open);
    setDefaultPrice(price == 0 ? 1 : price);
  };

  React.useEffect(() => {
    setTimeout(() => {
      axios.get(mpRouter.API_URL + "/event?id=" + eventAccount).then((data) => {
        if (data.status == 200) {
          dispatch(
            updateGame({
              id: eventAccount,
              game: data.data.event,
            }),
          );
        }
      });
    }, 0);
  }, [eventAccount]);

  return !game ? (
    <div className="w-full h-full t-0 l-0 backdrop-blur-xl place-content-center grid z-[500]">
      <Spinner className="h-16 w-16 text-gray-900/50" color="teal" />
    </div>
  ) : (
    <div className="p-4">
      <Typography variant="paragraph" className="flex text-white">
        <SportIcon sportName={game.category} color="white" />
        &nbsp;{game.eventGroupTitle}
      </Typography>
      <br />
      <Typography variant="h2" className="text-white">
        {game.eventName}
      </Typography>
      <div className="md:flex text-gray-200">
        <Typography variant="h6" className="md:float-left">
          {ts2TimeOptions(game.eventStart)}, {ts2TodayTomorrow(game.eventStart)}
          &nbsp;
        </Typography>
        <Typography variant="h6" className="md:float-left text-gray-400">
          Liquidity:{" "}
          <span className="text-highlight">
            ${game.totalLiquidity.toFixed(2)} USDC
          </span>
        </Typography>
        <div className="hidden md:block">&nbsp;|&nbsp;</div>
        <Typography variant="h6" className="md:float-left text-gray-400">
          Traded:{" "}
          <span className="text-highlight">
            ${game.totalMatched.toFixed(2)} USDC
          </span>
        </Typography>
        <br />
      </div>
      <div className="flex">
        <div className="float-left">
          <LineChart />
        </div>
      </div>
      {game.eventStart * 1000 < new Date().getTime() &&
      (!game.marketWithMP ||
        (game.marketWithMP.length > 0 && !game.marketWithMP[0].inplay)) ? (
        <div>This game is finished!</div>
      ) : (
        <div>
          <Tabs value={game.marketsWithMP[0].marketName}>
            <TabsHeader className="bg-transparent border-2 border-primary_light custom-tab w-fit mt-2">
              {game.marketsWithMP.map(({ marketName }) => (
                <Tab
                  key={marketName}
                  value={marketName}
                  className="md:min-w-[300px] "
                  onClick={() => {
                    setSelectedOutcome(0), setSelectedABL(0);
                  }}
                >
                  {marketName}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {game.marketsWithMP.map((market, index) => (
                <TabPanel key={market.marketName} value={market.marketName}>
                  <div className="md:flex">
                    <Card className="bg-secondary_4 md:mr-4 w-full mb-4">
                      <div key={index} className="p-4 my-2 w-full">
                        {market.outcomes.map((outcome, oIndex) => (
                          <div
                            key={oIndex}
                            className="relative mx-auto md:flex items-center w-full text-blue-gray-900"
                          >
                            <div className="md:float-left mr-auto">
                              <Typography
                                variant="h5"
                                className="md:ml-4 text-white text-center md:text-left mb-2 md:mb-0"
                              >
                                {outcome}
                              </Typography>
                              {oIndex != 0 && (
                                <Typography
                                  variant="h6"
                                  className="hidden md:block"
                                >
                                  &nbsp;
                                </Typography>
                              )}
                            </div>
                            <div className="flex md:block mr-4 text-gray-400">
                              <Typography variant="h6" className="text-right">
                                Last Traded:{" "}
                                {market.mp[oIndex].matchedPrices.length == 0
                                  ? "-"
                                  : market.mp[oIndex].matchedPrices[0]}
                              </Typography>
                              {oIndex != 0 && (
                                <Typography variant="h6">&nbsp;</Typography>
                              )}
                            </div>
                            {new Date().getTime() > game.eventStart * 1000 ? (
                              <Button variant="gradient" className="h-full">
                                FINISHED
                              </Button>
                            ) : (
                              <div className={`grid grid-cols-2 gap-2 md:flex`}>
                                <div className="my-2 col-span-1">
                                  {oIndex == 0 && (
                                    <Typography
                                      variant="paragraph"
                                      className="text-center text-ellipsis overflow-hidden max-w-160px mg-auto truncate text-gray-200"
                                    >
                                      BACK
                                    </Typography>
                                  )}
                                  <div className="md:flex">
                                    {market.mp[oIndex].listAgainstShow.map(
                                      (value, iIndex) => (
                                        <div
                                          key={iIndex}
                                          className={`${
                                            iIndex < 2 ? "hidden" : ""
                                          } md:block`}
                                        >
                                          <Button
                                            className={`float-left md:float-right w-[90%] md:w-[70px] px-1 mx-2 bg-transparent border-2 ${
                                              iIndex < 2
                                                ? "border-gray-200 text-gray-200"
                                                : "border-primary_4 text-primary_4"
                                            }`}
                                            onClick={() => {
                                              handleOffer(
                                                true,
                                                oIndex,
                                                index,
                                                value.price,
                                              );
                                            }}
                                          >
                                            {value.price != 0
                                              ? value.price
                                              : iIndex == 2
                                                ? "Offer"
                                                : "-"}
                                          </Button>
                                          <div className="text-gray-400 text-center mt-1">
                                            {value.price == 0
                                              ? ""
                                              : value.liquidityAmount}
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                                <div className="my-2 col-span-1">
                                  {oIndex == 0 && (
                                    <Typography
                                      variant="paragraph"
                                      className="text-center text-ellipsis overflow-hidden max-w-160px mg-auto truncate text-gray-200"
                                    >
                                      LAY
                                    </Typography>
                                  )}
                                  <div className="md:flex">
                                    {market.mp[oIndex].listForShow.map(
                                      (value, iIndex) => (
                                        <div
                                          key={iIndex}
                                          className={`${
                                            iIndex > 0 ? "hidden" : ""
                                          } md:block`}
                                        >
                                          <Button
                                            className={`float-right w-[90%] md:w-[70px] px-1 mx-2 bg-transparent border-2 ${
                                              iIndex > 0
                                                ? "border-gray-200 text-gray-200"
                                                : "border-highlight text-highlight"
                                            }`}
                                            onClick={() => {
                                              handleOffer(
                                                false,
                                                oIndex,
                                                index,
                                                value.price,
                                              );
                                            }}
                                          >
                                            {value.price != 0
                                              ? value.price
                                              : iIndex == 0
                                                ? "Offer"
                                                : "-"}
                                          </Button>
                                          <div className="text-gray-400 text-center mt-1">
                                            {value.price == 0
                                              ? ""
                                              : value.liquidityAmount}
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                    <div className="md:float-right w-full md:w-1/3 select-container">
                      <Select
                        variant="static"
                        label=""
                        value={market.outcomes[selectedOutcome]}
                        className="bg-secondary_4 border-none text-white rounded-lg selection:outline-none text-2xl outcome-select"
                      >
                        {market.outcomes.map((outcome, oIndex) => (
                          <Option
                            key={oIndex}
                            onClick={() => {
                              setSelectedOutcome(oIndex);
                            }}
                          >
                            {outcome}
                          </Option>
                        ))}
                      </Select>
                      <div className="flex mt-2 w-full">
                        <Typography
                          variant="h5"
                          className="text-gray-200 float-left mr-auto"
                        >
                          Order Book
                        </Typography>
                        <Button
                          className={`float-right p-1  bg-secondary_4 ${
                            selectedABL == 0 && "bg-primary_light"
                          } mx-1`}
                          onClick={() => {
                            setSelectedABL(0);
                          }}
                        >
                          <BiMenu className="h-5 w-5 text-white" />
                        </Button>
                        <Button
                          className={`float-right p-1 bg-secondary_4 ${
                            selectedABL == 1 && "bg-primary_light"
                          } mx-1`}
                          onClick={() => {
                            setSelectedABL(1);
                          }}
                        >
                          <BiMenuAltLeft className="h-5 w-5 text-white" />
                        </Button>
                        <Button
                          className={`float-right p-1 bg-secondary_4 ${
                            selectedABL == 2 && "bg-primary_light"
                          } mx-1`}
                          onClick={() => {
                            setSelectedABL(2);
                          }}
                        >
                          <BiMenuAltRight className="h-5 w-5 text-white" />
                        </Button>
                      </div>

                      <div className="flex w-full mt-2 place-content-between">
                        <Typography
                          variant="h6"
                          className="text-gray-400 w-full text-left"
                        >
                          Price
                        </Typography>
                        <Typography
                          variant="h6"
                          className="text-gray-400 w-full text-center"
                        >
                          Amount (USDC)
                        </Typography>
                        <Typography
                          variant="h6"
                          className="text-gray-400 w-full text-right"
                        >
                          Traded (USDC)
                        </Typography>
                      </div>

                      {selectedABL != 2 &&
                        market.mp[selectedOutcome] &&
                        market.mp[selectedOutcome].listFor.map(
                          (item, lIndex) => (
                            <div className="relative" key={lIndex}>
                              <div
                                className={`absolute h-full top-0 right-0 opacity-30 bg-primary_light -z-10`}
                                style={{
                                  width: `${(
                                    (item.liquidityAmount * 100) /
                                    market.mp[selectedOutcome].maxLiquidity
                                  ).toFixed(0)}%`,
                                }}
                              ></div>
                              <div className="flex w-full mt-2 place-content-between">
                                <Typography
                                  variant="h6"
                                  className="text-white w-full text-left"
                                >
                                  {item.price}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  className={`text-white ${
                                    item.liquidityAmount == 0 && "text-gray-400"
                                  } w-full text-center`}
                                >
                                  {item.liquidityAmount == 0
                                    ? "-"
                                    : item.liquidityAmount}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  className={`text-white ${
                                    item.liquidityAmount == 0 && "text-gray-400"
                                  } w-full text-right`}
                                >
                                  {item.matchedAmount == 0
                                    ? "-"
                                    : item.matchedAmount}
                                </Typography>
                              </div>
                            </div>
                          ),
                        )}
                      {market.mp[selectedOutcome] &&
                        market.mp[selectedOutcome].matchedPrices.map(
                          (item, lIndex) => (
                            <div
                              className="flex w-full mt-2 place-content-between"
                              key={lIndex}
                            >
                              <Typography
                                variant="h5"
                                className="text-white w-full text-left"
                              >
                                {item}
                              </Typography>
                              <Typography
                                variant="h5"
                                className="text-white w-full text-center"
                              >
                                &nbsp;
                              </Typography>
                              <Typography
                                variant="h6"
                                className="text-gray-400 w-full text-right"
                              >
                                Matched
                              </Typography>
                            </div>
                          ),
                        )}
                      {selectedABL != 1 &&
                        market.mp[selectedOutcome] &&
                        market.mp[selectedOutcome].listAgainst.map(
                          (item, lIndex) => (
                            <div className="relative" key={lIndex}>
                              <div
                                className={`absolute h-full top-0 right-0 opacity-30 bg-highlight -z-10`}
                                style={{
                                  width: `${(
                                    (item.liquidityAmount * 100) /
                                    market.mp[selectedOutcome].maxLiquidity
                                  ).toFixed(0)}%`,
                                }}
                              ></div>
                              <div className="flex w-full mt-2 place-content-between">
                                <Typography
                                  variant="h6"
                                  className="text-white w-full text-left"
                                >
                                  {item.price}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  className={`text-white ${
                                    item.liquidityAmount == 0 && "text-gray-400"
                                  } w-full text-center`}
                                >
                                  {item.liquidityAmount == 0
                                    ? "-"
                                    : item.liquidityAmount}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  className={`text-white ${
                                    item.liquidityAmount == 0 && "text-gray-400"
                                  } w-full text-right`}
                                >
                                  {item.matchedAmount == 0
                                    ? "-"
                                    : item.matchedAmount}
                                </Typography>
                              </div>
                            </div>
                          ),
                        )}
                    </div>
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      )}

      <Dialog open={open} handler={() => {}}>
        <BetDialog
          handleOpen={handleOffer}
          details={game}
          isBack={isBack}
          team={team}
          marketIndex={selectedMarketIndex}
          defaultPrice={defaultPrice}
        />
      </Dialog>
    </div>
  );
}
