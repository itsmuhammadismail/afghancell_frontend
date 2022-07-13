import route from "./route";

const deleteUserApi = async (token, id) => {
  let header = {
    Authorization: `Bearer ${token}`,
  };

  let requestOptions = {
    method: "DELETE",
    redirect: "follow",
    headers: header,
  };

  const res = await fetch(`${route}deleteuser/${id}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return res;
};

export default deleteUserApi;
