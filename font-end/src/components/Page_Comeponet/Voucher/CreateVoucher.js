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

// const { Text } = Typography;

const CreateVoucher = ({}) => {
  const t = useTranslate();
  const history = useHistory();

  const [voucher, setVoucher] = useState([]);
  // const [editedVoucher, setEditedVoucher] = useState(null);

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

  // async function handleSubmit(event) {
  //     event.preventDefault();

  //     const items = { ...voucher };

  //     if (id !== "new") {
  //       update(id, items);
  //     } else {
  //         add(items);
  //     }

  //     console.log(items);

  //     history.push("/voucher");
  //   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const items = { ...voucher };
//     add(items);
//     history.push("/voucher");
//   }

const handleSubmit = (event) => {
    event.preventDefault();
    const items = { ...voucher };
    // if (editedVoucher) {
    //   // Thực hiện cập nhật nếu editedVoucher tồn tại
    //   update(editedVoucher.id, items)
    //     .then(() => {
    //       // Cập nhật thành công, thực hiện các hành động cần thiết
    //       console.log("Updated successfully");
    //       history.push("/voucher");
    //     })
    //     .catch((error) => {
    //       console.error(`Error updating voucher: ${error}`);
    //     });
    // } else {
      // Thực hiện thêm mới nếu không có editedVoucher
      add(items)
        .then(() => {
          // Thêm mới thành công, thực hiện các hành động cần thiết
          notification.success({
            message: "SAVE VOUCHER",
            description: "Added Voucher successfully",
          });
          history.push("/voucher");
          return {
            success: true,
          };
        })
        .catch((error) => {
          console.error(`Error adding voucher: ${error}`);
        });
    // }
  };
  

  // const { id } = useParams();

  // const title = (
  //     <div className="text">{id !== "new" ? "Edit Voucher" : "Add Voucher"}</div>
  //   );

  //   useEffect(() => {
  //     if (id !== "new") {
  //       detail(id)
  //         .then((response) => {
  //             setVoucher(response.data);
  //           console.log(voucher);
  //         })
  //         .catch((error) => {
  //           console.log(`${error}`);
  //         });
  //     }
  //   }, []);

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
                type="number"
                required
                value={voucher.quantity || ""}
                onChange={handleChange}
                id="quantity"
                name="quantity"
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
