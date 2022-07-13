import route from "./route";
import { useCookies } from "react-cookie";

const getWeekOrders = async (token) => {
  let header = {
    Authorization: `Bearer ${token}`,
  };

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: header,
  };

  const res = await fetch(`${route}getdayorder`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return res;
};

export default getWeekOrders;
