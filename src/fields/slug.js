import formatSlug from '../utilities/formatSlug';

const slug = {
  name: 'slug',
  label: 'Slug',
  type: 'text',
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      formatSlug('title'),
    ],
  },
};

export default slug;