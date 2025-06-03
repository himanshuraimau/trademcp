import { KiteConnect } from "kiteconnect";
import { config } from "dotenv";



config();



const apiKey = process.env.API_KEY || "your_api_key";
// const apiSecret = process.env.API_SECRET || "your_api_secret";
const accessToken = process.env.ACCESS_TOKEN || "your_access_token";

const kc = new KiteConnect({ api_key: apiKey });

console.log(kc.getLoginURL());

async function init() {
    try {
        kc.setAccessToken(accessToken);
        await getProfile();
    } catch (err) {
        console.error(err);
    }
}



async function getProfile() {
    try {
        const profile = await kc.getProfile();
        console.log("Profile:", profile);
    } catch (err) {
        console.error("Error getting profile:", err);
    }
}
// Initialize the API calls
init();