import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  //si access token false o null retorna null
  if (!accessToken || accessToken === "null") { return null; }
  // si ha expirado devuelvo null, en caso contario devuelvo accessToken
  return expirationCheck(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  // si refreshToken es false o null retorno null
  if (!refreshToken || refreshToken === "null") { return null; }
  // si ha caducado devuelve null, de lo contrario, refreshToken
  return expirationCheck(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch(url, params)
    .then(response => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then(result => {
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

// devuelve true si ha expirado y false si no
function expirationCheck(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}

