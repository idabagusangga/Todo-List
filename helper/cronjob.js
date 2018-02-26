const moment = require('moment')
const CronJob = require('cron').CronJob
const sendReminder = require('./sendReminder')

const schedulerFactory = function () {
  return {
    start: function () {
      console.log('Cron Job started');
      new CronJob ('* * * * *', function () {
        console.log('Running CronJob Every 1 minute. Time: ' + moment().format());
        sendReminder.reminder()
      }, null, true, '')
    }
  }
}
module.exports = schedulerFactory();