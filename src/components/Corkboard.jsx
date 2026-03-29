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
