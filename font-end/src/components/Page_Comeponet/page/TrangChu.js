import React from "react";
<<<<<<< HEAD:font-end/src/components/Page_Comeponet/page/TrangChu.js
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import NewProduct from "./newProduct/NewProduct";
import ChipProduct from "./newProduct/ChipProduct";

export default function TrangChu(){

  const VND = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND'
  });

  return(
=======
import Header from "../Page_Comeponet/layout/Header";
import Footer from "../Page_Comeponet/layout/Footer";
import { useEffect, useState } from "react";
import {
  readAll,
  readProductNew,
  readProductCheap,
  readFilterProductByPrice,
  readFilterProductByCategory,
  readFilterProductByAscendingPrice,
  readFilterProductByDecreasePrice,
} from "../../service/product.service";
import queryString from "query-string";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Pagination from "../product_component/Size/Paging";

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
    readAll(paramsString)
      .then((response) => {
        setDisplay(response.data.content);
        setProductFilter(
          response.data.content.map((dl) => {
            return (
              <li className="sanPham" onClick={() => goToTop()}>
                <Link to={`/product/${dl.id}`}>
                  <img
                    src="https://ava-grp-talk.zadn.vn/d/a/d/9/6/360/cf2dcf5dfc1a9ab9b653241d642a47bd.jpg"
                    alt=""
                  />
                  <h3>{dl.name}</h3>
                  <div className="price">
                    <strong>
                      {dl.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>9999 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 1.000₫
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
                <Link to={`/product/${prn.id}`}>
                  <img
                    src="https://zpsocial-f56-org.zadn.vn/3c1ad68c5c9ebdc0e48f.jpg"
                    alt=""
                  />
                  <h3>{prn.name}</h3>
                  <div className="price">
                    <strong>
                      {prn.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>372 đánh giá</span>
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
                <Link to={`/product/${prc.id}`}>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/146651/itel-it2123-d-300-300x300.jpg"
                    alt=""
                  />
                  <h3>{prc.name}</h3>
                  <div className="price">
                    <strong>
                      {prc.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>302 đánh giá</span>
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
                <Link to={`/product/${prp.id}`}>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/146651/itel-it2123-d-300-300x300.jpg"
                    alt=""
                  />
                  <h3>{prp.name}</h3>
                  <div className="price">
                    <strong>
                      {prp.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>302 đánh giá</span>
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
                <Link to={`/product/${prcg.id}`}>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/146651/itel-it2123-d-300-300x300.jpg"
                    alt=""
                  />
                  <h3>{prcg.name}</h3>
                  <div className="price">
                    <strong>
                      {prcg.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>302 đánh giá</span>
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
                <Link to={`/product/${prap.id}`}>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/146651/itel-it2123-d-300-300x300.jpg"
                    alt=""
                  />
                  <h3>{prap.name}</h3>
                  <div className="price">
                    <strong>
                      {prap.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>302 đánh giá</span>
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
                <Link to={`/product/${prdp.id}`}>
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/146651/itel-it2123-d-300-300x300.jpg"
                    alt=""
                  />
                  <h3>{prdp.name}</h3>
                  <div className="price">
                    <strong>
                      {prdp.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>302 đánh giá</span>
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
        <Link to={`/product/${dl.id}`}>
          <img
            src="https://ava-grp-talk.zadn.vn/d/a/d/9/6/360/cf2dcf5dfc1a9ab9b653241d642a47bd.jpg"
            alt=""
          />
          <h3>{dl.name}</h3>
          <div className="price">
            <strong>
              {dl.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </strong>
          </div>
          <div className="ratingresult">
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <span>9999 đánh giá</span>
          </div>
          <label className="giamgia">
            <i className="fa fa-bolt" /> Giảm 1.000₫
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
        <Link to={`/product/${prn.id}`}>
          <img
            src="https://zpsocial-f56-org.zadn.vn/3c1ad68c5c9ebdc0e48f.jpg"
            alt=""
          />
          <h3>{prn.name}</h3>
          <div className="price">
            <strong>
              {prn.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </strong>
          </div>
          <div className="ratingresult">
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star-o" />
            <span>372 đánh giá</span>
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
        <Link to={`/product/${prc.id}`}>
          <img
            src="https://cdn.tgdd.vn/Products/Images/42/146651/itel-it2123-d-300-300x300.jpg"
            alt=""
          />
          <h3>{prc.name}</h3>
          <div className="price">
            <strong>
              {prc.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </strong>
          </div>
          <div className="ratingresult">
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <span>302 đánh giá</span>
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
  }

  return (
>>>>>>> main:font-end/src/components/Page_Comeponet/TrangChu.js
    <React.Fragment>
      <>
        <Header />
        <section>
          {/* Start Banner */}
          <div className="banner">
            <div className="owl-carousel owl-theme owl-loaded owl-drag">
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transition: "all 0.45s ease 0s",
                    width: 17400,
                    transform: "translate3d(-4132px, 0px, 0px)",
                  }}
                >
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner5.png">
                        <img src="img/banners/banner5.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner6.png">
                        <img src="img/banners/banner6.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner7.png">
                        <img src="img/banners/banner7.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner8.png">
                        <img src="img/banners/banner8.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner9.png">
                        <img src="img/banners/banner9.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item active center"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner0.gif">
                        <img src="img/banners/banner0.gif" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner1.png">
                        <img src="img/banners/banner1.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner2.png">
                        <img src="img/banners/banner2.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner3.png">
                        <img src="img/banners/banner3.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner4.png">
                        <img src="img/banners/banner4.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner5.png">
                        <img src="img/banners/banner5.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner6.png">
                        <img src="img/banners/banner6.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner7.png">
                        <img src="img/banners/banner7.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner8.png">
                        <img src="img/banners/banner8.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner9.png">
                        <img src="img/banners/banner9.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner0.gif">
                        <img src="img/banners/banner0.gif" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner1.png">
                        <img src="img/banners/banner1.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner2.png">
                        <img src="img/banners/banner2.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner3.png">
                        <img src="img/banners/banner3.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner4.png">
                        <img src="img/banners/banner4.png" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav disabled">
                <button type="button" role="presentation" className="owl-prev">
                  <span aria-label="Previous">‹</span>
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <span aria-label="Next">›</span>
                </button>
              </div>
              <div className="owl-dots">
                <button role="button" className="owl-dot active">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
              </div>
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
                type="text"
                // placeholder="Lọc trong trang theo tên..."
                placeholder="Lọc theo tên hoặc giá"
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
<<<<<<< HEAD:font-end/src/components/Page_Comeponet/page/TrangChu.js
            {/* End Khong co san pham */}
          </ul>
          {/* End products */}
          <div className="pagination" />
        </div>

        {/* Div hiển thị khung san pham hot, khuyến mãi, mới ra mắt ... */}
        <div className="contain-khungSanPham">
          <div className="khungSanPham" style={{ borderColor: "#ff9c00" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ff9c00 0%, #ec1f1f 50%, #ff9c00 100%)"
              }}
            >
              * NỔI BẬT NHẤT *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <li className="sanPham">
                <a href="/singleProduct">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/22701/dien-thoai-di-dong-Nokia-1280-dienmay.com-l.jpg"
                    alt=""
                  />
                  <h3>Nokia black future</h3>
                  <div className="price">
                    <strong>999.999.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>9999 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 1.000₫
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
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Huawei-Nova-2i">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/157031/samsung-galaxy-a6-2018-2-600x600.jpg"
                    alt=""
                  />
                  <h3>Huawei Nova 2i</h3>
                  <div className="price">
                    <strong>3.990.000₫</strong>
                    <span>4.490.000₫</span>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>804 đánh giá</span>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Hua3', 'Huawei Nova 2i'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Xiaomi-Redmi-Note-5">
                  <img src="img/products/xiaomi-redmi-note-5-pro-600x600.jpg" alt="" />
                  <h3>Xiaomi Redmi Note 5</h3>
                  <div className="price">
                    <strong>5.690.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>372 đánh giá</span>
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
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Xiaomi-Redmi-5-Plus-4GB">
                  <img src="img/products/xiaomi-redmi-5-plus-600x600.jpg" alt="" />
                  <h3>Xiaomi Redmi 5 Plus 4GB</h3>
                  <div className="price">
                    <strong>4.790.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>347 đánh giá</span>
                  </div>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Xia3', 'Xiaomi Redmi 5 Plus 4GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Itel-it2123">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/146651/itel-it2123-d-300-300x300.jpg"
                    alt=""
                  />
                  <h3>Itel it2123</h3>
                  <div className="price">
                    <strong>160.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>302 đánh giá</span>
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
                </a>
              </li>{" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?star=3&sort=rateCount-decrease"
              style={{
                borderLeft: "2px solid #ff9c00",
                borderRight: "2px solid #ff9c00"
              }}
            >
              Xem tất cả 39 sản phẩm
            </a>
          </div>{" "}
          <hr />
          <NewProduct format={VND}></NewProduct>
          {" "}
          <hr />
          <div className="khungSanPham" style={{ borderColor: "#ff9c00" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ff9c00 0%, #ec1f1f 50%, #ff9c00 100%)"
              }}
            >
              * TRẢ GÓP 0% *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-8-Plus-64GB">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/114110/iphone-8-plus-hh-600x600.jpg"
                    alt=""
                  />
                  <h3>iPhone 8 Plus 64GB</h3>
                  <div className="price">
                    <strong>20.990.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>230 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App4', 'iPhone 8 Plus 64GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Vivo-Y71">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/158585/vivo-y71-docquyen-600x600.jpg"
                    alt=""
                  />
                  <h3>Vivo Y71</h3>
                  <div className="price">
                    <strong>3.290.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>60 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Viv3', 'Vivo Y71'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?SamSung-Galaxy-J4+">
                  <img
                    src="img/products/samsung-galaxy-j4-plus-pink-400x400.jpg"
                    alt=""
                  />
                  <h3>SamSung Galaxy J4+</h3>
                  <div className="price">
                    <strong>3.490.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <span>26 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Sam0', 'SamSung Galaxy J4+'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Samsung-Galaxy-A7-(2018)">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/194327/samsung-galaxy-a7-2018-128gb-black-400x400.jpg"
                    alt=""
                  />
                  <h3>Samsung Galaxy A7 (2018)</h3>
                  <div className="price">
                    <strong>8.990.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>22 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Sam3', 'Samsung Galaxy A7 (2018)'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Huawei-Nova-3">
                  <img src="img/products/huawei-nova-3-2-600x600.jpg" alt="" />
                  <h3>Huawei Nova 3</h3>
                  <div className="price">
                    <strong>9.990.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>22 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Hua1', 'Huawei Nova 3'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>{" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?promo=tragop&sort=rateCount-decrease"
              style={{
                borderLeft: "2px solid #ff9c00",
                borderRight: "2px solid #ff9c00"
              }}
            >
              Xem tất cả 11 sản phẩm
            </a>
          </div>{" "}
          <hr />
          <div className="khungSanPham" style={{ borderColor: "#5de272" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #5de272 0%, #007012 50%, #5de272 100%)"
              }}
            >
              * GIÁ SỐC ONLINE *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <li className="sanPham">
                <a href="chitietsanpham.html?Huawei-Nova-2i">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/157031/samsung-galaxy-a6-2018-2-600x600.jpg"
                    alt=""
                  />
                  <h3>Huawei Nova 2i</h3>
                  <div className="price">
                    <strong>3.990.000₫</strong>
                    <span>4.490.000₫</span>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>804 đánh giá</span>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Hua3', 'Huawei Nova 2i'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-X-256GB-Silver">
                  <img src="img/products/iphone-x-256gb-silver-400x400.jpg" alt="" />
                  <h3>iPhone X 256GB Silver</h3>
                  <div className="price">
                    <strong>27.990.000₫</strong>
                    <span>31.990.000₫</span>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>10 đánh giá</span>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App0', 'iPhone X 256GB Silver'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-Xr-64GB">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/190325/iphone-xr-black-400x460.png"
                    alt=""
                  />
                  <h3>iPhone Xr 64GB</h3>
                  <div className="price">
                    <strong>19.990.000₫</strong>
                    <span>22.990.000₫</span>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>5 đánh giá</span>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App6', 'iPhone Xr 64GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-Xr-128GB">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-red-600x600.jpg"
                    alt=""
                  />
                  <h3>iPhone Xr 128GB</h3>
                  <div className="price">
                    <strong>22.990.000₫</strong>
                    <span>24.990.000₫</span>
                  </div>
                  <div className="ratingresult"></div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App3', 'iPhone Xr 128GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-7-Plus-32GB">
                  <img src="img/products/iphone-7-plus-32gb-hh-600x600.jpg" alt="" />
                  <h3>iPhone 7 Plus 32GB</h3>
                  <div className="price">
                    <strong>16.990.000₫</strong>
                    <span>17.000.000₫</span>
                  </div>
                  <div className="ratingresult"></div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App2', 'iPhone 7 Plus 32GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>{" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?promo=giareonline&sort=rateCount-decrease"
              style={{
                borderLeft: "2px solid #5de272",
                borderRight: "2px solid #5de272"
              }}
            >
              Xem tất cả 5 sản phẩm
            </a>
          </div>{" "}
          <hr />
          <div className="khungSanPham" style={{ borderColor: "#ff9c00" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ff9c00 0%, #ec1f1f 50%, #ff9c00 100%)"
              }}
            >
              * GIẢM GIÁ LỚN *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <li className="sanPham">
                <a href="chitietsanpham.html?Oppo-F9">
                  <img src="img/products/oppo-f9-red-600x600.jpg" alt="" />
                  <h3>Oppo F9</h3>
                  <div className="price">
                    <strong>7.690.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>188 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 500.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Opp0', 'Oppo F9'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Nokia-5.1-Plus">
                  <img
                    src="img/products/nokia-51-plus-black-18thangbh-400x400.jpg"
                    alt=""
                  />
                  <h3>Nokia 5.1 Plus</h3>
                  <div className="price">
                    <strong>4.790.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>7 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 250.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Nok0', 'Nokia 5.1 Plus'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Samsung-Galaxy-A8+-(2018)">
                  <img
                    src="img/products/samsung-galaxy-a8-plus-2018-gold-600x600.jpg"
                    alt=""
                  />
                  <h3>Samsung Galaxy A8+ (2018)</h3>
                  <div className="price">
                    <strong>11.990.000₫</strong>
                  </div>
                  <div className="ratingresult"></div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 1.500.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Sam1', 'Samsung Galaxy A8+ (2018)'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Samsung-Galaxy-J8">
                  <img
                    src="img/products/samsung-galaxy-j8-600x600-600x600.jpg"
                    alt=""
                  />
                  <h3>Samsung Galaxy J8</h3>
                  <div className="price">
                    <strong>6.290.000₫</strong>
                  </div>
                  <div className="ratingresult"></div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 500.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Sam2', 'Samsung Galaxy J8'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Nokia-black-future">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/22701/dien-thoai-di-dong-Nokia-1280-dienmay.com-l.jpg"
                    alt=""
                  />
                  <h3>Nokia black future</h3>
                  <div className="price">
                    <strong>999.999.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>9999 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 1.000₫
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
                </a>
              </li>{" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?promo=giamgia"
              style={{
                borderLeft: "2px solid #ff9c00",
                borderRight: "2px solid #ff9c00"
              }}
            >
              Xem tất cả 8 sản phẩm
            </a>
          </div>{" "}
          <hr />
          <div className="khungSanPham" style={{ borderColor: "#5de272" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #5de272 0%, #007012 50%, #5de272 100%)"
              }}
            >
              * GIÁ RẺ CHO MỌI NHÀ *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <ChipProduct format={VND}></ChipProduct>
              {" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?price=0-3000000&sort=price"
              style={{
                borderLeft: "2px solid #5de272",
                borderRight: "2px solid #5de272"
              }}
            >
              Xem tất cả 19 sản phẩm
            </a>
          </div>{" "}
          <hr />
        </div>

      </section>{" "}

      <i className="fa fa-arrow-up" id="goto-top-page" onclick="gotoTop()" />

      <Footer/>

    </>
=======
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
>>>>>>> main:font-end/src/components/Page_Comeponet/TrangChu.js
    </React.Fragment>
  );
}
