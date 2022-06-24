import React, { createContext, useState, useEffect } from "react";
import ProductData from "../../products";

const productCall = new ProductData();

export const userContext = createContext({});
const { Provider } = userContext;

const useDeliveryMethod = (
  cartIds,
  getCartSubtotal,
  handleDeliveryMethod,
  deliveryMethod
) => {
  useEffect(() => {
    if (cartIds.length > 0 && !deliveryMethod) {
      handleDeliveryMethod(
        { target: { value: "Standard" } },
        getCartSubtotal()
      );
    }
  }, [cartIds, deliveryMethod]);
};

const UserProvider = (props) => {
  const [user, setUser] = useState("");
  const [cartIds, setCartIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantityError, setQuantityError] = useState("");
  const [discountType, setDiscountType] = useState(0);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [shippingData, setShippingData] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState([]);

  useEffect(() => {
    setLoading(true);
    productCall.fetchProductItems().then(
      (res) => {
        if (res && res.response.ok) {
          setLoading(false);
          setProducts(res.data);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        console.log(error);
        setLoading(false);
        setLoadError(true);
      }
    );
  }, []);

  const getCartSubtotal = (newerItemsInCart) => {
    let cartItems = "";
    const itemPrice = itemsInCart.map((item) => {
      const itemQuantity = (newerItemsInCart || cartIds).find(
        (cartItem) => item.id === cartItem.id
      ) || { quantity: 0 };
      return item.price * itemQuantity.quantity;
    });

    const sum = itemPrice.reduce((total, current) => {
      return total + current;
    }, 0);
    return sum;
  };

  const calculateCartDiscount = (newerItemsInCart) => {
    if (discountType === 0) {
      return 0;
    } else {
      const newDiscount =
        discountType.amount * getCartSubtotal(newerItemsInCart);
      setCartDiscount(newDiscount);
      return newDiscount;
    }
  };

  const itemsInCart = products.filter((product) =>
    cartIds.find((cartId) => cartId.id === product.id)
  );

  const addItemToCart = (id) => {
    const newIds = [...cartIds, { id, quantity: 1 }];
    setCartIds((prevState) => [...prevState, { id, quantity: 1 }]);
  };

  const countCartItems = () => {
    const sum = cartIds.reduce((total, current) => {
      return total + current.quantity;
    }, 0);
    return sum;
  };

  const handleIncrementAction = (item, count) => {
    const oldCartIds = [...cartIds];
    let incrementObj = oldCartIds.find((obj) => obj.id === item);

    if (!incrementObj) {
      addItemToCart(item);
      oldCartIds.push({ id: item, quantity: 1 });
      incrementObj = oldCartIds.find((obj) => obj.id === item);
    }
    if (count === "asc") {
      const databaseQuantity = products.find(
        (product) => product.id === incrementObj.id
      ).quantity;

      if (databaseQuantity === incrementObj.quantity) {
        incrementObj.quantity -= 1;
        setQuantityError("Limit exceeded");
      } else {
        setQuantityError("");
      }
      incrementObj.quantity += 1;
      setCartIds(oldCartIds);
      calculateCartDiscount();
    } else if (count === "desc") {
      incrementObj.quantity -= 1;
      setQuantityError("");
      setCartIds(oldCartIds.filter((cart) => cart.quantity > 0));
      calculateCartDiscount();
    }
  };

  const handleDeliveryMethod = (e, subtotal) => {
    const deliveryMethod = e.target.value;
    if (deliveryMethod === "Standard" || !deliveryMethod) {
      if (subtotal >= 250) {
        setDeliveryCost(0);
      } else {
        setDeliveryCost(25);
      }
    } else if (deliveryMethod === "Express") {
      setDeliveryCost(50);
    }
  };

  const taxAmount = 0.07 * getCartSubtotal();

  useDeliveryMethod(
    cartIds,
    getCartSubtotal,
    handleDeliveryMethod,
    deliveryMethod
  );

  console.log("discountType", discountType);
  console.log("cartDiscont", cartDiscount);

  return (
    <Provider
      {...props}
      value={{
        user,
        setUser,
        cartIds,
        setCartIds,
        addItemToCart,
        handleIncrementAction,
        countCartItems,
        products,
        setProducts,
        loading,
        itemsInCart,
        cartSubtotal: getCartSubtotal(),
        quantityError,
        setQuantityError,
        totalCartItems: countCartItems(),
        cartDiscount,
        setCartDiscount,
        discountType,
        setDiscountType,
        shippingData,
        setShippingData,
        deliveryMethod,
        handleDeliveryMethod,
        deliveryCost,
        paymentInfo,
        setPaymentInfo,
        setDeliveryMethod,
        taxAmount,
        loadError,
        calculateCartDiscount,
      }}
    />
  );
};

export default UserProvider;
