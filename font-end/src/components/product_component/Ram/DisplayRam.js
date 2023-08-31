import { useEffect, useState } from "react";
import { readAll, deleteRam, importRam, search ,createRam } from "../../../service/ram.service";
import { Link } from 'react-router-dom';
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel , FaQrcode } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import Pagination from "../Ram/PageNext";
import queryString from "query-string";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";


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

  const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const [searchTerm, setSearchTerm] = useState("");


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

  //phantrang
  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      page: newPage,
    });
  }

  //dowload
  function handleDownload(csvData, fileName) {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

//timkiem
const handleSearch = (searchTerm) => {
  const params = new URLSearchParams();
  params.append("page", pagination.page);
  params.append("search", searchTerm);

  search(params.toString())
    .then((response) => {
      console.log(response.data);
      setRam(response.data.content);
      setPagination(response.data);
    })
    .catch((error) => {
      console.log(`${error}`);
    });
};

 
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
            <button class="btn btn-outline-success"  style={{ marginRight: '15px'}}>
                    <FontAwesomeIcon icon={faTrash} />
              </button>
            </Link>
            
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
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

            <button type="button" class="btn btn-outline-success" onClick={() => handleDownload(ram, "RamFile")}>
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

                        <Link to={"/ram/" + ramD.id}>
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
