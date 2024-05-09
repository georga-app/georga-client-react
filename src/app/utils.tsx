/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs from "dayjs";

function capitalizeFistLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDateTime(datetime: string) {
  return dayjs(datetime).format("dd, DD.MM.YY HH:mm")
}

function formatDate(datetime: string) {
  return dayjs(datetime).format("dd, DD.MM.YY")
}

function formatTime(datetime: string) {
  return dayjs(datetime).format("HH:mm")
}

export {
  capitalizeFistLetter,
  formatDateTime,
  formatDate,
  formatTime,
};
