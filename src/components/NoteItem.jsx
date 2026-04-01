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

  // Compute physical pixel coordinates from stored percentages
  let boardWidth = typeof window !== 'undefined' ? window.innerWidth * 0.8 : 800;
  let boardHeight = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600;
  if (typeof window !== 'undefined' && window.innerWidth <= 850) {
    boardWidth = window.innerWidth * 0.95;
    boardHeight = window.innerHeight * 0.95;
  }
  
  // Legacy support for absolute pixel notes
  const safeX = typeof window !== 'undefined' ? Math.min(Math.max(0, note.x || 0), window.innerWidth - 80) : note.x || 0;
  const safeY = typeof window !== 'undefined' ? Math.min(Math.max(0, note.y || 0), window.innerHeight * 0.7 - 80) : note.y || 0;

  const calculatedX = note.xp !== undefined ? (note.xp / 100) * boardWidth : safeX;
  const calculatedY = note.yp !== undefined ? (note.yp / 100) * boardHeight : safeY;

  return (
    <motion.button 
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={(e, info) => {
        setTimeout(() => { isDragging.current = false; }, 100);
        
        let boardW = window.innerWidth * 0.8;
        let boardH = window.innerHeight * 0.8;
        if (window.innerWidth <= 850) {
          boardW = window.innerWidth * 0.95;
          boardH = window.innerHeight * 0.95;
        }

        const newPx = calculatedX + info.offset.x;
        const newPy = calculatedY + info.offset.y;

        if (updateNote) {
          updateNote(note.id, { 
            xp: (newPx / boardW) * 100,
            yp: (newPy / boardH) * 100,
            x: undefined, y: undefined // migration 
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
      initial={{ scale: 0, x: calculatedX, y: calculatedY }}
      animate={{ scale: 1, x: calculatedX, y: calculatedY, rotate: note.id.charCodeAt(0) % 10 - 5 }}
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
