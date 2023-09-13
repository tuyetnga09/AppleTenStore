import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RamDisplay from "./components/product_component/Ram/DisplayRam";
import RamCreateOrUpdate from "./components/product_component/Ram/DisplayRamCreate";
import ReturnDeleteRam from "./components/product_component/Ram/DisplayReturnDelete";
import ImportRam from "./components/product_component/Ram/DisplayImportRam";
import ScreenDisplay from "./components/product_component/Screen/DisplayScreen";
import ScreenCreateOrUpdate from "./components/product_component/Screen/DisplayScreenCreateOrUpdate";
import ScreenDeleteScreen from "./components/product_component/Screen/DisplayReturnDeleteS";
import DisplaySize from "./components/product_component/Size/Display";
import FormAddOrUpdateSize from "./components/product_component/Size/FormAddOrUpdate";
import ReturnDeleteSize from "./components/product_component/Size/ReturnDeleteSize";
import ImportSize from "./components/product_component/Size/ImportSize";
import DisplayBattery from "./components/product_component/Battery/Display";
import FormAddOrUpdateBattery from "./components/product_component/Battery/FormAddOrUpdate";
import ReturnDeleteBattery from "./components/product_component/Battery/ReturnDeleteBattery";
import ImportBattery from "./components/product_component/Battery/ImportBattery";
import ImageFormAddOrUpdate from "./components/product_component/image/FormAddOrUpdate";
import Display from "./components/product_component/image/Display";

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
          <Route path="/ram/im" exact component={ImportRam} />
          <Route path="/ram/displayDelete" exact component={ReturnDeleteRam} />
          <Route path="/ram/:id" exact component={RamCreateOrUpdate} />

          <Route path="/size/getAll" exact component={DisplaySize} />
          <Route path="/size/im" exact component={ImportSize} />
          <Route
            path="/size/displayDelete"
            exact
            component={ReturnDeleteSize}
          />
          <Route path="/size/:id" exact component={FormAddOrUpdateSize} />

          <Route path="/battery/getAll" exact component={DisplayBattery} />
          <Route path="/battery/im" exact component={ImportBattery} />
          <Route
            path="/battery/displayDelete"
            exact
            component={ReturnDeleteBattery}
          />
          <Route path="/battery/:id" exact component={FormAddOrUpdateBattery} />

          <Route path="/screen/display" exact component={ScreenDisplay} />
          <Route
            path="/screen/displayDelete"
            exact
            component={ScreenDeleteScreen}
          />
          <Route path="/screen/:id" exact component={ScreenCreateOrUpdate} />

          <Route path="/image/:id" exact component={ImageFormAddOrUpdate} />
          <Route path="/image/display" exact component={Display} />
        </Switch>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
