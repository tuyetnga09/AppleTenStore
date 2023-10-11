import React, {useEffect, useState} from 'react';
import {chipProduct} from "../../../service/product.service";
import ImageProduct from "../ImageProduct";

const ChipProduct = (props) => {
    const VND = props.format;
    const [list, setList] = useState([]);
    useEffect(() => {
        chipProduct().then((response) => {
            setList(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            {list.map((item) => {
                return (
                    <li className="sanPham">
                        <a href="chitietsanpham.html?Itel-it2123">
                            <ImageProduct product={item.id}></ImageProduct>
                            <h3>{item.name}</h3>
                            <div className="price">
                                <strong>{VND.format(item.price)}</strong>
                            </div>
                            <div className="ratingresult">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <span>302 đánh giá</span>
                            </div>
                            <div className="tooltip">
                                <button
                                    className="themvaogio"
                                    onClick="themVaoGioHang('Ite2', 'Itel it2123'); return false;"
                                >
                      <span className="tooltiptext" style={{fontSize: 15}}>
                        Thêm vào giỏ
                      </span>
                                    +
                                </button>
                            </div>
                        </a>
                    </li>
                );
            })}
        </>
    );
};

export default ChipProduct;