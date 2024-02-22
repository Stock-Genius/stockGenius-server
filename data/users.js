import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    shopname: 'example traders',
    address: 'It tower, lhr',
    isAdmin: true,
  },
  {
    name: 'Abdullah',
    email: 'abdullah@example.com',
    password: bcrypt.hashSync('123456', 10),
    shopname: 'example traders',
    address: 'It tower, lhr',
  },
  {
    name: 'Asad',
    email: 'asad@example.com',
    password: bcrypt.hashSync('123456', 10),
    shopname: 'example traders',
    address: 'It tower, lhr',
  }
];

export default users;