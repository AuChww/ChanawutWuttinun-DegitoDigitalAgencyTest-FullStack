const PaymentRepository = require('../Repository/paymentRepository');

class PaymentService {
  constructor() { this.repo = new PaymentRepository(); }

  addPayment(data) {
    const purchaseId = this.repo.payments?.length + 1 || 1;
    const newPayment = { payment_id: purchaseId, ...data };
    return this.repo.addPayment(newPayment);
  }
}

module.exports = PaymentService;
