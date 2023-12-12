import React from "react";

import { useEffect, useState } from "react";

import queryString from "query-string";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ImageProduct from "./ImageProduct";
import PriceProduct from "./PriceProducts";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  readFilterProductByAscendingPrice,
  readFilterProductByCategory,
  readFilterProductByDecreasePrice,
  readFilterProductByPrice,
  readProductCheap,
  readProductNew,
  readAll,
  readAll2,
} from "../../../service/product.service";
import { priceMinAndMaxBySKU } from "../../../service/sku.service";
import Pagination from "../../product_component/Size/Paging";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TrangChu() {
  const [display, setDisplay] = useState([]);

  const [productNew, setProductNew] = useState([]);

  const [productCheap, setProductCheap] = useState([]);

  const [quantityNoiBat, setQuantityNoiBat] = useState([]);

  const [quantityMoi, setQuantityMoi] = useState([]);

  const [quantityGiaRe, setQuantityGiaRe] = useState([]);

  const [filters, setFilters] = useState({
    page: 0,
    key: "",
  });

  const [filtersNew, setFiltersNew] = useState({
    page: 0,
    key: "",
  });

  const [filtersCheap, setFiltersCheap] = useState({
    page: 0,
    key: "",
  });

  const [filtersPrice, setFiltersPrice] = useState({
    page: 0,
    key: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const [filtersCategory, setFiltersCategory] = useState({
    page: 0,
    key: "",
    nameCategory: "",
  });

  const [filtersAcendingPrice, setFiltersAcendingPrice] = useState({
    page: 0,
    key: "",
  });

  const [filtersDecreasePrice, setFiltersDecreasePrice] = useState({
    page: 0,
    key: "",
  });

  const [productFilter, setProductFilter] = useState([]);

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    totalRows: 1,
  });

  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    const paramsStringNew = queryString.stringify(filtersNew);
    const paramsStringCheap = queryString.stringify(filtersCheap);
    const paramsStringPrice = queryString.stringify(filtersPrice);
    const paramsStringCategory = queryString.stringify(filtersCategory);
    const paramsStringAcendingPrice =
      queryString.stringify(filtersAcendingPrice);
    const paramsStringDecreasePrice =
      queryString.stringify(filtersDecreasePrice);
    readAll2(paramsString)
      .then((response) => {
        setDisplay(response.data.content);
        setProductFilter(
          response.data.content.map((dl) => {
            return (
              <li className="sanPham" onClick={() => goToTop()}>
                <Link to={`/productDetail/${dl.id}`}>
                  <ImageProduct product={dl.id}></ImageProduct>
                  <h3>{dl.name}</h3>
                  <div className="price">
                    <PriceProduct product={dl.id}></PriceProduct>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Sản phẩm nổi bật
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Nok1', 'Nokia black future'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </Link>
              </li>
            );
          })
        );
        setQuantityNoiBat(response.data.totalElements);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readProductNew(paramsStringNew)
      .then((response) => {
        setProductNew(response.data.content);
        setProductFilter(
          response.data.content.map((prn) => {
            return (
              <li className="sanPham" onClick={() => goToTop()} key={prn.id}>
                <Link to={`/productDetail/${prn.id}`}>
                  <ImageProduct product={prn.id}></ImageProduct>
                  <h3>{prn.name}</h3>
                  <div className="price">
                    <PriceProduct product={prn.id}></PriceProduct>
                  </div>
                  <label className="moiramat">Mới ra mắt</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Xia2', 'Xiaomi Redmi Note 5'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </Link>
              </li>
            );
          })
        );
        setQuantityMoi(response.data.totalElements);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readProductCheap(paramsStringCheap)
      .then((response) => {
        setProductCheap(response.data.content);
        setProductFilter(
          response.data.content.map((prc) => {
            return (
              <li className="sanPham" onClick={() => goToTop()} key={prc.id}>
                <Link to={`/productDetail/${prc.id}`}>
                  <ImageProduct product={prc.id}></ImageProduct>
                  <h3>{prc.name}</h3>
                  <div className="price">
                    <PriceProduct price={prc.id}></PriceProduct>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Ite2', 'Itel it2123'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </Link>
              </li>
            );
          })
        );
        setQuantityGiaRe(response.data.totalElements);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readFilterProductByPrice(paramsStringPrice)
      .then((response) => {
        setProductFilter(
          response.data.content.map((prp) => {
            return (
              <li className="sanPham" onClick={() => goToTop()} key={prp.id}>
                <Link to={`/productDetail/${prp.id}`}>
                  <ImageProduct product={prp.id}></ImageProduct>
                  <h3>{prp.name}</h3>
                  <div className="price">
                    <PriceProduct product={prp.id}></PriceProduct>
                  </div>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Ite2', 'Itel it2123'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </Link>
              </li>
            );
          })
        );
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readFilterProductByCategory(paramsStringCategory)
      .then((response) => {
        setProductFilter(
          response.data.content.map((prcg) => {
            return (
              <li className="sanPham" onClick={() => goToTop()} key={prcg.id}>
                <Link to={`/productDetail/${prcg.id}`}>
                  <ImageProduct product={prcg.id}></ImageProduct>
                  <h3>{prcg.name}</h3>
                  <div className="price">
                    <PriceProduct product={prcg.id}></PriceProduct>
                  </div>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Ite2', 'Itel it2123'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </Link>
              </li>
            );
          })
        );
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readFilterProductByAscendingPrice(paramsStringAcendingPrice)
      .then((response) => {
        setProductFilter(
          response.data.content.map((prap) => {
            return (
              <li className="sanPham" onClick={() => goToTop()} key={prap.id}>
                <Link to={`/productDetail/${prap.id}`}>
                  <ImageProduct product={prap.id}></ImageProduct>
                  <h3>{prap.name}</h3>
                  <div className="price">
                    <PriceProduct product={prap.id}></PriceProduct>
                  </div>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Ite2', 'Itel it2123'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </Link>
              </li>
            );
          })
        );
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readFilterProductByDecreasePrice(paramsStringDecreasePrice)
      .then((response) => {
        setProductFilter(
          response.data.content.map((prdp) => {
            return (
              <li className="sanPham" onClick={() => goToTop()} key={prdp.id}>
                <Link to={`/productDetail/${prdp.id}`}>
                  <ImageProduct product={prdp.id}></ImageProduct>
                  <h3>{prdp.name}</h3>
                  <div className="price">
                    <PriceProduct product={prdp.id}></PriceProduct>
                  </div>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Ite2', 'Itel it2123'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </Link>
              </li>
            );
          })
        );
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [
    filters,
    filtersNew,
    filtersCheap,
    filtersPrice,
    filtersCategory,
    filtersAcendingPrice,
    filtersDecreasePrice,
  ]);

  function goToTop() {
    window.scrollTo({
      top: 0, // Cuộn lên vị trí đầu trang
      behavior: "smooth", // Hiệu ứng cuộn mượt
    });
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {};

    if (filtersPrice != null) {
      item = { ...filtersPrice };
      item[name] = value;
      setFiltersPrice(item);
    }

    if (filtersCategory != null) {
      item = { ...filtersCategory };
      item[name] = value;
      setFiltersCategory(item);
    }

    if (filtersAcendingPrice != null) {
      item = { ...filtersAcendingPrice };
      item[name] = value;
      setFiltersAcendingPrice(item);
    }

    if (filtersDecreasePrice != null) {
      item = { ...filtersDecreasePrice };
      item[name] = value;
      setFiltersDecreasePrice(item);
    }

    if (filtersNew != null) {
      item = { ...filtersNew };
      item[name] = value;
      setFiltersNew(item);
    }

    if (filtersCheap != null) {
      item = { ...filtersCheap };
      item[name] = value;
      setFiltersCheap(item);
    }

    if (filters != null) {
      item = { ...filters };
      item[name] = value;
      setFilters(item);
    }
  }

  function handlePageChange(newPage) {
    if (filtersPrice != null) {
      setFiltersPrice({
        ...filtersPrice,
        page: newPage,
      });
    }

    if (filtersCategory != null) {
      setFiltersCategory({
        ...filtersCategory,
        page: newPage,
      });
    }

    if (filtersAcendingPrice != null) {
      setFiltersAcendingPrice({
        ...filtersAcendingPrice,
        page: newPage,
      });
    }

    if (filtersDecreasePrice != null) {
      setFiltersDecreasePrice({
        ...filtersDecreasePrice,
        page: newPage,
      });
    }

    if (filtersNew != null) {
      setFiltersNew({
        ...filtersNew,
        page: newPage,
      });
    }

    if (filtersCheap != null) {
      setFiltersCheap({
        ...filtersCheap,
        page: newPage,
      });
    }

    if (filters != null) {
      setFilters({
        ...filters,
        page: newPage,
      });
    }
  }

  const outstandingProducts = display.map((dl) => {
    return (
      <li className="sanPham" onClick={() => goToTop()}>
        <Link to={`/productDetail/${dl.id}`}>
          <ImageProduct product={dl.id}></ImageProduct>
          <h3>{dl.name}</h3>
          <div className="price">
            <PriceProduct product={dl.id}></PriceProduct>
          </div>
          <label className="giamgia">
            <i className="fa fa-bolt" /> Sản phẩm nổi bật
          </label>
          <div className="tooltip">
            <button
              className="themvaogio"
              onclick="themVaoGioHang('Nok1', 'Nokia black future'); return false;"
            >
              <span className="tooltiptext" style={{ fontSize: 15 }}>
                Thêm vào giỏ
              </span>
              +
            </button>
          </div>
        </Link>
      </li>
    );
  });

  const listProductNew = productNew.map((prn) => {
    return (
      <li className="sanPham" onClick={() => goToTop()} key={prn.id}>
        <Link to={`/productDetail/${prn.id}`}>
          <ImageProduct product={prn.id}></ImageProduct>
          <h3>{prn.name}</h3>
          <div className="price">
            <PriceProduct product={prn.id}></PriceProduct>
          </div>
          <label className="moiramat">Mới ra mắt</label>
          <div className="tooltip">
            <button
              className="themvaogio"
              onclick="themVaoGioHang('Xia2', 'Xiaomi Redmi Note 5'); return false;"
            >
              <span className="tooltiptext" style={{ fontSize: 15 }}>
                Thêm vào giỏ
              </span>
              +
            </button>
          </div>
        </Link>
      </li>
    );
  });

  const listProductCheap = productCheap.map((prc) => {
    return (
      <li className="sanPham" onClick={() => goToTop()} key={prc.id}>
        <Link to={`/productDetail/${prc.id}`}>
          <ImageProduct product={prc.id}></ImageProduct>
          <h3>{prc.name}</h3>
          <div className="price">
            <PriceProduct product={prc.id}></PriceProduct>
          </div>
          <label className="giareonline">Giá rẻ online</label>
          <div className="tooltip">
            <button
              className="themvaogio"
              onclick="themVaoGioHang('Ite2', 'Itel it2123'); return false;"
            >
              <span className="tooltiptext" style={{ fontSize: 15 }}>
                Thêm vào giỏ
              </span>
              +
            </button>
          </div>
        </Link>
      </li>
    );
  });

  function noiBatNhat() {
    showContainProducts();
    let item = { page: 0, key: "" };
    setFiltersPrice(null);
    setFiltersCategory(null);
    setFilters(item);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
  }

  function moi() {
    showContainProducts();
    let item = { page: 0, key: "" };
    setFiltersPrice(null);
    setFiltersCategory(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(item);
    setFiltersCheap(null);
  }

  function giaRe() {
    showContainProducts();
    let item = { page: 0, key: "" };
    setFiltersPrice(null);
    setFiltersCategory(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(item);
  }

  function duoi2Trieu() {
    let item = { page: 0, key: "", minPrice: 0, maxPrice: 2000000 };
    setFiltersPrice(item);
    setFiltersCategory(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function tu2Den4Trieu() {
    let item = { page: 0, key: "", minPrice: 1999999, maxPrice: 4000001 };
    setFiltersPrice(item);
    setFiltersCategory(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function tu4Den7Trieu() {
    let item = { page: 0, key: "", minPrice: 3999999, maxPrice: 7000001 };
    setFiltersPrice(item);
    setFiltersCategory(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function tu7Den13Trieu() {
    let item = { page: 0, key: "", minPrice: 6999999, maxPrice: 13000001 };
    setFiltersPrice(item);
    setFiltersCategory(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function tren13Trieu() {
    let item = { page: 0, key: "", minPrice: 13000000, maxPrice: 999999999 };
    setFiltersPrice(item);
    setFiltersCategory(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function iphone() {
    let item = { page: 0, key: "", nameCategory: "iphone" };
    setFiltersCategory(item);
    setFiltersPrice(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function samsung() {
    let item = { page: 0, key: "", nameCategory: "samsung" };
    setFiltersCategory(item);
    setFiltersPrice(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function oppo() {
    let item = { page: 0, key: "", nameCategory: "oppo" };
    setFiltersCategory(item);
    setFiltersPrice(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function xiaomi() {
    let item = { page: 0, key: "", nameCategory: "xiaomi" };
    setFiltersCategory(item);
    setFiltersPrice(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function huawei() {
    let item = { page: 0, key: "", nameCategory: "huawei" };
    setFiltersCategory(item);
    setFiltersPrice(null);
    setFilters(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function ascendingPrice() {
    let item = { page: 0, key: "" };
    setFilters(null);
    setFiltersPrice(null);
    setFiltersCategory(null);
    setFiltersAcendingPrice(item);
    setFiltersDecreasePrice(null);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function decreasePrice() {
    let item = { page: 0, key: "" };
    setFilters(null);
    setFiltersPrice(null);
    setFiltersCategory(null);
    setFiltersAcendingPrice(null);
    setFiltersDecreasePrice(item);
    setFiltersNew(null);
    setFiltersCheap(null);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  function showContainProducts() {
    const containKhungSanPham = document.getElementById("contain_khungSanPham");
    const containProducts = document.getElementById("contain_products");
    const deleteAllFilter = document.getElementById("deleteAllFilter");
    containKhungSanPham.hidden = true;
    containProducts.style.display = "block";
    deleteAllFilter.style.display = "inline";
  }

  function unShowContainProducts() {
    const containKhungSanPham = document.getElementById("contain_khungSanPham");
    const containProducts = document.getElementById("contain_products");
    const deleteAllFilter = document.getElementById("deleteAllFilter");
    containKhungSanPham.hidden = false;
    containProducts.style.display = "none";
    deleteAllFilter.style.display = "none";
    let item = { page: 0, key: "" };
    setFilters(item);
    setFiltersNew(item);
    setFiltersCheap(item);
    const keyword = document.getElementById("key");
    keyword.value = "";
  }

  return (
    <React.Fragment>
      <>
        <Header />
        <section>
          {/* Start Banner */}
          <div className="banner" style={{ maxHeight: "500px" }}>
            <div
              id="carouselExampleInterval"
              class="carousel slide"
              data-bs-ride="carousel"
              style={{ maxHeight: "500px" }}
            >
              <div class="carousel-inner" style={{ maxHeight: "500px" }}>
                <div class="carousel-item active" data-bs-interval="3000">
                  <img
                    src="/img/banners/banner1.png"
                    class="d-block w-100"
                    alt="..."
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div class="carousel-item" data-bs-interval="3000">
                  <img
                    src="/img/banners/banner2.png"
                    class="d-block w-100"
                    alt="..."
                    style={{ maxWidth: "50%", height: "auto" }}
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="/img/banners/banner3.png"
                    class="d-block w-100"
                    alt="..."
                    style={{ maxWidth: "50%", height: "auto" }}
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>{" "}
          {/* End Banner */}
          <img
            src="img/banners/blackFriday.gif"
            alt=""
            style={{ width: "100%" }}
          />
          <br />
          <div
            class="companyMenu group flexContain"
            onClick={() => showContainProducts()}
          >
            <Link to={"/"} onClick={() => iphone()}>
              <img src="img/company/Apple.jpg" />
            </Link>
            <Link to={"/"} onClick={() => samsung()}>
              <img src="img/company/Samsung.jpg" />
            </Link>
            <Link to={"/"} onClick={() => oppo()}>
              <img src="img/company/Oppo.jpg" />
            </Link>
            <Link to={"/"} onClick={() => xiaomi()}>
              <img src="img/company/Xiaomi.png" />
            </Link>
            <Link to={"/"} onClick={() => huawei()}>
              <img src="img/company/Huawei.jpg" />
            </Link>
          </div>
          <div className="flexContain">
            <div className="pricesRangeFilter dropdown">
              <button className="dropbtn">Giá tiền</button>
              <div
                class="dropdown-content"
                onClick={() => showContainProducts()}
              >
                <Link to={`/`} onClick={() => duoi2Trieu()}>
                  Dưới 2 triệu
                </Link>
                <Link to={`/`} onClick={() => tu2Den4Trieu()}>
                  Từ 2 - 4 triệu
                </Link>
                <Link to={`/`} onClick={() => tu4Den7Trieu()}>
                  Từ 4 - 7 triệu
                </Link>
                <Link to={`/`} onClick={() => tu7Den13Trieu()}>
                  Từ 7 - 13 triệu
                </Link>
                <Link to={`/`} onClick={() => tren13Trieu()}>
                  Trên 13 triệu
                </Link>
              </div>
            </div>
            <div className="sortFilter dropdown">
              <button className="dropbtn">Sắp xếp</button>
              <div
                class="dropdown-content"
                onClick={() => showContainProducts()}
              >
                <Link to={`/`} onClick={() => ascendingPrice()}>
                  Giá tăng dần
                </Link>
                <Link to={`/`} onClick={() => decreasePrice()}>
                  Giá giảm dần
                </Link>
              </div>
            </div>
          </div>{" "}
          {/* End khung chọn bộ lọc */}
          <div className="choosedFilter flexContain">
            <Link
              id="deleteAllFilter"
              style={{ display: "none" }}
              to={"/"}
              onClick={() => unShowContainProducts()}
            >
              Xóa bộ lọc
            </Link>
          </div>{" "}
          {/* Những bộ lọc đã chọn */}
          <hr />
          {/* Mặc định mới vào trang sẽ ẩn đi, nế có filter thì mới hiện lên */}
          <div
            className="contain-products"
            style={{ display: "none" }}
            id="contain_products"
          >
            <div className="filterName">
              <input
                id="key"
                type="text"
                // placeholder="Lọc trong trang theo tên..."
                placeholder="Lọc theo tên"
                name="key"
                onChange={handleChange}
              />
              <div className="listSpTrongKhung flexContain">
                {productFilter == "" ? (
                  <div
                    style={{
                      opacity: 1,
                      width: "auto",
                      color: "red",
                      fontSize: "30px",
                      fontWeight: "bold",
                      height: "310px",
                    }}
                  >
                    <i class="fa fa-times-circle"></i>
                    Không có sản phẩm nào...
                  </div>
                ) : (
                  productFilter
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>{" "}
            {/* End FilterName */}
            <ul id="products" className="homeproduct group flexContain">
              <div id="khongCoSanPham">
                <i className="fa fa-times-circle" />
                Không có sản phẩm nào
              </div>{" "}
              {/* End Khong co san pham */}
            </ul>
            {/* End products */}
            <div className="pagination" />
          </div>
          {/* Div hiển thị khung san pham hot, khuyến mãi, mới ra mắt ... */}
          <div className="contain-khungSanPham" id="contain_khungSanPham">
            <div className="khungSanPham" style={{ borderColor: "#ff9c00" }}>
              <h3
                className="tenKhung"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #ff9c00 0%, #ec1f1f 50%, #ff9c00 100%)",
                }}
              >
                * NỔI BẬT NHẤT *
              </h3>
              <div className="listSpTrongKhung flexContain">
                {outstandingProducts}
              </div>
              {quantityNoiBat > 10 ? (
                <Link
                  className="xemTatCa"
                  to="/"
                  onClick={() => noiBatNhat()}
                  style={{
                    borderLeft: "2px solid #ff9c00",
                    borderRight: "2px solid #ff9c00",
                  }}
                >
                  Xem tất cả {quantityNoiBat} sản phẩm
                </Link>
              ) : (
                ""
              )}
            </div>{" "}
            <hr />
            <div className="khungSanPham" style={{ borderColor: "#42bcf4" }}>
              <h3
                className="tenKhung"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #42bcf4 0%, #004c70 50%, #42bcf4 100%)",
                }}
              >
                * SẢN PHẨM MỚI *
              </h3>
              <div className="listSpTrongKhung flexContain">
                {listProductNew}
              </div>
              {quantityMoi > 10 ? (
                <Link
                  className="xemTatCa"
                  to="/"
                  onClick={() => moi()}
                  style={{
                    borderLeft: "2px solid #42bcf4",
                    borderRight: "2px solid #42bcf4",
                  }}
                >
                  Xem tất cả {quantityMoi} sản phẩm
                </Link>
              ) : (
                ""
              )}
            </div>{" "}
            <hr />
            <div className="khungSanPham" style={{ borderColor: "#5de272" }}>
              <h3
                className="tenKhung"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #5de272 0%, #007012 50%, #5de272 100%)",
                }}
              >
                * GIÁ RẺ CHO MỌI NHÀ *
              </h3>
              <div className="listSpTrongKhung flexContain">
                {listProductCheap}
              </div>
              {quantityGiaRe > 10 ? (
                <Link
                  className="xemTatCa"
                  to="/"
                  onClick={() => giaRe()}
                  style={{
                    borderLeft: "2px solid #5de272",
                    borderRight: "2px solid #5de272",
                  }}
                >
                  Xem tất cả {quantityGiaRe} sản phẩm
                </Link>
              ) : (
                ""
              )}
            </div>{" "}
            <hr />
          </div>
        </section>{" "}
        <i
          className="fa fa-arrow-up"
          id="goto-top-page"
          onClick={() => goToTop()}
        />
        <Footer />
      </>
    </React.Fragment>
  );
}
