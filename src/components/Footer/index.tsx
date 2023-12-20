/* eslint-disable @next/next/no-img-element */
import { Typography } from "@material-tailwind/react";
import Link from "next/link";

const footerData = [
  {
    title: "COMPANY",
    contents: [
      {
        label: "About us",
        link: "#",
      },
      {
        label: "Careers",
        link: "#",
      },
      {
        label: "The Monaco Protocol",
        link: "https://www.monacoprotocol.xyz/",
      },
      {
        label: "Home",
        link: "/",
      },
      {
        label: "Register",
        link: "/register",
      },
    ],
  },
  {
    title: "SOCIAL",
    contents: [
      {
        label: "Twitter",
        link: "#",
      },
      {
        label: "Tiktok",
        link: "#",
      },
      {
        label: "Discord",
        link: "#",
      },
      {
        label: "Linkedin",
        link: "#",
      },
    ],
  },
  {
    title: "RESOURCES",
    contents: [
      {
        label: "Terms of use",
        link: "#",
      },
      {
        label: "Exchange rules and regulations",
        link: "#",
      },
      {
        label: "Privacy Policy",
        link: "#",
      },
      {
        label: "Contact",
        link: "#",
      },
    ],
  },
];

export default function Footer() {
  return (
    <div className="bg-secondary_back text-white mx-auto md:p-4 w-full">
      <div className="flex w-full bg-gray-mdark py-[10px] text-center text-white md:m-4">
        <div className="float-left mr-auto hidden md:block">
          <img src="/logo.png" className="w-48 block" alt="logo"></img>
          <Typography variant="h6" className="block my-2">
            The global decentralized sports betting exchange, powered by The
            Monaco Protocol
          </Typography>
        </div>
        <div className="float-right mx-4">
          <div className={`grid grid-cols-3 gap-3 md:flex md:min-w-[700px]`}>
            {footerData.map((data, key) => (
              <div className="my-2 col-span-1 text-left w-full" key={key}>
                <Typography variant="h6" className="text-gray-400 mb-4">
                  {data.title}
                </Typography>
                {data.contents.map((content, cIndex) => (
                  <Link href={content.link} key={cIndex}>
                    <Typography variant="small" className="text-white my-2">
                      {content.label}
                    </Typography>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
