import { isAdmin } from "../access/isAdmin";

const BgColor = {
    slug: "bgColor",
    admin: {
        useAsTitle: "color",
    },

    access: {
        create: () => true,
        read: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: "color",
            label: "Tailwind Bg Color",
            type: "text",
            required: true,
        },
    ],
};

export default BgColor;