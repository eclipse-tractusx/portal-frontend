# 1️⃣ Basis-Image mit Node.js für das Bauen des Frontends
FROM node:18-alpine AS build

# 2️⃣ Arbeitsverzeichnis im Container setzen
WORKDIR /app

# Dependencies installieren
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 3️⃣ Package.json & package-lock.json kopieren
COPY package.json package-lock.json ./

# 5️⃣ Den gesamten Code ins Docker-Image kopieren
COPY . .
RUN yarn build

# 6️⃣ Das Frontend für die Produktion bauen
RUN npm run build


# 7️⃣ ---- NGINX für das Hosting des Frontends ----
FROM nginx:alpine

# Produktives Image
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

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
