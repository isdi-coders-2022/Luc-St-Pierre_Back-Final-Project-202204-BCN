const fs = require("fs/promises");
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

const imagePlacesConverter = async (req, res, next) => {
  try {
    const { file, files } = req;

    let firebaseFileURL;

    const filesToUpload = file ? [file] : files;

    const urls = await Promise.all(
      filesToUpload.map(async (fileItem) => {
        const prefixImage = Date.now();
        const newImageName = file ? `${prefixImage}-${file.originalname}` : "";

        const readFile = await fs.readFile(
          path.join("uploads", "images", fileItem.filename)
        );
        const storage = getStorage(firebaseApp);

        const storageRef = ref(storage, fileItem.filename);

        const metadata = {
          contentType: "image",
        };

        await uploadBytes(storageRef, readFile, metadata);
        firebaseFileURL = await getDownloadURL(storageRef);

        return {
          fileName: newImageName,
          downloadURL: firebaseFileURL,
        };
      })
    );

    req.uploadedFiles = urls;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = imagePlacesConverter;
