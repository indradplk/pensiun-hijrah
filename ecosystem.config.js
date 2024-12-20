module.exports = {
  apps: [
    {
      name: 'pensiun-hijrah-build',
      script: 'npm',
      args: 'run build',
      cron_restart: '0 3,5,12,18,23 * * *',
      autorestart: false,
      max_restarts: 1,
      watch: false,
    },
  ],
};
