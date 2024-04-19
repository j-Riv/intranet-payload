# Intranet

## Dev
```bash
# start db
docker-compose -f docker-compose.local.yml up -d
# start server
npm run dev
# initial seed if not done so
npm run seed
```

# Demo Users
Demo Admin
Email: demo-admin@payloadcms.com
Password: password
Role: admin

Demo Editor
Email: demo-editor@payloadcms.com
Password: password
Role: editor

Demo User
Email: demo-user@payloadcms.com
Password: password
Role: user

## Setup
```bash
npx payload generate:types
npx payload generate:graphQLSchema
```

## Environmental Variables
```bash
# Run on a specific port
PORT=3000
# Database connection string
DATABASE_URI=postgres://postgres@127.0.0.1:5555/payload
# DATABASE_URI=postgres://localhost:5555/payload_starter
# DATABSE_URI=postgres://127.0.0.1:5555/payload
# Used to encrypt JWT tokens
PAYLOAD_SECRET=7b28f25cefb0001378166051
# Used to format links and URLs
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
# Allow robots to index the site (optional)
NEXT_PUBLIC_IS_LIVE=
# Used to preview drafts
PAYLOAD_PUBLIC_DRAFT_SECRET=demo-draft-secret
NEXT_PRIVATE_DRAFT_SECRET=demo-draft-secret
# Used to revalidate static pages
REVALIDATION_KEY=demo-revalation-key
NEXT_PRIVATE_REVALIDATION_KEY=demo-revalation-key

# mailgun
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
```

## Styles

Full Calendar
```
  /* Full Calendar Styles */
  --fc-button-text-color: #fff;
  --fc-button-bg-color: gray;
  --fc-button-border-color: gray;
  --fc-button-hover-bg-color: #1e2b37;
  --fc-button-hover-border-color: #1a252f;
  --fc-button-active-bg-color: gray;
  --fc-button-active-border-color: gray;
  
  --fc-today-bg-color: #bc360a;
```

## Resources
- https://payloadcms.com/docs/rest-api/overview