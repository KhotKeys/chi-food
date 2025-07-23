// Chicago Food Connect - Advanced UI, More Locations, Animated Hero

// --- Sample Data (expand for demo) ---
const pantries = [
  {
    id: 1,
    name: "Grace House Pantry",
    lat: 41.885,
    lng: -87.65,
    needs: ["cereal", "soup", "rice", "fresh produce"],
    open: true,
    address: "123 W Grace St, Chicago, IL",
    hours: "Mon-Fri 9am-5pm",
    contact: "(312) 555-1234"
  },
  {
    id: 2,
    name: "Lakeview Pantry",
    lat: 41.95,
    lng: -87.66,
    needs: ["pasta", "beans", "cereal", "milk", "eggs"],
    open: true,
    address: "3945 N Sheridan Rd, Chicago, IL",
    hours: "Mon-Sat 10am-6pm",
    contact: "(312) 555-5678"
  },
  {
    id: 3,
    name: "South Shore Food Pantry",
    lat: 41.76,
    lng: -87.57,
    needs: ["baby food", "formula", "vegetables"],
    open: false,
    address: "7054 S Jeffery Blvd, Chicago, IL",
    hours: "Closed today",
    contact: "(312) 555-9012"
  },
  {
    id: 4,
    name: "Austin Community Pantry",
    lat: 41.893,
    lng: -87.761,
    needs: ["corn", "tomatoes", "potatoes", "dairy"],
    open: true,
    address: "5500 W Chicago Ave, Chicago, IL",
    hours: "Mon-Fri 8am-4pm",
    contact: "(312) 555-4321"
  },
  {
    id: 5,
    name: "Englewood Fresh Market",
    lat: 41.775,
    lng: -87.641,
    needs: ["lettuce", "apples", "carrots", "bread"],
    open: true,
    address: "700 W 63rd St, Chicago, IL",
    hours: "Mon-Sat 9am-5pm",
    contact: "(312) 555-2468"
  }
];
const fridges = [
  {
    name: "Community Fridge - Pilsen",
    lat: 41.857,
    lng: -87.654,
    address: "1850 S Racine Ave, Chicago, IL"
  },
  {
    name: "Community Fridge - North Side",
    lat: 41.98,
    lng: -87.67,
    address: "5200 N Broadway, Chicago, IL"
  },
  {
    name: "Community Fridge - Bronzeville",
    lat: 41.812,
    lng: -87.617,
    address: "3500 S King Dr, Chicago, IL"
  }
];
const foodDeserts = [
  {
    name: "Englewood",
    need: "Severe",
    lat: 41.775,
    lng: -87.641,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80&q=80",
    desc: "Very limited access to fresh food."
  },
  {
    name: "North Lawndale",
    need: "High",
    lat: 41.859,
    lng: -87.715,
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=80&h=80&q=80",
    desc: "Few grocery stores, high need for donations."
  },
  {
    name: "Austin",
    need: "High",
    lat: 41.893,
    lng: -87.761,
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=80&h=80&q=80",
    desc: "Many families rely on pantries."
  }
];

function loadLeafletScript(cb) {
  if (window.L) return cb();
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = cb;
  document.body.appendChild(script);
}

function createHeroSection() {
  return `<section style="width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;min-height:340px;overflow:hidden;">
    <div style="position:absolute;top:0;left:0;width:100vw;height:100%;z-index:0;background:url('images/Help.jpg') center center/cover no-repeat;"></div>
    <div class="hero-gradient-anim" style="position:absolute;top:0;left:0;width:100vw;height:100%;z-index:1;opacity:0.82;"></div>
    <div style="max-width:1400px;margin:0 auto;padding:4.5rem 2rem 3.5rem 2rem;text-align:center;position:relative;z-index:2;">
      <h1 class="fade-in" style="font-size:2.7rem;font-weight:800;color:#fff;letter-spacing:-1px;line-height:1.1;text-shadow:0 2px 16px rgba(0,0,0,0.18);">Chicago Food Connect</h1>
      <p class="fade-in" style="font-size:1.3rem;color:#fff;opacity:0.95;margin:1rem auto 2rem auto;max-width:600px;text-shadow:0 2px 12px rgba(0,0,0,0.12);">Real-time map and donation matching for food pantries, fridges, and donors.<br><span style='font-weight:600;'>Find food. Give food. Close the gap.</span></p>
      <button class="btn hero-btn-anim" style="font-size:1.15rem;padding:1rem 2.5rem;box-shadow:0 4px 24px rgba(0,0,0,0.10);background:var(--trust);border:none;" onclick="window.scrollTo({top:document.getElementById('foodmapSection').offsetTop-40,behavior:'smooth'})">Explore the Map ↓</button>
    </div>
  </section>`;
}

function createMetricCard(metric) {
  return `<div class="card slide-in metric-card">
    <div class="flex space-between">
      <div>
        <div class="text-muted-foreground">${metric.title}</div>
        <div class="text-2xl font-bold">${metric.value}</div>
        <div class="badge">${metric.icon} ${metric.change} ${metric.period}</div>
      </div>
    </div>
  </div>`;
}

function createMapSection() {
  return `<div class="card slide-in" id="foodmapSection" style="padding:2.5rem 1.5rem 2rem 1.5rem;max-width:900px;margin:0 auto 2.5rem auto;">
    <h3 class="flex" style="font-size:1.5em;margin-bottom:1.2em;color:var(--primary);font-weight:700;"><span style="margin-right:0.5em;">🗺️</span>Live Food Access Map</h3>
    <div id="foodmap" style="width:100%;max-width:700px;height:380px;margin:0 auto 1.5em auto;border-radius:1.5rem;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);"></div>
    <div style="text-align:center;margin-top:1.5em;">
      <button class="btn pulse" id="donateBtn" style="font-size:1.1rem;padding:0.9em 2.2em;">🤝 Donate Food</button>
    </div>
  </div>`;
}

function showMap() {
  if (!window.L) return;
  const map = L.map('foodmap').setView([41.88, -87.65], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  pantries.forEach(p => {
    const marker = L.marker([p.lat, p.lng], {title: p.name}).addTo(map);
    marker.bindPopup(`<b>${p.name}</b><br>${p.address}<br><b>Needs:</b> ${p.needs.join(', ')}<br><b>Hours:</b> ${p.hours}`);
    if (!p.open) marker.setOpacity(0.5);
  });
  fridges.forEach(f => {
    const marker = L.marker([f.lat, f.lng], {title: f.name, icon: L.icon({iconUrl:'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',iconSize:[28,28]})}).addTo(map);
    marker.bindPopup(`<b>${f.name}</b><br>${f.address}`);
  });
  // Highlight food desert areas with colored circles
  foodDeserts.forEach(fd => {
    L.circle([fd.lat, fd.lng], {
      color: '#e53935',
      fillColor: '#e53935',
      fillOpacity: 0.25,
      radius: 1800
    }).addTo(map).bindPopup(`<b>${fd.name}</b><br>Need: ${fd.need}<br>${fd.desc}`);
  });
}

function createDonationModal() {
  return `<div id="donationModal" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;z-index:1000;">
    <div class="card slide-in" style="max-width:400px;width:100%;position:relative;padding:2.5rem 2rem 2rem 2rem;box-shadow:0 8px 32px rgba(0,0,0,0.18);">
      <div style="background:linear-gradient(90deg,var(--primary),var(--accent));height:60px;width:calc(100% + 4rem);position:absolute;top:0;left:-2rem;border-radius:1.25rem 1.25rem 0 0;"></div>
      <button onclick="document.getElementById('donationModal').remove()" style="position:absolute;top:1.2em;right:1.2em;background:none;border:none;font-size:1.7em;cursor:pointer;color:#fff;z-index:2;">&times;</button>
      <h3 class="text-xl font-bold" style="margin-bottom:1.2em;margin-top:1.5em;color:var(--primary);text-align:center;">Smart Donation Matching</h3>
      <form id="donationForm">
        <label style="font-weight:600;">What do you want to donate?<br><input name="item" required placeholder="e.g. cereal, soup" style="width:100%;margin-bottom:1.2em;padding:0.7em 1em;border-radius:0.7em;border:1px solid #ccc;font-size:1.1em;"></label>
        <label style="font-weight:600;">When can you drop it off?<br><input name="when" required type="datetime-local" style="width:100%;margin-bottom:1.2em;padding:0.7em 1em;border-radius:0.7em;border:1px solid #ccc;font-size:1.1em;"></label>
        <button class="btn" type="submit" style="width:100%;font-size:1.1em;padding:0.8em 0;">Find Pantry Match</button>
      </form>
      <div id="donationResult" style="margin-top:1.2em;"></div>
    </div>
  </div>`;
}

function handleDonationMatch(e) {
  e.preventDefault();
  const item = e.target.item.value.trim().toLowerCase();
  const when = e.target.when.value;
  const match = pantries.find(p => p.open && p.needs.includes(item));
  const resultDiv = document.getElementById('donationResult');
  if (match) {
    resultDiv.innerHTML = `<div class="slide-in" style="background:var(--muted);padding:1.2em 1em;border-radius:0.9em;margin-top:1em;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
      <b style='color:var(--accent);font-size:1.1em;'>Match found!</b><br>
      <b>${match.name}</b><br>
      ${match.address}<br>
      <b>Drop-off:</b> ${new Date(when).toLocaleString()}<br>
      <b>Contact:</b> ${match.contact}<br>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(match.address)}" target="_blank" style="color:var(--trust);text-decoration:underline;">Get Directions</a>
    </div>`;
  } else {
    resultDiv.innerHTML = `<div class="slide-in" style="color:var(--destructive);margin-top:1em;font-weight:600;">No open pantry needs that item right now. Try another item!</div>`;
  }
}

function createFooter() {
  return `<footer style="width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;background:linear-gradient(90deg,var(--accent) 0%,var(--primary) 100%);padding:2.2rem 0 1.2rem 0;margin-top:3rem;">
    <div style="max-width:1400px;margin:0 auto;padding:0 2rem;text-align:center;color:#fff;">
      <div style="font-size:1.1em;font-weight:600;">Chicago Food Connect &copy; 2024</div>
      <div style="margin:0.7em 0 0.2em 0;">Contact: <a href="mailto:info@chifoodconnect.org" style="color:#fff;text-decoration:underline;">info@chifoodconnect.org</a></div>
      <div style="margin-top:0.5em;">
        <a href="#" style="color:#fff;margin:0 0.7em;font-size:1.3em;">🐦</a>
        <a href="#" style="color:#fff;margin:0 0.7em;font-size:1.3em;">📘</a>
        <a href="#" style="color:#fff;margin:0 0.7em;font-size:1.3em;">📸</a>
      </div>
    </div>
  </footer>`;
}

// --- Metrics, Live Feed, Top Pantries, etc. (unchanged) ---
const impactMetrics = [
  {
    title: "Total Chicago Donations",
    value: "$4.7M",
    change: "+28%",
    period: "This Month",
    icon: "💵",
    color: "badge"
  },
  {
    title: "Chicago Families Served",
    value: "78,942",
    change: "+22%",
    period: "This Month",
    icon: "👨‍👩‍👧‍👦",
    color: "badge"
  },
  {
    title: "Food Items Distributed",
    value: "1.2M",
    change: "+35%",
    period: "This Month",
    icon: "📦",
    color: "badge"
  },
  {
    title: "Active Chicago Pantries",
    value: "247",
    change: "+8%",
    period: "This Month",
    icon: "📍",
    color: "badge"
  }
];

const recentMatches = [
  {
    donor: "Sarah M. (Lincoln Park)",
    pantry: "Greater Chicago Food Depository - North",
    items: "Baby Formula, Winter Coats",
    amount: "$147.43",
    time: "3 minutes ago",
    families: 12
  },
  {
    donor: "Whole Foods Market (River North)",
    pantry: "Lakeview Pantry",
    items: "Fresh Produce, Organic Items",
    amount: "$3,291.50",
    time: "12 minutes ago",
    families: 198
  },
  {
    donor: "Hyde Park Community",
    pantry: "South Shore Food Pantry",
    items: "School Supplies, Baby Food",
    amount: "$789.22",
    time: "45 minutes ago",
    families: 67
  }
];

const topPantries = [
  {
    name: "Greater Chicago Food Depository - North",
    donations: "$189K",
    families: "4,567",
    efficiency: "98%",
    status: "excellent",
    neighborhood: "Near North Side"
  },
  {
    name: "South Shore Food Pantry",
    donations: "$134K",
    families: "3,234",
    efficiency: "96%",
    status: "excellent",
    neighborhood: "South Shore"
  },
  {
    name: "Lakeview Pantry",
    donations: "$98K",
    families: "2,189",
    efficiency: "94%",
    status: "excellent",
    neighborhood: "Lakeview"
  }
];

function createRecentMatch(match) {
  return `<div class="flex space-y-2 card pulse" style="background:var(--muted);margin-bottom:1.2rem;align-items:flex-start;box-shadow:0 2px 12px rgba(0,0,0,0.07);border:1px solid #f2f2f2;">
    <div style="width:10px;height:10px;background:var(--accent);border-radius:50%;margin-top:8px;" class="pulse"></div>
    <div style="flex:1;min-width:0;">
      <div class="font-medium">${match.donor} → ${match.pantry}</div>
      <div class="text-muted-foreground" style="font-size:0.95em;">${match.items}</div>
      <div class="flex space-between" style="margin-top:0.5em;">
        <span class="text-primary">${match.amount}</span>
        <span style="font-size:0.9em;color:var(--foreground);">👨‍👩‍👧‍👦 ${match.families} families • ${match.time}</span>
      </div>
    </div>
  </div>`;
}

function createPantryCard(pantry, idx) {
  return `<div class="flex space-between card slide-in" style="padding:1.5rem 1.2rem;align-items:center;box-shadow:0 2px 12px rgba(0,0,0,0.07);border:1px solid #f2f2f2;">
    <div>
      <div class="font-medium">${pantry.name}</div>
      <div class="flex space-y-2" style="font-size:0.95em;gap:1em;">
        <span>${pantry.neighborhood}</span>
        <span>${pantry.donations} raised</span>
        <span>${pantry.families} families</span>
      </div>
    </div>
    <div style="text-align:right;">
      <div class="badge">${pantry.efficiency} efficient</div>
      <div style="font-size:0.85em;color:var(--foreground);">Rank #${idx+1}</div>
    </div>
  </div>`;
}

function createFoodDesertSection() {
  return `<div class="card slide-in" style="margin-bottom:2.5rem;">
    <h3 class="flex" style="font-size:1.2em;color:var(--destructive);font-weight:700;"><span style="margin-right:0.5em;">🚩</span>High Need Areas (Food Deserts)</h3>
    <div class="grid grid-cols-3" style="gap:1.5em;margin-top:1.2em;">
      ${foodDeserts.map(fd => `
        <div class="fade-in" style="background:var(--muted);border-radius:1em;padding:1.2em 1em;display:flex;align-items:center;box-shadow:0 2px 12px rgba(229,57,53,0.07);border:1px solid #f8d7da;">
          <img src="${fd.img}" alt="${fd.name}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;margin-right:1em;border:2px solid var(--destructive);">
          <div>
            <div style="font-weight:700;font-size:1.1em;">${fd.name}</div>
            <div style="color:var(--destructive);font-weight:600;">${fd.need} Need</div>
            <div style="font-size:0.95em;color:#444;">${fd.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function createFeaturedStory() {
  return `<div class="card slide-in" style="background:linear-gradient(90deg,#fff7e6 60%,#e3fcec 100%);margin-bottom:2.5rem;display:flex;align-items:center;gap:2em;">
    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=120&h=120&q=80" alt="Community" style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid var(--accent);">
    <div>
      <div style="font-size:1.1em;font-weight:700;">“We never thought we’d have fresh food in our neighborhood. Now, my kids eat healthy every week.”</div>
      <div style="margin-top:0.5em;color:var(--primary);font-weight:600;">— Maria G., Englewood Resident</div>
    </div>
  </div>`;
}

function renderApp() {
  document.getElementById('root').innerHTML = `
    ${createHeroSection()}
    <main style="max-width:1400px;margin:0 auto;padding:2.5rem 2rem 0 2rem;">
      ${createFoodDesertSection()}
      ${createFeaturedStory()}
      <div class="grid grid-cols-4" style="margin-bottom:2.5rem;">
        ${impactMetrics.map(createMetricCard).join('')}
      </div>
      ${createMapSection()}
      <div class="grid grid-cols-2" style="max-width:1100px;margin:0 auto 2.5rem auto;">
        <div class="card slide-in" style="padding:2rem 1.5rem;">
          <h3 class="flex" style="font-size:1.2em;"><span style="margin-right:0.5em;">⏰</span>Live Chicago Donations</h3>
          <div class="space-y-4" style="margin-top:1em;">
            ${recentMatches.map(createRecentMatch).join('')}
          </div>
        </div>
        <div class="card slide-in" style="padding:2rem 1.5rem;">
          <h3 class="flex" style="font-size:1.2em;"><span style="margin-right:0.5em;">🎯</span>Top Chicago Pantries</h3>
          <div class="space-y-4" style="margin-top:1em;">
            ${topPantries.map(createPantryCard).join('')}
          </div>
        </div>
      </div>
      <div class="card slide-in" style="margin-bottom:2.5rem;">
        <h3 class="flex" style="font-size:1.2em;"><span style="margin-right:0.5em;">📍</span>Chicago Neighborhood Impact</h3>
        <div style="height:260px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--muted),var(--secondary));border-radius:1.25rem;margin-top:1.5em;">
          <div class="text-center">
            <div style="font-size:2.5em;">📍</div>
            <div class="font-semibold" style="font-size:1.1em;margin-bottom:0.5em;">Chicago Impact Heat Map</div>
            <div style="color:var(--foreground);max-width:340px;margin:0 auto;">Visual representation of donation distribution across Chicago neighborhoods from Lincoln Park to Bronzeville. Darker areas show higher concentration of successful food pantry matches.</div>
          </div>
        </div>
      </div>
      <div class="card slide-in" style="background:linear-gradient(90deg,var(--accent)10%,var(--primary)90%,#fff 100%);margin-bottom:2.5rem;">
        <div class="text-center">
          <div style="font-size:2.2em;margin-bottom:0.5em;">❤️</div>
          <h3 class="text-xl font-bold" style="margin-bottom:1em;">Chicago Community Success Stories</h3>
          <div class="grid grid-cols-2" style="max-width:600px;margin:0 auto;">
            <div class="space-y-2">
              <div class="text-2xl font-bold" style="color:var(--primary);">89%</div>
              <div class="text-muted-foreground">Reduction in food waste</div>
            </div>
            <div class="space-y-2">
              <div class="text-2xl font-bold" style="color:var(--accent);">2.3x</div>
              <div class="text-muted-foreground">Faster need fulfillment</div>
            </div>
            <div class="space-y-2">
              <div class="text-2xl font-bold" style="color:var(--trust);">97%</div>
              <div class="text-muted-foreground">Donor satisfaction rate</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${createFooter()}
  `;
  loadLeafletScript(showMap);
  setTimeout(() => {
    const donateBtn = document.getElementById('donateBtn');
    if (donateBtn) {
      donateBtn.onclick = () => {
        document.body.insertAdjacentHTML('beforeend', createDonationModal());
        document.getElementById('donationForm').onsubmit = handleDonationMatch;
      };
    }
  }, 100);
}

window.onload = renderApp; 