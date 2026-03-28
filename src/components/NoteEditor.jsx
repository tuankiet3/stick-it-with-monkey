import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Pin, Trash2 } from 'lucide-react';

const NoteEditor = ({ note, updateNote, pinNote, closeNote, deleteNote }) => {
  const [tool, setTool] = useState('none'); // 'none', 'highlight', 'sticker'

  const handleUpdate = (newProps) => {
    updateNote(note.id, newProps);
  };

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

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(247, 232, 207, 0.5)',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(2px)'
    }}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="hand-drawn shadow"
        style={{
          width: '350px',
          height: '450px',
          ...getNoteStyle(),
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button X */}
        <button 
          onClick={closeNote}
          style={{ position: 'absolute', top: '10px', left: '15px', fontSize: '24px', fontWeight: 'bold' }}
        >
          ✕
        </button>
        
        {/* Delete Button */}
        <button 
          onClick={() => deleteNote(note.id)}
          style={{ position: 'absolute', top: '15px', right: '45px', color: '#d34343' }}
        >
          <Trash2 size={24} />
        </button>

        {/* Pin Button */}
        <button 
          onClick={() => pinNote(note.id)}
          style={{ position: 'absolute', bottom: '20px', right: '20px' }}
        >
          <div style={{
            width: '40px', height: '40px',
            backgroundColor: 'var(--bg-color)',
            border: '3px solid var(--stroke)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '2px 2px 0 var(--stroke)'
          }}>
             <Pin size={20} fill="#d34343" stroke="var(--stroke)" />
          </div>
        </button>

        {/* Content Area */}
        <div style={{ flex: 1, marginTop: '20px', overflowY: 'auto' }}>
          {note.type === 'checklist' ? (
            <ChecklistContent note={note} updateNote={handleUpdate} tool={tool} />
          ) : (
            <TextContent note={note} updateNote={handleUpdate} tool={tool} />
          )}
        </div>

        {/* Tool Bar */}
        <div style={{
          position: 'absolute',
          bottom: '-25px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px'
        }}>
          {note.type === 'checklist' && (
            <button 
              onClick={() => setTool(tool === 'highlight' ? 'none' : 'highlight')}
              className="hand-drawn"
              style={{
                width: '40px', height: '40px',
                backgroundColor: tool === 'highlight' ? '#d34343' : 'white',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ width: '20px', height: '10px', background: tool === 'highlight' ? 'white' : '#d34343', borderRadius: '4px' }}></div>
            </button>
          )}

          {note.type !== 'checklist' && (
            <div style={{ display: 'flex', gap: '5px', padding: '5px', background: 'white', borderRadius: '20px', border: '3px solid var(--stroke)' }}>
               {['⭐', '❤️', '💡', '🔥'].map(sticker => (
                 <button 
                   key={sticker}
                   onClick={() => handleUpdate({ content: note.content + ' ' + sticker })}
                   style={{ fontSize: '20px', padding: '0 5px' }}
                 >
                   {sticker}
                 </button>
               ))}
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

const ChecklistContent = ({ note, updateNote, tool }) => {
  const [newItem, setNewItem] = useState('');

  const handleToggle = (id) => {
    if (tool === 'highlight') {
      const updated = note.content.map(item => item.id === id ? { ...item, highlighted: !item.highlighted } : item);
      updateNote({ content: updated });
    } else {
      const updated = note.content.map(item => item.id === id ? { ...item, done: !item.done } : item);
      updateNote({ content: updated });
    }
  };

  const handleAdd = (e) => {
    if (e.key === 'Enter' && newItem.trim() !== '') {
      const updated = [...note.content, { id: Math.random().toString(), text: newItem.trim(), done: false }];
      updateNote({ content: updated });
      setNewItem('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {note.content.filter(item => item.text).map((item) => (
        <div 
          key={item.id} 
          onClick={() => handleToggle(item.id)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            fontSize: '22px', 
            fontFamily: 'var(--font-handwriting)',
            cursor: 'pointer',
            color: item.highlighted ? '#d34343' : 'var(--stroke)'
          }}
        >
          <div style={{
            width: '24px', height: '24px',
            border: '3px solid var(--stroke)',
            borderRadius: '4px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backgroundColor: item.done ? '#b0cc95' : 'transparent'
          }}>
            {item.done && <CheckCircle2 size={16} stroke="var(--stroke)" strokeWidth={3} />}
          </div>
          <span className={item.done ? 'strikethrough' : ''} style={{ flex: 1, fontWeight: item.highlighted ? 'bold' : 'normal' }}>
            {item.text}
          </span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '24px', height: '24px', border: '3px solid var(--stroke)', borderRadius: '4px' }}></div>
        <input 
          type="text" 
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleAdd}
          placeholder="tap to add..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            borderBottom: '2px dashed rgba(0,0,0,0.2)',
            fontSize: '22px',
            outline: 'none',
            color: 'var(--stroke)'
          }}
        />
      </div>
    </div>
  );
};

const TextContent = ({ note, updateNote }) => {
  return (
    <textarea 
      value={note.content || ''}
      onChange={(e) => updateNote({ content: e.target.value })}
      placeholder="write your thoughts here..."
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        border: 'none',
        resize: 'none',
        fontSize: '24px',
        lineHeight: '1.5',
        outline: 'none',
        color: 'var(--stroke)'
      }}
    />
  );
};

export default NoteEditor;
