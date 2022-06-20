import React, { useState, useEffect } from "react";
import ShopDisplay from "../ShopDisplay/ShopDisplay"
import { shopComponents } from "../variables";
import ProductData from "../../products";
import Checkout from "../Cart/Checkout";

const productCall = new ProductData();


function ShopContainer(props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [cartIds, setCartIds] = useState([])


  useEffect(() => {
    setLoading(true)
    productCall.fetchProductItems()
      .then((res) => {
        if (res && res.response.ok) {
          setLoading(false);
          setProducts(res.data);
        } else {
          setLoading(false)
        }
      }, (error) => {
        setLoading(false);
        setError(false)
      })
  }, [])


  // addItemToCart = (id) => {
  //   const newIds = [...this.state.cartIds, {id, quantity: 1}]
  //   this.setState({cartIds: newIds})
  // }

  // removeItemFromCart = (id) => {
  //   const newIds = this.state.cartIds.filter((cart) => cart.id !== id)
  //   this.setState({cartIds: newIds})
  // }

  // removeAllItemsFromCart = () => {
  //   this.setState({cartIds: []})
  // }

  // handleIncrementAction = (id, count) => {
  //   const {cartIds} = this.state
  //   const oldCartIds = [...cartIds]
  //   const incrementObj = oldCartIds.find(obj => obj.id === id)
  //     if (count === "asc") {
  //       incrementObj.quantity += 1
  //       this.setState({cartIds: oldCartIds})
  //       this.calculateCartDiscount()
  //     }
  //     else if (count === "desc") {
  //       incrementObj.quantity -= 1
  //       this.setState({cartIds: oldCartIds.filter((cart) => cart.quantity > 0)})
  //       this.calculateCartDiscount()
  //     }
  //   }

  // getSummaryData = () => {
  //   const {shopDisplay, cartIds} = this.state
  //   const record = cartIds.map((cart) => ({...shopDisplay.items.find((item) => item.key === cart.id), ...cart}))
  //   return record
  // }

  // getCartSubtotal = () => {
  //   let cartItems = ""
  //   cartItems = this.getSummaryData()
  //   const itemPrice = cartItems.map(item => item.price * item.quantity)
  //   const sum = itemPrice.reduce((total, current) => {
  //     return total + current
  //   }, 0)
  //   return sum;
  // }

  // handleDeliveryMethod = (e, subtotal) => {
  //   const deliveryMethod = e.target.value
  //   if (deliveryMethod === "Standard" || !deliveryMethod) {
  //     if (subtotal >= 250) {
  //       this.setState({deliveryCost: 0})
  //     } else {
  //       this.setState({deliveryCost: 25})
  //     }
  //   } else if (deliveryMethod === "Express") {
  //     this.setState({deliveryCost: 50})
  //   }
  // }

  // handleShippingData = (data) => {
  //   this.setState({shippingInfo: data})
  // }
  
  // handlePaymentData = (data) => {
  //   this.setState({paymentInfo: data})
  // }

  // handlePromoCode = (data) => {
  //   const promo = this.discountCodes.find((code) => {
  //     return code.code === data.code 
  //   })
  //   this.setState({discountType: promo})
  //   if (promo) {
  //     const discountAmount = promo.amount * this.getCartSubtotal()
  //     this.setState({discountAmount: discountAmount})
  //     this.setState({promoError: false})
  //   } else {
  //     this.setState({promoError: true})
  //   }
  // }

  // calculateCartDiscount = () => {
  //   const {discountType} = this.state
  //   if (discountType === 0) {
  //     return 0;
  //   } else {
  //     const newDiscount = this.state.discountType.amount * this.getCartSubtotal()
  //     this.setState({discountAmount: newDiscount})
  //     return newDiscount
  //   }
  // }

    // const filtered = products.items.filter((item) => cartIds.find((cart) => cart.id === item.key));
    return (
      <div >
        <ShopDisplay 
        cartIds={props.cartIds}
        handleIncrementAction={props.handleIncrementAction}
        routeChange={props.routeChange}
        onRemoveFromCart={props.removeItemFromCart}
        addItemToCart={props.addItemToCart} 
        products={products}
        loading={loading}
        // user={props.user}
        />
      </div>
    )
  
}

export default ShopContainer;







// class ShopContainer extends React.Component {
//   constructor(){
//     super()
//     this.discountCodes = [{code: "SUMMER", amount: 0.3}, {code: "GET10", amount: 0.1}]
//     this.state = {
//       ...shopComponents,
//       promoError: false,
//       // user: undefined,
//       cartIds: [],
//       shippingInfo: {},
//       deliveryCost: 0,
//       paymentInfo: {},
//       discountAmount: 0,
//       discountType: 0,
//       loading: false,
//       error: false, 
//       products: [],
//     }
//   }

//   updateSubState = (name, sub, state) => {
//     this.setState((prevState) => ({
//       [name]: {
//         ...prevState[name],
//         [sub]: state,
//       }
//     }))
//   }

//   componentDidMount() {
//     this.setState({loading: true})
//     products.fetchProductItems()
//       .then((res) => {
//         if (res && res.response.ok) {
//           this.setState({
//             products: res.data,
//             loading: false
//           })
//         } else {
//           this.setState({loading: false});
//         }
//       }, (error) => {
//         console.log(error);
//         this.setState({loading: false, error: true})
//       })
//   }

//   // showLogin = (toggled) => {
//   //   this.updateSubState("shopDisplay", "display", !toggled)
//   //   this.updateSubState("login", "display", toggled)
//   // }

//   showCart = (toggled) => {
//     this.updateSubState("shopDisplay", "display", !toggled)
//     this.updateSubState("cart", "display", toggled)
//   }

//   showShipping = (toggled) => {
//     this.updateSubState("cart", "display", toggled)
//     this.updateSubState("shipping", "display", !toggled)
//   }

//   showPayment = (toggled) => {
//     this.updateSubState("shipping", "display", toggled)
//     this.updateSubState("payment", "display", !toggled)
//   }

//   showConfirmPayment = (toggled) => {
//     this.updateSubState("payment", "display", toggled)
//     this.updateSubState("confirm", "display", !toggled)
//   }

//   backToCart = (toggled) => {
//     this.updateSubState("cart", "display", !toggled)
//     this.updateSubState("shipping", "display", toggled)
//   }

//   backToShipping = (toggled) => {
//     this.updateSubState("shipping", "display", !toggled)
//     this.updateSubState("payment", "display", toggled)
//   }

//   backToShopFromConfirm = (toggled) => {
//     this.updateSubState("shopDisplay", "display", toggled)
//     this.updateSubState("confirm", "display", !toggled)
//   }

//   addItemToCart = (id) => {
//     const newIds = [...this.state.cartIds, {id, quantity: 1}]
//     this.setState({cartIds: newIds})
//   }

//   removeItemFromCart = (id) => {
//     const newIds = this.state.cartIds.filter((cart) => cart.id !== id)
//     this.setState({cartIds: newIds})
//   }

//   removeAllItemsFromCart = () => {
//     this.setState({cartIds: []})
//   }

//   handleIncrementAction = (id, count) => {
//     const {cartIds} = this.state
//     const oldCartIds = [...cartIds]
//     const incrementObj = oldCartIds.find(obj => obj.id === id)
//       if (count === "asc") {
//         incrementObj.quantity += 1
//         this.setState({cartIds: oldCartIds})
//         this.calculateCartDiscount()
//       }
//       else if (count === "desc") {
//         incrementObj.quantity -= 1
//         this.setState({cartIds: oldCartIds.filter((cart) => cart.quantity > 0)})
//         this.calculateCartDiscount()
//       }
//     }

//   getSummaryData = () => {
//     const {shopDisplay, cartIds} = this.state
//     const record = cartIds.map((cart) => ({...shopDisplay.items.find((item) => item.key === cart.id), ...cart}))
//     return record
//   }

//   getCartSubtotal = () => {
//     let cartItems = ""
//     cartItems = this.getSummaryData()
//     const itemPrice = cartItems.map(item => item.price * item.quantity)
//     const sum = itemPrice.reduce((total, current) => {
//       return total + current
//     }, 0)
//     return sum;
//   }

//   handleDeliveryMethod = (e, subtotal) => {
//     const deliveryMethod = e.target.value
//     if (deliveryMethod === "Standard" || !deliveryMethod) {
//       if (subtotal >= 250) {
//         this.setState({deliveryCost: 0})
//       } else {
//         this.setState({deliveryCost: 25})
//       }
//     } else if (deliveryMethod === "Express") {
//       this.setState({deliveryCost: 50})
//     }
//   }

//   handleShippingData = (data) => {
//     this.setState({shippingInfo: data})
//   }
  
//   handlePaymentData = (data) => {
//     this.setState({paymentInfo: data})
//   }

//   handlePromoCode = (data) => {
//     const promo = this.discountCodes.find((code) => {
//       return code.code === data.code 
//     })
//     this.setState({discountType: promo})
//     if (promo) {
//       const discountAmount = promo.amount * this.getCartSubtotal()
//       this.setState({discountAmount: discountAmount})
//       this.setState({promoError: false})
//     } else {
//       this.setState({promoError: true})
//     }
//   }

//   calculateCartDiscount = () => {
//     const {discountType} = this.state
//     if (discountType === 0) {
//       return 0;
//     } else {
//       const newDiscount = this.state.discountType.amount * this.getCartSubtotal()
//       this.setState({discountAmount: newDiscount})
//       return newDiscount
//     }
//   }

//   render() {
//     const { paymentInfo, shopDisplay, confirm, login, cart,
//        cartIds, shipping, deliveryCost, payment, shippingInfo, user,  discountType, promoError, discountAmount, products, loading} = this.state
    
//     const filtered = shopDisplay.items.filter((item) => cartIds.find((cart) => cart.id === item.key));

//     return (
//       <div >
//         <ShopDisplay 
//         cartIds={cartIds}
//         routeChange={this.props.routeChange}
//         onRemoveFromCart={this.removeItemFromCart}
//         showCart={this.showCart}
//         onCart={this.addItemToCart} 
//         onLogin={this.showLogin} 
//         products={products}
//         loading={loading}
//         user={this.props.user}/>
//         <Checkout />
//         {shopDisplay.display && 
//         <ShopDisplay 
//         cartIds={cartIds}
//         onRemoveFromCart={this.removeItemFromCart}
//         showCart={this.showCart}
//         onCart={this.addItemToCart} 
//         onLogin={this.showLogin} 
//         products={products}
//         loading={loading}
//         user={this.props.user}/>}
//         {login.display && 
//         <LoginSignUp 
//         onReturn={this.showLogin}
//         onSubmit={(userData) => 
//           {this.setState({user: userData})
//         this.showLogin(false)}}/>} 
//         {cart.display &&
//         <Cart
//         cartIds={cartIds}
//         promoError={promoError}
//         onCart={this.showCart}
//         shopItems={shopDisplay.items}
//         discount={discountType === undefined ? 0 : discountType.amount * this.getCartSubtotal()}
//         onReturn={this.showCart}
//         incrementAction={this.handleIncrementAction}
//         removeItemFromCart={this.removeItemFromCart}  
//         removeAllItemsFromCart={this.removeAllItemsFromCart}
//         summaryData={this.getSummaryData()}
//         getCartSubtotal={this.getCartSubtotal}
//         filteredItems={filtered}
//         showShipping={this.showShipping}
//         handlePromoCode={this.handlePromoCode}
//         />}
//         {shipping.display && 
//         <Shipping 
//           cartIds={cartIds}
//           shopItems={shopDisplay.items}
//           discountAmount={discountAmount}
//           backToCart={this.backToCart}
//           summaryData={this.getSummaryData()}
//           getCartSubtotal={this.getCartSubtotal}
//           filteredItems={filtered}
//           handleDeliveryMethod={this.handleDeliveryMethod}
//           deliveryCost={deliveryCost}
//           handleShippingData={this.handleShippingData}
//           showPayment={this.showPayment}
//         />}
//         {payment.display && 
//         <Payment 
//           getCartSubtotal={this.getCartSubtotal}
//           discount={discountType === undefined ? 0 : discountType.amount * this.getCartSubtotal()}
//           summaryData={this.getSummaryData()}
//           filteredItems={filtered}
//           handleDeliveryMethod={this.handleDeliveryMethod}
//           deliveryCost={deliveryCost}
//           discountAmount={discountAmount}
//           handleShippingData={this.handleShippingData}
//           backToShipping={this.backToShipping}
//           shippingInfo={shippingInfo}
//           userEmail={user.email}
//           showConfirmPayment={this.showConfirmPayment}
//           handlePaymentData={this.handlePaymentData}
//         />}
//         {confirm.display &&
//         <ConfirmPayment 
//           paymentInfo={paymentInfo}
//           summaryData={this.getSummaryData()}
//           discountAmount={discountAmount}
//           getCartSubtotal={this.getCartSubtotal}
//           deliveryCost={deliveryCost}
//           userEmail={user.email}
//           shippingInfo={shippingInfo}
//           backToShopFromConfirm={this.backToShopFromConfirm}
//         />}
//       </div>
//     )
//   }
// }

// export default ShopContainer;