import React from "react";
import RouterComponent from "./components/routes";
import "./App.css";
import AuthProvider from "react-auth-kit";
import store from "./util/auth";

function App() {
  return (
    <div className="App">
      <AuthProvider store={store}>
        <RouterComponent />
      </AuthProvider>
    </div>
  );
}

export default App;
