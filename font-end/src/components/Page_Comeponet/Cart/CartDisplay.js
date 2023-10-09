import React, { useState, useEffect } from 'react';
import { readAll, deleteCartDetail, updateQuantity, update} from "../../../service/cart.service";
import Header from "../../Page_Comeponet/layout/Header";
import Footer from "../../Page_Comeponet/layout/Footer";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RightOutlined } from "@ant-design/icons";
import { Link ,useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { notification  } from "antd";
import { getOneSKU } from "../../../service/sku.service";

export default function CartDisplay(){
  const history = useHistory();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    readAll(1)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

     
  }, []);

  async function remove(id) {
    deleteCartDetail(id).then(() => {
      let newArr = [...products].filter((s) => s.id !== id);
      setProducts(newArr);
      window.location.reload();
    });
  }

  // const [sku, setSKU] = useState([]);

  const handleUpdateQuantity = (cartItemId, newQuantity, idSKU) => {
    if (newQuantity <= 0) {
      // xóa sản phẩm khỏi giỏ hàng khi so luong bang 0
      deleteCartDetail(cartItemId);
      window.location.reload();
  } else {
      update(cartItemId, newQuantity)
          .then((response) => {
              console.log("Phản hồi từ máy chủ:", response.data);
              readAll(1)
                  .then((response) => {
                      console.log("Dữ liệu giỏ hàng sau khi cập nhật:", response.data);
                      // getOneSKU(idSKU)
                      // .then((response) => {
                      //   console.log(response.data);
                      //  setSKU(response.data);
                      //   if(sku.quantity <= 0){
                      //     notification.error({
                      //       message: "ADD TO CART",
                      //       description: "Sản phẩm đang tạm thời hết hàng",
                      //     });
                      //   }else{
                      //     notification.success({
                      //       message: "ADD TO CART",
                      //       description: "Cập nhật giỏ hàng thành công",
                      //     });
                      //   }
                         
                      // })
                      // .catch((error) => {
                      //   console.log(`${error}`);
                      // });
                      setProducts(response.data);
                  })
                  .catch((error) => {
                      console.log("Lỗi khi đọc lại giỏ hàng:", error);
                  });
          })
          .catch((error) => {
              console.log(`Lỗi khi cập nhật số lượng: ${error}`);
          });
  }
  };
  
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    calculateTotalPrice();
  }, [products]);
  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      // Chuyển đổi giá trị total từ dạng chuỗi sang số và cộng vào tổng
      const productTotal = parseFloat(product.total);
      total += productTotal;
    });
    // Đặt lại giá trị tổng giá tiền
    setTotalPrice(total);
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
       <section className="h-100 h-custom" style={{ backgroundColor: "#fffff" }}>
        
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
                          <tr class="alert" role="alert">
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
                            <td>
                              <h5 className="text-primary" style={{paddingTop: "15px"}}>{product.nameProduct}</h5>
                              <p style={{fontSize: "15px"}}>
                                Dung lượng: {product.capacity}
                                <br/>
                                Màu sắc: {product.color}
                                </p>
                            </td>
                            <td><p className="fw-bold mb-0 me-5 pe-3">{product.price}</p></td>
                            <td>
                              <div className="def-number-input number-input safari_only" style={{paddingRight: "10px"}}>
                                        <button
                                          // onClick={() => handleDownQuantiy(product.id)}
                                          // className="minus"
                                          onClick={() => handleUpdateQuantity(product.idCartDetail, product.quantity - 1, product.idSKU)}
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
                                          // onClick={() => handleUpQuantiy(product.id)}
                                          // className="plus"
                                          onClick={() => handleUpdateQuantity(product.idCartDetail, parseInt(product.quantity) + 1, product.idSKU)}
                                          className="plus"
                                        />
                                </div>
                            </td>
                            <td><p className="fw-bold mb-0 me-5 pe-3">{product.total}</p></td>
                            <td><p className="fw-bold mb-0 me-5 pe-3">{product.dateCreate}</p></td>
                           
                            <td>
                           
                              <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                              onClick={() => remove(product.idCartDetail)}
                            >
                              <span aria-hidden="true">
                                <FontAwesomeIcon icon={faTimes}  style={{paddingRight: "10px"}} />
                              </span>
                              </button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end" style={{marginTop: "10px"}}>
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
                              <h5 className="fw-bold mb-0">{totalPrice?.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}</h5>
                            </div>
                       
                        <div class="d-grid gap-2 col-6 mx-auto">
                          <Link to={"/checkout"}>
                              <button
                            type="button"
                            className="btn btn-danger btn-block btn-lg"
                           
                          >
                            TIẾN HÀNH ĐẶT HÀNG
                          </button>
                          </Link>
                         
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