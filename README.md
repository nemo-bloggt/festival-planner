# Festival Planner

Eine moderne Festival-Planungs-WebApp auf Basis von React und PocketBase.

## Features

- Festivals verwalten
- Gruppen für Festivals erstellen
- Mitglieder verwalten
- Mitbringlisten organisieren
- Fahrgemeinschaften planen (geplant)
- Aufgabenverwaltung (geplant)
- Festival Timetables (geplant)

---

# Tech Stack

## Frontend
- React
- Vite
- TailwindCSS

## Backend
- PocketBase

## Deployment
- GitHub
- Coolify (geplant)

---

# Projektstruktur

```text
festival-planner/
├── frontend/     # React Frontend
├── pocketbase/   # PocketBase Backend
```

---

# Lokale Entwicklung

## Frontend starten

```bash
cd frontend
npm install
npm run dev
```

Frontend erreichbar unter:

```text
http://localhost:5173
```

---

## PocketBase starten

```bash
cd pocketbase
./pocketbase serve
```

PocketBase Admin:

```text
http://127.0.0.1:8090/_/
```

---

# Collections

## festivals
- name
- slug
- start_date
- end_date
- location
- website
- description

## groups
- name
- festival

## people
- name
- email
- phone
- has_car

## group_members
- group
- person
- role

## packing_items
- group
- item_name
- assigned_person
- quantity
- status
- notes

## tasks
- group
- title
- description
- assigned_person
- due_date
- done

## carpools
- group
- driver
- departure_location
- departure_time
- available_seats
- notes

## artists
- festival
- name
- stage
- start_time
- end_time
- genre

## favorites
- person
- artist

---

# Geplante Features

- Benutzer-Login
- Rollen & Berechtigungen
- Persönliche Festival-Timetables
- Mobile Optimierung
- Festivaldaten automatisch importieren
- Push Notifications
- Darkmode Erweiterungen

---

# Lizenz

MIT