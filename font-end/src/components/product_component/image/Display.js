import React, { useEffect, useState } from "react";
import { deleteImage, readAll } from "../../../service/image.service";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import queryString from "query-string";
import Pagination from "./Paging";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { notification } from "antd";

const Display = () => {
  const [images, setImages] = useState([]);

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

          setImages(response.data.content);
          setPagination(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }, [filters]);

  async function handleDelete(id) {
    deleteImage(id).then(() => {
      let newArr = [...images].filter((s) => s.id !== id);
      setImages(newArr);
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
              <h2 class="heading-section">Images</h2>
            </div>
          </div>
          <div class="row">
            <div class="row"></div>
            <div class="col-md-12">
              <form class="d-flex" role="search">
                <Link to="/image/displayDelete">
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
                <Link to="/image/new">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                  >
                    <FaPlus className="add-icon" />
                  </button>
                </Link>
              </form>
              <br />

              <div class="table-wrap">
                <table class="table">
                  <thead class="thead-primary">
                    <tr>
                      <th>ID</th>
                      <th>CODE</th>
                      <th>IMAGE</th>
                      <th>NAME</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((image) => (
                      <tr class="alert" role="alert" key={image.id}>
                        <td>{image.id}</td>
                        <td>{image.code}</td>
                        <td>
                          <img
                            src={`/imageUpload/` + image.name}
                            width="100px"
                            height="100px"
                            alt={image.name}
                          />
                        </td>
                        <td>{image.name}</td>
                        <td>
                          {image.status === 0 ? "Hoạt động" : "Không hoạt động"}
                        </td>
                        <td>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={() => handleDelete(image.id)}
                          >
                            <span aria-hidden="true">
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </button>

                          <Link to={"/image/" + image.id}>
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
      <img src="" alt="" />
    </div>
  );
};

export default Display;
