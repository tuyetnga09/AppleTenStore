import { useEffect, useState } from "react";
import { createCapacity, update, detail } from "../../../service/capacity.service";
import { Input } from "reactstrap";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
    useHistory,
    useParams,
  } from "react-router-dom/cjs/react-router-dom.min";

const SaveOrUpdateCapacity = () => {
    const [CapacityItems, setCapacityItem] = useState({});

  const { id } = useParams();

  const title = (
    <div className="text">{id !== "new" ? "Edit Capacity" : "Add Capacity"}</div>
  );

  const history = useHistory();

  useEffect(() => {
    if (id !== "new") {
      detail(id)
        .then((response) => {
            setCapacityItem(response.data);
          console.log(CapacityItems);
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
    let item = { ...CapacityItems };
    item[name] = value;
    setCapacityItem(item);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const items = { ...CapacityItems };

    if (id !== "new") {
      update(id, items);
    } else {
        createCapacity(items);
    }

    console.log(items);

    history.push("/capacity/display");
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
                  value={CapacityItems.code || ""}
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
                  value={CapacityItems.name || ""}
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
                    <a href="/capacity/display">
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
export default SaveOrUpdateCapacity;
