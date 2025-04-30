import { useToast } from "./hooks/useAnimatedToaster";

function App() {
  const { showToast } = useToast();

  return (
    <div className="p-10">
      <button
        onClick={() => showToast("Hello from Animated Toast!")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Toast
      </button>
    </div>
  );
}

export default App;
