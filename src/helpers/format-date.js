import moment from 'moment';

export default function formatDate(date) {
  const currentYear = new Date().getFullYear();
  const yearDue = moment(date).format('YYYY');

  return Number(yearDue) === currentYear
    ? moment(date).format('MMM D')
    : moment(date).format('MMM D YYYY');
}
