import React, { useEffect, useState, useRef } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AvtProduct from "../../custumer_componet/avtProduct";
import {
  readAll,
  getAllBillDetail,
  yeuCauTraHang,
  checkBillTraHang,
  traTatCaSanPham,
  khachHangHuyYeuCauTraHang,
} from "../../../service/BillDetail/billDetailCustomer.service";
import { readAllById } from "../../../service/Bill/billCustomer.service";
import {
  deleteBillById,
  returnBillById,
} from "../../../service/Bill/bill.service";
import {
  Avatar,
  Modal,
  Select,
  notification,
  Table,
  Form,
  Checkbox,
  Input,
  Row,
} from "antd";
import {
  WarningFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
const { Option } = Select;

const OderUserAll = () => {
  const [billDetails, setBillDetails] = useState([]);
  const [bills, setBills] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    readAllById(storedUser?.id)
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
  }, [bills]);

  const result = bills.map((b, index) => {
    const completionDate = new Date(b.completionDate);
    const yearStart = completionDate.getFullYear();
    const monthStart = completionDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const dayStart = completionDate.getDate();
    const formattedDateStart = `${yearStart}-${monthStart
      .toString()
      .padStart(2, "0")}-${dayStart.toString().padStart(2, "0")}`;
    // Ngày hoàn thành đơn hàng
    const ngayHoanThanh = new Date(formattedDateStart);

    // Ngày hiện tại
    const dateNow = new Date();
    const yearStart1 = dateNow.getFullYear();
    const monthStart1 = dateNow.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const dayStart1 = dateNow.getDate();
    const formattedDateStart1 = `${yearStart1}-${monthStart1
      .toString()
      .padStart(2, "0")}-${dayStart1.toString().padStart(2, "0")}`;
    const ngayHienTai = new Date(formattedDateStart1);
    // Tính khoảng cách giữa hai ngày
    const khoangCachNgay = Math.floor(
      (ngayHienTai - ngayHoanThanh) / (1000 * 60 * 60 * 24)
    );
    return (
      <>
        <div>
          <Row>
            <div className="col-10" style={{ paddingTop: "20px" }}>
              <strong>AppleTenStore</strong>{" "}
            </div>
            <div className="col-2">
              <span
                style={{ paddingTop: "20px", float: "right", color: "red" }}
              >
                {b.statusBill === "CHO_XAC_NHAN"
                  ? "Chờ xác nhận"
                  : b.statusBill === "CHO_VAN_CHUYEN"
                  ? "Chờ vận chuyển"
                  : b.statusBill === "VAN_CHUYEN"
                  ? "Vận chuyển"
                  : b.statusBill === "DA_THANH_TOAN"
                  ? "Hoàn thành"
                  : b.statusBill === "TRA_HANG"
                  ? "Trả hàng"
                  : "Đã hủy"}
              </span>
            </div>
          </Row>
        </div>
        <hr />
        {billDetails[index]?.map((bd) => {
          return (
            <div>
              <Row>
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
                    {bd.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </Row>
            </div>
          );
        })}
        <hr />
        <div>
          <Row>
            <div className="col-6">
              {b.statusBill === "CHO_XAC_NHAN" ? (
                <p>
                  Sản phẩm sẽ được giao trước ngày <u>23-07-2003</u>
                </p>
              ) : b.statusBill === "CHO_VAN_CHUYEN" ? (
                <p>
                  Dự kiến giao hàng ngày <u>23-07-2003</u>
                </p>
              ) : b.statusBill === "VAN_CHUYEN" ? (
                <p>
                  Dự kiến giao hàng ngày <u>23-07-2003</u>
                </p>
              ) : b.statusBill === "DA_THANH_TOAN" ? (
                <p>
                  Ngày hoàn thành đơn hàng <u>{formattedDateStart}</u>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-6">
              <span style={{ float: "right" }}>
                Thành tiền:{" "}
                {b.totalMoney.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <br />
              <br />
              <div style={{ float: "right" }}>
                <button type="button" class="btn btn-danger">
                  Liên hệ người bán
                </button>{" "}
                {b.statusBill === "CHO_XAC_NHAN" ? (
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => handleCannelOrderClick(b)}
                  >
                    Hủy đơn
                  </button>
                ) : b.statusBill === "CHO_VAN_CHUYEN" ? (
                  ""
                ) : b.statusBill === "VAN_CHUYEN" ? (
                  ""
                ) : b.statusBill === "DA_THANH_TOAN" ||
                  (b.statusBill === "YEU_CAU_TRA_HANG" &&
                    khoangCachNgay <= 3) ? (
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => handleNoteReturnsClick(b)}
                  >
                    Trả hàng
                  </button>
                ) : (
                  <button type="button" class="btn btn-light">
                    Mua lại
                  </button>
                )}
              </div>
            </div>
          </Row>
        </div>
        <hr />
      </>
    );
  });

  const [isModalVisibleCannelOrder, setIsModalVisibleCannelOrder] =
    useState(false);

  const [billReturn, setBillReturn] = useState({
    id: null,
    note: null,
  });

  const handleCannelOrderClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.id,
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
    notification.error({
      message: "Hủy đơn",
      description: "Hủy đơn thành công",
    });
  };
  // phongnh
  const [isModalVisibleXemHoaDonChiTiet, setIsModalVisibleXemHoaDonChiTiet] =
    useState(false); // Trạng thái hiển thị Modal

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

  const [dataBillDetails, setDataBillDetails] = useState([]); // lisst bill detail cuar idbill
  const [dataCheckBill, setCheckDataBill] = useState(true); // check bill da tra hang lan nao hay chua
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); //list id imei da ban

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
  // Sử dụng useEffect để theo dõi thay đổi của selectedCheckboxes và in giá trị mới
  // useEffect(() => {
  //   console.log(selectedCheckboxes + " :imei da ban ++--");
  // }, [selectedCheckboxes]);

  //nút trả hàng - phongnh *
  const toast = useRef(null);
  const handleNoteReturnsClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.id,
    });
    checkBillTraHang(record.id)
      .then((res) => {
        setCheckDataBill(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBillDetail(record.id)
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

  //huy chon check box
  const huyChonCheckBox = () => {
    setSelectedCheckboxes([]);
  };
  const [isModalVisibleNoteReturns, setIsModalVisibleNoteReturns] =
    useState(false); // Trạng thái hiển thị Modal

  const handleOpenNoteReturnsCancel = () => {
    setIsModalVisibleNoteReturns(true);
    // In ra danh sách id
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
  const rejectTraHang = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục mua sắm.",
      life: 3000,
    });
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

  //tra tat ca
  const [dataTraTatCaSP, setDataTraTatCaSP] = useState([]);
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

  const [idNganHang, setIdNganHang] = useState();

  function returnBill(id, noteReturn) {
    returnBillById(id, null, noteReturn).then((response) =>
      console.log(response.data)
    );
  }
  // phongnh 1
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
  const [selectNganHang, setSelectNganHang] = useState(null);

  // phongnh 2
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

  // phongnh 3
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

  // phongnh 4
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

  // phongnh 5
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
  // phongnh
  const [isModalVisibleHuyTrahang, setIsModalVisibleHuyTrahang] =
    useState(false); // Trạng thái hiển thị Modal

  // Hàm để mở Modal
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

  // onClick={() => confirmHuyTraHang()}

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

  return (
    <>
      <Header />
      <Toast ref={toast} />
      <ConfirmDialog />
      <br />
      <section>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/oderUserAll">
              Tất cả
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/oderUserCTT">
              Chờ xác nhận
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/oderUserCVC">
              Chờ vận chuyển
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
            <Link class="nav-link" to="/oderUserDH">
              Đã hủy
            </Link>
          </li>
        </ul>
      </section>
      <section
        style={{
          position: "relative",
          maxHeight: 400,
          width: "1200px",
          overflowY: "auto",
        }}
      >
        {result}
      </section>
      <br />
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
            placeholder="Search"
            aria-label="Search"
            name="key"
            // onChange={handleChangeImeis}
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
      {/* isModalVisibleHuyTrahang */}
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
              Lí do hủy đơn:
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
    </>
  );
};
export default OderUserAll;
