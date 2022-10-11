import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxWYY0GIN1-OZ37CqkDL3QkTJaClAqHNc",
  authDomain: "brushed-charts.firebaseapp.com",
  databaseURL: "https://brushed-charts.firebaseio.com",
  projectId: "brushed-charts",
  storageBucket: "brushed-charts.appspot.com",
  messagingSenderId: "60116989238",
  appId: "1:60116989238:web:b22140c028b5fb2c4def97",
  measurementId: "G-PZ69Q1XNTX"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firestore_db = getFirestore(firebaseApp);


export class FirestoreTool {
    collection_name = "draw-stock"

    async save(document_id, json_content) {
        const metadata = await doc(firestore_db, "draw-stock", document_id.toString())
        try {
            await setDoc(metadata, json_content)
        } catch (error) {
            alert(error)
        }
    }
}