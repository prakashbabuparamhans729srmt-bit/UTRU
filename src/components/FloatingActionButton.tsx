'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageCircle, ShoppingCart, ClipboardList, Search, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const fabRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const returnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const snapToDefaultPosition = useCallback((useTransition = true) => {
    if (fabRef.current) {
        if (!useTransition) {
            fabRef.current.style.transition = 'none';
        }
        const fabWidth = fabRef.current.offsetWidth;
        const defaultX = window.innerWidth - fabWidth - 24;
        const defaultY = window.innerHeight - 160;
        setPosition({ x: defaultX, y: defaultY });

        if (!useTransition) {
            // Restore transition after a frame
            requestAnimationFrame(() => {
                if (fabRef.current) {
                    fabRef.current.style.transition = '';
                }
            });
        }
    }
  }, []);

  useEffect(() => {
    // Set initial position after component mounts and is visible
    const timer = setTimeout(() => {
        snapToDefaultPosition(false);
        setIsVisible(true);
    }, 100);
    
    const handleResize = () => snapToDefaultPosition(false);
    window.addEventListener('resize', handleResize);
    
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
        if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
    };
  }, [snapToDefaultPosition]);


  const handlePointerMove = useCallback((event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      event.preventDefault();

      const dx = event.clientX - dragStartPos.current.x;
      const dy = event.clientY - dragStartPos.current.y;

      if (!hasDraggedRef.current && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
          hasDraggedRef.current = true;
          if (isOpen) {
              setIsOpen(false);
          }
      }

      if (hasDraggedRef.current) {
          setPosition(prev => {
              const fabWidth = fabRef.current?.offsetWidth || 56;
              const fabHeight = fabRef.current?.offsetHeight || 56;
              const footerHeight = 80;
              const padding = 8;
              
              let newX = prev.x + event.movementX;
              let newY = prev.y + event.movementY;

              newX = Math.max(padding, Math.min(newX, window.innerWidth - fabWidth - padding));
              newY = Math.max(padding, Math.min(newY, window.innerHeight - fabHeight - footerHeight));
              
              return { x: newX, y: newY };
          });
      }
  }, [isOpen]);

  const handlePointerUp = useCallback(() => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);

      if (hasDraggedRef.current) {
          // If dragged, start timer to return to default
          returnTimeoutRef.current = setTimeout(() => {
              snapToDefaultPosition();
          }, 10000);
      } else {
          // If not dragged (i.e., a click), toggle menu
          setIsOpen(prev => !prev);
      }
  }, [handlePointerMove, snapToDefaultPosition]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
      // Clear timers on any new interaction
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
      if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);

      hasDraggedRef.current = false;
      isDraggingRef.current = true;
      dragStartPos.current = { x: event.clientX, y: event.clientY };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
  }, [handlePointerMove, handlePointerUp]);

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
        !isVisible && "opacity-0" // Hide until positioned
      )}
      style={{
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDraggingRef.current ? 'none' : 'transform 0.3s ease-out',
        touchAction: 'none'
      }}
      onPointerDown={handlePointerDown}
    >
      <div className="relative flex flex-col items-center">
         {isOpen && (
          <div className="absolute bottom-full mb-3 flex flex-col items-center gap-3">
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => handleSubMenuClick('/search')}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>
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
          role="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
        >
          <LayoutGrid className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}
