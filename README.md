This project was created for Devslopes Academy. Real pictures from local artist Haley Klein Studios are included.

🔍 This project focuses on a few major principles:

Forms and form validation with React
Building stateful components
Passing data between components

🛠 Requirements:
You will build a 5-part checkout form.

Signup/Login
Customer cart
Shipping information
Payment information
Confirmation
Must include the "progress bar" as shown in the SHIPPING & PAYMENT mockup below.
Note: Please do NOT use React Routing in this project. You will learn about it later. The goal is to master components, props, state and conditional UI rendering.

🛠 Signup/Login

User can sign-in
Password field is obscured
There is an "eye" icon next to password to reveal what is being typed
If password is invalid, show an error message as depicted in the screenshot below
If successful sign-in, take user to Customer Cart
User can switch between Sign in and Create Account
If creating an account there will be two password fields
Passwords must match or show appropriate error as depicted below
First name and last name cannot have numbers
Postal code must not allow text (numbers only)
Show an "eye" icon next to password to reveal what is being typed
If an account for that email already exists, show an error message
Add a facebook sign in button (non-functional).

🛠 Customer Cart

Create a cart that has 2-5 items in it
These should be actual components with item value
The total sum of all items should be calculated as a total
Items can be removed and quantities can be increased or decreased -- cart total should adjust accordingly
If there are zero cart items the Checkout button should be disabled
If Checkout is selected move to the shipping screen

🛠 Shipping Information

Show all shipping fields as depicted in the screenshot below
Have standard and express shipping options -- the shipping & handling/checkout prices should adjust accordingly
Ensure phone fields cannot take text (only numbers)
Ensure postal code cannot take text (only numbers)
Make sure all fields are completed or prevent the user from moving forward. Show appropriate error messages
Back to cart button should go back to cart
There should be a Next or "Payment" button to go to next screen

🛠 Payment Information

Create a credit card formatted that takes all major credit cards (Visa, Master Card, American Express, etc)
Format the credit card field so the numbers are properly spaced (we don't want it to look ugly!)
Have a dropdown for month and year for expiration dates
Show errors if fields are entered incorrectly
The Pay button should show the total price. If the fields are not complete this button should be disabled
Make sure to show the cart/total at the right (or somewhere else)
The Pay button should take the user to the confirmation screen
A user should be able to apply a promo code and receive a discount.

🛠 Confirmation Screen

Should show amount paid
Should show last 4 digits of credit card used to make the purchase
Add other UI as depicted below
