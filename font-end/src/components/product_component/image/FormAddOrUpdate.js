import {useState} from "react";
import {add} from "../../../service/image.service";
import "../../../css/form.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import {useHistory} from "react-router-dom";

const ImageFormAddOrUpdate = () => {
    const [file, setFile] = useState(null);


    function handleChange(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files);
        console.log(file);
    }

    const history = useHistory();

    function handleSubmit() {
        const formData = new FormData();
        formData.append("file", file);
        add(formData).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
        history.push("/image/display")
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
                <div className="input-data">
                    <input
                        type="file"
                        className="form-control"
                        name="file"
                        accept="image/*"
                        onChange={handleChange}
                    />
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
        </form>
    );
};

export default ImageFormAddOrUpdate;