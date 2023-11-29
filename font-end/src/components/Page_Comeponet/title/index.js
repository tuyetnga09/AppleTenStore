import { useLink } from "@refinedev/core";
import { theme } from "antd";
import React from "react";

import {} from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./styled";
import { FaAppStore, FaApple } from "react-icons/fa";

const { useToken } = theme;

// const TitleProps = {
//   collapsed: boolean,
// };

const Title = ({ collapsed }) => {
  const { token } = useToken();
  const Link = useLink();

  return (
    <Logo>
      <Link to="/">
        {collapsed ? (
          <FaApple
            style={{
              fontSize: "32px",
              color: token.colorTextHeading,
            }}
          />
        ) : (
          <FaAppStore
            style={{
              color: token.colorTextHeading,
              width: "100%",
              height: "auto",
            }}
          />
        )}
      </Link>
    </Logo>
  );
};
export default Title;
