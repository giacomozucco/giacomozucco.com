// Small progressive enhancements. The site works without JS: all content is
// in the HTML, the donate link opens the Lightning wallet directly.
(() => {
  // Donate dialog
  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open-dialog]");
    if (opener) {
      const dlg = document.getElementById(opener.dataset.openDialog);
      if (dlg && dlg.showModal) { e.preventDefault(); dlg.showModal(); }
      return;
    }
    const copy = e.target.closest("[data-copy]");
    if (copy && navigator.clipboard) {
      navigator.clipboard.writeText(copy.dataset.copy).then(() => {
        const label = copy.querySelector(".copy-label");
        if (label) label.textContent = "copied";
      });
    }
    // Click on the backdrop closes the dialog
    if (e.target.tagName === "DIALOG") {
      const r = e.target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close();
    }
  });

  // Content filters
  const form = document.getElementById("filters");
  const list = document.getElementById("items");
  if (!form || !list) return;
  form.hidden = false;
  const items = [...list.children];
  const empty = document.getElementById("empty");
  const count = form.querySelector(".count");

  // Restore filters from the URL (?type=audio&lang=it&year=2024&order=asc) so views can be shared.
  const params = new URLSearchParams(location.search);
  for (const [k, v] of params) {
    const field = form.elements[k];
    if (field) field.value = v;
  }

  function apply() {
    const f = Object.fromEntries(new FormData(form));
    let shown = 0;
    for (const li of items) {
      const t = li.dataset.type;
      const okType =
        f.type === "all" ||
        (f.type === "text" && t === "text") ||
        (f.type === "media" && (t === "video" || t === "audio")) ||
        (f.type === "audio" && t === "audio");
      const ok = okType && (f.lang === "all" || li.dataset.lang === f.lang) && (f.year === "all" || li.dataset.year === f.year);
      li.hidden = !ok;
      if (ok) shown++;
    }
    const ordered = f.order === "asc" ? [...items].reverse() : items;
    list.append(...ordered);
    empty.hidden = shown > 0;
    count.textContent = `${shown} of ${items.length} items`;
    const q = new URLSearchParams(Object.entries(f).filter(([k, v]) => !(v === "all" || (k === "order" && v === "desc"))));
    history.replaceState(null, "", q.toString() ? `?${q}` : location.pathname);
  }
  form.addEventListener("change", apply);
  apply();
})();
