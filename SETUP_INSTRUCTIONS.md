# Moving Your Grocery Ordering App from Figma Make to Visual Studio Code

## Step 1: Download the Code from Figma Make

1. In Figma Make, look for the **"Export"** or **"Download"** button (usually in the top-right corner)
2. Click it to download your project as a ZIP file
3. Save the ZIP file to your computer (e.g., `grocery-ordering-app.zip`)
4. Extract/unzip the file to a folder on your computer

## Step 2: Install Required Software

Before you begin, make sure you have these installed:

### 2.1 Install Node.js
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the prompts
4. Verify installation by opening Terminal/Command Prompt and typing:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers for both.

### 2.2 Install Visual Studio Code
1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Download VS Code for your operating system
3. Install and launch VS Code

## Step 3: Open the Project in VS Code

1. Open Visual Studio Code
2. Go to **File → Open Folder** (or **File → Open** on Mac)
3. Navigate to the extracted folder from Step 1
4. Click **Select Folder** to open the project

## Step 4: Install Project Dependencies

1. In VS Code, open the integrated terminal:
   - **Windows/Linux:** Press `Ctrl + `` (backtick) or go to **Terminal → New Terminal**
   - **Mac:** Press `Cmd + `` (backtick)

2. In the terminal, type the following command and press Enter:
   ```bash
   npm install
   ```
   
3. Wait for all dependencies to install (this may take 1-3 minutes)
   - You'll see a progress indicator and various package names being installed
   - When complete, you'll see a success message

## Step 5: Run the Development Server

1. In the same terminal, type:
   ```bash
   npm run dev
   ```

2. You should see output like:
   ```
   VITE v5.x.x  ready in xxx ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

3. Open your web browser and go to: **http://localhost:5173**
4. Your grocery ordering app should now be running!

## Step 6: Making Changes

1. In VS Code, navigate to files in the left sidebar:
   - Main app logic: `/src/app/App.tsx`
   - Components: `/src/app/components/`
   - Styles: `/src/styles/`

2. When you edit and save any file, the browser will automatically refresh with your changes (called "Hot Module Replacement")

3. To stop the development server, press `Ctrl + C` in the terminal

## Folder Structure

```
grocery-ordering-app/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main application component
│   │   └── components/
│   │       ├── Header.tsx        # Top navigation bar
│   │       ├── ProductCard.tsx   # Individual product display
│   │       ├── CartDrawer.tsx    # Shopping cart sidebar
│   │       ├── CheckoutForm.tsx  # Checkout page
│   │       └── ui/              # Reusable UI components
│   ├── styles/
│   │   ├── theme.css            # Design tokens and theme
│   │   └── fonts.css            # Font imports
│   └── main.tsx                 # Application entry point
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite build configuration
```

## Useful VS Code Extensions (Optional)

Install these extensions for a better development experience:

1. **ES7+ React/Redux/React-Native snippets** - Code snippets for React
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
3. **Prettier - Code formatter** - Automatic code formatting
4. **ESLint** - JavaScript/TypeScript linting

To install:
- Click the Extensions icon in VS Code (or press `Ctrl+Shift+X`)
- Search for each extension
- Click "Install"

## Common Commands

- **Start development server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Install a new package:** `npm install package-name`

## Troubleshooting

### Problem: `npm install` fails
**Solution:** Delete the `node_modules` folder and `package-lock.json` file, then run `npm install` again.

### Problem: Port 5173 is already in use
**Solution:** Either close the other application using that port, or the dev server will automatically try port 5174.

### Problem: Changes aren't showing up
**Solution:** 
1. Make sure you saved the file (`Ctrl+S` or `Cmd+S`)
2. Try refreshing your browser manually
3. Stop the server (`Ctrl+C`) and restart it (`npm run dev`)

### Problem: TypeScript errors in VS Code
**Solution:** These are often just warnings. If the app runs fine, you can ignore them or hover over the error for more details.

## Next Steps

Now that your app is running locally, you can:

1. **Customize the design** - Edit colors, spacing, and styles
2. **Add new features** - Create new components or functionality
3. **Add more products** - Update the PRODUCTS array in `App.tsx`
4. **Deploy to production** - Use services like Vercel, Netlify, or GitHub Pages

For deployment instructions, see: [DEPLOYMENT.md](./DEPLOYMENT.md) (if available)

## Getting Help

- **React Documentation:** [https://react.dev](https://react.dev)
- **Tailwind CSS Documentation:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Vite Documentation:** [https://vitejs.dev](https://vitejs.dev)

---

Happy coding! 🚀
