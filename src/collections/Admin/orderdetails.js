import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-right: 5px;
`;

const Value = styled.span`
  font-size: 14px;
  color: #666;
`;

function OrderDetails() {
    return (
        <Container>
            <Title>Order Details</Title>
            <div>
                <Label>Project Type:</Label>
                <Value>Basic</Value>
            </div>
            <div>
                <Label>Project Name:</Label>
                <Value>Web development</Value>
            </div>
            <div>
                <Label>Project Price:</Label>
                <Value>$5986</Value>
            </div>
        </Container>
    );
}

export default OrderDetails;
