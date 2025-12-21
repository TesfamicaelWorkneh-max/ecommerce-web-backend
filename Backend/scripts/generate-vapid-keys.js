// backend/scripts/generate-vapid-keys.js
import webpush from "web-push";

// Generate VAPID keys
const vapidKeys = webpush.generateVAPIDKeys();

console.log("✅ VAPID Keys Generated:");
console.log("\n📋 Add these to your .env file:");
console.log("================================");
console.log(`VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);
console.log("================================\n");

console.log("🎯 Your VAPID public key (for frontend):");
console.log(vapidKeys.publicKey);
