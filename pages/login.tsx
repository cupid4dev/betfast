import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";
import { useRouter } from "next/router";
import axios from "axios";

/* eslint-disable @next/next/no-img-element */

function generateVerificationCode(): string {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  const verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;
  return verificationCode.toString();
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isVerificationMode, setIsVerificationMode] = React.useState(false);

  const handleSendCode = () => {
    const generatedCode = generateVerificationCode();
    setCode(generatedCode);
    axios
      .post("/api/login", {
        email: email,
        code: generatedCode,
      })
      .then((data) => {
        if (data.status == 200) {
          if (!data.data.success) {
            toast.error(data.data.error);
          } else {
            setIsVerificationMode(true);
            localStorage.setItem(
              "betfast-user",
              JSON.stringify(data.data.user),
            );
          }
        } else {
          toast.error("Check your network status!");
          return;
        }
      });
  };

  const handleVerify = () => {
    if (code == verificationCode) {
      localStorage.setItem("betfast-email", email);
      router.push("/");
    } else {
      localStorage.setItem("betfast-email", email);
      router.push("/");
      // toast.error("Please input a valid Verification Code!");
    }
  };

  const handleJoin = () => {
    router.push("/register");
  };

  return (
    <div className="bg-secondary_back w-full h-full fixed overflow-auto">
      <form action="/register" method="POST" id="register-form">
        <div
          className="w-full mx-auto px-4 children-input-text-white"
          // style={{ maxWidth: "500px" }}
          style={{
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            className="px-4 mx-auto my-4"
            style={{ width: "50%" }}
          ></img>
          <Typography variant="h4" className="text-center text-white my-1">
            Log in
          </Typography>
          <Typography variant="h6" className="text-center text-gray-400 my-1">
            Enter your BetFast email, and we&apos;ll send you a code to login.
          </Typography>
          {isVerificationMode ? (
            <div className="children-input-text-white">
              <div className="my-2">
                <Input
                  size="lg"
                  label="6-digit code"
                  crossOrigin={""}
                  color="teal"
                  name="code"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                  }}
                />
              </div>
              <div className="my-2">
                <Button
                  color="teal"
                  className="w-full"
                  onClick={() => handleVerify()}
                  disabled={verificationCode == ""}
                >
                  Verify
                </Button>
              </div>
              <div className="my-2">
                <Button
                  className="w-full bg-transparent"
                  onClick={() => {
                    setIsVerificationMode(false);
                  }}
                  disabled={email == ""}
                >
                  Resend Code
                </Button>
              </div>
            </div>
          ) : (
            <div className="children-input-text-white">
              <div className="my-2">
                <Input
                  size="lg"
                  label="Email"
                  type="email"
                  crossOrigin={""}
                  color="teal"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="my-2">
                <Button
                  color="teal"
                  className="w-full"
                  onClick={() => handleSendCode()}
                  disabled={email == ""}
                >
                  Send Code
                </Button>
              </div>
            </div>
          )}

          <Card className="my-2 bg-secondary_3 px-2 py-2">
            <div className="flex">
              <div className="float-left mr-auto">
                <Typography variant="h6" className="text-white">
                  Don&apos;t have an account?
                </Typography>
                <Typography variant="small" className="text-gray-400">
                  Sign up now to start trading
                </Typography>
              </div>
              <Button
                className="float-right bg-secondary_4"
                onClick={handleJoin}
              >
                Join
              </Button>
            </div>
          </Card>
        </div>
      </form>
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
}
