import formatSlug from "../utilities/formatSlug";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfOthers } from "../access/isAdminOrSelf";

const Services = {
  slug: "services",
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
      label: "Service Name",
      type: "text",
      required: true,
    },
    {
      name: 'categories', // required
      type: 'relationship', // required
      relationTo: 'category', // required
      hasMany: false,
    },
    {
      name: "description",
      label: 'Description', 
      type: "textarea",
      required: true, 
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
      name: 'type',
      type: 'text',
      defaultValue: "service",
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
      defaultValue: "services",
      access: {
        update: () => false,
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
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

export default Services;