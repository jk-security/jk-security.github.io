(() => {
  const article = document.querySelector(".post-content");
  const lists = document.querySelectorAll("[data-page-toc-list]");

  if (!article || lists.length === 0) {
    return;
  }

  lists.forEach((list) => {
    list.replaceChildren();
  });

  const headings = [...article.querySelectorAll("h2")]
    .filter((heading) => !heading.classList.contains("toc-ignore"));

  if (headings.length === 0) {
    document.querySelectorAll(".page-toc").forEach((toc) => toc.remove());
    return;
  }

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = slugify(heading.textContent) || `section-${index + 1}`;
    }

    lists.forEach((list) => {
      const item = document.createElement("li");
      const link = document.createElement("a");

      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      link.dataset.tocTarget = heading.id;

      item.appendChild(link);
      list.appendChild(item);
    });
  });

  const links = [...document.querySelectorAll("[data-toc-target]")];
  const lastHeading = headings[headings.length - 1];

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.dataset.tocTarget === id;

      link.classList.toggle("is-active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const isAtPageBottom = () => {
    const scrollBottom = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    return scrollBottom >= documentHeight - 2;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (isAtPageBottom()) {
        setActive(lastHeading.id);
        return;
      }

      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActive(visible[0].target.id);
      }
    },
    {
      rootMargin: "-18% 0px -68% 0px",
      threshold: 0
    }
  );

  headings.forEach((heading) => observer.observe(heading));

  let scrollFramePending = false;

  window.addEventListener(
    "scroll",
    () => {
      if (scrollFramePending) {
        return;
      }

      scrollFramePending = true;

      window.requestAnimationFrame(() => {
        if (isAtPageBottom()) {
          setActive(lastHeading.id);
        }

        scrollFramePending = false;
      });
    },
    { passive: true }
  );

  setActive(isAtPageBottom() ? lastHeading.id : headings[0].id);
})();