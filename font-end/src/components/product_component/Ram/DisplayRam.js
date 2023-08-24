import { useEffect, useState } from "react";
import { readAll, deleteRam } from "../../../service/ram.service";
import { Link } from 'react-router-dom';
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import Pagination from "../Ram/PageNext";
import queryString from "query-string";

const DisplayRam = () => {
  const [ram, setRam] = useState([]);

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
        
        setRam(response.data.content);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters]);

  //xoa 
  async function handleDelete(id) {
    deleteRam(id).then(() => {
      let newArr = [...ram].filter((s) => s.id !== id);
      setRam(newArr);
    });
  }


  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      page: newPage,
    });
  }
 

  return (
    <section style={{marginLeft: '50px'}}>  
        <div class="row justify-content-center">
          <div class="col-md-3 text-center mb-3">
            <h2 class="heading-section">RAM</h2>
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
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit" style={{ marginLeft: '15px'}}>
                <FaSearch className="search-icon" />
              </button>

            <Link to="/ram/new">
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
                  {ram.map((ramD) => (
                    <tr class="alert" role="alert" key={ramD.id}>
                      <td>{ramD.id}</td>
                      <td>{ramD.code}</td>
                      <td>{ramD.name}</td>
                      <td>{ramD.dateCreate}</td>
                      <td>{ramD.dateUpdate}</td>
                      <td>{ramD.personCreate}</td>
                      <td>{ramD.personUpdate}</td>
                      <td>{ramD.status === 0 ? "Hoạt động" : "Không hoạt động"}</td>
                      <td>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-label="Close"
                          onClick={() => handleDelete(ramD.id)}
                        >
                          <span aria-hidden="true">
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </button>

                        <Link to={"/screen/" + ramD.id}>
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
        </div>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
     
    </section>
  );
};
export default DisplayRam;
