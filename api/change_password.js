import route from "./route";

const changePasswordApi = async (token, id, password) => {
  var urlencoded = new URLSearchParams();
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

  const res = await fetch(`${route}updateuserpassword/${id}`, requestOptions)
    .then((response) => response.status)
    .catch((error) => console.log("error", error));

  return res;
};

export default changePasswordApi;
