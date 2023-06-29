import Payment from "./events/payments.js";
import MarketingObserver from "./observers/marketing.js";
import ShipmentObserver from "./observers/shipment.js";
import PaymentPublisher from "./publishers/paymentPublisher.js";


const publisher = new PaymentPublisher()

const marketing = new MarketingObserver()
publisher.subcribe(marketing)

const shipping = new ShipmentObserver()
publisher.subcribe(shipping)

const payment = new Payment(publisher)

payment.creditCard({ userName: 'John Doe', id: Date.now() })

publisher.unsubscribe(marketing)
payment.creditCard({ userName: 'Matheus Oliveira', id: Date.now() })