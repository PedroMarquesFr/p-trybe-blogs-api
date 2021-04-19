const { Op } = require('sequelize');
const { BlogPosts, Users } = require('../models');
const errMessage = require('./errMessage');

const validateCamps = (title, content) => {
  if (!title) return errMessage('"title" is required', 400);
  if (!content) return errMessage('"content" is required', 400);
  return { ok: 'ok' };
};

const newPost = async (id, title, content) => {
  const areCampsValid = validateCamps(title, content);
  if (areCampsValid.message) return areCampsValid;
  try {
    const wasCreated = await BlogPosts.create({
      title,
      content,
      userId: id,
    });
    return wasCreated;
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

const getPosts = async () => {
  try {
    const allPosts = await BlogPosts.findAll({
      include: [{ model: Users, as: 'user' }],
    });
    return allPosts;
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};
const getPostById = async (id) => {
  try {
    const post = await BlogPosts.findOne({
      where: { id },
      include: [{ model: Users, as: 'user' }],
    });
    if (!post) return errMessage('Post não existe', 404);
    return post;
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

const editPostById = async (id, userId, title, content) => {
  const areCampsValid = validateCamps(title, content);
  if (areCampsValid.message) return areCampsValid;
  const selectedPost = await BlogPosts.findOne({ where: { id } });
  if (!selectedPost) return errMessage('Post nao existe', 404);
  if (selectedPost.userId !== userId) return errMessage('Usuário não autorizado', 401);
  try {
    const updatedPost = await BlogPosts.update(
      {
        title,
        content,
      },
      {
        where: { id },
      },
    );
    console.log(updatedPost);
    return { title, content, userId, editado: updatedPost[0] };
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

const searchPostByTerm = async (term) => {
  console.log(term);
  if (term === '') {
    const allPosts = await getPosts();
    return allPosts;
  }
  try {
    const doesPostsExists = await BlogPosts.findAll({
      where: { [Op.or]: [{ title: term }, { content: term }] },
      include: [{ model: Users, as: 'user' }],
    });
    return doesPostsExists;
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

const deletePost = async (idFromPost, idFromJWT) => {
  try {
    const post = await getPostById(idFromPost);
    if (post.message) return post;
    if (idFromJWT !== post.user.id) return errMessage('Usuário não autorizado', 401);
    const deletedPost = await BlogPosts.destroy({ where: { id: idFromPost } });
    return deletedPost;
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

module.exports = {
  newPost,
  getPosts,
  getPostById,
  editPostById,
  searchPostByTerm,
  deletePost,
};
