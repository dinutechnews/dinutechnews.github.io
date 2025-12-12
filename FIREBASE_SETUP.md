# Firebase Setup for Views/Likes Database

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "d-tech-news-views")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can change security rules later)
4. Select a location for your database
5. Click "Done"

## Step 3: Get Your Firebase Configuration

1. In your Firebase project console, click the gear icon → "Project settings"
2. Scroll down to "Your apps" section
3. Click the "Add app" button and select the web icon (`</>`)
4. Register your app with a nickname (e.g., "d-tech-news")
5. Copy the Firebase configuration object

## Step 4: Update the Configuration in index.html

Replace the placeholder Firebase config in `index.html` with your actual configuration:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-actual-app-id"
};
```

## Step 5: Set Up Firestore Security Rules (Optional but Recommended)

Go to Firestore Database → Rules and update them for production:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to articles collection
    match /articles/{articleId} {
      allow read, write: if true; // For testing - restrict in production
    }

    // Allow read/write access to likes collection
    match /likes/{likeId} {
      allow read, write: if true; // For testing - restrict in production
    }
  }
}
```

## Step 6: Test the Implementation

1. Open your website in a browser
2. Try clicking on article titles to increment views
3. Try clicking the like buttons (❤️/🤍) to toggle likes
4. Check your Firebase console to see the data being stored

## Features Added

- **Real-time Views**: Article view counts are stored in Firebase and increment when users click article links
- **User Likes**: Users can like/unlike articles with persistent state stored in Firebase
- **Anonymous Users**: Each user gets a unique ID stored in localStorage for tracking likes
- **Real-time Updates**: View and like counts update immediately across all users

## Data Structure

### Articles Collection
```
articles/{articleId}
├── views: number
└── likes: number
```

### Likes Collection
```
likes/{articleId}_{userId}
├── userId: string
├── articleId: number
└── timestamp: Date
```

## Troubleshooting

1. **Firebase not connecting**: Check your internet connection and verify the config values
2. **Data not saving**: Check the browser console for error messages
3. **Likes not working**: Ensure the user ID is being generated correctly

## Security Note

The current setup allows anyone to read/write data. For production, implement proper security rules based on your authentication system.
