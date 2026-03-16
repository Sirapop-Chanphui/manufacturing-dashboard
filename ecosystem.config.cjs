module.exports = {
  apps: [
    {
      name: "manufacturing-blog",
      script: "serve",
      args: "-s dist -l 3000",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
      watch: false,
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
    },
  ],
};

