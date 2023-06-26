import formatSlug from "../utilities/formatSlug";
import { isAdmin } from "../access/isAdmin";

const Resume = {
    slug: "resume",
    admin: {
        useAsTitle: "name",
    },

    access: {
        // Only admins can create
        create: isAdmin,
        // Only admins or editors with site access can read
        read: isAdmin,
        // Only admins can update
        update: isAdmin,
        // Only admins can delete
        delete: isAdmin,
    },
    fields: [
        {
            name: "fullnames",
            label: "Full Names",
            type: "text",
            required: true,
        },
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: 'Description',
            type: "text",
            required: true,
        },
        {
            name: 'resume', // required
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: "contact",
            label: 'Contact Me',
            type: "text",
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    formatSlug("name")
                ]
            },
        }
    ],
};

export default Resume;