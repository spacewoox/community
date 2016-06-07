export default function formatDuration(value) {
  return window.moment.duration(value, "seconds").humanize();
}
