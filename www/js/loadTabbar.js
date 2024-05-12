async function loadTabbar() {
  try {
    const currentPath = window.location.pathname;
    const prefixUrl = currentPath.includes("/pages") ? "../" : "";
    loadStyles(prefixUrl);
    const response = await fetch(`${prefixUrl}components/tabbar.html`);
    const tabbarHtml = await response.text();
    const tabbarContainer = document.getElementById("tabbar-container");
    tabbarContainer.innerHTML = tabbarHtml;
  } catch (error) {
    console.error(error);
  }
}

const loadStyles = (prefixUrl) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${prefixUrl}css/tabbar.css`;
  document.head.appendChild(link);
};

document.addEventListener("DOMContentLoaded", loadTabbar, false);
