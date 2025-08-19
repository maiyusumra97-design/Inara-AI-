# Inara AI - Text to Video Generation Platform

A modern 3D interactive website for AI-powered video generation with 4K output capabilities.

## Features

- **AI Video Generation**: Create 4K videos from text descriptions
- **Multiple Categories**: 3D Animation, Realistic, Cartoon, Motion Graphics
- **AI Voice Synthesis**: 50+ natural voices with emotion control
- **Background Music**: AI-generated music that matches video mood
- **Flexible Duration**: 5 seconds to 50 minutes video length
- **Subscription Model**: ₹149/month for unlimited video generation
- **Dashboard**: Manage videos, track processing status
- **Modern UI**: Dark theme with neon accents and 3D animations

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Wouter for routing
- TanStack React Query for state management
- Tailwind CSS + shadcn/ui components
- 3D animations and effects

### Backend
- Express.js with TypeScript
- RESTful API architecture
- In-memory storage (easily replaceable with database)
- Drizzle ORM for database schema

## Installation & Deployment

### Prerequisites
- Node.js 20+
- npm or yarn

### Local Development

1. **Extract the ZIP file** to your desired directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:5000
   - Backend API: http://localhost:5000/api

### Production Deployment

#### Option 1: Traditional Hosting (VPS/Dedicated Server)

1. **Upload files** to your server
2. **Install Node.js 20+** on your server
3. **Install dependencies**:
   ```bash
   npm install --production
   ```
4. **Build the application**:
   ```bash
   npm run build
   ```
5. **Start the production server**:
   ```bash
   npm start
   ```
   Or use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server/index.js --name "inara-ai"
   ```

#### Option 2: Vercel/Netlify (Static + Serverless)

For **Vercel**:
1. Push code to GitHub repository
2. Connect to Vercel
3. Deploy automatically

For **Netlify**:
1. Build the client: `npm run build:client`
2. Deploy the `dist` folder
3. For API, consider using Netlify Functions

#### Option 3: Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## Environment Variables

Create a `.env` file for production:

```env
NODE_ENV=production
PORT=5000
# Add your database URL if using PostgreSQL
# DATABASE_URL=postgresql://user:password@localhost:5432/inara_ai
```

## Database Setup (Optional)

The application currently uses in-memory storage. To use PostgreSQL:

1. **Install PostgreSQL**
2. **Create database**: `createdb inara_ai`
3. **Update storage**: Replace `MemStorage` with database implementation
4. **Run migrations**: Use Drizzle migrations

## API Endpoints

### Users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user
- `POST /api/users/:id/subscription` - Update subscription

### Videos
- `POST /api/videos` - Create video
- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get video
- `GET /api/users/:userId/videos` - Get user videos

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments/:id` - Get payment
- `GET /api/users/:userId/payments` - Get user payments

## Customization

### Colors & Theme
Edit `client/src/index.css` to modify the color scheme:
- Primary colors: `--neon-blue`, `--neon-purple`, `--neon-pink`
- Dark theme colors: `--dark-bg`, `--dark-secondary`

### Video Categories
Update categories in `shared/schema.ts` and frontend components.

### Pricing
Modify pricing in `client/src/components/pricing-section.tsx`.

## Support

For technical support or customization:
- Review the code documentation
- Check the `replit.md` file for project details
- Ensure all dependencies are properly installed

## License

Copyright © 2024 Inara AI. All rights reserved.