export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
console.log('from constants', process.env.JWT_SECRET);
