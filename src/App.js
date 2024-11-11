import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Orders from './Pages/Orders';
import { MyProvider } from './context/useContext';
import { CartProvider } from './context/CartContext';
import Cart from './Pages/Cart';
import Footer from './components/Footer';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import NewDish from './Pages/admin/NewDish';
import DishInfo from './components/DishInfo';
import Checkout from './Pages/checkout/Checkout';
import DishList from './Pages/category/DishList';
import UseProfile from './components/UseProfile';
import { useEffect, useState } from 'react';

function App() {
  // State to store the user and isAdmin status
  // const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Retrieve user data from localStorage on mount
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // setUser(storedUser);
      setIsAdmin(storedUser.isAdmin === 'true');
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  return (
    <BrowserRouter>
      <MyProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dishes/:id" element={<DishInfo />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/catogery" element={<DishList />} />
            <Route path="/profile" element={<UseProfile />} />
            {/* Conditionally render the NewDish route based on isAdmin */}
            <Route path="/newdish" element={isAdmin ? <NewDish /> : <Navigate to="/" />} />
          </Routes>
          <Footer />
        </CartProvider>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
