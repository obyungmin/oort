# Oort System Architecture (Codex Master Prompt Aligned)

## 1) Manifesto and Product Invariants

**Mission:** Oort is the operating system for the offline economy. It replaces static place data with live, user-verified reality.

### Core invariant
- **If it is not happening now, it does not exist in Oort.**

### Problem model
- Legacy maps optimize for static XY discovery.
- Real urban commerce is **vertical** (buildings/floors) and **volatile** (weather, crowd, inventory, events).
- This causes information asymmetry and high search cost.

### Solution model
- Video-first, mapless exploration where the primary trust primitive is **Proof of Work** via fresh Live Peeks.
- Every decision surface must reward recency and spatial structure.

## 2) Spatial Architecture (Relational Spatial Tree)

Oort uses relational hierarchy instead of map-first coordinates:

1. `Zone` — living neighborhood context.
2. `Building` — vertical container.
3. `Floor` — B-level to top floor.
4. `Spot` — store / pop-up / live event.

### Data model baseline

```text
Zone(zone_id, name, trend_score)
Building(building_id, zone_id, name, address_hint)
Floor(floor_id, building_id, label, ordinal)
Spot(spot_id, floor_id, kind, name, live_status)
LivePeek(peek_id, spot_id, user_id, captured_at, gps, media_url, verification_state)
```

### Non-negotiable UI rule
- Nearby results **must** group by `building_id`.
- Spots within one building are shown as a vertical stack (floors revealed by expansion).

## 3) Triple Engine Specification

## A. Discovery Engine (Home Feed)

### Tabs
- **For You** = serendipity layer.
- **Community** = real-time signal layer.

### For You feed contract
- Layout: **2-column masonry grid**.
- Theme: background pure black `#000000`.
- Card title legibility: always place title over a **30% black→transparent linear gradient scrim**.
- Ranking blend:
  - Personal affinity
  - Zone trendiness
  - Recency (strong positive weight)

### Community feed contract
- Owner Beacon API exposes live operational state (example: `Rainy-Open`, inventory low).
- Live Signals aggregate reactions (`🔥`, `❄️`, `🙏`) into a visible mood heatmap overlay.

## B. Efficiency Engine (Nearby / Index)

### Query logic
1. Hard filter by physical proximity.
2. Rank by algorithmic relevance.

### UX constraints
- Building Stack UI is the default representation.
- Tap building → expand floors → preview live videos per spot.
- Nearby/search prioritizes **accuracy + structure** over virality.

## C. Incentive Engine (Reward Loop)

### Mission/Bounty system
- Demand for fresh information is expressed as missions.
- Example mission: “Check Baguio Night Market rain status now.”

### Verification anti-fraud
- A submitted peek is valid only if GPS and timestamp satisfy mission constraints.
- Reject stale or location-mismatched uploads as ghost peeks.

### Oort Pay
- Wallet ledger for mission rewards.
- Points redeemable with verified partner spots.

## 4) Live News and Event Logic

- Flea markets, weather-dependent events, and pop-ups are represented as **Live Spots**.
- News cards appear inside feed grid with a distinct **Neon News Badge**.
- On user request (e.g., “Is the market open?”):
  1. Create signal request mission.
  2. Notify nearby eligible users.
  3. First valid verified video wins bounty.

## 5) Golden Engineering Rules (Implementation Checklist)

1. **No Maps by default.** Do not render Google Maps/Mapbox except optional final navigation step.
2. **Recency is king.** A 10-minute video outranks old polished media.
3. **Verticality everywhere.** Floor level must be explicit in cards, search, and detail UI.
4. **Information rent economics.** Commercial access to user insight should flow through bounties/promoted missions.

## 6) Suggested Scoring Heuristics (Initial)

### Live content score

```text
live_score =
  (recency_weight * freshness_minutes_decay)
+ (verification_weight * verification_confidence)
+ (zone_weight * zone_trend_score)
+ (affinity_weight * user_affinity)
```

### Nearby rank score

```text
nearby_score =
  (distance_filter_pass ? 1 : 0)
* ((relevance_weight * semantic_match)
 + (recency_weight * freshness)
 + (structure_weight * floor_and_building_completeness))
```

## 7) API Contracts (Minimum)

### Owner beacon
- `GET /v1/spots/{spot_id}/beacon`
- Returns:
  - `status` (e.g., `Open`, `Rainy-Open`, `Temporarily-Closed`)
  - `inventory_signal` (e.g., `Low`, `Normal`)
  - `updated_at`

### Submit live peek
- `POST /v1/live-peeks`
- Required fields:
  - `spot_id`
  - `captured_at`
  - `gps`
  - `media`
- Server validates recency window and geofence before marking verified.

### Signal request mission
- `POST /v1/missions/signal-request`
- Inputs:
  - `zone_id`
  - `prompt`
  - `expiry`
  - `reward_points`

## 8) Product Review Gate

A feature must fail review if any of the following is true:
- It prioritizes stale content over verified fresh content.
- It hides or omits floor context in dense vertical zones.
- It defaults to map UI for discovery instead of building stack UI.
- It introduces incentives without verification safeguards.
