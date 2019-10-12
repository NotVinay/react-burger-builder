import { useState, useEffect } from "react";

export default httpClient => {
  const [error, setError] = useState(null);
  const requestInterceptor = httpClient.interceptors.response.use(res => {
    setError(null);
    return res;
  }, null);
  const responseInterceptor = httpClient.interceptors.response.use(
    res => res,
    error => {
      console.log("err in interceptors", error);
      setError("Didn't Work");
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.request.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };
  return [error, errorConfirmedHandler];
};
