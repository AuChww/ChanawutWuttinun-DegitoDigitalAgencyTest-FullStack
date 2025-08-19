const Payment = require('../Entity/paymentEntity');
const paymentsData = require('../Seeder/payment.json');

class PaymentRepository {
  constructor() {
    this.payments = paymentsData.map(
      p => new Payment(
        p.payment_id,
        p.booking_id,
        p.amount,
        p.discount,
        p.vat,
        p.status
      )
    );
  }

  getAllPayments() {
    return this.payments;
  }

  getPaymentById(id) {
    return this.payments.find(p => p.payment_id === id);
  }

  addPayment(paymentData) {
    const newId = this.payments.length + 1;
    const newPayment = new Payment(
      newId,
      paymentData.booking_id,
      paymentData.amount,
      paymentData.discount,
      paymentData.vat,
      paymentData.status
    );
    this.payments.push(newPayment);
    return newPayment;
  }
}

module.exports = PaymentRepository;
