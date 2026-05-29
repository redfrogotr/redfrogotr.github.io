(function () {
    const sidebar = document.getElementById("site-sidebar");
    const toggle = document.querySelector(".sidebar-toggle");
    const content = document.getElementById("site-sidebar-content");

    if (!sidebar || !toggle || !content) {
        return;
    }

    const storageKey = "sidebar-collapsed";

    function setCollapsed(isCollapsed) {
        document.body.classList.toggle("sidebar-collapsed", isCollapsed);
        toggle.setAttribute("aria-expanded", String(!isCollapsed));
        toggle.setAttribute("title", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
        content.setAttribute("aria-hidden", String(isCollapsed));
        localStorage.setItem(storageKey, isCollapsed ? "true" : "false");
    }

    setCollapsed(localStorage.getItem(storageKey) === "true");

    toggle.addEventListener("click", function () {
        setCollapsed(!document.body.classList.contains("sidebar-collapsed"));
    });
})();
