import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import RamDisplay from "./components/product_component/Ram/DisplayRam";
import Display from "./components/product_component/Size/Display";
import FormAddOrUpdate from "./components/product_component/Size/FormAddOrUpdate";

function App() {
  return (
    // <div className="App">
    //   <h1>Wellcome to React Project</h1>
    // </div>
    <div>
      <Router>
        {/* <div className="container"> */}
        <Switch>
          {/* <Route path="/ram/display" exact component={RamDisplay} /> */}
          <Route path="/size/getAll" exact component={Display} />
          <Route path="/size/:id" exact component={FormAddOrUpdate} />
        </Switch>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
