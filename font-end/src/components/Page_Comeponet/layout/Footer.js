import React, { useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import ChatModal from "../Chat/ChatPopUp";
import { Modal } from "antd";
export default function Footer() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const openChatModal = () => {
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  return (
    <React.Fragment>
      <>
        <div className="plc">
          <section>
            <ul className="flexContain">
              <li>Giao hàng nhanh</li>
              <li>Thanh toán linh hoạt: tiền mặt, VNPAY</li>
              <li>Trải nghiệm sản phẩm tại cửa hàng</li>
              <li>Trả hàng trong vòng 3 ngày</li>
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
            href="https://web.facebook.com/messages/t/177392022117944"
            target="_blank"
            tooltip={<div>Hỗ trợ khách hàng</div>}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    id="logosMessenger0"
                    cx="19.247%"
                    cy="99.465%"
                    r="108.96%"
                    fx="19.247%"
                    fy="99.465%"
                  >
                    <stop offset="0%" stop-color="#09F" />
                    <stop offset="60.975%" stop-color="#A033FF" />
                    <stop offset="93.482%" stop-color="#FF5280" />
                    <stop offset="100%" stop-color="#FF7061" />
                  </radialGradient>
                </defs>
                <path
                  fill="url(#logosMessenger0)"
                  d="M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835c2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.218 10.218 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92c72.106 0 128-52.818 128-124.16S200.106 0 128 0Z"
                />
                <path
                  fill="#FFF"
                  d="m51.137 160.47l37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085Z"
                />
              </svg>
            }
          />
        </FloatButton.Group>

        <Modal
          visible={isChatModalOpen}
          onCancel={closeChatModal}
          width={550}
          footer={null}
          bodyStyle={{ minHeight: "500px" }}
        >
          <ChatModal />
        </Modal>

        <div id="alert">
          <span id="closebtn">⊗</span>
        </div>
        {/* ============== Footer ============= */}
        <div className="copy-right">
          <p>
            <a href="#">AppleTenStore</a> - All rights reserved © 2023 -
            Designed by
            <span style={{ color: "#eee", fontWeight: "bold" }}>
              group 15th
            </span>
          </p>
        </div>
      </>
    </React.Fragment>
  );
}
