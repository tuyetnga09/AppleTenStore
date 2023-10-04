import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return(
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
                <li><a href="gioithieu.html"><i class="fa fa-info-circle"></i> Giới thiệu</a></li>
                <li><a href="trungtambaohanh.html"><i class="fa fa-wrench"></i> Bảo hành</a></li>
                <li><a href="lienhe.html"><i class="fa fa-phone"></i> Liên hệ</a></li>
            </ul>
             {/* <!-- End Quick link --> */}
        </section>
        {/* <!-- End Section --> */}
    </div>
    {/* <!-- End Top Nav  --> */}

    <div className="header group">
    <div className="logo">
      <a href="/">
        <img
          src="img/logo.jpg"
          alt="Trang chủ Smartphone Store"
          title="Trang chủ Smartphone Store"
        />
      </a>
    </div>{" "}
    {/* End Logo */}
    <div className="content">
      <div
        className="search-header"
        style={{ position: "relative", left: 162, top: 1 }}
      >
        <form className="input-search" method="get" action="index.html">
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
        </form>{" "}
        {/* End Form search */}
        <div className="tags">
          <strong>Từ khóa: </strong>
          <a href="index.html?search=Samsung">Iphone 11</a>
          <a href="index.html?search=Samsung">Iphone 12</a>
          <a href="index.html?search=Samsung">Iphone 13</a>
        </div>
      </div>{" "}
      {/* End Search header */}
      <div className="tools-member">
        <div className="cart">
          <a onclick="checkTaiKhoan()">
            <i className="fa fa-user" />
            Tài khoản
          </a>
          {/* <div className="menuMember hide">
            <a href="nguoidung.html">Trang người dùng</a>
            <a onclick="if(window.confirm('Xác nhận đăng xuất ?')) logOut();">
              Đăng xuất
            </a>
          </div> */}
        </div>{" "}
        {/* End Member */}
        <div className="cart">
          <a href="/cart">
            <i className="fa fa-shopping-cart" />
            <span>Giỏ hàng</span>
            <span className="cart-number" />
          </a>
        </div>{" "}
        {/* End Cart */}
        <div class="check-order">
              <a>
                  <i class="fa fa-truck"></i>
                  <span>Đơn hàng</span>
              </a>
          </div>
      </div>
      </div>
      {/* End Tools Member */}
    </div>{" "}
    {/* End Content */}
    {" "}
  {/* End Header */}
    </>
    </React.Fragment>
  )
}
