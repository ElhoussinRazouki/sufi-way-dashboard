import auth from './auth.api';
import profile from './profile.api';
import multimedia from './multimedia.api';
import common from './common.api';
import authors from './authors.api';
import fq from './fq.api';
import news from './news.api';
import generalSettings from './general-settings.api';

const APIs = {
  auth,
  profile,
  multimedia,
  common,
  authors,
  fq,
  news,
  generalSettings
  //... extend with other APIs here
};

export default APIs;
