const {prisma} = require('../index');
const jwt = require('jsonwebtoken')

const createUser = async (data) => {
  const user =await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
console.log(user)
  return user
};

const getUsers = async () => {
  return await prisma.user.findMany()
};

const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
};

const login = async (data) => {
  const { id, password } = data;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user || password !== user.password) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user };
}


module.exports = { createUser, getUsers, getUserById, login };
