import route from "./route";
import { useCookies } from "react-cookie";

const getRechargeHistory = async (token, id) => {
  let header = {
    Authorization: `Bearer ${token}`,
  };

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: header,
  };

  const res = await fetch(`${route}userwisesubuserrecharge/${id}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return res["rechargeUsers"];
};

export default getRechargeHistory;
