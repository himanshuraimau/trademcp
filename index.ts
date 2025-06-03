import { getProfileData } from "./trade";
getProfileData()
    .then(() => {
        console.log("Profile data fetched successfully.");
    }
    )
    .catch((err) => {
        console.error("Error fetching profile data:", err);
    }
    );

    
import { placeOrder } from "./trade";
placeOrder("GOLDBEES", "BUY", 1)
    .then(() => {
        console.log("Order placed successfully.");
    }
    )
    .catch((err) => {
        console.error("Error placing order:", err);
    });
