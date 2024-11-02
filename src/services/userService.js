const {prisma} = require('../configs/database');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const createUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10)
  const user =await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashPassword,
      Profile : {
        create: {
          identity_type: data.identityType,
          identity_number: data.identityNumber,
          address: data.address 
        }
      }    
    },
    include: {
      Profile: true
    }
  });


  delete user.password

  return user
};

const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      Profile: true
    }
  })
  users.map((user) => {
    delete user.password
  })
  return users
};

const getUserById = async (userId) => {
 const user = await prisma.user.findUnique({
   where: { id: parseInt(userId) },
   include: {
     Profile: true
   }
 })

 delete user.password
 return user
  
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
