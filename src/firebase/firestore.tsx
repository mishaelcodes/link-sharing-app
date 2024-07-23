// ****************** firebase imports

import { getFirestore } from "firebase/firestore";
import app from "./firebaseConfig";

// ****************** database instance

const db = getFirestore(app);

export default db;
