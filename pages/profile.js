import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import BgCard from "../components/BgCard";
import Layout from "../components/Layout";
import changePasswordApi from "../api/change_password";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CircularProgress } from "@mui/material";
import { useCookies } from "react-cookie";
const Profile = () => {
  const [disabled, setDisabled] = useState(true);
  const [matched, setMatched] = useState(true);

  const password = useRef();
  const confirmPassword = useRef();

  //changePasswordApi
  const [isLoading, setIsLoading] = useState(false);
  const [cookie, setCookie] = useCookies(["token"]);
  const MySwal = withReactContent(Swal);
  const handleLogin = async () => {
    setIsLoading(true);
    console.log("haseeb");
    const res = await changePasswordApi(
      cookie["token"],
      cookie["id"],
      password.current.value
    );

    console.log(res);
    if (res == 200) {
      setIsLoading(false);
      await MySwal.fire({
        title: "Password Changed Successfully",
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  //changePasswordApi

  const handleChange = () => {
    if (password.current.value === "" || confirmPassword.current.value === "") {
      setDisabled(true);
      setMatched(true);
      return;
    }
    if (password.current.value === confirmPassword.current.value) {
      setDisabled(false);
      setMatched(true);
    } else {
      setDisabled(true);
      setMatched(false);
    }
  };

  return (
    <Layout heading="Profile">
      <BgCard className="p-[2rem]">
        <h1 className="text-[1.2rem] mb-[2rem]">Change Password</h1>
        <form className="flex flex-col gap-5 mb-[2rem]" onSubmit={onSubmit}>
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            className="md:w-[20rem]"
            type="password"
            inputRef={password}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            className="md:w-[20rem]"
            type="password"
            inputRef={confirmPassword}
            onChange={handleChange}
          />
          {!matched && (
            <p className="text-sm text-red-500">
              Password and Confirm Password not matched
            </p>
          )}
          <Button
            variant="contained"
            className="bg-[#377DFF] md:w-[20rem] h-[3rem]"
            disabled={disabled}
            type="submit"
          >
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </BgCard>
    </Layout>
  );
};

export default Profile;
