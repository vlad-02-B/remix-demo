import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';

import {alpha, Button, Card, CardContent, CardMedia, Chip, Stack, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';

import {AppButton} from '~/global/components/app-button';

import {ApiProduct, Languages} from '~/api-client/types';

interface ProductCardProps {
  product: ApiProduct;
  doDeleteItem: (item: ApiProduct) => void;
}

type CurrencySymbols = {
  [locale: string]: string;
};

const currencies: CurrencySymbols = {
  en: '$',
  ar: 'AED',
};

export default function ProductCard({product, doDeleteItem}: ProductCardProps) {
  const {
    t,
    i18n: {language},
  } = useTranslation(['products', 'common']);

  const showSale = product.priceSale !== product.price;

  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: 'lg',
        background: theme => alpha(theme.palette.primary.main, 0.5),
      }}
    >
      <CardMedia
        component="img"
        sx={{width: '100%'}}
        image={
          product.image ??
          'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286'
        }
      />

      <CardContent>
        <Grid container spacing={2} alignItems="stratch">
          <Typography
            variant="h5"
            component="h5"
            sx={{fontWeight: 500, color: theme => theme.palette.secondary.main}}
          >
            {product.title[language as Languages]}
          </Typography>

          <Chip
            component="span"
            variant="outlined"
            color={product.isActive ? 'success' : 'error'}
            label={product.isActive ? 'Active' : 'Disabled'}
          />
        </Grid>

        <Grid container spacing={2} alignItems="stratch" sx={{mb: 2}}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              mt: 1,
              fontWeight: 500,
              textDecoration: showSale ? 'line-through' : '',
              opacity: showSale ? '0.5' : '',
              color: theme => theme.palette.secondary.main,
            }}
          >
            {`${product.price.toFixed(2)} ${currencies[language]}`}
          </Typography>

          {showSale && (
            <Typography
              variant="subtitle1"
              component="p"
              sx={{mt: 1, fontWeight: 500, color: theme => theme.palette.secondary.main}}
            >
              {`${product.priceSale?.toFixed(2)} ${currencies[language]}`}
            </Typography>
          )}
        </Grid>

        <Stack>
          <Grid container spacing={2} alignItems="stratch">
            <Typography variant="subtitle1" component="p" sx={{textDecoration: 'underline'}}>
              {t('common:created')}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {format(new Date(product.createdAt), 'yyyy-MM-dd HH:mm')}
            </Typography>
          </Grid>

          {product.updatedAt && (
            <Grid container spacing={2} alignItems="stratch">
              <Typography variant="subtitle1" component="p" sx={{textDecoration: 'underline'}}>
                {t('common:updated')}
              </Typography>
              <Typography variant="subtitle1" component="p">
                {format(new Date(product.updatedAt), 'yyyy-MM-dd HH:mm')}
              </Typography>
            </Grid>
          )}
        </Stack>
      </CardContent>
      <AppButton
        to={`/products/${product.productId}`}
        variant="outlined"
        sx={{color: 'white', backgroundColor: 'orange', margin: '0 0 10px 10px'}}
      >
        {t('common:edit')}
      </AppButton>

      <Button
        variant="outlined"
        sx={{color: 'white', backgroundColor: 'coral', margin: '0 0 10px 10px'}}
        onClick={() => doDeleteItem(product)}
      >
        {t('common:delete')}
      </Button>
    </Card>
  );
}
