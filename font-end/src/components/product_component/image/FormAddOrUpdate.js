import {useEffect, useState} from "react";
import {add, selectProduct} from "../../../service/image.service";
import "../../../css/form.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import {useHistory} from "react-router-dom";

const ImageFormAddOrUpdate = () => {
    const formData = new FormData();
    const [products, setProducts] = useState({});

    useEffect(() => {
        selectProduct().then((response) => {
            setProducts(response.data);
        })
    }, []);



    function handleChangeFile(event) {
        const list = event.target.files;
        for (let i = 0; i < list.length; i++) {
            formData.append("file", list.item(i));
        }
    }

    function handleChangeProduct(event) {
        const target = event.target;
        const value = target.value;
        formData.append("product", value);
    }

    const history = useHistory();

    function handleSubmit() {
        add(formData).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
        history.push("/image/display")
    }

    return (<form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-row">
            <div className="input-data">
                <input
                    type="file"
                    className="form-control"
                    name="file"
                    accept="image/*"
                    onChange={handleChangeFile}
                    multiple
                />
                <select
                    name="product"
                    id="product"
                    onChange={handleChangeProduct}
                >
                    {
                        products.map((product) => {
                            return <option value={product.id}>{product.name}</option>
                        })
                    }
                </select>
            </div>
        </div>
        <br></br>
        <div className="form-row">
            <div className="input-data textarea">
                <div className="form-row submit-btn">
                    <button type="submit" className="btn btn-outline-secondary">
                        Upload
                    </button>
                    <button className="btn btn-light" style={{marginLeft: "15px"}}>
                        <a href="/battery/getAll">
                            <FontAwesomeIcon icon={faTimesCircle}/>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    </form>);
};

export default ImageFormAddOrUpdate;