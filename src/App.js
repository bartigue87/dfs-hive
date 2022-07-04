import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewTrackerPage from "./pages/NewTrackerPage";
import UserTrackers from "./pages/UserTrackers";
import Auth from "./pages/Auth";
import ArticlesPage from "./pages/ArticlesPage";
import MyPlays from "./pages/MyPlays";
import { AuthContext } from "../src/util/auth-context";
import UpdateTrackerPage from "./pages/UpdateTrackerPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./util/auth-hook";

function App() {
  const { login, logout, token, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/:userId/brm-tracker" element={<UserTrackers />} />
        <Route path="/new-tracker" element={<NewTrackerPage />} />
        <Route path="/update-tracker/:tid" element={<UpdateTrackerPage />} />
        <Route path="/add-transaction/:tid" element={<AddTransactionPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/brandons-plays" element={<MyPlays />} />
      </Routes>
    );
  } else {
    routes = (
      //TODO fix this so the when you click brm-tracker it redirects to login or display "Please create an account or login to use the bankroll tracker"
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/:userId/brm-tracker" element={<UserTrackers />} />
        <Route path="/new-tracker" element={<NewTrackerPage />} />
        <Route path="/update-tracker/:tid" element={<UpdateTrackerPage />} />
        <Route path="/add-transaction/:tid" element={<AddTransactionPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/brandons-plays" element={<MyPlays />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
