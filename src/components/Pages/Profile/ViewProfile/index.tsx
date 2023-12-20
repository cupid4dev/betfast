"use client";
import Divider from "@/components/UI/Divider";
import { getBFUser, updateBFUser } from "@/redux/slice";
import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { countries } from "countries-list";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewProfilePage() {
  const countryList = Object.values(countries);
  const userInfo = useSelector(getBFUser);
  const [formData, setFormData] = React.useState({
    email: userInfo.email,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    country: userInfo.country,
    birthday: userInfo.birthday,
    address1: userInfo.address1,
    address2: userInfo.address2,
    city: userInfo.city,
    postcode: userInfo.postcode,
    username: userInfo.username,
    phonenumber: userInfo.phonenumber,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function isEmailValid(email: string): boolean {
    // Regular expression for a simple email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  const onUpdate = () => {
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

    axios.post("/api/updateUser", formData).then((result) => {
      if (result.status == 200) {
        if (result.data.success) {
          toast.success("Your profile updated!");
          localStorage.setItem("betfast-user", JSON.stringify(formData));
          dispatch(updateBFUser(formData));
        } else {
          toast.error("Update failed!");
        }
      }
    });
  };

  React.useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  return (
    <div className="p-4">
      <Typography variant="h2" className="text-white">
        My Profile
      </Typography>
      <Typography variant="paragraph" className="text-gray-200">
        Your profile overview in detail
      </Typography>
      <p>&nbsp;</p>
      <div className="md:flex">
        <div className="md:w-50 p-2">
          <Typography variant="h5" className="text-gray-200">
            Personal Information
          </Typography>
          <Typography variant="paragraph" className="text-gray-400">
            Profile information is the collection of details that define and
            represent an individual or entity, encompassing personal and
            professional data such as name, birthday, and other relevant
            details, allowing users to create a comprehensive and personalized
            online identity.
          </Typography>
        </div>
        <div className="md:w-50 p-2">
          <Input
            size="lg"
            color={"white"}
            label="First Name"
            crossOrigin={""}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            color={"white"}
            label="Last Name"
            crossOrigin={""}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            type="date"
            label="Birthday"
            color="white"
            placeholder="Birthday"
            crossOrigin={""}
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>
      </div>
      <Divider />
      <div className="md:flex">
        <div className="md:w-50 p-2">
          <Typography variant="h5" className="text-gray-200">
            Username
          </Typography>
          <Typography variant="paragraph" className="text-gray-400">
            This is how you will apear on the BETFAST platform.
          </Typography>
        </div>
        <div className="md:w-50 p-2">
          <Input
            size="lg"
            color={"white"}
            label="Username"
            crossOrigin={""}
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
      </div>
      <Divider />
      <div className="md:flex">
        <div className="md:w-50 p-2">
          <Typography variant="h5" className="text-gray-200">
            Contact Details
          </Typography>
          <Typography variant="paragraph" className="text-gray-400">
            How can we keep in touch with you.
          </Typography>
        </div>
        <div className="md:w-50 p-2">
          {/* <Input size="lg" color={"white"} label="Email" crossOrigin={""} /> */}
          <p className="mb-2" />
          <Input
            size="lg"
            color={"white"}
            type="number"
            label="Phonenumber"
            crossOrigin={""}
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <Divider />
      <div className="md:flex">
        <div className="md:w-50 p-2">
          <Typography variant="h5" className="text-gray-200">
            Address
          </Typography>
          <Typography variant="paragraph" className="text-gray-400">
            The address on the BETFAST platform refers to the location or
            identifier associated with your account, allowing for secure and
            accurate communication.{" "}
          </Typography>
        </div>
        <div className="md:w-50 p-2 select-container">
          <Input
            size="lg"
            color={"white"}
            label="Address Line 1"
            crossOrigin={""}
            name="address1"
            value={formData.address1}
            onChange={handleChange}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            color={"white"}
            label="Address Line 2"
            crossOrigin={""}
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
          <p className="mb-2" />
          <Input
            size="lg"
            color={"white"}
            label="City"
            crossOrigin={""}
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <p className="mb-2" />
          <Select
            placeholder="USA"
            label="Country"
            menuProps={{ className: "h-48" }}
            className="!text-white"
            name="country"
            value={formData.country}
            onChange={handleChange}
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
            color={"white"}
            label="Postcode"
            crossOrigin={""}
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
          />
        </div>
      </div>
      <Divider />
      <div className="mg-auto w-fit-content">
        <Button className="w-200px bg-primary_light" onClick={onUpdate}>
          {" "}
          Save
        </Button>
      </div>
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
}
