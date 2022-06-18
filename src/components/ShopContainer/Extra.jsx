// {cart.display &&
//   <Cart
//   cartIds={cartIds}
//   promoError={promoError}
//   onCart={this.showCart}
//   shopItems={shopDisplay.items}
//   discount={discountType === undefined ? 0 : discountType.amount * this.getCartSubtotal()}
//   onReturn={this.showCart}
//   incrementAction={this.handleIncrementAction}
//   removeItemFromCart={this.removeItemFromCart}  
//   removeAllItemsFromCart={this.removeAllItemsFromCart}
//   summaryData={this.getSummaryData()}
//   getCartSubtotal={this.getCartSubtotal}
//   filteredItems={filtered}
//   showShipping={this.showShipping}
//   handlePromoCode={this.handlePromoCode}
//   />}
//   {shipping.display && 
//   <Shipping 
//     cartIds={cartIds}
//     shopItems={shopDisplay.items}
//     discountAmount={discountAmount}
//     backToCart={this.backToCart}
//     summaryData={this.getSummaryData()}
//     getCartSubtotal={this.getCartSubtotal}
//     filteredItems={filtered}
//     handleDeliveryMethod={this.handleDeliveryMethod}
//     deliveryCost={deliveryCost}
//     handleShippingData={this.handleShippingData}
//     showPayment={this.showPayment}
//   />}
//   {payment.display && 
//   <Payment 
//     getCartSubtotal={this.getCartSubtotal}
//     discount={discountType === undefined ? 0 : discountType.amount * this.getCartSubtotal()}
//     summaryData={this.getSummaryData()}
//     filteredItems={filtered}
//     handleDeliveryMethod={this.handleDeliveryMethod}
//     deliveryCost={deliveryCost}
//     discountAmount={discountAmount}
//     handleShippingData={this.handleShippingData}
//     backToShipping={this.backToShipping}
//     shippingInfo={shippingInfo}
//     userEmail={user.email}
//     showConfirmPayment={this.showConfirmPayment}
//     handlePaymentData={this.handlePaymentData}
//   />}
//   {confirm.display &&
//   <ConfirmPayment 
//     paymentInfo={paymentInfo}
//     summaryData={this.getSummaryData()}
//     discountAmount={discountAmount}
//     getCartSubtotal={this.getCartSubtotal}
//     deliveryCost={deliveryCost}
//     userEmail={user.email}
//     shippingInfo={shippingInfo}
//     backToShopFromConfirm={this.backToShopFromConfirm}
//   />}


/* FROM STATE */
this.discountCodes = [{code: "SUMMER", amount: 0.3}, {code: "GET10", amount: 0.1}]
