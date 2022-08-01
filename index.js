const axios = require("axios");

let Decisions = class {
  constructor({ baseUrl, email, password, outputtype }) {
    //validate URL
    if (baseUrl.length <= 0) {
      throw new Error("baseUrl not defined!");
    } else {
      if (!this.isValidURL(baseUrl)) {
        throw new Error("baseUrl is not a valid URL!");
      }
    }

    //validate Email
    if (email.length <= 0) {
      throw new Error("email not defined!");
    } else {
      if (!this.isValidEmail(email)) {
        throw new Error("email is not a valid email!");
      }
    }

    //validate Password
    if (password.length <= 0) {
      throw new Error("password not defined!");
    }

    this.queryParams = {
      userid: email,
      password,
      outputtype: outputtype || "JSON",
    };

    this.params = {};
    this.endPoint = "";

    this.axiosInstance = axios.create({
      baseURL: baseUrl || "https://devserver.avyst.com/Primary/restapi/Flow/",
      header: { "Access-Control-Allow_Origin": "*" },
    });

    this.requiredParams = `?userid=${this.userid}&password=${this.password}&outputtype=${this.outputtype}`;

    //"
  }

  isValidURL = (url) => {
    var res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  };

  isValidEmail = (email) => {
    var res = email.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    return res !== null;
  };

  async getAll(endPoint) {
    //validate endPoint
    if (endPoint.length <= 0) {
      throw new Error("end-point not defined!");
    }

    this.endPoint = endPoint;
    return this.getRequest();
  }

  async getFirst(endPoint, params) {
    //validate endPoint
    if (endPoint.length <= 0) {
      throw new Error("end-point not defined!");
    }
    this.endPoint = endPoint;

    //validate params
    if (typeof params !== Object) {
      throw new Error("Params is not valid object");
    }
    this.params = params;

    return this.getRequest();
  }

  getRequest = async () => {
    try {
      const response = await this.axiosInstance.get(
        this.endPoint + this.getQueryString()
      );
      return response.data;
    } catch (error) {
      if (error?.response?.data?.Description == "Authentication Failed.") {
        throw new Error(error.response.data.Description);
      }

      if (error?.response?.status == 404) {
        throw new Error("Incorrect End Point!");
      }

      throw new Error(error);
    }
  };

  getQueryString = () => {
    let queryParams = { ...this.queryParams, ...this.params };
    console.log(queryParams);
    var queryString = [];
    for (var p in queryParams)
      if (queryParams.hasOwnProperty(p)) {
        queryString.push(p + "=" + queryParams[p]);
      }
    return "?" + queryString.join("&");
  };
};

module.exports = Decisions;
