import formatSlug from "../utilities/formatSlug";
import { isAdmin } from "../access/isAdmin";
const Page = {
    slug: 'page',
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
            name: 'name',
            label: 'Page Name',
            type: 'text',
            required: true,
        },
        {
            name: 'description', // required
            type: 'richText', // required
            defaultValue: [{
                children: [{ text: 'Start typing ...' }],
            }],
            required: true,
            admin: {
                elements: [
                    'h2',
                    'h3',
                    'h4',
                    'link',
                ],
                leaves: [
                    'bold',
                    'italic',
                    {
                        name: 'highlight',
                    }
                ],
                link: {
                    // Inject your own fields into the Link element
                    fields: [
                        {
                            name: 'rel',
                            label: 'Rel Attribute',
                            type: 'select',
                            hasMany: true,
                            options: [
                                'noopener', 'noreferrer', 'nofollow',
                            ],
                        },
                    ],
                },
                upload: {
                    collections: {
                        media: {
                            fields: [
                                // any fields that you would like to save
                                // on an upload element in the `media` collection
                            ],
                        },
                    },
                },
            }
        },
        {
            name: 'pages', // required
            type: 'array', // required
            label: 'Pages',
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
                    name: 'cssid',
                    type: 'text',
                },
                {
                    name: 'content', // required
                    type: 'richText', // required
                    defaultValue: [{
                        children: [{ text: 'Start typing ...' }],
                    }],
                    required: true,
                    admin: {
                        elements: [
                            'h2',
                            'h3',
                            'h4',
                            'link',
                        ],
                        leaves: [
                            'bold',
                            'italic',
                            {
                                name: 'highlight',
                            }
                        ],
                        link: {
                            // Inject your own fields into the Link element
                            fields: [
                                {
                                    name: 'rel',
                                    label: 'Rel Attribute',
                                    type: 'select',
                                    hasMany: true,
                                    options: [
                                        'noopener', 'noreferrer', 'nofollow',
                                    ],
                                },
                            ],
                        },
                        upload: {
                            collections: {
                                media: {
                                    fields: [
                                        // any fields that you would like to save
                                        // on an upload element in the `media` collection
                                    ],
                                },
                            },
                        },
                    }
                },
            ],
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
    ]
};

export default Page