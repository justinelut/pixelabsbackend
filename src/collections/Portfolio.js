import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfOthers } from "../access/isAdminOrSelf";
import formatSlug from "../utilities/formatSlug";

const Portfolio = {
    slug: "portfolio",
    admin: {
        useAsTitle: "myname",
    },

    access: {
        // Only admins can create
        create: isAdmin,
        // Only admins or editors with site access can read
        read: isAdminOrSelfOthers,
        // Only admins can update
        update: isAdmin,
        // Only admins can delete
        delete: isAdmin,
    },
    fields: [
        {
            name: 'iam', // required
            type: 'array', // required
            label: 'I am...',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'I am',
                plural: 'I am',
            },
            fields: [ // required
                {
                    name: 'Skills',
                    type: 'text',
                },
            ],
        },
        {
            name: 'featured', // required
            label: "Featured Image",
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: 'resume', // required
            label: "My Resume",
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: 'myphoto', // required
            label: "My Photo",
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: "myname",
            label: "My Name",
            type: "text",
            required: true,
        },
        {
            name: "mytitle",
            label: "My Title",
            type: "text",
            required: true,
        },
        {
            name: "myheadline",
            label: "My headline",
            type: "text",
            required: true,
        },
        {
            name: "myaccount",
            label: "Profile Account",
            type: "relationship",
            relationTo: 'account',
            required: true,
        },

        {
            name: 'othertitles', // required
            type: 'array', // required
            label: 'My other titles',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'My other title',
                plural: 'My other titles',
            },
            fields: [ // required
                {
                    name: 'titleimage', // required
                    label: "Title Image",
                    type: 'upload', // required
                    relationTo: 'media', // required
                    required: true,
                },
                {
                    name: 'title',
                    label: "Title",
                    type: 'text',
                },
                {
                    name: 'description',
                    label: "Description",
                    type: 'textarea',
                },
            ],
        },

        {
            name: 'myskills', // required
            type: 'array', // required
            label: 'My Skills',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'My skill',
                plural: 'My skills',
            },
            fields: [ // required
                {
                    name: 'myskilltitle',
                    label: "My skill title",
                    type: 'text',
                },
                {
                    name: 'myskilldesc',
                    label: "My skill description",
                    type: 'textarea',
                },
                {
                    name: 'myskillimage', // required
                    label: "My skill image",
                    type: 'upload', // required
                    relationTo: 'media', // required
                    required: true,
                },
                {
                    name: 'date',
                    type: 'date',
                    label: 'My skill date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'd MMM yyy',
                        },
                    },
                },
            ],
        },

        {
            name: 'myeducation', // required
            type: 'array', // required
            label: 'My Education',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'My Education',
                plural: 'My Education',
            },
            fields: [ // required
                {
                    name: 'myschool',
                    label: "My School or University",
                    type: 'text',
                },
                {
                    name: 'startdate',
                    type: 'date',
                    label: 'My school start date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'd MMM yyy',
                        },
                    },
                },
                {
                    name: 'enddate',
                    type: 'date',
                    label: 'My school end date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'd MMM yyy',
                        },
                    },
                },
                {
                    name: 'myschooldesc',
                    label: "My school description",
                    type: 'textarea',
                },
            ],
        },


        {
            name: 'myworkexperience', // required
            type: 'array', // required
            label: 'My Work Experience',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'My work experience',
                plural: 'My work experience',
            },
            fields: [ // required
                {
                    name: 'myworktitle',
                    label: "My Work Title",
                    type: 'text',
                },
                {
                    name: 'startdate',
                    type: 'date',
                    label: 'My work experience start date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'd MMM yyy',
                        },
                    },
                },
                {
                    name: 'enddate',
                    type: 'date',
                    label: 'My work experience end date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'd MMM yyy',
                        },
                    },
                },
                {
                    name: 'myworkexperiencedesc',
                    label: "My work experience description",
                    type: 'textarea',
                },
            ],
        },



        {
            name: 'mycreativeportfolio', // required
            type: 'array', // required
            label: 'My Creative Portfolio',
            minRows: 2,
            maxRows: 20,
            labels: {
                singular: 'My Creative Portfolio',
                plural: 'My Creative Portfolio',
            },
            fields: [ // required
                {
                    name: 'myportfoliotype',
                    label: "My Portfolio Type",
                    type: 'text',
                },
                {
                    name: 'portfolioimage', // required
                    label: "Portfolio Image",
                    type: 'upload', // required
                    relationTo: 'media', // required
                    required: true,
                },
                {
                    name: 'portfoliotitle', // required
                    label: "Portfolio Title",
                    type: 'text', // required
                    required: true,
                },
                {
                    name: 'slug',
                    type: 'text',
                    label: 'Full Project Url',
                    required: true
                },
                {
                    name: 'portfoliodesc',
                    label: "My Portfolio Description",
                    type: 'textarea',
                },
            ],
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    formatSlug("myname")
                ]
            },
        }
    ],
};

export default Portfolio;