import { basePath, apiVersion } from "./config";

export async function suscribeNewsletterApi(email) {
  const url = `${basePath}/${apiVersion}/suscribe-newsletter/${email.toLowerCase()}`;
  const params = {
    method: "POST"
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}
