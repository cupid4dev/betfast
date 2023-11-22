"use client";
import Divider from "@/components/UI/Divider";
import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import { countries } from "countries-list";

export default function ViewProfilePage() {
  const countryList = Object.values(countries);

  return (
    <div className="p-4">
      <Typography variant="h2">My Profile</Typography>
      <Typography variant="paragraph">
        Your profile overview in detail
      </Typography>
      <p>&nbsp;</p>
      <div className="flex">
        <div className="w-50 p-2">
          <Typography variant="h5">Personal Information</Typography>
          <Typography variant="paragraph">
            Profile information is the collection of details that define and
            represent an individual or entity, encompassing personal and
            professional data such as name, birthday, and other relevant
            details, allowing users to create a comprehensive and personalized
            online identity.
          </Typography>
        </div>
        <div className="w-50 p-2">
          <Input
            size="lg"
            label="First Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            label="Last Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            type="date"
            label="Birthday"
            placeholder="Birthday"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
        </div>
      </div>
      <Divider />
      <div className="flex">
        <div className="w-50 p-2">
          <Typography variant="h5">Username</Typography>
          <Typography variant="paragraph">
            This is how you will apear on the BETFAST platform.
          </Typography>
        </div>
        <div className="w-50 p-2">
          <Input
            size="lg"
            label="Username"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
        </div>
      </div>
      <Divider />
      <div className="flex">
        <div className="w-50 p-2">
          <Typography variant="h5">Contact Details</Typography>
          <Typography variant="paragraph">
            How can we keep in touch with you.
          </Typography>
        </div>
        <div className="w-50 p-2">
          <Input
            size="lg"
            label="Email"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            type="number"
            label="Phonenumber"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
        </div>
      </div>
      <Divider />
      <div className="flex">
        <div className="w-50 p-2">
          <Typography variant="h5">Address</Typography>
          <Typography variant="paragraph">
            The address on the BETFAST platform refers to the location or
            identifier associated with your account, allowing for secure and
            accurate communication.{" "}
          </Typography>
        </div>
        <div className="w-50 p-2">
          <Input
            size="lg"
            label="Address Line 1"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            label="Address Line 2"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            label="City"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
          <p className="mb-2" />
          <Select
            placeholder="USA"
            label="Country"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            menuProps={{ className: "h-48" }}
            onChange={(e) => {
              console.log(e);
            }}
          >
            {countryList.map((country: any) => (
              <Option key={country.name} value={country.name}>
                <div className="flex items-center gap-x-2">{country.name}</div>
              </Option>
            ))}
          </Select>
          <p className="mb-2" />
          <Input
            size="lg"
            label="Postcode"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={""}
          />
        </div>
      </div>
      <Divider />
      <div className="mg-auto w-fit-content">
        <Button color="green" variant="gradient" className="w-200px">
          {" "}
          Save
        </Button>
      </div>
    </div>
  );
}
