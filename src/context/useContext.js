import { createContext, useContext, useState, useEffect } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));


    const setServerToken = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken); // Corrected from setToken to setItem
    }

    const isLoggedIn = !!token;

    const userAuthorization = async () => {
        if (!token) return;

        try {
            const local_url = "http://localhost:3001/api/user";
            const response = await fetch(local_url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response) {
                const userData = await response.json();
                console.log(userData.data)
                setUser(userData.data);
                localStorage.setItem("user", JSON.stringify(userData.data))
                setLogin(true);
            } else {
                console.error("Failed to fetch user data:", response.statusText);
                setLogin(false);
            }
        } catch (err) {
            console.error("Error during fetch:", err);
            setLogin(false);
        }

    }

    const logoutUser = () => {
        setToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cartItems");
        setLogin(false);
        setUser('');
    }

    useEffect(() => {
        userAuthorization();
    }, [token]);

    return (
        <MyContext.Provider value={{
            login, setLogin, token, setToken, user, setUser,
            setServerToken,
            isLoggedIn,
            logoutUser
        }}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyContext = () => useContext(MyContext);
