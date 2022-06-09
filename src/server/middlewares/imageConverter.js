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

const imageConverter = async (req, res, next) => {
  const { file } = req;

  const prefixImage = Date.now();
  const newImageName = file ? `${prefixImage}-${file.originalname}` : "";

  if (file) {
    await fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newImageName),
      async (error) => {
        if (error) {
          next(error);
        }

        await fs.readFile(
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
            const firebaseFileURL = await getDownloadURL(storageRef);

            req.newImageName = newImageName;
            req.firebaseFileURL = firebaseFileURL;

            if (firebaseFileURL) {
              next();
            }
          }
        );
      }
    );
  } else {
    req.newImageName = "";
    req.firebaseFileURL = "";
    next();
  }
};

module.exports = imageConverter;
