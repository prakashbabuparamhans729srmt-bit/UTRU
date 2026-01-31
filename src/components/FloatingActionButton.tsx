'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageCircle, ShoppingCart, ClipboardList, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Draggable state
  const fabRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const hasDragged = useRef(false);
  
  // Position and offset refs
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  
  // Timers
  const returnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Default position ref
  const defaultPosition = useRef({ x: 0, y: 0 });

  const resetToDefaultPosition = useCallback(() => {
    if (fabRef.current) {
      const fabWidth = fabRef.current.offsetWidth || 56;
      const defaultX = window.innerWidth - fabWidth - 24; // ~1.5rem padding
      const defaultY = window.innerHeight - 160; // Above footer
      defaultPosition.current = { x: defaultX, y: defaultY };
      setPosition({ x: defaultX, y: defaultY });
    }
  }, []);
  
  // Set initial position and handle resize
  useEffect(() => {
    // Set initial position after a short delay
    const timer = setTimeout(resetToDefaultPosition, 50); 
    window.addEventListener('resize', resetToDefaultPosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resetToDefaultPosition);
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
      if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
    };
  }, [resetToDefaultPosition]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    // Clear any existing timers on new interaction
    if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
    if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
    
    hasDragged.current = false;
    isDraggingRef.current = true;

    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDraggingRef.current) return;
    
    if (!hasDragged.current) {
        hasDragged.current = true;
        if (isOpen) setIsOpen(false);
    }
    
    let newX = e.clientX - offsetRef.current.x;
    let newY = e.clientY - offsetRef.current.y;
    
    if (fabRef.current) {
      const fabWidth = fabRef.current.offsetWidth;
      const fabHeight = fabRef.current.offsetHeight;
      const padding = 8;
      const footerHeight = 80; // Estimated height of the bottom nav bar
      newX = Math.max(padding, Math.min(newX, window.innerWidth - fabWidth - padding));
      newY = Math.max(padding, Math.min(newY, window.innerHeight - fabHeight - footerHeight));
    }
    
    setPosition({ x: newX, y: newY });
  }, [isOpen]);


  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);

    if (hasDragged.current) {
      // If it was a drag, set the return timer.
      returnTimeoutRef.current = setTimeout(() => {
        setPosition(defaultPosition.current);
      }, 10000);
    } else {
      // This was a click/tap, toggle the menu.
      setIsOpen(prev => !prev);
    }
  }, [handlePointerMove]);

  // Effect to auto-close the menu
  useEffect(() => {
    if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
    if (isOpen) {
      autoCloseTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 10000);
    }
  }, [isOpen]);

  const handleSubMenuClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };
  
  const mainButtonClasses = `rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg transform hover:scale-110`;
  const subButtonClasses = "rounded-full w-12 h-12 bg-secondary text-secondary-foreground shadow-lg";

  return (
    <div
      ref={fabRef}
      className={cn(
        "fixed z-50",
        isDraggingRef.current ? "" : "transition-all duration-300 ease-in-out"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none'
      }}
    >
      <div className="relative flex flex-col items-center gap-3">
        <div
          className={cn(mainButtonClasses, "flex items-center justify-center cursor-pointer")}
          onPointerDown={handlePointerDown}
          role="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
        >
          <Search className="w-7 h-7" />
        </div>
        {isOpen && (
          <div className="flex flex-col items-center gap-3 transition-all duration-300 ease-in-out">
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => handleSubMenuClick('/my-plans')}
              aria-label="Bookings"
            >
              <ClipboardList className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => handleSubMenuClick('/chatbot')}
              aria-label="Chat"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => handleSubMenuClick('/cart')}
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
