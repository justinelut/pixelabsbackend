import formatSlug from "../utilities/formatSlug";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfOthers } from "../access/isAdminOrSelf";


const SellTemplate = {
    slug: "sellTemplate",
    admin: {
        useAsTitle: "name",
    },

    access: {
        // Only admins can create
        create: isAdmin,
        // Only admins or editors with site access can read
        read: () => true,
        // Only admins can update
        update: isAdmin,
        // Only admins can delete
        delete: isAdmin,
    },
    fields: [
        {
            name: "name",
            label: "Template Name",
            type: "text",
            required: true,
        },
        {
            name: 'categories', // required
            type: 'relationship', // required
            required: true,
            relationTo: 'category', // required
            hasMany: false,
        },
        {
            name: 'sourcecode', // required
            type: 'upload', // required
            label: "Source Code ? tailwind, html, react, svelte, vue, nextjs Source Codes",
            relationTo: 'media', // required
            required: true,
        },
        {
            name: "description",
            type: 'textarea',
            required: true,
            label: 'Description'
        },
        {
            name: "documentation",
            type: 'richText',
            required: true,
            label: 'Description & Documentation'
        },
        {
            name: "templatebgcolor",
            type: 'relationship',
            label: 'Background Color #Css color codes',
            required: true,
            relationTo: 'bgColor', // required
            hasMany: false,
        },
        {
            name: "plans",
            label: 'Plans',
            type: "relationship",
            relationTo: 'plans',
            hasMany: true,
            required: true,
        },
        {
            name: 'image', // required
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            access: {
                update: () => false,
            },
            admin: {
                position: 'sidebar',
                readOnly: false,
            },
            hooks: {
                beforeValidate: [
                    formatSlug("name")
                ]
            },
        },
        {
            name: 'type',
            type: 'text',
            defaultValue: "template",
            access: {
                update: () => false,
            },
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
        },
        {
            name: 'route',
            type: 'text',
            defaultValue: "sellTemplate",
            access: {
                update: () => false,
            },
            admin: {
                position: 'sidebar',
                readOnly: true,
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

        },
        {
            name: 'previewlink',
            type: 'text',
            label: "Preview Link",
            admin: {
                position: 'sidebar',
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

export default SellTemplate;