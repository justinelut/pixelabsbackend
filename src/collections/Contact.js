import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfOthers } from "../access/isAdminOrSelf";

const Contact = {
    slug: "contact",
    admin: {
        useAsTitle: "firstname",
    },

    access: {
        create: () => true,
        read: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: "firstname",
            label: "First Name",
            type: "text",
            required: true,
        },
        {
            name: "lastname",
            label: "Last Name",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            type: "text",
            required: true,
        },
        {
            name: "message",
            label: "Message",
            type: "textarea",
            required: true,
        },
    ],
};

export default Contact;