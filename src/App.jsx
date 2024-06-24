import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showError, setShowError] = useState(false)

  const handleAdd = () => {
    if (count < 150) {
      const newCount = count + 1;
      const newHistory = [...history.slice(0, currentIndex + 1), newCount];
      setHistory(newHistory);
      setCount(newCount);
      setCurrentIndex(currentIndex + 1);
      // console.log(history, newCount)
    }
    else {
      if (showError === false) {
        setShowError(true)
        setTimeout(() => setShowError(false), 4000)
        toast.error("Number cannot be greater than 150", {
          position: 'bottom-center',
          theme: "dark",
          autoClose: 3000,
        })
      }
    }
  };
  
  const handleSubtract = () => {
    if (count > 0) {
      const newCount = count - 1;
      const newHistory = [...history.slice(0, currentIndex + 1), newCount];
      setHistory(newHistory);
      setCount(newCount);
      setCurrentIndex(currentIndex + 1);
    }
    else {
      if (showError === false) {
        setShowError(true)
        setTimeout(() => setShowError(false), 4000)
        toast.error("Number cannot be less than 0", {
          position: 'bottom-center',
          theme: "dark",
          autoClose: 3000,
        })
      }
    }
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCount(history[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCount(history[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <div className='buttons'>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleSubtract}>Subtract</button>

        <button onClick={handleUndo} disabled={currentIndex === 0}>Undo</button>
        <button onClick={handleRedo} disabled={currentIndex === history.length - 1}>Redo</button>
      </div>

      <div className='count'>Count: {count}</div>

      <div className='results'>
        <div className="progress-bar">
          <div className="progress1" style={{ width: `${(count / 150) * 100}%` }} ></div>
        </div>

        <p> {Math.round((count / 150) * 100)}% </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
