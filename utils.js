export function fetchJson(url) {
  return fetch(url).then((it) => it.json());
}
