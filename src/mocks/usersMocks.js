const userMockCredentials = {
  username: "TextX4",
  password: "abcd1234",
};

const userMock = {
  name: "userXMock",
  username: "TextX4",
  email: "userXMock@gmail.com",
  password: "abcd1234",
  image: "image",
};

const mockNewUsers = [
  {
    id: 1,
    name: "lucamino",
    username: "LearningX",
    email: "lucamino@test.com",
    password: "$2b$10$W1hLqa2IAIP6Lrmjpxb83Ofew3cP2SWequHUDXMRxKNQSf/KABsYW",
    places: [],
    wishlists: [],
  },
  {
    id: 2,
    name: "Blinkwit",
    username: "BlinkwitX",
    email: "blinkwit@test.com",
    password: "$2b$10$W1hLqa2IAIP6Lrmjpxb83Ofew3cP2SWequHUDXMRxKNQSf/KABsYW",
    places: [],
    wishlists: [],
  },
];

const mockUsers = [
  {
    name: "lucamino",
    username: "LearningX",
    email: "lucamino@test.com",
    location: "Barcelona",
    password: "$2b$10$W1hLqa2IAIP6Lrmjpxb83Ofew3cP2SWequHUDXMRxKNQSf/KABsYW",
    places: [],
    wishlists: [],
  },
  {
    name: "Blinkwit",
    username: "BlinkwitX",
    email: "blinkwit@test.com",
    password: "$2b$10$W1hLqa2IAIP6Lrmjpxb83Ofew3cP2SWequHUDXMRxKNQSf/KABsYW",
    places: [],
    wishlists: [],
  },
];

module.exports = { userMockCredentials, userMock, mockNewUsers, mockUsers };
