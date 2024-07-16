const express = require('express');
const router = express.Router();
const ForumCategory = require('../models/forumCategory');
const Thread = require('../models/thread');
const Post = require('../models/post');
const passport = require('passport');

// Middleware to authenticate using JWT
const authenticate = passport.authenticate('jwt', { session: false });

// Create a new forum category
router.post('/categories', authenticate, async (req, res) => {
    try {
        const newCategory = new ForumCategory({
            title: req.body.title,
            description: req.body.description,
            author: req.user._id
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error creating forum category', error });
    }
});

// List all forum categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await ForumCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

// Update a forum category by its creator
router.put('/categories/:categoryId', authenticate, async (req, res) => {
    try {
        const category = await ForumCategory.findById(req.params.categoryId);
        if (!category || category.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized or Category not found' });
        }

        category.title = req.body.title || category.title;
        category.description = req.body.description || category.description;
        category.updatedAt = new Date();  // Update the timestamp
        await category.save();
        res.json(category);
    } catch (error) {
        console.error("Error updating category: ", error);
        res.status(500).json({ message: 'Error updating category', error });
    }
});



// Delete a forum category by its creator
router.delete('/categories/:categoryId', authenticate, async (req, res) => {
    try {
        const category = await ForumCategory.findOneAndDelete({ _id: req.params.categoryId, author: req.user._id });
        if (!category) {
            return res.status(403).json({ message: 'Unauthorized or Category not found' });
        }
        // Optionally delete all threads and posts related to this category
        await Thread.deleteMany({ category: req.params.categoryId });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
});


// Create a new thread in a specific category
router.post('/:categoryId/threads', authenticate, async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const newThread = new Thread({
            title,
            category: req.params.categoryId,
            author: req.user._id  // Assuming `req.user` is populated from the auth middleware
        });
        await newThread.save();
        res.status(201).json(newThread);
    } catch (error) {
        res.status(400).json({ message: 'Error creating thread', error });
    }
});

// Get all threads in a specific category
router.get('/:categoryId/threads', async (req, res) => {
    try {
        const threads = await Thread.find({ category: req.params.categoryId }).populate('author', 'username');
        res.json(threads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching threads', error });
    }
});

// Update a thread by its owner
router.put('/threads/:threadId', authenticate, async (req, res) => {
    try {
        const { title } = req.body;
        const thread = await Thread.findOne({ _id: req.params.threadId, author: req.user._id });

        if (!thread) {
            return res.status(403).json({ message: 'Unauthorized or Thread not found' });
        }

        thread.title = title || thread.title;
        await thread.save();
        res.json(thread);
    } catch (error) {
        res.status(500).json({ message: 'Error updating thread', error });
    }
});

// Delete a thread by its owner
router.delete('/threads/:threadId', authenticate, async (req, res) => {
    try {
        const thread = await Thread.findOneAndDelete({ _id: req.params.threadId, author: req.user._id });

        if (!thread) {
            return res.status(403).json({ message: 'Unauthorized or Thread not found' });
        }

        // Optionally delete all posts related to this thread
        await Post.deleteMany({ thread: req.params.threadId });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting thread', error });
    }
});

// Create a new post in a thread
router.post('/threads/:threadId/posts', authenticate, async (req, res) => {
    try {
        const newPost = new Post({
            content: req.body.content,
            thread: req.params.threadId,
            author: req.user._id
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: 'Error posting message', error });
    }
});

// Get all posts in a thread
router.get('/threads/:threadId/posts', async (req, res) => {
    try {
        const posts = await Post.find({ thread: req.params.threadId }).populate('author', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});



// Update a post by its owner
router.put('/posts/:postId', authenticate, async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findOne({ _id: req.params.postId, author: req.user._id });

        if (!post) {
            return res.status(403).json({ message: 'Unauthorized or Post not found' });
        }

        post.content = content || post.content;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
});

// Delete a post by its owner
router.delete('/posts/:postId', authenticate, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.postId, author: req.user._id });

        if (!post) {
            return res.status(403).json({ message: 'Unauthorized or Post not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
});

module.exports = router;
