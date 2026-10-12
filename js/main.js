/* OKHLA PROPERTIES — shared logic: language, header/footer, WhatsApp, favourites, visit modal, home page. */
const PHONE = "+918506033206", WA = "918506033206";
const GROUP = "https://chat.whatsapp.com/CDR8pZ8re4Y1sImtup7aHV?s=cl&p=a&mlu=2";
const LOCS = ["Shaheen Bagh", "Johri Farm", "Jasola", "Noor Nagar", "Joga Bai", "Tikona Park", "Jamia Nagar"];
const TYPES = ["1 Room Set", "2 Room Set", "1 BHK", "2 BHK", "3 BHK", "4 BHK"];
const BUDGETS = [["0-10000", "b1"], ["10000-15000", "b2"], ["15000-20000", "b3"], ["20000-25000", "b4"], ["25000-30000", "b5"], ["30000-", "b6"]];
const PH = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect fill='#E2E8F0' width='600' height='450'/><text x='300' y='230' font-size='26' text-anchor='middle' fill='#64748b' font-family='sans-serif'>Photo coming soon</text></svg>");
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LS = { get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d } catch { return d } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { } } };
const imgErr = el => { el.onerror = null; el.src = PH };

/* ---------- TRANSLATIONS ---------- */
const T = {
  en: {
    home: "Home", properties: "Properties", rent: "Rent", buy: "Buy", sell: "Sell", about: "About Us", contact: "Contact", call: "Call Now", wa: "WhatsApp",
    menu: "Menu", heroH: "Find Your Perfect Home in Okhla.", heroP: "Explore affordable flats, apartments and room sets in Okhla, Jamia Nagar, Shaheen Bagh, Jasola and nearby locations.",
    explore: "Explore Properties", contactWA: "Contact on WhatsApp", location: "Location", allLoc: "All Locations", propType: "Property Type", allTypes: "All Types",
    budget: "Budget", anyBudget: "Any Budget", b1: "Under ₹10,000", b2: "₹10,000–₹15,000", b3: "₹15,000–₹20,000", b4: "₹20,000–₹25,000", b5: "₹25,000–₹30,000", b6: "Above ₹30,000",
    search: "Search Properties", featured: "Featured Properties", latest: "Latest Properties", recent: "Recently Viewed", browseLoc: "Browse by Location", browseType: "Browse by Property Type",
    why: "Why Choose Okhla Properties", how: "How It Works", why1: "Local Focus", why1d: "Flats and room sets across Okhla and nearby areas.", why2: "Simple Search", why2d: "Filter by location, rent, type and more.",
    why3: "WhatsApp Support", why3d: "Quick answers and visit requests on WhatsApp.", why4: "Clear Details", why4d: "We show only information confirmed in the listing.",
    how1: "1. Search", how1d: "Pick location, type and budget.", how2: "2. Enquire", how2d: "Message us on WhatsApp about a property.", how3: "3. Visit", how3d: "Request a visit; our team confirms the time.", how4: "4. Move In", how4d: "Finalise details with our team.",
    bannerH: "Need Help Finding a Property?", bannerP: "Message us on WhatsApp. Buying or selling? We can help with that too.",
    monthlyRent: "Monthly Rent", perMonth: "/month", viewDetails: "View Details", enquire: "WhatsApp Enquiry", bookVisit: "Book a Visit", share: "Share Property", save: "Save Property", saved: "Saved",
    savedOnly: "Saved Properties", viewLoc: "View Location", sample: "Sample photo", floor: "Floor", area: "Area", type: "Property Type", furnishing: "Furnishing", electricity: "Electricity",
    parking: "Parking", lift: "Lift", tenant: "Tenant Preference", maintenance: "Maintenance", brokerage: "Brokerage", security: "Security Deposit", visitCharge: "Visit Charge", ref: "Reference Code",
    landmark: "Landmark", status: "Availability", info: "Additional Information", amenities: "Amenities", cfd: "Contact for Details", yes: "Available", no: "Not available", bikeP: "Bike Parking", carP: "Car Parking",
    status_confirm: "Confirm Availability", status_available: "Available", status_rented: "Rented", final: "Final", video: "Room Video", similar: "Similar Properties", gallery: "Photos",
    notFound: "Property not found.", back: "Back to properties", sampleNote: "Photos are illustrative samples, not actual property photos.",
    filters: "Filters", searchPh: "Search name, location, landmark, code", minRent: "Min rent", maxRent: "Max rent", bhk: "BHK", any: "Any", tenantPref: "Tenant", family: "Family allowed", bachelor: "Bachelor allowed",
    withParking: "With parking", withLift: "With lift", furnished: "Furnished", sortBy: "Sort by", pLow: "Price: Low to High", pHigh: "Price: High to Low", recentAdd: "Recently Added", bLow: "Bedrooms: Low to High", bHigh: "Bedrooms: High to Low",
    clear: "Clear Filters", found: "properties found", noRes: "No properties found", noResD: "Try changing or clearing your filters.", ground: "Ground", floorN: "Floor",
    visitTitle: "Book a Property Visit", name: "Full Name", phone: "Phone Number", selProp: "Selected Property", date: "Preferred Date", time: "Preferred Time", famBach: "Family or Bachelor",
    familyO: "Family", bachelorO: "Bachelor", msg: "Additional Message", submit: "Send via WhatsApp", visitNote: "Your visit request will be sent through WhatsApp. Our team will confirm the appointment.",
    eName: "Please enter your name.", ePhone: "Enter a valid 10-digit phone number.", eDate: "Please choose a date.", eTime: "Please choose a time.", eSel: "Please select an option.", eReq: "Please fill this field.",
    requirement: "Requirement", reqRent: "Rent", reqBuy: "Buy", reqSell: "Sell", prefLoc: "Preferred Location", contactTitle: "Send an Enquiry", contactNote: "Your enquiry will open in WhatsApp. Nothing is saved on a server.",
    group: "Join Our WhatsApp Group for Latest Property Updates.", joinGroup: "Join WhatsApp Group", address: "Okhla, Jamia Nagar, New Delhi, India", tagline: "Find Your Perfect Home in Okhla.",
    aboutH: "Your Trusted Property Partner in Okhla.", aboutP: "Okhla Properties helps customers find suitable rental flats, apartments, and room sets across Okhla and nearby areas. Our goal is to make property searching simple, convenient, and transparent.",
    services: "Our Services", s1: "Flats for Rent", s2: "Rooms for Rent", s3: "Property Buying", s4: "Property Selling", s5: "Property Visits", areas: "Areas We Cover", contactUs: "Contact Us",
    quick: "Quick Links", mediaTool: "Media Preview Tool", rights: "All rights reserved.", backTop: "Back to top", suggest: "Suggestions"
  },
  hi: {
    home: "होम", properties: "प्रॉपर्टीज़", rent: "किराया", buy: "खरीदें", sell: "बेचें", about: "हमारे बारे में", contact: "संपर्क", call: "अभी कॉल करें", wa: "व्हाट्सऐप",
    menu: "मेनू", heroH: "ओखला में अपना पसंदीदा घर खोजें।", heroP: "ओखला, जामिया नगर, शाहीन बाग, जसोला और आसपास के इलाकों में किफायती फ्लैट, अपार्टमेंट और रूम सेट देखें।",
    explore: "प्रॉपर्टीज़ देखें", contactWA: "व्हाट्सऐप पर संपर्क करें", location: "लोकेशन", allLoc: "सभी लोकेशन", propType: "प्रॉपर्टी टाइप", allTypes: "सभी टाइप",
    budget: "बजट", anyBudget: "कोई भी बजट", b1: "₹10,000 से कम", b2: "₹10,000–₹15,000", b3: "₹15,000–₹20,000", b4: "₹20,000–₹25,000", b5: "₹25,000–₹30,000", b6: "₹30,000 से ऊपर",
    search: "प्रॉपर्टी खोजें", featured: "खास प्रॉपर्टीज़", latest: "नई प्रॉपर्टीज़", recent: "हाल में देखी गई", browseLoc: "लोकेशन के अनुसार देखें", browseType: "प्रॉपर्टी टाइप के अनुसार देखें",
    why: "ओखला प्रॉपर्टीज़ क्यों चुनें", how: "यह कैसे काम करता है", why1: "लोकल फोकस", why1d: "ओखला और आसपास फ्लैट और रूम सेट।", why2: "आसान खोज", why2d: "लोकेशन, किराया, टाइप आदि से फ़िल्टर करें।",
    why3: "व्हाट्सऐप सपोर्ट", why3d: "व्हाट्सऐप पर तुरंत जवाब और विज़िट रिक्वेस्ट।", why4: "साफ़ जानकारी", why4d: "हम सिर्फ लिस्टिंग में पुष्टि की गई जानकारी दिखाते हैं।",
    how1: "1. खोजें", how1d: "लोकेशन, टाइप और बजट चुनें।", how2: "2. पूछताछ", how2d: "प्रॉपर्टी के बारे में व्हाट्सऐप करें।", how3: "3. विज़िट", how3d: "विज़िट रिक्वेस्ट भेजें; हमारी टीम समय कन्फ़र्म करेगी।", how4: "4. शिफ्ट करें", how4d: "हमारी टीम के साथ डिटेल्स पक्की करें।",
    bannerH: "प्रॉपर्टी खोजने में मदद चाहिए?", bannerP: "हमें व्हाट्सऐप करें। खरीदना या बेचना है? उसमें भी मदद करेंगे।",
    monthlyRent: "मासिक किराया", perMonth: "/माह", viewDetails: "पूरी जानकारी देखें", enquire: "व्हाट्सऐप पूछताछ", bookVisit: "विज़िट बुक करें", share: "प्रॉपर्टी शेयर करें", save: "प्रॉपर्टी सेव करें", saved: "सेव्ड",
    savedOnly: "सेव की हुई प्रॉपर्टीज़", viewLoc: "लोकेशन देखें", sample: "नमूना फोटो", floor: "फ्लोर", area: "एरिया", type: "प्रॉपर्टी टाइप", furnishing: "फर्निशिंग", electricity: "बिजली",
    parking: "पार्किंग", lift: "लिफ्ट", tenant: "किरायेदार प्राथमिकता", maintenance: "मेंटेनेंस", brokerage: "ब्रोकरेज", security: "सिक्योरिटी डिपॉज़िट", visitCharge: "विज़िट चार्ज", ref: "रेफरेंस कोड",
    landmark: "लैंडमार्क", status: "उपलब्धता", info: "अतिरिक्त जानकारी", amenities: "सुविधाएं", cfd: "जानकारी के लिए संपर्क करें", yes: "उपलब्ध", no: "उपलब्ध नहीं", bikeP: "बाइक पार्किंग", carP: "कार पार्किंग",
    status_confirm: "उपलब्धता कन्फ़र्म करें", status_available: "उपलब्ध", status_rented: "किराए पर दिया गया", final: "फाइनल", video: "रूम वीडियो", similar: "मिलती-जुलती प्रॉपर्टीज़", gallery: "फोटो",
    notFound: "प्रॉपर्टी नहीं मिली।", back: "प्रॉपर्टीज़ पर वापस जाएं", sampleNote: "फोटो सिर्फ नमूने हैं, असली प्रॉपर्टी की फोटो नहीं।",
    filters: "फ़िल्टर", searchPh: "नाम, लोकेशन, लैंडमार्क, कोड खोजें", minRent: "न्यूनतम किराया", maxRent: "अधिकतम किराया", bhk: "BHK", any: "कोई भी", tenantPref: "किरायेदार", family: "फैमिली अलाउड", bachelor: "बैचलर अलाउड",
    withParking: "पार्किंग के साथ", withLift: "लिफ्ट के साथ", furnished: "फर्निश्ड", sortBy: "क्रमबद्ध करें", pLow: "कीमत: कम से ज़्यादा", pHigh: "कीमत: ज़्यादा से कम", recentAdd: "हाल में जोड़ी गई", bLow: "बेडरूम: कम से ज़्यादा", bHigh: "बेडरूम: ज़्यादा से कम",
    clear: "फ़िल्टर हटाएं", found: "प्रॉपर्टीज़ मिलीं", noRes: "कोई प्रॉपर्टी नहीं मिली", noResD: "फ़िल्टर बदलकर या हटाकर देखें।", ground: "ग्राउंड", floorN: "फ्लोर",
    visitTitle: "प्रॉपर्टी विज़िट बुक करें", name: "पूरा नाम", phone: "फोन नंबर", selProp: "चुनी गई प्रॉपर्टी", date: "पसंदीदा तारीख", time: "पसंदीदा समय", famBach: "फैमिली या बैचलर",
    familyO: "फैमिली", bachelorO: "बैचलर", msg: "अतिरिक्त संदेश", submit: "व्हाट्सऐप से भेजें", visitNote: "आपकी विज़िट रिक्वेस्ट व्हाट्सऐप से भेजी जाएगी। हमारी टीम अपॉइंटमेंट कन्फ़र्म करेगी।",
    eName: "कृपया अपना नाम लिखें।", ePhone: "सही 10 अंकों का फोन नंबर लिखें।", eDate: "कृपया तारीख चुनें।", eTime: "कृपया समय चुनें।", eSel: "कृपया विकल्प चुनें।", eReq: "कृपया यह भरें।",
    requirement: "ज़रूरत", reqRent: "किराया", reqBuy: "खरीदना", reqSell: "बेचना", prefLoc: "पसंदीदा लोकेशन", contactTitle: "पूछताछ भेजें", contactNote: "आपकी पूछताछ व्हाट्सऐप में खुलेगी। सर्वर पर कुछ सेव नहीं होता।",
    group: "ताज़ा प्रॉपर्टी अपडेट के लिए हमारा व्हाट्सऐप ग्रुप जॉइन करें।", joinGroup: "व्हाट्सऐप ग्रुप जॉइन करें", address: "ओखला, जामिया नगर, नई दिल्ली, भारत", tagline: "ओखला में अपना पसंदीदा घर खोजें।",
    aboutH: "ओखला में आपका भरोसेमंद प्रॉपर्टी पार्टनर।", aboutP: "ओखला प्रॉपर्टीज़ ग्राहकों को ओखला और आसपास किराये के फ्लैट, अपार्टमेंट और रूम सेट खोजने में मदद करती है। हमारा लक्ष्य प्रॉपर्टी खोज को आसान, सुविधाजनक और पारदर्शी बनाना है।",
    services: "हमारी सेवाएं", s1: "किराये के फ्लैट", s2: "किराये के रूम", s3: "प्रॉपर्टी खरीदना", s4: "प्रॉपर्टी बेचना", s5: "प्रॉपर्टी विज़िट", areas: "हमारे कवर किए इलाके", contactUs: "संपर्क करें",
    quick: "क्विक लिंक", mediaTool: "मीडिया प्रीव्यू टूल", rights: "सर्वाधिकार सुरक्षित।", backTop: "ऊपर जाएं", suggest: "सुझाव"
  }
};
let lang = LS.get("lang", "en"); if (!T[lang]) lang = "en";
const t = k => (T[lang] && T[lang][k]) || T.en[k] || k;
const money = n => "₹" + Number(n).toLocaleString("en-IN");
function applyLang() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  $$("[data-i18n-ph]").forEach(e => e.placeholder = t(e.dataset.i18nPh));
  $$("[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === lang));
  document.dispatchEvent(new Event("langchange"));
}
function setLang(l) { lang = l; LS.set("lang", l); applyLang() }

/* ---------- STORAGE HELPERS ---------- */
const favs = () => LS.get("favs", []);
const toggleFav = id => { let f = favs(); f = f.includes(id) ? f.filter(x => x !== id) : [...f, id]; LS.set("favs", f); return f.includes(id) };
const byId = id => PROPERTIES.find(p => p.id === id);
const detailURL = id => new URL("property-details.html?id=" + id, location.href).href;
const toast = m => { const e = $("#toast"); e.textContent = m; e.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove("show"), 2200) };

/* ---------- WHATSAPP ---------- */
const openWA = text => window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
const rentTxt = p => money(p.rent) + "/month" + (p.rentNote ? " (" + p.rentNote + ")" : "");
function enquire(p) {
  openWA(`Hello Okhla Properties,\n\nI am interested in the ${p.title}.\n\nProperty ID: ${p.id}\nLocation: ${p.location}\nRent: ${rentTxt(p)}\n\nPlease share more details and arrange a visit.\n\nProperty Link: ${detailURL(p.id)}`);
}
const mapURL = p => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.location + ", Okhla, New Delhi");
async function shareProp(p) {
  const data = { title: p.title, text: p.title + " — " + rentTxt(p), url: detailURL(p.id) };
  if (navigator.share) { try { await navigator.share(data); return } catch (e) { if (e.name === "AbortError") return } }
  try { await navigator.clipboard.writeText(data.url); toast("Link copied") } catch { prompt("Copy link:", data.url) }
}

/* ---------- PROPERTY CARD ---------- */
function floorLabel(p) { return p.floor || t("cfd") }
function card(p) {
  const chips = [p.config, p.floor, p.size, p.parking && t(p.parking === "Car" ? "carP" : "bikeP"), p.lift === true ? t("lift") : p.lift === false ? "No " + t("lift") : ""].filter(Boolean);
  return `<article class="card"><a class="ci" href="property-details.html?id=${p.id}"><img src="${p.images[0] || PH}" alt="${p.title} (sample photo)" loading="lazy" onerror="imgErr(this)"><span class="badge ${p.status}">${t("status_" + p.status)}</span><span class="ill">${t("sample")}</span></a>
<button class="fav ${favs().includes(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="${t("save")}">♥</button>
<div class="cb"><h3><a href="property-details.html?id=${p.id}">${p.title}</a></h3><div class="loc">📍 ${p.location}</div>
<div class="rent">${money(p.rent)}<small>${t("perMonth")}${p.rentNote ? " · " + (p.rentNote === "Final" ? t("final") : p.rentNote) : ""}</small></div>
<div class="chips">${chips.map(c => `<span>${c}</span>`).join("")}</div>
${p.tenant ? `<div class="loc">👥 ${p.tenant}</div>` : ""}
<div class="acts"><a class="btn b-navy b-sm" href="property-details.html?id=${p.id}">${t("viewDetails")}</a><button class="btn b-wa b-sm" data-wa="${p.id}">${t("wa")}</button></div></div></article>`;
}

/* ---------- LAYOUT (header, footer, floating UI, modal) ---------- */
const PAGE = location.pathname.split("/").pop() || "index.html";
function buildLayout() {
  const nav = [["home", "index.html"], ["properties", "properties.html"], ["rent", "properties.html?r=1"], ["buy", "contact.html?req=Buy"], ["sell", "contact.html?req=Sell"], ["about", "about.html"], ["contact", "contact.html"]];
  const act = k => (PAGE === "index.html" && k === "home") || (PAGE === "properties.html" && k === "properties") || (PAGE === "about.html" && k === "about") || (PAGE === "contact.html" && k === "contact" && !location.search);
  const links = nav.map(([k, h]) => `<a class="l ${act(k) ? "act" : ""}" href="${h}" data-i18n="${k}"></a>`).join("");
  const lg = `<div class="lang" role="group" aria-label="Language"><button data-lang="en">English</button><button data-lang="hi">हिंदी</button></div>`;
  $("#hdr").outerHTML = `<header class="hdr"><div class="wrap"><a class="logo" href="index.html">OKHLA <b>PROPERTIES</b></a>
<nav class="nav" id="nav" aria-label="Main"><div class="nt"><span data-i18n="menu"></span><button class="x" id="navx" aria-label="Close menu">×</button></div>${links}
<div class="ncta"><a class="btn b-navy" href="tel:${PHONE}">📞 <span data-i18n="call"></span></a><a class="btn b-wa" href="https://wa.me/${WA}" target="_blank" rel="noopener">💬 <span data-i18n="wa"></span></a></div></nav>
<div class="hr"><div class="dcta"><a class="btn b-navy b-sm" href="tel:${PHONE}">📞 <span data-i18n="call"></span></a></div>${lg}
<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button></div></div></header><div class="ov" id="ov"></div>`;
  $("#ftr").outerHTML = `<footer><div class="wrap"><div class="fg"><div><h4>OKHLA PROPERTIES</h4><p data-i18n="tagline"></p><p>📍 <span data-i18n="address"></span></p><p>📞 <a style="display:inline" href="tel:${PHONE}">+91 8506033206</a></p></div>
<div><h4 data-i18n="quick"></h4><a href="index.html" data-i18n="home"></a><a href="properties.html" data-i18n="properties"></a><a href="about.html" data-i18n="about"></a><a href="contact.html" data-i18n="contact"></a><a href="media-tool.html" data-i18n="mediaTool"></a></div>
<div><h4 data-i18n="services"></h4><span data-i18n="s1"></span><br><span data-i18n="s2"></span><br><span data-i18n="s3"></span><br><span data-i18n="s4"></span><br><span data-i18n="s5"></span></div></div>
<div class="copy">© ${new Date().getFullYear()} OKHLA PROPERTIES. <span data-i18n="rights"></span></div></div></footer>`;
  document.body.insertAdjacentHTML("beforeend", `<a class="fwa" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a><button class="btt" id="btt" aria-label="Back to top">↑</button><div class="toast" id="toast" role="status"></div>
<div class="modal" id="vm" role="dialog" aria-modal="true" aria-labelledby="vt"><div class="mbox"><h3 id="vt" data-i18n="visitTitle"></h3><form id="vf" novalidate>
<div class="fgrp"><label for="vn" data-i18n="name"></label><input id="vn" autocomplete="name"><div class="err"></div></div>
<div class="fgrp"><label for="vp" data-i18n="phone"></label><input id="vp" type="tel" inputmode="numeric" autocomplete="tel"><div class="err"></div></div>
<div class="fgrp"><label for="vs" data-i18n="selProp"></label><select id="vs"></select></div>
<div class="row2"><div class="fgrp"><label for="vd" data-i18n="date"></label><input id="vd" type="date"><div class="err"></div></div><div class="fgrp"><label for="vt2" data-i18n="time"></label><input id="vt2" type="time"><div class="err"></div></div></div>
<div class="fgrp"><label for="vb" data-i18n="famBach"></label><select id="vb"><option value="" data-i18n="any"></option><option value="Family" data-i18n="familyO"></option><option value="Bachelor" data-i18n="bachelorO"></option></select><div class="err"></div></div>
<div class="fgrp"><label for="vm2" data-i18n="msg"></label><textarea id="vm2"></textarea></div><div class="note" data-i18n="visitNote"></div>
<div class="row2"><button type="button" class="btn b-out" id="vc">×</button><button class="btn b-wa" data-i18n="submit"></button></div></form></div></div>`);
  $("#vs").innerHTML = PROPERTIES.map(p => `<option value="${p.id}">${p.title}</option>`).join("");
  $("#vd").min = new Date().toISOString().slice(0, 10);
}
function menu(open) {
  $("#nav").classList.toggle("open", open); $("#ov").classList.toggle("show", open); $("#burger").classList.toggle("open", open);
  $("#burger").setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : "";
}
function openVisit(id) { $("#vs").value = id || PROPERTIES[0].id; $("#vm").classList.add("show"); $("#vn").focus() }
const setErr = (el, m) => { el.closest(".fgrp").querySelector(".err").textContent = m; return !m };
/* Reusable validator: rules = [[element, test, errorKey]] */
function validate(rules) { let ok = true; rules.forEach(([el, fn, k]) => { if (!setErr(el, fn(el.value.trim()) ? "" : t(k))) ok = false }); return ok }
const phoneOK = v => /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));

function bindGlobal() {
  $("#burger").onclick = () => menu(!$("#nav").classList.contains("open"));
  $("#navx").onclick = $("#ov").onclick = () => menu(false);
  $$("#nav a").forEach(a => a.addEventListener("click", () => menu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") { menu(false); $("#vm").classList.remove("show") } });
  $$("[data-lang]").forEach(b => b.onclick = () => setLang(b.dataset.lang));
  const btt = $("#btt"); btt.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
  addEventListener("scroll", () => btt.classList.toggle("show", scrollY > 500), { passive: true });
  $("#vc").onclick = () => $("#vm").classList.remove("show");
  $("#vm").onclick = e => { if (e.target.id === "vm") $("#vm").classList.remove("show") };
  $("#vf").onsubmit = e => {
    e.preventDefault();
    if (!validate([[$("#vn"), v => v.length > 1, "eName"], [$("#vp"), phoneOK, "ePhone"], [$("#vd"), v => v, "eDate"], [$("#vt2"), v => v, "eTime"], [$("#vb"), v => v, "eSel"]])) return;
    const p = byId($("#vs").value);
    openWA(`Hello Okhla Properties,\n\nI would like to book a property visit.\n\nName: ${$("#vn").value.trim()}\nPhone: ${$("#vp").value.trim()}\nProperty: ${p.title}\nProperty ID: ${p.id}\nLocation: ${p.location}\nRent: ${rentTxt(p)}\nPreferred Date: ${$("#vd").value}\nPreferred Time: ${$("#vt2").value}\nTenant Type: ${$("#vb").value}\nMessage: ${$("#vm2").value.trim() || "-"}\n\nProperty Link: ${detailURL(p.id)}`);
    $("#vm").classList.remove("show");
  };
  /* Delegated clicks for cards and detail buttons */
  document.addEventListener("click", e => {
    const f = e.target.closest("[data-fav]"), w = e.target.closest("[data-wa]"), v = e.target.closest("[data-visit]"), s = e.target.closest("[data-share]");
    if (f) { const on = toggleFav(f.dataset.fav); $$(`[data-fav="${f.dataset.fav}"]`).forEach(b => { b.classList.toggle("on", on); if (b.dataset.txt) b.textContent = "♥ " + t(on ? "saved" : "save") }); document.dispatchEvent(new Event("favchange")); toast(on ? "♥ " + t("saved") : "Removed") }
    if (w) enquire(byId(w.dataset.wa));
    if (v) openVisit(v.dataset.visit);
    if (s) shareProp(byId(s.dataset.share));
  });
}

/* ---------- HOME PAGE ---------- */
function initHome() {
  const opt = (arr, fn) => arr.map(fn).join("");
  $("#hl").innerHTML = `<option value="" data-i18n="allLoc"></option>` + opt(LOCS, l => `<option>${l}</option>`);
  $("#ht").innerHTML = `<option value="" data-i18n="allTypes"></option>` + opt(TYPES, x => `<option>${x}</option>`);
  $("#hb").innerHTML = `<option value="" data-i18n="anyBudget"></option>` + opt(BUDGETS, ([v, k]) => `<option value="${v}" data-i18n="${k}"></option>`);
  $("#hs").onsubmit = e => { e.preventDefault(); const q = new URLSearchParams(); if ($("#hl").value) q.set("loc", $("#hl").value); if ($("#ht").value) q.set("type", $("#ht").value); if ($("#hb").value) q.set("budget", $("#hb").value); location.href = "properties.html?" + q };
  const render = () => {
    $("#feat").innerHTML = PROPERTIES.slice(0, 3).map(card).join("");
    $("#latest").innerHTML = PROPERTIES.slice(-3).reverse().map(card).join("");
    const rv = LS.get("recent", []).map(byId).filter(Boolean).slice(0, 3);
    $("#recentSec").hidden = !rv.length; $("#recent").innerHTML = rv.map(card).join("");
    $("#locs").innerHTML = LOCS.map(l => `<a class="tile" href="properties.html?loc=${encodeURIComponent(l)}">${l}<small>${PROPERTIES.filter(p => (p.location + " " + (p.landmark || "")).includes(l) || p.area === l).length}</small></a>`).join("");
    $("#types").innerHTML = TYPES.map(x => `<a class="tile" href="properties.html?type=${encodeURIComponent(x)}">${x}<small>${PROPERTIES.filter(p => p.config === x).length}</small></a>`).join("");
    $$("[data-i18n]", $("#hs")).forEach(e => e.textContent = t(e.dataset.i18n));
  };
  document.addEventListener("langchange", render); document.addEventListener("favchange", render);
}

document.addEventListener("DOMContentLoaded", () => {
  buildLayout(); bindGlobal();
  if ($("#hs")) initHome();
  applyLang();
});
