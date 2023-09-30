import React from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

export default function Footer(){
  return(
    <React.Fragment>
       <>
        <div className="plc">
          <section>
            <ul className="flexContain">
              <li>Giao hàng hỏa tốc trong 1 giờ</li>
              <li>Thanh toán linh hoạt: tiền mặt, visa / master, trả góp</li>
              <li>Trải nghiệm sản phẩm tại nhà</li>
              <li>Lỗi đổi tại nhà trong 1 ngày</li>
              <li>
                Hỗ trợ suốt thời gian sử dụng.
                <br />
                Hotline:
                <a href="tel:12345678" style={{ color: "#288ad6" }}>
                  12345678
                </a>
              </li>
            </ul>
          </section>
        </div>

      {/* <i className="fa fa-arrow-up" id="goto-top-page" onclick="gotoTop()" /> */}
      <FloatButton.Group shape="circle" style={{ right: 24 + 70 }}>
        <FloatButton
          href="https://ant.design/index-cn"
          tooltip={<div>Thông báo</div>}
          badge={{ count: 5, color: 'blue' }}
        />
      </FloatButton.Group>

      <div id="alert">
        <span id="closebtn">⊗</span>
      </div>
      {/* ============== Footer ============= */}
      <div className="copy-right">
        <p>
          <a href="index.html">LDD Phone Store</a> - All rights reserved © 2021 -
          Designed by
          <span style={{ color: "#eee", fontWeight: "bold" }}>group 15th</span>
        </p>
    </div>
    </>
    </React.Fragment>
  )
}
