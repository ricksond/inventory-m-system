import admin from "firebase-admin";
import serviceAccount from "../app/serviceAccount.json"

if(!admin.app.length){
    admin.initializeApp({credential:admin.credential.cert(serviceAccount as admin.ServiceAccount)       
    });
}

export const adminAuth=admin.auth()