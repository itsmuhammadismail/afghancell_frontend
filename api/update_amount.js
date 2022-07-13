import route from "./route";

const updateAmountApi = async (token, id, amount) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("amount", amount);

  let header = {
    Authorization: `Bearer ${token}`,
  };

  let requestOptions = {
    method: "PUT",
    redirect: "follow",
    headers: header,
    body: urlencoded,
  };

  const res = await fetch(`${route}changeuseramount/${id}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return res;
};

export default updateAmountApi;
