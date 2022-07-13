import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import BgCard from "../components/BgCard";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import rechargeApi from "../api/recharge";
import { CircularProgress } from "@mui/material";

const Recharge = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [cookie, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);

  const MySwal = withReactContent(Swal);

  const handleRecharge = async (data) => {
    setIsLoading(true);
    const res = await rechargeApi(
      cookie["token"],
      cookie["id"],
      data.customer,
      data.customerNumber,
      data.amount,
    );

    if (res.status === "success") {
      setIsLoading(false);
      await MySwal.fire({
        title: "User Recharged Successfully",
        icon: "success",
      });
    } else {
      setIsLoading(false);
      await MySwal.fire({
        title: "Something went wrong",
        icon: "error",
      });
    }
  };

  const onSubmit = (data) => handleRecharge(data);

  return (
    <Layout heading="Recharge">
      <BgCard className="p-[2rem]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mb-[2rem]"
        >
          <TextField
            id="outlined-basic"
            label="Customer"
            variant="outlined"
            className="md:w-[20rem]"
            {...register("customer", { required: true })}
          />
          {errors.customer && (
            <p className="text-sm text-red-500">Amount is required.</p>
          )}

          <TextField
            id="outlined-basic"
            label="Customer's Number"
            variant="outlined"
            type="number"
            className="md:w-[20rem]"
            {...register("customerNumber", { required: true })}
          />
          {errors.customerNumber && (
            <p className="text-sm text-red-500">Amount is required.</p>
          )}

          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            type="number"
            className="md:w-[20rem]"
            {...register("amount", { required: true })}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">Amount is required.</p>
          )}
          <Button
            variant="contained"
            className="bg-[#377DFF] md:w-[20rem] h-[3rem]"
            type="submit"
          >
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Recharge"
            )}
          </Button>
        </form>
      </BgCard>
    </Layout>
  );
};

export default Recharge;
