import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import RamDisplay from "./components/product_component/Ram/DisplayRam";
import RamCreateOrUpdate from "./components/product_component/Ram/DisplayRamCreate";
import ReturnDeleteRam from "./components/product_component/Ram/DisplayReturnDelete";
import ImportRam from "./components/product_component/Ram/DisplayImportRam";
import ScanRam from "./components/product_component/Ram/DisplayScanQR";
import ScreenDisplay from "./components/product_component/Screen/DisplayScreen";
import ScreenCreateOrUpdate from "./components/product_component/Screen/DisplayScreenCreateOrUpdate";
import ScreenDeleteScreen from "./components/product_component/Screen/DisplayReturnDeleteS";
import ImportScreen from "./components/product_component/Screen/DisplayImportScreen";
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
import Home from "./components/Page_Comeponet/page/TrangChu";
import DisplayImei from "./components/product_component/Imei/Display";
import ReturnDeleteImei from "./components/product_component/Imei/ReturnDeleteImei";
import ImportImei from "./components/product_component/Imei/ImportImei";
import chat from "./components/custumer_componet/ChatRoom";
import Product from "./components/product_component/Product/Display";
import Cproduct from "./components/product_component/Product/crud/create";
import Voucher from "./components/Page_Comeponet/Voucher/VoucherDisplay";
import blog from "./components/Page_Comeponet/Blogs";
import Cart from "./components/Page_Comeponet/Cart/CartDisplay";
import ReturnDeleteProduct from "./components/product_component/Product/ReturnDeleteProduct";
import SingleProduct from "./components/custumer_componet/product_detail";
import Dashboard from "./components/Page_Comeponet/dashboard/index";
import Checkout from "./components/Page_Comeponet/Checkout/index";
import Login from "./components/Page_Comeponet/Login/login";
import SignUp from "./components/Page_Comeponet/Login/signup";
import ForgotPassword from "./components/Page_Comeponet/Login/forgotpassword";
import OderDisplay from "./components/Page_Comeponet/OderManager/OderDisplay";
import ChatManager from "./components/Page_Comeponet/Chat/ChatManger";
import SkuDisplay from "./components/product_component/SKU/SkuDisplay";
import CategoryDisplay from "./components/Page_Comeponet/Categories/index";
import AccountList from "./components/Page_Comeponet/Account/index";
import SellOffline from "./components/Page_Comeponet/SellOffline/SellSmartOffline";
import Paydone from "./components/Page_Comeponet/Paydone";
import SignUpAdmin from "./components/Page_Comeponet/Login/signupAdmin";
import OderUserAll from "./components/Page_Comeponet/OderUser/TatCa";
import OderUserChoThanhToan from "./components/Page_Comeponet/OderUser/ChoXacNhan";
import OderUserChoVanChuyen from "./components/Page_Comeponet/OderUser/ChoVanChuyen";
import OderUserVanChuyen from "./components/Page_Comeponet/OderUser/VanChuyen";
import OderUserHoanThanh from "./components/Page_Comeponet/OderUser/HoanThanh";
import OderUserDaHuy from "./components/Page_Comeponet/OderUser/DaHuy";
import ProfileCustomer from "./components/Page_Comeponet/ProfileCustomer/index";
import Product_detail_dashbroad from "./components/Page_Comeponet/prduct_detail/sku/index";
import OderCustomerAll from "./components/Page_Comeponet/OderCustomer";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { notification } from "antd";

const storedUser = JSON.parse(localStorage.getItem("account"));
const fetchData = async () => {
  const pass = atob(storedUser.password);
  try {
    const response = await fetch(
      `http://localhost:8080/admin/account/login?email=${storedUser?.email}&password=${pass}`
    );
    const result = await response.json();
    console.log(result);
    if (result !== null) {
      localStorage.removeItem("account");
      localStorage.setItem("account", JSON.stringify(result));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
function App() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Gọi hàm gọi API khi component được mount

    if (storedUser !== null) {
      fetchData();
    }
    console.count("Số lần Callback trong useEffect chạy");
  }, []);
  console.count("Render");

  return (
    <div>
      <Router>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Switch>
          <Route path="/blog" exact component={blog} />
          <Route path="/" exact component={Home} />
          <Route path="/chat" exact component={chat} />
          <Route path="/product" exact component={Product} />
          {/* <Route path="/product">
            {storedUser?.roles === "CUSTOMER" ||
            storedUser === null ||
            storedUser?.roles === "NHAN_VIEN_BAN_HANG" ? (
              <Redirect to="/" />
            ) : (
              <Product />
            )}
          </Route> */}
          <Route path="/ram/display" exact component={RamDisplay} />
          {/* <Route path="/ram/display">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <RamDisplay />
            )}
          </Route> */}
          {/* <Route path="/ram/im" exact component={ImportRam} /> */}
          <Route path="/ram/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportRam />
            )}
          </Route>
          {/* <Route path="/ram/scan" exact component={ScanRam} /> */}
          <Route path="/ram/scan">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ScanRam />
            )}
          </Route>
          <Route path="/ram/displayDelete" exact component={ReturnDeleteRam} />
          {/* <Route path="/ram/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ReturnDeleteRam />
            )}
          </Route> */}
          <Route path="/ram/:id" exact component={RamCreateOrUpdate} />
          {/* <Route path="/ram/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <RamCreateOrUpdate />
            )}
          </Route> */}
          <Route path="/category/display" exact component={DisplayCategory} />
          {/* <Route path="/category/display">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplayCategory />
            )}
          </Route> */}
          <Route
            path="/category/displayDelete"
            exact
            component={CategoryDisplayReturn}
          />
          {/* <Route path="/category/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <CategoryDisplayReturn />
            )}
          </Route> */}
          {/* <Route path="/category/im" exact component={ImportCategory} /> */}
          <Route path="/category/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportCategory />
            )}
          </Route>
          <Route path="/category/:id" exact component={AddCategory} />
          {/* <Route path="/category/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <AddCategory />
            )}
          </Route> */}
          <Route path="/capacity/display" exact component={DisplayCapacity} />
          {/* <Route path="/category/display">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplayCapacity />
            )}
          </Route> */}
          <Route
            path="/capacity/displayDelete"
            exact
            component={CapacityReturn}
          />
          {/* <Route path="/category/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <CapacityReturn />
            )}
          </Route> */}
          {/* <Route path="/capacity/im" exact component={DisplayImportCapacity} /> */}
          <Route path="/capacity/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplayImportCapacity />
            )}
          </Route>
          <Route path="/capacity/:id" exact component={SaveOrUpdateCapacity} />
          {/* <Route path="/capacity/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <SaveOrUpdateCapacity />
            )}
          </Route> */}
          <Route
            path="/manufacture/display"
            exact
            component={DisplayManufacture}
          />
          {/* <Route path="/manufacture/display">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplayManufacture />
            )}
          </Route> */}
          <Route
            path="/manufacture/displayDelete"
            exact
            component={ReturnManufacture}
          />
          {/* <Route path="/manufacture/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ReturnManufacture />
            )}
          </Route> */}
          {/* <Route path="/manufacture/im" exact component={ImportManufacture} /> */}
          <Route path="/manufacture/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportManufacture />
            )}
          </Route>
          <Route
            path="/manufacture/:id"
            exact
            component={SaveOrUpdateManufacture}
          />
          {/* <Route path="/manufacture/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <SaveOrUpdateManufacture />
            )}
          </Route> */}
          <Route path="/size/getAll" exact component={DisplaySize} />
          {/* <Route path="/size/getAll">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplaySize />
            )}
          </Route> */}
          {/* <Route path="/size/im" exact component={ImportSize} /> */}
          <Route path="/size/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportSize />
            )}
          </Route>
          {/* <Route path="/size/scan" exact component={ScanSize} /> */}
          <Route path="/size/scan">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ScanSize />
            )}
          </Route>
          <Route
            path="/size/displayDelete"
            exact
            component={ReturnDeleteSize}
          />
          {/* <Route path="/size/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ReturnDeleteSize />
            )}
          </Route> */}
          <Route path="/size/:id" exact component={FormAddOrUpdateSize} />
          {/* <Route path="/size/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <FormAddOrUpdateSize />
            )}
          </Route> */}
          <Route path="/battery/getAll" exact component={DisplayBattery} />
          {/* <Route path="/battery/getAll">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplayBattery />
            )}
          </Route> */}
          {/* <Route path="/battery/im" exact component={ImportBattery} /> */}
          <Route path="/battery/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportBattery />
            )}
          </Route>
          {/* <Route path="/battery/scan" exact component={ScanBattery} /> */}
          <Route path="/battery/scan">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ScanBattery />
            )}
          </Route>
          <Route
            path="/battery/displayDelete"
            exact
            component={ReturnDeleteBattery}
          />
          {/* <Route path="/battery/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ReturnDeleteBattery />
            )}
          </Route> */}
          <Route path="/battery/:id" exact component={FormAddOrUpdateBattery} />
          {/* <Route path="/battery/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <FormAddOrUpdateBattery />
            )}
          </Route> */}
          <Route path="/screen/display" exact component={ScreenDisplay} />
          {/* <Route path="/screen/display">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ScreenDisplay />
            )}
          </Route> */}
          {/* <Route path="/screen/im" exact component={ImportScreen} /> */}
          <Route path="/screen/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportScreen />
            )}
          </Route>
          <Route
            path="/screen/displayDelete"
            exact
            component={ScreenDeleteScreen}
          />
          {/* <Route path="/screen/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ScreenDeleteScreen />
            )}
          </Route> */}
          <Route path="/screen/:id" exact component={ScreenCreateOrUpdate} />
          {/* <Route path="/screen/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ScreenCreateOrUpdate />
            )}
          </Route> */}
          <Route path="/chip/getAll" exact component={DisplayChip} />
          {/* <Route path="/chip/getAll">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplayChip />
            )}
          </Route> */}
          <Route
            path="/chip/displayDelete"
            exact
            component={ChipDisplayReturn}
          />
          {/* <Route path="/chip/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ChipDisplayReturn />
            )}
          </Route> */}
          {/* <Route path="/chip/im" exact component={ImportChip} /> */}
          <Route path="/chip/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportChip />
            )}
          </Route>
          <Route path="/chip/:id" exact component={AddChip} />
          {/* <Route path="/chip/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <AddChip />
            )}
          </Route> */}
          {/* <Route path="/chip/scan" exact component={ScanChip} /> */}
          <Route path="/chip/scan">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ScanChip />
            )}
          </Route>
          <Route path="/image/display" exact component={Display} />
          {/* <Route path="/image/display">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <Display />
            )}
          </Route> */}
          {/* <Route path="/image/:id" exact component={ImageFormAddOrUpdate} /> */}
          <Route path="/image/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImageFormAddOrUpdate />
            )}
          </Route>
          <Route path="/color/getAll" exact component={DisplayColor} />
          {/* <Route path="/color/getAll">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplayColor />
            )}
          </Route> */}
          <Route
            path="/color/displayDelete"
            exact
            component={ColorDisplayReturn}
          />
          {/* <Route path="/color/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ColorDisplayReturn />
            )}
          </Route> */}
          {/* <Route path="/color/im" exact component={ImportColor} /> */}
          <Route path="/color/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportColor />
            )}
          </Route>
          <Route path="/color/:id" exact component={AddColor} />
          {/* <Route path="/color/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <AddColor />
            )}
          </Route> */}
          {/* <Route path="/color/scan" exact component={ScanColor} /> */}
          <Route path="/color/scan">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ScanColor />
            )}
          </Route>
          <Route path="/imei/getAll" exact component={DisplayImei} />
          {/* <Route path="/imei/getAll">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <DisplayImei />
            )}
          </Route> */}
          {/* <Route path="/imei/im" exact component={ImportImei} /> */}
          <Route path="/imei/im">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImportImei />
            )}
          </Route>
          <Route
            path="/imei/displayDelete"
            exact
            component={ReturnDeleteImei}
          />
          {/* <Route path="/imei/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ReturnDeleteImei />
            )}
          </Route> */}
          {/* <Route path="/image/:id" exact component={ImageFormAddOrUpdate} /> */}
          <Route path="/image/:id">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ImageFormAddOrUpdate />
            )}
          </Route>
          <Route path="/cproduct/display" exact component={Cproduct} />
          {/* <Route path="/cproduct/display">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <Cproduct />
            )}
          </Route> */}
          <Route
            path="/product/displayDelete"
            exact
            component={ReturnDeleteProduct}
          />
          {/* <Route path="/product/displayDelete">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <ReturnDeleteProduct />
            )}
          </Route> */}
          <Route path="/dashboard" exact component={Dashboard} />
          {/* <Route path="/dashboard">
            {storedUser?.roles !== "ADMIN" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <Dashboard />
            )}
          </Route> */}
          <Route path="/productDetail/:id" exact component={SingleProduct} />
          <Route path="/voucher" exact component={Voucher} />
          {/* <Route path="/voucher">
            {storedUser?.roles !== "ADMIN" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <Voucher />
            )}
          </Route> */}
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/login">
            {storedUser !== null ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup">
            {storedUser !== null ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Route path="/signupAdmin">
            {storedUser !== null ? <Redirect to="/" /> : <SignUpAdmin />}
          </Route>
          <Route path="/forgotpassword">
            {storedUser !== null ? <Redirect to="/" /> : <ForgotPassword />}
          </Route>
          <Route path="/orders" exact component={OderDisplay} />
          {/* <Route path="/orders">
            {storedUser?.roles === "CUSTOMER" ||
            storedUser === null ||
            storedUser?.roles === "NHAN_VIEN_BAN_HANG" ? (
              <Redirect to="/" />
            ) : (
              <OderDisplay />
            )}
          </Route> */}
          <Route path="/chats" exact component={ChatManager} />
          <Route path="/sku/display" exact component={SkuDisplay} />
          {/* <Route path="/sku/display">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <SkuDisplay />
            )}
          </Route> */}
          <Route path="/categories" exact component={CategoryDisplay} />
          {/* <Route path="/categories">
            {storedUser?.roles !== "ADMIN" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <CategoryDisplay />
            )}
          </Route> */}
          <Route path="/users" exact component={AccountList} />
          {/* <Route path="/users">
            {storedUser?.roles !== "ADMIN" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <AccountList />
            )}
          </Route> */}
          <Route path="/sell" exact component={SellOffline} />
          {/* <Route path="/sell">
            {storedUser?.roles === "CUSTOMER" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <SellOffline />
            )}
          </Route> */}
          <Route path="/paydone" exact component={Paydone} />
          <Route path="/oderUserAll" exact component={OderUserAll} />
          <Route path="/oderUserCTT" exact component={OderUserChoThanhToan} />
          <Route path="/oderUserCVC" exact component={OderUserChoVanChuyen} />
          <Route path="/oderUserVC" exact component={OderUserVanChuyen} />
          <Route path="/oderUserHT" exact component={OderUserHoanThanh} />
          <Route path="/oderUserDH" exact component={OderUserDaHuy} />
          <Route path="/profile" exact component={ProfileCustomer} />
          {/* <Route path="/profile">
            {storedUser === null ? <Redirect to="/" /> : <ProfileCustomer />}
          </Route> */}
          <Route
            path="/admin/product-detail"
            exact
            component={Product_detail_dashbroad}
          />
          {/* <Route path="/admin/product-detail">
            {storedUser?.roles !== "ADMIN" || storedUser === null ? (
              <Redirect to="/" />
            ) : (
              <Product_detail_dashbroad />
            )}
          </Route> */}
          <Route path="/oderCustomerAll" exact component={OderCustomerAll} />
        </Switch>
        {/* </Suspense> */}
      </Router>
    </div>
  );
}

export default App;
