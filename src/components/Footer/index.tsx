import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <div className="bg-secondary_back text-white mx-auto max-w-screen-xl p-2 ">
      <div className="flex w-full justify-center space-x-2 bg-gray-mdark py-[10px] text-center text-white">
        <Typography className="text-xl">© 2023 </Typography>
        <Typography className="text-xl font-bold">Bet Fast.</Typography>
        <Typography className="text-xl">All Rights Reserved.</Typography>
      </div>
    </div>
  );
}
