// Load external HTML into a container
function loadHTML(containerId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Could not load ${filePath}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
}

// Load header and footer
window.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "header.html");
  loadHTML("footer", "footer.html");
});
