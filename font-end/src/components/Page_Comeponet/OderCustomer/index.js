import React, { useEffect, useRef, useState } from "react";
import { readByCodeBill } from "../../../service/Bill/billCustomer.service";
import {
  readAllByCustomer,
  checkBillTraHang,
  getAllBillDetail,
  traTatCaSanPham,
  yeuCauTraHang,
  khachHangHuyYeuCauTraHang,
} from "../../../service/BillDetail/billDetailCustomer.service";
import AvtProduct from "../../custumer_componet/avtProduct";
import { Toast } from "primereact/toast";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  Avatar,
  Checkbox,
  Form,
  Modal,
  Row,
  Select,
  Table,
  notification,
} from "antd";
import {
  deleteBillById,
  returnBillById,
} from "../../../service/Bill/bill.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { getAllBillDetailReturn } from "../../../service/BillDetail/billDetail.service";

const OderCustomerAll = () => {
  const toast = useRef(null);
  const [bill, setBill] = useState([]);
  const [code, setCode] = useState();
  const [billDetails, setBillDetails] = useState([]);
  const [isShowContent, setIsShowContent] = useState(true);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  useEffect(() => {}, [code]);

  const handleSubmit = (event) => {
    event.preventDefault();
    readByCodeBill(code)
      .then((res) => {
        setBill(res.data);
        console.log(res.data);
        readAllByCustomer(res.data.idBill)
          .then((res) => {
            setBillDetails(res.data);
            console.log(res.data);
            setIsShowContent(false);
          })
          .catch((err) => {
            console.log(err);
            toast.current.show({
              severity: "error",
              summary: "TÌM HÓA ĐƠN",
              detail: "Không tìm thấy hóa đơn",
              life: 3000,
            });
            setIsShowContent(true);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(bill);
  };

  const [billReturn, setBillReturn] = useState({
    id: null,
    note: null,
  });

  const [isModalVisibleCannelOrder, setIsModalVisibleCannelOrder] =
    useState(false);

  const handleCannelOrderClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.idBill,
    });
    setIsModalVisibleCannelOrder(true);
  };

  const handleCannelOrderCancel = () => {
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
    setIsModalVisibleCannelOrder(false);
  };

  const handleCannelOrder = (event) => {
    setBillReturn({
      ...billReturn,
      note: event.target.value,
    });
  };

  const handleSubmitReturns = (event) => {
    event.preventDefault();
    deleteBillById(billReturn.id, billReturn.note).then((response) =>
      console.log(response.data)
    );
    setIsModalVisibleCannelOrder(false);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
    notification.success({
      message: "Hủy đơn",
      description: "Hủy đơn thành công",
    });
  };

  const [dataBillDetails, setDataBillDetails] = useState([]); // lisst bill detail cuar idbill
  const [dataCheckBill, setCheckDataBill] = useState(true); // check bill da tra hang lan nao hay chua
  const [isModalVisibleXemHoaDonChiTiet, setIsModalVisibleXemHoaDonChiTiet] =
    useState(false); // Trạng thái hiển thị Modal
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); //list id imei da ban

  // Hàm để mở Modal
  const handleOpenXemHoaDonChiTiet = () => {
    setIsModalVisibleXemHoaDonChiTiet(true);
  };
  // Hàm để ẩn Modal
  const handleCancelXemHoaDonChiTiet = () => {
    setCheckDataBill();
    setDataBillDetails([]);
    setSelectedCheckboxes([]);
    setIsModalVisibleXemHoaDonChiTiet(false);
  };

  const handleNoteReturnsClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.idBill,
    });
    checkBillTraHang(record.idBill)
      .then((res) => {
        setCheckDataBill(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBillDetail(record.idBill, "")
      .then((res) => {
        setDataBillDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setIsModalVisibleNoteReturns(true);
    handleOpenXemHoaDonChiTiet();
  };

  function handleChangeSearch(event) {
    getAllBillDetail(billReturn.id, event.target.value)
      .then((res) => {
        setDataBillDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [isModalVisibleNoteReturns, setIsModalVisibleNoteReturns] =
    useState(false); // Trạng thái hiển thị Modal
  const [dataTraTatCaSP, setDataTraTatCaSP] = useState([]);
  const handleOpenNoteReturnsCancel = () => {
    setIsModalVisibleNoteReturns(true);
    // In ra danh sách id
  };

  //huy chon check box
  const huyChonCheckBox = () => {
    setSelectedCheckboxes([]);
  };

  //tra 1 phan
  const traSanPhamDaChon = () => {
    if (
      selectedCheckboxes === undefined ||
      selectedCheckboxes.length === 0 ||
      selectedCheckboxes === null
    ) {
      toast.current.show({
        severity: "warn",
        summary: "THÔNG BÁO",
        detail: "Hãy chọn sản phẩm.",
        life: 3000,
      });
    } else {
      handleOpenNoteReturnsCancel(selectedCheckboxes);
    }
  };

  const confirmTraSanPhamDaChon = () => {
    confirmDialog({
      message: "Bạn chắc chắc trả sản phẩm đã chọn?",
      header: "XÁC NHẬN THÔNG BÁO",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => traSanPhamDaChon(),
      reject: () => rejectTraHang(),
    });
  };
  const traTatCaSP = () => {
    const idList = dataBillDetails.map((obj) => obj.idImei);
    setDataTraTatCaSP(idList);
    handleOpenNoteReturnsCancel();
  };
  const rejectTraTatCaSP = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục mua sắm.",
      life: 3000,
    });
  };
  const confirmTraTatCaSanPham = () => {
    confirmDialog({
      message: "Bạn chắc chắc trả sản phẩm đã chọn?",
      header: "XÁC NHẬN THÔNG BÁO",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => traTatCaSP(),
      reject: () => rejectTraTatCaSP(),
    });
  };
  const [isModalVisibleHuyTrahang, setIsModalVisibleHuyTrahang] =
    useState(false); // Trạng thái hiển thị Modal
  const handleOpenXemHuyTrahang = () => {
    setIsModalVisibleHuyTrahang(true);
  };
  // Hàm để ẩn Modal
  const handleCancelHuyTrahang = () => {
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1-1"
    );
    textNoteReturn.value = "";
    setIsModalVisibleHuyTrahang(false);
  };
  const huyTrahang = () => {
    handleOpenXemHuyTrahang();
  };
  const rejectKhachHuyTraHang = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục mua sắm.",
      life: 3000,
    });
  };
  const confirmHuyTraHang = () => {
    confirmDialog({
      message: "Bạn chắc chắc huỷ trả sản phẩm?",
      header: "XÁC NHẬN THÔNG BÁO",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => huyTrahang(),
      reject: () => rejectKhachHuyTraHang(),
    });
  };
  const rejectTraHang = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục mua sắm.",
      life: 3000,
    });
  };
  function handleCheckboxChange(e) {
    const checkboxValue = e.target.value;
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (e.target.checked) {
        // Nếu được chọn, thêm giá trị vào danh sách
        return [...prevSelectedCheckboxes, checkboxValue];
      } else {
        // Nếu bỏ chọn, loại bỏ giá trị khỏi danh sách
        return prevSelectedCheckboxes.filter((item) => item !== checkboxValue);
      }
    });
  }

  const [selectNganHang, setSelectNganHang] = useState(null);
  // Hàm để ẩn Modal
  const handleNoteReturnsCancel = () => {
    setDataTraTatCaSP([]);
    setSelectNganHang(null);
    console.log(billReturn);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
    const stk = document.getElementById("stk");
    stk.value = "";

    const chuTaiKhoan = document.getElementById("id-chu-tai-khoan");
    chuTaiKhoan.value = "";

    const sdt = document.getElementById("id-sdt");
    sdt.value = "";

    setIsModalVisibleNoteReturns(false);
  };
  const handleSubmitReturns2 = (event) => {
    event.preventDefault();

    if (selectNganHang === null || selectNganHang === undefined) {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng nhập đủ thông tin!",
      });
    } else {
      if (
        (selectedCheckboxes === undefined ||
          selectedCheckboxes.length === 0 ||
          selectedCheckboxes === null) &&
        (dataTraTatCaSP !== null ||
          dataTraTatCaSP !== undefined ||
          dataTraTatCaSP.length > 0)
      ) {
        traTatCaSanPham(billReturn.id, billReturn.note, dataTraTatCaSP)
          .then((res) => {
            if (res.data !== "" && res.data !== undefined) {
              setDataBillDetails(res.data);
              notification.success({
                message: "Trả hàng",
                description:
                  "Bạn sẽ nhận được tiền khi người bán nhận lại hàng",
              });
              checkBillTraHang(billReturn.id)
                .then((res) => {
                  setCheckDataBill(res.data);
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              handleNoteReturnsCancel();
            } else {
              notification.warn({
                message: "Trả hàng thất bại!",
                description:
                  "Yêu cầu trả hàng của quý khách thất bại! Vui lòng thử lại!",
              });
            }
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        yeuCauTraHang(billReturn.id, billReturn.note, selectedCheckboxes)
          .then((res) => {
            if (res.data !== "" && res.data !== undefined) {
              setDataBillDetails(res.data);
              notification.success({
                message: "Trả hàng",
                description:
                  "Bạn sẽ nhận được tiền khi người bán nhận lại hàng",
              });
              checkBillTraHang(billReturn.id)
                .then((res) => {
                  setCheckDataBill(res.data);
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              handleNoteReturnsCancel();
            } else {
              notification.warn({
                message: "Trả hàng thất bại!",
                description:
                  "Yêu cầu trả hàng của quý khách thất bại! Vui lòng thử lại!",
              });
            }
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const handleNoteReturns = (event) => {
    const stk = document.getElementById("stk").value;
    const tenTaiKhoan = document.getElementById("id-chu-tai-khoan").value;
    const sdt = document.getElementById("id-sdt").value;
    const updatedNote = `Ghi chú:${event.target.value}, Ngân hàng: ${idNganHang},
     STK: ${stk}, Chủ tài khoản: ${tenTaiKhoan}, SĐT: ${sdt}`;
    setBillReturn({
      ...billReturn,
      note: updatedNote,
    });
  };
  const [idNganHang, setIdNganHang] = useState();

  function handleSelectBank(value) {
    const note = document.getElementById("exampleFormControlTextarea1").value;
    const stk = document.getElementById("stk").value;
    const tenTaiKhoan = document.getElementById("id-chu-tai-khoan").value;
    const sdt = document.getElementById("id-sdt").value;

    setIdNganHang(value);
    setSelectNganHang(value);
    const updatedNote = `Ghi chú:${note}, Ngân hàng: ${value}, STK: ${stk},
     Chủ tài khoản: ${tenTaiKhoan}, SĐT: ${sdt}`;
    setBillReturn({
      ...billReturn,
      note: updatedNote,
    });
  }
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    const loadBankList = async () => {
      const apiUrl = "https://api.vietqr.io/v2/banks";

      try {
        const response = await fetch(apiUrl);
        const data = response.json();
        data.then((res) => setBanks(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    loadBankList();
  }, []);
  function handleSoTaiKhoan(event) {
    const note = document.getElementById("exampleFormControlTextarea1").value;
    const tenTaiKhoan = document.getElementById("id-chu-tai-khoan").value;
    const sdt = document.getElementById("id-sdt").value;
    const updatedNote = `Ghi chú:${note}, Ngân hàng: ${idNganHang}, STK: ${event.target.value}, 
    Chủ tài khoản: ${tenTaiKhoan}, SĐT: ${sdt}`;
    setBillReturn({
      ...billReturn,
      note: updatedNote,
    });
  }
  function handleNoteReturnsChuTaiKhoan(event) {
    const note = document.getElementById("exampleFormControlTextarea1").value;
    const tenTaiKhoan = document.getElementById("id-chu-tai-khoan").value;
    const stk = document.getElementById("stk").value;
    const sdt = document.getElementById("id-sdt").value;
    const updatedNote = `${note}, ${idNganHang}, STK: ${stk},
     Tên: ${event.target.value}, SĐT: ${sdt}`;
    setBillReturn({
      ...billReturn,
      note: updatedNote,
    });
  }
  function handleNoteReturnsSdt(event) {
    const note = document.getElementById("exampleFormControlTextarea1").value;
    const tenTaiKhoan = document.getElementById("id-chu-tai-khoan").value;
    const stk = document.getElementById("stk").value;
    const updatedNote = `Ghi chú:${note}, Ngân hàng: ${idNganHang}, STK: ${stk},
     Chủ tài khoản: ${tenTaiKhoan}, SĐT: ${event.target.value}`;
    setBillReturn({
      ...billReturn,
      note: updatedNote,
    });
    console.log(billReturn);
  }
  const handleCanneHuyTraHang = (event) => {
    setBillReturn({
      ...billReturn,
      note: event.target.value,
    });
  };
  const handleSubmitHuyTrahang = (event) => {
    event.preventDefault();

    khachHangHuyYeuCauTraHang(billReturn.id, billReturn.note)
      .then((res) => {
        if (res.data !== "" && res.data !== undefined) {
          setDataBillDetails(res.data);
          notification.success({
            message: " Huỷ yêu cầu trả hàng",
            description: "Huỷ yêu cầu trả hàng thành công.",
          });
          checkBillTraHang(billReturn.id)
            .then((res) => {
              setCheckDataBill(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          handleCancelHuyTrahang();
        } else {
          notification.warn({
            message: "Huỷ yêu cầu trả hàng thất bại!",
            description:
              "Yêu cầu trả hàng của quý khách thất bại! Vui lòng thử lại!",
          });
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isModalVisibleReturnedProducts, setIsModalVisibleReturnedProducts] =
    useState(false); // Trạng thái hiển thị Modal
  const [idBillDaTra, setIdBillDaTra] = useState(); //
  const handleClickReturnedProducts = (record) => {
    setIsModalVisibleReturnedProducts(true);
    setIdBillDaTra(record.idBill);
    getAllBillDetailReturn(6, record.idBill, "")
      .then((response) => {
        setDataBillDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Hàm để ẩn Modal
  const handleCannelReturnedProducts = () => {
    setIsModalVisibleReturnedProducts(false);
  };

  function handleChangeSearchDaTra(event) {
    getAllBillDetailReturn(6, idBillDaTra, event.target.value)
      .then((response) => {
        setDataBillDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Toast ref={toast} />
      <Header />
      <ConfirmDialog />
      <div className="container" style={{ marginTop: "30px" }}>
        <h1>Tìm kiếm đơn hàng</h1>
        <form class="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Nhập mã hóa đơn"
            aria-label="Search"
            required
            onChange={handleChange}
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <section hidden={isShowContent}>
          <div className="row">
            <div className="col-10" style={{ paddingTop: "20px" }}>
              <strong>AppleTenStore</strong>{" "}
            </div>
            <div className="col-2">
              <span
                style={{ paddingTop: "20px", float: "right", color: "red" }}
              >
                {bill.statusBill === "CHO_XAC_NHAN"
                  ? "Chờ xác nhận"
                  : bill.statusBill === "CHO_VAN_CHUYEN"
                  ? "Chờ vận chuyển"
                  : bill.statusBill === "VAN_CHUYEN"
                  ? "Vận chuyển"
                  : bill.statusBill === "DA_THANH_TOAN"
                  ? "Hoàn thành"
                  : bill.statusBill === "TRA_HANG"
                  ? "Trả hàng"
                  : bill.statusBill === "YEU_CAU_TRA_HANG"
                  ? "Yêu cầu trả hàng"
                  : "Đã hủy"}
              </span>
            </div>
          </div>
          <hr />
          {billDetails?.map((bd) => {
            return (
              <div className="row">
                <div className="col-10">
                  <p style={{ width: "300px" }}>
                    <AvtProduct product={bd.idProduct} />
                  </p>
                  <strong>
                    {bd.nameProduct} {bd.capacity} {bd.color}
                  </strong>
                  <p style={{ fontSize: "13px", color: "gray" }}>
                    Phân loại hàng: {bd.category}
                  </p>
                  <strong>x{bd.quantity}</strong>
                </div>
                <div className="col-2">
                  <p style={{ float: "right" }}>
                    {parseFloat(bd.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <hr />
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6">
              <span style={{ float: "right" }}>
                Thành tiền:{" "}
                {parseFloat(bill.totalMoney).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <br />
              <br />
              <div style={{ float: "right" }}>
                {bill.statusBill === "CHO_XAC_NHAN" ? (
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => handleCannelOrderClick(bill)}
                  >
                    Hủy đơn
                  </button>
                ) : bill.statusBill === "CHO_VAN_CHUYEN" ? (
                  ""
                ) : bill.statusBill === "VAN_CHUYEN" ? (
                  ""
                ) : bill.statusBill === "DA_THANH_TOAN" ||
                  bill.statusBill === "YEU_CAU_TRA_HANG" ? (
                  //   &&
                  // khoangCachNgay <= 3
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => handleNoteReturnsClick(bill)}
                  >
                    Trả hàng
                  </button>
                ) : bill.statusBill === "TRA_HANG" ? (
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => handleClickReturnedProducts(bill)}
                  >
                    Xem chi tiết
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <br />
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "60px",
        }}
      >
        <Footer />
      </footer>
      <Modal
        visible={isModalVisibleCannelOrder}
        onCancel={handleCannelOrderCancel}
        width={550}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <form onSubmit={handleSubmitReturns}>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Lí do hủy đơn:
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              onChange={handleCannelOrder}
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success">
            Xác nhận
          </button>
        </form>
      </Modal>
      <Modal
        visible={isModalVisibleXemHoaDonChiTiet}
        onCancel={handleCancelXemHoaDonChiTiet}
        width={900}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <h4
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          THÔNG TIN TRẢ HÀNG
        </h4>
        <span style={{ color: "red", marginBottom: "15px", marginTop: "15px" }}>
          * Lưu ý: Quý khách chỉ được trả hàng một lần duy nhất trên một hoá đơn
          trong vòng 3 ngày kể từ lúc nhận được hàng.
        </span>
        <Row style={{ marginTop: "28px", marginBottom: "10px" }}>
          <input
            // id="id-imeis"
            className="form-control me-2"
            type="search"
            placeholder="Tìm theo imei"
            aria-label="Search"
            name="key"
            onChange={handleChangeSearch}
          />
        </Row>
        {dataCheckBill === 0 ? (
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div className="col-6">
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => huyChonCheckBox()}
              >
                Huỷ Chọn Tất Cả
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                class="btn btn-warning"
                style={{ color: "white" }}
                onClick={() => confirmTraSanPhamDaChon()}
              >
                Trả Sản Phẩm Đã Chọn
              </button>
              <button
                type="button"
                class="btn btn-success"
                style={{ marginLeft: "10px" }}
                onClick={() => confirmTraTatCaSanPham()}
              >
                Trả Tất Cả Sản Phẩm
              </button>
            </div>
          </Row>
        ) : dataCheckBill === 4 ? (
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div class="col-6">
              <span style={{ color: "red" }}>
                * Quý khách đã hết số lần trả hàng.
              </span>
            </div>

            <div class="col-6">
              <button
                type="button"
                class="btn btn-danger"
                style={{ float: "right" }}
                onClick={() => confirmHuyTraHang()}
              >
                Huỷ Yêu Cầu Trả Hàng
              </button>
            </div>
          </Row>
        ) : dataCheckBill === 5 ||
          dataCheckBill === 7 ||
          dataCheckBill === 7 ? (
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div class="col-6">
              <span style={{ color: "red" }}>
                * Quý khách đã hết số lần trả hàng.
              </span>
            </div>
          </Row>
        ) : (
          ""
        )}
        <Table
          rowKey="oop"
          dataSource={dataBillDetails}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `Tổng số ${total} sản phẩm`,
            showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
          }}
        >
          {/* tên sp */}
          <Table.Column
            align="center"
            key="checked"
            dataIndex="checked"
            title="Chọn"
            render={(text, record) => {
              return (
                <div>
                  {record.statusImei == 3 && dataCheckBill === 0 ? (
                    <Checkbox
                      value={record.idImei}
                      checked={selectedCheckboxes.includes(record.idImei)}
                      onChange={handleCheckboxChange}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  )}
                </div>
              );
            }}
          />
          <Table.Column
            align="center"
            dataIndex="images"
            title="Ảnh"
            render={(text, record) => (
              <div style={{ textAlign: "center" }}>
                <AvtProduct product={record.idProduct} />
              </div>
            )}
            width={150}
          />

          {/* tên sp */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Tên Sản Phẩm"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.nameProduct}</p>
                </Form.Item>
              );
            }}
          />
          {/* sumSKU */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Phiên Bản"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>
                    {record.capacity} - {record.color}
                  </p>
                </Form.Item>
              );
            }}
          />
          {/* priceSKU  */}
          <Table.Column
            align="center"
            key="price"
            dataIndex="price"
            title="Giá Bán"
            sorter={(a, b) => a.price - b.price}
            render={(text, record) => {
              return record.price === null ? (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <WarningFilled
                    value={false}
                    style={{
                      color: "#FFCC00",
                    }}
                  />
                  {parseFloat(0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Form.Item>
              ) : (
                <Form.Item name="title" style={{ margin: 0 }}>
                  {parseFloat(record.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Form.Item>
              );
            }}
          />

          {/* sumImeiTrongKho */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Mã Imei"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.imei}</p>
                </Form.Item>
              );
            }}
          />

          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Trạng Thái"
            render={(text, record) => {
              return (
                <div>
                  {record.statusImei === 3 ? (
                    <CheckCircleOutlined
                      style={{
                        color: "#52c41a",
                      }}
                    />
                  ) : record.statusImei === 6 ? (
                    <div>
                      <CloseCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Trả hàng thành công
                      </div>
                    </div>
                  ) : record.statusImei === 4 ? (
                    <div
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      Đã gửi yêu cầu
                    </div>
                  ) : record.statusImei === 5 ? (
                    <div>
                      <WarningFilled
                        style={{
                          color: "#FFCC00",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Trả hàng không thành công
                      </div>
                    </div>
                  ) : record.statusImei === 7 ? (
                    <div>
                      <WarningFilled
                        style={{
                          color: "#FFCC00",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "#FFCC00",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Đã huỷ yêu cầu trả hàng
                      </div>
                    </div>
                  ) : (
                    "!"
                  )}
                </div>
              );
              {
                /* <Form.Item name="title" style={{ margin: 0 }}>
                    <p>{record.idImei}</p>
                  </Form.Item> */
              }
              //   </div>
              // );
            }}
          />
        </Table>
      </Modal>
      <Modal
        visible={isModalVisibleNoteReturns}
        onCancel={handleNoteReturnsCancel}
        width={550}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <h4
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          THÔNG TIN NGƯỜI HOÀN TRẢ
        </h4>
        <form onSubmit={handleSubmitReturns2}>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Lí do trả hàng:
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              onChange={handleNoteReturns}
            ></textarea>
            <label for="exampleFormControlTextarea1" class="form-label">
              Ngân hàng:
            </label>
            <Select
              style={{ width: "100%", height: "100%" }}
              value={selectNganHang}
              onChange={handleSelectBank}
            >
              {banks.map((option) => (
                <Option key={option.id} value={option.shortName} id={option.id}>
                  <Avatar
                    size="small"
                    src={option.logo}
                    style={{ width: "50%", height: "100%" }}
                  />
                  {/* {option.shortName} */}
                </Option>
              ))}
            </Select>
            <br />
            <label for="exampleFormControlTextarea1" class="form-label">
              Nhập số tài khoản:
            </label>
            <div class="input-group mb-3">
              <input
                type="number"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                id="stk"
                required
                onChange={handleSoTaiKhoan}
              />
            </div>
            <label for="exampleFormControlTextarea1" class="form-label">
              Chủ tài khoản:
            </label>
            <input
              class="form-control"
              id="id-chu-tai-khoan"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              rows="3"
              required
              onChange={handleNoteReturnsChuTaiKhoan}
            />
            <label for="exampleFormControlTextarea1" class="form-label">
              Số điện thoại hiện tại:
            </label>
            <input
              class="form-control"
              id="id-sdt"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              rows="3"
              type="number"
              required
              // placeholder="Nhập số"
              onChange={handleNoteReturnsSdt}
            />
          </div>
          <button type="submit" class="btn btn-success">
            Xác nhận
          </button>
        </form>
      </Modal>
      <Modal
        visible={isModalVisibleHuyTrahang}
        onCancel={handleCancelHuyTrahang}
        width={550}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <form onSubmit={handleSubmitHuyTrahang}>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Lí do hủy yêu cầu:
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1-1"
              rows="3"
              required
              onChange={handleCanneHuyTraHang}
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success">
            Xác nhận
          </button>
        </form>
      </Modal>
      <Modal
        visible={isModalVisibleReturnedProducts}
        onCancel={handleCannelReturnedProducts}
        width={900}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <label for="exampleFormControlTextarea2" class="form-label">
          Sản phẩm đã trả:
        </label>
        <Row style={{ marginTop: "28px", marginBottom: "10px" }}>
          <input
            // id="id-imeis"
            className="form-control me-2"
            type="search"
            placeholder="Tìm theo imei"
            aria-label="Search"
            name="key"
            onChange={handleChangeSearchDaTra}
          />
        </Row>
        <Table
          rowKey="oop"
          dataSource={dataBillDetails}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `Tổng số ${total} sản phẩm`,
            showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
          }}
        >
          {/* tên sp */}
          <Table.Column
            align="center"
            dataIndex="images"
            title="Ảnh"
            render={(text, record) => (
              <div style={{ textAlign: "center" }}>
                <AvtProduct product={record.productId} />
              </div>
            )}
            width={150}
          />

          {/* tên sp */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Tên Sản Phẩm"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.nameProduct}</p>
                </Form.Item>
              );
            }}
          />
          {/* sumSKU */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Phiên Bản"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>
                    {record.capacity} - {record.color}
                  </p>
                </Form.Item>
              );
            }}
          />
          {/* priceSKU  */}
          <Table.Column
            align="center"
            key="price"
            dataIndex="price"
            title="Giá Bán"
            sorter={(a, b) => a.price - b.price}
            render={(text, record) => {
              return record.price === null ? (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <WarningFilled
                    value={false}
                    style={{
                      color: "#FFCC00",
                    }}
                  />
                  {parseFloat(0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Form.Item>
              ) : (
                <Form.Item name="title" style={{ margin: 0 }}>
                  {parseFloat(record.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Form.Item>
              );
            }}
          />

          {/* sumImeiTrongKho */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Mã Imei"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.codeImei}</p>
                </Form.Item>
              );
            }}
          />
        </Table>
      </Modal>
    </>
  );
};

export default OderCustomerAll;
