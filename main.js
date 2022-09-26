import "./scss/style.scss";

function saveUrl({ originalUrl, shortedUrl }) {
  const urls = getAllUrls();
  console.log("urls", urls);
  urls.push({ originalUrl, shortedUrl });
  localStorage.setItem("urls", JSON.stringify(urls));
  return { originalUrl, shortedUrl };
}

function getAllUrls() {
  return JSON.parse(localStorage.getItem("urls")) || [];
}

function shortUrl(url) {
  return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
}

function addEventListenerToShortedUrlElement(card) {
  const button = card.querySelector("button");
  const link = card.querySelector("[data-link]").innerHTML;
  button.addEventListener("click", () => {
    navigator.clipboard.writeText(link);
    button.dataset.active = true;
    button.innerHTML = "Copied!";
    const t = setTimeout(() => {
      button.removeAttribute("data-active");
      button.innerHTML = "Copy";
      clearTimeout(t);
    }, 800);
  });
}

function createShortedUrlElement({ originalUrl, shortedUrl }) {
  const cardElement = document.createElement("li");
  cardElement.className = "shorten-card p-4 lg:py-4 lg:px-6";
  const originalUrlElement = document.createElement("span");
  originalUrlElement.classList.add("raw");
  originalUrlElement.innerText = originalUrl;
  const hrElement = document.createElement("hr");
  hrElement.className = "divider lg:hidden";
  const shortedUrlElement = document.createElement("a");
  shortedUrlElement.classList.add("url");
  shortedUrlElement.href = shortedUrl;
  shortedUrlElement.dataset.link = true;
  shortedUrlElement.innerText = shortedUrl;
  const copyButtonElement = document.createElement("button");
  copyButtonElement.classList.add("button");
  copyButtonElement.innerText = "Copy";
  cardElement.appendChild(originalUrlElement);
  cardElement.appendChild(hrElement);
  cardElement.appendChild(shortedUrlElement);
  cardElement.appendChild(copyButtonElement);
  return cardElement;
}

function addShortedUrlElement({ originalUrl, shortedUrl }) {
  const shortenUrlsContainer = document.querySelector("[data-shorten-cards]");
  const cardElement = createShortedUrlElement({ originalUrl, shortedUrl });
  addEventListenerToShortedUrlElement(cardElement);
  shortenUrlsContainer.appendChild(cardElement);
}

window.addEventListener("DOMContentLoaded", () => {
  const menus = document.querySelectorAll("[data-menu]");
  menus.forEach((menu) => {
    const targetId = menu.dataset.menu;
    const target = document.getElementById(targetId);
    menu.addEventListener("click", () => target.classList.toggle("open"));
  });

  getAllUrls().forEach(addShortedUrlElement);

  document.querySelectorAll("[data-shorten-form]").forEach((form) => {
    const input = form.querySelector("input");
    const errorMsg = form.querySelector("[data-error]");
    const button = form.querySelector("button");
    button.addEventListener("click", () => {
      if (input.value.length === 0) {
        input.classList.add("error");
        errorMsg.classList.remove("hidden");
        return;
      }
      input.classList.remove("error");
      errorMsg.classList.add("hidden");
      shortUrl(input.value)
        .then((response) => response.json())
        .then((response) => ({
          originalUrl: input.value,
          shortedUrl: response.result.short_link,
        }))
        .then(saveUrl)
        .then(addShortedUrlElement);
    });
  });
});
