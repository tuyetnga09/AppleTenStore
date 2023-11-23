import React, { useEffect, useState } from "react";
import { readAll,add, detail, update } from "../../../service/Voucher/voucher.service";
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
  Button, notification, Modal
} from "antd";
// import {
//     SaveOutlined
//   } from '@ant-design/icons';
import {
  // Link,
  useHistory,
  // useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import moment from 'moment';

const CreateVoucher = ({}) => {
  const t = useTranslate();
  const history = useHistory();

  const [voucher, setVoucher] = useState([]);
  const [voucherCreate, setVoucherCreate] = useState([]);

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


  const handleSubmit = (event) => {
    event.preventDefault();
    const items = { ...voucher };
    const newCode = items.code;
    const newName = items.name;
    const { valueMinimum, valueMaximum } = items;
    const voucherCodes = new Set();
    const voucherNames = new Set();
    // Kiểm tra trùng lặp khi thêm mới hoặc chỉnh sửa
    for (let i = 0; i < voucherCreate.length; i++) {
      const { code, name } = voucherCreate[i];
      voucherCodes.add(code);
      voucherNames.add(name);
    }
    if (voucherCodes.has(newCode) || voucherNames.has(newName)) {
      notification.error({
        message: "SAVE VOUCHER",
        description: "Vui lòng kiểm tra lại dữ liệu nhập vào",
      });
      return;
    }
    if (valueMinimum > valueMaximum) {
      notification.error({
        message: "SAVE VOUCHER",
        description: "Giá trị nhỏ nhất không được lớn hơn giá trị lớn nhất",
      });
      return;
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
    if (type === 'start') {
      // Chặn ngày trước ngày hiện tại
      const today = moment().startOf('day');
      return current && current < today;
    }
    if (type === 'end') {
      // Chặn ngày bé hơn ngày bắt đầu
      const { dateStart } = voucher; 
      const oneDayAfterStart = moment(dateStart).add(1, 'day');
      const today = moment().startOf('day');
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
              label={t("Code")}
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
              label={t("Name")}
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
              label={t("Date Start")}
              name="dateStart"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                type="text"
                disabledDate={current => disabledDate(current, 'start')}
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
              label={t("Date End")}
              name="dateEnd"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                type="text"
                disabledDate={current => disabledDate(current, 'end')}
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
              label={t("Quantity")}
              name="quantity"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={0}
                required
                value={voucher.quantity || ""}
                onChange={handleChange}
                onBlur={(event) => {
                  if (event.target.value <= 0) {
                    const quantity = document.getElementById(`quantity`);
                    quantity.value = 0;
                  }
                }}
              />
            </Form.Item>
            <Form.Item
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
            </Form.Item>
            <Form.Item
              label={t("Value Voucher")}
              name="valueVoucher"
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
                value={voucher.valueVoucher || ""}
                onChange={handleChange}
                id="valueVoucher"
                name="valueVoucher"
              />
            </Form.Item>
            <Form.Item
              label={t("Value Minimum")}
              name="valueMinimum"
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
                value={voucher.valueMinimum || ""}
                onChange={handleChange}
                id="valueMinimum"
                name="valueMinimum"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={8}>
            <Form.Item
              label={t("Value Maximum")}
              name="valueMaximum"
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
                value={voucher.valueMaximum || ""}
                onChange={handleChange}
                id="valueMaximum"
                name="valueMaximum"
              />
            </Form.Item>
            <Form.Item
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
            </Form.Item>

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
