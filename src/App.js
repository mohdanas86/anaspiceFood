import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/newdish" element={<NewDish />} />
            <Route path="/dishes/:id" element={<DishInfo />} />
            <Route path="/catogery" element={<DishList />} />
            <Route path="/profile" element={<UseProfile />} />
          </Routes>
          <Footer />
        </CartProvider>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
