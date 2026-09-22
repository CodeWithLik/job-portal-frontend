/**
 * A custom hook that returns an onKeyDown handler for a form to 
 * prevent the default "Enter" key submission behavior and instead move focus 
 * to the next logical form field.
 * 
 * - Skips textareas (allows normal newlines).
 * - Skips buttons and inputs of type submit/button/reset (allows normal click/submit).
 * - Finds all focusable inputs, selects, textareas, and buttons and focuses the next one.
 */
export const useEnterNextField = () => {
  const onKeyDown = (e) => {
    // Only handle the Enter key without modifiers
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const target = e.target;
      const form = e.currentTarget;
      
      // Ensure we have a valid target
      if (!target || !target.tagName) return;

      const tagName = target.tagName.toLowerCase();

      // 1. Textareas should behave normally (create a new line)
      if (tagName === 'textarea') {
        return;
      }

      // 2. Buttons should behave normally (e.g. trigger click)
      if (tagName === 'button') {
        return;
      }

      // 3. Inputs of specific types should behave normally
      if (tagName === 'input') {
        const type = target.type ? target.type.toLowerCase() : 'text';
        if (['submit', 'button', 'reset', 'file'].includes(type)) {
          return;
        }
      }

      // 4. Native selects should behave normally (open/select dropdown)
      if (tagName === 'select') {
        return;
      }

      // 5. For standard single-line inputs, prevent form submission
      // and move to the next logical field.
      if (tagName === 'input') {
        e.preventDefault();

        // Query all focusable form controls within the container
        const focusableSelector = 'input:not(:disabled):not([type="hidden"]):not([readonly]), ' +
                                  'select:not(:disabled), ' +
                                  'textarea:not(:disabled):not([readonly]), ' +
                                  'button:not(:disabled)';
        
        const focusableElements = Array.from(form.querySelectorAll(focusableSelector)).filter(el => {
          // Ensure element is visibly rendered and focusable
          return el.tabIndex >= 0 && el.offsetParent !== null;
        });

        const index = focusableElements.indexOf(target);
        if (index > -1 && index < focusableElements.length - 1) {
          focusableElements[index + 1].focus();
        }
      }
    }
  };

  return { onKeyDown };
};
