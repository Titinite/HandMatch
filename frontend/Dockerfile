# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.11.1

FROM node:${NODE_VERSION}-alpine AS development
ENV NODE_ENV=development
WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node frontend/package.json frontend/package-lock.json ./
RUN --mount=type=cache,target=/home/node/.npm,uid=1000,gid=1000 npm ci

COPY --chown=node:node frontend/ ./

EXPOSE 5173
CMD ["npm", "run", "dev"]