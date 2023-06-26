import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";
import React, { useState } from 'react';
import styled from 'styled-components';
import OrderDetails from './Admin/orderdetails'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  background-color: #2d3748;
  color: white;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

const ChatBox = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 16px;
`;

const Message = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: ${props => props.isOwn ? 'row-reverse' : 'row'};
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: ${props => props.isOwn ? '0px' : '8px'};
  margin-left: ${props => props.isOwn ? '8px' : '0px'};
`;

const MessageContent = styled.div`
  background-color: ${props => props.isOwn ? '#3182CE' : '#E2E8F0'};
  color: ${props => props.isOwn ? 'white' : 'black'};
  padding: 8px 16px;
  border-radius: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0px 16px;
  background-color: #E2E8F0;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  border-radius: 16px;
  border: none;
  margin-right: 16px;
  font-size: 16px;
`;

const SendButton = styled.button`
  height: 40px;
  width: 80px;
  background-color: #2D3748;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
`;


export const MyCustomUIField = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };
    return (
        <>
        <OrderDetails />
        <Container>
            <Header>
                <h3>Chat App</h3>
            </Header>
            <ChatBox>
                {messages.map((message, index) => (
                    <Message key={index} isOwn={index % 2 === 0}>
                        <Avatar
                            src={index % 2 === 0 ? 'https://randomuser.me/api/portraits/men/32.jpg' : 'https://randomuser.me/api/portraits/women/32.jpg'}
                            alt={index % 2 === 0 ? 'User' : 'Bot'}
                            isOwn={index % 2 === 0}
                        />
                        <MessageContent isOwn={index % 2 === 0}>
                            {message}
                        </MessageContent>
                    </Message>
                ))}
            </ChatBox>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <SendButton type="button" onClick={handleSend}>Send</SendButton>
            </InputContainer>
        </Container>
        </>
    )
}

const ServicesOrders = {
    slug: "servicesOrders",
    admin: {
        useAsTitle: "orderdetails",
    },
    access: {
        create: isAdminOrSelf,
        read: isAdminOrSelf,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: "orderdetails",
            label: 'Order Details',
            type: "relationship",
            relationTo: 'services',
            hasMany: false,
            required: true,
            admin: {
                readOnly: true
            }
        },
        {
            name: "chat",
            type: "ui",
            admin: {
                components: {
                    Field: MyCustomUIField,
                    // Cell: MyCustomUICell,
                },
            },
        },
        {
            name: 'createdBy',
            type: 'relationship',
            relationTo: 'account',
            access: {
                update: () => false,
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
                condition: data => Boolean(data?.createdBy)
            },

        }

    ],
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
                if (operation === 'create') {
                    if (req.user) {
                        data.createdBy = req.user.id;
                        return data;
                    }
                }
            },
        ],
    },
};



export default ServicesOrders;