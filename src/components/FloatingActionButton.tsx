
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  const returnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null); // For auto-closing the menu

  // Store default position in a ref
  const defaultPosition = useRef({ x: 0, y: 0 });

  // Function to calculate and update the default position.
  const updateDefaultPosition = useCallback(() => {
    if (fabRef.current) {
      const fabWidth = fabRef.current.offsetWidth || 56;
      const defaultX = window.innerWidth - fabWidth - 24; // ~1.5rem padding
      const defaultY = window.innerHeight - 160;
      defaultPosition.current = { x: defaultX, y: defaultY };
    }
  }, []);

  // Effect to set initial position and handle window resizing.
  useEffect(() => {
    // A function to set/reset the position to default.
    const resetToDefaultPosition = () => {
      updateDefaultPosition();
      setPosition(defaultPosition.current);
    }
    
    // Set initial position after a short delay to ensure fabRef is available.
    const timer = setTimeout(resetToDefaultPosition, 10);
    
    // Reset position on window resize.
    window.addEventListener('resize', resetToDefaultPosition);

    // Cleanup function.
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resetToDefaultPosition);
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
      }
    };
  }, [updateDefaultPosition]);
  
  // Effect to auto-close the menu after 10 seconds of inactivity.
  useEffect(() => {
    // If the menu is closed, make sure there's no active timer.
    if (!isOpen) {
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
        autoCloseTimeoutRef.current = null;
      }
      return;
    }

    // If the menu is open, set a 10-second timer to close it.
    autoCloseTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 10000);

    // The cleanup function will run when the component unmounts or `isOpen` changes.
    // This correctly handles manual closing of the menu.
    return () => {
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
        autoCloseTimeoutRef.current = null;
      }
    };
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Clear any existing return-to-default-position timer on new interaction.
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = null;
    }
    
    // If menu is open, interacting with it should reset the auto-close timer.
    if (isOpen) {
        if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
        autoCloseTimeoutRef.current = setTimeout(() => setIsOpen(false), 10000);
    }

    hasDragged.current = false;
    setIsDragging(true);

    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    target.onpointermove = (moveEvent) => {
      const dx = moveEvent.clientX - dragStartPos.current.x;
      const dy = moveEvent.clientY - dragStartPos.current.y;
      
      if (!hasDragged.current && Math.sqrt(dx * dx + dy * dy) > 5) { // Threshold to register as a drag.
        hasDragged.current = true;
      }

      let newX = position.x + moveEvent.movementX;
      let newY = position.y + moveEvent.movementY;

      if (fabRef.current) {
        const fabWidth = fabRef.current.offsetWidth;
        const fabHeight = fabRef.current.offsetHeight;
        const padding = 8;
        const footerHeight = 80;
        newX = Math.max(padding, Math.min(newX, window.innerWidth - fabWidth - padding));
        newY = Math.max(padding, Math.min(newY, window.innerHeight - fabHeight - footerHeight));
      }

      setPosition({ x: newX, y: newY });
    };

    target.onpointerup = () => {
      target.onpointermove = null;
      target.onpointerup = null;
      target.releasePointerCapture(e.pointerId);
      
      setIsDragging(false);
      
      if (!hasDragged.current) {
        setIsOpen(prev => !prev);
      }

      returnTimeoutRef.current = setTimeout(() => {
        setPosition(defaultPosition.current);
        returnTimeoutRef.current = null;
      }, 10000);
    };
  };

  const handleSubMenuClick = (path: string) => {
    router.push(path);
    setIsOpen(false); // This will trigger the useEffect to clear the timeout
  };
  
  const mainButtonClasses = `rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg transform hover:scale-110`;
  const subButtonClasses = "rounded-full w-12 h-12 bg-secondary text-secondary-foreground shadow-lg";

  return (
    <div
      ref={fabRef}
      className={cn(
        "fixed z-50",
        !isDragging && "transition-all duration-300 ease-in-out"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none'
      }}
    >
      <div className="relative flex flex-col items-center gap-3">
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
        <div
          className={cn(mainButtonClasses, "flex items-center justify-center cursor-pointer")}
          onPointerDown={handlePointerDown}
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
