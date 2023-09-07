import { useEffect, useState } from "react";
import { readAllDelete, returnScreen } from "../../../service/screen.service";
import { Link } from 'react-router-dom';
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward ,faUndo} from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import Pagination from "../Screen/PageNext";
import queryString from "query-string";

const DisplayScreen = () => {
  const [screen, setScreen] = useState([]);

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
    readAllDelete(paramsString)
      .then((response) => {
        console.log(response.data);
        
        setScreen(response.data.content);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters]);

  //xoa 
  async function handleDelete(id) {
    returnScreen(id).then(() => {
      let newArr = [...screen].filter((s) => s.id !== id);
      setScreen(newArr);
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
          <div class="col-md-6 text-center mb-4">
            <h2 class="heading-section">Screen</h2>
          </div>
        </div>
        <div class="row">
          <div class="row">
            
          </div>        
          <div class="col-md-12">
            <form class="d-flex" role="search">

            <Link to="/screen/display">
                <button class="btn btn-outline-success" type="submit" style={{ marginRight: '15px'}}>
                    <FontAwesomeIcon icon={faBackward} />
              </button>
            </Link>

              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit" style={{ marginLeft: '15px'}}>
                <FaSearch className="search-icon" />
              </button>

            <Link to="/screen/new">
                <button type="button" class="btn btn-outline-success" style={{ marginRight: '15px',  marginLeft: '15px'}}>
                <FaPlus className="add-icon" />
              </button>
            </Link>

            <button type="button" class="btn btn-outline-success" style={{ marginRight: '15px'}}>
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
                  {screen.map((screenD) => (
                    <tr class="alert" role="alert" key={screenD.id}>
                      <td>{screenD.id}</td>
                      <td>{screenD.code}</td>
                      <td>{screenD.name}</td>
                      <td>{screenD.dateCreate}</td>
                      <td>{screenD.dateUpdate}</td>
                      <td>{screenD.personCreate}</td>
                      <td>{screenD.personUpdate}</td>
                      <td>{screenD.status  === 0 ? "Hoạt động" : "Không hoạt động"}</td>
                      <td>
                        
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-label="Close"
                          onClick={() => handleDelete(screenD.id)}
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
export default DisplayScreen;
