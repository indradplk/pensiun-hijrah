module.exports = {
  apps: [
    {
      name: 'pensiun-hijrah-build',
      script: 'npm',
      args: 'run build',
      cron_restart: '0 2,12 * * *',
      autorestart: false,
      max_restarts: 1,
      watch: false,
    },
  ],
};