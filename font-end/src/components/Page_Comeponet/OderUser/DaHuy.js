import React, {useEffect, useState} from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {Link} from "react-router-dom/cjs/react-router-dom.min";
import AvtProduct from "../../custumer_componet/avtProduct";
import {readAll} from "../../../service/BillDetail/billDetailCustomer.service";
import {readAllByIdAndDH} from "../../../service/Bill/billCustomer.service";
import {account} from "../Login/login";

const OderUserDaHuy = () => {
    const [billDetails, setBillDetails] = useState([]);
    const [bills, setBills] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("account"));
    useEffect(() => {
        readAllByIdAndDH(storedUser?.id)
            .then((res) => {
                setBills(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = bills.map((b) => readAll(b.id));
                const results = await Promise.all(promises);

                // Lấy dữ liệu từ các kết quả và cập nhật trạng thái
                const data = results.map((res) => res.data);
                setBillDetails(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [bills]);

    const result = bills.map((b, index) => {
        return (
            <>
                <div className="row">
                    <div className="col-10" style={{paddingTop: "20px"}}>
                        <strong>AppleTenStore</strong>{" "}
                    </div>
                    <div className="col-2">
            <span style={{paddingTop: "20px", float: "right", color: "red"}}>
              {b.statusBill === "CHO_XAC_NHAN"
                  ? "Chờ xác nhận"
                  : b.statusBill === "VAN_CHUYEN"
                      ? "Vận chuyển"
                      : b.statusBill === "DA_THANH_TOAN"
                          ? "Hoàn thành"
                          : "Đã hủy"}
            </span>
                    </div>
                </div>
                <hr/>
                {billDetails[index]?.map((bd) => {
                    return (
                        <div className="row">
                            <div className="col-10">
                                <p style={{width: "300px"}}>
                                    <AvtProduct product={6}/>
                                </p>
                                <strong>
                                    {bd.nameProduct} {bd.capacity} {bd.color}
                                </strong>
                                <p style={{fontSize: "13px", color: "gray"}}>
                                    Phân loại hàng: {bd.category}
                                </p>
                                <strong>x{bd.quantity}</strong>
                            </div>
                            <div className="col-2">
                                <p style={{float: "right"}}>{bd.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}</p>
                            </div>
                        </div>
                    );
                })}
                <hr/>
                <div className="row">
                    <div className="col-6">
                        {b.statusBill === "CHO_XAC_NHAN" ? (
                            <p>
                                Sản phẩm sẽ được giao trước ngày <u>23-07-2003</u>
                            </p>
                        ) : b.statusBill === "VAN_CHUYEN" ? (
                            <p>
                                Dự kiến giao hàng ngày <u>23-07-2003</u>
                            </p>
                        ) : b.statusBill === "DA_THANH_TOAN" ? (
                            ""
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="col-6">
                        <span style={{float: "right"}}>Thành tiền: {b.totalMoney.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}</span>
                        <br/>
                        <br/>
                        <div style={{float: "right"}}>
                            <button type="button" class="btn btn-danger">
                                Liên hệ người bán
                            </button>
                            {" "}
                            {b.statusBill === "CHO_XAC_NHAN" ? (
                                <button type="button" class="btn btn-light">
                                    Hủy đơn
                                </button>
                            ) : b.statusBill === "VAN_CHUYEN" ? (
                                ""
                            ) : b.statusBill === "DA_THANH_TOAN" ? (
                                <button type="button" class="btn btn-light">
                                    Mua lại
                                </button>
                            ) : (
                                <button type="button" class="btn btn-light">
                                    Mua lại
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <hr/>
            </>
        );
    });

    return (
        <>
            <Header/>
            <br/>
            <section>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <Link class="nav-link" to="/oderUserAll">
                            Tất cả
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/oderUserCTT">
                            Chờ xác nhận
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/oderUserVC">
                            Vận chuyển
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/oderUserHT">
                            Hoàn thành
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/oderUserDH">
                            Đã hủy
                        </Link>
                    </li>
                </ul>
            </section>
            <section>{result}</section>
            <br/>
            <Footer/>
        </>
    );
};
export default OderUserDaHuy;
