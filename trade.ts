import { KiteConnect } from "kiteconnect";
import { config } from "dotenv";

config();

const apiKey = process.env.API_KEY || "your_api_key";
// const apiSecret = process.env.API_SECRET || "your_api_secret";
const accessToken = process.env.ACCESS_TOKEN || "your_access_token";

const kc = new KiteConnect({ api_key: apiKey });

export async function getProfileData() {
    try {
        kc.setAccessToken(accessToken);
        const profile = await kc.getProfile();
        console.log("Profile:", profile);
        return profile;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export async function placeOrder(tradeSymbol: string, transactionType: "BUY" | "SELL", quantity: number) {
    try {
        kc.setAccessToken(accessToken);
        const order = await kc.placeOrder("regular", {
            exchange: "NSE",
            tradingsymbol: tradeSymbol,
            transaction_type: transactionType,
            quantity: quantity,
            order_type: "MARKET",
            product: "CNC"
        });
        console.log("Order placed successfully:", order);
        return order;
    } catch (err) {
        console.error("Error placing order:", err);
        throw err;
    }
}