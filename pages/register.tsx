/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
// pages/register.tsx
import React from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const countryList = Object.values(countries);
  const confirmLabel =
    "I confirm the details entered are accurate and personal to me, and that I am at least 18 years of age.";

  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    birthday: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
  });
  const [isAgreed, setIsAgreed] = React.useState(false);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeCountry = (value) => {
    setFormData((prevData) => ({ ...prevData, ["country"]: value }));
  };

  function isEmailValid(email: string): boolean {
    // Regular expression for a simple email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  // async function isAddressValid(addressLine1: string, city: string, postcode: string): Promise<boolean> {
  //   try {
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //         `${addressLine1}, ${city}, ${postcode}`
  //       )}&key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries=places&callback=initMap`
  //     );

  //     // Check if the API response indicates a valid address
  //     return response.data.status === 'OK' && response.data.results.length > 0;
  //   } catch (error) {
  //     console.error('Error validating address:', error);
  //     return false;
  //   }
  // }

  const handleJoin = async () => {
    if (!isEmailValid(formData.email)) {
      toast.error("Please input a valid email!");
      return;
    }

    if (formData.country == "") {
      toast.error("Please select your country!");
      return;
    }

    if (formData.firstName == "") {
      toast.error("Please input your first name!");
      return;
    }

    if (formData.lastName == "") {
      toast.error("Please input your last name!");
      return;
    }

    if (formData.birthday == "") {
      toast.error("Please input your birthday!");
      return;
    }

    const isValidAddress =
      formData.address1 != "" && formData.city != "" && formData.postcode != "";
    if (!isValidAddress) {
      toast.error("Invalid Address!");
      return;
    }

    try {
      const captchaResult = (
        document.getElementsByName(
          "cf-turnstile-response",
        )[0] as HTMLInputElement
      ).value;
      if (
        captchaResult == null ||
        captchaResult == undefined ||
        captchaResult == ""
      ) {
        toast.error("Captcha Failed!");
        return;
      }
    } catch (e) {
      toast.error("Captcha Failed!");
      return;
    }

    axios.post("/api/register", formData).then((data) => {
      if (data.status != 200) {
        toast.error("Check your network status!");
        return;
      }
      if (data.data.success) {
        toast.success("Registration Successed!");
        router.push("/login");
      } else if (data.data.error.errno == 19) {
        toast.error("You already registered!");
      } else {
        toast.error("Registeration Failed!");
      }
    });
  };

  return (
    <div className="bg-secondary_back w-full h-full fixed overflow-auto">
      <form action="/register" method="POST" id="register-form">
        <div
          className="w-full mx-auto px-4 children-input-text-white"
          style={{ maxWidth: "500px" }}
        >
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
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <Select
              placeholder="USA"
              label="Country"
              menuProps={{ className: "h-48 bg-secondary_back" }}
              color="teal"
              name="country"
              value={formData.country}
              onChange={handleChangeCountry}
            >
              {countryList.map((country: any) => (
                <Option key={country.name} value={country.name}>
                  {" "}
                  <div className="flex items-center gap-x-2">
                    {country.name}
                  </div>{" "}
                </Option>
              ))}
            </Select>
          </div>
          <div className="my-2">
            <Input
              size="lg"
              label="First Name"
              crossOrigin={""}
              color="teal"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <Input
              size="lg"
              label="Last Name"
              crossOrigin={""}
              color="teal"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <Input
              size="lg"
              type="date"
              label="Birthday"
              placeholder="Birthday"
              color="teal"
              crossOrigin={""}
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
          <Typography variant="small" className="text-gray-400">
            {" "}
            &nbsp;&nbsp;Address{" "}
          </Typography>
          <div className="my-2">
            <Input
              size="lg"
              label="Address line 1"
              crossOrigin={""}
              color="teal"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <Input
              size="lg"
              label="Address line 2"
              crossOrigin={""}
              color="teal"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <Input
              size="lg"
              label="Town/City"
              crossOrigin={""}
              color="teal"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <Input
              size="lg"
              label="PostCode"
              crossOrigin={""}
              color="teal"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
            />
          </div>
          <div
            className="my-2 flex text-gray-400"
            onClick={() => {
              setIsAgreed(!isAgreed);
            }}
          >
            <Checkbox
              crossOrigin={""}
              type="number"
              color="teal"
              className="h-5 w-5 float-left"
              checked={isAgreed}
              onChange={() => {}}
            />
            <div>{confirmLabel}</div>
          </div>
          <div
            className="cf-turnstile"
            data-sitekey="0x4AAAAAAAO8vgf6oA7EP0m2"
          ></div>
          <script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          ></script>
          <div className="my-2">
            <Button
              color="teal"
              className="w-full"
              onClick={() => handleJoin()}
              disabled={!isAgreed}
            >
              Join
            </Button>
          </div>
          <div className="text-center">
            <Link href="/login" className="text-highlight w-full">
              Already registered? Login
            </Link>
          </div>
          <div className="my-2">
            <Typography variant="small" className="text-gray-400">
              BetFast utilizes Onfido as a third party service provider to
              process identity checks on our behalf. By continuing to use this
              service you confirm that you have read, understand and accept
              Onfido&apos;s{" "}
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
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
}
