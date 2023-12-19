# Run application

## Locally

### Requirements
- Docker (for PostgreSQL and Redis)
- ngrok (for external https address for tg callbacks)
- pnpm

### Steps
1. Start docker compose file from /env/local
```bash
cd <path to dir>/env/local
docker compose up -d
```
2. Go to app directory <path to dir>/app
```bash
cd <path to dir>/app
```
3. Edit config file <path to dir>/app/src/config.ts (you have to put your telegram bot's token and ngrok URL)
4. Install dependencies
```bash
pnpm i
```
5. Start ngrok (this will show you https address to put in the step 3)
```bash
ngrok http https://localhost:3000
```
6. Run DB migrations
```bash
pnpm run migrate
```
7. Run application
```bash
pnpm run start:dev
```