# D-TECH NEWZ - Configuration Guide

This guide will help you configure all the integrations for your D-TECH NEWZ website.

## 📋 Table of Contents

1. [Google AdSense Setup](#1-google-adsense-setup)
2. [Giscus Comments Setup](#2-giscus-comments-setup)
3. [Cloud Visitor Counter Setup](#3-cloud-visitor-counter-setup)
4. [Testing Your Setup](#4-testing-your-setup)

---

## 1. Google AdSense Setup

### Step 1: Create AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Click "Get Started" and sign in with your Google account
3. Fill in your website URL and other required information
4. Accept the terms and conditions

### Step 2: Add AdSense Code to Your Site

1. In AdSense dashboard, go to **Ads** → **Overview**
2. Copy your AdSense code (it will look like this):
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        crossorigin="anonymous"></script>
   ```
3. Your publisher ID is the part after `ca-pub-` (e.g., `ca-pub-1234567890123456`)

### Step 3: Update Your HTML Files

Replace `` in these files:
- `index.html`
- `article.html`
- `about.html`
- `privacy.html`

**Find and replace:**
```html
<!-- BEFORE -->
client=ca-pub-YOUR_PUBLISHER_ID

<!-- AFTER -->
client=ca-pub-1234567890123456
```

### Step 4: Create Ad Units

1. In AdSense, go to **Ads** → **By ad unit**
2. Click **+ New ad unit**
3. Choose **Display ads**
4. Name your ad unit (e.g., "Homepage Top Banner")
5. Choose ad size: **Responsive**
6. Click **Create**
7. Copy the ad unit code

### Step 5: Update Ad Slots

You'll get code like this:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1234567890123456"
     data-ad-slot="9876543210"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

The `data-ad-slot` value is your slot ID. Replace `YOUR_AD_SLOT_ID` with this value.

**Recommended Ad Units:**
- Homepage Top Banner
- Homepage Middle Banner
- Article Top Banner
- Article Middle Banner
- About/Privacy Bottom Banner

### Step 6: Verify Your Site

1. Deploy your site to your domain
2. In AdSense, go to **Sites**
3. Click **Add site** and enter your domain
4. AdSense will check for the code on your site
5. Wait for approval (can take 1-2 weeks)

---

## 2. Giscus Comments Setup

### Step 1: Prepare Your GitHub Repository

1. Make sure your repository is **public**
2. Go to your repository settings
3. Scroll down to **Features**
4. Check the box for **Discussions**

### Step 2: Configure Giscus

1. Go to [giscus.app](https://giscus.app/)
2. Enter your repository in the format: `username/repository`
   - Example: `dinutechnews/dinutechnews.github.io`
3. The page will verify your repository

### Step 3: Choose Settings

**Page ↔️ Discussions Mapping:**
- Select: `pathname` (recommended)

**Discussion Category:**
- Select: `General` or create a custom category

**Features:**
- ✅ Enable reactions
- ✅ Emit discussion metadata
- Choose: `Place the comment box above the comments`

**Theme:**
- Select: `Light` (matches the flying theme)

### Step 4: Copy Configuration

Giscus will generate a script tag like this:
```html
<script src="https://giscus.app/client.js"
        data-repo="username/repository"
        data-repo-id="R_kgDOAbCdEf"
        data-category="General"
        data-category-id="DIC_kwDOAbCdEf4BcDef"
        ...
</script>
```

### Step 5: Update script.js

Open `script.js` and find the `initGiscusComments()` function.

Replace these values:
```javascript
script.setAttribute('data-repo', 'YOUR_USERNAME/YOUR_REPO');
// Replace with: 'dinutechnews/dinutechnews.github.io'

script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
// Replace with: 'R_kgDOAbCdEf' (from giscus)

script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
// Replace with: 'DIC_kwDOAbCdEf4BcDef' (from giscus)
```

---

## 3. Cloud Visitor Counter Setup

### Option A: JSONBin.io (Recommended)

#### Step 1: Create Account

1. Go to [JSONBin.io](https://jsonbin.io/)
2. Click **Sign Up** (free tier available)
3. Verify your email

#### Step 2: Create a Bin

1. Log in to JSONBin.io
2. Click **Create Bin**
3. Enter this initial data:
   ```json
   {
     "count": 0
   }
   ```
4. Name it: `dtechnews-visitor-counter`
5. Click **Create**

#### Step 3: Get Your Credentials

1. After creating the bin, copy the **Bin ID** (looks like: `65a1b2c3d4e5f6g7h8i9j0k1`)
2. Go to **API Keys** in the dashboard
3. Copy your **Master Key** (looks like: `$2a$10$abcdefghijklmnopqrstuvwxyz123456789`)

#### Step 4: Update script.js

Open `script.js` and find `VISITOR_COUNTER_CONFIG`:

```javascript
const VISITOR_COUNTER_CONFIG = {
  apiKey: '$2a$10$YOUR_API_KEY_HERE',
  // Replace with your Master Key
  
  binId: 'YOUR_BIN_ID_HERE',
  // Replace with your Bin ID
  
  apiUrl: 'https://api.jsonbin.io/v3/b/'
  // Leave this as is
};
```

**Example:**
```javascript
const VISITOR_COUNTER_CONFIG = {
  apiKey: '$2a$10$abcdefghijklmnopqrstuvwxyz123456789',
  binId: '65a1b2c3d4e5f6g7h8i9j0k1',
  apiUrl: 'https://api.jsonbin.io/v3/b/'
};
```

### Option B: LocalStorage (Fallback)

If you don't configure JSONBin.io, the counter will automatically use localStorage:
- Counts visitors per browser
- Data is stored locally
- No cloud synchronization
- No configuration needed

**Note:** This is already implemented as a fallback, so the counter will work even without JSONBin.io.

---

## 4. Testing Your Setup

### Test AdSense

1. Open your site in a browser
2. Open Developer Tools (F12)
3. Check Console for AdSense errors
4. Look for ad containers on the page
5. **Note:** Ads may show as blank until approved

**Common Issues:**
- Blank ad spaces = Normal before approval
- Console errors = Check publisher ID and slot IDs
- No ad containers = Check HTML structure

### Test Giscus

1. Open any page with comments section
2. You should see the Giscus comment box
3. Try posting a test comment (requires GitHub login)
4. Check your repository's Discussions tab

**Common Issues:**
- "Error: Not Found" = Check repository name
- No comment box = Check repo-id and category-id
- Can't post = Make sure Discussions are enabled

### Test Visitor Counter

1. Open your site in a browser
2. Check the visitor counter displays a number
3. Open Developer Tools → Console
4. Look for any errors related to visitor counter
5. Refresh the page - count should not increase (same visitor)
6. Clear localStorage and refresh - count should increase

**Common Issues:**
- Shows "---" = Check API configuration or network
- Console errors = Check API key and Bin ID
- Count not increasing = Check localStorage or API

### Test Responsiveness

1. Open your site
2. Press F12 to open Developer Tools
3. Click the device toolbar icon (or Ctrl+Shift+M)
4. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1200px+

---

## 🎯 Quick Checklist

Before going live, verify:

- [ ] AdSense publisher ID updated in all HTML files
- [ ] AdSense ad slot IDs updated in all HTML files
- [ ] Giscus repository configured correctly
- [ ] Giscus repo-id and category-id updated
- [ ] Visitor counter API configured (or using localStorage)
- [ ] All pages load without console errors
- [ ] Comments section appears on all pages
- [ ] Visitor counter displays a number
- [ ] Site is responsive on mobile
- [ ] All links work correctly
- [ ] Privacy policy mentions all services used

---

## 🆘 Troubleshooting

### AdSense Not Showing

1. Check if your site is approved
2. Verify publisher ID is correct
3. Check browser ad blockers
4. Wait 24-48 hours after adding code

### Giscus Not Loading

1. Verify repository is public
2. Check Discussions are enabled
3. Verify repo-id and category-id
4. Check browser console for errors

### Visitor Counter Not Working

1. Check API credentials
2. Verify Bin ID is correct
3. Check network tab for API calls
4. Try localStorage fallback

---

## 📚 Additional Resources

- [Google AdSense Help](https://support.google.com/adsense/)
- [Giscus Documentation](https://github.com/giscus/giscus)
- [JSONBin.io Docs](https://jsonbin.io/api-reference)

---

**Need Help?** Open an issue on GitHub or use the comment system on your live site!
