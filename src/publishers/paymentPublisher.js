export default class PaymentPublisher {
    #observers = new Set()
    notify(data) {
        this.#observers.forEach(observer => observer.update(data))
    }

    subcribe(observable) {
        this.#observers.add(observable)
    }

    unsubscribe(observable) {
        this.#observers.delete(observable)
    }
}