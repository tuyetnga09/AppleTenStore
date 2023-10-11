import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {findColorByIdProduct} from "../../../../service/color.service";

const ColorOfProduct = (props) => {

    const [colors, setColors] = useState([]);

    useEffect(() => {
        findColorByIdProduct(props.product).then((response) => {
            setColors(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            <strong style={{marginLeft: "10px"}}>MÀU SẮC</strong>
            <div className="button-container">
                {colors.map((MauSac, index) => (
                    <Button
                        key={index}
                        type={props.colors === MauSac ? 'primary' : 'default'}
                        onClick={() => props.setColors(MauSac)}
                        style={{marginLeft: "5px", marginBottom: "10px", marginRight: "5px"}}
                    >
                        {MauSac}
                    </Button>
                ))}
            </div>
        </>
    );
};

export default ColorOfProduct;