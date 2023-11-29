import React, { useEffect, useState } from "react";
import {
  readAll,
  deleteManufacture,
} from "../../../service/manufacture.service";
import { Link } from "react-router-dom";
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import queryString from "query-string";
import Pagination from "../Manufacture/PageNext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { notification } from "antd";

const DisplayManufacture = () => {
  const [manufacture, setManufacture] = useState([]);

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    totalRows: 1,
  });
  const [filters, setFilters] = useState({
    page: 0,
  });

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
      readAll(paramsString)
        .then((response) => {
          console.log(response.data);

          setManufacture(response.data.content);
          setPagination(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }, [filters]);

  async function handleDelete(id) {
    deleteManufacture(id).then(() => {
      let newArr = [...manufacture].filter((s) => s.id !== id);
      setManufacture(newArr);
    });
  }

  //import
  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      page: newPage,
    });
  }

  return (
    <div className="bodyform">
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-3 text-center mb-3">
              <h2 class="heading-section">Manufacture</h2>
            </div>
          </div>
          <div class="row">
            <div class="row"></div>
            <div class="col-md-12">
              <form class="d-flex" role="search">
                <Link to="/manufacture/displayDelete">
                  <button
                    class="btn btn-outline-success"
                    type="submit"
                    style={{ marginRight: "15px" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </Link>

                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  class="btn btn-outline-success"
                  type="submit"
                  style={{ marginLeft: "15px" }}
                >
                  <FaSearch className="search-icon" />
                </button>
                <Link to="/manufacture/new">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                  >
                    <FaPlus className="add-icon" />
                  </button>
                </Link>

                <Link to="/manufacture/im">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    style={{ marginRight: "15px" }}
                  >
                    <FaFileExcel className="excel-icon" />
                  </button>
                </Link>

                <button type="button" class="btn btn-outline-success">
                  <IoMdDownload className="download-icon" />
                </button>
              </form>
              <br />

              <div class="table-wrap">
                <table class="table">
                  <thead class="thead-primary">
                    <tr>
                      <th>ID</th>
                      <th>CODE</th>
                      <th>NAME</th>
                      <th>DATE-CREATE</th>
                      <th>DATE-UPDATE</th>
                      <th>PERSON-CREATE</th>
                      <th>PERSON-UPDATE</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manufacture.map((manu) => (
                      <tr class="alert" role="alert" key={manu.id}>
                        <td>{manu.id}</td>
                        <td>{manu.code}</td>
                        <td>{manu.name}</td>
                        <td>{manu.dateCreate}</td>
                        <td>{manu.dateUpdate}</td>
                        <td>{manu.personCreate}</td>
                        <td>{manu.personUpdate}</td>
                        <td>
                          {manu.status === 0 ? "Hoạt động" : "Không hoạt động"}
                        </td>
                        <td>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            NP={() => handleDelete(manu.id)}
                          >
                            <span aria-hidden="true">
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </button>

                          <Link to={"/manufacture/" + manu.id}>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">
                                <FontAwesomeIcon
                                  icon={faPencilAlt}
                                  style={{ marginRight: "15px" }}
                                />
                              </span>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
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
export default DisplayManufacture;
