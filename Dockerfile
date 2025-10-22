FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20-alpine AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_URL=https://attending-audit-solutions-shorts.trycloudflare.com/api/v1
ENV NEXT_PUBLIC_IMAGE_SERVER=https://domain-url.com
RUN npm run build

FROM node:20-alpine AS runner


WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_URL=https://attending-audit-solutions-shorts.trycloudflare.com/api/v1
ENV NEXT_PUBLIC_IMAGE_SERVER=https://domain-url.com
ENV NEXT_PUBLIC_HOST=https://mydomain.com
ENV PORT=3000
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
EXPOSE 3000
CMD ["npm","run","start","--","-p","3000"]
