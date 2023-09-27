import { useState, useEffect } from "react";
import {
  useGetLocale,
  useSetLocale,
  useGetIdentity,
  useTranslate,
  useList,
} from "@refinedev/core";
import { Link } from "react-router-dom";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";

import {
  Dropdown,
  Input,
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AutoComplete,
  Layout as AntdLayout,
  Button,
  theme,
  MenuProps,
} from "antd";

import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

// import { useConfigProvider } from "../../context";
// import { IconMoon, IconSun } from "../../components/icons";
// import { IOrder, IStore, ICourier, IIdentity } from "../../interfaces";
import { HeaderTitle } from "./styled";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const { Header: AntdHeader } = AntdLayout;
const { useToken } = theme;
const { Text } = Typography;
const { useBreakpoint } = Grid;

// interface IOptionGroup {
//     value: string;
//     label: string | React.ReactNode;
// }

// interface IOptions {
//     label: string | React.ReactNode;
//     options: IOptionGroup[];
// }

const Header = () => {
  const { token } = useToken();
  // const { mode, setMode } = useConfigProvider();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  // const { data: user } = useGetIdentity();
  const screens = useBreakpoint();
  const t = useTranslate();

  const currentLocale = locale();

  const renderTitle = (title) => (
    <HeaderTitle>
      <Text style={{ fontSize: "16px" }}>{title}</Text>
      <Link to={`/${title.toLowerCase()}`}>{t("search.more")}</Link>
    </HeaderTitle>
  );

  const renderItem = (title, imageUrl, link) => ({
    value: title,
    label: (
      <Link to={link} style={{ display: "flex", alignItems: "center" }}>
        <Avatar size={64} src={imageUrl} style={{ minWidth: "64px" }} />
        <Text style={{ marginLeft: "16px" }}>{title}</Text>
      </Link>
    ),
  });

  // const [value, setValue] = useState < string > "";
  const [options, setOptions] = useState([]);

  // const { refetch: refetchOrders } =
  //   useList <
  //   // IOrder >
  //   {
  //     resource: "orders",
  //     config: {
  //       // filters: [{ field: "q", operator: "contains", value }],
  //       filters: [{ field: "q", operator: "contains" }],
  //     },
  //     queryOptions: {
  //       enabled: false,
  //       onSuccess: (data) => {
  //         const orderOptionGroup = data.data.map((item) =>
  //           renderItem(
  //             `${item.store.title} / #${item.orderNumber}`,
  //             "/images/default-order-img.png",
  //             `/orders/show/${item.id}`
  //           )
  //         );
  //         if (orderOptionGroup.length > 0) {
  //           setOptions((prevOptions) => [
  //             ...prevOptions,
  //             {
  //               label: renderTitle(t("orders.orders")),
  //               options: orderOptionGroup,
  //             },
  //           ]);
  //         }
  //       },
  //     },
  //   };

  // const { refetch: refetchStores } =
  //   useList <
  //   // IStore >
  //   {
  //     resource: "stores",
  //     config: {
  //       // filters: [{ field: "q", operator: "contains", value }],
  //       filters: [{ field: "q", operator: "contains" }],
  //     },
  //     queryOptions: {
  //       enabled: false,
  //       onSuccess: (data) => {
  //         const storeOptionGroup = data.data.map((item) =>
  //           renderItem(
  //             item.title,
  //             "/images/default-store-img.png",
  //             `/stores/edit/${item.id}`
  //           )
  //         );
  //         if (storeOptionGroup.length > 0) {
  //           setOptions((prevOptions) => [
  //             ...prevOptions,
  //             {
  //               label: renderTitle(t("stores.stores")),
  //               options: storeOptionGroup,
  //             },
  //           ]);
  //         }
  //       },
  //     },
  //   };

  // const { refetch: refetchCouriers } =
  //   useList <
  //   // ICourier >
  //   {
  //     resource: "couriers",
  //     config: {
  //       // filters: [{ field: "q", operator: "contains", value }],
  //       filters: [{ field: "q", operator: "contains" }],
  //     },
  //     queryOptions: {
  //       enabled: false,
  //       onSuccess: (data) => {
  //         const courierOptionGroup = data.data.map((item) =>
  //           renderItem(
  //             `${item.name} ${item.surname}`,
  //             item.avatar[0].url,
  //             `/couriers/show/${item.id}`
  //           )
  //         );
  //         if (courierOptionGroup.length > 0) {
  //           setOptions((prevOptions) => [
  //             ...prevOptions,
  //             {
  //               label: renderTitle(t("couriers.couriers")),
  //               options: courierOptionGroup,
  //             },
  //           ]);
  //         }
  //       },
  //     },
  //   };

  useEffect(() => {
    setOptions([]);
    // refetchOrders();
    // refetchCouriers();
    // refetchStores();
  }, []);

  const menuItems = [...(i18n.languages || [])].sort().map((lang) => ({
    key: lang,
    onClick: () => changeLanguage(lang),
    icon: (
      <span style={{ marginRight: 8 }}>
        <Avatar size={16} src={`/images/flags/${lang}.svg`} />
      </span>
    ),
    label: lang === "en" ? "English" : "German",
  }));

  return (
    // <QueryClientProvider client={queryClient}>
    <AntdHeader
      style={{
        backgroundColor: token.colorBgElevated,
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Row
        align="middle"
        style={{
          justifyContent: screens.sm ? "space-between" : "end",
        }}
      >
        <Col xs={0} sm={12}>
          <AutoComplete
            style={{
              width: "100%",
              maxWidth: "550px",
            }}
            options={options}
            filterOption={false}
            // onSearch={debounce((value) => setValue(), 300)}
          >
            <Input
              size="large"
              placeholder={"Search by Keyword"}
              suffix={<SearchOutlined />}
            />
          </AutoComplete>
        </Col>
        <Col>
          <Space size="middle" align="center">
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="default"
              // icon={mode === "light" ? <IconMoon /> : <IconSun />}
              onClick={() => {
                // setMode(mode === "light" ? "dark" : "light");
              }}
            />
            <Dropdown
              menu={{
                items: menuItems,
                selectedKeys: currentLocale ? [currentLocale] : [],
              }}
            >
              <a
                style={{ color: "inherit" }}
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <Avatar
                    size={16}
                    src={`/images/flags/${currentLocale}.svg`}
                  />
                  <div
                    style={{
                      display: screens.lg ? "block" : "none",
                    }}
                  >
                    {currentLocale === "en" ? "English" : "German"}
                    <DownOutlined
                      style={{
                        fontSize: "12px",
                        marginLeft: "6px",
                      }}
                    />
                  </div>
                </Space>
              </a>
            </Dropdown>

            <Text
              ellipsis
              strong
              style={{
                display: "flex",
              }}
            >
              {/* {user?.name} */}
            </Text>
            <Avatar
              size="large"
              src={
                "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/362902247_953032899257221_1009685178607494555_n.jpg?stp=dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=fe8171&_nc_ohc=kkXSLwM8WgoAX_cPNMH&_nc_oc=AQmCyESRvgENnBuqoFytPcye-g3AgnUkmCGa_879Bl0qmTO-WGXztYQoQIxhkffzyto&_nc_ht=scontent.fhan3-4.fna&oh=00_AfC_92H_0YZ3Yync7GPlHIuL6IiayozJYlpujJ3z8iRN-g&oe=651949F7"
              }
            />
          </Space>
        </Col>
      </Row>
    </AntdHeader>
    // </QueryClientProvider>
  );
};
export default Header;
