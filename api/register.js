import route from "./route";

const registerApi = async (
  token,
  id,
  username,
  phone,
  password,
  amount,
  country,
  role
) => {
  let header = {
    Authorization: `Bearer ${token}`,
  };

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("phone_number", phone);
  urlencoded.append("password", password);
  urlencoded.append("amount", amount);
  urlencoded.append("country", country);
  urlencoded.append("role", role);
  urlencoded.append("user_id", id);

  var requestOptions = {
    method: "POST",
    body: urlencoded,
    redirect: "follow",
    headers: header,
  };

  const res = await fetch(`${route}auth/register`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return res;
};

export default registerApi;
