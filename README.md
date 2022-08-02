# Decisions SDK  
Decisions SDK is in progress. You can use this to fetch all Objects of end point or First Object with end-point and ID of Object
It is a simple node js package

## Installation
npm i @satwinder-techmarcos/decision-sdk

## Dependencies
 - axios - 0.27.2

## How to use



    const Decisions = require("@satwinder-techmarcos/decision-sdk");
    
    const options = {
        baseUrl: "a valid base url here",
        email: "email@example.com",
        password: "password here",
    };
    
    const decision = new Decisions(options);
    
    //Get All Pages
    decision
       .getAll("flow/api end point") // get your end point form (https://documentation.decisions.com/v7/docs/api-and-authentication)
       .then((pages) => {
          console.log(pages);
      })
       .catch((err) => {
           console.error(err);
      });