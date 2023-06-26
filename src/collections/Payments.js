import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfOthers } from "../access/isAdminOrSelf";

const Payments = {
    slug: "payments",
    admin: {
        useAsTitle: "paypalpaymentid",
    },
    access: {
        create: isAdminOrSelfOthers,
        read: isAdminOrSelfOthers,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: "paypalpaymentid",
            label: "Paypal Payment Id",
            type: "text",
            required: true,
        },
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
            name: "given_name",
            label: "Given Name",
            type: "text",
            required: true,
        },
        {
            name: "surname_name",
            label: "Surname Name",
            type: "text",
            required: true,
        },
        {
            name: "email_address",
            label: "Email Address",
            type: "text",
            required: true,
        },
        {
            name: "country_code",
            label: "Country Code",
            type: "text",
            required: true,
        },
        {
            name: "purchase_amount",
            label: "Purchase Amount",
            type: "number",
            required: true,
        },
        {
            name: "purchase_currency",
            label: "Purchase Currency",
            type: "text",
            required: true,
        },
        {
            name: "address_line_1",
            label: "Address Line 1",
            type: "text",
            required: true,
        },
        {
            name: "address_line_2",
            label: "Address Line 2",
            type: "text",
            required: false,
        },
        {
            name: "admin_area_2",
            label: "Admin Area 2",
            type: "text",
            required: true,
        },
        {
            name: "postal_code",
            label: "Postal Code",
            type: "text",
            required: true,
        },
        {
            name: "shipping_name",
            label: "Shipping Name",
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

export default Payments;
