import { isAdmin } from "../../access/isAdmin";
import { canReadChat, isAdminOrSelf, isAdminOrSelfOthers } from "../../access/isAdminOrSelf";
import { io } from "../../server";
import LiveChat from "../../hooks/LiveChat";

const Messages = {
    slug: "messages",
    admin: {
        useAsTitle: "message",
    },
    access: {
        create: isAdminOrSelfOthers,
        read: canReadChat,
        update: isAdminOrSelfOthers,
        delete: isAdminOrSelfOthers,
    },
    fields: [
        {
            name: "message",
            label: "Message",
            type: "textarea",
            required: true,
        },
        {
            name: "chatid",
            label: "Chat Id",
            type: "text",
            required: true,
        },
        {
            name: 'fullnames',
            type: 'text',
            label: 'Full Names',
            access: {
                update: () => false,
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
            },

        },
        {
            name: 'role',
            type: 'text',
            label: 'User Roles',
            access: {
                update: () => false,
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
            },

        },
        {
            name: 'profilepic',
            type: 'text',
            label: 'Profile Picture',
            access: {
                update: () => false,
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
            },

        },
        {
            name: "isread",
            label: "Is Read",
            type: "text",
            required: true,
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

        },

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



export default Messages;