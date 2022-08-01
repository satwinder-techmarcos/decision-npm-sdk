# Decisions SDK  
Decisions SDK is in progress. You can use this to fetch all Objects of end point or First Object with end-point and ID of Object
It is a simple node js package

## Installation
npm i @satwinder-techmarcos/decision-sdk

## dependencies
 - axios - 0.27.2

## How to use

const Decisions = require("@satwinder-techmarcos/decision-sdk");

const options = {
  baseUrl: "a valid base url", //https://devserver.avyst.com/Primary/restapi/Flow/
  email: "email@example.com",
  password: "password",
};
const decision = new Decisions(options);

//Get All Pages
decision
  .getAll("5caecb67-0e33-11ed-8158-000d3a3ebe5711") // get your end point form (https://documentation.decisions.com/v7/docs/api-and-authentication)
  .then((pages) => {
    console.log(pages);
  })
  .catch((err) => {
    console.error(err);
  });