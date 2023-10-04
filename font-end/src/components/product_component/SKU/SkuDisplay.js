import { useEffect, useState } from "react";
import { readAll} from "../../../service/sku.service";
import { Link } from 'react-router-dom';
// import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel, FaQrcode  } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import Pagination from "../SKU/PageNext";
import queryString from "query-string";

const SkuDisplay = () => {
  const [sku, setSKu] = useState([]);

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
    readAll(paramsString)
      .then((response) => {
        console.log(response.data);

        setSKu(response.data.content);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters]);

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { page: 0, key: "" };
        item[name] = value;
        setFilters(item);
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
                    <h2 class="heading-section">SKU</h2>
                  </div>
                </div>
                <div class="row">
                  <div class="row">

                  </div>
                  <div class="col-md-12">

                    <form class="d-flex" role="search">

                    <Link to="/ram/displayDelete">
                    <button class="btn btn-outline-success" type="submit" style={{ marginRight: '15px'}}>
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

                    <Link to="/ram/scan">
                          <button class="btn btn-outline-success"  style={{ marginLeft: '15px'}}>
                        <FaQrcode  className="qr-icon" />
                        </button>
                    </Link>

                    <Link to="/ram/new">
                        <button type="button" class="btn btn-outline-success" style={{ marginRight: '15px',  marginLeft: '15px'}}>
                        <FaPlus className="add-icon" />
                      </button>
                    </Link>

                    <Link to="/ram/im">
                    <button type="button" class="btn btn-outline-success" style={{ marginRight: '15px'}}>
                      <FaFileExcel className="excel-icon" />
                    </button>
                    </Link>

                    <button type="button" class="btn btn-outline-success">
                      <IoMdDownload className="download-icon" />
                    </button>

                    </form>
                    <br />
                      <table class="table">
                        <thead class="thead-dark">
                          <tr>
                            <th>ID</th>
                              <th>NAME</th>
                            <th>CAPACITY</th>
                            <th>COLOR</th>
                            <th>QUANTITY</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sku.map((skuD) => (
                            <tr class="alert" role="alert" key={skuD.id}>
                                <td>{skuD.id}</td>
                                <td>{skuD.product.name}</td>
                              <td>{skuD.capacity}</td>
                              <td>{skuD.color}</td>
                              <td>{skuD.quantity}</td>
                              <td>{skuD.price}</td>
                              <td>
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="alert"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">
                                    <FontAwesomeIcon icon={faTimes} />
                                  </span>
                                </button>

                                <Link >
                                  <button
                                  type="button"
                                  class="close"
                                  data-dismiss="alert"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">
                                    <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '15px' }}/>
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
                <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>


    </section>
    </div>

  );
};
export default SkuDisplay;
