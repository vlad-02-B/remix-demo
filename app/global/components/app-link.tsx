import {LinkProps} from '@remix-run/react';

import {Link as MuiLink, LinkProps as MuiLinkProps} from '@mui/material';

import MuiAppI18nLink from '~/global/components/MuiAppI18Link/MuiAppI18Link';

//
//

export type MuiAppI18nLinkProps = LinkProps & Omit<MuiLinkProps, 'href'>;

export const AppLink: React.FC<MuiAppI18nLinkProps> = ({
  viewTransition = true,
  children,
  ...props
}: MuiAppI18nLinkProps) => {
  return (
    <MuiLink viewTransition={viewTransition} component={MuiAppI18nLink} {...props}>
      {children}
    </MuiLink>
  );
};
