import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Desk = ({ pickerOpen, setPickerOpen, createNote, monkeyMood, setMonkeyMood }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      {/* Desk Surface */}
      <div style={{
        height: '30%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}>
        {/* The top edge of the desk */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          height: '25vh',
          backgroundColor: 'var(--desk-top)',
          borderTop: '6px solid var(--stroke)',
          zIndex: 2
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          height: '4vh',
          backgroundColor: 'var(--desk-front)',
          borderTop: '6px solid var(--stroke)',
          zIndex: 3
        }} />

        {/* Char & Props container */}
        <div style={{
          position: 'absolute',
          bottom: '4vh',
          width: '80%',
          maxWidth: '800px',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          zIndex: 4,
          padding: '0 20px'
        }}>
          
          {/* Left: Laptop & Monkey */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
            
            {/* Monkey Character placeholder (we can enhance this as SVG) */}
            <div 
              onClick={() => setMonkeyMood(monkeyMood === 'idle' ? 'working' : 'idle')}
              style={{
                width: '160px',
                height: '160px',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                {/* Body / Suit */}
                <path d="M 20 100 C 20 60, 80 60, 80 100" fill="#4a6ca7" stroke="var(--stroke)" strokeWidth="3" />
                {/* Tie */}
                <path d="M 45 60 L 55 60 L 50 80 Z" fill="#d33" stroke="var(--stroke)" strokeWidth="2" />
                
                {/* Head */}
                <circle cx="50" cy="40" r="25" fill="#a47250" stroke="var(--stroke)" strokeWidth="3" />
                {/* Ears */}
                <circle cx="20" cy="40" r="10" fill="#a47250" stroke="var(--stroke)" strokeWidth="3" />
                <circle cx="80" cy="40" r="10" fill="#a47250" stroke="var(--stroke)" strokeWidth="3" />
                
                {/* Face area */}
                <circle cx="50" cy="45" r="18" fill="#e2c4a3" stroke="var(--stroke)" strokeWidth="2" />
                
                {/* Eyes */}
                {monkeyMood === 'working' ? (
                  <>
                    <path d="M 38 40 L 44 40" stroke="var(--stroke)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 56 40 L 62 40" stroke="var(--stroke)" strokeWidth="3" strokeLinecap="round" />
                    {/* Hand munching */}
                    <path d="M 50 55 C 60 70, 70 80, 80 70" fill="#a47250" stroke="var(--stroke)" strokeWidth="3" />
                  </>
                ) : (
                  <>
                    <circle cx="42" cy="40" r="3" fill="var(--stroke)" />
                    <circle cx="58" cy="40" r="3" fill="var(--stroke)" />
                  </>
                )}
                
                {/* Nose/Mouth */}
                <path d="M 47 48 C 50 50, 53 48, 53 48" fill="transparent" stroke="var(--stroke)" strokeWidth="2" />
              </svg>
            </div>

            {/* Laptop */}
            <div style={{
              width: '140px',
              height: '100px',
              backgroundColor: '#a9b1b7',
              border: '4px solid var(--stroke)',
              borderRadius: '8px',
              marginBottom: '-20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'scaleX(-1)'
            }}>
               <div style={{ width: '30px', height: '30px', border: '3px solid var(--stroke)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <div style={{ width: '15px', height: '15px', borderRadius: '50% 0', background: 'var(--stroke)', transform: 'rotate(45deg)' }} />
               </div>
            </div>
            
          </div>

          {/* Right: Notes Stack and Pen Cup */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '30px', paddingBottom: '20px' }}>
            
            {/* Context Menu for Notes */}
            <AnimatePresence>
              {pickerOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  className="hand-drawn shadow"
                  style={{
                    position: 'absolute',
                    bottom: '90px',
                    right: '100px',
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '20px',
                    display: 'flex',
                    gap: '15px',
                    zIndex: 10
                  }}
                >
                  <NoteOption color="var(--note-yellow)" onClick={() => createNote('checklist')} pinColor="#d34343" icon="list" />
                  <NoteOption color="var(--note-blue)" onClick={() => createNote('textBlue')} pinColor="#c2d2e3" icon="scribble" />
                  <NoteOption color="var(--note-green)" onClick={() => createNote('textGreen')} pinColor="#b0cc95" icon="star" />
                  <NoteOption color="var(--note-cream)" onClick={() => createNote('textCream')} pinColor="#d9c5a1" icon="blank" />
                  
                  {/* Bubble tail */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-15px',
                    right: '30px',
                    width: '30px',
                    height: '30px',
                    background: 'white',
                    borderRight: '4px solid var(--stroke)',
                    borderBottom: '4px solid var(--stroke)',
                    transform: 'rotate(45deg)',
                    zIndex: -1
                  }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Note Stack Button */}
            <button 
              onClick={() => setPickerOpen(!pickerOpen)}
              style={{
                width: '70px',
                height: '60px',
                backgroundColor: 'var(--note-yellow)',
                border: '4px solid var(--stroke)',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Stack layers */}
              <div style={{ position: 'absolute', top: -8, left: -4, width: '100%', height: '100%', border: '4px solid var(--stroke)', borderRadius: '8px', zIndex: -1, background: '#e0c045' }}></div>
              <div style={{ position: 'absolute', top: -16, left: -8, width: '100%', height: '100%', border: '4px solid var(--stroke)', borderRadius: '8px', zIndex: -2, background: '#d3b038', transform: 'rotate(-5deg)' }}></div>
              
              {pickerOpen ? (
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>✕</div>
              ) : (
                <div style={{ width: '30px', height: '4px', background: 'var(--stroke)' }}></div>
              )}
            </button>

            {/* Pen Cup / Help Button */}
            <button 
              onClick={() => setShowHelp(true)}
              style={{
                width: '60px',
                height: '70px',
                backgroundColor: '#8d9da8',
                border: '4px solid var(--stroke)',
                borderRadius: '5px 5px 15px 15px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)'
              }}
            >
              ?
              {/* Pens sticking out */}
              <div style={{ position: 'absolute', top: -30, right: 5, width: 15, height: 30, background: '#d34343', border: '3px solid var(--stroke)', borderRadius: '5px 5px 0 0', zIndex: -1, transform: 'rotate(15deg)' }}></div>
              <div style={{ position: 'absolute', top: -35, left: 10, width: 12, height: 40, background: '#eab644', border: '3px solid var(--stroke)', borderRadius: '100% 100% 0 0', zIndex: -1, transform: 'rotate(-10deg)' }}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
              className="hand-drawn shadow"
              style={{
                backgroundColor: '#fff',
                padding: '30px',
                maxWidth: '600px',
                width: '90%',
                borderRadius: '20px',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => setShowHelp(false)}
                style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '24px', fontWeight: 'bold' }}
              >✕</button>
              
              <h2 style={{ fontFamily: 'var(--font-handwriting)', fontSize: '32px', marginBottom: '20px', textAlign: 'center' }}>
                How to play with this desk!
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <HelpItem color="var(--note-yellow)" title="Checklist" desc="List down all your tasks and check them off when done!" />
                <HelpItem color="var(--note-blue)" title="Brain Dump" desc="Jot down random thoughts or use cute stickers." />
                <HelpItem color="var(--note-green)" title="Notes to Self" desc="Little reminders for your awesome self." />
                <HelpItem color="var(--note-cream)" title="Blank Note" desc="A clean slate for anything you want." />
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '18px' }}>
                <p>Click the Note Stack to start.</p>
                <p>Pin notes to the board to save them for later.</p>
                <p>Click on the Monkey to see him take a snack break!</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NoteOption = ({ color, onClick, pinColor, icon }) => (
  <button 
    onClick={onClick}
    className="hand-drawn"
    style={{
      width: '50px',
      height: '60px',
      backgroundColor: color,
      position: 'relative',
      transition: 'transform 0.1s',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{
      width: '10px', height: '10px', backgroundColor: pinColor, borderRadius: '50%',
      position: 'absolute', top: '-5px', border: '2px solid var(--stroke)'
    }} />
    
    {/* Icon representation */}
    {icon === 'list' && (
      <div style={{ width: '60%', height: '50%', borderTop: '3px solid var(--stroke)', borderBottom: '3px solid var(--stroke)', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '30%', background: 'var(--stroke)' }}></div>
      </div>
    )}
    {icon === 'scribble' && <div style={{ fontSize: '24px', fontFamily: 'var(--font-handwriting)' }}>~</div>}
    {icon === 'star' && <div style={{ fontSize: '24px' }}>*</div>}
    {icon === 'blank' && <div style={{ width: '70%', height: '70%', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '4px' }}></div>}
  </button>
);

const HelpItem = ({ color, title, desc }) => (
  <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
    <div className="hand-drawn" style={{ width: '40px', height: '50px', backgroundColor: color, flexShrink: 0 }} />
    <div>
      <h3 style={{ fontFamily: 'var(--font-handwriting)', fontSize: '22px' }}>{title}</h3>
      <p style={{ fontSize: '16px' }}>{desc}</p>
    </div>
  </div>
);

export default Desk;
