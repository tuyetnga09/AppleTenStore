import { useEffect, useState } from "react";
import { add, update, detail } from "../../../service/battery.service";
import { Input } from "reactstrap";
import "../../../css/form.css";
import {
  useHistory,
  useParams,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const FormAddOrUpdate = () => {
  const [batteryItem, setBatteryItem] = useState({});

  const { id } = useParams();

  const title = (
    <div className="text">{id !== "new" ? "Edit Battery" : "Add Battery"}</div>
  );

  const history = useHistory();

  useEffect(() => {
    if (id !== "new") {
      detail(id)
        .then((response) => {
          setBatteryItem(response.data);
          console.log(batteryItem);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }, []);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...batteryItem };
    item[name] = value;
    setBatteryItem(item);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const items = { ...batteryItem };

    if (id !== "new") {
      update(id, items);
    } else {
      add(items);
    }

    console.log(items);

    history.push("/battery/getAll");
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
              value={batteryItem.code || ""}
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
              value={batteryItem.name || ""}
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
              <button class="btn btn-light" type="button">
                <Link to="/battery/getAll">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};
export default FormAddOrUpdate;
