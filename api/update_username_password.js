import route from "./route";

const updateUsernamePasswordApi = async (token, id, username, password) => {
  token, id, password;
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);

  let header = {
    Authorization: `Bearer ${token}`,
  };

  let requestOptions = {
    method: "PUT",
    redirect: "follow",
    headers: header,
    body: urlencoded,
  };

  const res = await fetch(
    `${route}updateusernameandpassword/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return res;
};

export default updateUsernamePasswordApi;
