import React, { useState, useEffect } from 'react';
import './App.css';
import Corkboard from './components/Corkboard';
import Desk from './components/Desk';
import NoteEditor from './components/NoteEditor';
// Using simple id generation to avoid dependency for now.
const generateId = () => Math.random().toString(36).substr(2, 9);

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('monkey_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
        return [];
      }
    }
    return [];
  });

  const [activeNote, setActiveNote] = useState(null); // The full note object if being edited
  const [pickerOpen, setPickerOpen] = useState(false);
  const [placingNote, setPlacingNote] = useState(null); // ID of the note currently being placed on board
  const [monkeyMood, setMonkeyMood] = useState('eating');

  useEffect(() => {
    localStorage.setItem('monkey_notes', JSON.stringify(notes));
  }, [notes]);

  // Handlers for managing notes
  const createNote = (type) => {
    const newNote = {
      id: generateId(),
      type,
      content: type === 'checklist' ? [] : '',
      isPinned: false,
      x: null,
      y: null,
      zIndex: notes.length + 1
    };
    // If it's a checklist, give it one empty item to start
    if (type === 'checklist') {
      newNote.content = [{ id: generateId(), text: '', done: false }];
    }
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
    setPickerOpen(false);
  };

  const updateNote = (id, newProps) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...newProps } : n));
    if (activeNote && activeNote.id === id) {
      setActiveNote({ ...activeNote, ...newProps });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
    }
  };

  const pinNote = (id) => {
    setActiveNote(null);
    setPlacingNote(id);
  };

  const handleBoardClick = (e) => {
    if (placingNote) {
      // Get coordinates relative to the board in percentages so they scale seamlessly
      const boardRect = e.currentTarget.getBoundingClientRect();
      // Adjust standard offset assuming click is center of note (30x 35y offset for 60x70 note)
      const px = e.clientX - boardRect.left - 30; 
      const py = e.clientY - boardRect.top - 35;
      
      const xp = (px / boardRect.width) * 100;
      const yp = (py / boardRect.height) * 100;
      
      updateNote(placingNote, { isPinned: true, xp, yp, x: undefined, y: undefined, zIndex: Date.now() });
      setPlacingNote(null);
    }
  };

  const openNote = (id) => {
    if (placingNote) return;
    const noteToOpen = notes.find(n => n.id === id);
    if (noteToOpen) {
      setActiveNote(noteToOpen);
    }
  };

  const closeActiveNote = () => {
    if (activeNote) {
      if (!activeNote.isPinned) {
        // If it wasn't pinned, just delete it? Original app seems to keep it floating until pinned,
        // or let's say if it's discarded without pinning, we remove it.
        // Actually the original app forces you to pin it. 
        // Let's delete it if closed without pinning.
        deleteNote(activeNote.id);
      }
      setActiveNote(null);
    }
  };

  return (
    <div className="app-container" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Speech bubble for monkey or hints */}
      <div className="speech-bubble-container" style={{ position: 'absolute', top: '55%', left: '30%', zIndex: 10, pointerEvents: 'none' }}>
        {placingNote && (
          <div className="speech-bubble" style={{ 
            background: '#c2d2e3', padding: '15px 25px', borderRadius: '25px', 
            border: '4px solid var(--stroke)', fontFamily: 'var(--font-body)', fontWeight: 'bold',
            boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
          }}>
            Click on the board to place your note!
          </div>
        )}
      </div>

      <Corkboard 
        notes={notes.filter(n => n.isPinned)} 
        onBoardClick={handleBoardClick} 
        onNoteClick={openNote}
        placingNote={placingNote}
        updateNote={updateNote}
      />
      
      <Desk 
        pickerOpen={pickerOpen} 
        setPickerOpen={setPickerOpen} 
        createNote={createNote}
        monkeyMood={monkeyMood}
        setMonkeyMood={setMonkeyMood}
      />

      {activeNote && (
        <NoteEditor 
          note={activeNote} 
          updateNote={updateNote} 
          pinNote={pinNote} 
          closeNote={closeActiveNote}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
}

export default App;
