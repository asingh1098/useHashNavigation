import { useEffect, useRef, MutableRefObject } from "react";

/**
 * Hook for managing URL hash-based navigation with section-specific callbacks.
 *
 * This hook allows navigating to a specific section by updating the URL hash and supports
 * handling back button behavior. It notifies the parent component about hash changes,
 * enabling conditional rendering or state updates (e.g., for showing or hiding a component).
 *
 * @param onHashChange - A callback function that receives a boolean indicating the parent component state.
 *                       When the hash matches the specified section (e.g., "#foobar"),
 *                       it sets the parent component's state to visible (true). Otherwise, it hides it (false).
 *
 * @returns An object with:
 *   - `navigateToSection`: A function to set the URL fragment (hash) to a specific section string
 *                          (e.g., "foobar"), which can be used to show a desired component.
 *   - `clearSection`: A function that triggers a back navigation to clear the current hash,
 *                     effectively hiding the desired component if it was open.
 *
 * @example
 * import useHashNavigation from "use-hash-navigation";

 * const MyComponent = () => {
 *     const {showText, setShowText} = useState<boolean>(false);
 *     const { navigateToSection, clearSection } = useHashNavigation(setShowText);
 *
 *       return (
 *           <div>
 *               <button onClick={() => navigateToSection('options')}>Open Section</button>
 *               {showText && Welcome to Section}
 *               <button onClick={clearSection}>Close Section</button>
 *           </div>
 *        );
 *    };
 */
const useHashNavigation = (onHashChange: (isUIVisible: boolean) => void) => {
  const urlFragment: MutableRefObject<string> = useRef<string>("");

  const navigateToSection = (section: string) => {
    window.location.hash = section;
    urlFragment.current = section;
  };

  const clearSection = () => {
    if (!window.location.hash) onHashChange(false);

    window.history.back();
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (!window.location.hash) {
        urlFragment.current = "";
        onHashChange(false);
      }

      if (window.location.hash === `#` + urlFragment.current) {
        onHashChange(true);
      } else {
        urlFragment.current = `${window.location.hash}`;
        onHashChange(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return { navigateToSection, clearSection };
};

export default useHashNavigation;
