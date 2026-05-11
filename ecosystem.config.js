module.exports = {
  apps: [
    {
      name: "043-gateway",
      cwd: "./services/gateway",
      script: "server.js",
      watch: false,
      env_file: "../../.env",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "043-ml",
      cwd: "./services/mlservice",
      script: "app.py",
      interpreter: "./venv/Scripts/python.exe",
      watch: false,
      env_file: "../../.env",
      env: {
        FLASK_ENV: "production",
      },
    },
  ],
};
