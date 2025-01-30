# 1️⃣ Basis-Image mit Node.js für das Bauen des Frontends
FROM node:18-alpine AS build

# 2️⃣ Arbeitsverzeichnis im Container setzen
WORKDIR /app

# 3️⃣ Package.json & package-lock.json kopieren
COPY package.json package-lock.json ./

# 4️⃣ Abhängigkeiten installieren (Production Modus)
RUN npm install

# 5️⃣ Den gesamten Code ins Docker-Image kopieren
COPY . .

# 6️⃣ Das Frontend für die Produktion bauen
RUN npm run build


# 7️⃣ ---- NGINX für das Hosting des Frontends ----
FROM nginx:alpine

# 8️⃣ Arbeitsverzeichnis setzen
WORKDIR /usr/share/nginx/html

# 9️⃣ Standard Nginx Dateien löschen
RUN rm -rf ./*

# 🔟 Kopiere das gebaute Frontend ins Nginx-Verzeichnis
COPY --from=build /app/build .

# 1️⃣1️⃣ Port 80 freigeben
EXPOSE 80

# 1️⃣2️⃣ Nginx starten
CMD ["nginx", "-g", "daemon off;"]
