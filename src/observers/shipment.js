export default class ShipmentObserver {
    update({ id, userName }) {
        // é responsabilidade do update fazer o gerenciamento dos seus prorios erros e exeções
        console.log(`[${id}]: Sending package to ${userName} `)
    }
}