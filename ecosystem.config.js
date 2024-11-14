module.exports = {
  apps: [
    {
      name: 'pensiun-hijrah-build',
      script: 'npm',
      args: 'run build',
      cron_restart: '0 2,7,12,15,17,22 * * *',
    },
  ],
};