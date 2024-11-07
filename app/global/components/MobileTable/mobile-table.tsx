import {Stack} from '@mui/material';

import ProductCard from '~/global/components/Card/Card';

import {ApiProduct} from '~/api-client/types';

interface MobileTable {
  products?: ApiProduct[];
  doDeleteItem: (item: ApiProduct) => void;
}

const MobileTable = ({products, doDeleteItem}: MobileTable) => {
  return (
    <Stack spacing={2}>
      {products?.map(product => (
        <ProductCard key={product.productId} product={product} doDeleteItem={doDeleteItem} />
      ))}
    </Stack>
  );
};

export default MobileTable;
