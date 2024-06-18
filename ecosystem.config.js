module.exports = {
  apps : [{
    name: 'intranet-payload',
    script: 'npm run serve',
  }],
  deploy : {
    production : {
      user : 'jriv',
      host : '192.168.1.12',
      ref  : 'origin/master',
      repo : 'https://github.com/j-Riv/intranet-payload',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
