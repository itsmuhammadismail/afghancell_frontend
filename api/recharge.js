import route from "./route";

const rechargeApi = async (token, id, username, contact, amount) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("contact", contact);
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

  const res = await fetch(`${route}userrecharge/${id}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return res;
};

export default rechargeApi;
