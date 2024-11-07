import {forwardRef} from 'react';

import {I18nLink} from '~/global/components/i18n-link';
import {MuiAppI18nLinkProps} from '~/global/components/app-link';

const MuiAppI18nLink = forwardRef(({to, ...rest}: MuiAppI18nLinkProps, ref) => (
  <I18nLink ref={ref} to={to} {...rest} />
));

MuiAppI18nLink.displayName = 'MuiAppI18nLink';

export default MuiAppI18nLink;
