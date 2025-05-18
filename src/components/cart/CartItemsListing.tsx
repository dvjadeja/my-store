import CartItemsByStore from './CartItemsByStore';
import type { ItemsByStoreType } from '../../pages/CartPage';

interface CartItemsListingProps {
  itemsByStore: ItemsByStoreType;
}

const CartItemsListing = ({ itemsByStore }: CartItemsListingProps) => {
  return (
    <>
      {Object.entries(itemsByStore).map(
        ([storeId, { store, items: storeItems, subtotal }]) => (
          <CartItemsByStore
            key={storeId}
            store={store}
            storeItems={storeItems}
            subtotal={subtotal}
          />
        )
      )}
    </>
  );
};

export default CartItemsListing;
