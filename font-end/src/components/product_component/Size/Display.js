import { useEffect, useState } from "react";
import { readAll, deleteSize } from "../../../service/size.service";
import { Link } from "react-router-dom";
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import { Button } from "reactstrap";
// import Pagination from "../Size/Paging.js";

const Display = () => {
  const [display, setDisplay] = useState([]);

  // const [pagination, setPagination] = useState({
  //   page: 0,
  //   limit: 5,
  //   totalRows: 1,
  // });

  // const [filters, setFilters] = useState({
  //   page: 0,
  // });

  useEffect(() => {
    const paramsString = queryString.stringify();
    readAll(paramsString)
      .then((response) => {
        setDisplay(response.data);
        // setPagination(response.page);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);

  // function handlePageChange(newPage) {
  //   console.log("New Page: " + newPage);
  //   setFilters({
  //     page: newPage,
  //   });
  // }

  async function remove(id) {
    deleteSize(id).then(() => {
      let newArr = [...display].filter((s) => s.id !== id);
      setDisplay(newArr);
    });
  }

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section">Size</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="h5 mb-4 text-center">
              <Button color="success" tag={Link} to="/size/new">
                Add
              </Button>
            </h3>
            <div className="table-wrap">
              <table className="table">
                <thead className="thead-primary">
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Date Create</th>
                    <th>Date Update</th>
                    <th>Person Create</th>
                    <th>Person Update</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {display.map((s) => {
                    const dateCreate = new Date(s.dateCreate);
                    const dateUpdate = new Date(s.dateUpdate);
                    const dateCreateText = dateCreate.toLocaleDateString();
                    const dateUpdateText = dateUpdate.toLocaleDateString();
                    return (
                      <tr className="alert" role="alert" key={s.id}>
                        <td>{s.code}</td>
                        <td>{s.name}</td>
                        <td>{dateCreateText}</td>
                        <td>{dateUpdateText}</td>
                        <td>{s.personCreate}</td>
                        <td>{s.personUpdate}</td>
                        <td>{s.status === 0 ? "Online" : "Offline"}</td>
                        <td>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Edit"
                          >
                            <Link to={"/size/" + s.id}>
                              <span aria-hidden="true">
                                <FontAwesomeIcon icon={faEdit} />
                              </span>
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={() => remove(s.id)}
                          >
                            <span aria-hidden="true">
                              <FontAwesomeIcon icon={faClose} />
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
      </div>
    </section>
  );
};
export default Display;
