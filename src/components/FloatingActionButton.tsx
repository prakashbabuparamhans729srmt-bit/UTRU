
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

  // Store default position in a ref
  const defaultPosition = useRef({ x: 0, y: 0 });

  // Function to calculate and update the default position.
  // No dependencies, so it's a stable function.
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
    };
  }, [updateDefaultPosition]);
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Clear any existing return timer on new interaction.
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = null;
    }

    hasDragged.current = false;
    setIsDragging(true);

    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    // Store the initial cursor position relative to the viewport.
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    
    target.onpointermove = (moveEvent) => {
      const dx = moveEvent.clientX - dragStartPos.current.x;
      const dy = moveEvent.clientY - dragStartPos.current.y;
      
      if (!hasDragged.current && Math.sqrt(dx * dx + dy * dy) > 5) { // Threshold to register as a drag.
        hasDragged.current = true;
      }

      // Calculate new position based on movement, not initial component position.
      // This prevents jumps if state updates are slow.
      let newX = position.x + moveEvent.movementX;
      let newY = position.y + moveEvent.movementY;

      // Constrain position within the viewport.
      if (fabRef.current) {
        const fabWidth = fabRef.current.offsetWidth;
        const fabHeight = fabRef.current.offsetHeight;
        const padding = 8;
        newX = Math.max(padding, Math.min(newX, window.innerWidth - fabWidth - padding));
        newY = Math.max(padding, Math.min(newY, window.innerHeight - fabHeight - padding));
      }

      setPosition({ x: newX, y: newY });
    };

    target.onpointerup = () => {
      target.onpointermove = null;
      target.onpointerup = null;
      target.releasePointerCapture(e.pointerId);
      
      setIsDragging(false);
      
      // If it wasn't a drag, it's a click.
      if (!hasDragged.current) {
        setIsOpen(prev => !prev);
      }

      // After any interaction, start a timer to return the FAB to its default position.
      returnTimeoutRef.current = setTimeout(() => {
        setPosition(defaultPosition.current);
        returnTimeoutRef.current = null; // Clear the ref after it's been used.
      }, 10000); // 10 seconds
    };
  };

  
  // Make the button smaller
  const mainButtonClasses = `rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg transform hover:scale-110`;
  const subButtonClasses = "rounded-full w-12 h-12 bg-secondary text-secondary-foreground shadow-lg";

  return (
    <div
      ref={fabRef}
      className={cn(
        "fixed z-50",
        !isDragging && "transition-all duration-300 ease-in-out" // Apply transition only when not dragging
      )}
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
