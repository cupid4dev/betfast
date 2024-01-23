'use client';
import { useProgram } from '@/context/ProgramContext';
import { Button, Input, Typography } from '@material-tailwind/react';
import { createProduct } from '@monaco-protocol/client';
import { PublicKey } from '@solana/web3.js';
import React from 'react';
import { ToastContainer, toast } from "react-toastify";

export default function AdminPage() {
  const [authorityPk, setAuthorityPk] = React.useState("");
  const [commissionRate, setCommissionRate] = React.useState("1.24");
  const program = useProgram().program;

  const handleCreateProd = async () => {
    if( program == null ){
      toast.error("Unkonw Program!");
      return;
    }
    const productTitle = "EXAMPLE_BETTING_EXCHANGE";
    const product = await createProduct(program, productTitle, parseFloat(commissionRate), new PublicKey(authorityPk));
    console.log("Product Created Result: ", product);
  }

  return (
    <div className="p-4">
      <Typography variant="h2" className="text-white">Administration</Typography>
      <div className="md:flex">
        <Input
          size="lg"
          color={"white"}
          label="AuthorityPk"
          crossOrigin={""}
          name="authoritypk"
          value={authorityPk}
          onChange={e => { setAuthorityPk(e.target.value) }}
        />
        <div className="mt-2 md:mt-0 ml-0 md:ml-2"></div>
        <Input
          size="lg"
          color={"white"}
          label="Commission Rate"
          crossOrigin={""}
          name="commissionRate"
          value={commissionRate}
          type="number"
          onChange={e => { setCommissionRate(e.target.value) }}
        />
        <Button className='md:ml-2 min-w-[200px] md:mt-0 mt-2' onClick={handleCreateProd}>Create Product</Button>
      </div>
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};