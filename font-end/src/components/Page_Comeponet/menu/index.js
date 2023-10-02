import { ThemedLayoutV2 } from "@refinedev/antd";
import Header from "../header/index";
import Title from "../title/index";
import OffLayoutArea from "../offLayoutArea/index";

const Ok = () => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={Title}
      OffLayoutArea={OffLayoutArea}
    ></ThemedLayoutV2>
  );
};
export default Ok;
