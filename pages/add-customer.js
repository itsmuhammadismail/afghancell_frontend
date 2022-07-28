import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BgCard from "../components/BgCard";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import rechargeApi from "../api/recharge";
import { CircularProgress } from "@mui/material";
import kCountries from "../utils/countries";
import kStates from "../utils/states";
import registerApi from "../api/register";

const AddCustomer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [cookie, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleCountry = (e) => {
    setSelectedCountry(e.target.value);
    setStates(kStates[e.target.value])
    setSelectedState(kStates[e.target.value][0]);
  }

  const handleState = (e) => {
    setSelectedState(e.target.value);
  }

  useEffect(() => {
    setCountries(kCountries);
    setStates(kStates[kCountries[0]])
    setSelectedCountry(kCountries[0]);
    setSelectedState(kStates[kCountries[0]][0]);
  },[]);

  const MySwal = withReactContent(Swal);

  const handleRecharge = async (data) => {
    setIsLoading(true);

    console.log(cookie["token"],
    cookie["id"],
    data.displayName,
    data.username,
    data.phoneNumber,
    selectedCountry,
    selectedState,
    data.password,);

    const res = await registerApi(
      cookie["token"],
      cookie["id"],
      data.displayName,
      data.username,
      data.phoneNumber,
      selectedCountry,
      selectedState,
      data.password,
    );

    console.log(res);

    if (res.status === "success") {
      setIsLoading(false);
      await MySwal.fire({
        title: "User Created Successfully",
        icon: "success",
      });
    } else {
      setIsLoading(false);
      await MySwal.fire({
        title: "Something went wrong",
        text: res.message,
        icon: "error",
      });
    }
  };

  const onSubmit = (data) => handleRecharge(data);

  return (
    <Layout heading="Add Customer">
      <BgCard className="p-[2rem]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mb-[2rem]"
        >
          <TextField
            id="outlined-basic"
            label="Display Name"
            variant="outlined"
            className="md:w-[20rem]"
            {...register("displayName", { required: true })}
          />
          {errors.displayName && (
            <p className="text-sm text-red-500">This field is required.</p>
          )}

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            className="md:w-[20rem]"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-sm text-red-500">This field is required.</p>
          )}

          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            type="number"
            className="md:w-[20rem]"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">This field is required.</p>
          )}

          <FormControl className="md:w-[20rem]">
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCountry}
              label="Country"
              onChange={handleCountry}
            >
              {countries.map((country) => (<MenuItem key={country} value={country}>{country}</MenuItem>))}
            </Select>
          </FormControl>

          <FormControl className="md:w-[20rem]">
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedState}
              label="State"
              onChange={handleState}
            >
              {states.map((state) => (<MenuItem key={state} value={state}>{state}</MenuItem>))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="md:w-[20rem]"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">This field is required.</p>
          )}
          <Button
            variant="contained"
            className="bg-[#377DFF] md:w-[20rem] h-[3rem]"
            type="submit"
          >
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Add Customer"
            )}
          </Button>
        </form>
      </BgCard>
    </Layout>
  );
};

export default AddCustomer;
