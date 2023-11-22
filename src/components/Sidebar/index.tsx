import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { TbBallFootball } from "react-icons/tb";
import { CiBasketball } from "react-icons/ci";
import { GiHockey } from "react-icons/gi";
import { SiNba } from "react-icons/si";
import Link from "next/link";
import { getEventCategories } from "@/redux/slice";
import { useSelector } from "react-redux";
import SportIcon from "../UI/SportIcon";
import Divider from "../UI/Divider";

export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const eventCategories = useSelector(getEventCategories);
  return (
    <Card className="static h-[calc(100vh-2rem)] w-[300px] p-4 border-r-2 border-gray-500  rounded-none">
      <List>
        <Typography variant="h6">Popular</Typography>
        <ListItem>
          <ListItemPrefix>
            <TbBallFootball className="h-5 w-5" />
          </ListItemPrefix>
          Euro Qualifiers
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CiBasketball className="h-5 w-5" />
          </ListItemPrefix>
          College Basketball
        </ListItem>
        <Link href="/sports/nfl">
          <ListItem>
            <ListItemPrefix>
              <GiHockey className="h-5 w-5" />
            </ListItemPrefix>
            NHL
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <SiNba className="h-5 w-5" />
          </ListItemPrefix>
          NBA
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <Typography variant="h6">SPORTS</Typography>
        {eventCategories.map(
          (item: any, index: number) =>
            item.id !== "HISTORICAL" && (
              <div key={index}>
                {item.id !== "CSGO" && <Divider />}
                <Accordion
                  open={open === index}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === index}>
                    <AccordionHeader
                      onClick={() => handleOpen(index)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix>
                        <SportIcon sportName={item.id} />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                      >
                        {item.title}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {item.eventGroup.map(
                        (eventGroup: any, egIndex: number) => (
                          <Link
                            href={
                              "/sports/league?sport=" +
                              item.id +
                              "&league=" +
                              eventGroup.id
                            }
                            key={egIndex}
                          >
                            <ListItem>
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-5"
                                />
                              </ListItemPrefix>
                              {eventGroup.title}
                            </ListItem>
                          </Link>
                        ),
                      )}
                    </List>
                  </AccordionBody>
                </Accordion>
              </div>
            ),
        )}
      </List>
    </Card>
  );
}
