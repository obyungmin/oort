const forYouItems = [
  {
    title: "B1 Street Tacos · Steam rising now",
    zone: "Hongdae",
    recency: "2m ago",
    floor: "B1",
    buildingId: "HD-102",
    bg: "linear-gradient(125deg,#7c2d12,#ea580c)",
    badges: ["Live Peek", "Freshness x10"],
  },
  {
    title: "Neon thrift pop-up just opened",
    zone: "Gangnam",
    recency: "5m ago",
    floor: "4F",
    buildingId: "GN-219",
    bg: "linear-gradient(120deg,#0f172a,#7e22ce)",
    badges: ["News", "Neon Badge"],
    news: true,
  },
  {
    title: "Rain check: Market lane still active",
    zone: "Baguio",
    recency: "1m ago",
    floor: "Street",
    buildingId: "BG-NM",
    bg: "linear-gradient(120deg,#0c4a6e,#0369a1)",
    badges: ["Weather Live", "Proof of Work"],
  },
  {
    title: "Rooftop coffee queue update",
    zone: "Myeongdong",
    recency: "7m ago",
    floor: "Top",
    buildingId: "MY-010",
    bg: "linear-gradient(120deg,#1f2937,#334155)",
    badges: ["Queue Status", "Owner Beacon Sync"],
  },
];

const communitySignals = [
  {
    spot: "Baguio Night Market",
    status: "Rainy-Open",
    inventory: "Normal",
    ownerClass: "owner-open",
    mood: "🔥🔥🙏",
    updatedAt: "20s ago",
  },
  {
    spot: "Hongdae Vinyl Basement",
    status: "Open",
    inventory: "Low",
    ownerClass: "owner-warn",
    mood: "❄️🙏",
    updatedAt: "1m ago",
  },
];

const nearbyGrouped = [
  {
    buildingId: "GN-219",
    buildingName: "Mirae Tower",
    zone: "Gangnam",
    distance: "140m",
    floors: [
      { floor: "B1", spot: "Night Ramen Lab", live: "3m" },
      { floor: "2F", spot: "Nori Bento", live: "1m" },
      { floor: "4F", spot: "Neon Thrift Pop-up", live: "5m" },
    ],
  },
  {
    buildingId: "HD-102",
    buildingName: "Yeonnam Stack",
    zone: "Hongdae",
    distance: "260m",
    floors: [
      { floor: "B1", spot: "Street Taco Cellar", live: "2m" },
      { floor: "1F", spot: "Mint Gelato", live: "4m" },
      { floor: "Top", spot: "Sky Tea Deck", live: "6m" },
    ],
  },
];

const missions = [
  {
    title: "Check Baguio Night Market rain status",
    reward: 120,
    eta: "Expires in 8m",
    verify: "GPS + Timestamp required",
  },
  {
    title: "Verify queue at Mirae Tower 2F Nori Bento",
    reward: 80,
    eta: "Expires in 12m",
    verify: "Within 120m geofence",
  },
];

const renderForYou = () => {
  const root = document.getElementById("for-you-grid");
  root.innerHTML = forYouItems
    .map(
      (item) => `
      <article class="card">
        <div class="video-mock" style="background:${item.bg}">
          <div class="video-title">${item.title}</div>
        </div>
        <div class="meta">${item.zone} · ${item.floor} · ${item.recency} · Building ${item.buildingId}</div>
        <div class="badges">
          ${item.badges
            .map(
              (badge) =>
                `<span class="badge ${item.news && badge === "News" ? "news" : ""}">${badge}</span>`
            )
            .join("")}
        </div>
      </article>`
    )
    .join("");
};

const renderCommunity = () => {
  const root = document.getElementById("community-feed");
  root.innerHTML = communitySignals
    .map(
      (signal) => `
      <div class="row">
        <strong>${signal.spot}</strong>
        <div>Owner Beacon: <span class="${signal.ownerClass}">${signal.status}</span> · inventory ${signal.inventory}</div>
        <div class="mood">Mood Heatmap ${signal.mood}</div>
        <small class="subtle">updated ${signal.updatedAt}</small>
      </div>`
    )
    .join("");
};

const renderNearby = () => {
  const root = document.getElementById("nearby-stacks");
  root.innerHTML = nearbyGrouped
    .map(
      (group, idx) => `
      <section class="stack ${idx === 0 ? "open" : ""}">
        <button class="stack-header" data-stack="${group.buildingId}">
          <span>${group.buildingName} · ${group.zone} · ${group.distance}</span>
          <strong>Building ${group.buildingId}</strong>
        </button>
        <div class="floors" id="floors-${group.buildingId}">
          ${group.floors
            .map(
              (floor) => `
              <div class="floor-row">
                <div class="floor-label">${floor.floor}</div>
                <div>${floor.spot} · live ${floor.live} ago</div>
              </div>`
            )
            .join("")}
        </div>
      </section>`
    )
    .join("");

  document.querySelectorAll(".stack-header").forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.classList.toggle("open");
    });
  });
};

const renderMissions = () => {
  const root = document.getElementById("missions-list");
  root.innerHTML = missions
    .map(
      (mission) => `
      <article class="row">
        <strong>${mission.title}</strong>
        <div>${mission.verify}</div>
        <div>Reward: <strong>${mission.reward} pts</strong> · ${mission.eta}</div>
      </article>`
    )
    .join("");
};

const wireTabs = () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((tab) => tab.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      const panel = document.getElementById(button.dataset.tab);
      panel.classList.add("active");
    });
  });
};

renderForYou();
renderCommunity();
renderNearby();
renderMissions();
wireTabs();
