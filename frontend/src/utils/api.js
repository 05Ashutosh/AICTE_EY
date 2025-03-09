export const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  dispatch = null
) => {
  const token = localStorage.getItem("accessToken");
  const baseUrl =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const requestOptions = {
    method,
    headers,
    credentials: "include",
  };

  if (body) {
    requestOptions.body =
      body instanceof FormData ? body : JSON.stringify(body);
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    } else {
      delete headers["Content-Type"];
    }
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 && dispatch) {
        const refreshed = await refreshToken(dispatch);
        if (refreshed) {
          return apiRequest(endpoint, method, body, dispatch);
        }
        throw new Error("Unauthorized - Unable to refresh token");
      }
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

const refreshToken = async (dispatch) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"
      }/users/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      localStorage.removeItem("accessToken");
      if (dispatch) {
        dispatch({ type: "auth/logoutUser" });
      }
      return false;
    }

    localStorage.setItem("accessToken", data.data.accessToken);
    return true;
  } catch (error) {
    console.error("Refresh token error:", error);
    localStorage.removeItem("accessToken");
    if (dispatch) {
      dispatch({ type: "auth/logoutUser" });
    }
    return false;
  }
};
