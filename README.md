# 🚀 react-animated-toast

A lightweight and customizable animated toast notification system for React, built with Framer Motion and confetti magic 🎉.

## 📦 Installation

Install the package using npm or yarn:

```bash
npm install react-animated-toast
# or
yarn add react-animated-toast




⚡ Quick Start
1. Wrap your app with AnimatedToaster
tsx
Copy
Edit
import { AnimatedToaster } from "react-animated-toast";

function App() {
  return (
    <AnimatedToaster position="top-right" reverseOrder={false}>
      <MainComponent />
    </AnimatedToaster>
  );
}






2. Use the useToast hook in any child component
tsx
Copy
Edit
import { useToast } from "react-animated-toast";

function MainComponent() {
  const { showToast } = useToast();

  return (
    <button
      onClick={() => showToast.success("Hello from Animated Toast!")}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Show Toast
    </button>
  );
}



✅ Toast Types
You can display the following types of toasts:

tsx
Copy
Edit
showToast.success("Success message");
showToast.error("Error message");
showToast.warning("Warning message");