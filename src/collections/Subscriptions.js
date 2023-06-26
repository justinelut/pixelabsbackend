import { isAdmin } from "../access/isAdmin";

const Subscription = {
    slug: "subscription",
    admin: {
        useAsTitle: "email",
    },

    access: {
        create: () => true,
        read: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: "email",
            label: "Email",
            type: "text",
            required: true,
        },
    ],
};

export default Subscription;