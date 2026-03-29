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
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '-10px', position: 'relative' }}>
            
            {/* Monkey Character */}
            <div 
              onClick={() => {
                if (monkeyMood === 'eating') setMonkeyMood('sleeping');
                else if (monkeyMood === 'sleeping') setMonkeyMood('playing');
                else setMonkeyMood('eating');
              }}
              style={{
                width: '180px',
                height: '180px',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1, // behind laptop
                marginRight: '-30px' // move closer to laptop
              }}
            >
              {/* Zzz animation for sleeping */}
              <AnimatePresence>
                {monkeyMood === 'sleeping' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -20, transition: { yoyo: Infinity, duration: 1.5 } }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'absolute', top: '10%', right: '10%', fontFamily: 'var(--font-handwriting)', fontSize: '24px', fontWeight: 'bold', color: 'var(--stroke)' }}
                  >
                    Zzz...
                  </motion.div>
                )}
              </AnimatePresence>

              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Body / Suit */}
                <path d="M 15 100 C 15 50, 85 50, 85 100" fill="#4a6ca7" stroke="var(--stroke)" strokeWidth="3" />
                {/* Tie */}
                <path d="M 45 60 L 55 60 L 50 85 Z" fill="#d33" stroke="var(--stroke)" strokeWidth="2" />
                
                {/* Head */}
                <circle cx="50" cy="40" r="28" fill="#a47250" stroke="var(--stroke)" strokeWidth="3" />
                {/* Ears */}
                <circle cx="15" cy="40" r="12" fill="#a47250" stroke="var(--stroke)" strokeWidth="3" />
                <circle cx="85" cy="40" r="12" fill="#a47250" stroke="var(--stroke)" strokeWidth="3" />
                
                {/* Face area */}
                <path d="M 30 40 C 30 25, 70 25, 70 40 C 75 55, 25 55, 30 40 Z" fill="#e2c4a3" stroke="var(--stroke)" strokeWidth="2" />
                
                {/* Eyes */}
                {monkeyMood === 'sleeping' ? (
                  <>
                    <path d="M 35 38 43 38" stroke="var(--stroke)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 57 38 65 38" stroke="var(--stroke)" strokeWidth="3" strokeLinecap="round" />
                  </>
                ) : monkeyMood === 'playing' ? (
                  <>
                    <path d="M 35 40 Q 40 32 45 40" fill="none" stroke="var(--stroke)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 55 40 Q 60 32 65 40" fill="none" stroke="var(--stroke)" strokeWidth="3" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <circle cx="40" cy="38" r="4" fill="var(--stroke)" />
                    <circle cx="60" cy="38" r="4" fill="var(--stroke)" />
                  </>
                )}
                
                {/* Snout/Mouth */}
                <ellipse cx="50" cy="50" rx="14" ry="10" fill="#d2a884" stroke="var(--stroke)" strokeWidth="2" />
                {monkeyMood === 'sleeping' ? (
                  <path d="M 45 52 C 50 50, 55 52, 55 52" fill="transparent" stroke="var(--stroke)" strokeWidth="2" />
                ) : monkeyMood === 'playing' ? (
                  <path d="M 42 48 Q 50 58 58 48" fill="none" stroke="var(--stroke)" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M 45 50 C 50 55, 55 50, 55 50" fill="transparent" stroke="var(--stroke)" strokeWidth="2" />
                )}

                {/* Animation logic for arms and props */}
                {monkeyMood === 'eating' ? (
                  <g className="eating-animation">
                    {/* Banana emoji in hand */}
                    <text x="50" y="88" fontSize="30" style={{ pointerEvents: 'none' }}>🍌</text>
                    {/* Arm moving up */}
                    <path d="M 85 85 Q 75 80 70 75" fill="none" stroke="#a47250" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 85 85 Q 75 80 70 75" fill="none" stroke="var(--stroke)" strokeWidth="16" strokeLinecap="round" opacity="0.2" />
                  </g>
                ) : monkeyMood === 'playing' ? (
                  <g className="celebrate-animation">
                    {/* Both arms up */}
                    <path d="M 15 80 Q -5 60 10 30" fill="none" stroke="#a47250" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 15 80 Q -5 60 10 30" fill="none" stroke="var(--stroke)" strokeWidth="16" strokeLinecap="round" opacity="0.2" />
                    
                    <path d="M 85 80 Q 105 60 90 30" fill="none" stroke="#a47250" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 85 80 Q 105 60 90 30" fill="none" stroke="var(--stroke)" strokeWidth="16" strokeLinecap="round" opacity="0.2" />
                    
                    {/* Confetti / stars */}
                    <text x="75" y="25" fontSize="20" style={{ pointerEvents: 'none' }}>✨</text>
                    <text x="-5" y="25" fontSize="20" style={{ pointerEvents: 'none' }}>💥</text>
                  </g>
                ) : (
                  <>
                    {/* Sleeping: Arms resting down */}
                    <path d="M 85 80 Q 95 90 90 100" fill="none" stroke="#4a6ca7" strokeWidth="14" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </div>

            {/* Laptop */}
            <div style={{
              width: '160px',
              height: '110px',
              backgroundColor: '#a9b1b7',
              border: '5px solid var(--stroke)',
              borderRadius: '10px',
              marginBottom: '-25px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2, // in front of monkey
              transform: 'scaleX(-1)'
            }}>
               <div style={{ width: '35px', height: '35px', border: '3px solid var(--stroke)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <div style={{ width: '18px', height: '18px', borderRadius: '50% 0', background: 'var(--stroke)', transform: 'rotate(45deg)' }} />
               </div>

               {/* Render Banana on table if sleeping */}
               {monkeyMood === 'sleeping' && (
                 <div style={{
                   position: 'absolute',
                   bottom: '-5px',
                   right: '-30px',
                   width: '40px',
                   height: '40px',
                   transform: 'rotate(-20deg)'
                 }}>
                   <svg viewBox="0 0 50 50">
                     <text x="0" y="30" fontSize="30" style={{ pointerEvents: 'none' }}>🍌</text>
                   </svg>
                 </div>
               )}
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
