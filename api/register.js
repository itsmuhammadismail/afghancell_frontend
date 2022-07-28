import route from "./route";

const registerApi = async (
  token,
  id,
  displayname,
  username,
  contact,
  country,
  state,
  password
) => {
  let header = {
    Authorization: `Bearer ${token}`,
  };

  var urlencoded = new URLSearchParams();
  urlencoded.append("displayname", displayname);
  urlencoded.append("username", username);
  urlencoded.append("contact", contact);
  urlencoded.append("country", country);
  urlencoded.append("state", state);
  urlencoded.append("password", password);
  urlencoded.append("id", id);

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
