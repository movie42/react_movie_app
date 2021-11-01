import React from "react";
import styled from "styled-components";
import InfoTitle from "./InfoTitle";

const ProductionItemContainer = styled.div`
  margin-bottom: 30px;
`;
const ProductionItemList = styled.ul``;
const ProductionItem = styled.li``;
const ProductionInfoContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 2.2em;
`;

const ProductionName = styled.h3`
  font-size: 2em;
  color: white;
`;

const Maker = ({ data, title, marker }) => {
  return (
    <>
      <ProductionItemContainer>
        <InfoTitle title={title} />
        <ProductionItemList>
          {data ? (
            Array.isArray(data) ? (
              data.map((value) => (
                <ProductionItem>
                  <ProductionInfoContainer>
                    {value.name && (
                      <ProductionName>{value.name}</ProductionName>
                    )}
                  </ProductionInfoContainer>
                </ProductionItem>
              ))
            ) : (
              <ProductionName>
                {marker}
                {data.toLocaleString("ko-KR")}
              </ProductionName>
            )
          ) : (
            <ProductionName>정보 없음</ProductionName>
          )}
        </ProductionItemList>
      </ProductionItemContainer>
    </>
  );
};

export default Maker;
