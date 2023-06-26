import formatSlug from "../utilities/formatSlug";
import { isAdmin } from "../access/isAdmin";

const Blog = {
    slug: 'blog',
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
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'image', // required
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: 'content', // required
            type: 'richText', // required
            required: true,
            label: 'Blog Content'
        },
        {
            name: 'slug',
            type: 'text',
            label: "Slug",
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    formatSlug("title")
                ]
            },
        },
        {
            name: 'featured',
            type: 'textarea',
            label: 'Featured Text',
            required: true,
            admin: {
                position: 'sidebar',
            }
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

export default Blog;