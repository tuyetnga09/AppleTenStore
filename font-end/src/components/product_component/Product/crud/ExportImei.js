// import { useEffect, useState } from "react";
import { readImportImei } from "../../../../service/imei.service";
import { Link } from "react-router-dom";
// import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  faDownload,
  faEdit,
  faFileExcel,
  faPlus,
  faQrcode,
  faTrash,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
// import Pagination from "../Imei/Paging.js";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
// import ImportImei from "../Imei/ImportImei";
import { notification } from "antd";

import React, { useEffect, useState } from "react";
// import XLSX from "xlsx";

const Display = (ImportImeiExcel) => {
  //   const [display, setDisplay] = useState([]);

  //   const [pagination, setPagination] = useState({
  //     page: 0,
  //     limit: 5,
  //     totalRows: 1,
  //   });

  //   const [filters, setFilters] = useState({
  //     page: 0,
  //     key: "",
  //   });

  //   const fileType =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //   const fileExtension = ".xlsx";
  //   const [file, setFile] = useState(null);

  //   const handleFileChange = (event) => {
  //     setFile(event.target.files[0]);
  //   };

  //   const history = useHistory();

  //   const handleUpload = () => {
  //     const formData = new FormData();
  //     // formData.append("file", file);
  //     readImportImei(formData)
  //       .then((response) => {
  //         setDisplay(response.data);
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //     // history.push("/imei/getAll");
  //     // history.push("/product/display", file);
  //   };

  //   useEffect(() => {
  //     const paramsString = queryString.stringify(filters);
  //     // readAll(paramsString)
  //     //   .then((response) => {
  //     //     console.log(response.data);
  //     //     setDisplay(response.data.content);
  //     //     setPagination(response.data);
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log(`${error}`);
  //     //   });
  //   }, [filters]);

  //   //   function handlePageChange(newPage) {
  //   //     console.log("New Page: " + newPage);
  //   //     setFilters({
  //   //       ...filters,
  //   //       page: newPage,
  //   //     });
  //   //   }

  //   function handleChange(event) {
  //     const target = event.target;
  //     const value = target.value;
  //     const name = target.name;
  //     let item = { page: 0, key: "" };
  //     item[name] = value;
  //     setFilters(item);
  //   }

  //   return (
  //     <div>
  //       <section class="ftco-section">
  //         <div class="container">
  //           {/* <ImportImei /> */}
  //           <div className="row justify-content-center">
  //             <div className="col-md-6 text-center mb-4">
  //               <h2 className="heading-section">Import Imei</h2>
  //             </div>
  //             <p>SP: 123445</p>
  //           </div>
  //           <div className="row">
  //             <div className="col-md-12">
  //               <form onSubmit={handleUpload} enctype="multipart/form-data">
  //                 <div className="form-row">
  //                   <div className="input-data">
  //                     <input
  //                       type="file"
  //                       class="form-control"
  //                       name="file"
  //                       accept=".xlsx, .xls"
  //                       //   onChange={handleFileChange}
  //                     />
  //                   </div>
  //                 </div>
  //                 <br></br>
  //                 <div className="form-row">
  //                   <div className="input-data textarea">
  //                     <div className="form-row submit-btn">
  //                       <button type="submit" class="btn btn-outline-secondary">
  //                         Upload
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </form>
  //               <br />
  //               <div className="table-wrap">
  //                 <table class="table">
  //                   <thead class="table-dark">
  //                     <th>STT</th>
  //                     <th>COLOR</th>
  //                     <th>CAPACITY</th>
  //                     <th>PRICE</th>
  //                     <th>IMEI</th>
  //                   </thead>
  //                   <tbody>
  //                     {display.map((s, index) => {
  //                       return (
  //                         <tr className="alert" role="alert" key={s.id}>
  //                           <td>{index + 1}</td>
  //                           <td>{s.color}</td>
  //                           <td>{s.capacity}</td>
  //                           <td>{s.quantity}</td>
  //                           <td>{s.price}</td>
  //                           <td>
  //                             <button
  //                               type="button"
  //                               className="imports"
  //                               data-dismiss="alert"
  //                               aria-label="Import"
  //                             >
  //                               <span aria-hidden="true">
  //                                 <FontAwesomeIcon icon={faFileExcel} />
  //                               </span>
  //                             </button>
  //                           </td>
  //                         </tr>
  //                       );
  //                     })}
  //                   </tbody>
  //                 </table>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     </div>
  //   );
  //   useEffect(() => {
  //     setExcelData(null);
  //   }, []);
  //   const [showTable, setShowTable] = useState(false); // State để theo dõi trạng thái hiển thị bảng
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (event) => {
    if (event.target.value) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setExcelData(jsonData);
          //   setShowTable(true); // Hiển thị bảng sau khi đọc xong dữ liệu
        };
        reader.readAsBinaryString(file);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xls,.xlsx"
        name="file"
        onChange={handleFileUpload}
      />

      {excelData ? (
        <div className="table-wrap">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th>Column 1</th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Chọn tệp Excel để hiển thị dữ liệu.</p>
      )}
    </div>
  );
};
export default Display;
