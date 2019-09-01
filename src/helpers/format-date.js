import moment from 'moment';

export default function formatDate(date) {
  const year = new Date().getFullYear().toString();

  return moment(date).calendar(null, {
    // lastWeek: '[Last] dddd',
    // lastDay: '[Yesterday]',
    lastWeek: '[Overdue]',
    lastDay: '[Overdue]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameElse: function() {
      if (this.isBefore(moment(), 'day')) {
        return '[Overdue]';
      }
      if (this.isSame(`${year}-01-01`, 'year')) {
        return 'MMM D';
      } else {
        return 'MMM D YYYY';
      }
    },
  });
}
