import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      try {
        const payload = JSON.parse(
          atob(
            storedToken.split(".")[1]
          )
        );

        setUser(payload);
      } catch (error) {
        console.error(
          "Invalid token:",
          error
        );

        localStorage.removeItem(
          "token"
        );

        setUser(null);
        setToken(null);
      }
    }

    setLoading(false);
  }, []);

  const login = (
    jwtToken
  ) => {
    localStorage.setItem(
      "token",
      jwtToken
    );

    setToken(jwtToken);

    try {
      const payload = JSON.parse(
        atob(
          jwtToken.split(".")[1]
        )
      );

      setUser(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
    setToken(null);
  };

  const isAuthenticated =
    !!token;

  return {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  };
};

export default useAuth;