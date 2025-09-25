# 🎶 CryptMusic
CryptMusic is a collaborative music listening platform built with **Node.js** and **Express.js**, where users can listen to music together in groups. Music is streamed directly from **YouTube**, and metadata is stored in **MongoDB** for faster retrieval.

## ✨ Features
- 🔗 **Group Music Listening** – Enjoy synchronized music streaming with friends.
- 🎥 **YouTube Integration** – Music is streamed using YouTube video IDs.
- 🔍 **Smart Search** – If a video ID is unavailable, the app uses Google Search API to find the YouTube video.
- 💾 **Metadata Caching** – Once fetched, metadata is stored in MongoDB for quick access in future requests.
- ⚡ **Express.js Backend APIs** – Lightweight, RESTful APIs for efficient communication.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Integrations:** YouTube (via Google Search API)
- **Other Tools:** Mongoose, Validator, etc.

## 🚀 Getting Started
### 1. Clone the repository
```
git clone git@github.com:cryp73r/cryptmusic-backend.git
cd cryptmusic-backend
```

### 2. Install dependencies
```
npm install
```

### 3. Environment Variables </br>
   Create a dev.env file in the config directory and add the following:
```
PORT=5000
MONGODB_URL=your_mongodb_connection_string
YOUTUBE_KEY=your_youtube_api_key
```

### 4. Run the server
```
npm run dev
```

The server will start at: </br>
👉 ```http://localhost:5000```

## 🤝 Contributing
Contributions are welcome! Feel free to:
- Submit issues and feature requests
- Fork and create pull requests