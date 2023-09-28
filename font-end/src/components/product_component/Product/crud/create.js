import { useEffect, useState } from "react";
import { useTranslate, useApiUrl } from "@refinedev/core";
import { Create, getValueFromEvent } from "@refinedev/antd";
import { add } from "../../../../service/product.service";
import { addImage } from "../../../../service/image.service";
import QRScanner from "./QRScanner";
import { Option } from "antd/es/mentions";

import {
  readAllColor,
  readAllChip,
  readAllBattery,
  readAllCapacity,
  readAllCategory,
  readAllManufacture,
  readAllRam,
  readAllScreen,
  readAllSize,
} from "../../../../service/product.service";
import {
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Avatar,
  Typography,
  Upload,
} from "antd";
import {
  Link,
  useHistory,
} from "react-router-dom";

const Test = () => {
  const { Text } = Typography;
  const history = useHistory();
  const t = useTranslate();
  const apiUrl = useApiUrl();
  const form = new FormData();
  const [list, setList] = useState({});
  const [startScan, setStartScan] = useState(false);

  const [productData, setProductData] = useState({
    nameProduct: "",
    description: "",
    price: 0,
    category: "",
    battery: "",
    chip: "",
    color: [],
    capacities: [],
    manufacture: "",
    ram: "",
    screen: "",
    size: "",
    isActive: true,
  });

  const handleInputChangeCategory = (value) => {
    setProductData({
      ...productData,
      category: value,
    });
  };

  const handleInputChangeBattery = (value) => {
    setProductData({
      ...productData,
      battery: value,
    });
  };

  const handleInputChangeChip = (value) => {
    setProductData({
      ...productData,
      chip: value,
    });
  };

  const handleInputChangeManufacturer = (value) => {
    setProductData({
      ...productData,
      manufacture: value,
    });
  };
  const handleInputChangeCapacity = (value) => {
    setProductData({
      ...productData,
      capacity: value,
    });
  };
  const handleInputChangeColor = (value) => {
    setProductData({
      ...productData,
      color: value,
    });
  };

  const handleInputChangeRam = (value) => {
    setProductData({
      ...productData,
      ram: value,
    });
  };

  const handleInputChangeScreen = (value) => {
    setProductData({
      ...productData,
      screen: value,
    });
  };

  const handleInputChangeSize = (value) => {
    setProductData({
      ...productData,
      size: value,
    });
  };

  const handleNumberChangePrice = (value) => {
    setProductData({
      ...productData,
      price: value,
    });
  };

  async function handleChangeImage(value) {
    setList(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const items = { ...productData };

    console.log("Dữ liệu sản phẩm:", items);
    await add(items);
    for (let i = 0; i < list.fileList.length; i++) {
      form.append("file", list.fileList[i].originFileObj);
    }
    form.append("name", items.nameProduct);
    await addImage(form);
    history.push("/product/display");
  }

  const [displayColor, setDisplayColor] = useState([]);
  const [displayBattery, setDisplayBattery] = useState([]);
  const [displayCategory, setDisplayCategory] = useState([]);
  const [displayChip, setDisplayChip] = useState([]);
  const [displayManufacture, setDisplayManufacture] = useState([]);
  const [displayRam, setDisplayRam] = useState([]);
  const [displayScreen, setDisplayScreen] = useState([]);
  const [displaySize, setDisplaySize] = useState([]);
  const [displayCapacity, setDisplayCapacity] = useState([]);

  useEffect(() => {
    readAllColor()
      .then((response) => {
        setDisplayColor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    readAllBattery()
      .then((response) => {
        setDisplayBattery(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    readAllCategory()
      .then((response) => {
        setDisplayCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    readAllChip()
      .then((response) => {
        setDisplayChip(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    readAllManufacture()
      .then((response) => {
        setDisplayManufacture(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    readAllRam()
      .then((response) => {
        setDisplayRam(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    readAllScreen()
      .then((response) => {
        setDisplayScreen(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    readAllCapacity()
        .then((response) => {
          setDisplayCapacity(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    readAllSize()
      .then((response) => {
        setDisplaySize(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {!startScan ? "Start Scan" : "Stop Scan"}
      </button>
      {startScan && <QRScanner data={setProductData} />}
      <form onSubmit={handleSubmit}>
        <Create
          resource="products"
          goBack={false}
          contentProps={{
            style: {
              boxShadow: "none",
            },
            bodyStyle: {
              padding: 0,
            },
          }}
        >
          <Form
            layout="vertical"
            initialValues={{
              isActive: true,
            }}
          >
            <Form.Item label={t("Images")}>
              <Form.Item
                name="images"
                valuePropName="fileList"
                getValueFromEvent={getValueFromEvent}
                noStyle
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload.Dragger
                  name="file"
                  listType="picture"
                  accept="image/*"
                  onChange={handleChangeImage}
                >
                  <Space direction="vertical" size={2}>
                    <Avatar
                      style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "256px",
                      }}
                      src="https://example.admin.refine.dev/images/product-default-img.png"
                      alt="Store Location"
                    />
                    <Text
                      style={{
                        fontWeight: 800,
                        fontSize: "16px",
                        marginTop: "8px",
                      }}
                    >
                      Add product description
                    </Text>
                  </Space>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item label={t("Name")} name="nameProduct" rules={[{ required: true }]}>
              <Input
                type="text"
                required
                value={productData.nameProduct || ""}
                onChange={(e) =>
                  setProductData({ ...productData, nameProduct: e.target.value })
                }
                id="nameProduct"
                name="nameProduct"
              />
            </Form.Item>
            <Form.Item
              label={t("Description")}
              name="description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea
                rows={6}
                type="text"
                required
                value={productData.description || ""}
                onChange={(e) =>
                  setProductData({ ...productData, description: e.target.value })
                }
                id="description"
                name="description"
              />
            </Form.Item>
            <Form.Item label={t("Price")} name="price" rules={[{ required: true, type: "number" }]}>
              <InputNumber
                style={{ width: "150px" }}
                min={0}
                type="number"
                required
                name="price"
                value={productData.price}
                onChange={handleNumberChangePrice}
              />
            </Form.Item>
            <Form.Item
              label={t("Category")}
              name={["category", "id"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                name="category"
                value={productData.category}
                onChange={handleInputChangeCategory}
              >
                {displayCategory.map((categories) => {
                  return (
                    <Select.Option key={categories.id} value={categories.name}>
                      {categories.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
                label="Chọn Dung Lượng"
                name="capacity"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ít nhất một dung lượng",
                  },
                ]}
            >
              <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn dung lượng"
                  value={productData.capacity}
                  onChange={handleInputChangeCapacity}
              >
                {displayCapacity.map((cap) => (
                    <Select.Option key={cap.id} value={cap.name}>
                      {cap.name}
                    </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label={t("Battery")} name={["battery", "id"]} rules={[{ required: true }]}>
              <Select
                name="battery"
                value={productData.battery}
                onChange={handleInputChangeBattery}
              >
                {displayBattery.map((battery) => {
                  return <Option value={battery.name}>{battery.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item label={t("Chip")} name={["chip", "id"]} rules={[{ required: true }]}>
              <Select name="chip" value={productData.chip} onChange={handleInputChangeChip}>
                {displayChip.map((chip) => {
                  return <Option value={chip.name}>{chip.name}</Option>;
                })}
              </Select>
            </Form.Item>
            // Trong hàm render return của bạn
            <Form.Item
                label={t("Color")}
                name="color"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ít nhất một màu sắc",
                  },
                ]}
            >
              <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn màu sắc"
                  value={productData.color}
                  onChange={handleInputChangeColor}
              >
                {displayColor.map((color) => (
                    <Select.Option key={color.id} value={color.name}>
                      {color.name}
                    </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={t("Manufacture")}
              name={["manufacture", "id"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                name="manufacture"
                value={productData.manufacture}
                onChange={handleInputChangeManufacturer}
              >
                {displayManufacture.map((manufacture) => {
                  return (
                    <Option value={manufacture.name}>{manufacture.name}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label={t("Ram")} name={["ram", "id"]} rules={[{ required: true }]}>
              <Select name="ram" value={productData.ram} onChange={handleInputChangeRam}>
                {displayRam.map((ram) => {
                  return <Option value={ram.name}>{ram.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item label={t("Screen")} name={["screen", "id"]} rules={[{ required: true }]}>
              <Select
                name="screen"
                value={productData.screen}
                onChange={handleInputChangeScreen}
              >
                {displayScreen.map((screen) => {
                  return <Option value={screen.name}>{screen.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item label={t("Size")} name={["size", "id"]} rules={[{ required: true }]}>
              <Select name="size" value={productData.size} onChange={handleInputChangeSize}>
                {displaySize.map((size) => {
                  return <Option value={size.name}>{size.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item label={t("Active")} name="isActive">
              <Radio.Group>
                <Radio value={true}>Enable</Radio>
                <Radio value={false}>Disable</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Create>
      </form>
    </>
  );
};

export default Test;
