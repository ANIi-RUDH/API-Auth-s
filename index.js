import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "ap0658";
const yourPassword = "###########";
const yourAPIKey = "########################";
const yourBearerToken = "3744c793-cc55-4bc9-b96b-642a55b9fa9e";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API_Response." });
});

app.get("/noAuth", async(req, res) => {
  try{

  const API_Response=await axios.get(API_URL+"random");
  const info=API_Response.data
  res.render("index.ejs",{content:JSON.stringify(info)});
  console.log(info);
  }
  catch(error){

    console.error("Error in noAuth Part",error.message);
    res.render("index.ejs")
  }
  // res.render("index.ejs",{content:info});
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
  try{
  const API_Response=await axios.get(API_URL+"all?page=2",{
    auth: {
      username: yourUsername,
      password: yourPassword  } 
    });
  const info=API_Response.data;
  console.log(info);
  res.render("index.ejs",{content:JSON.stringify(info)});
}
catch(error){
  console.error("Error in /basicAuth part",error.message);
  res.render("index.ejs");
}
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});
//filter?score=5&apiKey=824ab954-d3fe-4201-8e54-37103043d845
app.get("/apiKey", async(req, res) => {
  try{
  const apiiKey=yourAPIKey
  const API_Response=await axios.get(API_URL+"filter",{

    params:{
      apiKey:apiiKey,
      score:5,
    }
  });
  const info=API_Response.data;
  res.render("index.ejs",{content:JSON.stringify(info)});
  
}
catch(error){
  console.error("Error is in /apiKey part",error.message)
  res.render("index.ejs")

}



  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async(req, res) => {
  try{
  const Token=yourBearerToken;
  const API_Response=await axios.get(API_URL+"secrets/2",{
    headers:{
      Authorization:`Bearer ${Token}`
    }
    });
    const info=API_Response.data
    res.render("index.ejs",{content:JSON.stringify(info)})
    console.log("You learn't APIs")
  }
  catch(error){
    console.error("Error is in /bearerToken part",error.message)
  }

  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
