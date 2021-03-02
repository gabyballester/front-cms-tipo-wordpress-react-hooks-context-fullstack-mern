import { basePath, apiVersion } from "./config";

export async function getCoursesApi() {
  const url = `${basePath}/${apiVersion}/get-courses`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getCourseDataUdemyApi(id) {
  const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;
  const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;
  const url = baseUrl + coursesParams;

  try {
    const response = await fetch(url);
    const result = { code: response.status, data: await response.json() };
    return result;
  } catch (err) {
    return err;
  }
}

export async function deleteCourseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;

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
