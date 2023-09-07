import { useEffect, useState } from "react";
import {
  returnDeleteAll,
  returnManufacture,
} from "../../../service/manufacture.service";
import { Link } from "react-router-dom";
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import queryString from "query-string";
import Pagination from "../Manufacture/PageNext";

const ReturnManufacture = () => {
  const [manufacture, setManufacture] = useState([]);

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    totalRows: 1,
  });

  const [filters, setFilters] = useState({
    page: 0,
  });

  //hien thi danh sach
  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    returnDeleteAll(paramsString)
      .then((response) => {
        console.log(response.data);

        setManufacture(response.data.content);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters]);

  //xoa
  async function handleDelete(id) {
    returnManufacture(id).then(() => {
      let newArr = [...manufacture].filter((s) => s.id !== id);
      setManufacture(newArr);
    });
  }
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
          <h2 class="heading-section">Manufacture Delete</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <form class="d-flex" role="search">
            <Link to="/manufacture/display">
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
            <button
              type="button"
              class="btn btn-outline-success"
              style={{ marginRight: "15px" }}
            >
              <FaFileExcel className="excel-icon" />
            </button>

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
                        onClick={() => handleDelete(manu.id)}
                      >
                        <span aria-hidden="true">
                          <FontAwesomeIcon icon={faUndo} />
                        </span>
                      </button>
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
export default ReturnManufacture;
