import { useEffect, useState } from "react";
import {
  returnDeleteAll,
  returnCategory,
} from "../../../service/category.service";
import { Link } from "react-router-dom";
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import queryString from "query-string";
import Pagination from "../Category/PageNext";

const CategoryDisplayReturn = () => {
  const [category, setCategory] = useState([]);

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

        setCategory(response.data.content);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters]);

  //xoa
  async function handleDelete(id) {
    returnCategory(id).then(() => {
      let newArr = [...category].filter((s) => s.id !== id);
      setCategory(newArr);
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
          <h2 class="heading-section">Category</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <form class="d-flex" role="search">
            <Link to="/category/display">
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

            <Link to="/category/new">
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
                {category.map((cat) => (
                  <tr class="alert" role="alert" key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.code}</td>
                    <td>{cat.name}</td>
                    <td>{cat.dateCreate}</td>
                    <td>{cat.dateUpdate}</td>
                    <td>{cat.personCreate}</td>
                    <td>{cat.personUpdate}</td>
                    <td>
                      {cat.status === 0 ? "Hoạt động" : "Không hoạt động"}
                    </td>
                    <td>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                        onClick={() => handleDelete(cat.id)}
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
export default CategoryDisplayReturn;
