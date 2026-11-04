FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
COPY frontend/package.json ./frontend/package.json
COPY backend/package.json ./backend/package.json
RUN npm install
COPY . .
RUN npm run build --workspace backend

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "backend"]
