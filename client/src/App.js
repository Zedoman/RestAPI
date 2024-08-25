import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = data.split(',').map(item => item.trim());
    console.log('Sending data:', formattedData); // Log the data being sent
    try {
        const res = await axios.post('https://restapi-wobh.onrender.com/bfhl', {
            data: formattedData
        });
        console.log('Response from server:', res.data); // Log the response from server
        setResponse(res.data);
    } catch (err) {
        console.error('Error posting data:', err);
        setResponse({ error: 'An error occurred' });
    }
};


  const handleGet = async () => {
    try {
      const res = await axios.get('https://restapi-wobh.onrender.com/bfhl');
      setResponse(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setResponse({ error: 'An error occurred' });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>BFHL API Frontend</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Data (comma-separated):</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Data (POST)</button>
      </form>

      {/* <button onClick={handleGet} style={{ marginTop: '20px' }}>Get Operation Code (GET)</button> */}

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
