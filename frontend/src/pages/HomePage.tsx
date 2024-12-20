import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [todayHours, setTodayHours] = useState<number>(0);
  const [activeShift, setActiveShift] = useState<string | null>(null);

  async function fetchToday() {
    const res = await fetch('/api/shifts/today');
    const data = await res.json();
    // Calcular horas totais
    const total = data.shifts.reduce((acc: number, shift: any) => {
      const endTime = shift.endTime ? new Date(shift.endTime) : new Date();
      const startTime = new Date(shift.startTime);
      const diff = (endTime.getTime() - startTime.getTime()) / 3600000;
      return acc + diff;
    }, 0);
    setTodayHours(total);
  }

  async function fetchCurrent() {
    const res = await fetch('/api/shifts/current');
    const data = await res.json();
    setActiveShift(data.activeShiftId);
  }

  useEffect(() => {
    fetchToday();
    fetchCurrent();
    const interval = setInterval(() => {
      fetchToday();
      fetchCurrent();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  async function startShift() {
    await fetch('/api/shifts/start', {method: 'POST'});
    await fetchCurrent();
    await fetchToday();
  }

  async function endShift() {
    if (activeShift) {
      await fetch('/api/shifts/end', {method:'POST'});
      await fetchCurrent();
      await fetchToday();
    }
  }

  return (
    <div style={{padding:'1rem'}}>
      <h1>Horas trabalhadas hoje: {todayHours.toFixed(2)}</h1>
      {activeShift ? (
        <button onClick={endShift}>Finalizar Turno</button>
      ) : (
        <button onClick={startShift}>Iniciar Turno</button>
      )}
    </div>
  );
}
