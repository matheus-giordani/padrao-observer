export default class Payment {
    constructor(paymentPublisher){
        this.paymentPublisher = paymentPublisher
    }
    creditCard(paymentData){
        console.log(`\nA payment ocurred from ${paymentData.userName} `);
        this.paymentPublisher.notify(paymentData)
    }
}