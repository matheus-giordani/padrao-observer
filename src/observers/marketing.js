export default class MarketingObserver {
    update({id, userName}){
        console.log(`[${id}]: Sending marketing email to ${userName} `);
    }
}