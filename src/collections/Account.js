import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { isAdminOrSelf} from "../access/isAdminOrSelf";

const Account = {
  slug: "account",
  auth: {
    depth: 0,
    useAPIKey: true,
  },
  admin: {
    useAsTitle: "firstName",
  },
  access: {
    create: () => true,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelf,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          type: "text",
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          required: true,
        },
        {
          name: 'profilephoto', // required
          type: 'upload', // required
          relationTo: 'media', // required
        },
      ],
    },
    {
      name: "roles",
      // Save this field to JWT so we can use from `req.user`
      // saveToJWT: true,
      type: "select",
      hasMany: true,
      defaultValue: ["user"],
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    {
      name: 'aboutme',
      type: 'textarea',
      label: 'About Me',
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
            data.id = req.user.id;
            return data;
          }
        }
      },
    ],
  },
};


export default Account