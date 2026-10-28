// Shared header/footer, injected into every page (works on GitHub Pages and when opened locally).
const NAV = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["research.html", "Research"],
  ["simulation.html", "Simulation"],
  ["publications.html", "Publications"],
  ["gallery.html", "Gallery"],
];

document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(([href, label]) =>
    `<a href="${href}"${href === page ? ' class="active" aria-current="page"' : ""}>${label}</a>`
  ).join("");

  document.getElementById("header").innerHTML = `
    <header>
      <a class="brand" href="index.html">Marc Seemann</a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
      <nav>${links}</nav>
    </header>`;
  document.getElementById("footer").innerHTML = `
    <footer><p>© ${new Date().getFullYear()} Marc Seemann · PhD student, DIPC</p></footer>`;

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("header nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  // Simple lightbox for any image inside .zoomable
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<img alt=""><p></p>';
  document.body.appendChild(box);
  box.addEventListener("click", () => box.classList.remove("show"));
  document.addEventListener("keydown", e => { if (e.key === "Escape") box.classList.remove("show"); });
  document.querySelectorAll(".zoomable img").forEach(img => {
    img.addEventListener("click", () => {
      box.querySelector("img").src = img.dataset.full || img.src;
      box.querySelector("img").alt = img.alt;
      box.querySelector("p").textContent = img.closest("figure")?.querySelector("figcaption")?.textContent || img.alt;
      box.classList.add("show");
    });
  });
});
