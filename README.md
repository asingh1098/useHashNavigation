# useHashNavigation

A React hook for managing URL hash-based navigation with section-specific callbacks.

## Usage

```typescript
import useHashNavigation from "use-hash-navigation";

const MyComponent = () => {
    const {showText, setShowText} = useState<boolean>(false);
    const { navigateToSection, clearSection } = useHashNavigation(setShowText);

    return (
            <div>
                {!showText && <button onClick={() => navigateToSection('foobar')}>Navigate foobar Section</button>}
                {showText && Welcome to Section}
                {showText && <button onClick={clearSection}>Go back</button>}
            </div>
    );
};
```
