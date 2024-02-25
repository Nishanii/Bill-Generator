// Import Firebase SDKs
const firebase = require("firebase/app");
require("firebase/firestore");

// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Define User class
class User {
    constructor() {
        this.usersRef = db.collection("users");
    }

    async add(name, password, email) {
        const user = { name, password, email };

        try {
            const docRef = await this.usersRef.add(user);
            console.log('User Added with ID: ', docRef.id);
            user.id = docRef.id;
            return user;
        } catch (error) {
            console.error('Error Adding User: ', error);
            throw error;
        }
    }
}

// Firestore event listener
db.collection('events').onSnapshot(snapshot => {
    const newestEvent = snapshot.docChanges()[0].doc.data();
    const id = snapshot.docChanges()[0].doc.id;
    showLatestEvent(newestEvent, id);

    snapshot.docChanges().shift();

    snapshot.docChanges().forEach(event => {
        showEvents(event.doc.data(), event.doc.id);
    });
});

// Function to add a new event
const addNewEvent = (eventData) => {
    db.collection('events').add(eventData)
        .then(() => {
            console.log('Your event has been successfully saved');
        })
        .catch(err => console.log(err));
};

module.exports = {
    User,
    addNewEvent
};
