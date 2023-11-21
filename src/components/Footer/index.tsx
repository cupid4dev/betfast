import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <div className=" border-t border-gray-400 bg-white text-white mx-auto max-w-screen-xl p-2 ">
      <div className="flex w-full justify-center space-x-2 bg-gray-mdark py-[10px] text-center text-black">
        <Typography className="text-xl">© 2023 </Typography>
        <Typography className="text-xl font-bold">Lorem Ipsum.</Typography>
        <Typography className="text-xl">All Rights Reserved.</Typography>
      </div>
    </div>
  );
}
