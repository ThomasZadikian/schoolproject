import type { RegistrationUser, User } from '@/core/models/userModel';

let users: RegistrationUser[] = [];

export const createUser = (newUser: RegistrationUser): RegistrationUser => {
  let user: RegistrationUser = newUser; 
  users.push(newUser);
  return newUser;
};

 /*
export const getAllUsers = (): User[] => {
  return users;
};

export const getUserById = (userId: number): User | undefined => {
  return users.find(user => user.id === userId);
};


export const updateUser = (userId: number, updatedUser: Partial<User>): User | undefined => {
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return users[index];
  }
  return undefined;
};


export const deleteUser = (userId: number): boolean => {
  const initialLength = users.length;
  users = users.filter(user => user.id !== userId);
  return users.length !== initialLength;
};
*/
