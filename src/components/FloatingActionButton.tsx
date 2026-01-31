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

  // Store default position
  const defaultPosition = useRef({ x: 0, y: 0 });

  const updateDefaultPosition = useCallback(() => {
    if (fabRef.current) {
        const fabWidth = fabRef.current.offsetWidth || 56;
        const defaultX = window.innerWidth - fabWidth - 24; // ~1.5rem padding
        const defaultY = window.innerHeight - 160;
        defaultPosition.current = { x: defaultX, y: defaultY };
        if (!isDragging) {
          setPosition({ x: defaultX, y: defaultY });
        }
    }
  }, [isDragging]);

  // Use useEffect to handle client-side only state initialization
  useEffect(() => {
    // We need a slight delay to ensure fabRef.current is available for width calculation
    const timer = setTimeout(updateDefaultPosition, 10);
    window.addEventListener('resize', updateDefaultPosition);
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateDefaultPosition);
    }
  }, [updateDefaultPosition]);
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    hasDragged.current = false;
    setIsDragging(true);

    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    dragStartPos.current = { x: e.clientX, y: e.clientY };
    
    target.onpointermove = (moveEvent) => {
        const dx = moveEvent.clientX - dragStartPos.current.x;
        const dy = moveEvent.clientY - dragStartPos.current.y;
        
        if (!hasDragged.current && Math.sqrt(dx * dx + dy * dy) > 5) { // Threshold to consider it a drag
            hasDragged.current = true;
        }

        let newX = position.x + dx;
        let newY = position.y + dy;

        if (fabRef.current) {
            const fabWidth = fabRef.current.offsetWidth;
            const fabHeight = fabRef.current.offsetHeight;
            const padding = 8;
            newX = position.x + moveEvent.movementX;
            newY = position.y + moveEvent.movementY;
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
        
        if (!hasDragged.current) {
            setIsOpen(prev => !prev);
        }

        // Return to default position smoothly
        setPosition(defaultPosition.current);
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
