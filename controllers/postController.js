const postService = require('../services/postService');

const newPost = async (req, res) => {
  const { id } = req.user;
  const { title, content } = req.body;

  const postOrError = await postService.newPost(id, title, content);
  res.status(postOrError.message ? postOrError.code : 201).json(postOrError);
};

const getPosts = async (req, res) => {
  const allPosts = await postService.getPosts();
  res.status(allPosts.message ? allPosts.code : 200).json(allPosts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  res.status(post.message ? post.code : 200).json(post);
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;
  const post = await postService.editPostById(id, userId, title, content);
  res.status(post.message ? post.code : 201).json(post);
};

module.exports = { newPost, getPosts, getPost, editPost };
