class Payment {
  constructor(payment_id, booking_id, amount, discount, vat, status) {
    this.payment_id = payment_id;
    this.booking_id = booking_id;
    this.discount = discount;
    this.vat = vat;
    this.amount = amount;
    this.status = status;
  }
}

module.exports = Payment;
