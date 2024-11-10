const { prisma } = require('../configs/database');
const bcrypt = require('bcrypt');
const imagekit = require('../configs/imagekit');

const createUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10)
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashPassword,
      Profile: {
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

  if (!user) return null

  delete user.password
  return user

};

const updateImageProfile = async (id, file) => {
  const uploadImage = await imagekit.upload({
    file: file.buffer.toString('base64'),
    fileName: file.originalname,
    folder: '/profile'
  })

  const userProfile = await prisma.profile.findUnique({
    where: { id: Number(id) }
  });

  // Step 2: Update the profile if it exists
  if (userProfile) {
    const user = await prisma.user.update({
      where: { id: Number(id) }, // User ID
      data: {
        Profile: {
          update: {
            where: { id: userProfile.id },
            data: {
              image: uploadImage.url,
            },
          },
        },
      },
      include: {
        Profile: true,
      },
    });

    delete user.password;

    return user;
  } else {
    console.error("Profile not found for the given user ID.");
    return new error("Profile not found for the given user ID.");
  }

}

module.exports = { createUser, getUsers, getUserById, updateImageProfile };
