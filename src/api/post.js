import { basePath, apiVersion } from "./config";

export async function getPostsPaginatedApi(limit, page) {
  const url = `${basePath}/${apiVersion}/get-posts?limit=${limit}&page=${page}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}