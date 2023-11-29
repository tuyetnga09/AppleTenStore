import React, { useState } from "react";
import { importBattery } from "../../../service/battery.service";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ImportBattery = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  const history = useHistory();

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    importBattery(formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    history.push("/battery/getAll");
  };
  return (
    <form onSubmit={handleUpload} enctype="multipart/form-data">
      <div className="form-row">
        <div className="input-data">
          <input
            type="file"
            class="form-control"
            name="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <br></br>
      <div className="form-row">
        <div className="input-data textarea">
          <div className="form-row submit-btn">
            <button type="submit" class="btn btn-outline-secondary">
              Upload
            </button>
            <button class="btn btn-light" style={{ marginLeft: "15px" }}>
              <a href="/battery/getAll">
                <FontAwesomeIcon icon={faTimesCircle} />
              </a>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ImportBattery;
