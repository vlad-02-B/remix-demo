import {useTranslation} from 'react-i18next';
import {useSnackbar, VariantType} from 'notistack';

import {Paper, Table, TableBody, TableContainer, Typography, useTheme} from '@mui/material';
import {useMediaQuery} from '@mui/system';

import {useMutationProductsDelete} from '~/services/products';

import {TableRowEmpty} from '~/global/components/table-row-empty';
import MobileTable from '~/global/components/MobileTable/mobile-table';

import {ApiProduct} from '~/api-client/types';

import {ProductsTableHead} from './table-head';
import {ProductsTableRow} from './table-row';
import {ProductsTableRowSkeleton} from './table-row-skeleton';

//
//

export const ProductsTable = ({data, isLoading}: {data?: ApiProduct[]; isLoading: boolean}) => {
  const {t} = useTranslation(['common', 'products']);
  const {enqueueSnackbar} = useSnackbar();
  const theme = useTheme();
  const deleteItem = useMutationProductsDelete();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  //

  const doDeleteItem = (item: ApiProduct) => {
    if (!window.confirm(t('common:deleteConfirm', {item: item.title.en || item.title.ar}))) return;

    deleteItem.mutate(
      {id: item.productId},
      {
        onSuccess: async result => {
          result?.meta?.message &&
            enqueueSnackbar(result?.meta?.message, {variant: 'success' as VariantType});
        },
        onError: err => {
          enqueueSnackbar(err?.message || 'unknown error', {variant: 'error' as VariantType});
        },
      },
    );
  };

  if (!data?.length)
    return (
      <Typography textAlign="center" variant="h5">
        {t('products:noProducts')}
      </Typography>
    );

  return isMobile ? (
    <MobileTable products={data} doDeleteItem={doDeleteItem} />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}}>
        <ProductsTableHead />
        <TableBody>
          {isLoading ? (
            <ProductsTableRowSkeleton />
          ) : !data?.length ? (
            <TableRowEmpty actionURL="/products/create" colSpan={4} />
          ) : (
            data?.map(row => (
              <ProductsTableRow key={row.productId} row={row} doDeleteItem={doDeleteItem} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
