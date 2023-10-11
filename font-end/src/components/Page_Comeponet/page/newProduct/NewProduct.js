import React, {useEffect, useState} from 'react';
import {newProduct} from "../../../../service/product.service";
import ImageProduct from "../ImageProduct";

const NewProduct = (props) => {
    const VND = props.format;

    const [list, setList] = useState([]);

    useEffect(() => {
        newProduct().then((response) => {
            setList(response.data);
        })
    }, []);

    return (<>
        <div className="khungSanPham" style={{borderColor: "#42bcf4"}}>
            <h3
                className="tenKhung"
                style={{
                    backgroundImage: "linear-gradient(120deg, #42bcf4 0%, #004c70 50%, #42bcf4 100%)"
                }}
            >
                * SẢN PHẨM MỚI *
            </h3>
            <div className="listSpTrongKhung flexContain">
                {list.map((item) => {
                    return (
                        <li className="sanPham">
                            <a href="chitietsanpham.html?Xiaomi-Redmi-Note-5">
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
                                    <i className="fa fa-star-o"/>
                                    <span>372 đánh giá</span>
                                </div>
                                <label className="moiramat">Mới ra mắt</label>
                                <div className="tooltip">
                                    <button
                                        className="themvaogio"
                                        onClick="themVaoGioHang('Xia2', 'Xiaomi Redmi Note 5'); return false;"
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
            </div>
            <a
                className="xemTatCa"
                href="index.html?promo=moiramat&sort=rateCount-decrease"
                style={{
                    borderLeft: "2px solid #42bcf4", borderRight: "2px solid #42bcf4"
                }}
            >
                Xem tất cả 14 sản phẩm
            </a>
        </div>
    </>);
};

export default NewProduct;