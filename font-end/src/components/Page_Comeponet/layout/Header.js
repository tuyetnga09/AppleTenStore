import React, { useState, useEffect } from "react";
import { readQuantityInCart } from "../../../service/cart.service";
import { Link } from "react-router-dom";

export default function Header() {
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const idAccount = storedUser !== null ? storedUser.id : ""; //sau khi đăng nhập thì truyền idAccount vào đây
  const [quantity, setQuantity] = useState([]);
  const storedBill = JSON.parse(localStorage.getItem("bill"));
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  useEffect(() => {
    if (idAccount !== null && idAccount !== "") {
      readQuantityInCart(idAccount)
        .then((response) => {
          console.log(response.data);
          setQuantity(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    } else {
      // Tính tổng số lượng sản phẩm trong giỏ hàng
      const totalQuantity = cartItems.reduce(
        (total, product) => total + product.quantity,
        0
      );
      setQuantity(totalQuantity);
    }
  }, [storedBill]);

  // const fetchQuantity = () => {
  //   readQuantityInCart(1)
  //     .then((response) => {
  //       console.log(response.data);
  //       setQuantity(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(`${error}`);
  //     });
  // };

  // useEffect(() => {
  //   // Khởi chạy lần đầu
  //   fetchQuantity();

  //   // Thiết lập một interval để gọi fetchQuantity sau mỗi 5 giây (hoặc thời gian bạn muốn)
  //   const intervalId = setInterval(() => {
  //     fetchQuantity();
  //   }, 1000);

  //   // Hủy interval khi component unmount (nếu cần)
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <React.Fragment>
      <>
        <div class="top-nav group">
          <section>
            <div class="social-top-nav">
              <a class="fa fa-facebook"></a>
              <a class="fa fa-twitter"></a>
              <a class="fa fa-google"></a>
              <a class="fa fa-youtube"></a>
            </div>
            {/* <!-- End Social Topnav --> */}

            <ul class="top-nav-quicklink flexContain">
              <li>
                <Link to="/">
                  <i className="fa fa-newspaper-o"></i> Trang chủ
                </Link>
              </li>

              <li>
                <Link to="/blog">
                  <i className="fa fa-newspaper-o"></i> Blogs
                </Link>
              </li>

              <li>
                <Link to="/chat">
                  <i className="fa fa-newspaper-o"></i> Liên hệ/Chat
                </Link>
              </li>
              <li>
                <a href="gioithieu.html">
                  <i class="fa fa-info-circle"></i> Giới thiệu
                </a>
              </li>
              <li>
                <a href="trungtambaohanh.html">
                  <i class="fa fa-wrench"></i> Bảo hành
                </a>
              </li>
              <li>
                <Link to="/policy">
                  <i className="fa fa-newspaper-o"></i>Chính sách
                </Link>
              </li>
            </ul>
            {/* <!-- End Quick link --> */}
          </section>
          {/* <!-- End Section --> */}
        </div>
        {/* <!-- End Top Nav  --> */}
        <div className="header group">
          <div className="logo">
            <Link to="/">
              <img
                src="/img/logo.jpg"
                alt="Trang chủ Smartphone Store"
                title="Trang chủ Smartphone Store"
              />
            </Link>
          </div>{" "}
          {/* End Logo */}
          <div className="content">
            <div
              className="search-header"
              style={{ position: "relative", left: 162, top: 1 }}
            >
              {/* <form className="input-search" method="get" action="index.html">
                <div className="autocomplete">
                  <input
                    id="search-box"
                    name="search"
                    autoComplete="off"
                    type="text"
                    placeholder="Tìm kiếm..."
                  />
                  <button type="submit">
                    <i className="fa fa-search" />
                    Tìm kiếm
                  </button>
                </div>
              </form>{" "} */}
              {/* End Form search */}
              {/* <div className="tags">
                <strong>Từ khóa: </strong>
                <a href="index.html?search=Samsung">Iphone 11</a>
                <a href="index.html?search=Samsung">Iphone 12</a>
                <a href="index.html?search=Samsung">Iphone 13</a>
              </div> */}
            </div>{" "}
            {/* End Search header */}
            <div className="tools-member">
              <div className="cart">
                <Link to={storedUser !== null ? "/profile" : "/login"}>
                {storedUser?.user?.avatar == null ? (
                  <img
                    style={{ width: 36, height: 36 }}
                    class="img-account-profile rounded-circle mb-2"
                    src={
                      "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                    }
                    alt=""
                  />
                ) : (
                  <img
                    style={{ width: 36, height: 36 }}
                    class="img-account-profile rounded-circle mb-2"
                    src={`/imageUpload/` + storedUser?.user?.avatar}
                    alt=""
                  />
                )}{" "}
                  {/* {account == null ? "Tài khoản" : account.user.fullName} */}
                  {localStorage.getItem("account") !== null
                    ? storedUser?.user?.fullName
                    : "Tài khoản"}
                </Link>
                {/* <div className="menuMember hide">
            <a href="nguoidung.html">Trang người dùng</a>
            <a onclick="if(window.confirm('Xác nhận đăng xuất ?')) logOut();">
              Đăng xuất
            </a>
          </div> */}
              </div>{" "}
              {/* End Member */}
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-cart" />{" "}
                  <span>Giỏ hàng</span>
                  <span className="cart-number">{quantity}</span>
                </Link>
              </div>{" "}
              {/* End Cart */}
              <div class="check-order">
                {/* <Link to="/oderUserAll">
                  <i class="fa fa-truck"></i>
                  <span>Đơn hàng</span>
                </Link> */}
                <Link
                  to={storedUser === null ? "/oderCustomerAll" : "/oderUserAll"}
                >
                  <i class="fa fa-truck"></i>{" "}
                  <span>Đơn hàng</span>
                </Link>
              </div>
            </div>
          </div>
          {/* End Tools Member */}
        </div>{" "}
        {/* End Content */} {/* End Header */}
      </>
    </React.Fragment>
  );
}
