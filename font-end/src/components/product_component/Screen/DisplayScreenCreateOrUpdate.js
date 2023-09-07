import { useEffect, useState } from "react";
import { create, update, detail } from "../../../service/screen.service";
import { Input } from "reactstrap";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
    useHistory,
    useParams,
  } from "react-router-dom/cjs/react-router-dom.min";

const DisplayScreenCreateOrUpdate = () => {
    const [ScreenItems, setScreenItem] = useState({});

  const { id } = useParams();

  const title = (
    <div className="text">{id !== "new" ? "Edit Screen" : "Add Screen"}</div>
  );

  const history = useHistory();

  useEffect(() => {
    if (id !== "new") {
      detail(id)
        .then((response) => {
            setScreenItem(response.data);
          console.log(ScreenItems);
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
    let item = { ...ScreenItems };
    item[name] = value;
    setScreenItem(item);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const items = { ...ScreenItems };

    if (id !== "new") {
      update(id, items);
    } else {
        create(items);
    }

    console.log(items);

    history.push("/screen/display");
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
                  value={ScreenItems.code || ""}
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
                  value={ScreenItems.name || ""}
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
                    <a href="/screen/display">
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
export default DisplayScreenCreateOrUpdate;
