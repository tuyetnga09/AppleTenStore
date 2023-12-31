import React, { useEffect, useState } from "react";
import {
  readAll,
  add,
  detail,
  update,
} from "../../../service/Voucher/voucher.service";
import { useTranslate } from "@refinedev/core";
// import { Create, useForm } from "@refinedev/antd";
import {
  Form,
  Input,
  Row,
  Col,
  // Typography,
  DatePicker,
  Image,
  Button,
  notification,
  Modal,
  InputNumber,
  Select,
} from "antd";
// import {
//     SaveOutlined
//   } from '@ant-design/icons';
import {
  // Link,
  useHistory,
  // useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";

const CreateVoucher = ({}) => {
  const t = useTranslate();
  const history = useHistory();

  const [voucher, setVoucher] = useState([]);
  const [voucherCreate, setVoucherCreate] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showCashInput, setShowCashInput] = useState(false);
  const [showTransferInput, setShowTransferInput] = useState(false);

  useEffect(() => {
    readAll()
      .then((response) => {
        console.log(response.data);
        setVoucherCreate(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);

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

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues); // Cập nhật state khi có sự thay đổi trong việc chọn option

    // Kiểm tra nếu "cash" nằm trong danh sách lựa chọn
    if (selectedValues.includes("0")) {
      setShowCashInput(true);
    } else {
      setShowCashInput(false);
    }

    // Kiểm tra nếu "transfer" nằm trong danh sách lựa chọn
    if (selectedValues.includes("1")) {
      setShowTransferInput(true);
    } else {
      setShowTransferInput(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const items = { ...voucher };
    const newCode = items.code;
    const newName = items.name;
    const { valueMinimum, valueMaximum, dateStart, dateEnd,valueVoucher } = items;
    const voucherCodes = new Set();
    const voucherNames = new Set();
    // Kiểm tra trùng lặp khi thêm mới hoặc chỉnh sửa
    for (let i = 0; i < voucherCreate.length; i++) {
      const { code, name } = voucherCreate[i];
      voucherCodes.add(code);
      voucherNames.add(name);
    }
    if (
      items.code == null ||
      items.name == null ||
      items.dateStart == null ||
      items.valueVoucher == null ||
      items.valueMinimum == null
    ) {
      notification.error({
        message: "SAVE VOUCHER",
        description: "Vui lòng không để trống dữ liệu",
      });
      return;
    }
    if (voucherCodes.has(newCode) || voucherNames.has(newName)) {
      notification.error({
        message: "SAVE VOUCHER",
        description: "Vui lòng kiểm tra lại dữ liệu nhập vào",
      });
      return;
    }
    // if (valueMinimum > valueMaximum) {
    //   notification.error({
    //     message: "SAVE VOUCHER",
    //     description: "Giá trị nhỏ nhất không được lớn hơn giá trị lớn nhất",
    //   });
    //   return;
    // }
    if(selectedOptions == null || selectedOptions == "" ){
        notification.error({
          message: "SAVE VOUCHER",
          description: "Vui lòng chọn loại Voucher",
        });
        return;
    }
    if(selectedOptions == 0){
      //freeship
      if(valueVoucher >= 100000){
        notification.error({
          message: "SAVE VOUCHER",
          description: "Giá trị Voucher FreeShip không được vượt quá 100.000 vnđ",
        });
        return;
      }
    }
    if(selectedOptions == 1){
      //giảm giá
      if(valueVoucher < 100000){
        notification.error({
          message: "SAVE VOUCHER",
          description: "Giá trị Voucher Giảm giá không được nhỏ hơn 100.000 vnđ",
        });
        return;
      }
    }

    // Kiểm tra và thiết lập ngày kết thúc nếu không được cung cấp
    if (!dateEnd) {
      const oneYearLater = new Date(dateStart);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

      items.dateEnd = oneYearLater.toISOString().split("T")[0];
    }

    // Tiếp tục với logic thêm mới hoặc chỉnh sửa
    add(items)
      .then(() => {
        // Thực hiện các hành động khi thêm voucher thành công
        window.location.reload();
        notification.success({
          message: "SAVE VOUCHER",
          description: "Added Voucher successfully",
        });
        history.push("/voucher", items);
        return {
          success: true,
        };
      })
      .catch((error) => {
        console.error(`Error adding voucher: ${error}`);
      });
  };

  // Hàm kiểm tra ngày
  function disabledDate(current, type) {
    if (type === "start") {
      // Chặn ngày trước ngày hiện tại
      const today = moment().startOf("day");
      return current && current < today;
    }
    if (type === "end") {
      // Chặn ngày bé hơn ngày bắt đầu
      const { dateStart } = voucher;
      const oneDayAfterStart = moment(dateStart).add(1, "day");
      const today = moment().startOf("day");
      return current && (current < oneDayAfterStart || current < today);
    }
    return false;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <Create title={title}> */}
      <Form
        layout="vertical"
        initialValues={{
          isActive: true,
        }}
      >
        <Row gutter={[64, 0]} wrap>
          <Col xs={24} lg={6}>
            {/* <Image
                                style={{
                                    width: "100%",
                                }}
                                src="https://help.turitop.com/hc/article_attachments/360007926459/voucher.png"
                            /> */}
            <Form.Item
              label={t("Mã Voucher")}
              name="code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="text"
                required
                value={voucher.code || ""}
                onChange={handleChange}
                id="code"
                name="code"
              />
            </Form.Item>
            <Form.Item
              label={t("Tên")}
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="text"
                required
                value={voucher.name || ""}
                onChange={handleChange}
                id="name"
                name="name"
              />
            </Form.Item>

            <Form.Item
              label={t("Ngày bắt đầu	")}
              name="dateStart"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                type="text"
                disabledDate={(current) => disabledDate(current, "start")}
                required
                value={voucher.dateStart || ""}
                onChange={(date, dateString) =>
                  handleChangeDatePicker(dateString, "dateStart")
                }
                id="dateStart"
                name="dateStart"
              />
            </Form.Item>

            <Form.Item
              label={t("Ngày kết thúc	")}
              name="dateEnd"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                type="text"
                disabledDate={(current) => disabledDate(current, "end")}
                required
                value={voucher.dateEnd || ""}
                onChange={(date, dateString) =>
                  handleChangeDatePicker(dateString, "dateEnd")
                }
                id="dateEnd"
                name="dateEnd"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={8}>
            <Form.Item
              label={t("Số lượng")}
              name="quantity"
              rules={[{ required: true, type: "number" }]}
            >
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
            </Form.Item>
            {/* <Form.Item
              label={t("Conditions Apply")}
              name="conditionsApply"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="number"
                min={0}
                required
                value={voucher.conditionsApply || ""}
                onChange={handleChange}
                id="conditionsApply"
                name="conditionsApply"
              />
            </Form.Item> */}
            <Form.Item
              label={t("Giá trị Voucher	")}
              name="valueVoucher"
              rules={[{ required: true, type: "number" }]}
            >
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
            </Form.Item>
            <Form.Item
              label={t("Giá trị đơn hàng tối thiểu	")}
              name="valueMinimum"
              rules={[{ required: true, type: "number" }]}
            >
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
            </Form.Item>
            <Form.Item
              label={t("* Loại Voucher	")}
              name="Loại Voucher"
            >
              <Select
                mode="single"
                style={{ width: "300px" }}
                value={selectedOptions} // Đặt giá trị được chọn dựa trên state
                onChange={handleSelectChange} // Sử dụng hàm xử lý sự kiện
              >
                <Select.Option value="0">FreeShip</Select.Option>
                <Select.Option value="1">Giảm giá</Select.Option>
              </Select>
            </Form.Item>
            {/* <p>{selectedOptions}</p> */}
            {/*<Form.Item*/}
            {/*  label={t("Giá trị đơn hàng tối đa")}*/}
            {/*  name="valueMaximum"*/}
            {/*  rules={[{ required: true, type: "number" }]}*/}
            {/*>*/}
            {/*  <InputNumber*/}
            {/*    style={{ width: "300px" }}*/}
            {/*    type="number"*/}
            {/*    min={0}*/}
            {/*    required*/}
            {/*    value={voucher.valueMaximum || ""}*/}
            {/*    onChange={handleChangeValueMaximum}*/}
            {/*    id="valueMaximum"*/}
            {/*    name="valueMaximum"*/}
            {/*  />*/}
            {/*</Form.Item>*/}
          </Col>
          <Col xs={24} lg={8}>
            {/* <Form.Item
              label={t("Type Voucher")}
              name="typeVoucher"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="number"
                min={0}
                required
                value={voucher.typeVoucher || ""}
                onChange={handleChange}
                id="typeVoucher"
                name="typeVoucher"
              />
            </Form.Item> */}

            <Image
              style={{
                width: "200px",
              }}
              src="https://help.turitop.com/hc/article_attachments/360007926459/voucher.png"
            />
          </Col>
        </Row>
      </Form>
      {/* </Create> */}
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        // block
      >
        {t("SAVE")}
      </Button>
    </form>
  );
};
export default CreateVoucher;
