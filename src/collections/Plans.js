import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfOthers } from "../access/isAdminOrSelf";
import formatSlug from "../utilities/formatSlug";

const Plans = {
  slug: "plans",
  admin: {
    useAsTitle: "title",
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
        name: "title",
        label: "Title",
        type: "text",
        required: true,
      },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "type",
      label: "Type",
      type: "text",
      hooks: {
        beforeValidate: [
          formatSlug("type")
        ]
      },
      required: true,
    },
    {
        name: 'details', // required
        type: 'array', // required
        label: 'Details',
        minRows: 2,
        maxRows: 20,
        labels: {
          singular: 'Detail',
          plural: 'Details',
        },
        fields: [ // required
        {
          name: 'Details',
          type: 'text',
        },
      ],
    },
  ],
};

export default Plans;