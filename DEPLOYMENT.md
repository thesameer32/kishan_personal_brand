# 🚀 Deployment Guide for KishanBrand

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm deployment settings
   - Wait for deployment

5. **Your site will be live at:** `https://your-project-name.vercel.app`

### Option 2: Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Add environment variables:**
   - `NODE_ENV=production`
4. **Deploy automatically**

### Option 3: Render

1. **Go to [Render.com](https://render.com)**
2. **Create new Web Service**
3. **Connect your GitHub repository**
4. **Set build command:** `npm run build`
5. **Set start command:** `npm start`
6. **Add environment variables**

## Database Considerations

### For Production Database:

**Option A: Railway PostgreSQL (Recommended)**
1. Create PostgreSQL database on Railway
2. Get connection string
3. Add as environment variable: `DATABASE_URL`

**Option B: Neon Database**
1. Go to [neon.tech](https://neon.tech)
2. Create free PostgreSQL database
3. Get connection string
4. Add as environment variable: `DATABASE_URL`

**Option C: Keep SQLite (Simple)**
- SQLite file will be created automatically
- Works for small to medium scale

## Environment Variables

Add these to your deployment platform:

```env
NODE_ENV=production
DATABASE_URL=your_database_connection_string
PORT=3000
```

## Manual Deployment Steps

### 1. Prepare for Production

```bash
# Build the application
npm run build

# Test production build locally
npm start
```

### 2. Choose Your Platform

**Vercel (Frontend + API Routes):**
- Perfect for React apps
- Automatic deployments
- Free tier available

**Railway (Full Stack):**
- Great for Node.js apps
- Database support
- Easy environment management

**Render (Full Stack):**
- Good for full-stack apps
- Automatic deployments
- Free tier available

**Netlify (Frontend Only):**
- Great for static sites
- Would need separate backend

### 3. Database Migration

If using PostgreSQL in production:

```bash
# Update drizzle config for production
# Add your production DATABASE_URL
npm run db:push
```

## Post-Deployment

1. **Test your live site**
2. **Check admin panel functionality**
3. **Test workshop registration**
4. **Monitor logs for any issues**

## Troubleshooting

### Common Issues:

1. **Database Connection Errors:**
   - Check DATABASE_URL environment variable
   - Ensure database is accessible from deployment platform

2. **Build Errors:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **API Routes Not Working:**
   - Check vercel.json configuration
   - Ensure routes are properly configured

### Support:

- Check platform-specific documentation
- Review deployment logs
- Test locally with production build

## Performance Tips

1. **Enable caching** for static assets
2. **Use CDN** for better global performance
3. **Optimize images** before deployment
4. **Monitor performance** with platform tools

## Security Considerations

1. **Environment variables** for sensitive data
2. **HTTPS** enabled by default on most platforms
3. **Input validation** on all forms
4. **Rate limiting** for API endpoints

---

## Quick Start Commands

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Railway
railway up

# Check deployment status
vercel ls
```

Your KishanBrand website will be live and ready to accept workshop registrations! 🎉
