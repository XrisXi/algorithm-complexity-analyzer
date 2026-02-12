# 🚀 Algorithm Analyzer

A modern, real-time algorithm complexity analyzer with a distinctive cyberpunk-terminal aesthetic. Analyze any algorithm's time and space complexity instantly with step-by-step calculations.

![Algorithm Analyzer](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- ⚡ **Real-time Analysis** - Instant complexity calculation as you type
- 📊 **Visual Breakdown** - Color-coded complexity indicators
- 🔢 **Step-by-Step Calculations** - See exactly how complexity is derived
- 📈 **Performance Examples** - View operations count for different input sizes
- 🎯 **Built-in Examples** - Quick-start with Bubble Sort, Binary Search, and Fibonacci
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Distinctive Design** - Cyberpunk terminal aesthetic with animated backgrounds
- 🌐 **Cross-Platform** - Deploy as web app or Android application

## 🎯 What It Does

The Algorithm Analyzer helps you understand algorithm performance by:

1. **Detecting Patterns**: Automatically identifies loops, recursion, and common algorithm patterns
2. **Calculating Complexity**: Determines Big O notation for time and space complexity
3. **Breaking Down Steps**: Shows the mathematical calculation behind the complexity
4. **Providing Examples**: Displays actual operation counts for various input sizes
5. **Visual Feedback**: Uses color gradients to indicate complexity severity

### Supported Complexity Patterns

| Complexity | Pattern Detected | Example |
|------------|------------------|---------|
| O(1) | No loops | Array access, variable assignment |
| O(log n) | Binary search pattern | Divide and conquer algorithms |
| O(n) | Single loop | Array traversal, linear search |
| O(n log n) | Advanced sorting | Merge sort, heap sort |
| O(n²) | Nested loops (2 levels) | Bubble sort, selection sort |
| O(n³) | Triple nested loops | Matrix multiplication |
| O(2ⁿ) | Multiple recursive calls | Fibonacci (naive), subset generation |

## 🖥️ Screenshots & Interface

### Editor Tab
- Clean code input with syntax-friendly monospace font
- Quick example buttons for common algorithms
- Large analyze button with loading animation

### Results Tab
- Prominent complexity cards with gradient colors
- Detailed analysis breakdown
- Code metrics (lines, loops, recursion)
- Step-by-step calculation breakdown
- Performance examples table

### Examples Tab
- Reference guide for common complexity classes
- Real-world algorithm examples
- Clear explanations

## 🚀 Quick Start

### Web Deployment (Easiest)

1. **Download** the `index.html` file
2. **Open** in any modern browser
3. **Start analyzing** - no installation needed!

Or deploy to hosting:
```bash
# Upload to Netlify, Vercel, GitHub Pages, or any static host
# Just upload the single index.html file
```

### Local Development (React)

```bash
# Clone or download the repository
npm create vite@latest algorithm-analyzer -- --template react
cd algorithm-analyzer

# Install dependencies
npm install lucide-react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Copy the React component
# Replace src/App.jsx with algorithm-analyzer.jsx

# Run development server
npm run dev
```

## 📱 Android Deployment (Optional)

### Quick Method: WebView Wrapper

1. Create Android Studio project
2. Add `index.html` to assets folder
3. Configure WebView in MainActivity
4. Build APK

**See [ANDROID_GUIDE.md](ANDROID_GUIDE.md) for complete instructions**

## 📁 Project Structure

```
algorithm-analyzer/
├── index.html              # Standalone web version (ready to deploy)
├── algorithm-analyzer.jsx  # React component version
├── README.md              # This file
├── DEPLOYMENT.md          # Web & Android deployment guide
└── ANDROID_GUIDE.md       # Detailed Android implementation
```

## 🎨 Design Philosophy

The app features a **cyberpunk-terminal aesthetic** with:

- **Typography**: JetBrains Mono - perfect for code display
- **Colors**: Emerald/cyan gradient scheme (#00ff96 → #00d4ff)
- **Animations**: Subtle grid movement and scanline effects
- **Layout**: Clean, card-based interface with glowing borders
- **Feedback**: Color-coded complexity indicators (green=fast, red=slow)

This design intentionally avoids generic AI aesthetics and creates a memorable, distinctive interface.

## 🔧 How It Works

### Analysis Engine

The analyzer uses pattern matching to detect:

1. **Loop Detection**
   ```javascript
   const forLoops = (code.match(/for\s*\(/g) || []).length;
   const whileLoops = (code.match(/while\s*\(/g) || []).length;
   ```

2. **Recursion Detection**
   ```javascript
   // Finds function name and counts self-calls
   const functionName = code.match(/function\s+(\w+)/);
   const calls = code.match(new RegExp(name + '\\s*\\(', 'g'));
   ```

3. **Binary Search Pattern**
   ```javascript
   // Detects divide-and-conquer indicators
   if (code.includes('mid') && (code.includes('left') || code.includes('right')))
   ```

### Complexity Calculation

The engine assigns complexity based on detected patterns:
- Nested loops → Multiply complexities (n × n = n²)
- Sequential operations → Add complexities (n + n ≈ n)
- Recursive calls → Exponential or linear based on call count

### Performance Examples

For each complexity, the app calculates operations for input sizes: 10, 100, 1000, 10000

Example for O(n²):
- n=10 → 100 operations
- n=100 → 10,000 operations
- n=1000 → 1,000,000 operations
- n=10000 → 100,000,000 operations

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework for component-based architecture |
| **Tailwind CSS** | Utility-first styling for rapid development |
| **Lucide React** | Modern icon library |
| **JetBrains Mono** | Monospace font optimized for code |
| **Vanilla JS** | Analysis engine (no external dependencies) |

## 📊 Usage Example

```javascript
// Paste this into the analyzer:
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Results:
// Time Complexity: O(n²)
// Space Complexity: O(1)
// Explanation: Detected nested loops: 2 levels of iteration
```

## 🎯 Use Cases

Perfect for:
- **Students** learning algorithm complexity
- **Interview Prep** - quickly analyze coding challenge solutions
- **Developers** - validate algorithm efficiency
- **Teachers** - demonstrate Big O notation
- **Code Review** - assess performance implications

## 🔐 Privacy & Security

- ✅ **100% Client-Side** - No code sent to servers
- ✅ **No Data Collection** - Complete privacy
- ✅ **No External APIs** - Works offline (when deployed locally)
- ✅ **Safe for Proprietary Code** - Analyze confidential algorithms

## 🚧 Limitations

Current version detects common patterns but may not catch:
- Complex recursive patterns with memoization
- Language-specific optimizations
- Amortized complexity
- Best/average/worst case distinctions
- Space complexity from implicit data structures

**Future versions may include enhanced pattern detection and multi-language support.**

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- [ ] Add support for Python, Java, C++ syntax
- [ ] Detect more complex patterns (dynamic programming, etc.)
- [ ] Add graph visualization of complexity growth
- [ ] Include code optimization suggestions
- [ ] Export analysis as PDF/image
- [ ] Add best/average/worst case analysis
- [ ] Support for amortized complexity

## 📝 License

MIT License - Free to use and modify for personal and commercial projects.

## 🙏 Acknowledgments

- Design inspired by terminal UIs and cyberpunk aesthetics
- Built with modern web technologies
- Optimized for both learning and professional use

## 📞 Support

- Check browser console for errors
- Verify JavaScript is enabled
- Test with provided examples first
- Ensure all CDN resources load properly

## 🎓 Educational Value

This tool helps students understand:
- **Big O Notation** fundamentals
- **Time vs Space Complexity** tradeoffs
- **Algorithm Efficiency** impact
- **Real-world Performance** scaling

## 🌟 Future Roadmap

- [ ] Multi-language support (Python, Java, C++)
- [ ] Advanced pattern detection
- [ ] Visualization graphs
- [ ] Code optimization hints
- [ ] Comparison mode (compare 2 algorithms)
- [ ] Dark/light theme toggle
- [ ] Save/share analysis results
- [ ] Browser extension version

---

**Built with ❤️ for developers and students**

Analyze smarter, not harder! 🚀

---

## Quick Links

- [Deployment Guide](DEPLOYMENT.md)
- [Android Guide](ANDROID_GUIDE.md)
- [Live Demo](#) (Deploy index.html to see it in action)

---

**Star ⭐ this project if you find it useful!**