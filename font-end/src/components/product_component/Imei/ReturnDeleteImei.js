import { useEffect, useState } from "react";
import { returnDeleteAll, returnImei } from "../../../service/imei.service";
import { Link } from "react-router-dom";
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import Pagination from "../Imei/Paging.js";
import queryString from "query-string";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import { notification } from "antd";

const ReturnDeleteImei = () => {
  const [imei, setImei] = useState([]);

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    totalRows: 1,
  });

  const [filters, setFilters] = useState({
    page: 0,
    key: "",
  });

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const history = useHistory();
  //hien thi danh sach
  useEffect(() => {
    if (storedUser?.roles === "CUSTOMER" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      const paramsString = queryString.stringify(filters);
      returnDeleteAll(paramsString)
        .then((response) => {
          console.log(response.data);

          setImei(response.data.content);
          setPagination(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }, [filters]);

  //xoa
  async function handleDelete(id) {
    returnImei(id).then(() => {
      let newArr = [...imei].filter((s) => s.id !== id);
      setImei(newArr);
    });
  }

  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }

  function handleDownload(csvData, fileName) {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { page: 0, key: "" };
    item[name] = value;
    setFilters(item);
  }

  return (
    <div className="bodyform">
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-4">
              <h2 class="heading-section">IMEI DELETE</h2>
            </div>
          </div>
          <div class="row">
            <div class="row"></div>
            <div class="col-md-12">
              <form class="d-flex" role="search">
                <Link to="/imei/getAll">
                  <button
                    class="btn btn-outline-success"
                    type="submit"
                    style={{ marginRight: "15px" }}
                  >
                    <FontAwesomeIcon icon={faBackward} />
                  </button>
                </Link>

                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="key"
                  onChange={handleChange}
                />
                {/* <button
                  class="btn btn-outline-success"
                  type="submit"
                  style={{ marginLeft: "15px" }}
                >
                  <FaSearch className="search-icon" />
                </button>

                <Link to="/iemi/new">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                  >
                    <FaPlus className="add-icon" />
                  </button>
                </Link> */}

                <button
                  type="button"
                  class="btn btn-outline-success"
                  style={{ marginRight: "15px" }}
                >
                  <FaFileExcel className="excel-icon" />
                </button>

                <button
                  type="button"
                  class="btn btn-outline-success"
                  onClick={() => handleDownload(imei, "imei")}
                >
                  <IoMdDownload className="download-icon" />
                </button>
              </form>
              <br />

              <div class="table-wrap">
                <table class="table">
                  <thead class="thead-primary">
                    <tr>
                      <th>Code</th>
                      <th>Name Product</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {imei.map((s) => {
                      //   const dateCreate = new Date(s.dateCreate);
                      //   const dateUpdate = new Date(s.dateUpdate);
                      //   const dateCreateText = dateCreate.toLocaleDateString();
                      //   const dateUpdateText = dateUpdate.toLocaleDateString();
                      return (
                        <tr class="alert" role="alert" key={s.id}>
                          <td>{s.codeImei}</td>
                          <td>{s.idProduct.name}</td>
                          <td>
                            {s.status === 0 ? "Hoạt động" : "Không hoạt động"}
                          </td>
                          <td>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="alert"
                              aria-label="Close"
                              onClick={() => handleDelete(s.id)}
                            >
                              <span aria-hidden="true">
                                <FontAwesomeIcon icon={faUndo} />
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      </section>
    </div>
  );
};
export default ReturnDeleteImei;
