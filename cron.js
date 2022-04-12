var CronJob = require('cron').CronJob;
	var Cron = require('./backup.js');

	new CronJob('* * * * *', function() {
    Cron.dbAutoBackUp();
}, null, true, 'America/New_York');