import axios from "axios";

const saveData = async (result, distance, entryHandler) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  };
  try {
    await axios.post("/performance_data", 
      { 
        performance_data: { data: { message: result, distance: distance } } 
      }, {
        headers: headers
      }
    );
    entryHandler();
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

const getData = async () => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  };
  
  const response = await axios.get("/performance_data", {
    headers: headers
  })
  return response;
};

export { getData, saveData }

