const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");
const {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyA22EikpfXXw9B2vPgJMTV1SyOdlbKWjyY",
  authDomain: "airbnb-eed3e.firebaseapp.com",
  projectId: "airbnb-eed3e",
  storageBucket: "airbnb-eed3e.appspot.com",
  messagingSenderId: "945616720161",
  appId: "1:945616720161:web:88199948c3d5eed4afae60",
};

const firebaseApp = initializeApp(firebaseConfig);

const imageUserConverter = async (req, res, next) => {
  const { file } = req;

  const newImageName = file ? `${Date.now()}${file.originalname}` : "";
  let firebaseFileURL;

  if (file) {
    fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newImageName),
      async (error) => {
        if (error) {
          next(error);
          return;
        }

        fs.readFile(
          path.join("uploads", "images", newImageName),
          async (readError, readFile) => {
            if (readError) {
              next(readError);
              return;
            }
            const storage = getStorage(firebaseApp);

            const storageRef = ref(storage, newImageName);

            const metadata = {
              contentType: "image",
            };

            await uploadBytes(storageRef, readFile, metadata);
            firebaseFileURL = await getDownloadURL(storageRef);

            req.newImageName = newImageName;
            req.firebaseFileURL = firebaseFileURL;

            if (firebaseFileURL) {
              next();
            }
          }
        );
      }
    );
    if (firebaseFileURL) {
      next();
    }
  } else {
    next();
  }
};

module.exports = imageUserConverter;
