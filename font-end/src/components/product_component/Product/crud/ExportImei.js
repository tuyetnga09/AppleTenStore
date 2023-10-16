import React, { useEffect, useState } from "react";
import {
  readImportImei,
  ImportImeiExcel,
} from "../../../../service/imei.service";
import { Link } from "react-router-dom";
// import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getListSkuProduct } from "../../../../service/sku.service";

import {
  faDownload,
  faEdit,
  faFileExcel,
  faPlus,
  faQrcode,
  faTrash,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
// import Pagination from "../Imei/Paging.js";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
// import ImportImei from "../Imei/ImportImei";
import { notification, Modal, ModalProps, Input } from "antd";

// import XLSX from "xlsx";

const Display = ({ productDetail }) => {
  //IPMORT IMEI
  const [displayfile, setFile] = useState(null);

  //set id SKU
  const [displayIdSku, setIdSku] = useState(null); // Khởi tạo là null
  // Khởi tạo check imei là null
  const [isCheckImei, setCheckImei] = useState([]);

  //khởi tạo đối tượng sku (list)
  const [displaySku, setDisplaySku] = useState([]);

  // Khởi tạo file excel imei
  const [excelData, setExcelData] = useState(null); // Khởi tạo là null

  useEffect(() => {
    getListSkuProduct(productDetail.id)
      .then((response) => {
        setDisplaySku(response.data);
        //   console.log(productData);
        console.log(response.data);
        console.log("hihihi" + productDetail.id + " hôhhohoho");
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [productDetail.id]);

  // Hàm khởi tạo để hiển thị Modal detal product để import excel imei  -- 11
  const [
    isModalVisibleDetailProductImportImei,
    setIsModalVisibleDetailProductImportImei,
  ] = useState(false); // Trạng thái hiển thị Modal

  // lưu trữ thông tin product detail
  const [detailedProduct, setDetailedProduct] = useState([]);
  // Hàm để hiển thị Modal detal product để import excel imei  -- laays ra lisst sku
  const openDetailModalDetailProductImportImei = (product) => {
    setDetailedProduct(product);
    setIsModalVisibleDetailProductImportImei(true);
  };

  // Hàm để ẩn Modal detal product để import excel imei
  const handleCancelDetailProductImportImei = () => {
    setIsModalVisibleDetailProductImportImei(false);
  };

  // Hàm khởi tạo để hiển thị Modal detal product để import excel imei  -- laays ra file excel import
  const [isModalVisibleImportImei, setIsModalVisibleImportImei] =
    useState(false); // Trạng thái hiển thị Modal
  // Hàm để hiển thị Modal detal product để import excel imei
  async function openDetailModalImportImei(sku) {
    await setIdSku(sku.id);
    await setExcelData([]);
    await setCheckImei([]);
    await setFile([]);
    setIsModalVisibleImportImei(true);
  }

  // Hàm để ẩn Modal detal product để import excel imei
  async function handleCancelImportImei() {
    await setExcelData([]);
    await setIdSku([]);
    await setCheckImei([]);
    await setFile([]);
    setIsModalVisibleImportImei(false);
  }

  // //đọc file excel lên table (FE đọc luôn - Thue viện FE)
  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(event.target.files[0]);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData); // Cập nhật dữ liệu khi tệp đã được chọn
      };
      reader.readAsBinaryString(file);
    }
  };

  //import imei
  const handleImportImei = async (event) => {
    event.preventDefault();
    if (!displayfile || displayfile == null || displayfile.length == 0) {
      notification.error({
        message: "Vui lòng chọn một file trước khi import.",
      });
      return;
    } else {
      console.log(displayfile);
      console.log(displayIdSku);
      const formData = new FormData();
      formData.append("file", displayfile);

      try {
        const response = await ImportImeiExcel(formData, displayIdSku);
        await setCheckImei(response.data);
        if (response.data.length === 0) {
          // Load lại bảng SKU
          const responseListSku = await getListSkuProduct(productDetail.id);
          setDisplaySku(responseListSku.data);
          setIsModalVisibleImportImei(false);
          notification.success({
            message: "Add Imei successfully",
            // description: "Add product successfully",
          });
        } else {
          notification.error({
            message: "Add Imei failed",
            // description: "Add product successfully",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <section>
        {/* Đọc danh sách SKU của 1 đối tượng detail cảu product */}
        {/* <h3>Danh Sách {displaySku.product.name}</h3> */}
        <h3>Danh Sách Product SKU</h3>

        <hr />
        <div className="table-wrap">
          <table class="table">
            <thead class="table-dark">
              <th>STT</th>
              <th>COLOR</th>
              <th>CAPACITY</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>IMPORT IMEI</th>
            </thead>
            <tbody>
              {displaySku.map((s, index) => {
                return (
                  <tr className="alert" role="alert" key={s.id}>
                    <td>{index + 1}</td>
                    <td>{s.color}</td>
                    <td>{s.capacity}</td>
                    <td>{s.quantity}</td>
                    <td>{s.price}</td>
                    <td>
                      <button
                        type="button"
                        className="imports"
                        data-dismiss="alert"
                        aria-label="Import"
                        onClick={() => openDetailModalImportImei(s)}
                      >
                        <span aria-hidden="true">
                          <FontAwesomeIcon icon={faFileExcel} />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        {/* modal import imei ở trang product dislay */}
        <Modal
          // {...modalProps}
          visible={isModalVisibleImportImei}
          onCancel={handleCancelImportImei}
          width={1000}
          footer={null}
          bodyStyle={{ minHeight: "650px" }}
        >
          {/* <ExportImei ImportImeiExcel={excelData} /> */}
          <div>
            <form onSubmit={handleImportImei} enctype="multipart/form-data">
              <div className="form-row">
                <div className="input-data">
                  <Input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              <br></br>

              <div className="form-row">
                <div className="input-data textarea">
                  <div className="form-row submit-btn">
                    <button type="submit" class="btn btn-outline-secondary">
                      Save Import Imei
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {isCheckImei != null && isCheckImei.length > 0 ? (
              <div className="table-wrap">
                <h2>Imei Trung Lap</h2>
                <table class="table">
                  <thead class="table-dark">
                    <th>STT</th>
                    <th>PRODUCT</th>
                    <th>COLOR</th>
                    <th>CAPACITY</th>
                    <th>IMEI</th>
                    <th>PRICE</th>
                  </thead>
                  <tbody>
                    {isCheckImei.map((s, index) => {
                      return (
                        <tr className="alert" role="alert" key={s.id}>
                          <td>{index + 1}</td>
                          <td>{s.nameProduct}</td>
                          <td>{s.color}</td>
                          <td>{s.capacity}</td>
                          <td>{s.codeImei}</td>
                          <td>{s.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p></p>
            )}

            {excelData != null && excelData.length > 0 ? (
              <div className="table-wrap">
                <h2>Imei Doc Tu File Excel Vui Long Check Lai Truoc Khi Luu</h2>
                <table class="table">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Chọn tệp Excel để hiển thị dữ liệu.</p>
            )}
          </div>
        </Modal>
        {/* <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
      </section>
    </div>
  );
};
export default Display;
