import { isAdmin } from "../access/isAdmin";

const Home = {
    slug: "home",
    admin: {
        useAsTitle: "headline",
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
            name: "headline",
            label: "Headline",
            type: "text",
            required: true,
        },
        {
            name: "subheadline",
            label: "Sub Headline",
            type: "text",
            required: true,
        },
        {
            name: 'image', // required
            label: "Featured Image",
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: 'favicon', // required
            label: "Favicon Icon",
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: 'howitworks', // required
            type: 'array', // required
            label: 'How it Works',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'How it Works',
                plural: 'How it Works',
            },
            fields: [ // required
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
            ],
        },
        {
            name: 'features', // required
            type: 'array', // required
            label: 'Features',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'Feature',
                plural: 'Features',
            },
            fields: [ // required
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
            ],
        },
        {
            name: 'Faq', // required
            type: 'array', // required
            label: 'Faqs',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'Faq',
                plural: 'Faqs',
            },
            fields: [ // required
                {
                    name: 'question',
                    type: 'text',
                },
                {
                    name: 'answer',
                    type: 'textarea',
                },
            ],
        },
    ],
};

export default Home;