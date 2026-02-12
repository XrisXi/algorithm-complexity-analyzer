# Algorithm Analyzer - Deployment Guide

## 🌐 Web Deployment

### Option 1: Simple Hosting (Recommended for Quick Start)

1. **Deploy to Netlify/Vercel/GitHub Pages**
   - Upload the `index.html` file to any of these platforms
   - The file is self-contained with all dependencies loaded via CDN
   - No build process required!

2. **Deploy to Web Server**
   - Upload `index.html` to your web server
   - Access via browser at your domain
   - Works with Apache, Nginx, or any static file server

### Option 2: React App Deployment

If you prefer to use the React component (`algorithm-analyzer.jsx`):

1. **Create React App**
```bash
npx create-react-app algorithm-analyzer
cd algorithm-analyzer
```

2. **Install Dependencies**
```bash
npm install lucide-react
```

3. **Replace src/App.js**
   - Copy the contents of `algorithm-analyzer.jsx` into `src/App.js`

4. **Configure Tailwind CSS**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

5. **Update tailwind.config.js**
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

6. **Update src/index.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

7. **Build and Deploy**
```bash
npm run build
# Deploy the 'build' folder to your hosting service
```

---

## 📱 Android Deployment (Optional)

There are multiple approaches to convert this web app to Android:

### Option 1: WebView Wrapper (Easiest)

Create a simple Android app that wraps the web application:

1. **Create Android Project**
   - Open Android Studio
   - Create New Project → Empty Activity
   - Name: AlgorithmAnalyzer

2. **Add Internet Permission**
   In `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

3. **Update MainActivity.java**
```java
package com.yourname.algorithm_analyzer;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        
        webView.setWebViewClient(new WebViewClient());
        
        // Option A: Load from local assets
        webView.loadUrl("file:///android_asset/index.html");
        
        // Option B: Load from online URL (if deployed)
        // webView.loadUrl("https://your-domain.com");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
```

4. **Update activity_main.xml**
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</RelativeLayout>
```

5. **Add HTML File to Assets**
   - Create `assets` folder in `app/src/main/`
   - Copy `index.html` into the `assets` folder

6. **Build APK**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)

### Option 2: React Native (More Native Feel)

1. **Initialize React Native Project**
```bash
npx react-native init AlgorithmAnalyzer
cd AlgorithmAnalyzer
```

2. **Install Dependencies**
```bash
npm install react-native-webview
```

3. **Update App.js**
```javascript
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <WebView 
        source={{ uri: 'https://your-deployed-url.com' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
};

export default App;
```

4. **Run on Android**
```bash
npx react-native run-android
```

### Option 3: Capacitor (Cross-Platform)

1. **Install Capacitor**
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

2. **Add Android Platform**
```bash
npm install @capacitor/android
npx cap add android
```

3. **Copy Web Assets**
```bash
npx cap copy
```

4. **Open in Android Studio**
```bash
npx cap open android
```

5. **Build APK from Android Studio**

---

## 🚀 Features

- **Real-time Analysis**: Instant complexity calculation
- **Step-by-Step Breakdown**: See how complexity is derived
- **Visual Feedback**: Color-coded complexity indicators
- **Performance Examples**: See operations count for different input sizes
- **Built-in Examples**: Quick-start with common algorithms
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Offline Capable**: (When deployed as Android app)

---

## 📊 Supported Algorithm Patterns

The analyzer detects:
- **Nested Loops**: O(n²), O(n³)
- **Single Loops**: O(n)
- **Binary Search**: O(log n)
- **Recursive Calls**: O(n) or O(2ⁿ)
- **Constant Time**: O(1)

---

## 🔧 Customization

### Modify Analysis Logic
Edit the `performAnalysis()` function to add:
- More pattern detection
- Advanced complexity calculations
- Language-specific optimizations
- Custom heuristics

### Styling
The app uses:
- **Tailwind CSS** for styling
- **JetBrains Mono** font for code
- **Cyberpunk-terminal aesthetic**
- Customizable color schemes

---

## 📝 Usage Tips

1. **Paste Your Code**: Copy any JavaScript function into the editor
2. **Click Analyze**: The app will detect loops, recursion, and patterns
3. **View Results**: See time/space complexity with explanations
4. **Check Examples**: Use the built-in examples to understand different complexities
5. **Performance Table**: Review how operations scale with input size

---

## 🛠️ Technical Stack

- **React 18**: UI framework
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Pure JavaScript**: Analysis engine (no external AI/API needed)

---

## 📦 File Structure

```
algorithm-analyzer/
├── index.html                 # Standalone web version
├── algorithm-analyzer.jsx     # React component
├── DEPLOYMENT.md             # This file
└── ANDROID_GUIDE.md          # Android-specific instructions
```

---

## 🔐 Security Notes

- The analyzer runs entirely client-side
- No code is sent to external servers
- All analysis happens in the browser
- Safe for analyzing proprietary algorithms

---

## 🆘 Troubleshooting

### Web Version
- **Script Not Loading**: Check CDN availability
- **Styling Issues**: Ensure Tailwind CSS CDN is accessible
- **Analysis Not Working**: Check browser console for errors

### Android Version
- **WebView Issues**: Enable JavaScript in WebSettings
- **Blank Screen**: Check if HTML file is in assets folder
- **Slow Performance**: Consider using hosted version instead of local

---

## 📄 License

Free to use and modify for personal and commercial projects.

---

## 🤝 Contributing

Feel free to:
- Add more algorithm patterns
- Improve analysis accuracy
- Enhance UI/UX
- Add support for more languages (Python, Java, etc.)

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify all dependencies are loaded
3. Test with provided examples first
4. Ensure JavaScript is enabled

---

## 🎯 Future Enhancements

Potential additions:
- Multi-language support (Python, Java, C++)
- Graph visualization of complexity
- Code optimization suggestions
- Export analysis reports
- Share analysis results
- Dark/light theme toggle
- More detailed step-by-step explanations

---

Enjoy analyzing algorithms! 🚀