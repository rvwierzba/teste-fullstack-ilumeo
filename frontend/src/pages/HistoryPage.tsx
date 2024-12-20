import React, { useEffect, useState } from 'react';

interface HistoryItem {
  date: string;
  totalHours: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  async function fetchHistory() {
    const res = await fetch('/api/shifts/history');
    const data = await res.json();
    setHistory(data);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{padding:'1rem'}}>
      <h1>Histórico</h1>
      <ul>
        {history.map(item => (
          <li key={item.date}>{item.date}: {item.totalHours.toFixed(2)} horas</li>
        ))}
      </ul>
    </div>
  );
}
