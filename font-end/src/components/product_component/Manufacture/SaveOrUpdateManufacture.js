import React, { useEffect, useState } from "react";
import {
  createManufacture,
  update,
  detail,
} from "../../../service/manufacture.service";
import { Input } from "reactstrap";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { notification } from "antd";

const SaveOrUpdateManufacture = () => {
  const [ManufactureList, setListManufacture] = useState({});

  const { id } = useParams();

  const title = (
    <div className="text">
      {id !== "new" ? "Edit Manufacture" : "Add Manufacture"}
    </div>
  );

  const history = useHistory();
  const storedUser = JSON.parse(localStorage.getItem("account"));

  useEffect(() => {
    if (storedUser?.roles === "CUSTOMER" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      if (id !== "new") {
        detail(id)
          .then((response) => {
            setListManufacture(response.data);
            console.log(ManufactureList);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }
    }
  }, []);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...ManufactureList };
    item[name] = value;
    setListManufacture(item);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const items = { ...ManufactureList };

    if (id !== "new") {
      update(id, items);
    } else {
      createManufacture(items);
    }

    console.log(items);

    history.push("/manufacture/display");
  }

  return (
    <div className="bodyform">
      <div className="containerForm">
        {title}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <Input
                type="text"
                required
                value={ManufactureList.code || ""}
                onChange={handleChange}
                id="code"
                name="code"
              ></Input>
              <div className="underline"></div>
              <label htmlFor="">Code</label>
            </div>
            <br />
            <div className="input-data">
              <Input
                type="text"
                required
                value={ManufactureList.name || ""}
                onChange={handleChange}
                id="name"
                name="name"
              ></Input>
              <div className="underline"></div>
              <label htmlFor="">Name</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data textarea">
              <div className="form-row submit-btn">
                <div className="input-data">
                  <div className="inner"></div>
                  <Input type="submit" value={"SUBMIT"}></Input>
                </div>
                <button class="btn btn-light">
                  <a href="/manufacture/display">
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SaveOrUpdateManufacture;
