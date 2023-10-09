import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {findCapacitisByIdProduct} from "../../../../service/capacity.service";

const CapacityOfProduct = (props) => {

    const [capacities, setCapacities] = useState([]);

    useEffect(() => {
        findCapacitisByIdProduct(props.product).then((response) => {
            setCapacities(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);


    return (
        <>
            <strong style={{marginLeft: "10px"}}>DUNG LƯỢNG</strong>
            <div className="button-container">
                {capacities.map((dungLuong, index) => (
                    <Button
                        key={index}
                        type={props.capacities === dungLuong ? 'primary' : 'default'}
                        onClick={() => props.setCapacities(dungLuong)}
                        style={{marginLeft: "5px", marginBottom: "10px", marginRight: "5px"}}
                    >
                        {dungLuong}
                    </Button>
                ))}
            </div>
        </>
    );
};

export default CapacityOfProduct;