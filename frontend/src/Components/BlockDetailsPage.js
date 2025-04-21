import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlockDetailsPage = () => {
  const { blockName } = useParams();
  const [details, setDetails] = useState(null);
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchBlockDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/locations/${encodeURIComponent(blockName)}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching block details:', error);
      }
    };

    fetchBlockDetails();
  }, [blockName]);

  const handleIssueSubmit = () => {
    if (issue.trim()) {
      console.log(`Issue submitted for ${blockName}: ${issue}`);
      setSubmitted(true);
      setIssue('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  if (!details) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p style={styles.loadingText}>Loading details for <strong>{blockName}</strong>...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>{details.name}</h1>

      <div style={styles.card}>
        <Detail label="Type" value={details.type} />
        <Detail label="Description" value={details.description} />
        <Detail label="Capacity" value={details.capacity} />
        <Detail label="Has AC" value={details.hasAC ? 'Yes' : 'No'} />
        <Detail label="Accessible" value={details.accessible ? 'Yes' : 'No'} />
        <Detail label="Features" value={details.features?.join(', ') || 'N/A'} />
        <Detail
  label="Floors"
  value={
    typeof details.floors === 'string' || typeof details.floors === 'number'
      ? `${details.floors} floors`
      : Array.isArray(details.floors)
        ? details.floors.map(f => `Floor ${f.floor}: ${f.features?.join(', ')}`).join(' | ')
        : 'N/A'
  }
/>


        <Detail
          label="Opening Hours"
          value={
            details.openingHours
              ? Object.entries(details.openingHours)
                  .map(([day, time]) => `${day}: ${time}`)
                  .join(', ')
              : 'N/A'
          }
        />
      </div>

      <div style={styles.issueSection}>
        <h2 style={styles.issueTitle}>📬 Raise an Issue</h2>
        <textarea
          placeholder="Describe the issue here..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleIssueSubmit} style={styles.button}>
          Submit
        </button>
        {submitted && <p style={styles.success}>✅ Issue submitted successfully!</p>}
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div style={styles.detailRow}>
    <span style={styles.label}>{label}:</span>
    <span style={styles.value}>{value}</span>
  </div>
);
const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '30px 20px',
    background: 'linear-gradient(to bottom right, #e8f0ff, #ffffff)',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.8rem',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#2c3e50',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto 40px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
  },
  label: {
    fontWeight: '600',
    color: '#34495e',
  },
  value: {
    color: '#555',
    textAlign: 'right',
    maxWidth: '60%',
  },
  issueSection: {
    backgroundColor: '#fefefe',
    border: '1px solid #dce1ea',
    borderRadius: '14px',
    padding: '25px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  issueTitle: {
    fontSize: '1.6rem',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    resize: 'vertical',
    marginBottom: '15px',
    outlineColor: '#3498db',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px 25px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  success: {
    marginTop: '10px',
    color: '#27ae60',
    fontWeight: '500',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  loadingText: {
    fontSize: '1.3rem',
    marginTop: '15px',
    color: '#666',
  },
  loader: {
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
};

export default BlockDetailsPage;
