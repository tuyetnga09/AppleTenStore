import React, {useEffect, useState} from 'react';
import {Avatar} from "antd";
import {searchImage} from "../../../service/image.service";

const AvatarProduct = (props) => {

    const [image, setImage] = useState({});

    useEffect(() => {
        searchImage(props.product).then((response) =>{
            const dataImage = response.data
            setImage(dataImage.name)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <Avatar
                    size={128}
                    src={`/imageUpload/` + image}
                />
            </div>
        </>
    );
};

export default AvatarProduct;