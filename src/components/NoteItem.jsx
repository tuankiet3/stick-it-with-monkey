import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const NoteItem = ({ note, onClick, updateNote }) => {
  const isDragging = useRef(false);
  // Styles based on note type
  const getNoteStyle = () => {
    switch(note.type) {
      case 'checklist':
        return { backgroundColor: 'var(--note-yellow)', borderColor: '#cca530' };
      case 'textBlue':
        return { backgroundColor: 'var(--note-blue)', borderColor: '#a3bccc' };
      case 'textGreen':
        return { backgroundColor: 'var(--note-green)', borderColor: '#b0cc95' };
      case 'textCream':
        return { backgroundColor: 'var(--note-cream)', borderColor: '#d9c5a1' };
      default:
        return { backgroundColor: 'var(--note-yellow)', borderColor: '#cca530' };
    }
  };

  const getPinColor = () => {
    switch(note.type) {
      case 'checklist': return '#d34343'; // Red
      case 'textBlue': return '#c2d2e3'; // Light Blue or matching
      case 'textGreen': return '#b0cc95';
      case 'textCream': return '#d9c5a1';
      default: return '#555';
    }
  };

  // Prevent notes from rendering off-screen when jumping from desktop to mobile
  const safeX = typeof window !== 'undefined' ? Math.min(Math.max(0, note.x || 0), window.innerWidth - 80) : note.x || 0;
  const safeY = typeof window !== 'undefined' ? Math.min(Math.max(0, note.y || 0), window.innerHeight * 0.7 - 80) : note.y || 0;

  return (
    <motion.button 
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={(e, info) => {
        setTimeout(() => { isDragging.current = false; }, 100);
        if (updateNote) {
          updateNote(note.id, { 
            x: (note.x || 0) + info.offset.x, 
            y: (note.y || 0) + info.offset.y 
          });
        }
      }}
      onClick={(e) => {
        if (!isDragging.current) {
          e.stopPropagation();
          onClick();
        }
      }}
      drag
      initial={{ scale: 0, x: safeX, y: safeY }}
      animate={{ scale: 1, x: safeX, y: safeY, rotate: note.id.charCodeAt(0) % 10 - 5 }}
      whileDrag={{ scale: 1.1, zIndex: 100 }}
      className={`hand-drawn shadow`}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '60px',
        height: '70px',
        ...getNoteStyle(),
        zIndex: note.zIndex,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      {/* Pin */}
      <div style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: getPinColor(),
        border: '2px solid var(--stroke)',
        position: 'absolute',
        top: '-6px',
        boxShadow: '0 2px 2px rgba(0,0,0,0.3)'
      }} />
      
      {/* Tiny mock content */}
      <div style={{ marginTop: '15px', width: '80%', opacity: 0.5 }}>
        <div style={{ height: '4px', background: 'var(--stroke)', borderRadius: '2px', marginBottom: '4px' }}></div>
        <div style={{ height: '4px', background: 'var(--stroke)', borderRadius: '2px', marginBottom: '4px', width: '80%' }}></div>
        <div style={{ height: '4px', background: 'var(--stroke)', borderRadius: '2px', width: '60%' }}></div>
      </div>
    </motion.button>
  );
};

export default NoteItem;
