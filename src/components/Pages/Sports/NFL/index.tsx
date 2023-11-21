'use client'
import GameOverview from "@/components/UI/GameOverview";
import { Card, Typography } from "@material-tailwind/react";

export default function NFL() {
  return <div>
    <div className="py-4 px-4">
      <Typography variant="h2">NFL</Typography>
      <p>&nbsp;</p>
      <Typography variant="h5">Monday, 20 November, 2023</Typography>
      <Card className="w-full px-4 py-4">
        <GameOverview finished/>
        <hr className="border-blue-gray-50 my-4" />
        <GameOverview finished={false}/>
      </Card>
      <p>&nbsp;</p>
      <Typography variant="h5">Tuesday, 21 November, 2023</Typography>
      <Card className="w-full px-4 py-4">
        <GameOverview finished/>
        <hr className="border-blue-gray-50 my-4" />
        <GameOverview finished={false}/>
      </Card>
    </div>
  </div>;
}
