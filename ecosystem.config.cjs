module.exports = {
  apps: [
    {
      name: "manufacturing-blog",
      script: "serve",
      // ใช้โหมด SPA และให้ serve ใช้พอร์ตดีฟอลต์ (3000)
      // พอร์ต 3000 ตรงกับที่ nginx proxy ไปหาอยู่แล้ว
      args: "-s dist",
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

