# Bookworm — Монгол номын сошиал платформ

35,000+ хэрэглэгчид зориулсан номын сан, нийгэмлэг, зар худалдаа болон чат функцтэй вэб апп.

## Технологийн стэк

- **Framework**: Next.js 16 (App Router)
- **Хэл**: TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Real-time**: Socket.io (бэлтгэгдсэн)
- **Мессеж**: Facebook Messenger Webhook

## Эхлүүлэх

### Шаардлага

- Node.js 18+
- npm / yarn / pnpm

### Суулгах

```bash
npm install
```

### Орчны тохиргоо

`.env.local` файлд дараах утгуудыг оруулна:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/bookworm
JWT_SECRET=нууц-түлхүүр
REDIS_URL=redis://localhost:6379
MESSENGER_VERIFY_TOKEN=bookworm_verify_token
MESSENGER_PAGE_ACCESS_TOKEN=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### Локал сервер ажиллуулах

```bash
npm run dev
```

Браузерт **http://localhost:3000** нээнэ үү.

> Demo горимд дурын и-мэйл болон 6-с дээш тэмдэгтийн нууц үгээр нэвтэрч болно.

### Build хийх

```bash
npm run build
npm start
```

## Хуудсуудын бүтэц

| Хуудас | Замнал | Тайлбар |
|--------|--------|---------|
| Нэвтрэх | `/auth/login` | И-мэйл + нууц үгээр нэвтрэх |
| Бүртгүүлэх | `/auth/register` | Шинэ бүртгэл үүсгэх |
| Миний сан | `/library` | Номоо нэмэх, засах, устгах |
| Коммунити | `/community` | Бусдын нийтэлсэн номнууд, зээлэх |
| Зар | `/marketplace` | Ном зарах, авах, хайх |
| Чат | `/chat` | Хэрэглэгчидтэй мессеж бичих |
| Профайл | `/profile` | Мэдээлэл, статистик, тохиргоо |

## API Endpoints

| Endpoint | Арга | Тайлбар |
|----------|------|---------|
| `/api/auth/login` | POST | Нэвтрэх |
| `/api/messenger/webhook` | GET | Facebook верификац |
| `/api/messenger/webhook` | POST | Messenger мессеж хүлээн авах |

## Facebook Messenger холболт

1. [Meta Developers](https://developers.facebook.com) дээр апп үүсгэнэ
2. Webhook URL: `https://таны-домэйн/api/messenger/webhook`
3. Verify Token: `.env.local`-н `MESSENGER_VERIFY_TOKEN` утга
4. Page Access Token-г `.env.local`-д нэмнэ

## Хавтасны бүтэц

```
src/
├── app/
│   ├── (main)/          # Нэвтэрсэн хэрэглэгчийн хуудсууд
│   ├── auth/            # Нэвтрэх / бүртгүүлэх
│   └── api/             # REST API болон Webhook
├── components/
│   └── books/           # Номтой холбоотой компонентууд
├── store/               # Zustand state management
└── types/               # TypeScript төрлүүд
```

## Лиценз

MIT
