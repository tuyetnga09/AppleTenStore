import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RamDisplay from "./components/product_component/Ram/DisplayRam";
import RamCreateOrUpdate from "./components/product_component/Ram/DisplayRamCreate";
import ReturnDeleteRam from "./components/product_component/Ram/DisplayReturnDelete";
import ImportRam from "./components/product_component/Ram/DisplayImportRam";
import ScanRam from "./components/product_component/Ram/DisplayScanQR";
import ScreenDisplay from "./components/product_component/Screen/DisplayScreen";
import ScreenCreateOrUpdate from "./components/product_component/Screen/DisplayScreenCreateOrUpdate";
import ScreenDeleteScreen from "./components/product_component/Screen/DisplayReturnDeleteS";
import DisplaySize from "./components/product_component/Size/Display";
import FormAddOrUpdateSize from "./components/product_component/Size/FormAddOrUpdate";
import ReturnDeleteSize from "./components/product_component/Size/ReturnDeleteSize";
import ImportSize from "./components/product_component/Size/ImportSize";
import ScanSize from "./components/product_component/Size/DisplayScanQR";
import DisplayBattery from "./components/product_component/Battery/Display";
import FormAddOrUpdateBattery from "./components/product_component/Battery/FormAddOrUpdate";
import ReturnDeleteBattery from "./components/product_component/Battery/ReturnDeleteBattery";
import ImportBattery from "./components/product_component/Battery/ImportBattery";
import ScanBattery from "./components/product_component/Battery/DisplayScanQR";
import DisplayCategory from "./components/product_component/Category/DisplayCategory";
import CategoryDisplayReturn from "./components/product_component/Category/CategoryDisplayReturn";
import ImportCategory from "./components/product_component/Category/ImportCategory";
import AddCategory from "./components/product_component/Category/AddCategory";
import DisplayCapacity from "./components/product_component/Capacity/DisplayCapacity";
import CapacityReturn from "./components/product_component/Capacity/CapacityReturn";
import DisplayImportCapacity from "./components/product_component/Capacity/DisplayImportCapacity";
import SaveOrUpdateCapacity from "./components/product_component/Capacity/SaveOrUpdateCapacity";
import DisplayManufacture from "./components/product_component/Manufacture/DisplayManufacture";
import ReturnManufacture from "./components/product_component/Manufacture/ReturnManufacture";
import ImportManufacture from "./components/product_component/Manufacture/ImportManufacture";
import SaveOrUpdateManufacture from "./components/product_component/Manufacture/SaveOrUpdateManufacture";
import DisplayChip from "./components/product_component/Chip/DisplayChip";
import ImportChip from "./components/product_component/Chip/DisplayImportChip";
import AddChip from "./components/product_component/Chip/DislayChipCreate";
import ChipDisplayReturn from "./components/product_component/Chip/DisplayReturnDelete";
import ScanChip from "./components/product_component/Chip/DisplayScanQRChip";
import DisplayColor from "./components/product_component/Color/DisplayColor";
import ImportColor from "./components/product_component/Color/DisplayImportColor";
import AddColor from "./components/product_component/Color/DislayColorCreate";
import ColorDisplayReturn from "./components/product_component/Color/DisplayReturnDelete";
import ScanColor from "./components/product_component/Color/DisplayScanQRColor";
import ImageFormAddOrUpdate from "./components/product_component/image/FormAddOrUpdate";
import Display from "./components/product_component/image/Display";
import Home from "./components/Page_Comeponet/TrangChu";
import DisplayImei from "./components/product_component/Imei/Display";
import ReturnDeleteImei from "./components/product_component/Imei/ReturnDeleteImei";
import ImportImei from "./components/product_component/Imei/ImportImei";
import chat from "./components/custumer_componet/ChatRoom";
import product from "./components/product_component/Product/Display";
import Cproduct from "./components/product_component/Product/crud/create";
import Eproduct from "./components/product_component/Product/crud/edit";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/chat" exact component={chat} />
          <Route path="/ram/display" exact component={RamDisplay} />
          <Route path="/ram/im" exact component={ImportRam} />
          <Route path="/ram/scan" exact component={ScanRam} />
          <Route path="/ram/displayDelete" exact component={ReturnDeleteRam} />
          <Route path="/ram/:id" exact component={RamCreateOrUpdate} />

          <Route path="/category/display" exact component={DisplayCategory} />
          <Route
            path="/category/displayDelete"
            exact
            component={CategoryDisplayReturn}
          />
          <Route path="/category/im" exact component={ImportCategory} />
          <Route path="/category/:id" exact component={AddCategory} />

          <Route path="/capacity/display" exact component={DisplayCapacity} />
          <Route
            path="/capacity/displayDelete"
            exact
            component={CapacityReturn}
          />
          <Route path="/capacity/im" exact component={DisplayImportCapacity} />
          <Route path="/capacity/:id" exact component={SaveOrUpdateCapacity} />

          <Route
            path="/manufacture/display"
            exact
            component={DisplayManufacture}
          />
          <Route
            path="/manufacture/displayDelete"
            exact
            component={ReturnManufacture}
          />
          <Route path="/manufacture/im" exact component={ImportManufacture} />
          <Route
            path="/manufacture/:id"
            exact
            component={SaveOrUpdateManufacture}
          />

          <Route path="/size/getAll" exact component={DisplaySize} />
          <Route path="/size/im" exact component={ImportSize} />
          <Route path="/size/scan" exact component={ScanSize} />
          <Route
            path="/size/displayDelete"
            exact
            component={ReturnDeleteSize}
          />
          <Route path="/size/:id" exact component={FormAddOrUpdateSize} />

          <Route path="/battery/getAll" exact component={DisplayBattery} />
          <Route path="/battery/im" exact component={ImportBattery} />
          <Route path="/battery/scan" exact component={ScanBattery} />
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

          <Route path="/chip/getAll" exact component={DisplayChip} />
          <Route
            path="/chip/displayDelete"
            exact
            component={ChipDisplayReturn}
          />
          <Route path="/chip/im" exact component={ImportChip} />
          <Route path="/chip/:id" exact component={AddChip} />
          <Route path="/chip/scan" exact component={ScanChip} />

          <Route path="/image/display" exact component={Display} />
          <Route path="/image/:id" exact component={ImageFormAddOrUpdate} />
          <Route path="/color/getAll" exact component={DisplayColor} />
          <Route
            path="/color/displayDelete"
            exact
            component={ColorDisplayReturn}
          />
          <Route path="/color/im" exact component={ImportColor} />
          <Route path="/color/:id" exact component={AddColor} />
          <Route path="/color/scan" exact component={ScanColor} />

          <Route path="/imei/getAll" exact component={DisplayImei} />
          <Route path="/imei/im" exact component={ImportImei} />
          <Route
            path="/imei/displayDelete"
            exact
            component={ReturnDeleteImei}
          />
          <Route path="/image/:id" exact component={ImageFormAddOrUpdate} />

          <Route path="/product/display" exact component={product} />

          <Route path="/cproduct/:id" exact component={Cproduct} />

          <Route path="/rproduct/:id" exact component={Eproduct} />
        </Switch>
      </Router>
    </div>
    // </QueryClientProvider>
  );
}

export default App;
