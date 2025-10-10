'use strict';

(function() {
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

        function addInspectorButton(inputId) {
            const inputEl = document.getElementById(inputId);
            if (!inputEl?.parentElement || inputEl.parentElement.querySelector('.btn-inspector')) return;

            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary btn-inspector';
            button.type = 'button';
            button.title = 'Select element from page';
            button.innerHTML = '<span class="bi bi-crosshair" aria-hidden="true"></span>';
            
            button.addEventListener('click', () => {
                targetInputId = inputId;
                onInspectorButtonClick();
            });
            
            inputEl.parentElement.appendChild(button);
        }

        function initializeInspectorButtons() {
            const inputIds = [
                // FAQ
                'customFaqItem', 'customFaqQuestion', 'customFaqAnswer',
                // Product - Enhanced with new patterns
                'customProductImageSelector', // 🆕 Triggers: product_image_gallery
                'customProductPrice', 'customProductStrikethroughPrice', // 🆕 Triggers: price_pair_detection
                'customProductCurrency', 'customProductSku', 'customProductBrand', 
                'customProductDescriptionSelector',
                'customProductSize', 'customProductColor', 'customProductMaterial', // 🆕 Triggers: specifications_table
                'customProductPattern', 'customProductGender', 'customProductAgeGroup', // 🆕 Triggers: specifications_table
                'customShippingRate', 'customShippingCountry', // 🆕 Triggers: shipping_returns_block
                'customReturnDays', 'customReturnFees', // 🆕 Triggers: shipping_returns_block
                'customHandlingTime', 'customTransitTime', // 🆕 Triggers: shipping_returns_block
                // Recipe
                'customRecipeContainer', 'customRecipeName', 'customRecipePrepTime', 
                'customRecipeCookTime', 'customRecipeIngredients', 'customRecipeInstructions',
                // Review
                'customReviewContainer', 'customReviewRating', 'customReviewItemName', 
                'customReviewCount', 'customReviewPros', 'customReviewCons',
                // HowTo
                'customHowToName', 'customHowToContainer', 'customHowToStep', 'customHowToText',
                // Breadcrumb
                'customBreadcrumbItem',
                // Event
                'customEventName', 'customEventStartDate', 'customEventLocation', 'customEventOrganizer',
                // Organization
                'customOrgLogo', 'customOrgAddress', 'customOrgTelephone',
                // Video
                'customVideoContainer', 'customVideoName', 'customVideoDesc', 
                'customVideoThumb', 'customVideoUrl', 'customVideoDate',
                // Local Business
                'customBizPriceRange', 'customBizOpeningHours',
                // Job Posting
                'customJobContainer', 'customJobTitle', 'customJobDatePosted', 
                'customJobIdentifier', 'customJobSalarySelector', 
                'customJobExperienceSelector', 'customJobEducationSelector',
                // Software App
                'customAppContainer', 'customAppName', 'customAppRating', 
                'customAppPrice', 'customAppCategory', 'customAppOs',
                // Course
                'customCourseListContainer', 'customCourseItemContainer', 'customCourseName', 
                'customCourseDescription', 'customCourseProvider', 'customCourseCode',
                'customCoursePrice', 'customCourseCurrency', 'customCourseCredential', 
                'customCoursePrerequisites', 'customCourseStartDate', 'customCourseEndDate',
                'customCourseLocation', 'customCourseMode', 'customCourseInstructor', 
                'customCourseInstanceContainer'
            ];
            inputIds.forEach(addInspectorButton);
        }

        function onInspectorButtonClick() {
            const urlToInspect = DOM.urlInput.value.trim();
            if (!urlToInspect || !/^https?:\/\//i.test(urlToInspect)) {
                showToast("Please enter a valid URL in the 'Page URL' field first.", "warning");
                return;
            }
            modalInstance.show();
        }

        function onModalShow() {
            const urlToInspect = DOM.urlInput.value.trim();
            const proxyUrl = `https://ai8v-inspector.amr-omar304.workers.dev/?url=${encodeURIComponent(urlToInspect)}`;
            
            DOM.inspectorFrame.src = 'about:blank'; 
            
            DOM.inspectorFrame.onload = () => {
                if (DOM.inspectorFrame.contentWindow) {
                    DOM.inspectorFrame.contentWindow.postMessage({
                        type: 'context-set',
                        inputId: targetInputId
                    }, '*');
                }
            };
            
            setTimeout(() => {
                DOM.inspectorFrame.src = proxyUrl;
            }, 100);
        }

        /**
         * 🆕 ENHANCED: Now handles informational patterns
         */
        function onFrameMessage(event) {
            if (!event.data || !event.data.type) return;

            const targetInput = document.getElementById(targetInputId);
            if (!targetInput) return;
            
            if (event.data.type === 'selector-picked') {
                const { originalSelector, analysis } = event.data;
                
                if (analysis && analysis.enhancedSelector) {
                    // 🆕 NEW: Handle informational patterns (e.g., price_pair_detection)
                    if (analysis.isInformational) {
                        // Show informational toast with HTML content
                        showInformationalToast(analysis.reason);
                        targetInput.value = originalSelector;
                        modalInstance.hide();
                        return;
                    }
                    
                    // Existing logic for auto-apply patterns
                    if (analysis.autoApply) {
                        targetInput.value = analysis.enhancedSelector;
                        showToast('Smart Selector Applied: ' + analysis.patternType, 'success');
                        modalInstance.hide();
                    } else {
                        // Show suggestion modal
                        showSmartSuggestion(analysis, targetInputId,
                            (acceptedSelector) => {
                                targetInput.value = acceptedSelector;
                                modalInstance.hide();
                            },
                            () => {
                                targetInput.value = originalSelector;
                                modalInstance.hide();
                            }
                        );
                    }
                } else {
                    targetInput.value = originalSelector;
                    modalInstance.hide();
                }

            } else if (event.data.type === 'inspector-closed') {
                modalInstance.hide();
            }
        }

        /**
         * 🆕 NEW FUNCTION: Show informational toast with HTML support
         * @param {string} htmlMessage - HTML message to display
         */
        function showInformationalToast(htmlMessage) {
            const toastContainer = document.querySelector('.toast-container');
            if (!toastContainer) {
                console.error('Toast container not found.');
                return;
            }

            const toastId = `toast-info-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

            const toastEl = document.createElement('div');
            toastEl.id = toastId;
            toastEl.className = 'toast align-items-center bg-info-subtle border-info-subtle border-0';
            toastEl.setAttribute('role', 'alert');
            toastEl.setAttribute('aria-live', 'assertive');
            toastEl.setAttribute('aria-atomic', 'true');

            const dFlex = document.createElement('div');
            dFlex.className = 'd-flex';

            const toastBody = document.createElement('div');
            toastBody.className = 'toast-body d-flex align-items-start text-info-emphasis small';
            toastBody.style.maxWidth = '400px';

            const iconSpan = document.createElement('span');
            iconSpan.className = 'bi bi-info-circle-fill me-2 mt-1 flex-shrink-0';
            iconSpan.setAttribute('aria-hidden', 'true');

            const messageDiv = document.createElement('div');
            messageDiv.innerHTML = htmlMessage; // Allow HTML for <code> tags

            toastBody.appendChild(iconSpan);
            toastBody.appendChild(messageDiv);

            const closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.className = 'btn-close me-2 m-auto';
            closeButton.setAttribute('data-bs-dismiss', 'toast');
            closeButton.setAttribute('aria-label', 'Close');

            dFlex.appendChild(toastBody);
            dFlex.appendChild(closeButton);
            toastEl.appendChild(dFlex);

            toastContainer.appendChild(toastEl);

            const toast = new bootstrap.Toast(toastEl, { delay: 8000 }); // Longer delay for reading
            toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
            toast.show();
        }
        
        initializeInspectorButtons();
        DOM.inspectorModalEl.addEventListener('show.bs.modal', onModalShow);
        window.addEventListener('message', onFrameMessage);
    });
})();