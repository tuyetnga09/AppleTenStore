import Iframe from "react-iframe";
const DeliveryMap = () => {
  //   const { data: orderData } =
  //     useList <
  //     IOrder >
  //     {
  //       resource: "orders",
  //       config: {
  //         filters: [
  //           {
  //             field: "status.text",
  //             operator: "eq",
  //             value: "On The Way",
  //           },
  //         ],
  //         pagination: {
  //           pageSize: 1000,
  //         },
  //       },
  //     };

  //   const defaultProps = {
  //     center: {
  //       lat: 40.73061,
  //       lng: -73.935242,
  //     },
  //     zoom: 13,
  //   };

  //   const { show } = useNavigation();

  return (
    <Iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.902630887345!2d105.78459597805575!3d21.036581637549396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3620143b79%3A0x28b35cc891abb1b7!2sCellphones!5e0!3m2!1svi!2s!4v1695284657866!5m2!1svi!2s"
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></Iframe>
  );
};
export default DeliveryMap;
