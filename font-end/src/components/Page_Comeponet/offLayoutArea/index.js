import { LeftOutlined } from "@ant-design/icons";
import { RefineKbar } from "@refinedev/kbar";

import { ToggleContainer } from "./styled";

const OffLayoutArea = () => {
  return (
    <ToggleContainer>
      {/* <RefineKbar /> */}
      <LeftOutlined />
      <a href="http://localhost:3000/">
        Switch to <br />
        <strong>CLIENT APP</strong>
      </a>
    </ToggleContainer>
  );
};

export default OffLayoutArea;
