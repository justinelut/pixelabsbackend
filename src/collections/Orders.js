import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfOthers } from "../access/isAdminOrSelf";

const Orders = {
    slug: "orders",
    admin: {
        useAsTitle: "productinfo",
    },
    access: {
        create: isAdminOrSelfOthers,
        read: isAdminOrSelfOthers,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: "productinfo",
            label: "Product Info",
            type: "relationship",
            relationTo: 'sellTemplate',
            hasMany: false,
            required: true,
        },
        {
            name: "productinfo2",
            label: "Product Info2",
            type: "relationship",
            relationTo: 'services',
            hasMany: false,
            required: true,
        },
        {
            name: "paymentinfo",
            label: "Payment Info",
            type: "relationship",
            relationTo: 'payments',
            hasMany: false,
            required: true,
        },
        {
            name: "plantype",
            label: "Plan Type",
            type: "text",
            required: true,
        },
        {
            name: "plandetails",
            label: "Plan Details",
            type: "relationship",
            relationTo: 'plans',
            hasMany: false,
            required: true,
        },
        {
            name: "salestype",
            label: "Sales Type",
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

export default Orders;
