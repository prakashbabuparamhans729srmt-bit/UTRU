'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageCircle, ShoppingCart, ClipboardList, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Draggable state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const fabRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  // Use useEffect to handle client-side only state initialization
  useEffect(() => {
    setPosition({ x: window.innerWidth - 72, y: window.innerHeight - 160 });
  }, []);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (fabRef.current) {
        isDraggingRef.current = true;
        
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        dragStartPos.current = { x: clientX, y: clientY };
        dragOffset.current = { x: position.x, y: position.y };
        
        // Add listeners to window
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('touchmove', handleDragMove, { passive: false });
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);
    }
  };

  const handleDragMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
    if (!isDraggingRef.current || !fabRef.current) return;
    if (e.cancelable) e.preventDefault();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragStartPos.current.x;
    const dy = clientY - dragStartPos.current.y;

    let newX = dragOffset.current.x + dx;
    let newY = dragOffset.current.y + dy;

    // Constrain within viewport
    const fabWidth = fabRef.current.offsetWidth;
    const fabHeight = fabRef.current.offsetHeight;
    newX = Math.max(8, Math.min(newX, window.innerWidth - fabWidth - 8));
    newY = Math.max(8, Math.min(newY, window.innerHeight - fabHeight - 8));
    
    setPosition({ x: newX, y: newY });
  };
  
  const handleDragEnd = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
    
    const dx = clientX - dragStartPos.current.x;
    const dy = clientY - dragStartPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) { // If it's a small movement, treat it as a click
      setIsOpen(prev => !prev);
    }
    
    isDraggingRef.current = false;
    
    // Clean up listeners
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('touchmove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('touchend', handleDragEnd);
  };
  
  // Make the button smaller
  const mainButtonClasses = `rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110`;
  const subButtonClasses = "rounded-full w-12 h-12 bg-secondary text-secondary-foreground shadow-lg";

  return (
    <div
      ref={fabRef}
      className="fixed z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none' // Prevent page scroll on touch devices when dragging
      }}
    >
      <div className="relative flex flex-col items-center gap-3">
        {isOpen && (
          <div className="flex flex-col items-center gap-3 transition-all duration-300 ease-in-out">
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => { router.push('/my-plans'); setIsOpen(false); }}
              aria-label="Bookings"
            >
              <ClipboardList className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => { router.push('/chatbot'); setIsOpen(false); }}
              aria-label="Chat"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => { router.push('/cart'); setIsOpen(false); }}
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        )}
        <div
          className={cn(mainButtonClasses, "flex items-center justify-center cursor-pointer")}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          role="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
        >
          <Search className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}
