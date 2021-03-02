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

export async function deletePostApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-post/${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function addPostApi(token, post) {
  const url = `${basePath}/${apiVersion}/add-post`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(post)
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function updatePostApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/update-post/${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}