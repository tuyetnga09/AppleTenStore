import "./style.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {Link} from "react-router-dom/cjs/react-router-dom.min";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {findBillByCode} from "../../../service/Bill/bill.service";

const Paydone = () => {
    const [bill, setBill] = useState({});
    const {code} = useParams();

    useEffect(() => {
        findBillByCode(code).then((response) => {
            setBill(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <Header/>
            <div class="ctn2">
                <h1>Thanh toán thành công!</h1>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/010/152/358/non_2x/tick-icon-sign-symbol-design-free-png.png"
                    alt="Dấu tích"
                    width="100px"
                />
                <p>Cảm ơn bạn đã thực hiện thanh toán.</p>
                <div class="row">
                    <div class="col-6">
                        <p>Hình thức thanh toán:</p>
                    </div>
                    <div class="col-6">
                        <p>{bill.paymentMethod}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p>Địa chỉ nhận hàng:</p>
                    </div>
                    <div class="col-6">
                        <p>{bill.address}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p>Số điện thoại:</p>
                    </div>
                    <div class="col-6">
                        <p>{bill.phoneNumber}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p>Mã hóa đơn:</p>
                    </div>
                    <div class="col-6">
                        <p>{bill.code}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <b>Số tiền:</b>
                    </div>
                    <div class="col-6">
                        <b>{bill.totalMoney}</b>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-6"></div>
                    <div class="col-6">
                        <Link to="/">
                            {" "}
                            <button type="button" class="btn btn-outline-success">
                                Tiếp tục mua sắm
                            </button>
                        </Link>
                    </div>
                </div>
                <br/>
                <p>
                    Mọi thắc mắc, hỗ trợ vui lòng gọi <b>0365.231.256</b> hoặc
                    <b>1900.6626</b>
                </p>
            </div>
            <Footer/>
        </>
    );
};

export default Paydone;
