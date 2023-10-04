import { useState } from "react";
import { importImei } from "../../../service/imei.service";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faBackward } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  FaArrowLeft,
  FaArrowUp,
  FaBackspace,
  FaBitcoin,
  FaReact,
} from "react-icons/fa";
const ImportImei = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const history = useHistory();

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    importImei(formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // history.push("/imei/getAll");
    history.push("/product/display", file);
  };

  const handleClick = () => {
    history.push("/product/display", file);
  };

  return (
    <>
      <button onClick={handleClick} class="btn btn-outline-secondary">
        <FaArrowLeft /> Back
      </button>
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
              {/* <button class="btn btn-light" style={{ marginLeft: "15px" }}>
              <a href="/imei/getAll">
                <FontAwesomeIcon icon={faTimesCircle} />
              </a>
            </button> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default ImportImei;
