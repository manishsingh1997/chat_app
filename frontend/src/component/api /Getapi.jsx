import axios from "axios";
export default async function Getapi(url ,data) {
    const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${data}`,
        },
      };
      let apidata
    await axios 
    .get(url,config)
    .then((response)=> (apidata =response.data))
    .catch((err)=>console.log(err));
   return apidata
    
  }
  