import React from "react";
import styled from "styled-components";

const StatisticalStyles = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  border-radius: 8px;
  color: ${(props) => props.theme.black};
  .statisticall-num {
    font-size: ${(props) => props.size};
    font-size: 32px;
    font-weight: 700;
  }
  .statistical-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    i {
      font-size: 35px;
    }
    span {
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

const Statistical = ({
  number = 0,
  title = "Sản Phẩm",
  icon = "",
  ...rest
}) => {
  return (
    <StatisticalStyles {...rest}>
      <h1 className="statisticall-num">{number}</h1>
      <div className="statistical-content">
        {icon}
        <span>{title}</span>
      </div>
    </StatisticalStyles>
  );
};

export default Statistical;
