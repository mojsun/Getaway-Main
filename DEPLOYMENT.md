# Deploy GetAway to Heroku (step-by-step)

Follow these steps to put the app in a Git repo, deploy to Heroku, and add it to your portfolio.

---

## 1. Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it (e.g. `getaway` or `getaway-travel`).
4. Leave it **empty** (no README, no .gitignore).
5. Click **Create repository**.

---

## 2. Initialize Git and push your code

In your project folder (`getaway-main`), run:

```bash
cd /Users/aminforout/Desktop/Software/getaway-main

# Initialize git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: GetAway travel app"

# Add your GitHub repo as remote (replace YOUR_USERNAME and YOUR_REPO with yours)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

---

## 3. Set up MongoDB (required for Heroku)

Heroku does not run MongoDB. Use **MongoDB Atlas** (free tier):

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create an account.
2. Create a **free cluster** (e.g. M0).
3. Under **Database Access** → **Add New Database User**: create a user and password (save them).
4. Under **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) so Heroku can connect.
5. In the cluster, click **Connect** → **Connect your application**.
6. Copy the connection string (e.g. `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/getaway?retryWrites=true&w=majority`).
7. Replace `<password>` in that string with your real database user password. This is your **MONGODB_URI**.

---

## 4. Create the Heroku app and deploy

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) if you don’t have it.
2. Log in:

   ```bash
   heroku login
   ```

3. Create an app (from your project folder):

   ```bash
   heroku create
   ```

   Or with a name: `heroku create getaway-yourname`

4. Set the MongoDB URI (use your Atlas connection string from step 3):

   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/getaway?retryWrites=true&w=majority"
   ```

5. Optional but recommended for production:

   ```bash
   heroku config:set JWT_SECRET="your-random-secret-key-here"
   heroku config:set STRIPE_SECRET_KEY="sk_live_xxxx"   # if you use live Stripe
   ```

6. Deploy from your repo:

   ```bash
   git push heroku main
   ```

   If your branch is `master`: `git push heroku master`

7. Open the app:

   ```bash
   heroku open
   ```

8. (Optional) Seed the database once:

   ```bash
   heroku run npm run seed
   ```

---

## 5. If something goes wrong

- **App crash / “Application error”**  
  - Check logs: `heroku logs --tail`  
  - Ensure `MONGODB_URI` is set and correct (no typo in password).

- **Blank page or “Cannot GET /”**  
  - The build must run. Root `package.json` has `heroku-postbuild`: `npm run build`.  
  - Redeploy: `git push heroku main`.

- **GraphQL / API not working**  
  - The server was updated so the catch-all route does not override `/graphql`.  
  - Confirm you’re on the latest code and redeployed.

- **Stripe / payments**  
  - For production, set `STRIPE_SECRET_KEY` to your live key in Heroku Config Vars.

---

## 6. Add to your portfolio

1. In your portfolio, add a new project card/section.
2. **Title**: e.g. “GetAway – Travel package booking”.
3. **Live link**: `https://YOUR-APP-NAME.herokuapp.com` (from `heroku open` or Heroku dashboard).
4. **Repo link**: `https://github.com/YOUR_USERNAME/YOUR_REPO`.
5. **Tech stack**: React, Node.js, Express, GraphQL (Apollo), MongoDB, Stripe, JWT.
6. Short description: e.g. “Full-stack travel agency app: browse packages, auth, dashboard, Stripe checkout.”

---

## Summary checklist

- [ ] GitHub repo created and code pushed
- [ ] MongoDB Atlas cluster + user + connection string
- [ ] Heroku app created
- [ ] `MONGODB_URI` set on Heroku
- [ ] `git push heroku main` done
- [ ] App opens and loads; login/signup and packages work
- [ ] (Optional) `heroku run npm run seed`
- [ ] Portfolio updated with live link and repo

Your live URL will be: **https://YOUR-APP-NAME.herokuapp.com**
