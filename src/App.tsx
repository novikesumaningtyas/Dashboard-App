import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import  SelectApi  from "./components/AppDetails/CreateAppDetails/SelectApi";
import MiniAppContainer from "./components/AppContainer/AppContainer";
import { Provider } from "react-redux";
import { createStoreWithReducers } from "./lib/store/index";
import { Badge } from "react-bootstrap";
import ClientManagement from "./components/ClientManagement/ClientManagement";

function App() {
  return (
    <>
      <div className="App">
        <MiniAppContainer>
          <Provider store={createStoreWithReducers() as any}>
            {/* <Dashboard/> */}
            {/* <SelectApi /> */}
            <ClientManagement/>
          </Provider>
        </MiniAppContainer>
      </div>
    </>
  );
}

export default App;
