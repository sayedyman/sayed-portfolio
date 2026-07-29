import { useState, useEffect, useRef } from "react";

export function useActiveSection(sectionIds: string[], offsetTop: number = 100) {
  const [activeId, setActiveId] = useState<string>("");
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visibleSections = useRef(new Map<string, boolean>());

  useEffect(() => {
    // Array of thresholds to trigger the observer frequently during scrolling
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.02) {
      thresholds.push(i);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        // Update the visibility map
        entries.forEach((entry) => {
          visibleSections.current.set(entry.target.id, entry.isIntersecting);
        });

        let closestId = "";

        // Rule 1: While Hero ("home") is visible, it takes absolute precedence.
        // This ensures no nav items are highlighted while the Hero is in view.
        if (visibleSections.current.get("home")) {
          closestId = "home";
        } else {
          // Rule 2: Determine active section based on whose top is closest to the navbar
          let minDistance = Infinity;
          const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

          elements.forEach(el => {
            if (!visibleSections.current.get(el.id)) return;
            
            const rect = el.getBoundingClientRect();
            // Calculate distance from the section's top to the navbar's offset line
            const distanceToNavbar = Math.abs(rect.top - offsetTop);

            if (distanceToNavbar < minDistance) {
              minDistance = distanceToNavbar;
              closestId = el.id;
            }
          });
        }

        if (closestId) {
          setActiveId(closestId);
        }
      },
      {
        rootMargin: `-${offsetTop}px 0px 0px 0px`,
        threshold: thresholds,
      }
    );

    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionIds, offsetTop]);

  const setManualActiveId = (id: string) => {
    setActiveId(id);
    isClickScrolling.current = true;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    // Assume smooth scroll takes around 1.5s max
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1500);
  };

  return { activeId, setManualActiveId };
}
