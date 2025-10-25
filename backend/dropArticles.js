// backend/dropArticles.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dropArticles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Drop the articles collection
    await mongoose.connection.db.collection('articles').drop();
    console.log('✅ Dropped articles collection successfully!');
    
    process.exit(0);
  } catch (error) {
    if (error.code === 26) {
      console.log('ℹ️  Articles collection does not exist, nothing to drop');
    } else {
      console.error('Error:', error);
    }
    process.exit(0);
  }
};

dropArticles();