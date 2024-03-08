FROM node:18-alpine
WORKDIR /CDD_back-end
COPY . .
RUN npm install

ENTRYPOINT [ "sh", "-c" ,"npm run prisma:migrate && npm run dev" ]

EXPOSE 3000
