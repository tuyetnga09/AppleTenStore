import React, { useState } from 'react';
import Header from "../../Page_Comeponet/layout/Header";
import Footer from "../../Page_Comeponet/layout/Footer";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function CartDisplay(){

  const duLieuTam = [
    {
      id: 1,
      name: "Samsung Galaxy M11",
      price: 15000000,
      quantity: 2,
      time: "2023/9/29:20:20:20",
    },
    {
      id: 2,
      name: "Headphones Bose 35 II",
      price: 25000000,
      quantity: 1,
      time: "2023/9/29:20:20:20",
    },
    {
      id: 3,
      name: "iPad 9.7 6-gen",
      price: 35000000,
      quantity: 2,
      time: "2023/9/29:20:20:20",
    },
  ];

  const [products, setProducts] = useState(duLieuTam);

  const handleUpQuantiy = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDownQuantiy = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return(
    <React.Fragment>
       <>
       <Header/>
       <div className="breadcrumbs_area">
        <div className="row" style={{marginTop: "10px", marginLeft: "20px"}}>
          <div id="detailPromo">
            <Link to={"/"}>Home</Link>
            <RightOutlined />
            <Link to={"/cart"}>Cart</Link>
          </div>
        </div>
      </div>
       <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card shopping-cart" style={{ borderRadius: 15 }}>
                <div className="card-body text-black">
                  <div className="row">
                    {/* <div className="col-lg-6 px-5 py-4"> */}
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                        Giỏ hàng
                      </h3>
                      <table>
                        <thead>
                          <tr style={{textAlign: "center"}}>
                            <th><h5 className="fw-bold mb-0 me-5 pe-3">Ảnh</h5></th>
                            <th><h5 className="fw-bold mb-0 me-5 pe-3">Sản phẩm</h5></th>
                            <th><h5 className="fw-bold mb-0 me-5 pe-3">Giá</h5></th>
                            <th><h5 className="fw-bold mb-0 me-5 pe-3">SL</h5></th>
                            <th><h5 className="fw-bold mb-0 me-5 pe-3">Thành tiền</h5></th>
                            <th><h5 className="fw-bold mb-0 me-5 pe-3">Thời gian</h5></th>
                            <th></th>
                          </tr>
                      </thead>
                      <tbody>
                      {products.map((product) => (
                          <tr class="alert" role="alert" >
                            <td>
                              <div className="flex-shrink-0">
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                                  className="img-fluid"
                                  style={{ width: "130px" }}
                                  alt="Generic placeholder image"
                                />
                              </div>
                            </td>
                            <td><h5 className="text-primary">{product.name}</h5></td>
                            <td><p className="fw-bold mb-0 me-5 pe-3">{product.price}</p></td>
                            <td>
                              <div className="def-number-input number-input safari_only" style={{paddingRight: "10px"}}>
                                        <button
                                          onClick={() => handleDownQuantiy(product.id)}
                                          className="minus"
                                        />
                                        <input
                                          className="quantity fw-bold text-black"
                                          min={0}
                                          name="quantity"
                                          value={product.quantity}
                                          type="number"
                                        />
                                        <button
                                          onClick={() => handleUpQuantiy(product.id)}
                                          className="plus"
                                        />
                                </div>
                            </td>
                            <td><p className="fw-bold mb-0 me-5 pe-3">{product.price}</p></td>
                            <td><p className="fw-bold mb-0 me-5 pe-3">{product.time}</p></td>
                            <td>
                              <a href="#!" className="float-end text-black">
                                      <FontAwesomeIcon icon={faTimes} />
                                </a>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end" style={{marginTop: "10px"}}>
                      <button class="btn btn-outline-primary me-md-2" type="button">Cập nhật giỏ hàng</button>
                      <button class="btn btn-outline-primary me-md-2" type="button">Xóa hết</button>
                    </div>
                      <hr
                        className="mb-4"
                        style={{ height: 2, backgroundColor: "#1266f1", opacity: 1, width: "98%" , marginTop: "20px"}}
                      />
                       <div
                              className="d-flex justify-content-between p-2 mb-2"
                              style={{ backgroundColor: "#e1f5fe" }}
                            >
                              <h5 className="fw-bold mb-0">Tồng tiền:</h5>
                              <h5 className="fw-bold mb-0">2261$</h5>
                            </div>
                       
                        <div class="d-grid gap-2 col-6 mx-auto">
                          <button
                            type="button"
                            className="btn btn-danger btn-block btn-lg"
                           
                          >
                            TIẾN HÀNH ĐẶT HÀNG
                          </button>
                        </div>
                        <h5
                          className="fw-bold mb-5"
                          style={{  bottom: 0 }}
                        >
                          <a href="/">
                          <FontAwesomeIcon icon={faArrowLeft} />
                            Tiếp tục mua hàng
                          </a>
                        </h5>
                    {/* </div> */}
                    {/* <div className="col-lg-6 px-5 py-4">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                        Customer
                      </h3>
                      <form className="mb-5">
                        <div className="form-outline mb-5">
                          <input
                            type="text"
                            id="typeText"
                            className="form-control form-control-lg"
                            // siez={17}
                            // defaultValue="1234 5678 9012 3457"
                            // minLength={19}
                            // maxLength={19}
                          />
                          <label className="form-label" htmlFor="typeText">
                            Full Name
                          </label>
                        </div>
                        <div className="form-outline mb-5">
                          <input
                            type="text"
                            id="typeName"
                            className="form-control form-control-lg"
                            // siez={17}
                            // defaultValue="John Smith"
                          />
                          <label className="form-label" htmlFor="typeName">
                            Email
                          </label>
                        </div>
                        <div className="row">
                          {/* <div className="col-md-6 mb-5"> */}
                            {/* <div className="form-outline">
                              <input
                                type="text"
                                id="typeExp"
                                className="form-control form-control-lg"
                                // defaultValue="01/22"
                                // size={7}
                                // minLength={7}
                                // maxLength={7}
                              />
                              <label className="form-label" htmlFor="typeExp">
                                Phone Number
                              </label>
                            </div> */}
                          {/* </div> */}
                          {/* <div className="col-md-6 mb-5">
                            <div className="form-outline">
                              <input
                                type="password"
                                id="typeText"
                                className="form-control form-control-lg"
                                defaultValue="●●●"
                                size={1}
                                minLength={3}
                                maxLength={3}
                              />
                              <label className="form-label" htmlFor="typeText">
                                Cvv
                              </label>
                            </div>
                          </div> */}
                        {/* </div>
                        <p className="mb-5">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit{" "}
                          <a href="#!">obcaecati sapiente</a>.
                        </p> */}
                         {/* </form> */}
                      {/* </div> */}
                      {/* <div className="row">
                        <div className="col-lg-6 px-5 py-4">

                        </div>
                        <div className="col-lg-6 px-5 py-4">
                          <div className="row">
                            <input
                                  type="text"
                                  id="typeText"
                                  className="form-control form-control-lg"
                                  placeholder='Voucher'
                                />
                              <button
                                type="button"
                                style={{ marginTop: "10px", marginBottom: "20px" }}
                                className="btn btn-primary btn-block btn-lg"
                              >
                                APPLY
                              </button>
                            </div>

                            <div className="d-flex justify-content-between px-x">
                              <p className="fw-bold">Discount:</p>
                              <p className="fw-bold">95$</p>
                            </div>

                            <div className="d-flex justify-content-between px-x">
                              <p className="fw-bold">Shipping:</p>
                              <p className="fw-bold">95$</p>
                            </div>
                            
                            <div
                              className="d-flex justify-content-between p-2 mb-2"
                              style={{ backgroundColor: "#e1f5fe" }}
                            >
                              <h5 className="fw-bold mb-0">Total:</h5>
                              <h5 className="fw-bold mb-0">2261$</h5>
                            </div>
                          </div>
                      </div> */}
                        
                     
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       <Footer/>
       </>
    </React.Fragment>
  )
}