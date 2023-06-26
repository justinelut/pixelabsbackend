import { isAdminOrSelfOthers } from "../access/isAdminOrSelf";
import formatSlug from "../utilities/formatSlug";

const Projects = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: isAdminOrSelfOthers,
    read: isAdminOrSelfOthers,
    update: isAdminOrSelfOthers,
    delete: isAdminOrSelfOthers,
  },
  fields: [
    {
      name: "title",
      label: "Project Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Project Description",
      type: "textarea",
      required: true,
    },
    {
      name: "url",
      label: "Project Url",
      type: "text",
      required: true,
    },
    {
      name: 'image', // required
      type: 'upload', // required
      label: 'Featured Project Image',
      relationTo: 'media', // required
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
          formatSlug("title")
        ]
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



export default Projects;