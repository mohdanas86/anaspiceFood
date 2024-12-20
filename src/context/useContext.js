import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const Navigate = useNavigate();
  const [menu, setMenu] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const cheackuser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = cheackuser?.isAdmin === "true";

  const setServerToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken); // Corrected from setToken to setItem
  }

  const isLoggedIn = !!token;

  // Memoize the userAuthorization function
  const userAuthorization = useCallback(async () => {
    if (!token) return;

    try {
      const local_url = `${process.env.REACT_APP_BACKEND_URL}/api/user`;
      const response = await fetch(local_url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // console.log(userData.data);
        setUser(userData.data);
        localStorage.setItem("user", JSON.stringify(userData.data));
        setLogin(true);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
        setLogin(false);
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setLogin(false);
    }
  }, [token]);  // Only recreate userAuthorization if token changes

  // useEffect to call the userAuthorization function when token changes
  useEffect(() => {
    userAuthorization();
  }, [userAuthorization]);  // Effect runs whenever userAuthorization changes

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setLogin(false);
    setUser('');
    Navigate("/signin")
  }

  const handleShowMore = () => {
    setVisibleCount((visibleCount) => visibleCount + 3);
  };

  return (
    <MyContext.Provider value={{
      login, setLogin, token, setToken, user, setUser,
      setServerToken,
      isLoggedIn,
      logoutUser,
      visibleCount,
      setVisibleCount,
      handleShowMore,
      menu, setMenu, isAdmin
    }}>
      {children}
    </MyContext.Provider>
  );
}

export const useMyContext = () => useContext(MyContext);
