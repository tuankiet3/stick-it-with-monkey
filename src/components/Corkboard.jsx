import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

const Corkboard = ({ notes, onBoardClick, onNoteClick, placingNote, updateNote }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const monthStr = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dateStr = now.getDate();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false }); // 24-hour style looks nice and clean

  return (
    <div 
      style={{ 
        flex: 1, 
        padding: '20px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div 
        className="corkboard hand-drawn"
        onClick={onBoardClick}
        style={{
          width: '80%',
          height: '80%',
          backgroundColor: 'var(--corkboard)',
          borderColor: 'var(--corkboard-border)',
          borderRadius: '12px',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.1)',
          position: 'relative',
          cursor: placingNote ? 'crosshair' : 'default',
          overflow: 'hidden'
        }}
      >
        {/* Digital Clock */}
        <div style={{ 
          position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', zIndex: 0,
          background: '#e8e8e8', border: '4px solid var(--stroke)', borderRadius: '8px',
          padding: '5px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.3)'
        }}>
          {/* Top pin offset */}
          <div style={{ position: 'absolute', top: '-12px', left: '15px', width: '12px', height: '12px', borderRadius: '50%', background: '#d34343', boxShadow: '0 2px 2px rgba(0,0,0,0.3)', border: '2px solid var(--stroke)' }} />
          <div style={{ position: 'absolute', top: '-12px', right: '15px', width: '12px', height: '12px', borderRadius: '50%', background: '#d34343', boxShadow: '0 2px 2px rgba(0,0,0,0.3)', border: '2px solid var(--stroke)' }} />
          
          <div style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '32px', color: 'var(--corkboard-border)', letterSpacing: '3px', textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}>
            {timeStr}
          </div>
        </div>

        <div style={{ position: 'absolute', top: '15%', right: '12%', zIndex: 0, transform: 'rotate(5deg)' }}>
          <div style={{ width: '130px', height: '150px', background: '#f8f8f8', padding: '10px', paddingBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '100%', height: '90px', background: '#a3bccc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '50px' }}>
              🌴
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px', fontFamily: 'var(--font-handwriting)', fontSize: '20px', color: '#333' }}>
              Bali '24
            </div>
          </div>
          {/* Red Pin */}
          <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', width: '14px', height: '14px', borderRadius: '50%', background: '#d34343', boxShadow: '0 2px 2px rgba(0,0,0,0.3)', border: '2px solid var(--stroke)' }} />
        </div>

        <div style={{ position: 'absolute', top: '45%', left: '8%', zIndex: 0, transform: 'rotate(-8deg)' }}>
          <div style={{ width: '90px', height: '90px', background: '#fff9c4', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#d34343', color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', padding: '2px 0', borderBottom: '2px solid var(--stroke)' }}>{monthStr}</div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '42px', fontWeight: 'bold', fontFamily: 'var(--font-body)', color: '#333' }}>{dateStr}</div>
          </div>
          {/* Tape */}
          <div style={{ position: 'absolute', top: '-12px', left: '25px', width: '50px', height: '22px', background: 'rgba(255,255,255,0.7)', transform: 'rotate(7deg)', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }} />
        </div>

        {/* Coffee Break Sticky */}
        <div style={{ position: 'absolute', top: '65%', right: '25%', zIndex: 0, transform: 'rotate(-4deg)' }}>
          <div style={{ width: '90px', height: '90px', background: '#ffb3ba', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ fontSize: '32px' }}>☕</span>
            <span style={{ fontFamily: 'var(--font-handwriting)', fontSize: '15px', color: '#553' }}>Break!</span>
          </div>
          <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: '#4287f5', boxShadow: '0 2px 2px rgba(0,0,0,0.3)', border: '2px solid var(--stroke)' }} />
        </div>

        {/* Postcard Stamp */}
        <div style={{ position: 'absolute', top: '25%', left: '25%', zIndex: 0, transform: 'rotate(-10deg)' }}>
          <div style={{ width: '60px', height: '70px', background: 'white', padding: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ border: '2px dashed #ccc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
              🗼
            </div>
          </div>
          <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: '#5bc0be', boxShadow: '0 2px 2px rgba(0,0,0,0.3)', border: '2px solid var(--stroke)' }} />
        </div>

        {/* Movie Ticket */}
        <div style={{ position: 'absolute', top: '75%', left: '15%', zIndex: 0, transform: 'rotate(12deg)' }}>
          <div style={{ width: '120px', height: '40px', background: '#ffdfba', border: '2px dashed #e6c8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', color: '#d34343' }}>ADMIT ONE</span>
          </div>
          <div style={{ position: 'absolute', top: '-8px', left: '20px', width: '30px', height: '15px', background: 'rgba(255,255,255,0.7)', transform: 'rotate(-5deg)', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }} />
        </div>


        {/* Render pinned notes */}
        {notes.map(note => (
          <NoteItem 
            key={note.id} 
            note={note} 
            onClick={() => onNoteClick(note.id)} 
            updateNote={updateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Corkboard;
