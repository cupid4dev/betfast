"use client";
import React from "react";
import GameOverview from "@/components/UI/GameOverview";
import { getEventCategories } from "@/redux/slice";
import { Card, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { ts2LWDDLMYYYY } from "@/utils/timestamp";

export default function League() {
  const searchParams = useSearchParams();
  const sport = searchParams.get("sport");
  const league = searchParams.get("league");

  const eventCategories = useSelector(getEventCategories);
  const [selectedLeague, setSelectedLeague] = React.useState({
    title: "",
    events: [
      {
        fDate: String,
      },
    ],
  });

  React.useEffect(() => {
    const sIndex = eventCategories.findIndex((v: any) => {
      return v.id == sport;
    });
    if (sIndex == -1) {
      return;
    }
    const lIndex = eventCategories[sIndex].eventGroup.findIndex((v: any) => {
      return v.id == league;
    });
    if (lIndex == -1) {
      return;
    }

    let sl = [...eventCategories[sIndex].eventGroup[lIndex].events.slice(0)];
    sl.sort((a: any, b: any) => {
      return a.eventStart > b.eventStart ? 1 : -1;
    });
    sl.forEach((item, index) => {
      // Create a new object with the existing properties of `item`
      const newItem = { ...item };

      // Add the new property `fDate` to the new object
      newItem.fDate = ts2LWDDLMYYYY(item.eventStart);

      // Replace the old item with the new one in the array
      sl[index] = newItem;
    });

    // Create a Map to store the grouped items
    const groupedItemsMap = sl.reduce((acc, item) => {
      // Clone the item without the fDate property
      const { fDate, ...itemWithoutFDate } = item;

      // If the fDate property is not in the Map, add an entry with an array containing the item
      if (!acc.has(fDate)) {
        acc.set(fDate, [itemWithoutFDate]);
      } else {
        // If the fDate property is already in the Map, push the item to the existing array
        acc.get(fDate)?.push(itemWithoutFDate);
      }

      return acc;
    }, new Map<string, any[]>());

    setSelectedLeague({
      title: eventCategories[sIndex].eventGroup[lIndex].title,
      events: Array.from(groupedItemsMap, ([fDate, items]) => ({
        fDate,
        items,
      })),
    });
  }, [eventCategories, sport, league]);

  return (
    <div>
      <div className="py-4 px-4">
        <Typography variant="h2">{selectedLeague.title}</Typography>
        {selectedLeague.events.map((event: any, eIndex: number) => (
          <div key={eIndex}>
            <p>&nbsp;</p>
            <Typography variant="h5">{event.fDate}</Typography>
            <Card className="w-full px-4 py-4">
              {event.items &&
                event.items.map((item: any, iIndex: number) => (
                  <div key={iIndex}>
                    <GameOverview finished details={item} />
                    {event.items[iIndex + 1] !== undefined && (
                      <hr className="border-blue-gray-50 my-4" />
                    )}
                  </div>
                ))}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
