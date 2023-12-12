import React, { useEffect, useState } from "react";
import {
  readAll,
  add,
  detail,
  update,
} from "../../../service/Voucher/voucher.service";
import { useTranslate } from "@refinedev/core";
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Image,
  Button,
  notification,
  InputNumber,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
  // Link,
  useHistory,
  // useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";

const UpdateVoucher = ({ editedVoucher }) => {
  const t = useTranslate();
  const history = useHistory();

  const [voucher, setVoucher] = useState([]);
  const [voucherCreate, setVoucherCreate] = useState([]);
  const [renDateStart, setRenDateStart] = useState([]);
  const [renDateEnd, setRenDateEnd] = useState([]);

  useEffect(() => {
    if (editedVoucher && editedVoucher.id) {
      detail(editedVoucher.id)
        .then((response) => {
          setVoucher(response.data);
          console.log(response.data);
          // Lấy năm, tháng và ngày từ mảng
          const year = response.data.dateStart[0];
          const month = response.data.dateStart[1]?.toString().padStart(2, "0");
          const day = response.data.dateStart[2]?.toString().padStart(2, "0");
          setRenDateStart(`${year}-${month}-${day}`);
          setVoucher((prevVoucher) => ({
            ...prevVoucher,
            dateStart: `${year}-${month}-${day}`,
          }));
          // Lấy năm, tháng và ngày từ mảng
          const yearEnd = response.data.dateEnd[0];
          const monthEnd = response.data.dateEnd[1]?.toString().padStart(2, "0");
          const dayEnd = response.data.dateEnd[2]?.toString().padStart(2, "0");
          setRenDateEnd(`${yearEnd}-${monthEnd}-${dayEnd}`);
          setVoucher((prevVoucher) => ({
            ...prevVoucher,
            dateEnd: `${year}-${month}-${day}`,
          }));
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
    readAll()
      .then((response) => {
        console.log(response.data);
        setVoucherCreate(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [editedVoucher]);

  function handleChangeDatePicker(value, name) {
    setVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: value,
    }));
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...voucher };
    item[name] = value;
    setVoucher(item);
  }

  function handleChangeNumber(value) {
    setVoucher({
      ...voucher,
      quantity: value,
    });
  }

  function handleChangeValueVoucher(value) {
    setVoucher({
      ...voucher,
      valueVoucher: value,
    });
  }

  function handleChangeValueMinimum(value) {
    setVoucher({
      ...voucher,
      valueMinimum: value,
      valueMaximum: 0,
    });
  }

  function handleChangeValueMaximum(value) {
    setVoucher({
      ...voucher,
      valueMaximum: value,
    });
  }

  function handleStartDateChange(event) {
    const startDate = dayjs(event.target.value);
    const endDate = dayjs(renDateEnd); 
    if (startDate >= endDate) {
      notification.error({
        message: "CẬP NHẬT VOUCHER",
        description: "Ngày bắt đầu không được lớn hơn hoặc bằng ngày kết thúc",
      });
      return;
    }
  
    handleChangeDatePicker(event.target.value, "dateStart");
  }
  
  function handleEndDateChange(event) {
    const endDate = dayjs(event.target.value);
    const startDate = dayjs(renDateStart);
    if (endDate <= startDate) {
      notification.error({
        message: "CẬP NHẬT VOUCHER",
        description: "Ngày kết thúc không được nhỏ hơn hoặc bằng ngày bắt đầu",
      });
      return;
    }
  
    handleChangeDatePicker(event.target.value, "dateEnd");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const items = { ...voucher };
    const { valueMinimum, valueMaximum } = items;
    const endDate1 = dayjs(document.getElementById('dateStart').value);
    const startDate1 = dayjs(renDateStart);
    const endDate2 = dayjs(document.getElementById('dateEnd').value);
    const startDate2 = dayjs(renDateStart);
    // if (valueMinimum > valueMaximum) {
    //   notification.error({
    //     message: "SAVE VOUCHER",
    //     description: "Giá trị nhỏ nhất không được lớn hơn giá trị lớn nhất",
    //   });
    //   return;
    // }else 
    if(startDate1 >= endDate1){
      notification.error({
        message: "SAVE VOUCHER",
        description: "Vui lòng kiểm tra lại ngày bắt đầu",
      });
      return;
    }else if(endDate2 <= startDate2){
      notification.error({
        message: "SAVE VOUCHER",
        description: "Vui lòng kiểm tra lại ngày kết thúc",
      });
      return;
    }
    update(editedVoucher.id, items)
      .then(() => {
        // Cập nhật thành công, thực hiện các hành động cần thiết
        window.location.reload();
        notification.success({
          message: "UPDATE VOUCHER",
          description: "Update Voucher successfully",
        });
        history.push("/voucher", items);
        return {
          success: true,
        };
      })
      .catch((error) => {
        console.error(`Error updating voucher: ${error}`);
      });
  };

  const dateStart = dayjs(voucher.dateStart);
  const dateEnd = dayjs(voucher.dateEnd);

  // Hàm kiểm tra ngày
  function disabledDate(current, type) {
    if (type === "start") {
      // Chặn ngày trước ngày hiện tại
      const today = moment().startOf("day");
      return current && current < today;
    }
    if (type === "end") {
      // Chặn ngày bé hơn ngày bắt đầu
      // const { dateStart } = voucher;
      // const oneDayAfterStart = moment(dateStart).add(1, 'day');
      // const today = moment().startOf('day');
      // return current && (current < oneDayAfterStart || current < today);
      const today = moment().startOf("day");
      return current && current < today;
    }
    return false;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form
        layout="vertical"
        dataSource={voucher}
        initialValues={{
          isActive: true,
        }}
      >
        <Row gutter={[64, 0]} wrap>
          <Col xs={24} lg={8}>
            <label
              style={{
                paddingTop: "5px",
              }}
            >
              Mã Voucher
            </label>
            <Input
              disabled
              type="text"
              required
              value={voucher.code}
              onChange={handleChange}
              id="code"
              name="code"
            />

            <label
              style={{
                paddingTop: "20px",
              }}
            >
              Tên
            </label>
            <Input
              type="text"
              required
              value={voucher.name}
              onChange={handleChange}
              id="name"
              name="name"
            />

            {/* <Form.Item
              label={t("Ngày bắt đầu")}
              name="dateStart"
              style={{
                paddingTop: "20px",
              }}
              rules={[
                {
                  required: true,
                },
              ]}
            > */}
              {/* <DatePicker
                type="text"
                disabledDate={(current) => disabledDate(current, "start")}
                required
                defaultValue={dateStart.locale("vi-VN")}
                onChange={(date, dateString) =>
                  handleChangeDatePicker(dateString, "dateStart")
                }
                id="dateStart"
                name="dateStart"
              /> */}
              <label class="small mb-1" for="inputBirthday" style={{marginTop: "20px"}}>
                Ngày bắt đầu
              </label>
              <input
                required
                class="form-control"
                id="dateStart"
                type="date"
                name="dateStart"
                onChange={handleStartDateChange}
                defaultValue={renDateStart}
                min={dayjs().format("YYYY-MM-DD")}
              />
            {/* </Form.Item> */}

            {/* <Form.Item
              label={t("Ngày kết thúc")}
              name="dateEnd"
              rules={[
                {
                  required: true,
                },
              ]}
            > */}
              {/* <DatePicker
                type="text"
                disabledDate={(current) => disabledDate(current, "end")}
                required
                defaultValue={dateEnd.locale("vi-VN")}
                onChange={(date, dateString) =>
                  handleChangeDatePicker(dateString, "dateEnd")
                }
                id="dateEnd"
                name="dateEnd"
              /> */}
              <label class="small mb-1" for="inputBirthday" style={{marginTop: "20px"}}>
                Ngày kết thúc
              </label>
              <input
                required
                class="form-control"
                id="dateEnd"
                type="date"
                name="dateEnd"
                onChange={handleEndDateChange}
                defaultValue={renDateEnd}
                min={dayjs().format("YYYY-MM-DD")}
              />
            {/* </Form.Item> */}
          </Col>
          <Col xs={24} lg={8}>
            <label
              style={{
                paddingTop: "20px",
              }}
            >
              Số lượng
            </label>
            <InputNumber
              style={{ width: "300px" }}
              id="quantity"
              name="quantity"
              type="number"
              min={0}
              required
              value={voucher.quantity || ""}
              onChange={handleChangeNumber}
            />

            {/* <label
              style={{
                paddingTop: "20px",
              }}
            >
              Conditions Apply
            </label>
            <Input
              type="number"
              required
              value={voucher.conditionsApply}
              onChange={handleChange}
              id="conditionsApply"
              name="conditionsApply"
            /> */}

            <label
              style={{
                paddingTop: "20px",
              }}
            >
              Giá trị Voucher
            </label>
            <InputNumber
              style={{ width: "300px" }}
              type="number"
              min={0}
              required
              value={voucher.valueVoucher || ""}
              onChange={handleChangeValueVoucher}
              id="valueVoucher"
              name="valueVoucher"
            />

            <label
              style={{
                paddingTop: "20px",
              }}
            >
              Giá trị đơn hàng tối hiểu
            </label>
            <InputNumber
              style={{ width: "300px" }}
              type="number"
              min={0}
              required
              value={voucher.valueMinimum || ""}
              onChange={handleChangeValueMinimum}
              id="valueMinimum"
              name="valueMinimum"
            />

            

            {/* <label
              style={{
                paddingTop: "20px",
              }}
            >
              Type Voucher
            </label>
            <Input
              type="number"
              required
              value={voucher.typeVoucher}
              onChange={handleChange}
              id="typeVoucher"
              name="typeVoucher"
            /> */}
          </Col>
          <Col xs={24} lg={8}>
            <Image
              style={{
                width: "300px",
                paddingTop: "80px",
                paddingRight: "30px",
              }}
              src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_12.png"
            />
          </Col>
        </Row>
      </Form>
      {/* </Create> */}
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        style={{
          marginTop: "20px",
        }}
        // block
      >
        {t("UPDATE")}
      </Button>
    </form>
  );
};
export default UpdateVoucher;
