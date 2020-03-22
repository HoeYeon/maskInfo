import axios from "axios";

const api = axios.create({
  baseURL: "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1",
  responseType: "json"
});

export const maskInfo = {
  stores: () =>
    api.get("/stores/json", {
      params: {
        page: 1,
        perPage: 500
      }
    }),
  sales: () =>
    api.get("/sales/json", {
      params: {
        page: 1,
        perPage: 500
      }
    }),
  storesByGeo: (lat, lng) =>
    api.get("/storesByGeo/json", {
      params: {
        lat: lat,
        lng: lng,
        m: 2000
      }
    }),
  storesByAddr: () =>
    api.get("/storesByAddr/json", {
      params: {
        address: "경기도 부천시"
      }
    })
};
