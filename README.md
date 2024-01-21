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