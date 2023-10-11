import React from "react";
import { useEffect, useState } from "react";
import { detail, update } from "../../../../service/product.service";
import { notification, Modal } from "antd";
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
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Upload,
  Avatar,
  Typography,
  Grid,
} from "antd";
import { Create, getValueFromEvent, useSelect } from "@refinedev/antd";
import { useTranslate, useApiUrl, BaseKey } from "@refinedev/core";
import { color } from "@mui/system";

const { Text } = Typography;

const EditProduct = ({
  drawerProps,
  formProps,
  saveButtonProps,
  editId,
  product,
  onRequestClose,
}) => {
  const [productData, setProductData] = useState({
    nameProduct: "",
    description: "",
    price: 0,
    category: "",
    battery: "",
    chip: "",
    color: [],
    capacities: [],
    manufacturer: "",
    ram: "",
    screen: "",
    size: "",
  });

  const t = useTranslate();
  const apiUrl = useApiUrl();
  const breakpoint = Grid.useBreakpoint();

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // let item = { ...productData, price: 0 };
    let item = { ...productData };
    item[name] = value;
    setProductData(item);
    console.log(value);
    console.log(productData);
  }

  const history = useHistory();
  const [displayColor, setDisplayColor] = useState([]);
  const [displayChip, setDisplayChip] = useState([]);
  const [displayBattery, setDisplayBattery] = useState([]);
  const [displayCapacity, setDisplayCapacity] = useState([]);
  const [displayCategory, setDisplayCategory] = useState([]);
  const [displayManufacture, setDisplayManufacture] = useState([]);
  const [displayRam, setDisplayRam] = useState([]);
  const [displayScreen, setDisplayScreen] = useState([]);
  const [displaySize, setDisplaySize] = useState([]);

  useEffect(() => {
    if (product.id !== "new") {
      detail(product.id)
        .then((response) => {
          setProductData(response.data);
          //   console.log(productData);
          console.log(response.data);
          console.log("hihihi" + product.id + " hôhhohoho");
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
    //1
    readAllColor()
      .then((response) => {
        console.log(response.data);
        setDisplayColor(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //2
    readAllChip()
      .then((response) => {
        console.log(response.data);
        setDisplayChip(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //3
    readAllBattery()
      .then((response) => {
        console.log(response.data);
        setDisplayBattery(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //4
    readAllCapacity()
      .then((response) => {
        console.log(response.data);
        setDisplayCapacity(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //5
    readAllCategory()
      .then((response) => {
        console.log(response.data);
        setDisplayCategory(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //6
    readAllManufacture()
      .then((response) => {
        console.log(response.data);
        setDisplayManufacture(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //7
    readAllRam()
      .then((response) => {
        console.log(response.data);
        setDisplayRam(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //8
    readAllScreen()
      .then((response) => {
        console.log(response.data);
        setDisplayScreen(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //9
    readAllSize()
      .then((response) => {
        console.log(response.data);
        setDisplaySize(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [product.id]);

  async function handleSubmit(event) {
    event.preventDefault();
    const items = { ...productData };
    // const items = { ...product };

    // Đây là nơi bạn có thể gửi dữ liệu sản phẩm (productData) lên máy chủ hoặc thực hiện bất kỳ xử lý nào bạn cần.
    console.log("Dữ liệu sản phẩm: ------ update", items);
    update(product.id, items);
    // history.push("/product/display", items);
    // window.location.reload();
    notification.success({
      message: "Updated",
      description: "Updated successfully",
    });
    return {
      success: true,
    };
  }

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

  const handleInputChangeCapacity = (value) => {
    setProductData({
      ...productData,
      capacity: value,
    });
  };
  const handleInputChangeChip = (value) => {
    setProductData({
      ...productData,
      chip: value,
    });
  };
  const handleInputChangeColor = (value) => {
    setProductData({
      ...productData,
      color: value,
    });
    console.log("Giá trị hợp lệ " + value);
  };

  const handleInputChangeManufacturer = (value) => {
    setProductData({
      ...productData,
      manufacturer: value,
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
    // Giá trị mới sẽ được truyền vào hàm này
    // Cập nhật giá trị trong state

    setProductData({
      ...productData,
      price: value,
    });
  };

  return (
    // <Drawer
    //   {...drawerProps}
    //   width={breakpoint.sm ? "500px" : "100%"}
    //   zIndex={1001}
    // >
    <form onSubmit={handleSubmit}>
      <Create
        resource="products"
        // saveButtonProps={saveButtonProps}

        goBack={false}
        contentProps={{
          style: {
            boxShadow: "none",
          },
          bodyStyle: {
            padding: 0,
          },
        }}
        // saveButtonProps={(onclick = test)}
      >
        <Form
          //   {...formProps}
          layout="vertical"
          initialValues={{
            isActive: true,
          }}
          // id="test"
        >
          <Form.Item
            // label={t("products.fields.images.label")}
            label={t("Images")}
          >
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
                action={`${apiUrl}/image/save`}
                listType="picture"
                maxCount={1}
                accept=".png"
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
                    {/* {t("products.fields.images.description")} */}
                    Add Product
                  </Text>
                  <Text style={{ fontSize: "12px" }}>
                    {/* {t("products.fields.images.validation")} */}
                    must be 1080x1080 px
                  </Text>
                </Space>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item
            // label={t("products.fields.name")}
            label={t("Name")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="text"
              required
              value={productData.nameProduct || ""}
              onChange={handleChange}
              id="nameProduct"
              name="nameProduct"
            />
          </Form.Item>
          <Form.Item
            // label={t("products.fields.description")}
            label={t("Description")}
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
              onChange={handleChange}
              id="description"
              name="description"
            />
          </Form.Item>
          <Form.Item
            // label={t("products.fields.price")}
            label={t("Price")}
            rules={[
              {
                required: true,
                type: "number",
              },
            ]}
          >
            <InputNumber
              //   formatter={(value) => `$ ${value}`}
              style={{ width: "150px" }}
              min={0}
              type="number"
              required
              name="price"
              value={productData.price}
              onChange={handleNumberChangePrice}
              // id="price"
            />
          </Form.Item>
          <Form.Item
            // label={t("products.fields.category")}
            label={t("Category")}
            // name={["category", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "left",
              clear: "both",
            }}
          >
            {/* <Select
              name="category"
              value={productData.category}
              onChange={handleInputChangeCategory}
            >
              {displayCategory.map((categories) => {
                <Option>{categories.name}</Option>;
                return (
                  <Option value={categories.name}>{categories.name}</Option>
                );
              })}
            </Select> */}
            <Select
              defaultValue={product?.idcategory?.name}
              name="idcategory"
              onChange={handleInputChangeCategory}
            >
              {displayCategory.map((categories) => {
                return (
                  <Option value={categories.name}>{categories.name}</Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Capacity")}
            // name={["capacity", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "right",
            }}
          >
            {/* <Select
              defaultValue={product?.idcapacity?.name}
              name="idcapacity"
              onChange={handleInputChangeCapacity}
            >
              {displayCapacity.map((capacity) => {
                return <Option value={capacity.name}>{capacity.name}</Option>;
              })}
            </Select> */}

            {/* color nhieu */}
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Chọn Capacity"
              value={productData.capacity}
              onChange={handleInputChangeCapacity}
            >
              {displayCapacity.map((capacity) => (
                <Select.Option key={capacity.id} value={capacity.name}>
                  {capacity.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Battery")}
            name={["battery", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "left",
              clear: "both",
            }}
          >
            <Select
              defaultValue={product?.idbattery?.name}
              name="idbattery"
              onChange={handleInputChangeBattery}
            >
              {displayBattery.map((battery) => {
                return <Option value={battery.name}>{battery.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Chip")}
            name={["chip", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "right",
            }}
          >
            <Select
              defaultValue={product?.idchip?.name}
              name="idchip"
              onChange={handleInputChangeChip}
            >
              {displayChip.map((chip) => {
                return <Option value={chip.name}>{chip.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Color")}
            // name={["color", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "left",
              clear: "both",
            }}
          >
            {/* color nhieu */}
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
            // name={["manufacture", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "left",
              clear: "both",
            }}
          >
            <Select
              name="idmanufacture"
              defaultValue={product?.idmanufacture?.name}
              onChange={handleInputChangeManufacturer}
            >
              {displayManufacture.map((manufacturer) => {
                return (
                  <Option value={manufacturer.name}>{manufacturer.name}</Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* //ram */}
          <Form.Item
            label={t("Ram")}
            // name={["color", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "right",
              // clear: "both",
            }}
          >
            <Select
              name="idram"
              defaultValue={product?.idRam?.name}
              onChange={handleInputChangeRam}
            >
              {displayRam.map((ram) => {
                return (
                  <Option key={ram.name} value={ram.name}>
                    {ram.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Screen")}
            name={["screen", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "left",
              clear: "both",
            }}
          >
            <Select
              defaultValue={product?.idscreen?.name}
              name="idscreen"
              onChange={handleInputChangeScreen}
            >
              {displayScreen.map((screen) => {
                return <Option value={screen.name}>{screen.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Size")}
            name={["size", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: "49%",
              float: "right",
            }}
          >
            <Select
              defaultValue={product?.idsize?.name}
              name="idsize"
              onChange={handleInputChangeSize}
            >
              {displaySize.map((size) => {
                return <Option value={size.name}>{size.name}</Option>;
              })}
            </Select>
          </Form.Item>
        </Form>
      </Create>
    </form>
    //{" "}
    // </Drawer>
  );
};

export default EditProduct;
