import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Drinks from "./Pages/Drink.jsx";
import UserInfo from "./Pages/UserInfo.jsx";
import Cart from "./Pages/Cart.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Management from "./Pages/Management.jsx";
import Order from "./Pages/Order.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Unauthorized from "./Pages/Unauthorized.jsx";
import About from "./Pages/About.jsx";
import ResetPassword from "./Pages/ResetPw.jsx";
import ForgotPassword from "./Pages/ForgotPW.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="drinks" element={<Drinks />} />
            <Route path="cart" element={<PrivateRoute><Cart /></PrivateRoute>}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="reset-password" element={<ResetPassword />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route path="404" element={<NotFound />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Navigate replace to="404" />} />
            <Route
              path="userInfo"
              element={
                <PrivateRoute>
                  <UserInfo />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="order"
              element={
                <PrivateRoute>
                  <Order />
                </PrivateRoute>
              }
            ></Route>
          </Route>

          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route
            path="management"
            element={
              <PrivateRoute adminOnly={true}>
                <Management />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
