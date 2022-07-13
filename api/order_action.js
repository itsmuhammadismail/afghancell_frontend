import route from "./route";

const OrderActionApi = async (token, id, action) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("action", action);

  let header = {
    Authorization: `Bearer ${token}`,
  };

  let requestOptions = {
    method: "PUT",
    redirect: "follow",
    headers: header,
    body: urlencoded,
  };

  const res = await fetch(`${route}updateorderaction/${id}`, requestOptions)
    .then((response) => response.status)
    .catch((error) => console.log("error", error));

  return res;
};

export default OrderActionApi;
