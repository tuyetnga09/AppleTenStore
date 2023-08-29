import { useEffect, useState } from "react";
import { readAll, deleteBattery } from "../../../service/battery.service";
import { Link } from "react-router-dom";
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faDownload,
  faEdit,
  faFileExcel,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import Pagination from "../Battery/Paging.js";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const Display = () => {
  const [display, setDisplay] = useState([]);

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

  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    readAll(paramsString)
      .then((response) => {
        console.log(response.data);
        setDisplay(response.data.content);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }

  async function remove(id) {
    deleteBattery(id).then(() => {
      let newArr = [...display].filter((s) => s.id !== id);
      setDisplay(newArr);
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
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section">Battery</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form className="d-flex" role="search">
              <Link to="/battery/displayDelete">
                <button
                  class="btn btn-outline-success"
                  type="submit"
                  style={{ marginRight: "15px" }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </Link>

              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="key"
                onChange={handleChange}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                style={{ marginLeft: "15px" }}
              >
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </button>
              <Link to="/battery/new">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{ marginRight: "15px", marginLeft: "15px" }}
                >
                  <FontAwesomeIcon icon={faPlus} className="add-icon" />
                </button>
              </Link>
              <Link to="/battery/im">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{ marginRight: "15px" }}
                >
                  <FontAwesomeIcon icon={faFileExcel} className="excel-icon" />
                </button>
              </Link>

              <button
                type="button"
                className="btn btn-outline-success"
                style={{ marginRight: "15px" }}
                onClick={() => handleDownload(display, "battery")}
              >
                <FontAwesomeIcon icon={faDownload} className="download-icon" />
              </button>
            </form>
            <br />
            <div className="table-wrap">
              <table className="table">
                <thead className="thead-primary">
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Date Create</th>
                    <th>Date Update</th>
                    <th>Person Create</th>
                    <th>Person Update</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {display.map((s) => {
                    const dateCreate = new Date(s.dateCreate);
                    const dateUpdate = new Date(s.dateUpdate);
                    const dateCreateText = dateCreate.toLocaleDateString();
                    const dateUpdateText = dateUpdate.toLocaleDateString();
                    return (
                      <tr className="alert" role="alert" key={s.id}>
                        <td>{s.code}</td>
                        <td>{s.name}</td>
                        <td>{dateCreateText}</td>
                        <td>{dateUpdateText}</td>
                        <td>{s.personCreate}</td>
                        <td>{s.personUpdate}</td>
                        <td>
                          {s.status === 0 ? "Hoạt động" : "Không hoạt động"}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Edit"
                          >
                            <Link to={"/battery/" + s.id}>
                              <span aria-hidden="true">
                                <FontAwesomeIcon icon={faEdit} />
                              </span>
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={() => remove(s.id)}
                          >
                            <span aria-hidden="true">
                              <FontAwesomeIcon icon={faClose} />
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
  );
};
export default Display;
