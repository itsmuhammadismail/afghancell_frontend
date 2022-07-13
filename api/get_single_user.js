import route from "./route";

const getSingleUserApi = async (token, id) => {
  let header = {
    Authorization: `Bearer ${token}`,
  };

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: header,
  };

  const res = await fetch(`${route}getsingleuser/${id}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return res;
};

export default getSingleUserApi;
