# CollabTE - Collaborative Text Editor

CollabTE is a collaborative text editor built using TipTap, offering a seamless platform for multiple users to collaboratively edit text files. The editor utilizes Firebase for basic file system functionality, enabling offline editing capabilities along with a room-based collaborative environment. Users can join specific rooms using unique IDs and collaboratively work on shared documents in real-time.

## Features

- **TipTap Text Editor**: Provides a basic text editing interface.
- **Firebase Integration**: Offers a simple file system using Firebase.
- **Offline Editing**: Allows users to edit files even when offline.
- **Room-Based Collaboration**: Users can join specific rooms to collaborate on shared documents.
- **Real-Time Collaboration**: Enables simultaneous editing by multiple users in a room.

## Installation

To set up CollabTE locally, follow these steps:

### Cloning the Repository

Clone the repository or extract the ZIP file:

```bash
git clone https://github.com/senju-hashirama/CollaborativeEditor
```

### Setting up Firebase

1. Set up a Firebase project with the following services enabled:
    - Authentication (with Google provider and Email/Password)
    - Cloud Firestore
    - Realtime Database 
   
2. Obtain the Firebase configuration object.

3. Place the Firebase configuration key into a `.env` file located in the `server` folder:

   ```dotenv
   FIREBASE_CONFIG={
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     // Add other necessary keys
   }
   ```

4. Paste the same Firebase configuration object into `app/lib/firebase.js` in your project.

### Installing Dependencies

Install the necessary dependencies by running the following commands:

```bash
cd CollabTE
npm install

cd server
npm install
```

### Starting the Server

Start the server by running:

```bash
# Frontend
npm run dev

# Server
cd server
node server.js
```

This will launch the frontend and server environments, allowing you to start using CollabTE locally.

## Usage

Once the server is running, access the CollabTE application in your browser at `http://localhost:your-port` and start collaborating in real-time within the text editor.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.