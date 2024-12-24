import component from './kh-KH/component';
import globalHeader from './kh-KH/globalHeader';
import menu from './kh-KH/menu';
import pages from './kh-KH/pages';
import pwa from './kh-KH/pwa';
import settingDrawer from './kh-KH/settingDrawer';
import settings from './kh-KH/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'ជួយ',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
