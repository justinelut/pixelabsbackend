import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import Media from './collections/Media';
import Projects from './collections/Projects'
import Services from './collections/Services'
import Category from './collections/Category'
import Plans from './collections/Plans'
import Account from './collections/Account'
import Home from './collections/Home'
import Blog from './collections/Blog'
import Contact from './collections/Contact'
import Navigation from './collections/Navigation'
import Page from './collections/Page'
import Portfolio from './collections/Portfolio'
import Payments from './collections/Payments'
import Subscriptions from './collections/Subscriptions'
import Messages from './collections/Admin/chat'
import path from 'path'
import Logo from './components/graphics/logo'
import Icon from './components/graphics/favicon'
import SellTemplate from './collections/selltemplate';
import BgColor from './collections/tailwindbgcolors';
import ServicesOrders from './collections/servicesorders';
import Orders from './collections/Orders';





dotenv.config();

const extractZipFile = path.resolve(__dirname, './hooks/zipextract.js');
const LiveChat = path.resolve(__dirname, './hooks/LiveChat.js');
const mockModulePath = path.resolve(__dirname, './mocks/emptyObject.js');

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  
  cors: [
    'https://verixr.com',
    'https://frontend.verixr.com',
    'https://sandbox.safaricom.co.ke',
    'https://api.safaricom.co.ke'
  ],

  admin: {
    user: Account.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [extractZipFile]: mockModulePath,
          [LiveChat]: mockModulePath,
        }
      }
    }),

    meta: {
      titleSuffix: '- PIXELabs Inc',
      favicon: '/assets/favicon.png',
      ogImage: '/assets/logo.png',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    }
  },
  collections: [
    Portfolio,
    Home,
    Blog,
    Contact,
    Navigation,
    Page,
    Subscriptions,
    Media,
    Orders,
    Payments,
    Projects,
    Services,
    ServicesOrders,
    Category,
    Plans,
    SellTemplate,
    Account,
    Messages,
    BgColor,
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
});
