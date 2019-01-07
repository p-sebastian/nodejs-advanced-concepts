const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  // app.get('/api/blogs', requireLogin, async (req, res) => {
  //   const redis = require('redis');
  //   const redisUrl = 'redis://127.0.0.1:6379';
  //   const client = redis.createClient(redisUrl);
  //   const util = require('util');
  //   /**
  //    * Converts function that has the last argument as a callback of type
  //    * (err: any, data: any) => void
  //    * and converts it into a promise.
  //    */
  //   client.get = util.promisify(client.get);
    
  //   // check for cache
  //   const cachedBlogs = await client.get(req.user.id);

  //   // if yes, respond right away
  //   if (cachedBlogs) {
  //     console.log('Serving from cache');
  //     return res.send(JSON.parse(cachedBlogs));
  //   }

  //   // if not respond and update cache server
  //   const blogs = await Blog.find({ _user: req.user.id });
  //   console.log('serving from mongodb')
  //   res.send(blogs);

  //   // make sure to stringify objects
  //   client.set(req.user.id, JSON.stringify(blogs));
  // });
  app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = await Blog.find({ _user: req.user.id });

    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
