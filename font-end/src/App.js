import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import RamDisplay from "./components/product_component/Ram/DisplayRam"

function App() {
  return (
    // <div className="App">
    //   <h1>Wellcome to React Project</h1>
    // </div>
    <div>
    <Router>
      <div className="container">
        <Switch>
          <Route path="/ram/display" exact component={RamDisplay} />
        </Switch>
      </div>
    </Router>
  </div>
  );
}

export default App;
