import React, { useEffect, useState } from "react";
import { useApiUrl, useTranslate } from "@refinedev/core";
import { Create, getValueFromEvent } from "@refinedev/antd";
import {
  add,
  getCodeProduct,
  readAllBattery,
  readAllCapacity,
  readAllCategory,
  readAllChip,
  readAllColor,
  readAllManufacture,
  readAllRam,
  readAllScreen,
  readAllSize,
} from "../../../../service/product.service";
import {
  add as addColor,
  getCodeColor,
} from "../../../../service/color.service";
import { add as addChip, getCodeChip } from "../../../../service/chip.service";
import { add as addSize, getCodeSize } from "../../../../service/size.service";
import {
  createCapacity,
  getCodeCapacity,
} from "../../../../service/capacity.service";
import { createRam, getCodeRam } from "../../../../service/ram.service";
import {
  createManufacture,
  getCodeManufacture,
} from "../../../../service/manufacture.service";
import {
  add as addBattery,
  getCodeBattery,
} from "../../../../service/battery.service";
import {
  createCategory,
  getCodeCategory,
} from "../../../../service/category.service";
import { create, getCodeScreen } from "../../../../service/screen.service";
import { addImage } from "../../../../service/image.service";
import { ImportImeiExcel } from "../../../../service/imei.service";
import QRScanner from "./QRScanner";
import { Option } from "antd/es/mentions";
import { readAllProductNew } from "../../../../service/sku.service";
import * as XLSX from "xlsx";
import {
  Avatar,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const Test = (setDisplay, setPagination) => {
  const { Text } = Typography;
  const history = useHistory();
  const t = useTranslate();
  const apiUrl = useApiUrl();
  const form = new FormData();
  const [list, setList] = useState({});
  const [startScan, setStartScan] = useState(false);

  const [displayfile, setFile] = useState(null);
  const [displaySku, setDisplaySku] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [color, setColor] = useState({
    code: "",
    name: "",
  });
  const [chip, setChip] = useState({
    code: "",
    name: "",
  });
  const [ram, setRam] = useState({
    code: "",
    name: "",
  });
  const [size, setSize] = useState({
    code: "",
    name: "",
  });
  const [battery, setBattery] = useState({
    code: "",
    name: "",
  });
  const [category, setCategory] = useState({
    code: "",
    name: "",
  });
  const [manufacturer, setManufacturer] = useState({
    code: "",
    name: "",
  });
  const [capacity, setCapacity] = useState({
    code: "",
    name: "",
  });
  const [screen, setScreen] = useState({
    code: "",
    name: "",
  });

  const [modalColor, setModalColor] = useState(false);
  const [modalChip, setModalChip] = useState(false);
  const [modalRam, setModalRam] = useState(false);
  const [modalSize, setModalSize] = useState(false);
  const [modalBattery, setModalBattery] = useState(false);
  const [modalCategory, setModalCategory] = useState(false);
  const [modalManufacturer, setModalManufacturer] = useState(false);
  const [modalCapacity, setModalCapacity] = useState(false);
  const [modalScreen, setModalScreen] = useState(false);

  const [productData, setProductData] = useState({
    nameProduct: "",
    description: "",
    price: 0,
    category: "",
    battery: "",
    chip: "",
    color: [],
    capacity: [],
    manufacturer: "",
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
      manufacturer: value,
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
      price: 0,
    });
  };

  async function handleChangeImage(value) {
    setList(value);
  }

  const [filters, setFilters] = useState({
    page: 0,
    key: "",
  });

  function checkValidate(object) {
    return object.code.trim() === "" || object.name.trim() === "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (productData.nameProduct.trim() === "") {
      notification.error({
        message: "Tên sản phẩm không được để trống!",
        // description: "Add product successfully",
      });
    } else if (productData.size === "") {
      notification.error({
        message: "Chưa chọn kích thước!",
        // description: "Add product successfully",
      });
    } else if (productData.chip === "") {
      notification.error({
        message: "Chưa chọn chip!",
        // description: "Add product successfully",
      });
    } else if (productData.ram === "") {
      notification.error({
        message: "Chưa chọn ram!",
        // description: "Add product successfully",
      });
    } else if (productData.screen === "") {
      notification.error({
        message: "Chưa chọn màn hình!",
        // description: "Add product successfully",
      });
    } else if (productData.manufacturer === "") {
      notification.error({
        message: "Chưa chọn xuất xứ!",
        // description: "Add product successfully",
      });
    } else if (productData.category === "") {
      notification.error({
        message: "Chưa chọn loại sản phẩm!",
        // description: "Add product successfully",
      });
    } else if (productData.color.length === 0) {
      notification.error({
        message: "Chưa chọn màu sắc!",
        // description: "Add product successfully",
      });
    } else if (productData.capacity.length === 0) {
      notification.error({
        message: "Chưa chọn dung lượng!",
        // description: "Add product successfully",
      });
    } else {
      event.preventDefault();
      try {
        const items = { ...productData };

        // Thực hiện thêm sản phẩm
        await add(items);

        // Sau khi thêm sản phẩm, lấy lại danh sách sản phẩm mới nhất
        const response = await readAllProductNew();
        setDisplaySku(response.data);
        console.log("Dữ liệu sản phẩm:", items);
        notification.success({
          message: "Thêm sản phẩm thành công!",
          // description: "Add product successfully",
        });
        for (let i = 0; i < list.fileList.length; i++) {
          await form.append("file", list.fileList[i].originFileObj);
        }
        await form.append("name", items.nameProduct);
        await addImage(form);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const [batteryCodes, setBatteryCodes] = useState([]);
  const [capacityCodes, setCapacityCodes] = useState([]);
  const [chipCodes, setChipCodes] = useState([]);
  const [colorCodes, setColorCodes] = useState([]);
  const [ramCodes, setRamCodes] = useState([]);
  const [categoryCodes, setCategoryCodes] = useState([]);
  const [manufactureCodes, setManufactureCodes] = useState([]);
  const [sizeCodes, setSizeCodes] = useState([]);
  const [screenCodes, setScreenCodes] = useState([]);

  const [displayColor, setDisplayColor] = useState([]);
  const [displayBattery, setDisplayBattery] = useState([]);
  const [displayCategory, setDisplayCategory] = useState([]);
  const [displayChip, setDisplayChip] = useState([]);
  const [displayManufacture, setDisplayManufacture] = useState([]);
  const [displayRam, setDisplayRam] = useState([]);
  const [displayScreen, setDisplayScreen] = useState([]);
  const [displaySize, setDisplaySize] = useState([]);
  const [displayCapacity, setDisplayCapacity] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    if (storedUser?.roles === "CUSTOMER" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      // handleSubmit();
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

      getCodeBattery()
        .then((response) => {
          setBatteryCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getCodeCapacity()
        .then((response) => {
          setCapacityCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getCodeCategory()
        .then((response) => {
          setCategoryCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getCodeChip()
        .then((response) => {
          setChipCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getCodeColor()
        .then((response) => {
          setColorCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getCodeManufacture()
        .then((response) => {
          setManufactureCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getCodeRam()
        .then((response) => {
          setRamCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getCodeScreen()
        .then((response) => {
          setScreenCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getCodeSize()
        .then((response) => {
          setSizeCodes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loaded]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  //set id SKU
  const [displayIdSku, setIdSku] = useState(null); // Khởi tạo là null

  // Khởi tạo là null
  const [isCheckImei, setCheckImei] = useState([]);

  // mở modal để import imei
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal

  // Hàm để hiển thị Modal khi cần
  async function showModal(sku) {
    await setIdSku(sku.id);
    await setIsModalVisible(true);
    await setExcelData([]);
    await setCheckImei([]);
    await setFile([]);
  }

  // Hàm để ẩn Modal
  async function handleCancel() {
    await setIsModalVisible(false);
    await setExcelData([]);
    await setIdSku([]);
    await setCheckImei([]);
    // handleFileUpload([]);
    await setFile([]);
  }

  const [excelData, setExcelData] = useState(null); // Khởi tạo là null

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(event.target.files[0]);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData); // Cập nhật dữ liệu khi tệp đã được chọn
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleImportImei = async (event) => {
    event.preventDefault();
    if (!displayfile || displayfile == null || displayfile.length == 0) {
      console.error("Vui lòng chọn một file trước khi import.");
      notification.error({
        message: "Vui lòng chọn một file trước khi import.",
      });
      return;
    } else {
      console.log(displayfile);
      console.log(displayIdSku);
      const formData = new FormData();
      formData.append("file", displayfile);

      try {
        const response = await ImportImeiExcel(formData, displayIdSku);
        await setCheckImei(response.data);
        if (response.data.length === 0) {
          // Load lại bảng SKU
          const response = await readAllProductNew();
          setDisplaySku(response.data);
          setIsModalVisible(false);
          notification.success({
            message: "Add Imei successfully",
            // description: "Add product successfully",
          });
        } else {
          notification.error({
            message: "Add Imei failed",
            // description: "Add product successfully",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  function handleEditModalCategory() {
    setModalCategory(true);
  }

  function handleEditModalCapacity() {
    setModalCapacity(true);
  }

  function handleEditModalBattery() {
    setModalBattery(true);
  }

  function handleEditModalChip() {
    setModalChip(true);
  }

  function handleEditModalColor() {
    setModalColor(true);
  }

  function handleEditModalManufacturer() {
    setModalManufacturer(true);
  }

  function handleEditModalRam() {
    setModalRam(true);
  }

  function handleEditModalScreen() {
    setModalScreen(true);
  }

  function handleEditModalSize() {
    setModalSize(true);
  }

  function handleCancelModalColor() {
    setModalColor(false);
  }

  function handleChangeColor(event) {
    const { name, value } = event.target;
    setColor((prevColor) => ({
      ...prevColor,
      [name]: value,
    }));
  }

  function handleSaveColor() {
    if (!colorCodes.includes(color.code)) {
      let checkValue = checkValidate(color);
      if (!checkValue) {
        addColor(color).then((response) => {
          notification.success({
            message: "Lưu thành công!",
          });
          console.log(response);
        });
        setLoaded(!loaded);
        setModalColor(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    } else {
      notification.error({
        message: "Mã đã tồn tại!",
      });
    }
  }

  function handleCancelCapacity() {
    setModalCapacity(false);
  }

  function handleChangeCapacity(event) {
    const { name, value } = event.target;
    setCapacity((prevCapacity) => ({
      ...prevCapacity,
      [name]: value,
    }));
  }

  function handleSaveCapacity() {
    if (!capacityCodes.includes(capacity.code)) {
      let validate = checkValidate(capacity);
      if (!validate) {
        createCapacity(capacity).then((response) => {
          console.log(response);
          notification.success({
            message: "Lưu thành công!",
          });
        });
        setLoaded(!loaded);
        setModalCapacity(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    } else {
      notification.error({
        message: "Mã đã tồn tại!",
      });
    }
  }

  function handleCancelBattery() {
    setModalBattery(false);
  }

  function handleChangeBattery(event) {
    const { name, value } = event.target;
    setBattery((prevBattery) => ({
      ...prevBattery,
      [name]: value,
    }));
  }

  function handleSaveBattery() {
    if (!batteryCodes.includes(battery.code)) {
      let validate = checkValidate(battery);
      if (!validate) {
        addBattery(battery).then((response) => {
          console.log(response);
          notification.success({
            message: "Lưu thành công!",
          });
        });
        setLoaded(!loaded);
        setModalBattery(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    } else {
      notification.error({
        message: "Mã đã tồn tại!",
      });
    }
  }

  function handleCancelCategory() {
    setModalCategory(false);
  }

  function handleChangeCategory(event) {
    const { name, value } = event.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  }

  function handleSaveCategory() {
    if (!categoryCodes.includes(category.code)) {
      let validate = checkValidate(category);
      if (!validate) {
        createCategory(category).then((response) => {
          console.log(response);
          notification.success({
            message: "Lưu thành công!",
          });
        });
        setLoaded(!loaded);
        setModalCategory(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    } else {
      notification.error({
        message: "Mã đã tồn tại!",
      });
    }
  }

  function handleCancelScreen() {
    setModalScreen(false);
  }

  function handleChangeScreen(event) {
    const { name, value } = event.target;
    setScreen((prevScreen) => ({
      ...prevScreen,
      [name]: value,
    }));
  }

  function handleSaveScreen() {
    if (!screenCodes.includes(screen.code)) {
      let validate = checkValidate(screen);
      if (!validate) {
        create(screen).then((response) => {
          console.log(response);
          notification.success({
            message: "Lưu thành công!",
          });
        });
        setLoaded(!loaded);
        setModalScreen(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    } else {
      notification.error({
        message: "Mã đã tồn tại!",
      });
    }
  }

  function handleCancelChip() {
    setModalChip(false);
  }

  function handleChangeChip(event) {
    const { name, value } = event.target;
    setChip((prevChip) => ({
      ...prevChip,
      [name]: value,
    }));
  }

  function handleSaveChip() {
    if (!chipCodes.includes(chip.code)) {
      let validate = checkValidate(chip);
      if (!validate) {
        addChip(chip).then((response) => {
          console.log(response);
          notification.success({
            message: "Lưu thành công!",
          });
        });
        setLoaded(!loaded);
        setModalChip(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    } else {
      notification.error({
        message: "Mã đã tồnt tại!",
      });
    }
  }

  function handleCancelRam() {
    setModalRam(false);
  }

  function handleChangeRam(event) {
    const { name, value } = event.target;
    setRam((prevRam) => ({
      ...prevRam,
      [name]: value,
    }));
  }

  function handleSaveRam() {
    if (!ramCodes.includes(ram.code)) {
      let validate = checkValidate(ram);
      if (!validate) {
        createRam(ram).then((response) => {
          console.log(response);
          notification.success({
            message: "Lưu thành công!",
          });
        });
        setLoaded(!loaded);
        setModalRam(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    } else {
      notification.error({
        message: "Mã đã tồn tại!",
      });
    }
  }

  function handleCancelManufacturer() {
    setModalManufacturer(false);
  }

  function handleChangeManufacturer(event) {
    const { name, value } = event.target;
    setManufacturer((prevManufacturer) => ({
      ...prevManufacturer,
      [name]: value,
    }));
  }

  function handleSaveManufacturer() {
    if (!manufactureCodes.includes(manufacturer.code)) {
      let validate = checkValidate(manufacturer);
      if (!validate) {
        createManufacture(manufacturer).then((response) => {
          console.log(response);
          notification.success({
            message: "Lưu thành công!",
          });
        });
        setLoaded(!loaded);
        setModalManufacturer(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    } else {
      notification.error({
        message: "Mã đã tồn tại!",
      });
    }
  }

  function handleCancelSize() {
    setModalSize(false);
  }

  function handleChangeSize(event) {
    const { name, value } = event.target;
    setSize((prevSize) => ({
      ...prevSize,
      [name]: value,
    }));
  }

  function handleSaveSize() {
    if (!sizeCodes.includes(size.code)) {
      let validate = checkValidate(size);
      if (!validate) {
        addSize(size).then((response) => {
          console.log(response);
          notification.success({
            message: "Lưu thành công!",
          });
        });
        setLoaded(!loaded);
        setModalSize(false);
      } else {
        notification.error({
          message: "Kiểm tra lại thông tin!",
        });
      }
    }
  }

  return (
    <>
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
                  multiple={true}
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
            <Form.Item
              label={t("Tên sản phẩm")}
              // name="nameProduct"
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                required
                value={productData.nameProduct || ""}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    nameProduct: e.target.value,
                  })
                }
                id="nameProduct"
                name="nameProduct"
              />
            </Form.Item>
            <Form.Item
              label={t("Mô tả")}
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
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                id="description"
                name="description"
              />
            </Form.Item>
            {/*<Form.Item*/}
            {/*    label={t("Giá")}*/}
            {/*    name="price"*/}
            {/*    rules={[{required: true, type: "number"}]}*/}
            {/*>*/}
            {/*    <InputNumber*/}
            {/*        style={{width: "150px"}}*/}
            {/*        min={0}*/}
            {/*        type="number"*/}
            {/*        required*/}
            {/*        name="price"*/}
            {/*        value={productData.price}*/}
            {/*        onChange={handleNumberChangePrice}*/}
            {/*    />*/}
            {/*</Form.Item>*/}
            <div className="form-group">
              <Form.Item
                label={t("Hãng")}
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
                  style={{ width: "95%" }}
                >
                  {displayCategory.map((categories) => {
                    return (
                      <Select.Option
                        key={categories.id}
                        value={categories.name}
                      >
                        {categories.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <div
                className="form-group col-md-2"
                style={{ marginTop: "-59px", marginLeft: "900px" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-them"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleEditModalCategory()}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <Form.Item
                label="Dung Lượng"
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
                  style={{ width: "95%" }}
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
              <div
                className="form-group col-md-2"
                style={{ marginTop: "-59px", marginLeft: "900px" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-them"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleEditModalCapacity()}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <Form.Item
                label={t("Dung lượng pin")}
                name={["battery", "id"]}
                rules={[{ required: true }]}
              >
                <Select
                  name="battery"
                  value={productData.battery}
                  onChange={handleInputChangeBattery}
                  style={{ width: "95%" }}
                >
                  {displayBattery.map((battery) => {
                    return <Option value={battery.name}>{battery.name}</Option>;
                  })}
                </Select>
              </Form.Item>
              <div
                className="form-group col-md-2"
                style={{ marginTop: "-59px", marginLeft: "900px" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-them"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleEditModalBattery()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="form-group">
              <Form.Item
                label={t("Chip")}
                name={["chip", "id"]}
                rules={[{ required: true }]}
              >
                <Select
                  name="chip"
                  value={productData.chip}
                  onChange={handleInputChangeChip}
                  style={{ width: "95%" }}
                >
                  {displayChip.map((chip) => {
                    return <Option value={chip.name}>{chip.name}</Option>;
                  })}
                </Select>
              </Form.Item>
              <div
                className="form-group col-md-2"
                style={{ marginTop: "-59px", marginLeft: "900px" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-them"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleEditModalChip()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="form-group">
              <Form.Item
                label={t("Màu sắc")}
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
                  style={{ width: "95%" }}
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
                <div
                  className="form-group col-md-2"
                  style={{ marginTop: "-59px", marginLeft: "900px" }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary btn-them"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => handleEditModalColor()}
                  >
                    +
                  </button>
                </div>
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item
                label={t("Xuất sứ")}
                name={["manufacturer", "id"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  name="manufacturer"
                  style={{ width: "95%" }}
                  value={productData.manufacturer}
                  onChange={handleInputChangeManufacturer}
                >
                  {displayManufacture.map((manufacturer) => {
                    return (
                      <Option value={manufacturer.name}>
                        {manufacturer.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <div
                className="form-group col-md-2"
                style={{ marginTop: "-59px", marginLeft: "900px" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-them"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleEditModalManufacturer()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="form-group">
              <Form.Item
                label={t("Ram")}
                name={["ram", "id"]}
                rules={[{ required: true }]}
              >
                <Select
                  name="ram"
                  value={productData.ram}
                  style={{ width: "95%" }}
                  onChange={handleInputChangeRam}
                >
                  {displayRam.map((ram) => {
                    return <Option value={ram.name}>{ram.name}</Option>;
                  })}
                </Select>
              </Form.Item>
              <div
                className="form-group col-md-2"
                style={{ marginTop: "-59px", marginLeft: "900px" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-them"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleEditModalRam()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="form-group">
              <Form.Item
                label={t("Màn hình")}
                name={["screen", "id"]}
                rules={[{ required: true }]}
              >
                <Select
                  name="screen"
                  value={productData.screen}
                  style={{ width: "95%" }}
                  onChange={handleInputChangeScreen}
                >
                  {displayScreen.map((screen) => {
                    return <Option value={screen.name}>{screen.name}</Option>;
                  })}
                </Select>
              </Form.Item>
              <div
                className="form-group col-md-2"
                style={{ marginTop: "-59px", marginLeft: "900px" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-them"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleEditModalScreen()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="form">
              <Form.Item
                label={t("Kích thước")}
                name={["size", "id"]}
                rules={[{ required: true }]}
              >
                <Select
                  name="size"
                  value={productData.size}
                  onChange={handleInputChangeSize}
                  style={{ width: "95%" }}
                >
                  {displaySize.map((size) => {
                    return <Option value={size.name}>{size.name}</Option>;
                  })}
                </Select>
              </Form.Item>
              <div
                className="form-group col-md-2"
                style={{ marginTop: "-59px", marginLeft: "900px" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-them"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleEditModalSize()}
                >
                  +
                </button>
              </div>
            </div>
          </Form>
        </Create>
      </form>
      <section>
        {/* import  imei   -----------------------------------*/}
        <div className="table-wrap">
          <table class="table">
            <thead class="table-dark">
              <th>STT</th>
              <th>Màu sắc</th>
              <th>Dung lượng</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>IMPORT IMEI</th>
            </thead>
            <tbody>
              {displaySku.map((s, index) => {
                return (
                  <tr className="alert" role="alert" key={s.id}>
                    <td>{index + 1}</td>
                    <td>{s.color}</td>
                    <td>{s.capacity}</td>
                    <td>{s.quantity}</td>
                    <td>{s.price}</td>
                    <td>
                      <button
                        type="button"
                        className="imports"
                        data-dismiss="alert"
                        aria-label="Import"
                        onClick={() => showModal(s)}
                      >
                        <span aria-hidden="true">
                          <FontAwesomeIcon icon={faFileExcel} />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <Modal
          // {...modalProps}
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1000}
          footer={null}
          bodyStyle={{ minHeight: "650px" }}
        >
          {/* <ExportImei ImportImeiExcel={excelData} /> */}
          <div>
            <form onSubmit={handleImportImei} enctype="multipart/form-data">
              <div className="form-row">
                <div className="input-data">
                  <Input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              <br></br>

              <div className="form-row">
                <div className="input-data textarea">
                  <div className="form-row submit-btn">
                    <button type="submit" class="btn btn-outline-secondary">
                      Save Import Imei
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {isCheckImei != null && isCheckImei.length > 0 ? (
              <div className="table-wrap">
                <h2>Imei Trung Lap</h2>
                <table class="table">
                  <thead class="table-dark">
                    <th>STT</th>
                    <th>PRODUCT</th>
                    <th>COLOR</th>
                    <th>CAPACITY</th>
                    <th>IMEI</th>
                    <th>PRICE</th>
                  </thead>
                  <tbody>
                    {isCheckImei.map((s, index) => {
                      return (
                        <tr className="alert" role="alert" key={s.id}>
                          <td>{index + 1}</td>
                          <td>{s.nameProduct}</td>
                          <td>{s.color}</td>
                          <td>{s.capacity}</td>
                          <td>{s.codeImei}</td>
                          <td>{s.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p></p>
            )}

            {excelData != null && excelData.length > 0 ? (
              <div className="table-wrap">
                <h2>Imei Doc Tu File Excel Vui Long Check Lai Truoc Khi Luu</h2>
                <table class="table">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Chọn tệp Excel để hiển thị dữ liệu.</p>
            )}
          </div>
        </Modal>

        {/* Modal màu sắc*/}
        <Modal
          visible={modalColor}
          onCancel={handleCancelModalColor}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới màu sắc</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={color.code}
                onChange={handleChangeColor}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={color.name}
                onChange={handleChangeColor}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveColor}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelModalColor}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>

        {/* Modal dung lượng*/}
        <Modal
          visible={modalCapacity}
          onCancel={handleCancelCapacity}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới dung lượng</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={capacity.code}
                onChange={handleChangeCapacity}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={capacity.name}
                onChange={handleChangeCapacity}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveCapacity}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelCapacity}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>

        {/* Modal dung pin */}
        <Modal
          visible={modalBattery}
          onCancel={handleCancelBattery}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới pin</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={battery.code}
                onChange={handleChangeBattery}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={battery.name}
                onChange={handleChangeBattery}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveBattery}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelBattery}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>

        {/* Modal category*/}
        <Modal
          visible={modalCategory}
          onCancel={handleCancelCategory}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới dòng sản phẩm</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={category.code}
                onChange={handleChangeCategory}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={category.name}
                onChange={handleChangeCategory}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveCategory}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelCategory}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>

        {/* Modal màn hình*/}
        <Modal
          visible={modalScreen}
          onCancel={handleCancelScreen}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới màn hình</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={screen.code}
                onChange={handleChangeScreen}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={screen.name}
                onChange={handleChangeScreen}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveScreen}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelScreen}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>

        {/* Modal chip*/}
        <Modal
          visible={modalChip}
          onCancel={handleCancelChip}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới chip</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={chip.code}
                onChange={handleChangeChip}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={chip.name}
                onChange={handleChangeChip}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveChip}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelChip}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>

        {/* Modal ram*/}
        <Modal
          visible={modalRam}
          onCancel={handleCancelRam}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới ram</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={ram.code}
                onChange={handleChangeRam}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={ram.name}
                onChange={handleChangeRam}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveRam}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelRam}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>

        {/* Modal sản xuất*/}
        <Modal
          visible={modalManufacturer}
          onCancel={handleCancelManufacturer}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới xuất sứ</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={manufacturer.code}
                onChange={handleChangeManufacturer}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={manufacturer.name}
                onChange={handleChangeManufacturer}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveManufacturer}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelManufacturer}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>

        {/* Modal kích thước*/}
        <Modal
          visible={modalSize}
          onCancel={handleCancelSize}
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới kích thước</h5>
              </span>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mã</label>
              <input
                id="code"
                className="form-control"
                type="text"
                name="code"
                value={size.code}
                onChange={handleChangeSize}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên</label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={size.name}
                onChange={handleChangeSize}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSaveSize}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancelSize}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
                  Hủy bỏ
                </a> */}
          <br />
          {/* </div> */}
        </Modal>
        {/* <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
      </section>
    </>
  );
};

export default Test;
