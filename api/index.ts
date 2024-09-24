import auth from './auth.api';
import profile from './profile.api';
import multimedia from './multimedia.api';
import common from './common.api';
import authors from './authors.api';
import FqApi from './fq.api';
import newsApi from './news.api';

const APIs = {
  auth,
  profile,
  multimedia,
  common,
  authors,
  FqApi,
  newsApi
  //... extend with other APIs here
};

export default APIs;
