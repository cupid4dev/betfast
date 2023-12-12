"use client";
import React from "react";
import { getEventCategories } from "@/redux/slice";
import { Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import MatchesPage from "./Matches";
import CompetitionPage from "./Competitions";

export default function SportEventPage() {
  const eventCategories = useSelector(getEventCategories);

  const [selectedEvent, setSelectedEvent] = React.useState({
    title: "",
  });

  const searchParams = useSearchParams();
  const event = searchParams.get("event");

  const tabData = [
    {
      label: "Matches",
      value: "matches",
    },
    {
      label: "Competitions",
      value: "competitions",
    },
  ];

  React.useEffect(() => {
    setSelectedEvent(
      eventCategories.find((ec: any) => {
        return ec.id == event;
      }),
    );
  }, [event, eventCategories]);

  return (
    selectedEvent && (
      <div>
        <div className="py-4 px-4">
          <Typography variant="h2" className="text-white">
            {selectedEvent.title}
          </Typography>

          <Tabs value="matches" className="mt-4">
            <TabsHeader className="w-200px bg-transparent border-2 border-primary_light custom-tab">
              {tabData.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {tabData.map(({ value }) => (
                <TabPanel key={value} value={value}>
                  {value == "matches" ? (
                    <MatchesPage event={selectedEvent} />
                  ) : (
                    <CompetitionPage event={selectedEvent} />
                  )}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    )
  );
}
