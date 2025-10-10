(function() {
    'use strict';

    const helpModalEl = document.getElementById('helpModal');
    if (!helpModalEl) return;

    const helpModalLabel = document.getElementById('helpModalLabel');
    const helpModalBody = document.getElementById('helpModalBody');

    helpModalEl.addEventListener('show.bs.modal', function (event) {
        const triggerButton = event.relatedTarget;
        if (!triggerButton) return;

        const helpTopicId = triggerButton.getAttribute('data-help-topic');
        const helpTitle = triggerButton.getAttribute('data-help-title');
        
        const templateSource = document.getElementById(`help-${helpTopicId}`);

        helpModalLabel.textContent = helpTitle;

        if (templateSource && templateSource.tagName === 'TEMPLATE') {
            const contentClone = templateSource.content.cloneNode(true);
            
            helpModalBody.innerHTML = ''; 
            helpModalBody.appendChild(contentClone);

            // --- >> FINAL & COMPREHENSIVE HIGHLIGHTING FIX << ---

            // 1. Immediately highlight all code blocks that are NOT inside a collapsible section.
            // This will handle all the small HTML examples.
            const immediateCodeBlocks = helpModalBody.querySelectorAll('pre:not(.collapse *) code');
            immediateCodeBlocks.forEach(block => Prism.highlightElement(block));

            // 2. Set up lazy highlighting for code blocks that ARE inside a collapsible section.
            // This handles the large JSON examples for performance.
            const collapsibles = helpModalBody.querySelectorAll('.collapse');
            collapsibles.forEach(collapsible => {
                collapsible.addEventListener('shown.bs.collapse', function () {
                    const codeBlock = this.querySelector('pre code');
                    if (codeBlock && !codeBlock.classList.contains('prism-highlighted')) {
                        Prism.highlightElement(codeBlock);
                        codeBlock.classList.add('prism-highlighted');
                    }
                });
            });
            // --- >> END OF FIX << ---

        } else {
            helpModalBody.innerHTML = '<p class="text-danger">Sorry, the requested help topic could not be found.</p>';
        }
    });

    helpModalEl.addEventListener('hidden.bs.modal', function() {
        helpModalBody.innerHTML = '';
    });

})();