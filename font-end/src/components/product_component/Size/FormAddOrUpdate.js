import { useEffect, useState } from "react";
import { add, update, detail } from "../../../service/size.service";
import { Input } from "reactstrap";
import "../../../css/form.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const FormAddOrUpdate = () => {
  const [sizeItem, setSizeItem] = useState({});

  const { id } = useParams();

  const title = (
    <div className="text">{id !== "new" ? "Edit Size" : "Add Size"}</div>
  );

  const history = useHistory();

  useEffect(() => {
    if (id !== "new") {
      detail(id)
        .then((response) => {
          setSizeItem(response.data);
          console.log(sizeItem);
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
    let item = { ...sizeItem };
    item[name] = value;
    setSizeItem(item);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const items = { ...sizeItem };

    if (id !== "new") {
      update(id, items);
    } else {
      add(items);
    }

    console.log(items);

    history.push("/size/getAll");
  }

  return (
    <div className="container">
      {title}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-data">
            <Input
              type="text"
              required
              value={sizeItem.code || ""}
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
              value={sizeItem.name || ""}
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
                <a href="/size/getAll">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </a>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default FormAddOrUpdate;
