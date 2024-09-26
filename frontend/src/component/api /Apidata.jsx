import axios from "axios";

export default async function apiData(url, data1, data) {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${data}`,
    },
  };
  const responseapi = await axios
    .post(url, data1, data ? config : {})
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return responseapi;
}
