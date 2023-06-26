import { isAdmin } from "../access/isAdmin";
import formatSlug from "../utilities/formatSlug";

const Category = {
  slug: "category",
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
      name: "name",
      label: "Service category",
      type: "text",
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: "Template Slug",
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          formatSlug("name")
        ]
      },
    },
  ],
};

export default Category;