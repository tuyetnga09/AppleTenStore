import styled from "@emotion/styled";

export const NewCustomersWrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    height: 212px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const HeaderNumbers = styled.div`
  font-size: 28px;
  text-align: right;
  line-height: 1.2;

  div {
    font-size: 20px;
  }

  img {
    margin-left: 5px;
  }

  @media screen and (max-width: 576px) {
    font-size: 30px;

    div {
      font-size: 20px;
    }
  }
`;
export const TitleAreNumber = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.1;

  span {
    font-size: 28px;
    margin-right: 5px;
  }

  @media screen and (max-width: 576px) {
    span {
      font-size: 30px !important;
      line-height: 0.9;
    }
  }
`;
export const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h3,
  span {
    color: white !important;
    margin-bottom: 0 !important;
  }

  @media screen and (max-width: 576px) {
    span {
      font-size: 16px !important;
      line-height: 1.2;
    }
  }
`;
