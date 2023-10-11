import React, {useEffect, useState} from 'react';
import {searchImage} from "../../../service/image.service";

const ImageProduct = (props) => {
    const [image, setImage] = useState({});

    useEffect(() => {
        searchImage(props.product).then((response) => {
            const dataImage = response.data;
            setImage(dataImage.name);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <img src={`/imageUpload/` + image} alt=""/>
        </>
    );
};

export default ImageProduct;