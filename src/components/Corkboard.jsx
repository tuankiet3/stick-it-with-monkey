import React from 'react';
import NoteItem from './NoteItem';

const Corkboard = ({ notes, onBoardClick, onNoteClick, placingNote, updateNote }) => {
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
        {/* Decorations layer (zIndex 0) */}
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
            <div style={{ background: '#d34343', color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', padding: '2px 0', borderBottom: '2px solid var(--stroke)' }}>MAR</div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '42px', fontWeight: 'bold', fontFamily: 'var(--font-body)', color: '#333' }}>28</div>
          </div>
          {/* Tape */}
          <div style={{ position: 'absolute', top: '-12px', left: '25px', width: '50px', height: '22px', background: 'rgba(255,255,255,0.7)', transform: 'rotate(7deg)', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }} />
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
