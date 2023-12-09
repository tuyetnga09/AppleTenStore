import React from "react";
import Header from "../Page_Comeponet/layout/Header";
import Footer from "../Page_Comeponet/layout/Footer";
import { Row } from "antd";

export default function gioiThieu() {
  function goToTop() {
    window.scrollTo({
      top: 0, // Cuộn lên vị trí đầu trang
      behavior: "smooth", // Hiệu ứng cuộn mượt
    });
  }

  return (
    <>
      <Header />
      <div className="container">
        <div class="master-wrapper-page">
          <div class="master-wrapper-content">
            <div class="master-column-wrapper">
              <div class="center-1">
                <div class="page news-list-page group_news big_img">
                  <div
                    class="page-title"
                    style={{
                      paddingTop: "0px",
                      marginTop: "30px",
                      marginBottom: "25px",
                    }}
                  >
                    <h1 style={{ textAlign: "center" }}>Tin Tức</h1>
                  </div>
                  <div class="page-body">
                    <Row>
                      <div class="col-8">
                        <div>
                          <a
                            // href="/ipad-dang-dan-thay-the-macbook-nhu-the-nao"
                            title="Hiển thị sản phẩm trong danh mục iPad đang dần thay thế Macbook như thế nào? "
                          >
                            <img
                              style={{ width: "100%", height: "478px" }}
                              alt="Hình ảnh cho danh mục iPad đang dần thay thế Macbook như thế nào? "
                              src="https://shopdunk.com/images/thumbs/0023801_Ảnh màn hình 2023-11-15 lúc 16.28.31_1600.png"
                              title="Hiển thị sản phẩm trong danh mục iPad đang dần thay thế Macbook như thế nào? "
                            />
                          </a>
                        </div>
                      </div>

                      <div className="col-4 ">
                        <div>
                          <a
                            // href="/shopdunk-nh%C3%A0-m%E1%BB%9Bi-m%E1%BB%9Di-b%E1%BA%A1n-t%E1%BB%9Bi-l%C3%AA-v%C4%83n-l%C6%B0%C6%A1ng"
                            title="Hiển thị sản phẩm trong danh mục SHOPDUNK NHÀ MỚI - MỜI BẠN TỚI LÊ VĂN LƯƠNG"
                          >
                            <img
                              style={{
                                width: "100%",
                                borderRadius: "10px",
                              }}
                              alt="Hình ảnh cho danh mục SHOPDUNK NHÀ MỚI - MỜI BẠN TỚI LÊ VĂN LƯƠNG"
                              src="https://shopdunk.com/images/thumbs/0024214_Untitled design_1600.png"
                              title="Hiển thị sản phẩm trong danh mục SHOPDUNK NHÀ MỚI - MỜI BẠN TỚI LÊ VĂN LƯƠNG"
                            />
                          </a>
                        </div>
                        {/* <div>
                          <a>SHOPDUNK NHÀ MỚI - MỜI BẠN TỚI LÊ VĂN LƯƠNG</a>
                          <div>
                            Tưng bừng chào đón cửa hàng mới 35 Lê Văn Lương,
                            ShopDunk bung ngàn Deal hời lên đến 50% chưa từng có
                            trong lịch sử, cùng những phần quà tặng khủng lên
                            đến 90 TRIỆU dành tặng riêng cho khách hàng ShopDunk
                            - Thông tin chương trình: + Thời gian: 16h-18h00,
                            18/11/2023 + Địa điểm: 35 Lê Văn Lương, Thanh Xuân,
                            Hà Nội &gt;&gt; Chi tiết chương trình ưu đãi:
                            https://shopdunk.com/common-landing-page
                          </div>
                          <span>13/11/2023</span>
                        </div> */}

                        <div style={{ marginTop: "30px" }}>
                          <a
                            // href="/co-nen-mua-macbook-pro-m3"
                            title="Hiển thị sản phẩm trong danh mục Ai nên mua MacBook Pro M3 với cải tiến chính về GPU? - Tư vấn chi tiết"
                          >
                            <img
                              style={{ width: "100%", borderRadius: "10px" }}
                              alt="Hình ảnh cho danh mục Ai nên mua MacBook Pro M3 với cải tiến chính về GPU? - Tư vấn chi tiết"
                              src="https://shopdunk.com/images/thumbs/0023713_co-nen-mua-macbook-pro-m3-ava_1600.jpeg"
                              title="Hiển thị sản phẩm trong danh mục Ai nên mua MacBook Pro M3 với cải tiến chính về GPU? - Tư vấn chi tiết"
                            />
                          </a>
                        </div>
                        {/* <div>
                          <a>
                            Ai nên mua MacBook Pro M3 với cải tiến chính về GPU?
                            - Tư vấn chi tiết
                          </a>
                          <div>
                            Cùng ShopDunk điểm qua 9 điểm nổi bật trên dòng
                            MacBook Pro M3 để dễ dàng đưa ra quyết định có nên
                            mua MacBook Pro M3 hay không. Đừng bỏ lỡ!
                          </div>
                          <span>10/11/2023</span>
                        </div> */}
                      </div>
                    </Row>
                  </div>
                </div>
                <section
                  style={{
                    textAlign: "center",
                    margin: "outo",
                    marginTop: "40px",
                    marginBottom: "60px",
                  }}
                >
                  <Row style={{ textAlign: "center", margin: "outo" }}>
                    <div style={{ marginRight: "30px", marginLeft: "90px" }}>
                      <button type="button" class="btn btn-light">
                        Tin tức Apple
                      </button>
                      {/* <a
                        href="/apple-news"
                        class="cate-name news-home-apple-news"
                      >
                        Tin tức Apple
                      </a> */}
                    </div>
                    <div style={{ marginRight: "30px" }}>
                      <button type="button" class="btn btn-light">
                        Bài viết review
                      </button>
                    </div>
                    <div style={{ marginRight: "30px" }}>
                      <button type="button" class="btn btn-light">
                        Khám phá
                      </button>
                      {/* <a
                        href="/tin-kham-pha"
                        class="cate-name news-home-tin-kham-pha"
                      >
                        Khám phá
                      </a> */}
                    </div>
                    <div style={{ marginRight: "30px" }}>
                      <button type="button" class="btn btn-light">
                        Thủ thuật
                      </button>
                      {/* <a
                        href="/thu-thuat"
                        class="cate-name news-home-thu-thuat"
                      >
                        Thủ thuật
                      </a> */}
                    </div>
                    <div style={{ marginRight: "30px" }}>
                      <button type="button" class="btn btn-light">
                        Khuyến mại
                      </button>
                      {/* <a
                        href="/khuyen-mai"
                        class="cate-name news-home-khuyen-mai"
                      >
                        Khuyến mại
                      </a> */}
                    </div>
                    <div style={{ marginRight: "30px" }}>
                      <button type="button" class="btn btn-light">
                        Tin khác
                      </button>
                      {/* <a href="/tin-khac" class="cate-name news-home-tin-khac">
                        Tin khác
                      </a> */}
                    </div>
                    <div style={{ marginRight: "30px" }}>
                      <button type="button" class="btn btn-light">
                        iVideo
                      </button>
                      {/* <a
                        href="/news-ivideo"
                        class="cate-name news-home-news-ivideo"
                      >
                        iVideo
                      </a> */}
                    </div>
                    <div style={{ float: "right" }}>
                      <button type="button" class="btn btn-light">
                        Góc cảm ơn
                      </button>
                      {/* <a
                        href="/news-vip-customer"
                        class="cate-name news-home-vip-customer"
                      >
                        Góc cảm ơn
                      </a> */}
                    </div>
                  </Row>
                </section>
                <div>
                  <div style={{ marginTop: "40px" }}>
                    <b>
                      <h2 style={{ fontWeight: "bold", marginLeft: "20px" }}>
                        Tin Tức Apple
                      </h2>
                    </b>
                  </div>
                  <br />
                  <div>
                    <div>
                      <Row>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/tieu-diem-cuoi-nam-2023-tong-hop-san-pham-moi-cua-apple"
                                title="Hiển thị sản phẩm trong danh mục Tiêu điểm cuối năm 2023: Tổng hợp sản phẩm MacBook và iMac mới nhất của Apple"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Tiêu điểm cuối năm 2023: Tổng hợp sản phẩm MacBook và iMac mới nhất của Apple"
                                  src="https://shopdunk.com/images/thumbs/0022649_apple-wwdc-2023-logo_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Tiêu điểm cuối năm 2023: Tổng hợp sản phẩm MacBook và iMac mới nhất của Apple"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/tieu-diem-cuoi-nam-2023-tong-hop-san-pham-moi-cua-apple"
                                >
                                  Tiêu điểm cuối năm 2023: Tổng hợp sản phẩm
                                  MacBook và iMac mới nhất của Apple
                                </a>
                              </h4>
                              {/* <div class="news-body">
                                Sáng ngày 31/10, tại sự kiện Scary Fast mới
                                nhất, những mẫu sản phẩm mới Mac của Apple đã
                                chính thức ra mắt. Cả thế giới đang đổ dồn con
                                mắt vào siêu phẩm MacBook Pro M3 14", MacBook
                                Pro M3 16" và iMac M3.
                              </div> */}
                              <span class="news-date">31/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/dung-luong-pin-iphone-15-pro-max"
                                title="Hiển thị sản phẩm trong danh mục Dung Lượng Pin iPhone 15 Pro Max KHỦNG 4.422 mAh| Test thực tế ra sao?"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Dung Lượng Pin iPhone 15 Pro Max KHỦNG 4.422 mAh| Test thực tế ra sao?"
                                  src="https://shopdunk.com/images/thumbs/0021957_dung-luong-pin-iphone-15-pro-max_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Dung Lượng Pin iPhone 15 Pro Max KHỦNG 4.422 mAh| Test thực tế ra sao?"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/dung-luong-pin-iphone-15-pro-max"
                                >
                                  Dung Lượng Pin iPhone 15 Pro Max KHỦNG 4.422
                                  mAh| Test thực tế ra sao?
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Theo thông báo chính thức từ Apple, dung lượng pin
                              iPhone 15 Pro Max sở hữu viên pin lớn nhất 4.422
                              mAh, tăng khoảng 2,29% với iPhone 14 Pro Max, với
                              thời gian xem video trực tuyến 25 giờ. Chi tiết
                              thông tin này ra sao, cùng ShopDunk tìm hiểu ngay
                              sau đây.
                            </div> */}
                              <span class="news-date">30/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                      <Row>
                        {/* 2 */}
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/iphone-15-pro-co-may-mau"
                                title="Hiển thị sản phẩm trong danh mục iPhone 15 Pro Có Mấy Màu? Màu Nào Mới Và Đẹp Nhất?"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục iPhone 15 Pro Có Mấy Màu? Màu Nào Mới Và Đẹp Nhất?"
                                  src="https://shopdunk.com/images/thumbs/0021924_iphone-15-pro-mau-titan-trang-ngoai-doi-thuc-khong-co-su-khac-biet-so-voi-tren-anh_1600.png"
                                  title="Hiển thị sản phẩm trong danh mục iPhone 15 Pro Có Mấy Màu? Màu Nào Mới Và Đẹp Nhất?"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/iphone-15-pro-co-may-mau"
                                >
                                  iPhone 15 Pro Có Mấy Màu? Màu Nào Mới Và Đẹp
                                  Nhất?
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              iPhone 15 Pro không chỉ được nâng cấp về tính
                              năng, hiệu suất mà còn sở hữu bảng 4 màu sắc ấn
                              tượng và sang trọng bậc nhất. Vậy iPhone 15 Pro có
                              mấy màu? Cùng ShopDunk tìm hiểu chi tiết trong bài
                              sau nhé!
                            </div> */}
                              <span class="news-date">30/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/cau-hinh-iphone-15-pro-max"
                                title="Hiển thị sản phẩm trong danh mục Cấu hình iPhone 15 Pro Max đột phá chưa từng thấy!"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Cấu hình iPhone 15 Pro Max đột phá chưa từng thấy!"
                                  src="https://shopdunk.com/images/thumbs/0022509_man-hinh-oled-kich-thuoc-6-7-inch_1600.png"
                                  title="Hiển thị sản phẩm trong danh mục Cấu hình iPhone 15 Pro Max đột phá chưa từng thấy!"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/cau-hinh-iphone-15-pro-max"
                                >
                                  Cấu hình iPhone 15 Pro Max đột phá chưa từng
                                  thấy!
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Sau một thời gian “lên kệ”, nhiều người dùng bày
                              tỏ sự quan tâm về cấu hình iPhone 15 Pro Max, các
                              thông số cấu hình trên phiên bản iPhone cao cấp
                              nhất của Apple được nâng cấp vượt trội từ màn
                              hình, camera, hiệu suất,...
                            </div> */}
                              <span class="news-date">27/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <a
                        // href="/apple-news"
                        class="btn_all_news"
                        style={{ color: "blue" }}
                      >
                        Xem tất cả Tin tức Apple {">"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* bai viet review */}
                <div>
                  <div style={{ marginTop: "40px" }}>
                    <b>
                      <h2 style={{ fontWeight: "bold", marginLeft: "20px" }}>
                        Bài Viết Review
                      </h2>
                    </b>
                  </div>
                  <br />
                  <div>
                    <div>
                      <Row>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/ipad-dang-dan-thay-the-macbook-nhu-the-nao"
                                title="Hiển thị sản phẩm trong danh mục iPad đang dần thay thế Macbook như thế nào? "
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục iPad đang dần thay thế Macbook như thế nào? "
                                  src="https://shopdunk.com/images/thumbs/0023801_Ảnh màn hình 2023-11-15 lúc 16.28.31_1600.png"
                                  title="Hiển thị sản phẩm trong danh mục iPad đang dần thay thế Macbook như thế nào? "
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/ipad-dang-dan-thay-the-macbook-nhu-the-nao"
                                >
                                  iPad đang dần thay thế Macbook như thế nào?
                                </a>
                              </h4>
                              {/* <div class="news-body">
                            Tiếp sau khát vọng “xoá sổ” máy tính đề bàn, với
                            châm ngôn “holding the internet in your hands”, hãng
                            đã và đang thiện thực hoá tham vọng đưa iPad thay
                            thế cho MacBook cũng như các dòng máy laptop.
                          </div> */}
                              <span class="news-date">15/11/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/danh-gia-macbook-air-m-1"
                                title="Hiển thị sản phẩm trong danh mục Đánh giá MacBook Air M1: MacBook Air M1 có ổn không? Dùng được mấy năm nữa? "
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Đánh giá MacBook Air M1: MacBook Air M1 có ổn không? Dùng được mấy năm nữa? "
                                  src="https://shopdunk.com/images/thumbs/0019069__DSC4273 (1)_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Đánh giá MacBook Air M1: MacBook Air M1 có ổn không? Dùng được mấy năm nữa? "
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/danh-gia-macbook-air-m-1"
                                >
                                  Đánh giá MacBook Air M1: MacBook Air M1 có ổn
                                  không? Dùng được mấy năm nữa?
                                </a>
                              </h4>
                              {/* <div class="news-body">
                             Đến hiện tại, MacBook Air M1 vẫn là một trong những
                            dòng máy tích hợp chip Apple M1 mạnh mẽ nhất và ấn
                            tượng nhất trên thị trường.
                            </div> */}
                              <span class="news-date">31/08/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                      <Row>
                        {/* 2 */}
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/ipad-gen-10-va-ipad-gen-9"
                                title="Hiển thị sản phẩm trong danh mục So sánh những điểm giống và khác biệt giữa iPad gen 9 và gen 10!&nbsp;"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục So sánh những điểm giống và khác biệt giữa iPad gen 9 và gen 10!&nbsp;"
                                  src="https://shopdunk.com/images/thumbs/0019052_ipad-gen-9-va-gen-10_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục So sánh những điểm giống và khác biệt giữa iPad gen 9 và gen 10!&nbsp;"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                // href="/ipad-gen-10-va-ipad-gen-9"
                                >
                                  So sánh những điểm giống và khác biệt giữa
                                  iPad gen 9 và gen 10!&nbsp;
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              iPad gen 10 là phiên bản iPad tiêu chuẩn mới nhất
                            của nhà Táo nên nhiều người hy vọng chiếc tablet này
                            sẽ có nhiều nâng cấp so với bản tiền nhiệm - iPad
                            gen 9. Bài viết này, ShopDunk sẽ chỉ ra 8 điểm khác
                            biệt giữa iPad gen 10 và iPad gen 9, giúp bạn có lựa
                            chọn sáng suốt nhất!
                            </div> */}
                              <span class="news-date">26/08/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/so-sanh-ipad-gen-10-v%C3%A0-ipad-air-5"
                                title="Hiển thị sản phẩm trong danh mục So sánh iPad Gen 10 và iPad Air 5: Nên chọn iPad nào?"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục So sánh iPad Gen 10 và iPad Air 5: Nên chọn iPad nào?"
                                  src="https://shopdunk.com/images/thumbs/0019051_so-sanh-ipad-gen-10-va-ipad-air-5_1600.png"
                                  title="Hiển thị sản phẩm trong danh mục So sánh iPad Gen 10 và iPad Air 5: Nên chọn iPad nào?"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/so-sanh-ipad-gen-10-v%C3%A0-ipad-air-5"
                                >
                                  So sánh iPad Gen 10 và iPad Air 5: Nên chọn
                                  iPad nào?
                                </a>
                              </h4>
                              {/* <div class="news-body">
                             iPad Gen 10 và iPad Air 5 là hai sản phẩm cùng được
                            ra mắt năm 2022 của nhà Táo, trong đó iPad Air 5 có
                            giá cao hơn so với iPad gen 10. Vậy 2 phiên bản này
                            có gì khác biệt? Cùng ShopDunk so sánh iPad gen 10
                            và iPad Air 5 để hiểu rõ nhé!
                            </div> */}
                              <span class="news-date">26/08/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <a
                        // href="/apple-news"
                        class="btn_all_news"
                        style={{ color: "blue" }}
                      >
                        Xem tất cả Bài viết review {">"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* kham pha */}
                <div>
                  <div style={{ marginTop: "40px" }}>
                    <b>
                      <h2 style={{ fontWeight: "bold", marginLeft: "20px" }}>
                        Khám Phá
                      </h2>
                    </b>
                  </div>
                  <br />
                  <div>
                    <div>
                      <Row>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/meo-tai-ung-dung-seed"
                                title="Hiển thị sản phẩm trong danh mục Mẹo tải ứng dụng SEED dù không phải là nhân viên Apple"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Mẹo tải ứng dụng SEED dù không phải là nhân viên Apple"
                                  src="https://shopdunk.com/images/thumbs/0014968_Heres-How-Much-It-Costs-To-Own-The-Apple-Ecosystem1200_5fd71ec8a0ec6_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Mẹo tải ứng dụng SEED dù không phải là nhân viên Apple"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                // href="/meo-tai-ung-dung-seed"
                                >
                                  Mẹo tải ứng dụng SEED dù không phải là nhân
                                  viên Apple
                                </a>
                              </h4>
                              {/* <div class="news-body">
                             Ứng dụng SEED là một ứng dụng khá thú vị về đào tạo,
                            thúc đẩy và phát triển bán hàng mà chỉ có nhân viên,
                            đại lý bán lẻ được Apple ủy quyền mới có thể tải.
                            Hôm nay Tin Tức ShopDunk sẽ hướng dẫn bạn mẹo tải mà
                            không cần là nhân viên Apple nhé! </div> */}
                              <span class="news-date">16/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/ipad-pro-m2-sac-bao-nhieu-w"
                                title="Hiển thị sản phẩm trong danh mục [Giải đáp] Apple trang bị cho iPad Pro M2 sạc bao nhiêu W?"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục [Giải đáp] Apple trang bị cho iPad Pro M2 sạc bao nhiêu W?"
                                  src="https://shopdunk.com/images/thumbs/0016328_sac-ipad-pro-m2-bao-nhieu-w_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục [Giải đáp] Apple trang bị cho iPad Pro M2 sạc bao nhiêu W?"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/ipad-pro-m2-sac-bao-nhieu-w"
                                >
                                  [Giải đáp] Apple trang bị cho iPad Pro M2 sạc
                                  bao nhiêu W?
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Theo Apple, công suất sạc cực đại và an toàn cho
                            iPad Pro M2 tối đa là 35W. Vậy thực tế Apple trang
                            bị cho iPad Pro M2 sạc bao nhiêu W, có phải mức công
                            suất tối đa này hay nhỏ hơn? Cùng theo dõi bài viết
                            dưới đây để có câu trả lời bạn nhé!
                            </div> */}
                              <span class="news-date">12/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                      <Row>
                        {/* 2 */}
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/danh-gia-suc-manh-cua-chip-a17-pro"
                                title="Hiển thị sản phẩm trong danh mục Đánh giá sức mạnh của chip A17 Pro: Vượt xa A16 Bionic"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Đánh giá sức mạnh của chip A17 Pro: Vượt xa A16 Bionic"
                                  src="https://shopdunk.com/images/thumbs/0021619_Untitled design_1600.png"
                                  title="Hiển thị sản phẩm trong danh mục Đánh giá sức mạnh của chip A17 Pro: Vượt xa A16 Bionic"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/danh-gia-suc-manh-cua-chip-a17-pro"
                                >
                                  Đánh giá sức mạnh của chip A17 Pro: Vượt xa
                                  A16 Bionic
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Dòng iPhone 15 Pro và iPhone 15 Pro Max chính thức
                            soán ngôi vương trong làng smartphone bởi thiết kế
                            tinh tế, hiệu năng đỉnh cao và camera cải tiến. Một
                            trong những lý do khiến bộ đôi Pro này chiếm thế “áp
                            đảo” trên thị trường là được trang bị chip A17 Pro
                            mới nhất và tiên tiến nhất, thay thế hoàn toàn chip
                            A16 Bionic quen thuộc trên iPhone 14 Pro và Pro Max.
                            </div> */}
                              <span class="news-date">18/09/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/chat-lieu-titan-tren-iphone-15-pro-va-pro-max"
                                title="Hiển thị sản phẩm trong danh mục Chất Liệu Titan Trên iPhone 15 Pro Và Pro Max"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Chất Liệu Titan Trên iPhone 15 Pro Và Pro Max"
                                  src="https://shopdunk.com/images/thumbs/0021636_5-130923-042621_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Chất Liệu Titan Trên iPhone 15 Pro Và Pro Max"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/chat-lieu-titan-tren-iphone-15-pro-va-pro-max"
                                >
                                  Chất Liệu Titan Trên iPhone 15 Pro Và Pro Max
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              iPhone 15 Pro và Pro Max vừa ra mắt đã khiến iFans
                            chao đảo với thiết kế sang trọng, chip mới A17 Pro
                            siêu mạnh và khung viền titanium bền bỉ. Đây là chất
                            liệu đầu tiên được sử dụng trên iPhone với nhiều ưu
                            điểm vượt trội. Hãy cùng ShopDunk tìm hiểu chất liệu
                            titan là gì và ưu điểm của chất liệu titan trên
                            iPhone 15 Pro và Pro Max nhé!
                            </div> */}
                              <span class="news-date">18/09/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <a
                        // href="/apple-news"
                        class="btn_all_news"
                        style={{ color: "blue" }}
                      >
                        Xem tất cả Khám phá {">"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Thủ thuật */}
                <div>
                  <div style={{ marginTop: "40px" }}>
                    <b>
                      <h2 style={{ fontWeight: "bold", marginLeft: "20px" }}>
                        Thủ Thuật
                      </h2>
                    </b>
                  </div>
                  <br />
                  <div>
                    <div>
                      <Row>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/launchpad-macbook"
                                title="Hiển thị sản phẩm trong danh mục Hướng dẫn sử dụng Launchpad MacBook chỉ trong 5 phút"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Hướng dẫn sử dụng Launchpad MacBook chỉ trong 5 phút"
                                  src="https://shopdunk.com/images/thumbs/0019027_launchpad-macbook_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Hướng dẫn sử dụng Launchpad MacBook chỉ trong 5 phút"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/launchpad-macbook"
                                >
                                  Hướng dẫn sử dụng Launchpad MacBook chỉ trong
                                  5 phút
                                </a>
                              </h4>
                              {/* <div class="news-body">
                             Launchpad MacBook MacBook là một phần quan trọng
                            giúp việc truy cập ứng dụng của người dùng được diễn
                            ra nhanh chóng và thuận tiện hơn. Hãy cùng ShopDunk
                            tìm hiểu nhanh những thao tác cơ bản mà bạn có thể
                            dễ dàng thực hiện ngay trên phần Launchpad này.
                         </div> */}
                              <span class="news-date">21/08/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/cach-tao-thu-muc-tren-macbook"
                                title="Hiển thị sản phẩm trong danh mục Hướng dẫn 5 cách tạo thư mục trên MacBook đơn giản, nhanh chóng"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Hướng dẫn 5 cách tạo thư mục trên MacBook đơn giản, nhanh chóng"
                                  src="https://shopdunk.com/images/thumbs/0018994_cach-tao-thu-muc-tren-macbook_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Hướng dẫn 5 cách tạo thư mục trên MacBook đơn giản, nhanh chóng"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/cach-tao-thu-muc-tren-macbook"
                                >
                                  Hướng dẫn 5 cách tạo thư mục trên MacBook đơn
                                  giản, nhanh chóng
                                </a>
                              </h4>
                              {/* <div class="news-body">
                               Tạo thư mục (folder) để lưu trữ và phân loại tài
                            liệu là một trong những thao tác quen thuộc của
                            người dùng máy tính. Nếu bạn là người dùng đã quen
                            thuộc với hệ điều hành Windows thì chắc hẳn sẽ gặp
                            không ít bối rối khi tạo thư mục (folder) trên
                            macOS. Trong bài viết này, ShopDunk sẽ hướng dẫn bạn
                            cách tạo thư mục trên MacBook với 5 bước đơn giản và
                            nhanh chóng!
                            </div> */}
                              <span class="news-date">17/08/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                      <Row>
                        {/* 2 */}
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/ipad-bi-do-khong-tat-duoc-nguon"
                                title="Hiển thị sản phẩm trong danh mục 6 cách TẮT NGUỒN iPad khi bị đơ CỰC DỄ, chỉ cần 5 giây"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục 6 cách TẮT NGUỒN iPad khi bị đơ CỰC DỄ, chỉ cần 5 giây"
                                  src="https://shopdunk.com/images/thumbs/0018762_ipad-bi-do-khong-tat-duoc-nguon_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục 6 cách TẮT NGUỒN iPad khi bị đơ CỰC DỄ, chỉ cần 5 giây"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/ipad-bi-do-khong-tat-duoc-nguon"
                                >
                                  6 cách TẮT NGUỒN iPad khi bị đơ CỰC DỄ, chỉ
                                  cần 5 giây
                                </a>
                              </h4>
                              {/* <div class="news-body">
                               Người dùng iPad gặp phải tình huống iPad bị đơ không
                            tắt được nguồn khiến quá trình sử dụng thiết bị cực
                            kỳ bất tiện. Đừng lo lắng vì ngay sau đây, kĩ thuật
                            viên ShopDunk sẽ hướng dẫn bạn 6 cách xử ký cực dễ,
                            chỉ mất chưa tới 5 giây!
                            </div> */}
                              <span class="news-date">07/07/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/xoa-trang-macbook-m2"
                                title="Hiển thị sản phẩm trong danh mục 3 bước xóa trắng MacBook M2 và cài đặt lại macOS cực dễ dàng"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục 3 bước xóa trắng MacBook M2 và cài đặt lại macOS cực dễ dàng"
                                  src="https://shopdunk.com/images/thumbs/0018754_xoa-trang-macbook-m2_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục 3 bước xóa trắng MacBook M2 và cài đặt lại macOS cực dễ dàng"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/xoa-trang-macbook-m2"
                                >
                                  3 bước xóa trắng MacBook M2 và cài đặt lại
                                  macOS cực dễ dàng
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Xóa trắng MacBook M2 thường được ứng dụng trong
                            trường hợp người dùng muốn cài đặt lại macOS, hoặc
                            muốn sang nhượng lại máy cho người khác. Dưới đây sẽ
                            là 5 bước xóa máy mac M2 vô cùng đơn giản mà bạn có
                            thể tham khảo.
                            </div> */}
                              <span class="news-date">06/07/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <a
                        // href="/apple-news"
                        class="btn_all_news"
                        style={{ color: "blue" }}
                      >
                        Xem tất cả Thủ thuật {">"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Khuyến mại */}
                <div>
                  <div style={{ marginTop: "40px" }}>
                    <b>
                      <h2 style={{ fontWeight: "bold", marginLeft: "20px" }}>
                        Khuyến Mại
                      </h2>
                    </b>
                  </div>
                  <br />
                  <div>
                    <div>
                      <Row>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/shopdunk-nh%C3%A0-m%E1%BB%9Bi-m%E1%BB%9Di-b%E1%BA%A1n-t%E1%BB%9Bi-l%C3%AA-v%C4%83n-l%C6%B0%C6%A1ng"
                                title="Hiển thị sản phẩm trong danh mục SHOPDUNK NHÀ MỚI - MỜI BẠN TỚI LÊ VĂN LƯƠNG"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    height: "146px",
                                  }}
                                  alt="Hình ảnh cho danh mục SHOPDUNK NHÀ MỚI - MỜI BẠN TỚI LÊ VĂN LƯƠNG"
                                  src="https://shopdunk.com/images/thumbs/0024214_Untitled design_1600.png"
                                  title="Hiển thị sản phẩm trong danh mục SHOPDUNK NHÀ MỚI - MỜI BẠN TỚI LÊ VĂN LƯƠNG"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/shopdunk-nh%C3%A0-m%E1%BB%9Bi-m%E1%BB%9Di-b%E1%BA%A1n-t%E1%BB%9Bi-l%C3%AA-v%C4%83n-l%C6%B0%C6%A1ng"
                                >
                                  SHOPDUNK NHÀ MỚI - MỜI BẠN TỚI LÊ VĂN LƯƠNG
                                </a>
                              </h4>
                              {/* <div class="news-body">
                             Tưng bừng chào đón cửa hàng mới 35 Lê Văn Lương,
                            ShopDunk bung ngàn Deal hời lên đến 50% chưa từng có
                            trong lịch sử, cùng những phần quà tặng khủng lên
                            đến 90 TRIỆU dành tặng riêng cho khách hàng ShopDunk
                            - Thông tin chương trình: + Thời gian: 16h-18h00,
                            18/11/2023 + Địa điểm: 35 Lê Văn Lương, Thanh Xuân,
                            Hà Nội &gt;&gt; Chi tiết chương trình ưu đãi:
                            https://shopdunk.com/common-landing-page
                         </div> */}
                              <span class="news-date">13/11/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/tong-hop-chuong-trinh-khuyen-mai-thang"
                                title="Hiển thị sản phẩm trong danh mục THÁNG CUỐI NĂM - TRĂM NGÀN  DEAL KHỦNG TẠI SHOPDUNK"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục THÁNG CUỐI NĂM - TRĂM NGÀN  DEAL KHỦNG TẠI SHOPDUNK"
                                  src="https://shopdunk.com/images/thumbs/0024198_Tintuc (2)_1600.png"
                                  title="Hiển thị sản phẩm trong danh mục THÁNG CUỐI NĂM - TRĂM NGÀN  DEAL KHỦNG TẠI SHOPDUNK"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/tong-hop-chuong-trinh-khuyen-mai-thang"
                                >
                                  THÁNG CUỐI NĂM - TRĂM NGÀN DEAL KHỦNG TẠI
                                  SHOPDUNK
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Tháng 12 - tháng cuối cùng của năm 2023, ShopDunk
                            đãi tiệc to với vô vàn khuyến mãi. Bùng nổ cuối năm
                            hàng ngàn hot deal, Ưu đãi tới 10 triệu, quà tặng
                            tới 99 triệu ++ dành cho tất cả khách hàng.
                            </div> */}
                              <span class="news-date">31/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                      <Row>
                        {/* 2 */}
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/chuong-trinh-giam-gia-toi-1500000%C4%91-danh-cho-khach-hang-thanh-toan-iphone-15-series-qua-the-tin-dung-vib"
                                title="Hiển thị sản phẩm trong danh mục CHƯƠNG TRÌNH GIẢM GIÁ TỚI 1.500.000Đ DÀNH CHO KHÁCH HÀNG THANH TOÁN IPHONE 15 SERIES QUA THẺ TÍN DỤNG VIB "
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục CHƯƠNG TRÌNH GIẢM GIÁ TỚI 1.500.000Đ DÀNH CHO KHÁCH HÀNG THANH TOÁN IPHONE 15 SERIES QUA THẺ TÍN DỤNG VIB "
                                  src="https://shopdunk.com/images/thumbs/0022510_638314996174767665_5_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục CHƯƠNG TRÌNH GIẢM GIÁ TỚI 1.500.000Đ DÀNH CHO KHÁCH HÀNG THANH TOÁN IPHONE 15 SERIES QUA THẺ TÍN DỤNG VIB "
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/chuong-trinh-giam-gia-toi-1500000%C4%91-danh-cho-khach-hang-thanh-toan-iphone-15-series-qua-the-tin-dung-vib"
                                >
                                  CHƯƠNG TRÌNH GIẢM TỚI 1.500.000Đ DÀNH CHO
                                  IPHONE 15 SERIES THANH TOÁN QUA THẺ TÍN DỤNG
                                  VIB
                                </a>
                              </h4>
                              {/* <div class="news-body">
                               Khách hàng sẽ được giảm giá lên tới 1.500.000đ khi
                            mua sản phẩm iPhone 15 series tại ShopDunk và thanh
                            toán bằng thẻ tín dụng VIB. Dưới đây là thông tin
                            chi tiết chương trình:
                            </div> */}
                              <span class="news-date">11/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/chuong-trinh-hoan-tien-tri-gia-1000000%C4%91-danh-cho-khach-hang-mo-the-tin-dung-vpbank"
                                title="Hiển thị sản phẩm trong danh mục  CHƯƠNG TRÌNH HOÀN TIỀN TRỊ GIÁ 1.000.000Đ DÀNH CHO KHÁCH HÀNG MỞ THẺ TÍN DỤNG VPBANK"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục  CHƯƠNG TRÌNH HOÀN TIỀN TRỊ GIÁ 1.000.000Đ DÀNH CHO KHÁCH HÀNG MỞ THẺ TÍN DỤNG VPBANK"
                                  src="https://shopdunk.com/images/thumbs/0022021_0022020_1500x760_Notext_1600_1600.png"
                                  title="Hiển thị sản phẩm trong danh mục  CHƯƠNG TRÌNH HOÀN TIỀN TRỊ GIÁ 1.000.000Đ DÀNH CHO KHÁCH HÀNG MỞ THẺ TÍN DỤNG VPBANK"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/chuong-trinh-hoan-tien-tri-gia-1000000%C4%91-danh-cho-khach-hang-mo-the-tin-dung-vpbank"
                                >
                                  CHƯƠNG TRÌNH HOÀN TIỀN TRỊ GIÁ 1.000.000Đ DÀNH
                                  CHO KHÁCH HÀNG MỞ THẺ TÍN DỤNG VPBANK
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Từ nay, khi khách hàng đăng ký mở mới thẻ tín dụng
                            VPBank tại ShopDunk sẽ được hoàn tiền đến 1.000.000đ
                            khi mua sản phẩm iPhone 15 Series tại ShopDunk. Dưới
                            đây là chi tiết thông tin chương trình, xem ngay để
                            không bỏ lỡ nhé
                            </div> */}
                              <span class="news-date">03/10/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <a
                        // href="/apple-news"
                        class="btn_all_news"
                        style={{ color: "blue" }}
                      >
                        Xem tất cả Khuyến mại {">"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Tin khác */}
                <div>
                  <div style={{ marginTop: "40px" }}>
                    <b>
                      <h2 style={{ fontWeight: "bold", marginLeft: "20px" }}>
                        Tin Khác
                      </h2>
                    </b>
                  </div>
                  <br />
                  <div>
                    <div>
                      <Row>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/co-nen-mua-macbook-pro-m3"
                                title="Hiển thị sản phẩm trong danh mục Ai nên mua MacBook Pro M3 với cải tiến chính về GPU? - Tư vấn chi tiết"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Ai nên mua MacBook Pro M3 với cải tiến chính về GPU? - Tư vấn chi tiết"
                                  src="https://shopdunk.com/images/thumbs/0023713_co-nen-mua-macbook-pro-m3-ava_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Ai nên mua MacBook Pro M3 với cải tiến chính về GPU? - Tư vấn chi tiết"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                // href="/co-nen-mua-macbook-pro-m3"
                                >
                                  Ai nên mua MacBook Pro M3 với cải tiến chính
                                  về GPU? - Tư vấn chi tiết
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Cùng ShopDunk điểm qua 9 điểm nổi bật trên dòng
                            MacBook Pro M3 để dễ dàng đưa ra quyết định có nên
                            mua MacBook Pro M3 hay không. Đừng bỏ lỡ!
                         </div> */}
                              <span class="news-date">10/11/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/tra-gop-macbook-pro-m3"
                                title="Hiển thị sản phẩm trong danh mục Trả góp MacBook Pro M3 - Sở hữu MacBook chip M3 đơn giản với ShopDunk"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Trả góp MacBook Pro M3 - Sở hữu MacBook chip M3 đơn giản với ShopDunk"
                                  src="https://shopdunk.com/images/thumbs/0023666_tra-gop-macbook-pro-m3 (1)_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Trả góp MacBook Pro M3 - Sở hữu MacBook chip M3 đơn giản với ShopDunk"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/tra-gop-macbook-pro-m3"
                                >
                                  Trả góp MacBook Pro M3 - Sở hữu MacBook chip
                                  M3 đơn giản với ShopDunk
                                </a>
                              </h4>
                              {/* <div class="news-body">
                        ShopDunk hỗ trợ trả góp 0% lãi suất đối với dòng
                            MacBook Pro M3. Tìm hiểu chi tiết chính sách của
                            ShopDunk để sở hữu sản phẩm với giá ưu đãi nhất!
                            </div> */}
                              <span class="news-date">10/11/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                      <Row>
                        {/* 2 */}
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/review-macbook-pro-m3-2023"
                                title="Hiển thị sản phẩm trong danh mục Review MacBook Pro M3 2023: Chip M3 series vượt trội, tối ưu đồ họa và gaming"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Review MacBook Pro M3 2023: Chip M3 series vượt trội, tối ưu đồ họa và gaming"
                                  src="https://shopdunk.com/images/thumbs/0023321_review-macbook-pro-m3-2023 (2)_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Review MacBook Pro M3 2023: Chip M3 series vượt trội, tối ưu đồ họa và gaming"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/review-macbook-pro-m3-2023"
                                >
                                  Review MacBook Pro M3 2023: Chip M3 series
                                  vượt trội, tối ưu đồ họa và gaming
                                </a>
                              </h4>
                              {/* <div class="news-body">
                               MacBook Pro M3 2023 - Siêu phẩm đình đám nhận được
                            nhiều sự đầu tư về hiệu năng cùng các công nghệ mới
                            đi kèm. Hãy cùng review MacBook Pro M3 2023 chi tiết
                            hơn trong bài viết này!
                            </div> */}
                              <span class="news-date">08/11/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/sac-macbook-pro-m3-bao-nhieu-w"
                                title="Hiển thị sản phẩm trong danh mục Sạc MacBook Pro M3 bao nhiêu W? Máy hỗ trợ tính năng sạc nhanh nào?"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Sạc MacBook Pro M3 bao nhiêu W? Máy hỗ trợ tính năng sạc nhanh nào?"
                                  src="https://shopdunk.com/images/thumbs/0023320_sac-macbook-pro-m3-bao-nhieu-w (4)_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Sạc MacBook Pro M3 bao nhiêu W? Máy hỗ trợ tính năng sạc nhanh nào?"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                // href="/sac-macbook-pro-m3-bao-nhieu-w"
                                >
                                  Sạc MacBook Pro M3 bao nhiêu W? Máy hỗ trợ
                                  tính năng sạc nhanh nào?
                                </a>
                              </h4>
                              {/* <div class="news-body">
                             MacBook Pro 14 inch M3 và MacBook Pro 16 inch M3
                            chính thức ra mắt. Thông tin về việc sạc MacBook Pro
                            M3 bao nhiêu W, máy liệu có được hỗ trợ sạc nhanh sẽ
                            được bật mí trong bài viết này!
                            </div> */}
                              <span class="news-date">08/11/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <a
                        // href="/apple-news"
                        class="btn_all_news"
                        style={{ color: "blue" }}
                      >
                        Xem tất cả Tin khác {">"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* iVideo */}
                <div>
                  <div style={{ marginTop: "40px" }}>
                    <b>
                      <h2 style={{ fontWeight: "bold", marginLeft: "20px" }}>
                        iVideo
                      </h2>
                    </b>
                  </div>
                  <br />
                  <div>
                    <div>
                      <Row>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/ipad-gen-9-c%C3%A1ch-thi%E1%BA%BFt-l%E1%BA%ADp-t%E1%BB%91i-%C6%B0u-cho-c%C3%B4ng-vi%E1%BB%87c-v%C3%A0-h%E1%BB%8Dc-t%E1%BA%ADp"
                                title="Hiển thị sản phẩm trong danh mục iPad Gen 9: Cách thiết lập tối ưu cho công việc và học tập!"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục iPad Gen 9: Cách thiết lập tối ưu cho công việc và học tập!"
                                  src="https://shopdunk.com/images/thumbs/0016899_maxresdefault_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục iPad Gen 9: Cách thiết lập tối ưu cho công việc và học tập!"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/ipad-gen-9-c%C3%A1ch-thi%E1%BA%BFt-l%E1%BA%ADp-t%E1%BB%91i-%C6%B0u-cho-c%C3%B4ng-vi%E1%BB%87c-v%C3%A0-h%E1%BB%8Dc-t%E1%BA%ADp"
                                >
                                  iPad Gen 9: Cách thiết lập tối ưu cho công
                                  việc và học tập!
                                </a>
                              </h4>
                              {/* <div class="news-body">
                           Cùng tìm hiểu cách thiết lập iPad Gen 9 để tối ưu
                            cho công việc và học tập trong video tới từ Yêu
                            Apple - Đối tác chính thức của ShopDunk.
                         </div> */}
                              <span class="news-date">01/05/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/imac-m1-d%C3%A0nh-cho-ai-h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-l%E1%BB%B1a-ch%E1%BB%8Dn-imac-m1-cho-m%E1%BB%8Di-ng%C6%B0%E1%BB%9Di"
                                title="Hiển thị sản phẩm trong danh mục iMac M1 dành cho ai? - Hướng dẫn lựa chọn iMac M1 cho mọi người"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục iMac M1 dành cho ai? - Hướng dẫn lựa chọn iMac M1 cho mọi người"
                                  src="https://shopdunk.com/images/thumbs/0016914_maxresdefault-2_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục iMac M1 dành cho ai? - Hướng dẫn lựa chọn iMac M1 cho mọi người"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/imac-m1-d%C3%A0nh-cho-ai-h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-l%E1%BB%B1a-ch%E1%BB%8Dn-imac-m1-cho-m%E1%BB%8Di-ng%C6%B0%E1%BB%9Di"
                                >
                                  iMac M1 dành cho ai? - Hướng dẫn lựa chọn iMac
                                  M1 cho mọi người
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              iMac M1 dành cho ai? - Hướng dẫn lựa chọn iMac M1
                            cho mọi người
                            </div> */}
                              <span class="news-date">01/05/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                      <Row>
                        {/* 2 */}
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/review-iphone-12-thoi-diem-hien-tai"
                                title="Hiển thị sản phẩm trong danh mục iPhone 12 vào 2023 I ĐỦ DÙNG NHƯNG VẪN NÊN LƯU Ý!"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục iPhone 12 vào 2023 I ĐỦ DÙNG NHƯNG VẪN NÊN LƯU Ý!"
                                  src="https://shopdunk.com/images/thumbs/0014265_maxresdefault (27)_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục iPhone 12 vào 2023 I ĐỦ DÙNG NHƯNG VẪN NÊN LƯU Ý!"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/review-iphone-12-thoi-diem-hien-tai"
                                >
                                  iPhone 12 vào 2023 I ĐỦ DÙNG NHƯNG VẪN NÊN LƯU
                                  Ý!
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Đánh giá chiếc máy "quốc dân" với hiệu năngj tốt ,
                            mượt mà, thiết kế đẹp và giá "dịu dàng" cùng
                            ShopDunk nhé.
                            </div> */}
                              <span class="news-date">19/03/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                        <div className="col-6">
                          <Row>
                            <div className="col-6">
                              <a
                                // href="/top-phu-kien-bao-ve-macbook-ma-ban-nen-hoac-khong-nen-dung"
                                title="Hiển thị sản phẩm trong danh mục Top phụ kiện bảo vệ MacBook mà bạn NÊN hoặc KHÔNG NÊN dùng!"
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: "146px",
                                    borderRadius: "10px",
                                  }}
                                  alt="Hình ảnh cho danh mục Top phụ kiện bảo vệ MacBook mà bạn NÊN hoặc KHÔNG NÊN dùng!"
                                  src="https://shopdunk.com/images/thumbs/0014251_maxresdefault (14)_1600.jpeg"
                                  title="Hiển thị sản phẩm trong danh mục Top phụ kiện bảo vệ MacBook mà bạn NÊN hoặc KHÔNG NÊN dùng!"
                                />
                              </a>
                            </div>
                            <div className="col-6">
                              <h4 class="news-title">
                                <a
                                //  href="/top-phu-kien-bao-ve-macbook-ma-ban-nen-hoac-khong-nen-dung"
                                >
                                  Top phụ kiện bảo vệ MacBook mà bạn NÊN hoặc
                                  KHÔNG NÊN dùng!
                                </a>
                              </h4>
                              {/* <div class="news-body">
                              Bảo vệ MacBook là cần thiết nhưng liệu bạn đã biết
                            những phụ kiện nào nên và không nên dùng cho MacBook
                            của mình chưa? Video tới từ Yêu Apple - Đối tác
                            chính thức của ShopDunk sẽ cung cấp cho bạn lời
                            giải.
                            </div> */}
                              <span class="news-date">18/03/2023</span>
                            </div>
                          </Row>
                          <b>
                            <hr style={{ border: "1px solid black" }} />
                          </b>
                        </div>
                      </Row>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <a
                        // href="/apple-news"
                        class="btn_all_news"
                        style={{ color: "blue" }}
                      >
                        Xem tất cả iVideo {">"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div id="sd-chat-box"></div>
            <div class="chat-box_toggle"></div>
            <section
              class="all_chat-box"
              id="contact1"
              style={{ display: "none" }}
            >
              <div class="all_items-chat-box">
                <a
                  class="items-chat-icon ic_zalo"
                  href="https://zalo.me/3937868610324741136"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="13"
                    viewBox="0 0 36 13"
                    fill="none"
                  >
                    <path
                      d="M18.6343 3.93038V3.24788H20.5901V12.8362H19.4721C19.2508 12.8367 19.0384 12.7454 18.8813 12.5825C18.7243 12.4196 18.6355 12.1984 18.6343 11.9672V11.9687C17.818 12.593 16.8322 12.9288 15.8205 12.9272C14.5565 12.9272 13.3441 12.4029 12.45 11.4695C11.5559 10.5361 11.0532 9.27 11.0525 7.94955C11.0532 6.6291 11.5559 5.36301 12.45 4.4296C13.3441 3.49619 14.5565 2.97185 15.8205 2.97185C16.8317 2.97066 17.8169 3.30644 18.6329 3.93038H18.6343ZM10.5458 0.166016V0.476932C10.5458 1.0563 10.4717 1.5295 10.1102 2.0846L10.0666 2.13617C9.94618 2.27726 9.82903 2.42139 9.71527 2.56841L3.43866 10.7978H10.5458V11.9626C10.5458 12.0775 10.5241 12.1912 10.482 12.2973C10.4398 12.4034 10.3781 12.4998 10.3003 12.5809C10.2225 12.6621 10.1301 12.7264 10.0285 12.7702C9.92686 12.814 9.81795 12.8364 9.70801 12.8362H0.5V12.2872C0.5 11.6153 0.65971 11.315 0.862977 11.0026L7.55192 2.35001H0.778767V0.166016H10.5472H10.5458ZM22.961 12.8362C22.7762 12.8362 22.5989 12.7595 22.4682 12.623C22.3375 12.4865 22.2641 12.3013 22.2641 12.1082V0.166016H24.3563V12.8362H22.961ZM30.5444 2.91118C31.1747 2.91098 31.7989 3.04048 32.3813 3.29228C32.9638 3.54408 33.493 3.91324 33.9389 4.37871C34.3848 4.84417 34.7385 5.39681 34.9799 6.00507C35.2213 6.61333 35.3456 7.2653 35.3458 7.92377C35.346 8.58223 35.222 9.23428 34.981 9.84269C34.7399 10.4511 34.3865 11.004 33.941 11.4697C33.4954 11.9355 32.9663 12.305 32.384 12.5571C31.8017 12.8093 31.1776 12.9392 30.5473 12.9394C29.2742 12.9398 28.0532 12.4119 27.1527 11.4719C26.2523 10.5318 25.7462 9.25662 25.7458 7.9268C25.7454 6.59698 26.2508 5.32146 27.1507 4.38085C28.0506 3.44024 29.2713 2.91159 30.5444 2.91118ZM15.822 10.8782C16.1956 10.8871 16.5672 10.8179 16.9149 10.6747C17.2626 10.5315 17.5794 10.3171 17.8466 10.0442C18.1139 9.77129 18.3262 9.44535 18.4712 9.08551C18.6162 8.72567 18.6909 8.3392 18.6909 7.94879C18.6909 7.55838 18.6162 7.17191 18.4712 6.81207C18.3262 6.45224 18.1139 6.12629 17.8466 5.85339C17.5794 5.58049 17.2626 5.36613 16.9149 5.2229C16.5672 5.07967 16.1956 5.01047 15.822 5.01935C15.0893 5.03677 14.3922 5.35305 13.8799 5.90053C13.3676 6.44801 13.0807 7.1832 13.0807 7.94879C13.0807 8.71438 13.3676 9.44957 13.8799 9.99705C14.3922 10.5445 15.0893 10.8608 15.822 10.8782ZM30.5444 10.8737C31.2933 10.8737 32.0116 10.5629 32.5412 10.0097C33.0708 9.45646 33.3683 8.70613 33.3683 7.92377C33.3683 7.1414 33.0708 6.39108 32.5412 5.83786C32.0116 5.28464 31.2933 4.97385 30.5444 4.97385C29.7954 4.97385 29.0771 5.28464 28.5475 5.83786C28.0179 6.39108 27.7204 7.1414 27.7204 7.92377C27.7204 8.70613 28.0179 9.45646 28.5475 10.0097C29.0771 10.5629 29.7954 10.8737 30.5444 10.8737Z"
                      fill="#2288FF"
                    ></path>
                  </svg>
                </a>
                <a class="items-chat-icon ic_tel" href="tel:19006626">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6.68715 17.2624C7.88236 18.4658 9.14893 19.5533 10.4868 20.525C11.8248 21.4878 13.1627 22.2499 14.5006 22.8115C15.8474 23.3821 17.1229 23.6673 18.3271 23.6673C19.1566 23.6673 19.9236 23.5202 20.6283 23.2261C21.3329 22.9319 21.9751 22.4728 22.5549 21.8488C22.876 21.4833 23.1391 21.0866 23.3443 20.6587C23.5583 20.2308 23.6654 19.8029 23.6654 19.3751C23.6654 19.072 23.5985 18.7778 23.4647 18.4925C23.3398 18.1984 23.1257 17.9488 22.8225 17.7437L18.9291 15.0026C18.6526 14.7975 18.3895 14.6504 18.1398 14.5613C17.8989 14.4632 17.6626 14.4142 17.4307 14.4142C17.1542 14.4142 16.8776 14.49 16.6011 14.6415C16.3336 14.7931 16.0571 15.0115 15.7716 15.2967L14.8618 16.1793C14.7281 16.313 14.5675 16.3798 14.3802 16.3798C14.2821 16.3798 14.1884 16.3665 14.0992 16.3397C14.019 16.3041 13.9431 16.2729 13.8718 16.2461C13.4882 16.0411 12.9888 15.6845 12.3733 15.1764C11.7579 14.6683 11.1335 14.0978 10.5002 13.4648C9.86694 12.8319 9.29164 12.2079 8.77431 11.5928C8.2659 10.9688 7.91358 10.4652 7.71735 10.0818C7.68167 10.0105 7.65046 9.93475 7.6237 9.85452C7.59694 9.77429 7.58356 9.68515 7.58356 9.58709C7.58356 9.4088 7.646 9.25726 7.77087 9.13246L8.66728 8.20982C8.9527 7.90673 9.17123 7.62147 9.32286 7.35404C9.47449 7.08661 9.5503 6.80581 9.5503 6.51163C9.5503 6.28878 9.49679 6.057 9.38975 5.81631C9.29164 5.56671 9.14447 5.29928 8.94824 5.01402L6.25902 1.21651C6.03603 0.913418 5.77291 0.690559 5.46965 0.547929C5.16638 0.405299 4.84528 0.333984 4.50634 0.333984C3.65007 0.333984 2.84286 0.699473 2.08471 1.43045C1.47818 2.0188 1.03221 2.674 0.746787 3.39607C0.470283 4.10922 0.332031 4.86694 0.332031 5.66923C0.332031 6.87267 0.608535 8.14296 1.16154 9.48012C1.72347 10.8173 2.48162 12.15 3.43601 13.4782C4.39931 14.8064 5.48302 16.0678 6.68715 17.2624Z"
                      fill="#339901"
                    ></path>
                  </svg>
                </a>
                <a
                  class="items-chat-icon ic_mess"
                  href="https://m.me/shopdunk.store"
                  target="_blank"
                >
                  <img
                    src="/images/uploaded-source/icon/ic_messenger.png"
                    width="28"
                    height="28"
                  />
                </a>
              </div>
            </section>
            <a id="backTop" class="btn btn-back-top bg-teal"></a>
            <div class="hidden-lg hidden-md bottom" style={{ display: "none" }}>
              <ul>
                <li>
                  <a href="/">
                    <img
                      src="/images/uploaded-source/icon/IC_home.png"
                      width="22"
                      height="22"
                    />
                    <span>Trang chủ</span>
                  </a>
                </li>
                <li>
                  <a href="/flash-sale" id="procat">
                    <img
                      src="/images/uploaded-source/icon/bottom-flash-sale.png"
                      width="22"
                      height="22"
                    />
                    <span>Flash Sale</span>
                  </a>
                </li>
                <li>
                  <a alt="Hệ thống cửa hàng" href="/find-store">
                    <img
                      src="/images/uploaded-source/icon/Shop.png"
                      width="22"
                      height="22"
                    />
                    <span>Cửa hàng</span>
                  </a>
                </li>
                <li>
                  <a href="/tin-tuc">
                    <img
                      style={{ height: "22px" }}
                      src="/images/uploaded-source/icon/News.png"
                      width="22"
                      height="22"
                    />
                    <span>Tin tức</span>
                  </a>
                </li>
                <li>
                  <a href="/care">
                    <img
                      style={{ height: "22px" }}
                      src="/images/uploaded-source/icon/fixed.png"
                      width="22"
                      height="22"
                    />
                    <span>
                      Bảo hành
                      <br />
                      Apple
                    </span>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "black",
          marginTop: "50px",
          paddingBottom: "60px",
          marginBottom: "40px",
        }}
      >
        <div>
          <div>
            <div className="container">
              <div>
                <div>
                  <Row>
                    <img
                      style={{
                        marginTop: "20px",
                        marginBottom: "30px",
                        paddingLeft: "15px",
                      }}
                      s
                      src="//cdn.tgdd.vn/mwgcart/topzone/images/topnews/desktop/video-title.png"
                      width="75"
                      height="24"
                    />
                  </Row>
                  <Row>
                    {/* 1 */}

                    <div class="col-8">
                      <iframe
                        title="YouTube video player"
                        src="https://www.youtube.com/embed/69bFJeJiEDg?start=1"
                        width="100%"
                        height="99%"
                        frameborder="0"
                        allowfullscreen=""
                      ></iframe>
                    </div>
                    {/* 2 */}
                    <div className="col-4">
                      <div
                        class="item_video normal_vd"
                        style={{ marginBottom: "30px" }}
                      >
                        <iframe
                          title="YouTube video player"
                          src="https://www.youtube.com/embed/94ec9ETfps8?start=1"
                          width="100%"
                          height="100%"
                          frameborder="0"
                          allowfullscreen=""
                        ></iframe>
                      </div>
                      {/* 3 */}
                      <div
                        class="item_video normal_vd"
                        style={{ marginBottom: "30px" }}
                      >
                        <iframe
                          title="YouTube video player"
                          src="https://www.youtube.com/embed/FDh8pYtMtIc?start=1"
                          width="100%"
                          height="100%"
                          frameborder="0"
                          allowfullscreen=""
                        ></iframe>
                      </div>
                      {/* 4 */}
                      <div class="item_video normal_vd">
                        <iframe
                          title="iPhone 14/14 Plus VÀNG chính thức! Máy đã ế còn cho thêm màu ế, nước đi KHÓ HIỂU của Apple?!"
                          src="https://www.youtube.com/embed/k1at0x4Ut1U"
                          width="100%"
                          height="100%"
                          frameborder="0"
                          allowfullscreen=""
                        ></iframe>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <i
        className="fa fa-arrow-up"
        id="goto-top-page"
        onClick={() => goToTop()}
      />
      <Footer />
    </>
  );
}
