import formatSlug from "../utilities/formatSlug";
import { isAdmin } from "../access/isAdmin";
const Navigation = {
    slug: "navigation",
    admin: {
        useAsTitle: "title",
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
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
       
        {
            name: 'navigation', // required
            type: 'array', // required
            label: 'Navigation',
            minRows: 1,
            maxRows: 20,
            labels: {
                singular: 'Navigation',
                plural: 'Navigations',
            },
            fields: [ // required
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true
                }
            ],
        },
    ],
};

export default Navigation;