import { API_URL } from "./constants";

const errorHandler = (response) => {
  if (!response.status === 200)
    return { error: Error("Request error"), status: response.status };
  return response.json();
};

const Api = (path, method, params, token) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    method,
    ...(params && { body: JSON.stringify(params) }),
  };

  return fetch(`${API_URL}${path}`, options)
    .then((resp) => errorHandler(resp))
    .catch((error) => ({ error }));
};

export default Api;
