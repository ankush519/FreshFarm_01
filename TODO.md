# Payment Feature Implementation

## Backend Tasks
- [ ] Update Order model to include paymentMethod and gmail fields
- [ ] Install nodemailer dependency
- [ ] Add OTP routes: /otp/send and /otp/verify
- [ ] Update orders route to handle paymentMethod and gmail in order creation

## Frontend Tasks
- [ ] Update api.js to include OTP API methods
- [ ] Modify Cart.jsx to include payment modal with:
  - Payment mode selection (Credit Card, Debit Card, UPI, Net Banking)
  - Gmail input field
  - OTP input and verification
  - Proceed to place order after verification

## Testing
- [ ] Test the full payment flow: select mode, enter Gmail, send OTP, verify OTP, place order
