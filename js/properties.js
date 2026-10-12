/* Listing page: instant search, filters, sorting. */
(() => {
  const q = new URLSearchParams(location.search), $id = i => document.getElementById(i);
  const F = ["q", "loc", "type", "min", "max", "bhk", "tenant", "parking", "lift", "furn", "floor", "sort"];
  let favOnly = q.get("fav") === "1";

  function setup() {
    $id("loc").innerHTML = `<option value="">${t("allLoc")}</option>` + LOCS.map(l => `<option>${l}</option>`).join("");
    $id("type").innerHTML = `<option value="">${t("allTypes")}</option>` + TYPES.map(x => `<option>${x}</option>`).join("");
    $id("bhk").innerHTML = `<option value="">${t("any")}</option>` + [1, 2, 3, 4].map(n => `<option>${n}</option>`).join("");
    $id("floor").innerHTML = `<option value="">${t("any")}</option><option value="0">${t("ground")}</option>` + [1, 2, 3, 4].map(n => `<option value="${n}">${n}</option>`).join("");
    $id("tenant").innerHTML = `<option value="">${t("any")}</option><option value="family">${t("family")}</option><option value="bachelor">${t("bachelor")}</option>`;
    $id("parking").innerHTML = `<option value="">${t("any")}</option><option value="1">${t("withParking")}</option>`;
    $id("lift").innerHTML = `<option value="">${t("any")}</option><option value="1">${t("withLift")}</option>`;
    $id("furn").innerHTML = `<option value="">${t("any")}</option><option value="1">${t("furnished")}</option>`;
    $id("sort").innerHTML = [["", "recentAdd"], ["pl", "pLow"], ["ph", "pHigh"], ["bl", "bLow"], ["bh", "bHigh"]].map(([v, k]) => `<option value="${v}">${t(k)}</option>`).join("");
    /* Search suggestions: locations, landmarks, titles, reference codes */
    const sug = new Set([...LOCS]); PROPERTIES.forEach(p => { sug.add(p.location); if (p.landmark) sug.add(p.landmark); sug.add(p.title); sug.add(p.ref) });
    $id("sug").innerHTML = [...sug].map(s => `<option value="${s}">`).join("");
  }
  function readURL() {
    if (q.get("loc")) $id("loc").value = q.get("loc");
    if (q.get("type")) $id("type").value = q.get("type");
    if (q.get("q")) $id("q").value = q.get("q");
    if (q.get("budget")) { const [a, b] = q.get("budget").split("-"); $id("min").value = a && a !== "0" ? a : ""; $id("max").value = b || "" }
  }
  const v = i => $id(i).value.trim();
  function filtered() {
    const s = v("q").toLowerCase(), loc = v("loc"), mn = +v("min") || 0, mx = +v("max") || Infinity, f = favs();
    let r = PROPERTIES.filter(p => {
      const hay = [p.title, p.location, p.landmark, p.config, p.ref, p.area, p.id].join(" ").toLowerCase();
      if (s && !hay.includes(s)) return false;
      if (loc && !(p.area === loc || (p.location + " " + (p.landmark || "")).includes(loc))) return false;
      if (v("type") && p.config !== v("type")) return false;
      if (p.rent < mn || p.rent > mx) return false;
      if (v("bhk") && !(p.config.includes("BHK") && p.bhk === +v("bhk"))) return false;
      if (v("tenant") === "family" && p.family !== true) return false;
      if (v("tenant") === "bachelor" && p.bachelor !== true) return false;
      if (v("parking") && !p.parking) return false;
      if (v("lift") && p.lift !== true) return false;
      if (v("furn") && !p.furnishing) return false;
      if (v("floor") !== "" && p.floorNo !== +v("floor")) return false;
      if (favOnly && !f.includes(p.id)) return false;
      return true;
    });
    const so = v("sort");
    if (so === "pl") r.sort((a, b) => a.rent - b.rent); if (so === "ph") r.sort((a, b) => b.rent - a.rent);
    if (so === "bl") r.sort((a, b) => a.bhk - b.bhk); if (so === "bh") r.sort((a, b) => b.bhk - a.bhk);
    if (!so) r.reverse(); // newest (last in data file) first
    return r;
  }
  function render() {
    const r = filtered();
    $id("count").textContent = `${r.length} ${t("found")}`;
    $id("grid").innerHTML = r.length ? r.map(card).join("") : `<div class="empty"><h3>${t("noRes")}</h3><p>${t("noResD")}</p></div>`;
    $id("favT").textContent = `♥ ${t("savedOnly")} (${favs().length})`;
    $id("favT").classList.toggle("b-pri", favOnly); $id("favT").classList.toggle("b-out", !favOnly);
  }
  function init() {
    $id("grid").innerHTML = '<div class="sk"></div>'.repeat(6); // loading skeletons
    const keep = {}; F.forEach(i => keep[i] = $id(i) ? v(i) : "");
    setup(); F.forEach(i => { if (keep[i]) $id(i).value = keep[i] });
  }
  init(); readURL();
  setTimeout(render, 250);
  F.forEach(i => $id(i).addEventListener(i === "q" || i === "min" || i === "max" ? "input" : "change", render));
  $id("clear").onclick = () => { F.forEach(i => $id(i).value = ""); favOnly = false; render() };
  $id("favT").onclick = () => { favOnly = !favOnly; render() };
  $id("ftog").onclick = () => { const o = $id("fp").classList.toggle("open"); $id("ftog").setAttribute("aria-expanded", o) };
  document.addEventListener("favchange", render);
  document.addEventListener("langchange", () => { const keep = {}; F.forEach(i => keep[i] = v(i)); setup(); F.forEach(i => $id(i).value = keep[i]); render() });
})();
