import app from "./firebaseConfig"
import { getStorage } from "firebase/storage"

const storage = getStorage(app)

export default storage