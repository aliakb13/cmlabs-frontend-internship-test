export function getComponents(name, container) {
  fetch(name)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Gagal memuat ${name}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      container.innerHTML = data;
    })
    .catch((error) => console.error("Gagal memuat element:", error));
}

export async function getData(url) {
  try {
    const fetch = await axios.get(url);
    return fetch.data;
  } catch (err) {
    return err;
  }
}

export function getFromUrl(nameOfParam) {
  const urlParams = new URLSearchParams(window.location.search);
  // console.log(window.location.search);
  // console.log(document.URL);
  return urlParams.get(nameOfParam);
}
