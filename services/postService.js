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

module.exports = { newPost, getPosts, getPostById, editPostById };
