/* eslint-disable react-hooks/exhaustive-deps */
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
  Spinner,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  getMenuList,
  updateBFEmail,
  updateBFUser,
  updateMenuList,
} from "@/redux/slice";
import { useDispatch, useSelector } from "react-redux";
import SportIcon from "../UI/SportIcon";
import Divider from "../UI/Divider";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import MP_CONSTS from "@/constants/mpRouter";

export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [isMenu, setIsMenu] = React.useState(false);
  const menuList = useSelector(getMenuList);
  const dispatch = useDispatch();

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  React.useEffect(() => {
    const bfEmail = localStorage.getItem("betfast-email");
    const bfUser = localStorage.getItem("betfast-user");
    if (bfEmail) {
      dispatch(updateBFEmail(bfEmail));
    }

    if (bfUser) {
      dispatch(updateBFUser(JSON.parse(bfUser)));
    }

    axios.get(MP_CONSTS.API_URL + "/menulist").then((data) => {
      if (data.status == 200) {
        dispatch(updateMenuList(data.data));
      }
    });
  }, []);

  return menuList.sports.length == 0 ? (
    <div className="fixed w-full h-full t-0 l-0 backdrop-blur-xl bg-secondary_back place-content-center grid z-[500]">
      <Spinner className="h-16 w-16 text-gray-900/50" color="teal" />
    </div>
  ) : (
    <Card
      className={`fixed z-[60] w-[300px] h-screen p-4 border-r-2 bg-secondary_back border-none  rounded-none overflow-y-auto pt-20 md:static md:left-0 md:h-auto left-\[${
        !isMenu ? "-300px" : "0px"
      }\] transition-all no-scrollbar`}
    >
      <List className="">
        <Typography variant="h6" className="text-primary_4">
          Popular
        </Typography>
        {menuList.popLeagues.map((popLeague: any, index: number) => (
          <Link
            href={`/sports/league?league=${popLeague.id}`}
            key={index}
            onClick={handleMenu}
          >
            <ListItem className="text-white">
              <ListItemPrefix>
                <SportIcon color="white" sportName={popLeague.sport} />
              </ListItemPrefix>
              {popLeague.title}
            </ListItem>
          </Link>
        ))}
        <Divider />
        <Typography variant="h6" className="text-primary_4">
          SPORTS
        </Typography>
        {menuList.sports.map(
          (item: any, index: number) =>
            item.id !== "HISTORICAL" && (
              <div key={index}>
                {item.id == "CSGO" && <Divider />}
                <Accordion
                  open={open === index}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      color="white"
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === index}>
                    <Link
                      href={`/sports/event?event=${item.id}`}
                      className="w-full"
                    >
                      <AccordionHeader
                        onClick={() => handleOpen(index)}
                        className="border-b-0 p-3"
                      >
                        <ListItemPrefix>
                          <SportIcon color="white" sportName={item.id} />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="mr-auto font-normal text-white"
                        >
                          {item.title}
                        </Typography>
                      </AccordionHeader>
                    </Link>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {item.leagues.map((eventGroup: any, egIndex: number) => (
                        <Link
                          href={"/sports/league?league=" + eventGroup.id}
                          key={egIndex}
                          onClick={handleMenu}
                        >
                          <ListItem className="text-white">
                            <ListItemPrefix>
                              <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-5"
                              />
                            </ListItemPrefix>
                            {eventGroup.title}
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              </div>
            ),
        )}
      </List>
      <div
        id="a"
        className={`md:hidden fixed left-[${
          !isMenu ? "15px" : "285px"
        }] top-2/4 transition-all opacity-90`}
        onClick={handleMenu}
      >
        <div className="animate-bounce">
          <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-secondary_4 via-primary_light to-primary_4 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <div
            title="Get quote now"
            className="relative inline-flex items-center justify-center p-4 text-lg font-bold text-white transition-all duration-200 bg-secondary_back font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button"
          >
            {!!isMenu ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
          </div>
        </div>
      </div>
    </Card>
  );
}
