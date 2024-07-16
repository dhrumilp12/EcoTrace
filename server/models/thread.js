const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumCategory', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thread', threadSchema);
