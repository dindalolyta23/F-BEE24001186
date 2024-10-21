const {prisma} = require('../index');

const createUser = async (data) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
};

const getUsers = async () => {
  return await prisma.user.findMany()
};

const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
};

// const updateUser = async (userId,data) => {
//   return await prisma.user.update({
//     where: {
//       id: parseInt(userId)
//     },
//     data:{
//       name: data.name,
//       email: data.email,
//       password: data.password,
//     }
//   })
// }

// const deleteUser = async (userId) => {
//   return await account.delete({
//     where:{
//       id : parseInt(userId)
//     }
//   })
// }

module.exports = { createUser, getUsers, getUserById };
