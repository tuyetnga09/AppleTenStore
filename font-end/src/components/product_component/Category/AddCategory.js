import { useEffect, useState } from "react";
import { createCategory, update, detail } from "../../../service/category.service";
import { Input } from "reactstrap";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
    useHistory,
    useParams,
  } from "react-router-dom/cjs/react-router-dom.min";

const AddCategory = () => {
    const [CategoryList, setListCategory] = useState({});

  const { id } = useParams();

  const title = (
    <div className="text">{id !== "new" ? "Edit Category" : "Add Category"}</div>
  );

  const history = useHistory();

  useEffect(() => {
    if (id !== "new") {
      detail(id)
        .then((response) => {
            setListCategory(response.data);
          console.log(CategoryList);
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
    let item = { ...CategoryList };
    item[name] = value;
    setListCategory(item);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const items = { ...CategoryList };

    if (id !== "new") {
      update(id, items);
    } else {
        createCategory(items);
    }

    console.log(items);

    history.push("/category/display");
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
                  value={CategoryList.code || ""}
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
                  value={CategoryList.name || ""}
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
                    <a href="/category/display">
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
export default AddCategory;
