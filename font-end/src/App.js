import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RamDisplay from "./components/product_component/Ram/DisplayRam";
import RamCreateOrUpdate from "./components/product_component/Ram/DisplayRamCreate";
import ReturnDeleteRam from "./components/product_component/Ram/DisplayReturnDelete";
import ScreenDisplay from "./components/product_component/Screen/DisplayScreen";
import ScreenCreateOrUpdate from "./components/product_component/Screen/DisplayScreenCreateOrUpdate";
import ScreenDeleteScreen from "./components/product_component/Screen/DisplayReturnDeleteS";
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
          <Route path="/ram/display" exact component={RamDisplay} />
          <Route path="/ram/displayDelete" exact component={ReturnDeleteRam} />
          <Route path="/ram/:id" exact component={RamCreateOrUpdate} />

          <Route path="/size/getAll" exact component={Display} />
          <Route path="/size/:id" exact component={FormAddOrUpdate} />

          <Route path="/screen/display" exact component={ScreenDisplay} />
          <Route path="/screen/displayDelete" exact component={ScreenDeleteScreen} />
          <Route path="/screen/:id" exact component={ScreenCreateOrUpdate} />

        </Switch>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
