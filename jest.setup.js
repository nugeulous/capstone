globalThis.importMetaEnv = {
    API_URL: 'http://localhost:8080/api',
  };
  
  // mock import.meta.env
  Object.defineProperty(globalThis, 'import', {
    value: {
      meta: {
        env: importMetaEnv,
      },
    },
  });
  
  module.exports = {
    testEnvironment: 'node',
  };