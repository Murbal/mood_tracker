import Axios from "axios";

export const axios = Axios.create({
  url: `http://localhost:${process.env.VUE_APP_SERVER_PORT}`,
});
