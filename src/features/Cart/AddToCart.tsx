import { useEffect, useState } from "react";
import { Button } from "@/components/common/ui/Button";
import { useNavigate } from "react-router-dom";
import CartItemList from "@/features/Cart/CartItemList";
import PriceDetails from "@/features/Cart/PriceDetails";
import DeliveryLocation from "@/features/Cart/DeliveryLocation";
import { useTranslation } from "react-i18next";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "@/services/cart.service";

export default function AddToCart() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH CART
  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getCart();

        setCartItems(data);

        const allIds = data.map((item: any) => item.cartId);
        setCheckedItems(allIds);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleCheckboxChange = (cartId: string) => {
    setCheckedItems((prev) =>
      prev.includes(cartId)
        ? prev.filter((id) => id !== cartId)
        : [...prev, cartId],
    );
  };

  const handleIncrement = async (item: any) => {
    await updateCartItem({
      cartId: item.cartId,
      quantity: item.quantity + 1,
    });
    fetchCart();
  };

  const handleDecrement = async (item: any) => {
    if (item.quantity === 1) return;
    await updateCartItem({
      cartId: item.cartId,
      quantity: item.quantity - 1,
    });
    fetchCart();
  };

  const handleRemove = async (cartId: string) => {
    await removeCartItem(cartId);
    fetchCart();
  };

  const checkedCartItems = cartItems.filter((item) =>
    checkedItems.includes(item.cartId),
  );

  const totalPrice = checkedCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (loading) return <div className="p-6">Loading cart...</div>;

  return (
    <div className="h-full flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 p-2 md:p-6">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-6 min-h-full">
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white px-2 py-1 rounded shadow-sm flex justify-between">
              <div className="text-blue-600 border-b-2 border-blue-600 font-semibold">
                {t("CART.cartItems")}({cartItems.length})
              </div>
            </div>

            <DeliveryLocation />

            <CartItemList
              items={cartItems}
              checkedItems={checkedItems}
              onCheckboxChange={handleCheckboxChange}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />

            {cartItems.length > 0 && (
              <div className="bg-white p-1 flex justify-between gap-4 sticky bottom-0">
                <Button onClick={() => navigate(-1)}>{t("CART.back")}</Button>

                <Button
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        selectedItems: checkedCartItems,
                        fromCart: true,
                      },
                    })
                  }
                  disabled={totalPrice === 0}
                >
                  {t("CART.placeOrder")}
                </Button>
              </div>
            )}
          </div>

          <aside className="w-full lg:w-80 px-2">
            <PriceDetails
              itemCount={checkedItems.length}
              totalPrice={totalPrice}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
