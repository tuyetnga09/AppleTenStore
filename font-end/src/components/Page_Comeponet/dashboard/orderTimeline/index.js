import { useTranslate, useNavigation } from "@refinedev/core";
import { useSimpleList } from "@refinedev/antd";
import {
  Typography,
  List as AntdList,
  Tooltip,
  ConfigProvider,
  theme,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// import { IOrder } from "../../../interfaces";
import {
  TimelineContent,
  CreatedAt,
  Number,
  Timeline,
  TimelineItem,
} from "./styled";

dayjs.extend(relativeTime);

const OrderTimeline = () => {
  const t = useTranslate();
  const { show } = useNavigation();

  //   const { listProps } =
  //     useSimpleList <
  //     IOrder >
  //     {
  //       resource: "orders",
  //       initialSorter: [
  //         {
  //           field: "createdAt",
  //           order: "desc",
  //         },
  //       ],
  //       pagination: {
  //         pageSize: 6,
  //       },
  //       syncWithLocation: false,
  //     };

  //   const { dataSource } = listProps;

  const { Text } = Typography;

  //   const orderStatusColor = (
  //     id: string
  //   ):
  //     | { indicatorColor: string, backgroundColor: string, text: string }
  //     | undefined => {
  //     switch (id) {
  //       case "1":
  //         return {
  //           indicatorColor: "orange",
  //           backgroundColor: "#fff7e6",
  //           text: "pending",
  //         };
  //       case "2":
  //         return {
  //           indicatorColor: "cyan",
  //           backgroundColor: "#e6fffb",
  //           text: "ready",
  //         };
  //       case "3":
  //         return {
  //           indicatorColor: "green",
  //           backgroundColor: "#e6f7ff",
  //           text: "on the way",
  //         };
  //       case "4":
  //         return {
  //           indicatorColor: "blue",
  //           backgroundColor: "#e6fffb",
  //           text: "delivered",
  //         };
  //       case "5":
  //         return {
  //           indicatorColor: "red",
  //           backgroundColor: "#fff1f0",
  //           text: "cancelled",
  //         };
  //       default:
  //         break;
  //     }
  //   };

  const orderStatusColor = (id) => {
    if (undefined) {
      switch (id) {
        case "1":
          return {
            indicatorColor: "orange",
            backgroundColor: "#fff7e6",
            text: "pending",
          };
        case "2":
          return {
            indicatorColor: "cyan",
            backgroundColor: "#e6fffb",
            text: "ready",
          };
        case "3":
          return {
            indicatorColor: "green",
            backgroundColor: "#e6f7ff",
            text: "on the way",
          };
        case "4":
          return {
            indicatorColor: "blue",
            backgroundColor: "#e6fffb",
            text: "delivered",
          };
        case "5":
          return {
            indicatorColor: "red",
            backgroundColor: "#fff1f0",
            text: "cancelled",
          };
        default:
          break;
      }
    } else {
      return { indicatorColor: id, backgroundColor: id, text: id };
    }
  };

  return (
    <AntdList
      //   {...listProps}
      pagination={{
        // ...listProps.pagination,
        simple: true,
      }}
    >
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <Timeline>
          {/* {dataSource?.map(({ createdAt, orderNumber, status, id }) => (
            <TimelineItem
              key={orderNumber}
              color={orderStatusColor(status.id.toString())?.indicatorColor}
            >
              <TimelineContent
                backgroundColor={
                  orderStatusColor(status.id.toString())?.backgroundColor ||
                  "transparent"
                }
              >
                <Tooltip
                  overlayInnerStyle={{ color: "#626262" }}
                  color="rgba(255, 255, 255, 0.3)"
                  placement="topLeft"
                  title={dayjs(createdAt).format("lll")}
                >
                  <CreatedAt italic>{dayjs(createdAt).fromNow()}</CreatedAt>
                </Tooltip>
                <Text>
                  {t(
                    `dashboard.timeline.orderStatuses.${
                      orderStatusColor(status.id.toString())?.text
                    }`
                  )}
                </Text>
                <Number onClick={() => show("orders", id)} strong>
                  #{orderNumber}
                </Number>
              </TimelineContent>
            </TimelineItem>
          ))} */}
        </Timeline>
      </ConfigProvider>
    </AntdList>
  );
};

export default OrderTimeline;
