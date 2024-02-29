import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('G-22385524', 10),
    shopname: 'example traders',
    address: 'It tower, lhr',
    isAdmin: true,
  },
  {
    name: 'Hafiz Abdullah',
    email: 'hafiz@example.com',
    password: bcrypt.hashSync('123456', 10),
    shopname: 'example traders',
    address: 'It tower, lhr',
  },
  {
    name: 'Asad ur Rehman',
    email: 'asad@example.com',
    password: bcrypt.hashSync('123456', 10),
    shopname: 'example traders',
    address: 'It tower, lhr',
  }
];

export default users;