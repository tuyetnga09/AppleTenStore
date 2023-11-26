import { useEffect, useState } from "react";
import { createRam, update, detail } from "../../../service/ram.service";
import { Input } from "reactstrap";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { notification } from "antd";

const DisplayRamCreate = () => {
  const [RamItems, setRamItem] = useState({});

  const { id } = useParams();

  const title = (
    <div className="text">{id !== "new" ? "Edit Ram" : "Add Ram"}</div>
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
            setRamItem(response.data);
            console.log(RamItems);
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
    let item = { ...RamItems };
    item[name] = value;
    setRamItem(item);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const items = { ...RamItems };

    if (id !== "new") {
      update(id, items);
    } else {
      createRam(items);
    }

    console.log(items);

    history.push("/ram/display");
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
                value={RamItems.code || ""}
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
                value={RamItems.name || ""}
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
                  <a href="/ram/display">
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
export default DisplayRamCreate;
