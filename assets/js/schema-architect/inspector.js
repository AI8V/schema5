'use strict';

(function() {
    // This single file now controls everything about the inspector.

    document.addEventListener('DOMContentLoaded', function() {
        const DOM = {
            inspectorModalEl: document.getElementById('inspectorModal'),
            inspectorFrame: document.getElementById('inspectorFrame'),
            urlInput: document.getElementById('urlInput'),
        };

        if (!DOM.inspectorModalEl) {
            console.error("Inspector modal not found. The feature will not be available.");
            return;
        }

        let targetInputId = null;
        const modalInstance = new bootstrap.Modal(DOM.inspectorModalEl);

        /**
         * Creates and adds an inspector button next to a target input field.
         * @param {string} inputId The ID of the input field.
         */
        function addInspectorButton(inputId) {
            const inputEl = document.getElementById(inputId);
            if (!inputEl?.parentElement || inputEl.parentElement.querySelector('.btn-inspector')) return;

            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary btn-inspector';
            button.type = 'button';
            button.title = 'Select element from page';
            button.innerHTML = '<span class="bi bi-crosshair" aria-hidden="true"></span>';
            
            // Attach the event listener directly to the button
            button.addEventListener('click', () => {
                targetInputId = inputId; // Set the target for this specific click
                onInspectorButtonClick();
            });
            
            inputEl.parentElement.appendChild(button);
        }

        /**
         * Initializes all inspector buttons on the page.
         */
        function initializeInspectorButtons() {
            const inputIds = [
                'customFaqItem', 'customFaqQuestion', 'customFaqAnswer',
                'customProductPrice', 'customProductCurrency', 'customProductSku', 'customProductBrand',
                'customShippingRate', 'customShippingCountry', 'customReturnDays', 'customReturnFees',
                'customRecipeContainer', 'customRecipeName', 'customRecipePrepTime', 'customRecipeCookTime', 'customRecipeIngredients',  'customRecipeInstructions', 
                'customReviewContainer', 'customReviewRating', 'customReviewItemName',
                'customHowToName', 'customHowToContainer', 'customHowToStep', 'customHowToText',
                'customBreadcrumbItem',
                'customEventName', 'customEventStartDate', 'customEventLocation', 'customEventOrganizer',
                'customOrgLogo', 'customOrgAddress', 'customOrgTelephone',
                'customVideoContainer', 'customVideoName', 'customVideoDesc', 'customVideoThumb', 'customVideoUrl', 'customVideoDate',
                'customBizPriceRange', 'customBizOpeningHours',
                'customJobContainer', 'customJobTitle', 'customJobDatePosted', 'customJobLocation', 'customJobSalary',
                'customAppContainer', 'customAppName', 'customAppRating', 'customAppPrice', 'customAppCategory', 'customAppOs',
                'customCourseListContainer', 'customCourseItemContainer', 'customCourseName', 'customCourseDescription', 'customCourseProvider'
            ];
            inputIds.forEach(addInspectorButton);
        }

        /**
         * Triggered when any inspector button is clicked.
         */
        function onInspectorButtonClick() {
            const urlToInspect = DOM.urlInput.value.trim();
            if (!urlToInspect || !/^https?:\/\//i.test(urlToInspect)) {
                showToast("Please enter a valid URL in the 'Page URL' field first.", "warning");
                return;
            }
            modalInstance.show();
        }

        /**
         * Handles the logic when the modal is about to show.
         */
        function onModalShow() {
            const urlToInspect = DOM.urlInput.value.trim();
            
            // --- >> FINAL FIX: Let the Worker do the injection. << ---
            // We just need to set the src of the iframe to our worker's URL.
            // The worker will fetch the target page, inject the script, and return the modified HTML.
            
            const proxyUrl = `https://ai8v-inspector.amr-omar304.workers.dev/?url=${encodeURIComponent(urlToInspect)}`;
            
            // To prevent showing the old page while loading, we clear it first.
            DOM.inspectorFrame.src = 'about:blank'; 
            
            // Add a small delay to ensure the src is cleared before setting the new one.
            setTimeout(() => {
                DOM.inspectorFrame.src = proxyUrl;
            }, 100);
            
            DOM.inspectorFrame.onload = () => {
                // The loading is handled by the browser now. We don't need a spinner here.
                // We could add one if the proxy takes too long, but this is cleaner.
            };
            
            DOM.inspectorFrame.onerror = () => {
                showToast("Failed to load the inspector iframe.", "danger");
            };
            // --- >> END OF FIX << ---
        }

        /**
         * Handles messages received from the iframe.
         */
        function onFrameMessage(event) {
            if (!event.data) return;
            // A basic security check for the origin of the message
            if (event.origin !== "https://ai8v-inspector.amr-omar304.workers.dev") {
               // In production, you might want to return here if the origin doesn't match.
               // For now, we'll allow it for flexibility.
            }

            if (event.data.type === 'selector-picked' && targetInputId) {
                const targetInput = document.getElementById(targetInputId);
                if (targetInput) {
                    targetInput.value = event.data.selector;
                    modalInstance.hide();
                }
            } else if (event.data.type === 'inspector-closed') {
                modalInstance.hide();
            }
        }
        
        // --- Initialize the module ---
        initializeInspectorButtons();
        DOM.inspectorModalEl.addEventListener('show.bs.modal', onModalShow);
        window.addEventListener('message', onFrameMessage);
    });
})();