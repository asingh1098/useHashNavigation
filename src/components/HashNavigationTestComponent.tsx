import React, { useState } from "react";
import useHashNavigation from "../hooks/useHashNavigation";

const HashNavigationTestComponent: React.FC = () => {
  const [showText, setShowText] = useState(false);
  const { navigateToSection, clearSection } = useHashNavigation(setShowText);

  return (
    <div>
      {showText && <div id="text">Welcome to the test Section</div>}
      {!showText && (
        <button onClick={() => navigateToSection("test")}>Navigate</button>
      )}
      {showText && <button onClick={clearSection}>Go back</button>}
    </div>
  );
};

export default HashNavigationTestComponent;
