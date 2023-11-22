'use client'

import { getAppState, activeAppState } from "@/redux/slice";
import { Typography } from "@material-tailwind/react"
import { useSelector, useDispatch } from "react-redux";

export default function HelpPage() {
  const appState: any = useSelector(getAppState);
  const dispatch = useDispatch();

  const setAppState = () => {
    dispatch(activeAppState(appState + 1));
  }

  return <div className='p-4'>
    <div>Items in Cart: {appState}</div>
    <button value="Add" type="button" onClick={setAppState}>
      Add
    </button>
    <Typography variant="h2"> Deep Dive BETFAST — A Decentralized Sports Betting Protocol</Typography>
    <Typography variant="paragraph">
      BETFAST is a decentralized sports betting platform that operates on the Solana blockchain.<br/>
      Rightly addressed by one of the cofounders of BETFAST, Varun Sudhakar, that despite the titanic sports betting business, it seems specious with no coherent answers to-<br/>
      “why can you still not visually track the value of your bet in real-time? Why can’t you easily cash out? Why can’t you bet with your friends?”<br/>
      Lets zero in to the BETFAST protocol and how it is ushering in an era of trustless sport betting.<br/>
    </Typography>
  </div>
}
