module.exports = {
  apps: [
    {
      name: "manufacturing-blog",
      // ชี้ไปที่ binary ของ serve ที่ติดตั้งแบบ global เพื่อหลีกเลี่ยง pm2 serve API
      script: "/usr/bin/serve",
      // โหมด SPA และระบุพอร์ต 3000 ชัดเจน
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

