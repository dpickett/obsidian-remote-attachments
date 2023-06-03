const config = {
  clearMocks: true,
  modulePathIgnorePatterns: ["dist"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useEsm: true }],
  },
};

export default config;
