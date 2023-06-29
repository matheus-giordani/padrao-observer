import { expect, describe, it, jest, beforeAll } from '@jest/globals'
import PaymentPublisher from '../src/publishers/paymentPublisher.js'
import Payment from '../src/events/payments.js'
import MarketingObserver from './../src/observers/marketing.js'
import ShipmentObserver from './../src/observers/shipment.js'


describe('Test Suite for Observer Pattern', () => {
    beforeAll(
        jest.spyOn(console, 'log').mockImplementation(() => { })
    )

    describe('#PaymentSubscribe', () => {

        it('should notify observers', () => {
            const publisher = new PaymentPublisher()
            const observer = {
                update: jest.fn()
            }
            const data = 'hello world'
            const expected = data
            publisher.subcribe(observer)
            publisher.notify(data)
            expect(observer.update).toHaveBeenCalledWith(expected)
        })
        it('should not notify unsubscribed observers ', () => {
            const publisher = new PaymentPublisher()
            const observer = {
                update: jest.fn()
            }
            const data = 'hello world'
            publisher.subcribe(observer)
            publisher.unsubscribe(observer)
            publisher.notify(data)
            expect(observer.update).not.toHaveBeenCalled
        })

    })
    describe('#Payment', () => {
        it('should notify publishers after a credit card transaction', () => {
            const publisher = new PaymentPublisher()
            const payment = new Payment(publisher)

            const paymentPublisherNotifierSpy = jest.spyOn(
                payment.paymentPublisher,
                payment.paymentPublisher.notify.name)

            const data = { userName: 'John Doe', id: Date.now() }
            payment.creditCard(data)

            expect(paymentPublisherNotifierSpy).toHaveBeenCalledTimes(1)
            expect(paymentPublisherNotifierSpy).toHaveBeenCalledWith(data)
        })

    })

    describe('#All', () => {
        it('should notify subcribers after a credit card payment', () => {
            const publisher = new PaymentPublisher()
            const { marketing, shipping } = { marketing: new MarketingObserver(), shipping: new ShipmentObserver() }
            const { marketingSpy, shippingSpy } = {
                marketingSpy: jest.spyOn(marketing, marketing.update.name),
                shippingSpy: jest.spyOn(shipping, shipping.update.name)
            }
            const data = { userName: 'John Doe', id: Date.now() }
            publisher.subcribe(marketing)
            publisher.subcribe(shipping)
            const payment = new Payment(publisher)
            payment.creditCard(data)

            expect(marketingSpy).toHaveBeenCalledWith(data)
            expect(shippingSpy).toHaveBeenCalledWith(data)
        })

    })
})