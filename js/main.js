(function () {
    var root = document.documentElement;
    var STORAGE_KEY = "portfolio-theme";

    function getPreferredTheme() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark") return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    applyTheme(getPreferredTheme());

    var themeToggle = document.querySelector("[data-theme-toggle]");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(next);
        });
    }

    var nav = document.querySelector("[data-site-nav]");
    var toggle = document.querySelector("[data-nav-toggle]");

    if (nav && toggle) {
        function setOpen(open) {
            nav.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        }

        toggle.addEventListener("click", function () {
            setOpen(!nav.classList.contains("is-open"));
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setOpen(false);
            });
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") setOpen(false);
        });

        window.addEventListener("scroll", function () {
            nav.classList.toggle("is-scrolled", window.scrollY > 12);
        }, { passive: true });
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        var revealEls = document.querySelectorAll(".reveal");
        if (revealEls.length && "IntersectionObserver" in window) {
            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
            );
            revealEls.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            revealEls.forEach(function (el) {
                el.classList.add("is-visible");
            });
        }
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            var id = anchor.getAttribute("href");
            if (id.length < 2) return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
})();
