'use strict';

/**
 * @file inspector.js - Secured Version
 * @description Element inspector with hardened security and comprehensive error handling
 * @version 2.0.0 - Production Security Hardened
 */

(function () {
    // ===================================================================
    //  CONFIGURATION & SECURITY CONSTANTS
    // ===================================================================

    const CONFIG = {
        // Production origin whitelist - CRITICAL SECURITY SETTING
        ALLOWED_ORIGINS: [
            'https://ai8v-inspector.amr-omar304.workers.dev',
            'https://ai8v.com'
        ],
        
        // Development mode detection
        IS_DEV: window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1',
        
        // Timeouts
        IFRAME_LOAD_TIMEOUT: 15000, // 15 seconds
        RETRY_DELAY: 2000,
        
        // UI Messages
        MESSAGES: {
            NO_URL: "Please enter a valid URL in the 'Page URL' field first.",
            LOAD_FAILED: "Failed to load the page inspector. The service may be temporarily unavailable.",
            TIMEOUT: "Inspector loading timed out. The target page may be too large or blocking requests.",
            SERVICE_UNAVAILABLE: "Inspector service is currently unavailable. Please try again later.",
            INVALID_MESSAGE: "Received invalid message from inspector. Connection may be compromised."
        }
    };

    // Add localhost to allowed origins in development
    if (CONFIG.IS_DEV) {
        CONFIG.ALLOWED_ORIGINS.push(
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            window.location.origin
        );
    }

    // ===================================================================
    //  DOM CACHE
    // ===================================================================

    const DOM = {
        inspectorModalEl: null,
        inspectorFrame: null,
        urlInput: null
    };

    // ===================================================================
    //  STATE MANAGEMENT
    // ===================================================================

    let targetInputId = null;
    let modalInstance = null;
    let loadingTimeout = null;
    let isServiceAvailable = true;
    let failedAttempts = 0;
    const MAX_FAILED_ATTEMPTS = 3;

    // ===================================================================
    //  SECURITY FUNCTIONS
    // ===================================================================

    /**
     * Validates message origin against whitelist
     * CRITICAL SECURITY FUNCTION
     */
    function isOriginAllowed(origin) {
        // In development, allow any localhost origin
        if (CONFIG.IS_DEV && origin.includes('localhost')) {
            return true;
        }
        
        return CONFIG.ALLOWED_ORIGINS.some(allowed => 
            origin === allowed || origin.startsWith(allowed)
        );
    }

    /**
     * Validates message structure to prevent injection attacks
     */
    function isValidMessage(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // Check for required type field
        if (!data.type || typeof data.type !== 'string') {
            return false;
        }

        // Validate known message types
        const VALID_TYPES = ['selector-picked', 'inspector-closed', 'inspector-ready'];
        if (!VALID_TYPES.includes(data.type)) {
            console.warn(`Unknown message type: ${data.type}`);
            return false;
        }

        // Type-specific validation
        if (data.type === 'selector-picked') {
            if (!data.selector || typeof data.selector !== 'string') {
                return false;
            }
            // Basic CSS selector validation
            if (data.selector.length > 500) {
                console.warn('Selector suspiciously long');
                return false;
            }
        }

        return true;
    }

    // ===================================================================
    //  UI STATE MANAGEMENT
    // ===================================================================

    /**
     * Disables all inspector buttons when service is unavailable
     */
    function disableInspectorButtons() {
        const buttons = document.querySelectorAll('.btn-inspector');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
            btn.title = "Inspector service temporarily unavailable";
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
    }

    /**
     * Re-enables inspector buttons after service recovery
     */
    function enableInspectorButtons() {
        const buttons = document.querySelectorAll('.btn-inspector');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('disabled');
            btn.title = "Select element from page";
            btn.style.opacity = '';
            btn.style.cursor = '';
        });
    }

    /**
     * Shows loading indicator in iframe
     */
    function showLoadingState() {
        const loadingHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                        font-family: system-ui, -apple-system, sans-serif;
                    }
                    .loader {
                        text-align: center;
                        color: #fbbf24;
                    }
                    .spinner {
                        border: 4px solid rgba(251, 191, 36, 0.1);
                        border-left-color: #fbbf24;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    }
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            </head>
            <body>
                <div class="loader">
                    <div class="spinner"></div>
                    <p>Loading Inspector...</p>
                </div>
            </body>
            </html>
        `;
        
        DOM.inspectorFrame.srcdoc = loadingHTML;
    }

    // ===================================================================
    //  INITIALIZATION
    // ===================================================================

    /**
     * Creates and adds inspector button next to target input
     */
    function addInspectorButton(inputId) {
        const inputEl = document.getElementById(inputId);
        if (!inputEl?.parentElement || inputEl.parentElement.querySelector('.btn-inspector')) {
            return;
        }

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

    /**
     * Initializes all inspector buttons
     */
    function initializeInspectorButtons() {
        const inputIds = [
            // FAQ
            'customFaqItem', 'customFaqQuestion', 'customFaqAnswer',
            // Product
            'customProductPrice', 'customProductCurrency', 'customProductSku', 'customProductBrand',
            'customShippingRate', 'customShippingCountry', 'customReturnDays', 'customReturnFees',
            // Recipe
            'customRecipeContainer', 'customRecipeName', 'customRecipePrepTime', 'customRecipeCookTime',
            'customRecipeIngredients', 'customRecipeInstructions',
            // Review
            'customReviewContainer', 'customReviewRating', 'customReviewItemName',
            // HowTo
            'customHowToName', 'customHowToContainer', 'customHowToStep', 'customHowToText',
            // Breadcrumb
            'customBreadcrumbItem',
            // Event
            'customEventName', 'customEventStartDate', 'customEventLocation', 'customEventOrganizer',
            // Organization
            'customOrgLogo', 'customOrgAddress', 'customOrgTelephone',
            // Video
            'customVideoContainer', 'customVideoName', 'customVideoDesc', 'customVideoThumb',
            'customVideoUrl', 'customVideoDate',
            // Local Business
            'customBizPriceRange', 'customBizOpeningHours',
            // Job Posting
            'customJobContainer', 'customJobTitle', 'customJobDatePosted', 'customJobSalarySelector',
            // Software App
            'customAppContainer', 'customAppName', 'customAppRating', 'customAppPrice',
            'customAppCategory', 'customAppOs',
            // Course
            'customCourseListContainer', 'customCourseItemContainer', 'customCourseName',
            'customCourseDescription', 'customCourseProvider'
        ];

        inputIds.forEach(addInspectorButton);
    }

    // ===================================================================
    //  MODAL LIFECYCLE
    // ===================================================================

    /**
     * Triggered when inspector button is clicked
     */
    function onInspectorButtonClick() {
        const urlToInspect = DOM.urlInput.value.trim();

        // Validation
        if (!urlToInspect || !/^https?:\/\//i.test(urlToInspect)) {
            showToast(CONFIG.MESSAGES.NO_URL, "warning");
            return;
        }

        // Check service availability
        if (!isServiceAvailable) {
            showToast(CONFIG.MESSAGES.SERVICE_UNAVAILABLE, "danger");
            return;
        }

        modalInstance.show();
    }

    /**
     * Modal show event handler - loads inspector
     */
    function onModalShow() {
        const urlToInspect = DOM.urlInput.value.trim();
        
        // Show loading state
        showLoadingState();

        // Build proxy URL
        const proxyUrl = `https://ai8v-inspector.amr-omar304.workers.dev/?url=${encodeURIComponent(urlToInspect)}`;

        // Set loading timeout
        loadingTimeout = setTimeout(() => {
            handleLoadError('timeout');
        }, CONFIG.IFRAME_LOAD_TIMEOUT);

        // Load inspector
        DOM.inspectorFrame.src = proxyUrl;
    }

    /**
     * Modal hidden event handler - cleanup
     */
    function onModalHidden() {
        // Clear timeout
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
            loadingTimeout = null;
        }

        // Reset iframe
        DOM.inspectorFrame.src = 'about:blank';
        targetInputId = null;
    }

    /**
     * Iframe load event handler
     */
    function onFrameLoad() {
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
            loadingTimeout = null;
        }

        // Reset failed attempts on successful load
        failedAttempts = 0;
        if (!isServiceAvailable) {
            isServiceAvailable = true;
            enableInspectorButtons();
            showToast("Inspector service restored", "success");
        }
    }

    /**
     * Iframe error event handler
     */
    function onFrameError() {
        handleLoadError('error');
    }

    /**
     * Centralized error handler
     */
    function handleLoadError(type) {
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
            loadingTimeout = null;
        }

        failedAttempts++;
        
        const message = type === 'timeout' 
            ? CONFIG.MESSAGES.TIMEOUT 
            : CONFIG.MESSAGES.LOAD_FAILED;

        showToast(message, "danger");
        modalInstance.hide();

        // Disable service after repeated failures
        if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
            isServiceAvailable = false;
            disableInspectorButtons();
            console.error(`Inspector service marked unavailable after ${MAX_FAILED_ATTEMPTS} failed attempts`);
        }
    }

    // ===================================================================
    //  MESSAGE HANDLING (SECURED)
    // ===================================================================

    /**
     * SECURED: Handles messages from iframe with origin validation
     */
    function onFrameMessage(event) {
        // SECURITY CHECK 1: Validate origin
        if (!isOriginAllowed(event.origin)) {
            console.warn(`Blocked message from unauthorized origin: ${event.origin}`);
            return;
        }

        // SECURITY CHECK 2: Validate message structure
        if (!isValidMessage(event.data)) {
            console.warn('Blocked invalid message structure');
            showToast(CONFIG.MESSAGES.INVALID_MESSAGE, "warning");
            return;
        }

        // Handle valid messages
        const { type, selector } = event.data;

        if (type === 'selector-picked' && targetInputId) {
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                targetInput.value = selector;
                modalInstance.hide();
                showToast("Selector applied successfully", "success");
            }
        } else if (type === 'inspector-closed') {
            modalInstance.hide();
        } else if (type === 'inspector-ready') {
            // Inspector loaded successfully
            onFrameLoad();
        }
    }

    // ===================================================================
    //  MAIN INITIALIZATION
    // ===================================================================

    document.addEventListener('DOMContentLoaded', function () {
        // Cache DOM elements
        DOM.inspectorModalEl = document.getElementById('inspectorModal');
        DOM.inspectorFrame = document.getElementById('inspectorFrame');
        DOM.urlInput = document.getElementById('urlInput');

        // Validate critical elements
        if (!DOM.inspectorModalEl || !DOM.inspectorFrame || !DOM.urlInput) {
            console.error("Inspector: Required DOM elements not found. Feature disabled.");
            return;
        }

        // Initialize modal
        try {
            modalInstance = new bootstrap.Modal(DOM.inspectorModalEl);
        } catch (error) {
            console.error("Failed to initialize inspector modal:", error);
            return;
        }

        // Attach event listeners
        DOM.inspectorModalEl.addEventListener('show.bs.modal', onModalShow);
        DOM.inspectorModalEl.addEventListener('hidden.bs.modal', onModalHidden);
        DOM.inspectorFrame.addEventListener('load', onFrameLoad);
        DOM.inspectorFrame.addEventListener('error', onFrameError);
        window.addEventListener('message', onFrameMessage);

        // Initialize inspector buttons
        initializeInspectorButtons();

        // Log initialization (remove in production)
        if (CONFIG.IS_DEV) {
            console.log('Inspector initialized in development mode');
            console.log('Allowed origins:', CONFIG.ALLOWED_ORIGINS);
        }
    });

})();