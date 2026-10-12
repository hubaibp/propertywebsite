/* Details page: reads ?id=property-001 */
(() => {
  const id = new URLSearchParams(location.search).get("id"), p = byId(id), root = document.getElementById("root");
  let idx = 0;
  if (!p) { document.addEventListener("langchange", () => root.innerHTML = `<div class="wrap empty" style="padding:60px 16px"><h2>${t("notFound")}</h2><a class="btn b-pri" href="properties.html">${t("back")}</a></div>`); return }
  document.title = p.title + " | OKHLA PROPERTIES";
  const recent = LS.get("recent", []).filter(x => x !== id); recent.unshift(id); LS.set("recent", recent.slice(0, 6));
  const imgs = p.images.length ? p.images : [PH];

  function similar() {
    return PROPERTIES.filter(x => x.id !== id).map(x => ({ x, s: (x.area && x.area === p.area ? 3 : 0) + (x.config === p.config ? 2 : 0) + (Math.abs(x.rent - p.rent) <= p.rent * .3 ? 1 : 0) }))
      .sort((a, b) => b.s - a.s).slice(0, 3).map(o => o.x);
  }
  const val = x => x || t("cfd");
  function rows() {
    const r = [
      ["floor", p.floor], ["area", p.size], ["type", p.config], ["furnishing", p.furnishing], ["electricity", p.electricity],
      ["parking", p.parking && t(p.parking === "Car" ? "carP" : "bikeP")], ["lift", p.lift === true ? t("yes") : p.lift === false ? t("no") : ""],
      ["tenant", p.tenant], ["security", p.security], ["maintenance", p.maintenance], ["brokerage", p.brokerage]
    ].map(([k, x]) => [t(k), val(x)]);
    if (p.landmark) r.splice(1, 0, [t("landmark"), p.landmark]);
    if (p.visitCharge) r.push([t("visitCharge"), p.visitCharge]);
    r.push([t("ref"), p.ref], [t("status"), p.availNote || t("status_" + p.status)]);
    return r.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("");
  }
  function render() {
    const desc = (p.desc && (lang === "hi" && p.desc.hi ? p.desc.hi : p.desc.en)) || "";
    const extras = (p.extras || []).map(e => `<li>${e}</li>`).join("");
    const saved = favs().includes(id);
    root.innerHTML = `<div class="wrap"><div class="dwrap"><div>
<div class="gal" id="gal"><img id="gm" src="${imgs[idx]}" alt="${p.title} (sample photo)" onerror="imgErr(this)"><button class="gn p" data-g="-1" aria-label="Previous">‹</button><button class="gn n" data-g="1" aria-label="Next">›</button><span class="gc" id="gc"></span></div>
<div class="th" id="th">${imgs.map((s, i) => `<img src="${s}" data-t="${i}" alt="Photo ${i + 1}" loading="lazy" onerror="imgErr(this)">`).join("")}</div>
<p class="loc">ⓘ ${t("sampleNote")}</p>
${p.videos && p.videos.length ? `<div class="dbox"><h2>${t("video")}</h2>${p.videos.map(s => `<video controls preload="metadata" playsinline><source src="${s}" type="video/${/\.webm$/i.test(s) ? "webm" : "mp4"}"></video>`).join("")}</div>` : ""}
</div><div>
<div class="dbox"><span class="badge ${p.status}" style="position:static;display:inline-block;margin-bottom:8px">${t("status_" + p.status)}</span><h1 style="font-size:1.35rem">${p.title}</h1><div class="loc">📍 ${p.location}</div>
<div class="rent" style="font-size:1.6rem;margin:8px 0">${money(p.rent)}<small>${t("perMonth")}${p.rentNote ? " · " + (p.rentNote === "Final" ? t("final") : p.rentNote) : ""}</small></div>
<div class="cta"><a class="btn b-navy" href="tel:${PHONE}">📞 ${t("call")}</a><button class="btn b-wa" data-wa="${id}">💬 ${t("enquire")}</button>
<button class="btn b-pri" data-visit="${id}">📅 ${t("bookVisit")}</button><button class="btn b-out" data-share="${id}">↗ ${t("share")}</button>
<button class="btn b-out" data-fav="${id}" data-txt="1">♥ ${t(saved ? "saved" : "save")}</button><a class="btn b-out" href="${mapURL(p)}" target="_blank" rel="noopener">🗺 ${t("viewLoc")}</a></div></div>
<div class="dbox"><table class="tb">${rows()}</table></div>
${desc || extras ? `<div class="dbox"><h2>${t("info")}</h2>${desc ? `<p>${desc}</p>` : ""}${extras ? `<ul style="padding-left:18px;margin-top:6px">${extras}</ul>` : ""}</div>` : ""}
</div></div>
<h2>${t("similar")}</h2><div class="grid" style="margin-bottom:40px">${similar().map(card).join("")}</div></div>
<div class="mbar"><a class="btn b-navy b-sm" href="tel:${PHONE}">📞 ${t("call")}</a><button class="btn b-wa b-sm" data-wa="${id}">💬 ${t("wa")}</button><button class="btn b-pri b-sm" data-visit="${id}">📅 ${t("bookVisit")}</button></div>`;
    show(0);
  }
  function show(d, abs) {
    idx = abs !== undefined ? abs : (idx + d + imgs.length) % imgs.length;
    const m = document.getElementById("gm"); if (m) m.src = imgs[idx];
    const c = document.getElementById("gc"); if (c) c.textContent = `${idx + 1} / ${imgs.length}`;
    document.querySelectorAll("#th img").forEach((e, i) => e.classList.toggle("on", i === idx));
    const li = document.getElementById("lbi"); if (li) { li.src = imgs[idx]; document.getElementById("lbc").textContent = `${idx + 1} / ${imgs.length}` }
  }
  /* Fullscreen viewer */
  document.body.insertAdjacentHTML("beforeend", `<div class="lb" id="lb"><button class="lx" aria-label="Close">×</button><button class="gn p" data-g="-1" aria-label="Previous">‹</button><img id="lbi" alt=""><button class="gn n" data-g="1" aria-label="Next">›</button><span class="gc" id="lbc"></span></div>`);
  const lb = document.getElementById("lb");
  document.addEventListener("click", e => {
    const g = e.target.closest("[data-g]"), th = e.target.closest("[data-t]");
    if (g) show(+g.dataset.g); if (th) show(0, +th.dataset.t);
    if (e.target.id === "gm") { lb.classList.add("show"); show(0, idx) }
    if (e.target.closest(".lx") || e.target === lb) lb.classList.remove("show");
  });
  document.addEventListener("keydown", e => { if (e.key === "ArrowRight") show(1); if (e.key === "ArrowLeft") show(-1) });
  /* Swipe support */
  let sx = 0; const sw = el => { el.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true }); el.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(dx < 0 ? 1 : -1) }, { passive: true }) };
  sw(lb); document.addEventListener("langchange", () => { render(); sw(document.getElementById("gal")) });
})();
