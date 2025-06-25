import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setMessage(res.data))
      .catch(() => setMessage('Error contacting backend'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>RA Dashboard - Hello World</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
