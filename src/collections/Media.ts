import { CollectionConfig } from 'payload/types';
import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfOthers } from '../access/isAdminOrSelf';

export type MediaType = {
  filename: string
  width: number
  height: number
  alt: string
  sizes: {
    card?: {
      filename: string
      width: number
      height: number
    }
    feature?: {
      filename: string
      width: number
      height: number
    }
  }
}

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isAdminOrSelfOthers,
    read: () => true,
    update: isAdminOrSelfOthers,
    delete: isAdminOrSelfOthers,
  },
  upload: {
    adminThumbnail: 'card',
    imageSizes: [
      {
        name: 'card',
        width: 640,
        height: 480,
      },
      {
        name: 'feature',
        width: 1024,
        height: 576,
      },
      {
        name: 'profile',
        width: 75,
        height: 75,
      },
      {
        name: 'faviconx32',
        width: 32,
        height: 32,
      },
      {
        name: 'faviconx16',
        width: 16,
        height: 16,
      },
      {
        name: 'faviconx64',
        width: 64,
        height: 64,
      },
      {
        name: 'skillslogo',
        width: 256,
        height: 256,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
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
        condition: (data) => Boolean(data?.createdBy),
      },
    },
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

export default Media;
