import React from "react";

export default function TrangChu(){
  return(
    <React.Fragment>
        {/* top-header*/}
        <div className="top-header">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-sm-6 hidden-xs">
                  <p className="top-text">Flexible Delivery, Fast Delivery.</p>
                </div>
                <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
                  <ul>
                    <li>+084 123 4567</li>
                    <li>nhom21@laptrinhweb.com</li>
                  </ul>
                </div>
              </div>
              {/* /.top-header*/}
            </div>
          </div>
          {/* header-section*/}
          <div className="header-wrapper">
            <div className="container">
              <div className="row">
                {/* logo */}
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                  <div className="logo">
                    <a href="index.html"><img src="images/logo.png" alt="" /> </a>
                  </div>
                </div>
                {/* /.logo */}
                {/* search */}
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="search-bg">
                    <input type="text" className="form-control" placeholder="Search Here" />
                    <button type="Submit"><i className="fa fa-search" /></button>
                  </div>
                </div>
                {/* /.search */}
                {/* account */}
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div className="account-section">
                    <ul>
                      <li><a href="account.html" className="title hidden-xs">Tài khoản</a></li>
                      <li className="hidden-xs">|</li>
                      <li><a href="login-form.html" className="title hidden-xs">Đăng nhập</a></li>
                      <li><a href="favorite-list.html"><i className="fa fa-heart" /></a></li>
                      <li><a href="cart.html" className="title"><i className="fa fa-shopping-cart" />   <sup className="cart-quantity">1</sup></a>
                      </li>
                    </ul>
                  </div>
                  {/* /.account */}
                </div>
                {/* search */}
              </div>
            </div>
            {/* navigation */}
            <div className="navigation">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    {/* navigations*/}
                    <div id="navigation">
                      <ul>
                        <li className="active"><a href="index.html">Trang chủ</a></li>
                        <li><a href="product-list.html">Điện thoại</a>
                        </li>
                        <li><a href="about.html">Thông tin</a>
                        </li>
                        <li><a href="blog-default.html">Bài viết</a> </li>
                        <li><a href="contact-us.html">Liên hệ, hỗ trợ</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /.navigations*/}
                </div>
              </div>
            </div>
          </div>
          {/* /. header-section*/}
          {/* slider */}
          <div className="slider">
            <div className="owl-carousel owl-one owl-theme">
              <div className="item">
                <div className="slider-img">
                  <img src="images/slider_1.jpg" alt="" /></div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-md-8 col-sm-6 col-xs-12">
                      <div className="slider-captions">
                        <div className="brand-img">
                          <img src="images/mi_logo.png" alt="" />
                        </div>
                        <h1 className="slider-title">Red Mi <span>Y1</span></h1>
                        <p className="hidden-xs">LED Selfie-light | Fingerprint sensor | Dedicated microSD card slot Snapdragon 435 octa-core processor </p>
                        <p className="slider-price">$138.99 </p>
                        <a href="cart.html" className="btn btn-primary btn-lg hidden-xs">Buy Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="slider-img"><img src="images/slider_2.jpg" alt="" /></div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-md-8 col-sm-6 col-xs-12">
                      <div className="slider-captions">
                        <div className="brand-img">
                          <img src="images/google_logo.png" alt="" />
                        </div>
                        <h1 className="slider-title">Google Pixel 2</h1>
                        <p className="hidden-xs">The latest Qualcomm Snapdragon 835 processor | Water-resistant metal unibody | Up to 7 hours of battery.</p>
                        <p className="slider-price">$ 938.10</p>
                        <a href="cart.html" className="btn btn-primary btn-lg hidden-xs">Buy Now</a>                          </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="slider-img"><img src="images/slider_3.jpg" alt="" /></div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-md-8 col-sm-6 col-xs-12">
                      <div className="slider-captions">
                        <div className="brand-img">
                          <img src="images/apple_logo.png" alt="" />
                        </div>
                        <h1 className="slider-title">iphone 8 plus</h1>
                        <p className="hidden-xs">5.5 inch Retina HD Display | 12MP wide-angle cameras
                          <br /> | 64 GB &amp; 256 GB ROM Memory</p>
                        <p className="slider-price">$759.64</p>
                        <a href="cart.html" className="btn btn-primary btn-lg hidden-xs">Buy Now</a>                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.slider */}
          {/* mobile showcase */}
          <div className="space-medium">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <div className="showcase-block">
                    <div className="display-logo ">
                      <a href="#"> <img src="images/nexus.png" alt="" /></a>
                    </div>
                    <div className="showcase-img">
                      <a href="#"> <img src="images/display_img_1.png" alt="" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="showcase-block active">
                    <div className="display-logo alignleft">
                      <a href="#">  <img src="images/iphone.png" alt="" />
                      </a>
                    </div>
                    <div className="showcase-img">
                      <a href="#"> <img src="images/display_img_2.png" alt="" style={{paddingLeft: '80px'}} /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <div className="showcase-block ">
                    <div className="display-logo ">
                      <a href="#"> <img src="images/samsung.png" alt="" />
                      </a>
                    </div>
                    <div className="showcase-img">
                      <a href="#"><img src="images/display_img_3.png" alt="" />                  </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="showcase-block">
                    <div className="display-logo ">
                      <a href="#"><img src="images/htc.png" alt="" /></a>
                    </div>
                    <div className="showcase-img">
                      <a href="#"><img src="images/display_img_4.png" alt="" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="showcase-block">
                    <div className="display-logo">
                      <a href="#">  <img src="images/alcatel.png" alt="" /></a>
                    </div>
                    <div className="showcase-img">
                      <a href="#"> <img src="images/display_img_5.png" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="showcase-block">
                    <div className="display-logo ">
                      <a href="#"><img src="images/pixel.png" alt="" /></a>
                    </div>
                    <div className="showcase-img">
                      <a href="#">    <img src="images/display_img_6.png" alt="" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="showcase-block">
                    <div className="display-logo ">
                      <a href="#">  <img src="images/vivo.png" alt="" /></a>
                    </div>
                    <div className="showcase-img">
                      <a href="#"><img src="images/display_img_7.png" alt="" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.mobile showcase */}
          {/* latest products */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="box">
                  <div className="box-head">
                    <h3 className="head-title">Sản phẩm mới nhất</h3>
                  </div>
                  <div className="box-body">
                    <div className="row">
                      {/* product */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_1.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Google Pixel <strong>(128GB, Black)</strong></a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1100</a>
                              <a href="#" className="discounted-price">$1400</a>
                              <span className="offer-price">20%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                      {/* product */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_2.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">HTC U Ultra <strong>(64GB, Blue)</strong></a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1200</a>
                              <a href="#" className="discounted-price">$1700</a>
                              <span className="offer-price">10%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                      {/* product */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_3.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Samsung Galaxy Note 8</a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1500</a>
                              <a href="#" className="discounted-price">$2000</a>
                              <span className="offer-price">40%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                      {/* product */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_4.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Vivo V5 Plus <strong>(Matte Black)</strong></a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1500</a>
                              <a href="#" className="discounted-price">$2000</a>
                              <span className="offer-price">15%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like">
                                <i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.latest products */}
          {/* seller products */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="box">
                  <div className="box-head">
                    <h3 className="head-title">Bán chạy nhất</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-carousel">
              <div className="box-body">
                <div className="row">
                  <div className="owl-carousel owl-two owl-theme">
                    {/* product */}
                    <div className="item">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_5.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Apple iPhone 6 <strong>(32 GB, Gold)</strong></a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1700</a>
                              <a href="#" className="discounted-price">$2000</a>
                              <span className="offer-price">20%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                    </div>
                    {/* product */}
                    <div className="item">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_6.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Apple iPhone 7 <strong>(256 GB, Black)</strong> </a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1400</a>
                              <a href="#" className="discounted-price"><strike>$1800</strike></a>
                              <span className="offer-price">20%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.product */}
                    {/* product */}
                    <div className="item">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_7.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Apple iPhone 6S <strong>(32GB, Gold)</strong> </a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1300</a>
                              <a href="#" className="discounted-price"><strike>$2000</strike></a>
                              <span className="offer-price">20%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.product */}
                    {/* product */}
                    <div className="item">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_8.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Apple iPhone X <strong>(64 GB, Grey)</strong></a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1200</a>
                              <a href="#" className="discounted-price"><strike>$2000</strike></a>
                              <span className="offer-price">20%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.seller products */}
          {/* featured products */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="box">
                  <div className="box-head">
                    <h3 className="head-title">Đang khuyến mãi</h3>
                  </div>
                  <div className="box-body">
                    <div className="row">
                      {/* product */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_3.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Samsung Galaxy Note 8</a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1500</a>
                              <a href="#" className="discounted-price"><strike>$2000</strike></a>
                              <span className="offer-price">40%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                      {/* product */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_4.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Vivo V5 Plus <strong>(Matte Black)</strong></a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1500</a>
                              <a href="#" className="discounted-price"><strike>$2000</strike></a>
                              <span className="offer-price">15%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like">
                                <i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                      {/* product */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_1.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">Google Pixel <strong>(128GB, Black)</strong></a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1100</a>
                              <a href="#" className="discounted-price"><strike>$1400</strike></a>
                              <span className="offer-price">20%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                      {/* product */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="product-block">
                          <div className="product-img"><img src="images/product_img_2.png" alt="" /></div>
                          <div className="product-content">
                            <h5><a href="#" className="product-title">HTC U Ultra <strong>(64GB, Blue)</strong></a></h5>
                            <div className="product-meta"><a href="#" className="product-price">$1200</a>
                              <a href="#" className="discounted-price"><strike>$1700</strike></a>
                              <span className="offer-price">10%off</span>
                            </div>
                            <div className="shopping-btn">
                              <a href="#" className="product-btn btn-like"><i className="fa fa-heart" /></a>
                              <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.product */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.featured products */}
          {/* cta */}
          {/* /.cta */}
          {/* features */}
          <div className="bg-default pdt40 pdb40">
            <div className="container">
              <div className="row">
                {/* features */}
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="feature-left">
                    <div className="feature-outline-icon">
                      <i className="fa fa-credit-card" />
                    </div>
                    <div className="feature-content">
                      <h3 className="text-white">Thanh toán an toàn</h3>
                      <p>Mang đến dịch vụ trải nghiệm thoải mái nhất, an toàn, tiện dụng, Mobistore! </p>
                    </div>
                  </div>
                </div>
                {/* features */}
                {/* features */}
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="feature-left">
                    <div className="feature-outline-icon">
                      <i className="fa fa-users" />
                    </div>
                    <div className="feature-content">
                      <h3 className="text-white">Phản hồi 24/7</h3>
                      <p>Trợ giúp liên lạc, tham khảo , tra cứu 24/7!</p>
                    </div>
                  </div>
                </div>
                {/* features */}
                {/* features */}
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="feature-left feature-circle">
                    <div className="feature-outline-icon">
                      <i className="fa fa-rotate-left " />
                    </div>
                    <div className="feature-content">
                      <h3 className="text-white">Đổi trả miễn phí</h3>
                      <p>Miễn phí bảo hành đổi trả lên đến 365 ngày!</p>
                    </div>
                  </div>
                </div>
                {/* features */}
                {/* features */}
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="feature-left">
                    <div className="feature-outline-icon">
                      <i className="fa fa-dollar" />
                    </div>
                    <div className="feature-content">
                      <h3 className="text-white">Giá tốt nhất</h3>
                      <p>Giá thành tốt nhất trong thị trường. Cập nhật sản phẩm 24/7!</p>
                    </div>
                  </div>
                </div>
                {/* features */}
              </div>
            </div>
          </div>
          {/* /.features */}
          {/* footer */}
          <div className="footer">
            <div className="container">
              <div className="row">
                {/* footer-company-links */}
                {/* footer-contact links */}
                <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div className="footer-widget">
                    <h3 className="footer-title">Thông tin hỗ trợ</h3>
                    <div className="contact-info">
                      <span className="contact-icon"><i className="fa fa-map-marker" /></span>
                      <span className="contact-text">Phường Linh Trung, Thủ Đức<br />Thành phố Hồ Chí Minh, Việt Nam - 1955</span>
                    </div>
                    <div className="contact-info">
                      <span className="contact-icon"><i className="fa fa-phone" /></span>
                      <span className="contact-text">+084-123-4567 / 89</span>
                    </div>
                    <div className="contact-info">
                      <span className="contact-icon"><i className="fa fa-envelope" /></span>
                      <span className="contact-text">nhom21@ltweb.com</span>
                    </div>
                  </div>
                </div>
                {/* /.footer-useful-links */}
                <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div className="footer-widget">
                    <h3 className="footer-title">Tiện ích</h3>
                    <ul className="arrow">
                      <li><a href="index.html">Home </a></li>
                      <li><a href="product-list.html">Mobie</a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="blog-default.html">Blog</a></li>
                      <li><a href="contact-us.html">Contact</a></li>
                    </ul>
                  </div>
                </div>
                {/* /.footer-useful-links */}
                {/* footer-policy-list-links */}
                <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div className="footer-widget">
                    <h3 className="footer-title">Chính sách</h3>
                    <ul className="arrow">
                      <li><a href="#">Thanh toán</a></li>
                      <li><a href="#">Hủy, trả hàng</a></li>
                      <li><a href="#">Giao hàng và vận chuyển</a></li>
                      <li><a href="#">Chính sách bảo mật</a></li>
                    </ul>
                  </div>
                </div>
                {/* /.footer-policy-list-links */}
                {/* footer-social links */}
                <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div className="footer-widget">
                    <h3 className="footer-title">Liên lạc với chúng tôi</h3>
                    <div className="ft-social">
                      <span><a href="#" className="btn-social btn-facebook"><i className="fa fa-facebook" /></a></span>
                      <span><a href="#" className="btn-social btn-twitter"><i className="fa fa-twitter" /></a></span>
                      <span><a href="#" className="btn-social btn-googleplus"><i className="fa fa-google-plus" /></a></span>
                      <span><a href="#" className=" btn-social btn-linkedin"><i className="fa fa-linkedin" /></a></span>
                      <span><a href="#" className=" btn-social btn-pinterest"><i className="fa fa-pinterest-p" /></a></span>
                      <span><a href="#" className=" btn-social btn-instagram"><i className="fa fa-instagram" /></a></span>
                    </div>
                  </div>
                </div>
                {/* /.footer-social links */}
              </div>
            </div>
            {/* tiny-footer */}
            <div className="tiny-footer">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="payment-method alignleft">
                      <ul>
                        <li><a href="#"><i className="fa fa-cc-paypal fa-2x" /></a></li>
                        <li><a href="#"><i className="fa fa-cc-mastercard  fa-2x" /></a></li>
                        <li><a href="#"><i className="fa fa-cc-visa fa-2x" /></a></li>
                        <li><a href="#"><i className="fa fa-cc-discover fa-2x" /></a></li>
                      </ul>
                    </div>
                    <p className="alignright">Copyright © All Rights Reserved 2020 Template Design by
                      <a href="https://easetemplate.com/" target="_blank" className="copyrightlink">Nhom 21</a></p>
                  </div>
                </div>
              </div>
              {/* /. tiny-footer */}
            </div>
          </div>
          {/* /.footer */}
          {/* jQuery (necessary for Bootstrap's JavaScript plugins) */}
          {/* Include all compiled plugins (below), or include individual files as needed */}
          {/* Mirrored from easetemplate.com/free-website-templates/mobistore/ by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 19 Nov 2021 09:40:40 GMT */}
    </React.Fragment>
  )
}
