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

  const updateActiveFromScroll = () => {
    if (isAtPageBottom()) {
      setActive(lastHeading.id);
      return;
    }

    const activationOffset = 112;
    let activeHeading = headings[0];

    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= activationOffset) {
        activeHeading = heading;
      } else {
        break;
      }
    }

    setActive(activeHeading.id);
  };

  links.forEach((link) => {
    link.addEventListener("click", () => {
      setActive(link.dataset.tocTarget);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(updateActiveFromScroll);
      });
    });
  });

  let scrollFramePending = false;

  window.addEventListener(
    "scroll",
    () => {
      if (scrollFramePending) {
        return;
      }

      scrollFramePending = true;

      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        scrollFramePending = false;
      });
    },
    { passive: true }
  );

  window.addEventListener("hashchange", () => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));

    if (headings.some((heading) => heading.id === targetId)) {
      setActive(targetId);
    }

    window.requestAnimationFrame(updateActiveFromScroll);
  });

  const initialTarget = decodeURIComponent(window.location.hash.slice(1));

  if (headings.some((heading) => heading.id === initialTarget)) {
    setActive(initialTarget);
  } else {
    updateActiveFromScroll();
  }
})();