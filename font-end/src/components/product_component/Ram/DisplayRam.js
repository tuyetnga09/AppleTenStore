import { useEffect, useState } from "react";
import { readAll, deleteRam } from "../../../service/ram.service";
import { Link } from 'react-router-dom';
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';


const DisplayRam = () => {
  const [ram, setRam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Số mục hiển thị trên mỗi trang

  //hien thi danh sach
  useEffect(() => {
    readAll()
      .then((response) => {
        console.log(`${response.data}`);
        setRam(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });


  }, []);
  //xoa 
  const handleDelete = (id) => {
    deleteRam(id)
      .then((response) => {
        setRam(ram.filter((ramD) => ramD.id !== id));
      })
      .catch((error) => {
        console.log(`Error deleting: ${error}`);
      });
  };

  //Phân trang
  const lastPage = Math.ceil(ram.length / itemsPerPage);
  const nextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Tính toán index của mục đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ram.slice(indexOfFirstItem, indexOfLastItem);
  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-4">
            <h2 class="heading-section">RAM</h2>
          </div>
        </div>
        <div class="row">
          <div class="row">
            
          </div>        
          <div class="col-md-12">

            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit" style={{ marginLeft: '15px'}}>
                <FaSearch className="search-icon" />
              </button>

              <button type="button" class="btn btn-outline-success" style={{ marginRight: '15px',  marginLeft: '15px'}}>
              <FaPlus className="add-icon" />
            </button>

            <button type="button" class="btn btn-outline-success" style={{ marginRight: '15px'}}>
              <FaFileExcel className="excel-icon" />
            </button>

            <button type="button" class="btn btn-outline-success" style={{ marginRight: '15px'}}>
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
                      <td>{ramD.status}</td>
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

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br/>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={prevPage}>
              Previous
            </a>
          </li>
          {Array.from({ length: lastPage }).map((item, index) => (
            <li className="page-item" key={index}>
              <a
                className={`page-link ${index + 1 === currentPage ? "active" : ""}`}
                href="#"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};
export default DisplayRam;
