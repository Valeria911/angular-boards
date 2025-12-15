# ---------- BUILD ----------
FROM node:20-alpine AS build

WORKDIR /app

# Instalar Angular CLI

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN ng build --configuration production

# ---------- NGINX ----------

FROM nginx:alpine

COPY --from=build /app/dist/angular-boards/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]