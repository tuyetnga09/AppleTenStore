import React from 'react';
// import Modal from 'react-modal';
import { Modal, Input, Button, List, Avatar } from 'antd';

export default function ChatModal() {
  return (
    <div className="container py-5">
        <div className="row d-flex justify-content-center">
          {/* <div className="card"> */}
            <div
              className="card-header d-flex justify-content-between align-items-center p-3"
              style={{ borderTop: "4px solid #ffa900" }}
            >
              <h5 className="mb-0">Chat messages</h5>
              <div className="d-flex flex-row align-items-center">
                <span className="badge bg-warning me-3">20</span>
              </div>
            </div>
            <div
              className="card-body"
              data-mdb-perfect-scrollbar="true"
              style={{ position: "relative", height: 400, overflowY: 'auto' }}
            >

              <div className="d-flex justify-content-between">
                     <p className="small mb-1">Timona Siera</p>
                     <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
                  </div>
                    <div className="d-flex flex-row justify-content-start">
                   <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-3 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                        similique quae consequatur
                      </p>
                    </div>
                  </div>
                <div className="d-flex justify-content-between">
                    <p className="small mb-1 text-muted">23 Jan 2:05 pm</p>
                    <p className="small mb-1">Johny Bullock</p>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                <div>
                   <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                    Thank you for your believe in our supports
                    </p>
                </div>
                     <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                     <p className="small mb-1">Timona Siera</p>
                     <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
                  </div>
                    <div className="d-flex flex-row justify-content-start">
                   <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-3 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                        similique quae consequatur
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="small mb-1 text-muted">23 Jan 2:05 pm</p>
                    <p className="small mb-1">Johny Bullock</p>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                <div>
                   <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                    Thank you for your believe in our supports
                    </p>
                </div>
                     <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                     <p className="small mb-1">Timona Siera</p>
                     <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
                  </div>
                    <div className="d-flex flex-row justify-content-start">
                   <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-3 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                        similique quae consequatur
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="small mb-1 text-muted">23 Jan 2:05 pm</p>
                    <p className="small mb-1">Johny Bullock</p>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                <div>
                   <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                    Thank you for your believe in our supports
                    </p>
                </div>
                     <img
                      src="https://lh3.google.com/u/0/d/1m1lNR0cx6Ogy43ZGi590WXG7qvbRnnc3=w200-h190-p-k-rw-v1-nu-iv1"
                      style={{ width: 45, height: "100%" }}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                     <p className="small mb-1">Timona Siera</p>
                     <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
                  </div>
                    <div className="d-flex flex-row justify-content-start">
                   <img
                      src="https://lh3.google.com/u/0/d/1qLXyuyf7l40OLR-esCXzPZrClbr6vFUZ=w200-h190-p-k-rw-v1-nu-iv1"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-3 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                        similique quae consequatur
                      </p>
                    </div>
                  </div>
            </div>
                
           
            <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
              <div className="input-group mb-0">
                <Input
                  placeholder="Type message"
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <Button
                  type="button"
                  className="btn btn-warning"
                  id="button-addon2"
                  style={{ paddingTop: ".55rem" }}
                >
                  SEND
                </Button>
              </div>
            </div>
          </div>
        </div>
    //    </div>
  );
}