module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Load the setup file
  testEnvironment: "jsdom", // Ensures DOM APIs are available
};
