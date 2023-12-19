/* eslint-disable @next/next/no-img-element */
// pages/register.tsx
import {
  Input,
  Select,
  Typography,
  Option,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { countries } from "countries-list";
import "./style.css";
import Link from "next/link";
export default function Register() {
  const countryList = Object.values(countries);
  const confirmLabel =
    "I confirm the details entered are accurate and personal to me, and that I am at least 18 years of age.";
  return (
    <div className="bg-secondary_back w-full h-full fixed overflow-auto">
      <form action="/login" method="POST">
        <div className="w-full mx-auto px-4" style={{ maxWidth: "500px" }}>
          <img
            src="/logo.png"
            alt="logo"
            className="px-4 mx-auto my-4"
            style={{ width: "50%" }}
          ></img>
          <Typography variant="h4" className="text-center text-white my-1">
            Create your account
          </Typography>
          <Typography variant="h6" className="text-center text-gray-400 my-1">
            Get started on the BETFAST exchange
          </Typography>
          <div className="my-2">
            <Input
              size="lg"
              label="Email"
              type="email"
              crossOrigin={""}
              color="teal"
            />
          </div>
          <div className="my-2">
            <Select
              placeholder="USA"
              label="Country"
              menuProps={{ className: "h-48 bg-secondary_back" }}
              color="teal"
            >
              {countryList.map((country: any) => (
                <Option key={country.name} value={country.name}>
                  <div className="flex items-center gap-x-2">{country.name}</div>
                </Option>
              ))}
            </Select>
          </div>
          <div className="my-2">
            <Input size="lg" label="First Name" crossOrigin={""} color="teal" />
          </div>
          <div className="my-2">
            <Input size="lg" label="Last Name" crossOrigin={""} color="teal" />
          </div>
          <div className="my-2">
            <Input
              size="lg"
              type="date"
              label="Birthday"
              placeholder="Birthday"
              color="teal"
              crossOrigin={""}
            />
          </div>
          <Typography variant="small" className="text-gray-400">
            Address
          </Typography>
          <div className="my-2">
            <Input
              size="lg"
              label="Address line 1"
              crossOrigin={""}
              color="teal"
            />
          </div>
          <div className="my-2">
            <Input
              size="lg"
              label="Address line 2"
              crossOrigin={""}
              color="teal"
            />
          </div>
          <div className="my-2">
            <Input size="lg" label="Town/City" crossOrigin={""} color="teal" />
          </div>
          <div className="my-2">
            <Input
              size="lg"
              label="PostCode"
              crossOrigin={""}
              type="number"
              color="teal"
            />
          </div>
          <div className="my-2">
            <Checkbox
              label={confirmLabel}
              crossOrigin={""}
              type="number"
              color="teal"
              className="h-5 w-5"
            />
          </div>
          <div
            className="cf-turnstile"
            data-sitekey="0x4AAAAAAAOzJWuRD4ejNdA-"
          ></div>
          <script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          ></script>
          <div className="my-2">
            <Button color="teal" className="w-full" type="submit">
              Join
            </Button>
          </div>
          <div className="my-2">
            <Typography variant="small" className="text-gray-400">
              BetFast utilizes Onfido as a third party service provider to process
              identity checks on our behalf. By continuing to use this service you
              confirm that you have read, understand and accept Onfido&apos;s{" "}
              <Link href="" className="text-highlight">
                Onfido Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="" className="text-highlight">
                Onfido Term&apos;s of Service
              </Link>
              .
            </Typography>
          </div>
        </div>
      </form>
    </div>
  );
}
