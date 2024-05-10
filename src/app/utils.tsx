/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs, { Dayjs } from "dayjs";

function capitalizeFistLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDateTime(datetime: string | Dayjs) {
  return dayjs(datetime).format("ddd, DD.MM.YY HH:mm")
}

function formatDate(datetime: string | Dayjs) {
  return dayjs(datetime).format("DD.MM.YY")
}

function formatDateShort(datetime: string | Dayjs) {
  return dayjs(datetime).format("DD.MM.")
}

function formatDateLong(datetime: string | Dayjs) {
  return dayjs(datetime).format("ddd, DD.MM.YY")
}

function formatDay(datetime: string | Dayjs) {
  return dayjs(datetime).format("ddd")
}

function formatTime(datetime: string | Dayjs) {
  return dayjs(datetime).format("HH:mm")
}

function formatYear(datetime: string | Dayjs) {
  return dayjs(datetime).format("YY")
}

function formatYearLong(datetime: string | Dayjs) {
  return dayjs(datetime).format("YYYY")
}

export {
  capitalizeFistLetter,
  formatDateTime,
  formatDate,
  formatDateShort,
  formatDateLong,
  formatDay,
  formatTime,
  formatYear,
  formatYearLong,
};
