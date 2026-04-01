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
        <div 
          className="desk-mobile"
          style={{
          position: 'absolute',
          bottom: '4vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '800px',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          zIndex: 4,
          padding: '0 20px'
        }}>

        {/* --- INTERACTIVE DESK CONTENT --- */}
          
          {/* Left: Plant, [Monkey & Laptop], Coffee, Books */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', position: 'relative' }}>
            
            {/* Plant */}
            <div className="desktop-only" style={{ zIndex: 1, pointerEvents: 'none', marginBottom: '-5px' }}>
              <svg width="50" height="65" viewBox="0 0 50 65" style={{ overflow: 'visible' }}>
                <path d="M 15 40 L 35 40 L 30 65 L 20 65 Z" fill="#c49779" stroke="var(--stroke)" strokeWidth="2" /> {/* pot */}
                <path d="M 25 40 C 15 30, 15 15, 25 10 C 35 15, 35 30, 25 40 Z" fill="#7ba36e" stroke="var(--stroke)" strokeWidth="2" /> {/* leaf 1 */}
                <path d="M 20 38 C 5 30, 5 15, 10 10 C 20 15, 20 30, 20 38 Z" fill="#8bc977" stroke="var(--stroke)" strokeWidth="2" /> {/* leaf 2 */}
                <path d="M 30 38 C 45 30, 45 15, 40 10 C 30 15, 30 30, 30 38 Z" fill="#8bc977" stroke="var(--stroke)" strokeWidth="2" /> {/* leaf 3 */}
              </svg>
            </div>

            {/* Monkey & Laptop Group */}
            <div className="monkey-scale" style={{ display: 'flex', alignItems: 'flex-end' }}>
              {/* Monkey Character */}
            <div 
              onClick={() => {
                if (monkeyMood === 'eating') setMonkeyMood('sleeping');
                else if (monkeyMood === 'sleeping') setMonkeyMood('typing');
                else if (monkeyMood === 'typing') setMonkeyMood('playing');
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
                ) : monkeyMood === 'typing' ? (
                  <>
                    <circle cx="38" cy="38" r="5" fill="var(--stroke)" />
                    <circle cx="62" cy="38" r="5" fill="var(--stroke)" />
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
                ) : monkeyMood === 'typing' ? (
                  <path d="M 45 53 L 55 53" fill="none" stroke="var(--stroke)" strokeWidth="2" strokeLinecap="round" />
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
                ) : monkeyMood === 'typing' ? (
                  <g>
                    {/* Left arm typing */}
                    <path d="M 15 80 Q 25 75 35 85" fill="none" stroke="#a47250" strokeWidth="12" strokeLinecap="round" className="typing-left" />
                    <path d="M 15 80 Q 25 75 35 85" fill="none" stroke="var(--stroke)" strokeWidth="16" strokeLinecap="round" opacity="0.2" className="typing-left" />
                    
                    {/* Right arm typing */}
                    <path d="M 85 80 Q 75 75 65 85" fill="none" stroke="#a47250" strokeWidth="12" strokeLinecap="round" className="typing-right" />
                    <path d="M 85 80 Q 75 75 65 85" fill="none" stroke="var(--stroke)" strokeWidth="16" strokeLinecap="round" opacity="0.2" className="typing-right" />
                    
                    {/* Music note / focus indicator */}
                    <text x="5" y="40" fontSize="20" style={{ pointerEvents: 'none', animation: 'steam-rise 3s infinite' }}>🎵</text>
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

            {/* Coffee Mug */}
            <div className="desktop-only" style={{ zIndex: 4, pointerEvents: 'none', marginBottom: '-5px' }}>
              <svg width="50" height="45" viewBox="0 0 50 45" style={{ overflow: 'visible' }}>
                <g className="steam-animation">
                  <path d="M 15 15 Q 18 10 15 5 T 15 -5" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 25 15 Q 22 10 25 5 T 25 -5" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" />
                </g>
                <path d="M 30 25 C 38 25, 38 35, 30 35" fill="none" stroke="var(--stroke)" strokeWidth="2" /> {/* handle */}
                <path d="M 10 20 L 10 40 C 10 45, 30 45, 30 40 L 30 20 Z" fill="#eb8d7f" stroke="var(--stroke)" strokeWidth="2" />
                <ellipse cx="20" cy="20" rx="10" ry="4" fill="#6b4c3a" stroke="var(--stroke)" strokeWidth="2" /> {/* coffee inside */}
              </svg>
            </div>

            {/* Books */}
            <div className="desktop-only" style={{ zIndex: 2, pointerEvents: 'none', marginBottom: '-5px' }}>
              <svg width="80" height="46" viewBox="0 0 80 46" style={{ overflow: 'visible' }}>
                <rect x="5" y="10" width="65" height="12" fill="#a3bccc" stroke="var(--stroke)" strokeWidth="2" transform="rotate(-3)" />
                <rect x="15" y="20" width="55" height="12" fill="#7ba36e" stroke="var(--stroke)" strokeWidth="2" />
                <rect x="10" y="32" width="60" height="14" fill="#e27c7c" stroke="var(--stroke)" strokeWidth="2" />
              </svg>
            </div>
            
          </div>

          {/* Right: Desk Lamp, Folders, Glasses, Pen Cup */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>

            {/* Desk Lamp */}
            <div className="desktop-only" style={{ zIndex: 1, pointerEvents: 'none', marginBottom: '-5px' }}>
              <svg width="100" height="110" viewBox="0 0 100 110" style={{ overflow: 'visible' }}>
                <path d="M 30 110 L 70 110 L 65 100 L 35 100 Z" fill="#586776" stroke="var(--stroke)" strokeWidth="2" /> {/* base */}
                <path d="M 50 100 L 50 50" fill="none" stroke="var(--stroke)" strokeWidth="6" /> {/* stand */}
                <path d="M 50 50 L 30 20" fill="none" stroke="var(--stroke)" strokeWidth="6" /> {/* arm */}
                <g transform="translate(10, -5) rotate(-15 20 20)">
                  <path d="M -10 30 Q 20 0 50 30 Z" fill="#eacb54" stroke="var(--stroke)" strokeWidth="2" /> {/* hood */}
                  <circle cx="20" cy="30" r="10" fill="#fff" stroke="var(--stroke)" strokeWidth="2" /> {/* bulb */}
                </g>
              </svg>
            </div>
            
            {/* Context Menu & Folders */}
            <div style={{ position: 'relative' }}>
              <AnimatePresence>
              {pickerOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.8, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                  exit={{ opacity: 0, y: 20, scale: 0.8, x: '-50%' }}
                  className="hand-drawn shadow"
                  style={{
                    position: 'absolute',
                    bottom: '90px',
                    left: '50%',
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
                    left: '50%',
                    marginLeft: '-15px',
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
            </div>

            {/* Glasses */}
            <div className="desktop-only" style={{ zIndex: 6, pointerEvents: 'none', marginBottom: '-5px' }}>
              <svg width="100" height="35" viewBox="0 0 100 35" style={{ overflow: 'visible' }}>
                <rect x="10" y="10" width="35" height="25" rx="5" fill="#eaf4f4" stroke="var(--stroke)" strokeWidth="3" />
                <rect x="55" y="10" width="35" height="25" rx="5" fill="#eaf4f4" stroke="var(--stroke)" strokeWidth="3" />
                <path d="M 45 20 L 55 20" fill="none" stroke="var(--stroke)" strokeWidth="3" />
                <path d="M 10 15 L 0 5" fill="none" stroke="var(--stroke)" strokeWidth="3" />
                <path d="M 90 15 L 100 5" fill="none" stroke="var(--stroke)" strokeWidth="3" />
              </svg>
            </div>

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
