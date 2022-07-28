import TextField from "@mui/material/TextField";

import { useEffect, useRef, useState } from "react";
import loginApi from "../api/login";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Login = () => {
  const ref = useRef(null);
  //use form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  //use form end
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["token"]);

  const [isLoading, setIsLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const handleLogin = async (username, password) => {
    setIsLoading(true);
    const res = await loginApi(username, password);

    if ("token" in res && res["role"] == "admin") {
      // localStorage.setItem("token", res.token);
      setCookie("token", res["token"], {
        path: "/",
        maxAge: 7200, // Expires after 2hr
        sameSite: true,
      });
      setCookie("id", res["_id"], {
        path: "/",
        maxAge: 7200, // Expires after 2hr
        sameSite: true,
      });

      router.push("/");
    } else {
      setIsLoading(false);
      setIncorrect(true);
      setTimeout(() => {
        setIncorrect(false);
      }, 2000);
    }
  };

  const onSubmit = async (data) => {
    handleLogin(data.username, data.password);
  };

  return (
    <form className="flex w-screen h-screen" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 flex justify-evenly items-center ">
        {/* <img src="/login.svg" alt="" className="h-full p-[5rem]" /> */}
        <div className="hidden lg:flex">
          <lottie-player
            id="firstLottie"
            ref={ref}
            autoplay
            loop
            mode="normal"
            src="https://assets7.lottiefiles.com/private_files/lf30_fw6h59eu.json"
            style={{ width: "500px", height: "500px", paddingp: "5rem" }}
            className=" p-[5rem] "
          ></lottie-player>
        </div>
        <div className="w-full md:w-[30rem] bg-[#ececec] flex flex-col justify-center items-center shadow-lg py-[6rem] rounded-lg mx-6 lg:mx-0">
          <img src="/logo.svg" alt="" className="w-[10rem]" />
          {incorrect && (
            <div
              className="flex w-[20rem] justify-between items-center self-center border-2 border-red-500 px-3 py-2 text-red-500 rounded-md mb-3"
              onClick={() => setIncorrect(false)}
            >
              <small>Incorrect username or password. please try again!</small>
              <ClearIcon fontSize="small" className="cursor-pointer" />
            </div>
          )}
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            className="w-[20rem] my-2 "
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-xs text-red-600">Username is required</span>
          )}
          <div className="h-[1rem]"></div>
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            className="w-[20rem] my-2 "
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-xs text-red-600">Password is required</span>
          )}
          <button
            variant="contained"
            size="large"
            className="w-[20rem] bg-blue-500 p-3 my-2 text-white"
            onClick={loginApi}
            type="submit"
          >
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
