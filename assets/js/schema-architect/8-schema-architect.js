(function () {
    'use strict';

    // ===================================================================
    //  DOM Element Caching & Configuration
    // ===================================================================
    const DOM = {
        analyzeBtn: document.getElementById('analyzeBtn'),
        analysisResults: document.getElementById('analysisResults'),
        generatedCode: document.getElementById('generatedCode'),
        urlInput: document.getElementById('urlInput'),
        htmlContentInput: document.getElementById('htmlContentInput'),
        baseUrlContainer: document.getElementById('baseUrlContainer'),
        baseUrlInput: document.getElementById('baseUrlInput'),
        copyBtn: document.getElementById('copyBtn'),
        downloadBtn: document.getElementById('downloadBtn'),
        validateBtn: document.getElementById('validateBtn'),
        sgePreviewContainer: document.getElementById('sge-preview'),
        sgePreviewContent: document.getElementById('sge-preview-content'),
        copyEnhancedPromptBtn: document.getElementById('copyEnhancedPromptBtn'),

        // Custom selectors
        customFaqItem: document.getElementById('customFaqItem'),
        customFaqQuestion: document.getElementById('customFaqQuestion'),
        customFaqAnswer: document.getElementById('customFaqAnswer'),

        // --- Custom Discovery Selectors (for auto-detection) ---
        customProductImageSelector: document.getElementById('customProductImageSelector'),
        customProductImageOverride: document.getElementById('customProductImageOverride'),
        customProductPrice: document.getElementById('customProductPrice'),
        customProductStrikethroughPrice: document.getElementById('customProductStrikethroughPrice'),
        customProductCurrency: document.getElementById('customProductCurrency'),
        customProductSku: document.getElementById('customProductSku'),
        customProductBrand: document.getElementById('customProductBrand'),
        customProductDescriptionSelector: document.getElementById('customProductDescriptionSelector'),
        customProductDescriptionOverride: document.getElementById('customProductDescriptionOverride'),
        customProductSize: document.getElementById('customProductSize'),
        shippingRate: document.getElementById('customShippingRate'),
        shippingCountry: document.getElementById('customShippingCountry'),
        returnDays: document.getElementById('customReturnDays'),
        returnFees: document.getElementById('customReturnFees'),

        // --- Direct Schema Enhancement Inputs (manual values) ---
        customProductGtin: document.getElementById('customProductGtin'),
        customProductMpn: document.getElementById('customProductMpn'),
        customProductColor: document.getElementById('customProductColor'),
        customProductMaterial: document.getElementById('customProductMaterial'),
        customProductPattern: document.getElementById('customProductPattern'),
        customProductSizeSystem: document.getElementById('customProductSizeSystem'),
        customProductSizeGroup: document.getElementById('customProductSizeGroup'),
        customProductGender: document.getElementById('customProductGender'),
        customProductAgeGroup: document.getElementById('customProductAgeGroup'),
        customHandlingTime: document.getElementById('customHandlingTime'),
        customTransitTime: document.getElementById('customTransitTime'),
        customPriceValidUntil: document.getElementById('customPriceValidUntil'),

        // --- UI Control Elements ---
        productHasVariantsSwitch: document.getElementById('productHasVariantsSwitch'),
        productGroupId: document.getElementById('productGroupId'),
        variesByCheckboxes: document.querySelectorAll('.varies-by-checkbox'),

        customRecipeContainer: document.getElementById('customRecipeContainer'),
        customRecipeName: document.getElementById('customRecipeName'),
        customRecipePrepTime: document.getElementById('customRecipePrepTime'),
        customRecipeCookTime: document.getElementById('customRecipeCookTime'),
        customRecipeIngredients: document.getElementById('customRecipeIngredients'),
        customRecipeInstructions: document.getElementById('customRecipeInstructions'),

        customReviewContainer: document.getElementById('customReviewContainer'),
        customReviewRating: document.getElementById('customReviewRating'),
        customReviewItemName: document.getElementById('customReviewItemName'),
        customReviewPros: document.getElementById('customReviewPros'),
        customReviewCons: document.getElementById('customReviewCons'),
        customReviewCount: document.getElementById('customReviewCount'),

        customHowToContainer: document.getElementById('customHowToContainer'),
        customHowToName: document.getElementById('customHowToName'),
        customHowToStep: document.getElementById('customHowToStep'),
        customHowToText: document.getElementById('customHowToText'),

        customBreadcrumbItem: document.getElementById('customBreadcrumbItem'),

        customEventName: document.getElementById('customEventName'),
        customEventStartDate: document.getElementById('customEventStartDate'),
        customEventLocation: document.getElementById('customEventLocation'),
        customEventOrganizer: document.getElementById('customEventOrganizer'),

        customOrgLogo: document.getElementById('customOrgLogo'),
        customOrgAddress: document.getElementById('customOrgAddress'),
        customOrgTelephone: document.getElementById('customOrgTelephone'),

        customLocalBusinessPriceRange: document.getElementById('customBizPriceRange'),
        customLocalBusinessOpeningHours: document.getElementById('customBizOpeningHours'),

        customVideoContainer: document.getElementById('customVideoContainer'),
        customVideoName: document.getElementById('customVideoName'),
        customVideoDescription: document.getElementById('customVideoDesc'),
        customVideoThumbnail: document.getElementById('customVideoThumb'),
        customVideoUrl: document.getElementById('customVideoUrl'),
        customVideoDate: document.getElementById('customVideoDate'),

        customJobContainer: document.getElementById('customJobContainer'),
        customJobTitle: document.getElementById('customJobTitle'),
        customJobDatePosted: document.getElementById('customJobDatePosted'),
        customJobIdentifier: document.getElementById('customJobIdentifier'),
        customJobLocationType: document.getElementById('customJobLocationType'),
        physicalLocationFields: document.getElementById('physicalLocationFields'),
        remoteLocationFields: document.getElementById('remoteLocationFields'),
        customJobStreetAddress: document.getElementById('customJobStreetAddress'),
        customJobAddressLocality: document.getElementById('customJobAddressLocality'),
        customJobAddressRegion: document.getElementById('customJobAddressRegion'),
        customJobPostalCode: document.getElementById('customJobPostalCode'),
        customJobAddressCountry: document.getElementById('customJobAddressCountry'),
        customJobApplicantCountry: document.getElementById('customJobApplicantCountry'),
        customJobSalarySelector: document.getElementById('customJobSalarySelector'),
        customJobSalaryValue: document.getElementById('customJobSalaryValue'),
        customJobValidThrough: document.getElementById('customJobValidThrough'),
        customJobEmploymentType: document.getElementById('customJobEmploymentType'),
        customJobExperienceSelector: document.getElementById('customJobExperienceSelector'),
        customJobExperienceValue: document.getElementById('customJobExperienceValue'),
        customJobEducationSelector: document.getElementById('customJobEducationSelector'),
        customJobEducationValue: document.getElementById('customJobEducationValue'),
        customJobDirectApply: document.getElementById('customJobDirectApply'),

        customAppContainer: document.getElementById('customAppContainer'),
        customAppName: document.getElementById('customAppName'),
        customAppRating: document.getElementById('customAppRating'),
        customAppPrice: document.getElementById('customAppPrice'),
        customAppCategory: document.getElementById('customAppCategory'),
        customAppOperatingSystem: document.getElementById('customAppOs'),

        customCourseListContainer: document.getElementById('customCourseListContainer'),
        customCourseItemContainer: document.getElementById('customCourseItemContainer'),
        customCourseName: document.getElementById('customCourseName'),
        customCourseDescription: document.getElementById('customCourseDescription'),
        customCourseProvider: document.getElementById('customCourseProvider'),
        customCourseCode: document.getElementById('customCourseCode'),
        customCoursePrice: document.getElementById('customCoursePrice'),
        customCourseCurrency: document.getElementById('customCourseCurrency'),
        customCourseCredential: document.getElementById('customCourseCredential'),
        customCoursePrerequisites: document.getElementById('customCoursePrerequisites'),
        customCourseStartDate: document.getElementById('customCourseStartDate'),
        customCourseEndDate: document.getElementById('customCourseEndDate'),
        customCourseLocation: document.getElementById('customCourseLocation'),
        customCourseMode: document.getElementById('customCourseMode'),
        customCourseInstructor: document.getElementById('customCourseInstructor'),
        customCourseInstanceContainer: document.getElementById('customCourseInstanceContainer'),
    };

    let selectedPrimaryType = null;

    /**
     * State object to track manual edits
     */
    const manualEditState = {
        isManuallyEdited: false,
        lastManualContent: null,
        lastGeneratedContent: null
    };

    // ===================================================================
    //  Utility Functions (Toolbox) | (Defensive Programming)
    // ===================================================================

    /**
     * Safely parses JSON string with error handling
     * @param {string} jsonString - JSON string to parse
     * @returns {Object} Parsed object or empty object on error
     */
    function safeJsonParse(jsonString) {
        try {
            return jsonString ? JSON.parse(jsonString) : {};
        } catch (error) {
            console.warn("Could not parse JSON from localStorage. Data might be corrupt.", error);
            return {};
        }
    }

    /**
     * Safely executes querySelectorAll with error handling
     * @param {Document|Element} scope - Element to query within
     * @param {string} selector - CSS selector
     * @returns {Element[]} Array of found elements
     */
    function safeQuerySelectorAll(scope, selector) {
        if (!scope || !selector) return [];
        try {
            return Array.from(scope.querySelectorAll(selector));
        } catch (error) {
            console.warn(`Invalid CSS selector ignored: "${selector}"`, error);
            return [];
        }
    }

    /**
     * Safely executes querySelector with error handling
     * @param {Document|Element} scope - Element to query within
     * @param {string} selector - CSS selector
     * @returns {Element|null} Found element or null
     */
    function safeQuerySelector(scope, selector) {
        if (!scope || !selector) return null;
        try {
            return scope.querySelector(selector);
        } catch (error) {
            console.warn(`Invalid CSS selector ignored: "${selector}"`, error);
            return null;
        }
    }

    /**
     * Gets selector from input or uses default
     * @param {HTMLInputElement} inputElement - Input element
     * @param {string} defaultSelector - Default selector
     * @returns {string} Selected or default selector
     */
    function getSelector(inputElement, defaultSelector) {
        return inputElement && inputElement.value.trim() ? inputElement.value.trim() : defaultSelector;
    }

    /**
     * Converts time text to ISO duration format
     * @param {string} text - Time text (e.g., "1 hour 30 minutes")
     * @returns {string|null} ISO duration or null
     */
    function convertToISODuration(text) {
        if (!text) return null;
        let hours = 0;
        let minutes = 0;
        const hourRegex = /(\d+)\s*(ساعة|ساعات|hour|hours)/i;
        const minuteRegex = /(\d+)\s*(دقيقة|دقائق|minute|minutes)/i;
        const hourMatch = text.match(hourRegex);
        const minuteMatch = text.match(minuteRegex);
        if (hourMatch) hours = parseInt(hourMatch[1], 10);
        if (minuteMatch) minutes = parseInt(minuteMatch[1], 10);
        if (!hourMatch && !minuteMatch && /^\d+$/.test(text.trim())) {
            minutes = parseInt(text.trim(), 10);
        }
        if (hours === 0 && minutes === 0) return null;
        let duration = 'PT';
        if (hours > 0) duration += `${hours}H`;
        if (minutes > 0) duration += `${minutes}M`;
        return duration;
    }

    /**
     * Safely extracts an absolute URL from an element or its child 'a' tag.
     * @param {Element} el - The element to search in.
     * @param {Document} doc - The document context for resolving the base URI.
     * @returns {string|null} The absolute URL or null if not found or invalid.
     */
    function getSafeUrl(el, doc) {
        if (!el) return null;

        // Check if the element itself is the link
        let linkTag = el.tagName === 'A' ? el : safeQuerySelector(el, 'a');

        if (linkTag) {
            const href = linkTag.getAttribute('href');
            if (href && href.trim() !== '' && href.trim() !== '#') {
                try {
                    return new URL(href, doc.baseURI).href;
                } catch (e) {
                    console.warn('Could not construct a valid URL from href:', href, e);
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * Determines if a provider name refers to a Person or an Organization.
     * @param {string} name - The name of the provider.
     * @returns {string} "Person" or "Organization".
     */
    function getProviderType(name) {
        if (!name) return 'Organization'; // Default case

        const lowerCaseName = name.toLowerCase();
        const personKeywords = ['prof', 'dr.', 'mr.', 'mrs.', 'ms.'];
        const orgKeywords = ['university', 'company', 'co.', 'college', 'school', 'academy', 'institute', 'inc.', 'ltd.'];

        // Check for person titles first as they are strong indicators
        if (personKeywords.some(keyword => lowerCaseName.startsWith(keyword))) {
            return 'Person';
        }

        // Check for organization keywords
        if (orgKeywords.some(keyword => lowerCaseName.includes(keyword))) {
            return 'Organization';
        }

        // A simple check for a two-part or three-part name is a strong indicator of a Person.
        // We check this AFTER checking for organization keywords.
        const wordCount = name.trim().split(/\s+/).length;
        if (wordCount >= 2 && wordCount <= 3) {
            return 'Person';
        }


        // Default to Organization for anything else (e.g., company names)
        return 'Organization';
    }

    /**
     * Sanitizes HTML to prevent XSS
     * @param {string} str - String to sanitize
     * @returns {string} Sanitized string
     */
    function escapeHtml(str) {
        if (!str) return '';
        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    // Note: showToast is now correctly loaded from its own file.

    // ===================================================================
    //   MANUAL EDIT FUNCTIONS
    // ===================================================================

    /**
     * Detects if user has manually edited the textarea
     */
    function detectManualEdit() {
        const currentContent = DOM.generatedCode.value.trim();

        // Only detect if we have a baseline to compare against
        if (!manualEditState.lastGeneratedContent) {
            return;
        }

        // If content changed and it's not what we last generated
        if (currentContent &&
            currentContent !== manualEditState.lastGeneratedContent) {

            manualEditState.isManuallyEdited = true;
            manualEditState.lastManualContent = currentContent;

            // Visual indicator
            DOM.generatedCode.style.borderLeft = '4px solid #fbbf24';
            DOM.generatedCode.title = 'Manually edited - changes will be preserved on next update';

            showToast('Manual edits detected and will be preserved', 'info');
        }
    }

    /**
    * Intelligently merges manual edits with new generation
    * @param {Object} newSchema - Newly generated schema
    * @param {string} manualContent - User's manual JSON string
    * @returns {Object} Merged schema
    */
    function smartMerge(newSchema, manualContent) {
        try {
            const manualObj = JSON.parse(manualContent);
            const merged = deepMergePreserveManual(newSchema, manualObj);
            return merged;
        } catch (error) {
            console.warn('Manual content is not valid JSON, cannot merge:', error);
            showToast('Manual edits contain invalid JSON - using generated schema', 'warning');
            return newSchema;
        }
    }

    /**
     * Deep merge that preserves manual additions
     * Strategy: New schema takes precedence for existing keys,
     * but manual additions not in new schema are preserved
     * @param {Object} target - New generated schema
     * @param {Object} manual - User's manual edits
     * @returns {Object} Merged object
     */
    function deepMergePreserveManual(target, manual) {
        const result = JSON.parse(JSON.stringify(target)); // Deep clone

        for (const key in manual) {
            if (!manual.hasOwnProperty(key)) continue;

            // Skip @context and @type as they should always come from new schema
            if (key === '@context' || key === '@type') continue;

            // If key doesn't exist in new schema, preserve it from manual
            if (!(key in result)) {
                result[key] = manual[key];
                console.log(`Preserved manual property: ${key}`);
            }
            // If both are objects (and not arrays), recursively merge
            else if (typeof result[key] === 'object' &&
                typeof manual[key] === 'object' &&
                !Array.isArray(result[key]) &&
                result[key] !== null &&
                manual[key] !== null) {
                result[key] = deepMergePreserveManual(result[key], manual[key]);
            }
            // For arrays and primitives, prefer new schema (as it's from updated UI state)
        }

        return result;
    }

    /**
     * Resets manual edit state (called on new analysis)
     */
    function resetManualEditState() {
        manualEditState.isManuallyEdited = false;
        manualEditState.lastManualContent = null;
        manualEditState.lastGeneratedContent = null;

        // Remove visual indicators
        DOM.generatedCode.style.borderLeft = '';
        DOM.generatedCode.title = '';

        // Update editability
        updateTextareaEditability();
    }

    /**
     * Controls whether textarea is editable based on state
     */
    function updateTextareaEditability() {
        // Only make readonly if no schema has been generated yet
        if (!manualEditState.lastGeneratedContent) {
            DOM.generatedCode.setAttribute('readonly', 'true');
            DOM.generatedCode.style.cursor = 'not-allowed';
            DOM.generatedCode.style.color = 'var(--bs-secondary-color)';
        } else {
            DOM.generatedCode.removeAttribute('readonly');
            DOM.generatedCode.style.cursor = 'text';
            DOM.generatedCode.style.color = 'var(--bs-body-color)';
        }
    }

    /**
    * Collects all manual overrides from UI inputs, intelligently distinguishing
    * between direct values and CSS selectors, and injects them into the entities array.
    * @param {Array} entities - The current array of discovered entities.
    * @param {Document} doc - The document context for resolving selectors.
    * @returns {Array} The new array of entities with manual overrides applied.
    */
    function applyManualOverrides(entities, doc) {
        const manualOverrides = [
            // ========== Product Fields ==========

            // --- Fields that expect a CSS SELECTOR ---
            { el: DOM.customProductPrice, name: 'Manual Price', prop: 'price', type: 'Product', sourceType: 'selector' },
            { el: DOM.customProductStrikethroughPrice, name: 'Manual Original Price', prop: 'strikethroughPrice', type: 'Product', sourceType: 'selector' },
            { el: DOM.customProductCurrency, name: 'Manual Currency', prop: 'priceCurrency', type: 'Product', sourceType: 'selector' },
            { el: DOM.customProductSku, name: 'Manual SKU', prop: 'sku', type: 'Product', sourceType: 'selector' },
            { el: DOM.customProductBrand, name: 'Manual Brand', prop: 'brand', type: 'Product', sourceType: 'selector' },
            { el: DOM.customProductSize, name: 'Manual Size', prop: 'size', type: 'Product', sourceType: 'selector' },
            { el: DOM.shippingRate, name: 'Manual Shipping Rate', prop: 'shippingRate', type: 'Product', sourceType: 'selector' },
            { el: DOM.shippingCountry, name: 'Manual Shipping Country', prop: 'shippingCountry', type: 'Product', sourceType: 'selector' },
            { el: DOM.returnDays, name: 'Manual Return Days', prop: 'returnDays', type: 'Product', sourceType: 'selector' },
            { el: DOM.returnFees, name: 'Manual Return Fees', prop: 'returnFees', type: 'Product', sourceType: 'selector' },

            // --- Fields that expect a direct VALUE ---
            { el: DOM.customProductGtin, name: 'Manual GTIN', prop: 'gtin', type: 'Product', sourceType: 'value' },
            { el: DOM.customProductMpn, name: 'Manual MPN', prop: 'mpn', type: 'Product', sourceType: 'value' },
            { el: DOM.customProductColor, name: 'Manual Color', prop: 'color', type: 'Product', sourceType: 'value' },
            { el: DOM.customProductMaterial, name: 'Manual Material', prop: 'material', type: 'Product', sourceType: 'value' },
            { el: DOM.customProductPattern, name: 'Manual Pattern', prop: 'pattern', type: 'Product', sourceType: 'value' },
            { el: DOM.customProductSizeSystem, name: 'Manual Size System', prop: 'sizeSystem', type: 'Product', sourceType: 'value' },
            { el: DOM.customProductSizeGroup, name: 'Manual Size Group', prop: 'sizeGroup', type: 'Product', sourceType: 'value' },
            { el: DOM.customProductGender, name: 'Manual Gender', prop: 'gender', type: 'Product', sourceType: 'value' },
            { el: DOM.customProductAgeGroup, name: 'Manual Age Group', prop: 'ageGroup', type: 'Product', sourceType: 'value' },
            { el: DOM.customHandlingTime, name: 'Manual Handling Time', prop: 'handlingTime', type: 'Product', sourceType: 'value' },
            { el: DOM.customTransitTime, name: 'Manual Transit Time', prop: 'transitTime', type: 'Product', sourceType: 'value' },
            { el: DOM.customPriceValidUntil, name: 'Manual Price Valid Until', prop: 'priceValidUntil', type: 'Product', sourceType: 'value' },

            // ========== Job Posting Fields ==========
            { el: DOM.customJobIdentifier, name: 'Manual Job ID', prop: 'identifier', type: 'JobPosting', sourceType: 'selector' },
            { el: DOM.customJobSalaryValue, name: 'Manual Salary', prop: 'baseSalary', type: 'JobPosting', sourceType: 'value' },
            { el: DOM.customJobExperienceValue, name: 'Manual Experience Months', prop: 'experienceRequirements', type: 'JobPosting', sourceType: 'value' },
            { el: DOM.customJobEducationValue, name: 'Manual Education Level', prop: 'educationRequirements', type: 'JobPosting', sourceType: 'value' },
        ];

        let updatedEntities = [...entities];

        manualOverrides.forEach(({ el, name, prop, type, sourceType }) => {
            if (!el) {
                return;
            }
            const inputValue = el?.value?.trim();
            if (!inputValue) return;

            let finalValue = null;

            if (sourceType === 'selector') {
                const targetEl = safeQuerySelector(doc, inputValue);
                if (targetEl) {
                    finalValue = targetEl.textContent.trim().replace(/\s+/g, ' ');
                }
            } else {
                finalValue = inputValue;
            }

            if (finalValue) {
                updatedEntities = updatedEntities.filter(e => !(e.schemaProp === prop && e.type === type));

                updatedEntities.push({
                    name: name,
                    value: finalValue,
                    schemaProp: prop,
                    type: type,
                    source: 'manual'
                });
            }
        });

        return updatedEntities;
    }

    // ===================================================================
    //  ANALYSIS & SCHEMA GENERATION FUNCTIONS (The Core Logic)
    // ===================================================================

    /**
     * Main content analysis function
     * @param {string} html - HTML content to analyze
     * @param {string} baseUrl - Base URL for resolving relative URLs
     * @returns {Array} Array of discovered entities
     */
    function analyzeContent(html, baseUrl) {
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // Set base URL if provided
        if (baseUrl) {
            let base = doc.querySelector('base');
            if (!base) {
                base = doc.createElement('base');
                doc.head.appendChild(base);
            }
            base.href = baseUrl;
        }

        // Collect all entities
        let entities = [
            ...analyzePrimaryEntities(doc),
            ...analyzeProductEntities(doc),
            ...analyzeReviewEntities(doc),
            ...analyzeEventEntities(doc),
            ...analyzeOrganizationEntities(doc),
            ...analyzeHowToEntities(doc),
            ...analyzeRecipeEntities(doc),
            ...analyzeFaqEntities(doc),
            ...analyzeBreadcrumbEntities(doc),
            ...analyzeVideoEntities(doc),
            ...analyzeLocalBusinessEntities(doc),
            ...analyzeJobPostingEntities(doc),
            ...analyzeSoftwareAppEntities(doc),
            ...analyzeCourseEntities(doc)
        ];

        // Add page title if not already present
        const pageTitle = doc.querySelector('title')?.textContent.trim();
        if (pageTitle && !entities.some(e => e.schemaProp === 'name')) {
            entities.push({ name: 'عنوان الصفحة (Title)', value: pageTitle, schemaProp: 'name' });
        }

        // Apply manual overrides at the very end
        entities = applyManualOverrides(entities, doc);

        return entities;
    }

    /**
     * Finds closest heading to an element
     * @param {Element} element - Starting element
     * @returns {string|null} Heading text or null
     */
    function findClosestHeading(element) {
        const container = element.closest('section, article');
        if (container) {
            const heading = container.querySelector('h2, h3');
            if (heading) return heading.textContent.trim();
        }

        let current = element;
        while (current) {
            let sibling = current.previousElementSibling;
            while (sibling) {
                if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(sibling.tagName)) {
                    return sibling.textContent.trim();
                }
                sibling = sibling.previousElementSibling;
            }
            current = current.parentElement;
            if (current && current.tagName === 'BODY') break;
        }
        return null;
    }

    /**
     * Analyzes primary page entities (title, description, etc.)
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzePrimaryEntities(doc) {
        const entities = [];

        // Main headline
        const headline = safeQuerySelector(doc, 'h1')?.textContent.trim();
        if (headline) entities.push({ name: 'Main Headline (H1)', value: headline, schemaProp: 'name' });

        // Meta description
        const description = safeQuerySelector(doc, 'meta[name="description"]')?.content;
        if (description) entities.push({ name: 'Meta Description', value: description, schemaProp: 'description' });

        // OG image
        const image = safeQuerySelector(doc, 'meta[property="og:image"]')?.content;
        if (image) entities.push({ name: 'Main Image (OG)', value: image, schemaProp: 'image' });

        // Author
        const author = safeQuerySelector(doc, '.author, [rel="author"], a[href*="/author/"]')?.textContent.trim();
        if (author) entities.push({ name: 'Author', value: author, schemaProp: 'author', type: 'Article' });

        // Publication date
        const dateEl = safeQuerySelector(doc, 'time, [itemprop="datePublished"]');
        if (dateEl) {
            const date = dateEl.getAttribute('datetime') || dateEl.getAttribute('content') || dateEl.textContent;
            const dateObj = new Date(date);
            const displayDate = !isNaN(dateObj) ?
                dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) :
                date;
            entities.push({
                name: 'Publication Date',
                value: displayDate,
                schemaProp: 'datePublished',
                rawValue: dateObj.toISOString(),
                type: 'Article'
            });
        }

        return entities;
    }

    /**
 * Analyzes breadcrumb entities using the central selectors dictionary.
 * @param {Document} doc - Document to analyze
 * @returns {Array} Array of entities
 */
    function analyzeBreadcrumbEntities(doc) {
        const itemSelector = getSelector(DOM.customBreadcrumbItem, DEFAULT_SELECTORS.Breadcrumb.b1_item);
        const items = safeQuerySelectorAll(doc, itemSelector);

        if (items.length > 1) {
            const breadcrumbItems = items.map(item => {
                const name = escapeHtml(item.textContent.trim());
                const url = getSafeUrl(item, doc);
                return { name, url };
            }).filter(i => i.name);

            if (breadcrumbItems.length > 1) {
                return [{
                    name: 'Breadcrumb Trail',
                    value: breadcrumbItems.map(i => i.name).join(' > '),
                    schemaProp: 'itemListElement',
                    type: 'Breadcrumb',
                    rawValue: breadcrumbItems
                }];
            }
        }
        return [];
    }

    /**
 * Analyzes FAQ entities using the central selectors dictionary.
 * @param {Document} doc - Document to analyze
 * @returns {Array} Array of entities
 */
    function analyzeFaqEntities(doc) {
        const itemSelector = getSelector(DOM.customFaqItem, DEFAULT_SELECTORS.FAQPage.f1_faqContainer);
        const questionSelector = getSelector(DOM.customFaqQuestion, DEFAULT_SELECTORS.FAQPage.f2_questionSelector);
        const answerSelector = getSelector(DOM.customFaqAnswer, DEFAULT_SELECTORS.FAQPage.f3_answerSelector);

        const items = safeQuerySelectorAll(doc, itemSelector);
        if (items.length === 0) return [];

        const questions = items.map(item => ({
            q: safeQuerySelector(item, questionSelector)?.textContent.trim(),
            a: safeQuerySelector(item, answerSelector)?.textContent.trim()
        })).filter(i => i.q && i.a);

        if (questions.length > 0) {
            const contextualName = findClosestHeading(items[0]);
            return [{
                name: contextualName || 'Frequently Asked Questions',
                value: `${questions.length} Q&A pair${questions.length > 1 ? 's' : ''} found`,
                schemaProp: 'mainEntity',
                type: 'FAQ',
                rawValue: questions,
                contextualName
            }];
        }
        return [];
    }

    /**
     * Detects active price vs strikethrough price intelligently
     * @param {Element} scope - Container to search within
     * @param {string} priceSelector - CSS selector for prices
     * @returns {Object} { activePrice, strikethroughPrice }
     */
    function detectSmartPricing(scope, priceSelector) {
        const priceElements = safeQuerySelectorAll(scope, priceSelector);

        if (priceElements.length === 0) return { activePrice: null, strikethroughPrice: null };
        if (priceElements.length === 1) return { activePrice: priceElements[0], strikethroughPrice: null };

        // Strategy 1: Visual styling (most reliable)
        const strikePrices = priceElements.filter(el => {
            const style = window.getComputedStyle(el);
            return style.textDecoration.includes('line-through') ||
                style.textDecorationLine === 'line-through' ||
                ['DEL', 'S', 'STRIKE'].includes(el.tagName);
        });

        if (strikePrices.length > 0) {
            const activePrices = priceElements.filter(el => !strikePrices.includes(el));
            return {
                activePrice: activePrices[0] || null,
                strikethroughPrice: strikePrices[0]
            };
        }

        // Strategy 2: Class/ID keywords
        const oldPriceKeywords = ['old', 'was', 'regular', 'list', 'original', 'before', 'strike'];
        const newPriceKeywords = ['sale', 'current', 'now', 'offer', 'special', 'promo'];

        let oldPrice = null;
        let newPrice = null;

        priceElements.forEach(el => {
            const identifier = (el.className + ' ' + el.id).toLowerCase();
            if (oldPriceKeywords.some(kw => identifier.includes(kw))) {
                oldPrice = el;
            } else if (newPriceKeywords.some(kw => identifier.includes(kw))) {
                newPrice = el;
            }
        });

        if (oldPrice && newPrice) {
            return { activePrice: newPrice, strikethroughPrice: oldPrice };
        }

        // Strategy 3: Numerical comparison (fallback)
        if (priceElements.length === 2) {
            const extractPrice = (el) => {
                const text = el.textContent.trim();
                const match = text.match(/[\d,]+\.?\d*/);
                return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
            };

            const price1 = extractPrice(priceElements[0]);
            const price2 = extractPrice(priceElements[1]);

            if (price1 > 0 && price2 > 0 && price1 !== price2) {
                return price1 > price2
                    ? { activePrice: priceElements[1], strikethroughPrice: priceElements[0] }
                    : { activePrice: priceElements[0], strikethroughPrice: priceElements[1] };
            }
        }

        // Default: first element is active price
        return { activePrice: priceElements[0], strikethroughPrice: null };
    }

    /**
     * Smart element search with local priority and global fallback
     * @param {Element} localScope - Local container to search first
     * @param {Document} globalScope - Global document for fallback
     * @param {string} selector - CSS selector
     * @param {boolean} preferGlobal - Force global search for site-wide data
     * @returns {Element|null}
     */
    function smartQuerySelector(localScope, globalScope, selector, preferGlobal = false) {
        if (preferGlobal || !localScope) {
            return safeQuerySelector(globalScope, selector);
        }

        // Try local first
        const localResult = safeQuerySelector(localScope, selector);
        if (localResult) {
            return localResult;
        }

        // Fallback to global
        return safeQuerySelector(globalScope, selector);
    }


    // ==========================================================
    //  PRODUCT ENTITY ANALYSIS HELPERS
    // ==========================================================

    /**
     * [HELPER] Extracts the product name and description.
     * @param {Element} scope - The DOM scope to search within.
     * @param {Document} doc - The document object.
     * @returns {Array} An array of name and description entities.
     */
    function _extractProductNameAndDescription(scope, doc) {
        const entities = [];
        const nameSelector = getSelector(null, DEFAULT_SELECTORS.Product.p_name);
        const nameEl = safeQuerySelector(scope, nameSelector);
        if (nameEl) {
            const contextualName = nameEl.textContent.trim();
            if (contextualName) {
                entities.push({
                    name: 'Contextual Name',
                    value: contextualName,
                    schemaProp: 'contextualName',
                    type: 'Product'
                });
            }
        }

        const descriptionSelector = getSelector(DOM.customProductDescriptionSelector, DEFAULT_SELECTORS.Product.p_description);
        const descriptionEl = smartQuerySelector(scope, doc, descriptionSelector);
        if (descriptionEl) {
            entities.push({
                name: 'Product Description',
                value: descriptionEl.textContent.trim(),
                schemaProp: 'description',
                type: 'Product'
            });
        }
        return entities;
    }

    /**
     * [HELPER] Extracts all product images with advanced logic.
     * @param {Element} scope - The DOM scope to search within.
     * @param {Document} doc - The document object.
     * @returns {Array} An array containing a single image entity (with rawValue as an array of URLs).
     */
    function _extractProductImages(scope, doc) {
        const collected = [];
        let orderCounter = 0;
        const imageSelector = getSelector(DOM.customProductImageSelector, DEFAULT_SELECTORS.Product.p_image);
        let candidates = [];
        const userSel = (DOM.customProductImageSelector && DOM.customProductImageSelector.value.trim()) || null;

        if (userSel) {
            candidates = Array.from(safeQuerySelectorAll(scope, userSel));
            if (candidates.length > 0 && candidates[0].tagName && !['IMG', 'PICTURE', 'SOURCE'].includes(candidates[0].tagName.toUpperCase())) {
                const imgsFromContainers = [];
                candidates.forEach(c => imgsFromContainers.push(...Array.from(safeQuerySelectorAll(c, 'img'))));
                if (imgsFromContainers.length > 0) candidates = imgsFromContainers;
            }
        }
        if (!candidates || candidates.length === 0) {
            candidates = Array.from(safeQuerySelectorAll(scope, DEFAULT_SELECTORS.Product.p_image));
        }

        function tryAddUrl(rawUrl, priority) {
            if (!rawUrl) return;
            try {
                const parts = rawUrl.split(',').map(p => p.trim()).filter(Boolean);
                parts.forEach(part => {
                    const urlToken = part.split(/\s+/)[0];
                    if (urlToken) {
                        const abs = new URL(urlToken, doc.baseURI).href;
                        collected.push({ url: abs, priority: priority || 99, order: orderCounter++ });
                    }
                });
            } catch (e) { /* ignore invalid URL */ }
        }

        const processedPictures = new WeakSet();
        candidates.forEach(candidate => {
            try {
                if (!candidate || !candidate.tagName) return;
                const tag = candidate.tagName.toUpperCase();

                if (tag === 'IMG') {
                    const picture = candidate.closest ? candidate.closest('picture') : null;
                    if (picture && !processedPictures.has(picture)) {
                        processedPictures.add(picture);
                        const mainImgSrc = candidate.getAttribute('src') || candidate.getAttribute('data-src') || candidate.getAttribute('data-lazy-src') || candidate.getAttribute('data-srcset') || candidate.getAttribute('data-original');
                        if (mainImgSrc && !mainImgSrc.startsWith('data:image')) tryAddUrl(mainImgSrc, 1);
                        const imgSrcset = candidate.getAttribute('srcset') || candidate.getAttribute('data-srcset');
                        if (imgSrcset) tryAddUrl(imgSrcset, 2);
                        Array.from(picture.querySelectorAll('source[srcset]')).forEach(srcEl => tryAddUrl(srcEl.getAttribute('srcset'), 2));
                    } else if (!picture) {
                        const mainSrc = candidate.getAttribute('src') || candidate.getAttribute('data-src') || candidate.getAttribute('data-lazy-src') || candidate.getAttribute('data-original');
                        if (mainSrc && !mainSrc.startsWith('data:image')) tryAddUrl(mainSrc, 3);
                        const srcset = candidate.getAttribute('srcset') || candidate.getAttribute('data-srcset');
                        if (srcset) tryAddUrl(srcset, 3);
                    }
                } else if (candidate.querySelectorAll) {
                    const imgsInside = Array.from(candidate.querySelectorAll('img'));
                    if (imgsInside.length > 0) {
                        imgsInside.forEach(imgEl => {
                             const main = imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || imgEl.getAttribute('data-lazy-src') || imgEl.getAttribute('data-original');
                             if (main && !main.startsWith('data:image')) tryAddUrl(main, 3);
                        });
                    }
                }
            } catch (err) { console.warn('Image candidate processing error:', err); }
        });

        if (collected.length === 0) {
             const fallbackImg = safeQuerySelector(scope, 'img');
             if (fallbackImg) {
                 const fsrc = fallbackImg.getAttribute('src') || fallbackImg.getAttribute('data-src');
                 if (fsrc && !fsrc.startsWith('data:image')) tryAddUrl(fsrc, 3);
             }
        }

        const map = new Map();
        collected.sort((a, b) => a.priority - b.priority || a.order - b.order).forEach(item => {
            if (!map.has(item.url)) map.set(item.url, item);
        });
        const finalImageUrls = Array.from(map.keys());

        if (finalImageUrls.length === 0) {
            const og = doc.querySelector('meta[property="og:image"], meta[name="og:image"]');
            if (og && og.content) {
                try { finalImageUrls.push(new URL(og.content, doc.baseURI).href); } catch (e) { /* ignore */ }
            }
        }

        if (finalImageUrls.length > 0) {
            return [{
                name: 'Product Image(s)',
                value: finalImageUrls.join(','),
                schemaProp: 'image',
                type: 'Product',
                rawValue: finalImageUrls
            }];
        }
        return [];
    }

    /**
     * [HELPER] Extracts product pricing, including regular and strikethrough prices.
     * @param {Element} scope - The DOM scope to search within.
     * @param {Array} priceElements - Pre-queried elements that might contain a price.
     * @returns {Array} An array of price-related entities.
     */
    function _extractProductPricing(scope, priceElements) {
        const entities = [];
        if (priceElements.length > 0) {
            const expandedPriceSelectors = `
                .product-price, .price, .sale-price, .current-price, .now-price,
                .price-current, .price-now, .price-sale, .price-offer,
                .price-old, .price-was, .original-price, .regular-price,
                [itemprop="price"], [class*="price"], [class*="سعر"]
            `.replace(/\s+/g, ' ').trim();
            const { activePrice, strikethroughPrice } = detectSmartPricing(scope, expandedPriceSelectors);

            if (activePrice) {
                let priceText = activePrice.textContent.trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
                const priceMatch = priceText.match(/[\d,]+\.?\d*/);
                if (priceMatch) {
                    const price = priceMatch[0].replace(/,/g, '');
                    entities.push({ name: 'Price', value: price, schemaProp: 'price', type: 'Product' });
                    const inferredCurrency = inferCurrency(priceText);
                    if (inferredCurrency) {
                        entities.push({ name: 'Currency', value: inferredCurrency, schemaProp: 'priceCurrency', type: 'Product' });
                    }
                }
            }

            if (strikethroughPrice) {
                let priceText = strikethroughPrice.textContent.trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
                const priceMatch = priceText.match(/[\d,]+\.?\d*/);
                if (priceMatch) {
                    const originalPrice = priceMatch[0].replace(/,/g, '');
                    entities.push({ name: 'Original Price', value: originalPrice, schemaProp: 'strikethroughPrice', type: 'Product' });
                }
            }
        }
        return entities;
    }

    /**
     * [HELPER] Extracts product brand and SKU.
     * @param {Element} scope - The DOM scope to search within.
     * @param {Document} doc - The document object.
     * @param {Element} brandContainerEl - Pre-queried brand container element.
     * @param {Element} skuEl - Pre-queried SKU element.
     * @returns {Array} An array of brand and SKU entities.
     */
    function _extractBrandAndSku(scope, doc, brandContainerEl, skuEl) {
        const entities = [];
        function extractBrandName(el) {
            if (!el) return null;
            let brandText = '';
            const specificChild = el.querySelector('strong, b, a, span[itemprop="brand"], meta[itemprop="brand"]');
            brandText = (specificChild ? (specificChild.content || specificChild.textContent) : el.textContent).trim();
            const prefixPattern = /^(by|brand|from|made by|manufacturer|produced by|العلامة التجارية|من إنتاج|صنع في|براند|ماركة)[\s:：]+/i;
            brandText = brandText.replace(prefixPattern, '').trim().replace(/\s+(Inc\.|LLC|Ltd\.|Co\.|S\.A\.|GmbH|有限会社)$/i, '').trim().replace(/\s{2,}/g, ' ');
            if (!brandText || brandText.length < 2 || brandText.length > 100) return null;
            return brandText;
        }

        if (brandContainerEl) {
            const cleanedBrand = extractBrandName(brandContainerEl);
            if (cleanedBrand) {
                entities.push({ name: 'Brand', value: cleanedBrand, schemaProp: 'brand', type: 'Product' });
            }
        } else {
            const metaBrand = doc.querySelector('meta[itemprop="brand"], meta[property="product:brand"]');
            if (metaBrand?.content) {
                entities.push({ name: 'Brand', value: metaBrand.content.trim(), schemaProp: 'brand', type: 'Product' });
            }
        }

        if (skuEl) {
            const rawSku = (skuEl.textContent || skuEl.value || '').trim();
            if (rawSku && rawSku.length < 100) {
                entities.push({ name: 'SKU', value: rawSku, schemaProp: 'sku', type: 'Product' });
            }
        } else {
            const metaSku = doc.querySelector('meta[itemprop="sku"], meta[property="product:sku"]');
            if (metaSku?.content) {
                entities.push({ name: 'SKU', value: metaSku.content.trim(), schemaProp: 'sku', type: 'Product' });
            }
        }
        return entities;
    }

    /**
     * [HELPER] Extracts logistics-related product data (shipping, returns, size).
     * @param {Element} scope - The DOM scope to search within.
     * @param {Document} doc - The document object.
     * @returns {Array} An array of logistics-related entities.
     */
    function _extractProductLogistics(scope, doc) {
        const entities = [];
        const logisticsMap = {
            shippingRate: { selector: DEFAULT_SELECTORS.Product.p5_shippingRate, el: DOM.shippingRate, name: 'Shipping Rate' },
            shippingCountry: { selector: DEFAULT_SELECTORS.Product.p6_shippingCountry, el: DOM.shippingCountry, name: 'Shipping Country' },
            returnDays: { selector: DEFAULT_SELECTORS.Product.p7_returnDays, el: DOM.returnDays, name: 'Return Days' },
            returnFees: { selector: DEFAULT_SELECTORS.Product.p8_returnFees, el: DOM.returnFees, name: 'Return Fees' },
            size: { selector: DEFAULT_SELECTORS.Product.p9_size, el: DOM.customProductSize, name: 'Size' }
        };

        for (const [prop, config] of Object.entries(logisticsMap)) {
            const el = smartQuerySelector(scope, doc, getSelector(config.el, config.selector), true);
            if (el) {
                let value = el.textContent.trim();
                if (prop === 'shippingRate' || prop === 'returnDays' || prop === 'returnFees') {
                    value = value.replace(/[^0-9.]/g, '');
                }
                if (value) {
                    entities.push({ name: config.name, value, schemaProp: prop, type: 'Product' });
                }
            }
        }
        return entities;
    }

    /**
     * Main analyzer for Product entities, now refactored to use helper functions.
     */
    function analyzeProductEntities(doc) {
        const containerSelector = `.product-showcase, .product-card, .product-container, .product-info, .product-details, .product-page, .product-section, .product-main, [itemtype*="schema.org/Product"], [class*="product"], [id*="product"]`.replace(/\s+/g, ' ').trim();
        const productContainer = safeQuerySelector(doc, containerSelector);
        const scope = productContainer || doc;

        const expandedPriceSelectors = `.product-price, .price, .sale-price, .current-price, .now-price, .price-current, .price-now, .price-sale, .price-offer, .price-old, .price-was, .original-price, .regular-price, [itemprop="price"], [class*="price"], [class*="سعر"]`.replace(/\s+/g, ' ').trim();
        const priceElements = safeQuerySelectorAll(scope, expandedPriceSelectors);
        const brandContainerEl = safeQuerySelector(scope, getSelector(DOM.customProductBrand, DEFAULT_SELECTORS.Product.p4_brand));
        const skuEl = safeQuerySelector(scope, getSelector(DOM.customProductSku, DEFAULT_SELECTORS.Product.p3_sku));

        const hasPriceContext = priceElements.length > 0;
        const hasProductContext = productContainer !== null;
        const hasBrandOrSku = brandContainerEl !== null || skuEl !== null;

        if (!hasProductContext && !hasPriceContext && !hasBrandOrSku) {
            return [];
        }

        return [
            ..._extractProductNameAndDescription(scope, doc),
            ..._extractProductImages(scope, doc),
            ..._extractProductPricing(scope, priceElements),
            ..._extractBrandAndSku(scope, doc, brandContainerEl, skuEl),
            ..._extractProductLogistics(scope, doc)
        ];
    }


    /**
     * Validates if a rating element is actually a product review rating
     * @param {Element} ratingElement - The element containing rating value
     * @param {number} ratingValue - The extracted numeric value
     * @returns {boolean} True if this is a valid product rating
     */
    function isValidProductRating(ratingElement, ratingValue) {
        // 1. Range validation (product ratings are typically 1-5)
        if (ratingValue < 1 || ratingValue > 5) {
            return false;
        }

        // 2. Context validation - check ancestors
        const validContextKeywords = [
            'review', 'rating', 'customer', 'star', 'feedback',
            'testimonial', 'opinion', 'تقييم', 'مراجعة', 'عميل'
        ];

        const invalidContextKeywords = [
            'energy', 'difficulty', 'level', 'grade', 'score',
            'طاقة', 'صعوبة', 'مستوى', 'درجة'
        ];

        // Check up to 3 parent levels
        let currentEl = ratingElement;
        let contextText = '';

        for (let i = 0; i < 3 && currentEl; i++) {
            contextText += ' ' + (currentEl.className || '') + ' ' + (currentEl.id || '');
            currentEl = currentEl.parentElement;
        }

        contextText = contextText.toLowerCase();

        // Reject if invalid context found
        if (invalidContextKeywords.some(kw => contextText.includes(kw))) {
            return false;
        }

        // Accept if valid context found
        if (validContextKeywords.some(kw => contextText.includes(kw))) {
            return true;
        }

        // 3. Look for review count nearby (strong indicator)
        const parentText = ratingElement.parentElement?.textContent || '';
        const hasReviewCount = /\(\d+\s*(review|rating|تقييم|مراجعة)/i.test(parentText);

        if (hasReviewCount) {
            return true;
        }

        // 4. Check for star symbols (★ ⭐)
        const nearbyText = ratingElement.textContent;
        const hasStarSymbols = /[★⭐]/g.test(nearbyText);

        return hasStarSymbols;
    }

    /**
     * Analyzes review entities, now with support for discovering positive and negative notes (pros/cons).
     * @param {Document} doc - The document to analyze.
     * @returns {Array} An array of discovered review-related entities.
     */
    function analyzeReviewEntities(doc) {
        const entities = [];
        const containerSelector = getSelector(DOM.customReviewContainer, DEFAULT_SELECTORS.Review.r1_container);
        const reviewContainer = safeQuerySelector(doc, containerSelector);
        const scope = reviewContainer || doc;

        const ratingSelector = getSelector(DOM.customReviewRating, DEFAULT_SELECTORS.Review.r2_ratingValue);
        const ratingEl = safeQuerySelector(scope, ratingSelector);
        if (ratingEl) {
            const ratingText = ratingEl.getAttribute('content') || ratingEl.textContent.trim();
            const ratingMatch = ratingText.match(/(\d+(\.\d+)?)/);

            if (ratingMatch && ratingMatch[0]) {
                const ratingValue = parseFloat(ratingMatch[0]);

                // Validate before adding
                if (isValidProductRating(ratingEl, ratingValue)) {
                    entities.push({
                        name: 'Review Rating',
                        value: ratingValue.toString(),
                        schemaProp: 'reviewRating',
                        type: 'Review'
                    });
                } else {
                    console.warn(`Rejected suspicious rating: ${ratingValue} (likely not a product review)`);
                }
            }
        }

        const countSelector = getSelector(DOM.customReviewCount, DEFAULT_SELECTORS.Review.r6_reviewCount);
        const countEl = safeQuerySelector(scope, countSelector);
        if (countEl) {
            const countText = countEl.textContent.trim();
            const countMatch = countText.match(/\d+/); // Extract the first number
            if (countMatch && countMatch[0]) {
                entities.push({ name: 'Review Count', value: countMatch[0], schemaProp: 'reviewCount', type: 'Review', source: 'auto' });
            }
        }

        const itemNameSelector = getSelector(DOM.customReviewItemName, DEFAULT_SELECTORS.Review.r3_itemName);
        const itemNameEl = safeQuerySelector(scope, itemNameSelector);
        if (itemNameEl) {
            entities.push({ name: 'Reviewed Item Name', value: itemNameEl.textContent.trim(), schemaProp: 'itemName', type: 'Review' });
        }

        // Find Positive Notes (Pros)
        const prosSelector = getSelector(DOM.customReviewPros, DEFAULT_SELECTORS.Review.r4_pros);
        const proElements = safeQuerySelectorAll(scope, prosSelector);
        if (proElements.length > 0) {
            const prosList = proElements.map(el => el.textContent.trim()).filter(Boolean);
            if (prosList.length > 0) {
                entities.push({
                    name: 'Positive Notes (Pros)',
                    value: `${prosList.length} items found`,
                    schemaProp: 'positiveNotes',
                    type: 'Review',
                    rawValue: prosList
                });
            }
        }

        // Find Negative Notes (Cons)
        const consSelector = getSelector(DOM.customReviewCons, DEFAULT_SELECTORS.Review.r5_cons);
        const conElements = safeQuerySelectorAll(scope, consSelector);
        if (conElements.length > 0) {
            const consList = conElements.map(el => el.textContent.trim()).filter(Boolean);
            if (consList.length > 0) {
                entities.push({
                    name: 'Negative Notes (Cons)',
                    value: `${consList.length} items found`,
                    schemaProp: 'negativeNotes',
                    type: 'Review',
                    rawValue: consList
                });
            }
        }

        return entities;
    }

    /**
     * Analyzes recipe entities using the central selectors dictionary.
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzeRecipeEntities(doc) {
        const entities = [];
        const containerSelector = getSelector(DOM.customRecipeContainer, DEFAULT_SELECTORS.Recipe.c1_container);
        const recipeContainer = safeQuerySelector(doc, containerSelector);
        if (!recipeContainer) return [];

        const scope = recipeContainer;

        const nameSelector = getSelector(DOM.customRecipeName, DEFAULT_SELECTORS.Recipe.c2_name);
        const nameEl = safeQuerySelector(scope, nameSelector);
        if (nameEl) {
            entities.push({ name: 'Recipe Name', value: nameEl.textContent.trim(), schemaProp: 'name', type: 'Recipe', contextualName: true });
        }

        const prepTimeSelector = getSelector(DOM.customRecipePrepTime, DEFAULT_SELECTORS.Recipe.c3_prepTime);
        const prepTimeEl = safeQuerySelector(scope, prepTimeSelector);
        if (prepTimeEl) {
            const prepTimeText = prepTimeEl.getAttribute('content') || prepTimeEl.textContent.trim();
            const prepTimeISO = convertToISODuration(prepTimeText);
            entities.push({ name: 'Prep Time', value: prepTimeText, rawValue: prepTimeISO, schemaProp: 'prepTime', type: 'Recipe' });
        }

        const cookTimeSelector = getSelector(DOM.customRecipeCookTime, DEFAULT_SELECTORS.Recipe.c4_cookTime);
        const cookTimeEl = safeQuerySelector(scope, cookTimeSelector);
        if (cookTimeEl) {
            const cookTimeText = cookTimeEl.getAttribute('content') || cookTimeEl.textContent.trim();
            const cookTimeISO = convertToISODuration(cookTimeText);
            entities.push({ name: 'Cook Time', value: cookTimeText, rawValue: cookTimeISO, schemaProp: 'cookTime', type: 'Recipe' });
        }

        const ingredientsSelector = getSelector(DOM.customRecipeIngredients, DEFAULT_SELECTORS.Recipe.c5_ingredients);
        const ingredients = safeQuerySelectorAll(scope, ingredientsSelector);
        if (ingredients.length > 0) {
            const ingredientList = ingredients.map(li => li.textContent.trim()).filter(Boolean);
            entities.push({ name: 'Ingredients', value: `${ingredientList.length} items found`, schemaProp: 'recipeIngredient', type: 'Recipe', rawValue: ingredientList });
        }

        const instructionsSelector = getSelector(DOM.customRecipeInstructions, DEFAULT_SELECTORS.Recipe.c6_instructions);
        const instructions = safeQuerySelectorAll(scope, instructionsSelector);
        if (instructions.length > 0) {
            const instructionData = instructions.map(step => ({ "@type": "HowToStep", "text": step.textContent.trim() })).filter(s => s.text);
            entities.push({ name: 'Instructions', value: `${instructionData.length} steps found`, schemaProp: 'recipeInstructions', type: 'Recipe', rawValue: instructionData });
        }

        const contextualImageEl = safeQuerySelector(scope, 'img');
        if (contextualImageEl) {
            entities.push({ name: 'Contextual Image', value: new URL(contextualImageEl.src, doc.baseURI).href, schemaProp: 'image', type: 'Recipe' });
        }

        return entities;
    }

    /**
     * Analyzes How-To entities using the central selectors dictionary.
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzeHowToEntities(doc) {
        const entities = [];
        const containerSelector = getSelector(DOM.customHowToContainer, DEFAULT_SELECTORS.HowTo.h1_container);
        const howtoContainer = safeQuerySelector(doc, containerSelector);
        if (!howtoContainer) return [];

        const scope = howtoContainer;

        const nameSelector = getSelector(DOM.customHowToName, DEFAULT_SELECTORS.HowTo.h2_name);
        const nameEl = safeQuerySelector(scope, nameSelector);
        if (nameEl) {
            entities.push({ name: 'HowTo Name', value: nameEl.textContent.trim(), schemaProp: 'name', type: 'HowTo', contextualName: true });
        }

        const stepSelector = getSelector(DOM.customHowToStep, DEFAULT_SELECTORS.HowTo.h3_stepContainer);
        const steps = safeQuerySelectorAll(scope, stepSelector);
        if (steps.length > 0) {
            const textSelector = getSelector(DOM.customHowToText, DEFAULT_SELECTORS.HowTo.h4_stepText);
            const stepData = steps.map(step => ({
                "@type": "HowToStep",
                "text": safeQuerySelector(step, textSelector)?.textContent.trim()
            })).filter(s => s.text);

            if (stepData.length > 0) {
                entities.push({ name: 'HowTo Steps', value: `${stepData.length} steps found`, schemaProp: 'step', type: 'HowTo', rawValue: stepData });
            }
        }

        const contextualImageEl = safeQuerySelector(scope, 'img');
        if (contextualImageEl) {
            entities.push({ name: 'Contextual Image', value: new URL(contextualImageEl.src, doc.baseURI).href, schemaProp: 'image', type: 'HowTo' });
        }

        return entities;
    }

    /**
     * Analyzes event entities using the central selectors dictionary.
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzeEventEntities(doc) {
        const entities = [];
        const containerSelector = '.event-listing, [itemtype*="schema.org/Event"]';
        const container = safeQuerySelector(doc, containerSelector);
        const scope = container || doc;

        const startDateSelector = getSelector(DOM.customEventStartDate, DEFAULT_SELECTORS.Event.e2_startDate);
        const startDateEl = safeQuerySelector(scope, startDateSelector);

        // Use the start date as the primary trigger for an event.
        if (startDateEl) {
            const dateValue = startDateEl.getAttribute('datetime') || startDateEl.textContent.trim();
            entities.push({ name: 'Event Start Date', value: dateValue, schemaProp: 'startDate', type: 'Event', contextualName: true });

            // Now that we have a date, look for other details.
            const nameSelector = getSelector(DOM.customEventName, DEFAULT_SELECTORS.Event.e1_name);
            const nameEl = safeQuerySelector(scope, nameSelector);
            if (nameEl) {
                entities.push({ name: 'Event Name', value: nameEl.textContent.trim(), schemaProp: 'name', type: 'Event' });
            }

            const locationSelector = getSelector(DOM.customEventLocation, DEFAULT_SELECTORS.Event.e3_location);
            const locationEl = safeQuerySelector(scope, locationSelector);
            if (locationEl) entities.push({ name: 'Event Location', value: locationEl.textContent.trim(), schemaProp: 'location', type: 'Event' });

            const organizerSelector = getSelector(DOM.customEventOrganizer, DEFAULT_SELECTORS.Event.e4_organizer);
            const organizerEl = safeQuerySelector(scope, organizerSelector);
            if (organizerEl) entities.push({ name: 'Event Organizer', value: organizerEl.textContent.trim(), schemaProp: 'organizer', type: 'Event' });
        }

        return entities;
    }

    /**
     * Analyzes organization entities with enhanced contextual awareness.
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzeOrganizationEntities(doc) {
        const entities = [];
        const scope = doc; // Organization info is typically global

        // --- Add a selector for the Organization Name ---
        const nameSelector = '.site-title, .navbar-brand, a[href="/"][aria-label*="home"], footer .org-name';
        const nameEl = safeQuerySelector(scope, nameSelector);
        if (nameEl) {
            entities.push({
                name: 'Organization Name',
                value: nameEl.textContent.trim(),
                schemaProp: 'name',
                type: 'Organization'
            });
        }

        const logoSelector = getSelector(DOM.customOrgLogo, DEFAULT_SELECTORS.Organization.o1_logo);
        const logoEl = safeQuerySelector(scope, logoSelector);
        if (logoEl) {
            try {
                entities.push({
                    name: 'Organization Logo',
                    value: new URL(logoEl.src, doc.baseURI).href,
                    schemaProp: 'logo',
                    type: 'Organization'
                });
            } catch (e) { /* Fails gracefully */ }
        }

        const addressSelector = getSelector(DOM.customOrgAddress, DEFAULT_SELECTORS.Organization.o2_address);
        const addressEl = safeQuerySelector(scope, addressSelector);
        if (addressEl) {
            // More robust address text extraction
            const addressText = Array.from(addressEl.childNodes)
                .map(node => node.textContent)
                .join(' ')
                .replace(/\s+/g, ' ').trim();
            entities.push({
                name: 'Organization Address',
                value: addressText,
                schemaProp: 'address',
                type: 'Organization'
            });
        }

        const telephoneSelector = getSelector(DOM.customOrgTelephone, DEFAULT_SELECTORS.Organization.o3_telephone);
        const telephoneEl = safeQuerySelector(scope, telephoneSelector);
        if (telephoneEl) {
            const phone = telephoneEl.getAttribute('href')?.replace(/tel:| /g, '') || telephoneEl.textContent.trim();
            entities.push({ name: 'Organization Telephone', value: phone, schemaProp: 'telephone', type: 'Organization' });
        }

        return entities;
    }

    /**
     * Analyzes video entities using the central selectors dictionary.
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzeVideoEntities(doc) {
        const entities = [];
        const containerSelector = getSelector(DOM.customVideoContainer, DEFAULT_SELECTORS.VideoObject.v1_container);
        const container = safeQuerySelector(doc, containerSelector);
        const scope = container || doc;

        const thumbSelector = getSelector(DOM.customVideoThumbnail, DEFAULT_SELECTORS.VideoObject.v4_thumbnail);
        const urlSelector = getSelector(DOM.customVideoUrl, DEFAULT_SELECTORS.VideoObject.v5_contentUrl);

        const thumbEl = safeQuerySelector(scope, thumbSelector);
        const urlEl = safeQuerySelector(scope, urlSelector);

        // Only proceed if we find strong evidence of a video (thumbnail or URL).
        if (thumbEl || urlEl) {
            const nameSelector = getSelector(DOM.customVideoName, DEFAULT_SELECTORS.VideoObject.v2_name);
            const descSelector = getSelector(DOM.customVideoDescription, DEFAULT_SELECTORS.VideoObject.v3_description);
            const dateSelector = getSelector(DOM.customVideoDate, DEFAULT_SELECTORS.VideoObject.v6_uploadDate);

            const nameEl = safeQuerySelector(scope, nameSelector);
            if (nameEl) entities.push({ name: 'Video Title', value: nameEl.textContent.trim(), schemaProp: 'name', type: 'VideoObject' });

            const descEl = safeQuerySelector(scope, descSelector);
            if (descEl) entities.push({ name: 'Video Description', value: descEl.textContent.trim(), schemaProp: 'description', type: 'VideoObject' });

            if (thumbEl) {
                const thumbnailUrl = thumbEl.tagName === 'VIDEO' ? thumbEl.poster : thumbEl.src;
                if (thumbnailUrl) entities.push({ name: 'Video Thumbnail', value: new URL(thumbnailUrl, doc.baseURI).href, schemaProp: 'thumbnailUrl', type: 'VideoObject' });
            }

            if (urlEl) {
                const videoUrl = urlEl.hasAttribute('data-video-id')
                    ? `https://www.youtube.com/watch?v=${urlEl.getAttribute('data-video-id')}`
                    : new URL(urlEl.src, doc.baseURI).href;
                entities.push({ name: 'Video Content URL', value: videoUrl, schemaProp: 'contentUrl', type: 'VideoObject' });
            }

            const dateEl = safeQuerySelector(scope, dateSelector);
            if (dateEl) {
                const dateValue = dateEl.getAttribute('datetime') || dateEl.textContent.trim();
                entities.push({ name: 'Video Upload Date', value: dateValue, schemaProp: 'uploadDate', type: 'VideoObject' });
            }

            // Fallback for title
            if (!entities.some(e => e.schemaProp === 'name')) {
                const h1 = safeQuerySelector(doc, 'h1');
                if (h1) entities.push({ name: 'Video Title (Fallback)', value: h1.textContent.trim(), schemaProp: 'name', type: 'VideoObject' });
            }
        }
        return entities;
    }

    /**
     * Analyzes local business entities using the central selectors dictionary.
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzeLocalBusinessEntities(doc) {
        const entities = [];
        const scope = doc; // Local business info is often global (e.g., in the footer)

        const priceRangeSelector = getSelector(DOM.customLocalBusinessPriceRange, DEFAULT_SELECTORS.LocalBusiness.l1_priceRange);
        const openingHoursSelector = getSelector(DOM.customLocalBusinessOpeningHours, DEFAULT_SELECTORS.LocalBusiness.l2_openingHours);

        const priceRangeEl = safeQuerySelector(scope, priceRangeSelector);
        if (priceRangeEl) {
            entities.push({ name: 'Price Range', value: priceRangeEl.textContent.trim(), schemaProp: 'priceRange', type: 'LocalBusiness' });
        }

        const openingHoursEl = safeQuerySelector(scope, openingHoursSelector);
        if (openingHoursEl) {
            entities.push({ name: 'Opening Hours', value: openingHoursEl.textContent.trim(), schemaProp: 'openingHours', type: 'LocalBusiness' });
        }

        return entities;
    }

    /**
     * Analyzes Job Posting entities with an expert linguistic and contextual approach.
     * This final version intelligently handles salary ranges, complex location texts,
     * and flexible keyword matching. It is a pure, stateless discovery function.
     *
     * @param {Document} doc - The document object to analyze.
     * @returns {Array} An array of discovered JobPosting-related entities.
     */
    function analyzeJobPostingEntities(doc) {
        const entities = [];
        const containerSelector = getSelector(DOM.customJobContainer, DEFAULT_SELECTORS.JobPosting.j1_container);
        const jobContainer = safeQuerySelector(doc, containerSelector);
        if (!jobContainer) return [];
        const scope = jobContainer;

        // --- 1. Core Details (Title, Date, Salary) ---
        const titleSelector = getSelector(DOM.customJobTitle, `.job-title, ${DEFAULT_SELECTORS.JobPosting.j2_title}`);
        const titleEl = safeQuerySelector(scope, titleSelector);
        if (titleEl) entities.push({ name: 'Job Title', value: titleEl.textContent.trim(), schemaProp: 'title', type: 'JobPosting' });

        const datePostedEl = safeQuerySelector(scope, getSelector(DOM.customJobDatePosted, DEFAULT_SELECTORS.JobPosting.j3_datePosted));
        if (datePostedEl) entities.push({ name: 'Date Posted', value: datePostedEl.getAttribute('datetime') || datePostedEl.textContent.trim(), schemaProp: 'datePosted', type: 'JobPosting' });

        const salaryEl = safeQuerySelector(scope, getSelector(DOM.customJobSalarySelector, DEFAULT_SELECTORS.JobPosting.j5_salary));
        if (salaryEl) {
            const salaryText = salaryEl.textContent.trim();
            entities.push({ name: 'Salary', value: salaryText, schemaProp: 'baseSalary', type: 'JobPosting' });
            const currency = inferCurrency(salaryText);
            if (currency) entities.push({ name: 'Currency', value: currency, schemaProp: 'currency', type: 'JobPosting' });
        }

        const identifierEl = safeQuerySelector(scope, getSelector(DOM.customJobIdentifier, DEFAULT_SELECTORS.JobPosting.j11_identifier));
        if (identifierEl) {
            entities.push({ name: 'Job Identifier', value: identifierEl.textContent.trim(), schemaProp: 'identifier', type: 'JobPosting' });
        }

        // --- 2. Employment Type Detection ---
        const fullContentText = scope.textContent.toLowerCase();
        const employmentTypes = {
            "CONTRACTOR": /\b(contract|freelance)\b/i,
            "FULL_TIME": /full-time|full time/i,
            "PART_TIME": /part-time|part time/i,
            "TEMPORARY": /temporary|temp/i,
            "INTERN": /intern|internship/i,
            "VOLUNTEER": /volunteer/i
        };
        for (const type in employmentTypes) {
            if (employmentTypes[type].test(fullContentText)) {
                entities.push({ name: 'Employment Type', value: type, schemaProp: 'employmentType', type: 'JobPosting' });
                break;
            }
        }

        // --- 3. Advanced Location Parsing ---
        const locationContainer = safeQuerySelector(scope, DEFAULT_SELECTORS.JobPosting.j4_locationContainer);
        if (locationContainer) {
            const fullLocationText = locationContainer.textContent.trim();
            const lowerLocationText = fullLocationText.toLowerCase();

            const remoteSynonyms = ['remote', 'عن بعد', 'wfh', 'work from home', 'anywhere'];
            const hybridSynonyms = ['hybrid', 'هجين'];

            if (remoteSynonyms.some(s => lowerLocationText.includes(s))) {
                entities.push({ name: 'Job Location Type', value: 'remote', schemaProp: 'jobLocationType', type: 'JobPosting' });
                const country = safeQuerySelector(locationContainer, DEFAULT_SELECTORS.JobPosting.j10_addressCountry)?.textContent.trim();
                if (country) entities.push({ name: 'Country', value: country, schemaProp: 'addressCountry', type: 'JobPosting:AddressPart' });
            } else if (hybridSynonyms.some(s => lowerLocationText.includes(s))) {
                entities.push({ name: 'Job Location Type', value: 'hybrid', schemaProp: 'jobLocationType', type: 'JobPosting' });
                parsePhysicalAddress(locationContainer, entities, fullLocationText);
            } else {
                entities.push({ name: 'Job Location Type', value: 'physical', schemaProp: 'jobLocationType', type: 'JobPosting' });
                parsePhysicalAddress(locationContainer, entities, fullLocationText);
            }
        }

        // --- 4. Beta Properties Detection ---
        const experienceEl = safeQuerySelector(scope, getSelector(DOM.customJobExperienceSelector, DEFAULT_SELECTORS.JobPosting.j12_experience));
        if (experienceEl) {
            entities.push({ name: 'Experience Text', value: experienceEl.textContent.trim(), schemaProp: 'experienceRequirements', type: 'JobPosting' });
        }

        const educationEl = safeQuerySelector(scope, getSelector(DOM.customJobEducationSelector, DEFAULT_SELECTORS.JobPosting.j13_education));
        if (educationEl) {
            entities.push({ name: 'Education Text', value: educationEl.textContent.trim(), schemaProp: 'educationRequirements', type: 'JobPosting' });
        }

        return entities;
    }

    /**
     * Helper function to parse physical address components, with an intelligent fallback.
     * @param {Element} locationContainer - The container element for the location.
     * @param {Array} entities - The array of entities to push to.
     * @param {string} fullText - The full text content of the container for fallback parsing.
     */
    function parsePhysicalAddress(locationContainer, entities, fullText) {
        const street = safeQuerySelector(locationContainer, DEFAULT_SELECTORS.JobPosting.j6_streetAddress)?.textContent.trim();
        const city = safeQuerySelector(locationContainer, DEFAULT_SELECTORS.JobPosting.j7_addressLocality)?.textContent.trim();
        const region = safeQuerySelector(locationContainer, DEFAULT_SELECTORS.JobPosting.j8_addressRegion)?.textContent.trim();
        const postalCode = safeQuerySelector(locationContainer, DEFAULT_SELECTORS.JobPosting.j9_postalCode)?.textContent.trim();
        const country = safeQuerySelector(locationContainer, DEFAULT_SELECTORS.JobPosting.j10_addressCountry)?.textContent.trim();

        if (!street && !city && !region && !postalCode && !country) {
            let cleanLocation = fullText.replace(/office location:/i, '').replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
            const parts = cleanLocation.split(',').map(p => p.trim());
            if (parts.length >= 2) {
                entities.push({ name: 'City (Inferred)', value: parts[0], schemaProp: 'addressLocality', type: 'JobPosting:AddressPart' });
                const lastPart = parts[parts.length - 1];
                if (lastPart.length > 3) {
                    entities.push({ name: 'Country (Inferred)', value: lastPart, schemaProp: 'addressCountry', type: 'JobPosting:AddressPart' });
                } else {
                    entities.push({ name: 'Region (Inferred)', value: lastPart, schemaProp: 'addressRegion', type: 'JobPosting:AddressPart' });
                }
            } else {
                entities.push({ name: 'Location (Fallback)', value: cleanLocation, schemaProp: 'addressLocality', type: 'JobPosting:AddressPart' });
            }
        } else {
            if (street) entities.push({ name: 'Street Address', value: street, schemaProp: 'streetAddress', type: 'JobPosting:AddressPart' });
            if (city) entities.push({ name: 'City', value: city, schemaProp: 'addressLocality', type: 'JobPosting:AddressPart' });
            if (region) entities.push({ name: 'Region', value: region, schemaProp: 'addressRegion', type: 'JobPosting:AddressPart' });
            if (postalCode) entities.push({ name: 'Postal Code', value: postalCode, schemaProp: 'postalCode', type: 'JobPosting:AddressPart' });
            if (country) entities.push({ name: 'Country', value: country, schemaProp: 'addressCountry', type: 'JobPosting:AddressPart' });
        }
    }

    /**
     * Analyzes software application entities using the central selectors dictionary.
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzeSoftwareAppEntities(doc) {
        const entities = [];
        const containerSelector = getSelector(DOM.customAppContainer, DEFAULT_SELECTORS.SoftwareApplication.s1_container);
        const container = safeQuerySelector(doc, containerSelector);
        if (!container) return [];

        const scope = container;

        const nameSelector = getSelector(DOM.customAppName, DEFAULT_SELECTORS.SoftwareApplication.s2_name);
        const nameEl = safeQuerySelector(scope, nameSelector);

        if (nameEl) {
            entities.push({ name: 'Software App Name', value: nameEl.textContent.trim(), schemaProp: 'name', type: 'SoftwareApplication' });

            const categorySelector = getSelector(DOM.customAppCategory, DEFAULT_SELECTORS.SoftwareApplication.s4_category);
            const categoryEl = safeQuerySelector(scope, categorySelector);
            if (categoryEl) entities.push({ name: 'App Category', value: categoryEl.textContent.trim(), schemaProp: 'applicationCategory', type: 'SoftwareApplication' });

            const osSelector = getSelector(DOM.customAppOperatingSystem, DEFAULT_SELECTORS.SoftwareApplication.s5_os);
            const osEl = safeQuerySelector(scope, osSelector);
            if (osEl) entities.push({ name: 'Operating System', value: osEl.textContent.trim(), schemaProp: 'operatingSystem', type: 'SoftwareApplication' });

            const priceSelector = getSelector(DOM.customAppPrice, DEFAULT_SELECTORS.SoftwareApplication.s3_price);
            const priceEl = safeQuerySelector(scope, priceSelector);
            if (priceEl) {
                const priceText = priceEl.textContent.trim();
                const price = priceText.replace(/[^0-9.]/g, '');
                if (price) entities.push({ name: 'Price', value: price, schemaProp: 'price', type: 'SoftwareApplication' });
            }

            const ratingSelector = getSelector(DOM.customAppRating, DEFAULT_SELECTORS.SoftwareApplication.s6_rating);
            const ratingEl = safeQuerySelector(scope, ratingSelector);
            if (ratingEl) {
                const ratingText = ratingEl.getAttribute('content') || ratingEl.textContent.trim();
                const ratingValue = ratingText.match(/(\d+(\.\d+)?)/);
                if (ratingValue && ratingValue[0]) {
                    entities.push({ name: 'Review Rating', value: ratingValue[0], schemaProp: 'reviewRating', type: 'SoftwareApplication' });
                }
            }
        }
        return entities;
    }

    /**
     * Analyzes course entities following Google's official guidelines
     * Supports ONLY the two approved scenarios:
     * 1. Summary page (ItemList with URLs only) + Detail pages (full Course)
     * 2. All-in-one page (ItemList with embedded Course items)
     * 
     * @param {Document} doc - Document to analyze
     * @returns {Array} Array of entities
     */
    function analyzeCourseEntities(doc) {
        const entities = [];

        // ===================================================================
        //  PHASE 1: DETECT LIST CONTAINER (required by Google)
        // ===================================================================

        const listContainerSelector = getSelector(
            DOM.customCourseListContainer,
            DEFAULT_SELECTORS.Course.k1_listContainer
        );
        const listContainer = safeQuerySelector(doc, listContainerSelector);

        // If no list container found, this is NOT a valid Course page per Google docs
        if (!listContainer) {
            return entities; // Return empty - not a course catalog
        }

        const itemSelector = getSelector(
            DOM.customCourseItemContainer,
            DEFAULT_SELECTORS.Course.k2_itemContainer
        );

        const courseItems = safeQuerySelectorAll(listContainer, itemSelector);

        // Google requires at least 3 courses for eligibility
        if (courseItems.length < 3) {
            console.warn('Course list found but has fewer than 3 items (Google minimum)');
            return entities;
        }

        // ===================================================================
        //  PHASE 2: EXTRACT COURSE DATA FROM EACH ITEM
        // ===================================================================

        courseItems.forEach((item, index) => {
            const courseData = extractCourseData(item, doc);

            // Validate minimum required properties per Google docs
            if (courseData && courseData.name && courseData.provider && courseData.description) {
                entities.push({
                    name: 'Course Found',
                    value: courseData.name,
                    schemaProp: 'courseItem',
                    type: 'Course',
                    rawValue: courseData
                });
            }
        });

        return entities;
    }

    /**
     * Extracts complete course data from a single course item element
     * Follows Google's Course schema requirements
     * 
     * @param {Element} item - Course item element
     * @param {Document} doc - Document context
     * @returns {Object|null} Course data object or null
     */
    function extractCourseData(item, doc) {
        // ===================================================================
        //  CORE PROPERTIES (Required by Google)
        // ===================================================================

        const nameSelector = getSelector(DOM.customCourseName, DEFAULT_SELECTORS.Course.k3_name);
        const providerSelector = getSelector(DOM.customCourseProvider, DEFAULT_SELECTORS.Course.k4_provider);
        const descriptionSelector = getSelector(DOM.customCourseDescription, DEFAULT_SELECTORS.Course.k5_description);

        const nameEl = safeQuerySelector(item, nameSelector);
        const providerEl = safeQuerySelector(item, providerSelector);
        const descriptionEl = safeQuerySelector(item, descriptionSelector);

        // Validation: All three are required per Google docs
        if (!nameEl || !providerEl || !descriptionEl) return null;

        const courseData = {
            name: nameEl.textContent.trim(),
            provider: providerEl.textContent.trim(),
            description: descriptionEl.textContent.trim()
        };

        // ===================================================================
        //  URL EXTRACTION (Smart Logic)
        // ===================================================================

        let courseUrl = null;
        let providerUrl = null;

        // Extract provider URL (sameAs property in schema)
        const providerLinks = safeQuerySelectorAll(providerEl.parentElement, 'a[href]');
        providerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (link === providerEl || link.contains(providerEl))) {
                providerUrl = new URL(href, doc.baseURI).href;
            }
        });

        // Extract course URL (for ListItem.item.url in all-in-one pages)
        const nameLink = nameEl.closest('a') || safeQuerySelector(nameEl, 'a');
        if (nameLink) {
            const href = nameLink.getAttribute('href');
            if (href) {
                const fullUrl = new URL(href, doc.baseURI).href;
                // Only use if different from provider URL
                if (fullUrl !== providerUrl) {
                    courseUrl = fullUrl;
                }
            }
        }

        // Fallback: search for any link in item container
        if (!courseUrl) {
            const itemLinks = safeQuerySelectorAll(item, 'a[href]');
            for (const link of itemLinks) {
                const href = link.getAttribute('href');
                if (href) {
                    const fullUrl = new URL(href, doc.baseURI).href;
                    if (fullUrl !== providerUrl && !link.contains(providerEl)) {
                        courseUrl = fullUrl;
                        break;
                    }
                }
            }
        }

        courseData.url = courseUrl;
        courseData.providerUrl = providerUrl;

        // ===================================================================
        //  ADVANCED PROPERTIES (Enhanced Schema)
        // ===================================================================

        // Course Code
        const courseCodeSelector = getSelector(DOM.customCourseCode, DEFAULT_SELECTORS.Course.k6_courseCode);
        const courseCodeEl = safeQuerySelector(item, courseCodeSelector);
        if (courseCodeEl) courseData.courseCode = courseCodeEl.textContent.trim();

        // Price & Currency
        const priceSelector = getSelector(DOM.customCoursePrice, DEFAULT_SELECTORS.Course.k7_price);
        const priceEl = safeQuerySelector(item, priceSelector);
        if (priceEl) {
            const priceText = priceEl.textContent.trim();
            const price = priceText.replace(/[^0-9.]/g, '');
            if (price) {
                courseData.price = price;
                const currencySelector = getSelector(DOM.customCourseCurrency, DEFAULT_SELECTORS.Course.k8_currency);
                const currencyEl = safeQuerySelector(item, currencySelector);
                courseData.currency = currencyEl ? currencyEl.textContent.trim() : inferCurrency(priceText);
            }
        }

        // Credential Awarded
        const credentialSelector = getSelector(DOM.customCourseCredential, DEFAULT_SELECTORS.Course.k9_credential);
        const credentialEl = safeQuerySelector(item, credentialSelector);
        if (credentialEl) courseData.credential = credentialEl.textContent.trim();

        // Prerequisites
        const prerequisitesSelector = getSelector(DOM.customCoursePrerequisites, DEFAULT_SELECTORS.Course.k10_prerequisites);
        const prerequisitesEl = safeQuerySelector(item, prerequisitesSelector);
        if (prerequisitesEl) courseData.prerequisites = prerequisitesEl.textContent.trim();

        // ===================================================================
        //  COURSE INSTANCES (Multiple Sessions Support)
        // ===================================================================

        const instanceData = detectCourseInstances(item);
        if (instanceData.instances.length > 1) {
            courseData.courseInstances = instanceData.instances;
        } else if (instanceData.instances.length === 1) {
            courseData.courseInstance = instanceData.instances[0];
        }

        // ===================================================================
        //  AGGREGATE RATING
        // ===================================================================

        const ratingEl = safeQuerySelector(item, '.rating, [itemprop="ratingValue"]');
        if (ratingEl) {
            const ratingText = ratingEl.getAttribute('content') || ratingEl.textContent.trim();
            const ratingValue = ratingText.match(/(\d+(\.\d+)?)/);
            if (ratingValue && ratingValue[0]) {
                courseData.rating = ratingValue[0];
                const ratingCountEl = safeQuerySelector(item, '.rating-count, [itemprop="ratingCount"]');
                if (ratingCountEl) {
                    const countText = ratingCountEl.textContent.trim();
                    const countValue = countText.match(/\d+/);
                    if (countValue) courseData.ratingCount = countValue[0];
                }
            }
        }

        return courseData;
    }

    /**
     * Detects course instances (sessions/offerings) within a scope
     * Supports both single and multiple instance scenarios
     * 
     * @param {Element} scope - Scope to search within
     * @returns {Object} Object containing array of instances
     */
    function detectCourseInstances(scope) {
        const instanceContainerSelector = getSelector(
            DOM.customCourseInstanceContainer,
            DEFAULT_SELECTORS.Course.k16_instanceContainer
        );

        const startDateSelector = getSelector(DOM.customCourseStartDate, DEFAULT_SELECTORS.Course.k11_startDate);
        const endDateSelector = getSelector(DOM.customCourseEndDate, DEFAULT_SELECTORS.Course.k12_endDate);
        const locationSelector = getSelector(DOM.customCourseLocation, DEFAULT_SELECTORS.Course.k13_location);
        const courseModeSelector = getSelector(DOM.customCourseMode, DEFAULT_SELECTORS.Course.k14_courseMode);
        const instructorSelector = getSelector(DOM.customCourseInstructor, DEFAULT_SELECTORS.Course.k15_instructor);

        const instanceContainers = safeQuerySelectorAll(scope, instanceContainerSelector);
        const instances = [];

        if (instanceContainers.length > 1) {
            // MULTIPLE INSTANCES: Each container represents a session
            instanceContainers.forEach(instanceEl => {
                const instance = extractInstanceData(
                    instanceEl,
                    startDateSelector,
                    endDateSelector,
                    locationSelector,
                    courseModeSelector,
                    instructorSelector
                );
                if (Object.keys(instance).length > 0) instances.push(instance);
            });
        } else {
            // SINGLE INSTANCE: Extract from scope directly
            const instance = extractInstanceData(
                scope,
                startDateSelector,
                endDateSelector,
                locationSelector,
                courseModeSelector,
                instructorSelector
            );
            if (Object.keys(instance).length > 0) instances.push(instance);
        }

        return { instances };
    }

    /**
     * Helper function to extract instance data from an element
     * @param {Element} el - Element to extract from
     * @param {string} startDateSel - Start date selector
     * @param {string} endDateSel - End date selector
     * @param {string} locationSel - Location selector
     * @param {string} modeSel - Course mode selector
     * @param {string} instructorSel - Instructor selector
     * @returns {Object} Instance data object
     */
    function extractInstanceData(el, startDateSel, endDateSel, locationSel, modeSel, instructorSel) {
        const instance = {};

        const startDateEl = safeQuerySelector(el, startDateSel);
        if (startDateEl) {
            instance.startDate = startDateEl.getAttribute('datetime') || startDateEl.textContent.trim();
        }

        const endDateEl = safeQuerySelector(el, endDateSel);
        if (endDateEl) {
            instance.endDate = endDateEl.getAttribute('datetime') || endDateEl.textContent.trim();
        }

        const locationEl = safeQuerySelector(el, locationSel);
        if (locationEl) instance.location = locationEl.textContent.trim();

        const courseModeEl = safeQuerySelector(el, modeSel);
        if (courseModeEl) instance.courseMode = courseModeEl.textContent.trim();

        const instructorEl = safeQuerySelector(el, instructorSel);
        if (instructorEl) instance.instructor = instructorEl.textContent.trim();

        return instance;
    }

    /**
     * Enhanced currency detection with Arabic support
     * @param {string} text - Text containing price/currency
     * @returns {string|null} Currency code (USD, SAR, etc.)
     */
    function inferCurrency(text) {
        if (!text) return null;

        // Normalize Arabic numerals to Western
        const normalized = text.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
        const lowerText = normalized.toLowerCase();

        // Comprehensive currency mapping
        const currencyMap = {
            'USD': ['$', 'usd', 'dollar', 'دولار', 'us dollar'],
            'SAR': ['ر.س', 'ريال', 'sar', 'riyal', 'sr', 'saudi'],
            'EUR': ['€', 'eur', 'euro', 'يورو'],
            'GBP': ['£', 'gbp', 'pound', 'جنيه استرليني', 'sterling'],
            'AED': ['د.إ', 'درهم', 'aed', 'dirham', 'dhs', 'إماراتي'],
            'EGP': ['ج.م', 'جنيه', 'egp', 'pound', 'مصري', 'egyptian'],
            'KWD': ['د.ك', 'دينار', 'kwd', 'dinar', 'kuwaiti'],
            'QAR': ['ر.ق', 'ريال قطري', 'qar', 'qatari'],
            'JPY': ['¥', 'jpy', 'yen', 'ين'],
            'CAD': ['c$', 'cad', 'canadian'],
            'AUD': ['a$', 'aud', 'australian'],
            'CHF': ['chf', 'franc', 'فرنك']
        };

        // Check each currency pattern
        for (const [code, patterns] of Object.entries(currencyMap)) {
            if (patterns.some(pattern => lowerText.includes(pattern))) {
                return code;
            }
        }

        // Fallback: detect by symbol position
        if (/^\s*[$€£¥]\s*[\d,]+/.test(text)) {
            if (text.includes('$')) return 'USD';
            if (text.includes('€')) return 'EUR';
            if (text.includes('£')) return 'GBP';
            if (text.includes('¥')) return 'JPY';
        }

        return null;
    }

    // ===================================================================
    //  Schema Generation Functions
    // ===================================================================

    /**
     * Suggests schema types based on discovered entities AND user interaction.
     * @param {Array} entities - Discovered entities
     * @returns {Array} Array of schema suggestions
     */
    function suggestSchema(entities) {
        const suggestions = [];
        const presentEntityTypes = new Set(entities.map(e => e.type).filter(Boolean));

        // ========== INTERACTION-AWARE LOGIC ==========
        const isInteractingWithProductUI = (
            (DOM.productHasVariantsSwitch && DOM.productHasVariantsSwitch.checked) ||
            document.querySelector('#memberPricingContainer .member-price-row')
        );

        // If user is clearly working on a product, give Product schema the highest confidence.
        if (isInteractingWithProductUI) {
            suggestions.push({
                type: 'Product',
                confidence: 0.99, // Highest confidence
                reason: "You are using advanced product features (variants or member pricing)."
            });
        }
        // ========== END INTERACTION-AWARE LOGIC ==========

        const hierarchy = [
            { type: 'Product', reason: "Product price data was detected.", confidence: 0.98, evidenceKey: 'Product' },
            { type: 'JobPosting', reason: "Job posting details (title, location) were detected.", confidence: 0.96, evidenceKey: 'JobPosting' },
            { type: 'SoftwareApplication', reason: "Software app details (category, OS) were detected.", confidence: 0.95, evidenceKey: 'SoftwareApplication' },
            { type: 'Course', reason: "An educational course provider was detected.", confidence: 0.93, evidenceKey: 'Course' },
            { type: 'LocalBusiness', reason: "Business-specific info (price range, hours) was detected.", confidence: 0.82, evidenceKey: 'LocalBusiness' },
            { type: 'Review', reason: "Review rating data was found.", confidence: 0.97, evidenceKey: 'Review' },
            { type: 'Recipe', reason: "A list of ingredients was detected.", confidence: 0.95, evidenceKey: 'Recipe' },
            { type: 'BreadcrumbList', reason: "A breadcrumb navigation trail was found.", confidence: 0.96, evidenceKey: 'Breadcrumb' },
            { type: 'VideoObject', reason: "Video content (title, URL) was detected.", confidence: 0.94, evidenceKey: 'VideoObject' },
            { type: 'HowTo', reason: "A structure of instructional steps was detected.", confidence: 0.92, evidenceKey: 'HowTo' },
            { type: 'FAQPage', reason: "A question and answer structure was found.", confidence: 0.90, evidenceKey: 'FAQ' },
            { type: 'Event', reason: "An event date or location was detected.", confidence: 0.90, evidenceKey: 'Event' },
            { type: 'Article', reason: "A publication date or author was found.", confidence: 0.85, evidenceKey: 'Article' },
            { type: 'Organization', reason: "Organization data (e.g., logo, address) was detected.", confidence: 0.80, evidenceKey: 'Organization' }
        ];

        // Check each schema type in hierarchy
        hierarchy.forEach(schema => {
            // Avoid adding a duplicate Product suggestion
            if (presentEntityTypes.has(schema.evidenceKey) && !suggestions.some(s => s.type === schema.type)) {
                suggestions.push({
                    type: schema.type,
                    confidence: schema.confidence,
                    reason: schema.reason
                });
            }
        });

        // Always add WebPage as fallback
        if (!suggestions.some(s => s.type === 'WebPage')) {
            suggestions.push({ type: 'WebPage', confidence: 0.5, reason: "A generic fallback for any web page." });
        }

        return suggestions.sort((a, b) => b.confidence - a.confidence);
    }

    /**
     * Displays existing schema from HTML
     * @param {string} htmlContent - HTML content
     * @returns {string} HTML string of existing schema
     */
    function displayExistingSchema(htmlContent) {
        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        const scripts = safeQuerySelectorAll(doc, 'script[type="application/ld+json"]');

        if (scripts.length === 0) return '';

        let outputHtml = `<hr class="my-4"><h3 class="h5 mt-4 mb-3 text-primary">3. Existing Schema Found:</h3>`;

        scripts.forEach((script, index) => {
            try {
                const jsonData = JSON.parse(script.textContent);
                const schemaType = escapeHtml(jsonData['@type'] || 'Unknown');
                outputHtml += `
    <div class="card shadow-sm mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
            <label for="existingSchemaTextarea_${index}" class="fw-bold">Type: ${schemaType}</label>
            <span class="badge bg-info text-dark">#${index + 1}</span>
        </div>
        <div class="card-body p-0">
            <textarea id="existingSchemaTextarea_${index}" class="border-0 form-control" readonly rows="8" aria-label="Existing JSON-LD code for schema type ${schemaType}">${JSON.stringify(jsonData, null, 2)}</textarea>
        </div>
    </div>`;
            } catch (e) {
                // Ignore invalid JSON
            }
        });

        return outputHtml;
    }

    /**
     * Generates final schema object with intelligent, context-aware nesting.
     * @param {Array} entities - Discovered entities
     * @param {string} primaryType - The primary schema type selected by the user.
     * @param {string} pageUrl - The base URL for the page.
     * @returns {Object} The complete, structured schema object.
     */
    function generateFinalSchema(entities, primaryType, pageUrl) {
        const isVariantMode = DOM.productHasVariantsSwitch && DOM.productHasVariantsSwitch.checked;
        const isMemberPricingActive = document.querySelector('#memberPricingContainer .member-price-row');

        // "LAW OF SOVEREIGNTY": If there is any interaction with product-specific UI,
        // Product becomes the undeniable primary type.
        const effectivePrimaryType = (isVariantMode || isMemberPricingActive || primaryType === 'Product') ? 'Product' : primaryType;

        let schema = {
            "@context": "https://schema.org",
            "@type": effectivePrimaryType,
            "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl || "" }
        };

        // Add common properties
        const generalName = entities.find(e => e.schemaProp === 'name');
        if (generalName) schema.name = generalName.value;

        const mainImage = entities.find(e => e.schemaProp === 'image');
        if (mainImage) schema.image = mainImage.value;

        const mainDesc = entities.find(e => e.schemaProp === 'description');
        if (mainDesc) schema.description = mainDesc.value;

        // Map of specialized functions to populate data for each schema type.
        const populationMap = {
            'Article': populateArticleProperties, 'Product': populateProductProperties,
            'VideoObject': populateVideoProperties, 'Review': populateReviewProperties,
            'Recipe': populateRecipeProperties, 'HowTo': populateHowToProperties,
            'FAQPage': populateFaqProperties, 'Event': populateEventProperties,
            'Organization': populateOrganizationProperties, 'BreadcrumbList': populateBreadcrumbProperties,
            'LocalBusiness': populateLocalBusinessProperties, 'JobPosting': populateJobPostingProperties,
            'SoftwareApplication': populateSoftwareAppProperties, 'Course': populateCourseProperties
        };

        // Execute the appropriate population function for the primary entity.
        if (populationMap[effectivePrimaryType]) {
            populationMap[effectivePrimaryType](schema, entities, true);
        }

        // Handle nested schemas with refined logic
        const nestedSchemas = [];
        const processedNestedTypes = new Set();

        // This set defines entities that are integrated via specific properties (e.g., brand, review)
        // and should NOT be redundantly added as a generic `hasPart`.
        const specialIntegrationTypes = new Set(['Organization', 'Review']);

        // On a Product page, certain types are considered part of the product description, not separate entities.
        if (effectivePrimaryType === 'Product') {
            specialIntegrationTypes.add('Recipe');
            specialIntegrationTypes.add('HowTo');
            specialIntegrationTypes.add('VideoObject');
        }
        // A Product should not be a hasPart of another entity unless it's a Review.
        if (effectivePrimaryType !== 'Review') {
            specialIntegrationTypes.add('Product');
        }

        entities.forEach(entity => {
            if (!entity.type || entity.type === 'JobPosting:AddressPart') return;

            let schemaType = entity.type;
            if (schemaType === 'FAQ') schemaType = 'FAQPage';
            if (schemaType === 'Breadcrumb') schemaType = 'BreadcrumbList';
            if (schemaType === 'Course') return;

            if (schemaType !== effectivePrimaryType &&
                !processedNestedTypes.has(schemaType) &&
                !specialIntegrationTypes.has(schemaType)) {

                const fragment = buildSchemaFragment(schemaType, entities);
                if (fragment) {
                    nestedSchemas.push(fragment);
                    processedNestedTypes.add(schemaType);
                }
            }
        });

        if (nestedSchemas.length > 0) {
            schema.hasPart = nestedSchemas;
        }

        // Final cleanup
        if (effectivePrimaryType === 'BreadcrumbList') {
            delete schema.mainEntityOfPage;
        }

        // Validate product schema if it's a Product type
        if (effectivePrimaryType === 'Product' || effectivePrimaryType === 'ProductGroup') {
            const validation = validateProductSchema(schema);

            if (validation.criticalWarnings.length > 0) {
                console.warn('⚠️ Product Schema Validation Warnings:', validation.criticalWarnings);

                // Show warning to user
                if (typeof showToast === 'function') {
                    showToast(
                        `Data Quality Warning: ${validation.criticalWarnings[0]}`,
                        'warning'
                    );
                }
            }

            // Log all warnings to console for debugging
            if (validation.warnings.length > 0) {
                console.info('ℹ️ Product Data Notes:', validation.warnings);
            }
        }

        // ✅ NEW: Inject Meta-Intelligence Layer
        if (typeof MetaIntelligenceEngine !== 'undefined') {
            schema = MetaIntelligenceEngine.enhance(schema, entities, effectivePrimaryType);

            // Show notification
            showToast('🧠 Meta-Intelligence Layer activated', 'success');
        }

        return schema;
    }

    /**
     * Validates product schema data for suspicious values
     * @param {Object} schema - Product schema to validate
     * @returns {Object} { isValid, warnings }
     */
    function validateProductSchema(schema) {
        const warnings = [];

        // 1. Price validation
        if (schema.offers?.price) {
            const price = parseFloat(schema.offers.price);

            if (isNaN(price)) {
                warnings.push('Invalid price format');
            } else if (price < 0.01) {
                warnings.push('Suspicious: Price is extremely low (< 0.01)');
            } else if (price > 1000000) {
                warnings.push('Suspicious: Price is extremely high (> 1,000,000)');
            }

            // Check for placeholder prices
            if ([1, 0, 99, 999, 9999].includes(price)) {
                warnings.push(`Suspicious: Price looks like placeholder (${price})`);
            }
        }

        // 2. Rating validation
        if (schema.aggregateRating) {
            const { ratingValue, reviewCount } = schema.aggregateRating;
            const rating = parseFloat(ratingValue);
            const count = parseInt(reviewCount);

            // Perfect rating with many reviews is suspicious
            if (rating >= 4.95 && count > 100) {
                warnings.push('Suspicious: Nearly perfect rating with many reviews');
            }

            // Very few reviews with perfect rating
            if (rating === 5.0 && count < 3) {
                warnings.push('Note: Perfect rating but very few reviews');
            }

            // Rating count of exactly 1 (default fallback)
            if (count === 1) {
                warnings.push('Note: Review count is 1 (might be auto-generated)');
            }
        }

        // 3. SKU validation
        if (schema.sku) {
            const sku = schema.sku.toString().trim();

            // Too short or suspicious patterns
            if (sku.length < 3) {
                warnings.push('Suspicious: SKU is very short');
            }

            if (/^(test|sample|demo|placeholder)/i.test(sku)) {
                warnings.push('Suspicious: SKU looks like test data');
            }
        }

        // 4. Availability with low stock
        if (schema.offers?.availability === 'https://schema.org/InStock') {
            // This is just informational, not a warning
        } else if (schema.offers?.availability === 'https://schema.org/OutOfStock') {
            warnings.push('Note: Product is marked as out of stock');
        }

        return {
            isValid: warnings.length === 0,
            warnings: warnings,
            criticalWarnings: warnings.filter(w => w.startsWith('Suspicious'))
        };
    }

    /**
     * Builds a schema fragment for nested types (like `hasPart`).
     * @param {string} type - The schema type for the fragment.
     * @param {Array} entities - The complete list of discovered entities.
     * @returns {Object|null} A valid schema fragment or null if essential data is missing.
     */
    function buildSchemaFragment(type, entities) {
        const fragment = { "@type": type };

        const populationMap = {
            'Product': populateProductProperties, 'Recipe': populateRecipeProperties,
            'VideoObject': populateVideoProperties, 'Review': populateReviewProperties,
            'HowTo': populateHowToProperties, 'FAQPage': populateFaqProperties,
            'Event': populateEventProperties, 'Organization': populateOrganizationProperties,
            'BreadcrumbList': populateBreadcrumbProperties, 'LocalBusiness': populateLocalBusinessProperties,
            'JobPosting': populateJobPostingProperties, 'SoftwareApplication': populateSoftwareAppProperties,
        };

        if (populationMap[type]) {
            populationMap[type](fragment, entities, false);
        }

        // Add fallback properties if not already populated
        if (!fragment.image) {
            const mainImage = entities.find(e => e.schemaProp === 'image');
            if (mainImage) fragment.image = mainImage.value;
        }
        if (!fragment.description) {
            const mainDesc = entities.find(e => e.schemaProp === 'description');
            if (mainDesc) fragment.description = mainDesc.value;
        }

        // A fragment is useless without a name, except for a few types.
        const requiresName = ['Product', 'Review', 'Recipe', 'HowTo', 'Event', 'VideoObject', 'JobPosting', 'SoftwareApplication', 'LocalBusiness'];
        if (requiresName.includes(type) && !fragment.name) {
            const generalName = entities.find(e => e.schemaProp === 'name');
            if (generalName) fragment.name = generalName.value;
            else return null; // If still no name, the fragment is invalid.
        }

        // A fragment must have more than just a type to be useful.
        if (Object.keys(fragment).length <= 1) {
            return null;
        }

        return fragment;
    }

    // ===================================================================
    //  Schema Property Population Functions
    // ===================================================================

    /**
     * Populates breadcrumb list properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     */
    function populateBreadcrumbProperties(schema, entities) {
        const breadcrumbEntity = entities.find(e => e.type === 'Breadcrumb');
        if (breadcrumbEntity && breadcrumbEntity.rawValue) {
            schema.itemListElement = breadcrumbEntity.rawValue.map((item, index) => {
                const listItem = {
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": item.name
                };
                if (item.url) listItem.item = item.url;
                return listItem;
            });
        }
    }

    /**
     * Populates local business properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateLocalBusinessProperties(schema, entities, isPrimary) {
        // First populate organization properties
        populateOrganizationProperties(schema, entities, isPrimary);

        const bizEntities = entities.filter(e => e.type === 'LocalBusiness');

        const priceRangeEntity = bizEntities.find(e => e.schemaProp === 'priceRange');
        if (priceRangeEntity) schema.priceRange = priceRangeEntity.value;

        const openingHoursEntity = bizEntities.find(e => e.schemaProp === 'openingHoursSpecification');
        if (openingHoursEntity) schema.openingHours = openingHoursEntity.value;

        schema["@type"] = "LocalBusiness";
    }

    /**
     * Validates and parses a salary input string with enhanced flexibility.
     * Handles single values, ranges (MIN-MAX), and common currency/text noise.
     * @param {string} salaryInput - The raw input string from the user or page.
     * @returns {{isValid: boolean, error: string|null, values: {min?: number, max?: number, single?: number}|null}}
     */
    function validateSalaryRange(salaryInput) {
        // 1. Initial Sanitization & Guard Clause
        const trimmedInput = salaryInput?.trim();
        if (!trimmedInput) {
            return { isValid: true, error: null, values: null }; // Empty is a valid (ignorable) state.
        }

        // 2. Intelligent Cleaning: Remove common text noise and currency symbols.
        // Enhanced cleaning with Arabic number support
        let cleanInput = trimmedInput
            // Normalize Arabic numerals
            .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
            // Remove currency symbols
            .replace(/[$€£¥₪ر\.س|ريال|درهم|دينار|جنيه]/gi, '')
            // Remove currency codes
            .replace(/\b(USD|SAR|EGP|AED|KWD|QAR|EUR|GBP)\b/gi, '')
            // Remove thousand separators (both comma and period in European format)
            .replace(/,/g, '')
            // Remove words like "per", "year", "month"
            .replace(/\b(per|year|month|hour|day|annually|monthly|ساعة|شهر|سنة)\b/gi, '')
            .trim();

        // 3. Range Detection Logic
        // Uses a more robust separator detection (dash, hyphen, em-dash)
        const separator = /[-–—]/;
        if (separator.test(cleanInput)) {
            const parts = cleanInput.split(separator);

            if (parts.length !== 2) {
                return { isValid: false, error: 'Invalid range format. Use a single dash: MIN-MAX.', values: null };
            }

            const minStr = parts[0].trim();
            const maxStr = parts[1].trim();

            // Guard against empty parts like "50000-"
            if (!minStr || !maxStr) {
                return { isValid: false, error: 'Both minimum and maximum values are required for a range.', values: null };
            }

            const minValue = parseFloat(minStr);
            const maxValue = parseFloat(maxStr);

            if (isNaN(minValue) || isNaN(maxValue)) {
                return { isValid: false, error: 'Salary values must be numbers.', values: null };
            }
            if (minValue <= 0 || maxValue <= 0) {
                return { isValid: false, error: 'Salary values must be positive.', values: null };
            }
            // Reasonable range validation
            if (minValue < 100 || maxValue < 100) {
                return {
                    isValid: false,
                    error: 'Salary values seem too low. Please check the input.',
                    values: null
                };
            }

            if (maxValue > 10000000) {
                return {
                    isValid: false,
                    error: 'Salary values seem unreasonably high. Please verify.',
                    values: null
                };
            }

            if (maxValue - minValue < 100) {
                return {
                    isValid: false,
                    error: 'Salary range is too narrow. Please use a realistic range.',
                    values: null
                };
            }
            if (minValue >= maxValue) {
                return { isValid: false, error: `Minimum salary (${minValue}) must be less than maximum (${maxValue}).`, values: null };
            }

            return { isValid: true, error: null, values: { min: minValue, max: maxValue } };

        } else {
            // 4. Single Value Logic
            const singleValue = parseFloat(cleanInput);

            if (isNaN(singleValue)) {
                // Check for known non-numeric but valid inputs like "Free" or "Negotiable"
                if (/free|negotiable|competitive/i.test(cleanInput)) {
                    return { isValid: true, error: null, values: null }; // Valid, but no numeric value to process.
                }
                return { isValid: false, error: 'Salary must be a valid number.', values: null };
            }

            if (singleValue <= 0) {
                return { isValid: false, error: 'Salary must be a positive number.', values: null };
            }

            return { isValid: true, error: null, values: { single: singleValue } };
        }
    }

    /**
    * Populates JobPosting properties using the Strategy Pattern for location handling.
    * This function now delegates complex location logic to specialized strategy classes.
    *
    * @param {Object} schema - The schema object to populate.
    * @param {Array} entities - All discovered entities.
    * @param {boolean} isPrimary - Whether this is the primary schema type.
    */
    function populateJobPostingProperties(schema, entities, isPrimary) {
        const findJobEntity = (prop) => entities.find(e => e.type === 'JobPosting' && e.schemaProp === prop);

        // --- 1. Core Properties ---
        schema.title = findJobEntity('title')?.value || (isPrimary ? entities.find(e => e.schemaProp === 'name')?.value : null) || 'Job Posting';
        const orgData = getPublisherData(entities);
        if (orgData && orgData.name !== schema.title) {
            schema.hiringOrganization = orgData;
        } else {
            schema.hiringOrganization = { "@type": "Organization", "name": "A Company" };
        }
        if (!schema.description) {
            const mainDesc = entities.find(e => e.schemaProp === 'description')?.value;
            if (mainDesc) {
                schema.description = mainDesc;
            } else {
                schema.description = `An exciting opportunity for a ${schema.title} at ${schema.hiringOrganization.name}. Apply today!`;
            }
        }

        const identifierEntity = findJobEntity('identifier');
        if (identifierEntity?.value) {
            schema.identifier = {
                "@type": "PropertyValue",
                "name": schema.hiringOrganization.name || "Job ID",
                "value": identifierEntity.value
            };
        }

        // --- 2. Date Properties ---
        const datePostedEntity = findJobEntity('datePosted');
        if (datePostedEntity?.value) {
            try {
                const postDate = new Date(datePostedEntity.value);
                schema.datePosted = postDate.toISOString();
                const validThroughValue = DOM.customJobValidThrough.value.trim();
                if (validThroughValue) {
                    schema.validThrough = new Date(validThroughValue).toISOString();
                } else {
                    const expiryDate = new Date(postDate);
                    expiryDate.setDate(expiryDate.getDate() + 30);
                    schema.validThrough = expiryDate.toISOString();
                }
            } catch (e) { console.warn("Could not parse job posting date.", e); }
        }

        // --- 3. Definitive Location Builder (using Strategy Pattern) ---
        // The UI determines which strategy to use.
        const locationType = DOM.customJobLocationType.value;

        // Use the factory to get the correct location "expert".
        const locationStrategy = JobLocationStrategyFactory.create(locationType, schema, entities, DOM);

        // Ask the expert to do its job.
        locationStrategy.apply();

        // --- 4. Definitive Salary Builder with Range Support ---
        const salaryEntity = findJobEntity('baseSalary');
        let finalSalaryText = DOM.customJobSalaryValue.value.trim() || salaryEntity?.value || '';

        if (finalSalaryText) {
            const validation = validateSalaryRange(finalSalaryText);

            if (!validation.isValid) {
                showToast(validation.error, 'danger');

                DOM.customJobSalaryValue.classList.add('is-invalid');

                console.warn('Salary validation failed:', validation.error);

            } else if (validation.values) {
                DOM.customJobSalaryValue.classList.remove('is-invalid');

                let valueObject = {
                    "@type": "QuantitativeValue"
                };

                if (validation.values.min && validation.values.max) {
                    // Range format
                    valueObject.minValue = validation.values.min.toString();
                    valueObject.maxValue = validation.values.max.toString();
                } else if (validation.values.single) {
                    // Single value format
                    valueObject.value = validation.values.single.toString();
                }

                // Determine unitText
                let detectedUnitText = "YEAR"; // Default
                if (salaryEntity?.value) {
                    const lowerSalaryText = salaryEntity.value.toLowerCase();
                    if (lowerSalaryText.includes('hour') || lowerSalaryText.includes('ساعة')) detectedUnitText = "HOUR";
                    else if (lowerSalaryText.includes('day') || lowerSalaryText.includes('يوم')) detectedUnitText = "DAY";
                    else if (lowerSalaryText.includes('week') || lowerSalaryText.includes('أسبوع')) detectedUnitText = "WEEK";
                    else if (lowerSalaryText.includes('month') || lowerSalaryText.includes('شهر')) detectedUnitText = "MONTH";
                }
                valueObject.unitText = detectedUnitText;

                schema.baseSalary = {
                    "@type": "MonetaryAmount",
                    "currency": findJobEntity('currency')?.value || inferCurrency(finalSalaryText) || "USD",
                    "value": valueObject
                };
            }
        }

        // --- 5. Employment Type ---
        const detectedEmploymentType = findJobEntity('employmentType')?.value;
        schema.employmentType = DOM.customJobEmploymentType.value || detectedEmploymentType || "FULL_TIME";

        // --- Direct Apply Flag ---
        if (DOM.customJobDirectApply && DOM.customJobDirectApply.checked) {
            schema.directApply = true;
        }

        // --- 6. Beta Properties (Experience & Education) ---
        // Experience Requirements
        const manualMonths = DOM.customJobExperienceValue.value.trim();
        if (manualMonths) {
            schema.experienceRequirements = {
                "@type": "OccupationalExperienceRequirements",
                "monthsOfExperience": manualMonths
            };
        } else {
            const expEntity = findJobEntity('experienceRequirements');
            if (expEntity?.value) {
                // Try to extract number of years/months
                const yearMatch = expEntity.value.match(/(\d+)\+?\s*years?/i);
                const monthMatch = expEntity.value.match(/(\d+)\+?\s*months?/i);
                if (yearMatch) {
                    schema.experienceRequirements = {
                        "@type": "OccupationalExperienceRequirements",
                        "monthsOfExperience": parseInt(yearMatch[1], 10) * 12
                    };
                } else if (monthMatch) {
                    schema.experienceRequirements = {
                        "@type": "OccupationalExperienceRequirements",
                        "monthsOfExperience": parseInt(monthMatch[1], 10)
                    };
                }
            }
        }

        // Education Requirements
        const manualEducation = DOM.customJobEducationValue.value.trim();
        if (manualEducation) {
            schema.educationRequirements = {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": manualEducation
            };
        } else {
            const eduEntity = findJobEntity('educationRequirements');
            if (eduEntity?.value) {
                const lowerEduText = eduEntity.value.toLowerCase();
                const eduLevels = {
                    "bachelor degree": /bachelor|b\.s|b\.a/i,
                    "postgraduate degree": /master|phd|m\.s|doctorate/i,
                    "associate degree": /associate/i,
                    "professional certificate": /certificate|certification/i
                };
                for (const level in eduLevels) {
                    if (eduLevels[level].test(lowerEduText)) {
                        schema.educationRequirements = {
                            "@type": "EducationalOccupationalCredential",
                            "credentialCategory": level
                        };
                        break;
                    }
                }
            }
        }
    }

    /**
     * Populates video object properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateVideoProperties(schema, entities, isPrimary) {
        const videoEntities = entities.filter(e => e.type === 'VideoObject');

        // Handle date with fallback to publication date
        let finalDateValue = null;
        const uploadDateEntity = videoEntities.find(e => e.schemaProp === 'uploadDate');
        const publicationDateEntity = entities.find(e => e.schemaProp === 'datePublished' && e.type === 'Article');

        if (uploadDateEntity) {
            finalDateValue = uploadDateEntity.value;
        } else if (publicationDateEntity) {
            finalDateValue = publicationDateEntity.rawValue || publicationDateEntity.value;
        }

        if (finalDateValue) {
            try {
                schema.uploadDate = new Date(finalDateValue).toISOString();
            } catch (err) {
                // Ignore invalid date
            }
        }

        // Add other properties
        videoEntities.forEach(e => {
            const handledProps = ['uploadDate', 'name', 'image'];
            if (handledProps.includes(e.schemaProp)) return;
            schema[e.schemaProp] = e.value;
        });

        // Thumbnail and image
        const thumbnailEntity = videoEntities.find(e => e.schemaProp === 'thumbnailUrl');
        if (thumbnailEntity) {
            schema.thumbnailUrl = thumbnailEntity.value;
            schema.image = thumbnailEntity.value;
        }

        // Publisher
        const publisherData = getPublisherData(entities);
        if (publisherData) schema.publisher = publisherData;

        // Name with fallback
        const nameEntity = videoEntities.find(e => e.schemaProp === 'name');
        if (nameEntity) {
            schema.name = nameEntity.value;
        } else if (isPrimary && !schema.name) {
            const pageTitle = entities.find(e => e.schemaProp === 'name');
            if (pageTitle) schema.name = pageTitle.value;
        }
    }

/**
 * Enhanced getPublisherData() - Google Documentation Compliant
 * Integrates seamlessly with Meta-Intelligence Engine
 * 
 * @param {Array} entities - Discovered entities from page analysis
 * @returns {Object|null} Fully structured Organization schema or null
 */
function getPublisherData(entities) {
    const empIsAvailable = typeof getEntity !== 'undefined';
    const orgData = { "@type": "Organization" };

    // ===================================================================
    //  PHASE 1: Core Properties (Required)
    // ===================================================================

    // 1. Name (REQUIRED by Google)
    const empName = empIsAvailable ? getEntity('organizationName') : null;
    if (empName) {
        orgData.name = empName;
    } else {
        const orgNameEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'name');
        if (orgNameEntity) {
            orgData.name = orgNameEntity.value;
        }
    }

    // Fallback: Page title (weak but better than nothing)
    if (!orgData.name) {
        const pageTitle = entities.find(e => e.schemaProp === 'name');
        if (pageTitle) {
            orgData.name = pageTitle.value;
        } else {
            return null; // Cannot create valid Organization without name
        }
    }

    // 2. URL (Recommended)
    const empUrl = empIsAvailable ? getEntity('url') : null;
    if (empUrl) {
        orgData.url = empUrl;
    } else {
        const currentUrl = window.location.origin;
        if (currentUrl && currentUrl !== 'null') {
            orgData.url = currentUrl;
        }
    }

    // ===================================================================
    //  PHASE 2: Logo (Strongly Recommended)
    // ===================================================================

    const empLogo = empIsAvailable ? getEntity('logo') : null;
    if (empLogo) {
        orgData.logo = {
            "@type": "ImageObject",
            "url": empLogo
        };
    } else {
        const logoEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'logo');
        if (logoEntity) {
            orgData.logo = {
                "@type": "ImageObject",
                "url": logoEntity.value
            };
        }
    }

    // ===================================================================
    //  PHASE 3: Structured PostalAddress (Google Best Practice)
    // ===================================================================

    if (empIsAvailable) {
        const addressComponents = {
            streetAddress: getEntity('streetAddress'),
            addressLocality: getEntity('addressLocality'),
            addressRegion: getEntity('addressRegion'),
            postalCode: getEntity('postalCode'),
            addressCountry: getEntity('addressCountry')
        };

        // Only create PostalAddress if we have meaningful data
        const hasAddressData = Object.values(addressComponents).some(v => v);
        
        if (hasAddressData) {
            const postalAddress = { "@type": "PostalAddress" };
            
            for (const [key, value] of Object.entries(addressComponents)) {
                if (value) {
                    postalAddress[key] = value;
                }
            }

            orgData.address = postalAddress;
        }
    }

    // Fallback: Parse unstructured address from entities
    if (!orgData.address) {
        const addressEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'address');
        if (addressEntity) {
            orgData.address = parseUnstructuredAddress(addressEntity.value);
        }
    }

    // ===================================================================
    //  PHASE 4: Contact Information
    // ===================================================================

    const empTelephone = empIsAvailable ? getEntity('telephone') : null;
    const empEmail = empIsAvailable ? getEntity('email') : null;

    if (empTelephone || empEmail) {
        const contactPoint = {
            "@type": "ContactPoint",
            "contactType": "customer service"
        };

        if (empTelephone) contactPoint.telephone = empTelephone;
        if (empEmail) contactPoint.email = empEmail;

        // Single contact point or array based on data
        orgData.contactPoint = contactPoint;
    } else {
        // Fallback: from entities
        const telephoneEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'telephone');
        if (telephoneEntity) {
            orgData.contactPoint = {
                "@type": "ContactPoint",
                "telephone": telephoneEntity.value,
                "contactType": "customer service"
            };
        }
    }

    // ===================================================================
    //  PHASE 5: Social Media Links (sameAs)
    // ===================================================================

    if (empIsAvailable) {
        const socialLinks = [
            getEntity('facebook'),
            getEntity('twitter'),
            getEntity('linkedin'),
            getEntity('instagram'),
            getEntity('youtube')
        ].filter(Boolean); // Remove null/undefined

        if (socialLinks.length > 0) {
            orgData.sameAs = socialLinks;
        }
    }

    // ===================================================================
    //  PHASE 6: Additional Properties (Custom Fields)
    // ===================================================================

    if (empIsAvailable) {
        const savedEmpData = StorageManager.get(StorageManager.KEYS.EMP) || {};
        const additionalProperties = [];

        // Define keys to ignore (system/complex objects)
        const IGNORED_KEYS = new Set([
            // Core fields
            'organizationName', 'logo', 'url', 'telephone', 'email', 'mainAuthor',
            // Address fields
            'streetAddress', 'addressLocality', 'addressRegion', 'postalCode', 'addressCountry',
            // Social fields
            'facebook', 'twitter', 'linkedin', 'instagram', 'youtube',
            // Complex objects
            'loyaltyProgram'
        ]);

        for (const key in savedEmpData) {
            if (!IGNORED_KEYS.has(key)) {
                const value = savedEmpData[key];
                
                // Only add simple, non-empty values
                if (value && typeof value !== 'object' && value.toString().trim()) {
                    additionalProperties.push({
                        "@type": "PropertyValue",
                        "name": key,
                        "value": value.toString().trim()
                    });
                }
            }
        }

        if (additionalProperties.length > 0) {
            orgData.additionalProperty = additionalProperties;
        }
    }

    // ===================================================================
    //  PHASE 7: Loyalty Program Integration (Advanced)
    // ===================================================================

    if (empIsAvailable) {
        const savedEmpData = StorageManager.get(StorageManager.KEYS.EMP) || {};
        const loyaltyProgram = savedEmpData.loyaltyProgram;

        if (loyaltyProgram && loyaltyProgram.name && loyaltyProgram.tiers?.length > 0) {
            orgData.hasMemberProgram = {
                "@type": "MemberProgram",
                "name": loyaltyProgram.name,
                "hasMemberProgramTier": loyaltyProgram.tiers.map(tier => ({
                    "@type": "MemberProgramTier",
                    "@id": tier.id,
                    "name": tier.name
                }))
            };
        }
    }

    // ===================================================================
    //  FINAL VALIDATION & RETURN
    // ===================================================================

    // Ensure we have minimum required data
    if (!orgData.name) {
        console.warn('⚠️ Cannot create Organization schema without name');
        return null;
    }

    return orgData;
}

/**
 * Helper: Parse unstructured address into PostalAddress
 * @param {string} addressString - Raw address text
 * @returns {Object} PostalAddress schema object
 */
function parseUnstructuredAddress(addressString) {
    const address = { "@type": "PostalAddress" };
    
    if (!addressString) return address;

    // Split by comma
    const parts = addressString.split(',').map(p => p.trim()).filter(Boolean);

    if (parts.length >= 3) {
        // Typical format: Street, City, Country
        address.streetAddress = parts[0];
        address.addressLocality = parts[1];

        // Last part: country or region + country
        const lastPart = parts[parts.length - 1];
        const secondLastPart = parts[parts.length - 2];

        // Check if second last part looks like postal code
        if (/\d{5,}/.test(secondLastPart)) {
            address.postalCode = secondLastPart;
            address.addressCountry = lastPart;
        } else {
            address.addressRegion = secondLastPart;
            address.addressCountry = lastPart;
        }
    } else if (parts.length === 2) {
        // Minimal: City, Country
        address.addressLocality = parts[0];
        address.addressCountry = parts[1];
    } else {
        // Single string - use as streetAddress
        address.streetAddress = addressString;
    }

    return address;
}

    /**
     * Populates article properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     */
    function populateArticleProperties(schema, entities) {
        const empAuthor = typeof getEntity !== 'undefined' ? getEntity('mainAuthor') : null;

        // Author
        if (empAuthor) {
            schema.author = { "@type": "Person", "name": empAuthor };
            const dateEntity = entities.find(e => e.type === 'Article' && e.schemaProp === 'datePublished');
            if (dateEntity) schema.datePublished = dateEntity.rawValue || dateEntity.value;
        } else {
            const authorEntity = entities.find(e => e.type === 'Article' && e.schemaProp === 'author');
            if (authorEntity) schema.author = { "@type": "Person", "name": authorEntity.value };
            const dateEntity = entities.find(e => e.type === 'Article' && e.schemaProp === 'datePublished');
            if (dateEntity) schema.datePublished = dateEntity.rawValue || dateEntity.value;
        }

        // Headline
        if (!schema.headline && schema.name) schema.headline = schema.name;

        // Publisher
        const publisherData = getPublisherData(entities);
        if (publisherData) schema.publisher = publisherData;
    }

    /**
     * Populates FAQ page properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateFaqProperties(schema, entities, isPrimary) {
        const faqEntity = entities.find(e => e.type === 'FAQ');
        if (faqEntity) {
            if (isPrimary && faqEntity.contextualName) {
                schema.name = faqEntity.contextualName;
            } else if (faqEntity.contextualName) {
                schema.name = faqEntity.contextualName;
            }

            schema.mainEntity = faqEntity.rawValue.map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": { "@type": "Answer", "text": item.a }
            }));
        }
    }

    /**
     * [HELPER] Builds the shipping details object for an offer.
     * @param {Object} offer - The offer object to attach details to.
     * @param {Function} findProductEntity - Helper to find a specific product entity.
     */
    function buildShippingDetails(offer, findProductEntity) {
        const shippingRateValue = findProductEntity('shippingRate')?.value || "0";
        const shippingCountryValue = findProductEntity('shippingCountry')?.value || "US";
        const countryList = shippingCountryValue.split(',').map(c => c.trim()).filter(Boolean);
        const offerShippingDetails = {
            "@type": "OfferShippingDetails",
            "shippingRate": { "@type": "MonetaryAmount", "value": shippingRateValue, "currency": offer.priceCurrency },
            "shippingDestination": { "@type": "DefinedRegion", "addressCountry": countryList.length > 1 ? countryList : shippingCountryValue }
        };
        const handlingTimeValue = findProductEntity('handlingTime')?.value;
        const transitTimeValue = findProductEntity('transitTime')?.value;
        const parseTimeRange = (rangeString) => {
            if (!rangeString) return null;
            const parts = rangeString.split('-').map(p => parseInt(p.trim(), 10));
            if (parts.length === 1 && !isNaN(parts[0])) return { minValue: parts[0], maxValue: parts[0] };
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) return { minValue: parts[0], maxValue: parts[1] };
            return null;
        };
        const handlingTime = parseTimeRange(handlingTimeValue);
        const transitTime = parseTimeRange(transitTimeValue);
        if (handlingTime || transitTime) {
            offerShippingDetails.deliveryTime = { "@type": "ShippingDeliveryTime" };
            if (handlingTime) {
                offerShippingDetails.deliveryTime.handlingTime = { "@type": "QuantitativeValue", "minValue": handlingTime.minValue, "maxValue": handlingTime.maxValue, "unitCode": "DAY" };
            }
            if (transitTime) {
                offerShippingDetails.deliveryTime.transitTime = { "@type": "QuantitativeValue", "minValue": transitTime.minValue, "maxValue": transitTime.maxValue, "unitCode": "DAY" };
            }
        }
        offer.shippingDetails = offerShippingDetails;
    }

    /**
     * [HELPER] Builds the return policy object for an offer.
     * @param {Object} offer - The offer object to attach details to.
     * @param {Function} findProductEntity - Helper to find a specific product entity.
     */
    function buildReturnPolicy(offer, findProductEntity) {
        const returnDaysValue = findProductEntity('returnDays')?.value;
        const returnFeesValue = findProductEntity('returnFees')?.value;
        const shippingCountryValue = findProductEntity('shippingCountry')?.value || "US";
        const countryList = shippingCountryValue.split(',').map(c => c.trim()).filter(Boolean);
        offer.hasMerchantReturnPolicy = {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": countryList.length > 1 ? countryList : shippingCountryValue,
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": parseInt(returnDaysValue) || 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": (returnFeesValue && returnFeesValue !== "0") ? "https://schema.org/ReturnShippingFees" : "https://schema.org/FreeReturn"
        };
        if (returnFeesValue && returnFeesValue !== "0") {
            offer.hasMerchantReturnPolicy.returnShippingFeesAmount = {
                "@type": "MonetaryAmount", "value": returnFeesValue, "currency": offer.priceCurrency
            };
        }
    }

    /**
     * [HELPER] Builds the audience object for a product.
     * @param {Function} findProductEntity - Helper to find a specific product entity.
     * @returns {Object|null} The audience object or null.
     */
    function buildAudienceObject(findProductEntity) {
        const gender = findProductEntity('gender')?.value;
        const ageGroup = findProductEntity('ageGroup')?.value;
        if (!gender && !ageGroup) return null;
        const audience = { "@type": "PeopleAudience" };
        if (gender) { audience.suggestedGender = gender; }
        const ageMap = {
            "Newborn": { "maxValue": 0.25 }, "Infant": { "minValue": 0.25, "maxValue": 1 },
            "Toddler": { "minValue": 1, "maxValue": 5 }, "Kids": { "minValue": 5, "maxValue": 13 },
            "Adult": { "minValue": 13 }
        };
        if (ageGroup && ageMap[ageGroup]) {
            audience.suggestedAge = { "@type": "QuantitativeValue", ...ageMap[ageGroup], "unitCode": "ANN" };
        }
        return audience;
    }

    /**
     * [HELPER] Builds the aggregateRating object for a product.
     * @param {Array} entities - All discovered entities.
     * @returns {Object|null} The aggregateRating object or null.
     */
    function _buildAggregateRating(entities) {
        const ratingEntity = entities.find(e => e.schemaProp === 'reviewRating');
        const countEntity = entities.find(e => e.schemaProp === 'reviewCount');

        if (ratingEntity) {
            const ratingValue = parseFloat(ratingEntity.value);
            const reviewCount = countEntity ? parseInt(countEntity.value) : null;

            if (reviewCount && reviewCount >= 1) {
                return {
                    "@type": "AggregateRating",
                    "ratingValue": ratingValue.toString(),
                    "reviewCount": reviewCount.toString(),
                    "bestRating": "5"
                };
            } else {
                console.warn('Insufficient review data for aggregateRating (need at least 1 review)');
            }
        }
        return null;
    }

    /**
     * [HELPER] Builds the complete "offers" object for a single product.
     * @param {Array} productEntities - Product-specific entities.
     * @param {Function} findProductEntity - Helper to find a specific product entity.
     * @returns {Object|null} The offers object or null if no price is found.
     */
    function _buildSingleProductOffer(productEntities, findProductEntity) {
        const regularPriceEntity = findProductEntity('price');
        const regularPrice = regularPriceEntity?.value;
        const memberPriceRows = document.querySelectorAll('#memberPricingContainer .member-price-row');

        if (!regularPrice && memberPriceRows.length === 0) {
            return null;
        }

        const offer = {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
        };
        if (regularPrice) {
            offer.price = regularPrice;
        }

        offer.priceCurrency = _determineFinalCurrency(findProductEntity);

        const validUntilDate = findProductEntity('priceValidUntil')?.value;
        if (validUntilDate) {
            try {
                offer.priceValidUntil = new Date(validUntilDate).toISOString().split('T')[0];
            } catch (e) { console.warn("Invalid date for priceValidUntil"); }
        }

        const priceSpecifications = [];
        const strikethroughPrice = findProductEntity('strikethroughPrice')?.value;
        if (strikethroughPrice) {
            priceSpecifications.push({
                "@type": "UnitPriceSpecification", "priceType": "https://schema.org/StrikethroughPrice",
                "price": strikethroughPrice, "priceCurrency": offer.priceCurrency
            });
        }

        memberPriceRows.forEach(row => {
            const tierId = row.querySelector('.member-tier-select').value;
            const priceInput = row.querySelector('.member-price-input');
            const memberPriceValue = priceInput.value.trim();
            if (tierId && memberPriceValue) {
                const price = parseFloat(memberPriceValue);
                if (isNaN(price) || price < 0) {
                    priceInput.classList.add('is-invalid');
                    showToast(`Invalid member price: "${memberPriceValue}". Please enter a valid number.`, 'warning');
                    return;
                }
                priceInput.classList.remove('is-invalid');
                priceSpecifications.push({
                    "@type": "UnitPriceSpecification", "price": price.toString(), "priceCurrency": offer.priceCurrency,
                    "validForMemberTier": { "@type": "MemberProgramTier", "@id": tierId }
                });
            }
        });

        if (!regularPrice && priceSpecifications.length > 0) {
            const prices = priceSpecifications.map(p => parseFloat(p.price)).filter(p => !isNaN(p));
            if (prices.length > 0) {
                offer.price = Math.max(...prices).toString();
            }
        }

        if (priceSpecifications.length > 0) {
            offer.priceSpecification = priceSpecifications.length > 1 ? priceSpecifications : priceSpecifications[0];
        }

        buildShippingDetails(offer, findProductEntity);
        buildReturnPolicy(offer, findProductEntity);
        return offer;
    }

    /**
     * [HELPER] Populates the schema object for a single product.
     * @param {Object} schema - The schema object to populate.
     * @param {Array} entities - All discovered entities.
     * @param {Array} productEntities - Product-specific entities.
     * @param {Function} findProductEntity - Helper to find a specific product entity.
     */
    function _populateSingleProduct(schema, entities, productEntities, findProductEntity) {
        schema.name = findProductEntity('contextualName')?.value || entities.find(e => e.schemaProp === 'name')?.value;

        let finalImageUrls = [];
        const manualImageUrls = DOM.customProductImageOverride?.value?.trim();
        if (manualImageUrls) {
            finalImageUrls = manualImageUrls.split(',').map(url => url.trim()).filter(Boolean);
        }
        if (finalImageUrls.length === 0) {
            const imageEntity = findProductEntity('image');
            if (imageEntity) {
                if (imageEntity.rawValue && Array.isArray(imageEntity.rawValue)) {
                    finalImageUrls = imageEntity.rawValue;
                } else if (imageEntity.value) {
                    finalImageUrls = imageEntity.value.split(',').map(url => url.trim()).filter(Boolean);
                }
            }
        }
        if (finalImageUrls.length === 0) {
            const ogImageEntity = entities.find(e => e.schemaProp === 'image' && !e.type);
            if (ogImageEntity && ogImageEntity.value) {
                finalImageUrls.push(ogImageEntity.value);
            }
        }
        if (finalImageUrls.length > 1) {
            schema.image = finalImageUrls;
        } else if (finalImageUrls.length === 1) {
            schema.image = finalImageUrls[0];
        }

        let finalDescription = null;
        const manualOverride = DOM.customProductDescriptionOverride?.value?.trim();
        if (manualOverride) {
            finalDescription = manualOverride;
        }
        if (!finalDescription) {
            const descriptionEntity = findProductEntity('description');
            if (descriptionEntity) {
                finalDescription = descriptionEntity.value;
            }
        }
        if (finalDescription) {
            schema.description = finalDescription;
        }

        schema.brand = findProductEntity('brand') ? { "@type": "Brand", "name": findProductEntity('brand').value } : null;
        schema.sku = findProductEntity('sku')?.value;
        schema.gtin = findProductEntity('gtin')?.value;
        schema.mpn = findProductEntity('mpn')?.value;
        schema.color = findProductEntity('color')?.value;
        schema.material = findProductEntity('material')?.value;
        schema.pattern = findProductEntity('pattern')?.value;
        schema.audience = buildAudienceObject(findProductEntity);

        const sizeValue = findProductEntity('size')?.value;
        if (sizeValue) {
            const sizeSystem = findProductEntity('sizeSystem')?.value;
            const sizeGroup = findProductEntity('sizeGroup')?.value;
            if (sizeSystem || sizeGroup) {
                schema.size = { "@type": "SizeSpecification", "name": sizeValue };
                if (sizeSystem) { schema.size.sizeSystem = `https://schema.org/WearableSizeSystem${sizeSystem}`; }
                if (sizeGroup) { schema.size.sizeGroup = `https://schema.org/WearableSizeGroup${sizeGroup}`; }
            } else {
                schema.size = sizeValue;
            }
        }

        schema.offers = _buildSingleProductOffer(productEntities, findProductEntity);
        schema.aggregateRating = _buildAggregateRating(entities);
    }

     /**
     * [HELPER] Populates the schema object for a product group with variants.
     * @param {Object} schema - The schema object to populate.
     * @param {Array} entities - All discovered entities.
     * @param {Array} productEntities - Product-specific entities.
     * @param {Function} findProductEntity - Helper to find a specific product entity.
     */
    function _populateProductGroup(schema, entities, productEntities, findProductEntity) {
        const seenSkus = new Set();
        let hasDuplicateSkus = false;
        const groupId = DOM.productGroupId.value.trim();
        schema['@type'] = 'ProductGroup';
        schema.productGroupID = groupId;
        schema['@id'] = `#${groupId}`;

        const variesBy = Array.from(DOM.variesByCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        if (variesBy.length > 0) { schema.variesBy = variesBy; }

        const inheritable = {
            brand: findProductEntity('brand') ? { "@type": "Brand", "name": findProductEntity('brand').value } : null,
            image: (() => {
                const imgEntity = findProductEntity('image');
                if (!imgEntity) return null;
                if (imgEntity.rawValue && Array.isArray(imgEntity.rawValue)) {
                    return imgEntity.rawValue.length > 1 ? imgEntity.rawValue : imgEntity.rawValue[0];
                }
                if (imgEntity.value) {
                    const urls = imgEntity.value.split(',').map(u => u.trim()).filter(Boolean);
                    return urls.length > 1 ? urls : urls[0];
                }
                return null;
            })(),
            description: findProductEntity('description')?.value,
            material: findProductEntity('material')?.value,
            pattern: findProductEntity('pattern')?.value,
            gtin: findProductEntity('gtin')?.value,
            mpn: findProductEntity('mpn')?.value,
            audience: buildAudienceObject(findProductEntity)
        };
        Object.keys(inheritable).forEach(key => (inheritable[key] === undefined || inheritable[key] === null) && delete inheritable[key]);

        schema.name = findProductEntity('contextualName')?.value || entities.find(e => e.schemaProp === 'name')?.value;
        Object.assign(schema, inheritable);

        const finalCurrency = _determineFinalCurrency(findProductEntity);

        const masterOfferDetails = {
            priceCurrency: finalCurrency,
            priceSpecifications: []
        };
        const validUntilDate = findProductEntity('priceValidUntil')?.value;
        if (validUntilDate) {
            try {
                masterOfferDetails.priceValidUntil = new Date(validUntilDate).toISOString().split('T')[0];
            } catch (e) { /* ignore */ }
        }
        const strikethroughPrice = findProductEntity('strikethroughPrice')?.value;
        if (strikethroughPrice) {
            masterOfferDetails.priceSpecifications.push({
                "@type": "UnitPriceSpecification", "priceType": "https://schema.org/StrikethroughPrice",
                "price": strikethroughPrice, "priceCurrency": masterOfferDetails.priceCurrency
            });
        }
        document.querySelectorAll('#memberPricingContainer .member-price-row').forEach(row => {
            const tierId = row.querySelector('.member-tier-select').value;
            const priceInput = row.querySelector('.member-price-input');
            const priceValue = priceInput.value.trim();
            if (tierId && priceValue) {
                const price = parseFloat(priceValue);
                if (isNaN(price) || price < 0) {
                    priceInput.classList.add('is-invalid');
                    showToast(`Invalid member price: "${priceValue}"`, 'warning');
                    return;
                }
                priceInput.classList.remove('is-invalid');
                masterOfferDetails.priceSpecifications.push({
                    "@type": "UnitPriceSpecification", "price": price.toString(), "priceCurrency": masterOfferDetails.priceCurrency,
                    "validForMemberTier": { "@type": "MemberProgramTier", "@id": tierId }
                });
            }
        });
        const tempOfferForLogistics = { priceCurrency: masterOfferDetails.priceCurrency };
        buildShippingDetails(tempOfferForLogistics, findProductEntity);
        buildReturnPolicy(tempOfferForLogistics, findProductEntity);
        masterOfferDetails.shippingDetails = tempOfferForLogistics.shippingDetails;
        masterOfferDetails.hasMerchantReturnPolicy = tempOfferForLogistics.hasMerchantReturnPolicy;

        const variants = [];
        document.querySelectorAll('#variantsContainer .variant-row').forEach(row => {
            const variant = { "@type": "Product", ...inheritable, "isVariantOf": { "@id": `#${groupId}` } };
            const variantImageUrl = row.querySelector('.variant-image')?.value.trim();
            if (variantImageUrl) { variant.image = variantImageUrl; }
            const skuInput = row.querySelector('.variant-sku');
            const sku = skuInput?.value.trim();
            if (sku) {
                if (seenSkus.has(sku)) {
                    skuInput.classList.add('is-invalid');
                    hasDuplicateSkus = true;
                } else {
                    skuInput.classList.remove('is-invalid');
                    seenSkus.add(sku);
                    variant.sku = sku;
                }
            }
            const name = row.querySelector('.variant-name')?.value.trim();
            if (name) { variant.name = name; }
            row.querySelectorAll('.variant-prop').forEach(propInput => {
                const propName = propInput.dataset.propName;
                const propValue = propInput.value.trim();
                if (propName && propValue) variant[propName] = propValue;
            });
            const price = row.querySelector('.variant-price')?.value.trim();
            if (price) {
                variant.offers = {
                    "@type": "Offer", "price": price, "priceCurrency": masterOfferDetails.priceCurrency,
                    "availability": "https://schema.org/InStock",
                    "shippingDetails": masterOfferDetails.shippingDetails,
                    "hasMerchantReturnPolicy": masterOfferDetails.hasMerchantReturnPolicy,
                    "priceValidUntil": masterOfferDetails.priceValidUntil
                };
                if (masterOfferDetails.priceSpecifications.length > 0) {
                    variant.offers.priceSpecification = masterOfferDetails.priceSpecifications.length > 1 ? [...masterOfferDetails.priceSpecifications] : { ...masterOfferDetails.priceSpecifications[0] };
                }
                const baseUrl = DOM.urlInput.value.trim() || DOM.baseUrlInput.value.trim();
                if (baseUrl) {
                    try {
                        const url = new URL(baseUrl);
                        if (variant.size) url.searchParams.set('size', variant.size);
                        if (variant.color) url.searchParams.set('color', variant.color);
                        variant.offers.url = url.href;
                    } catch (e) { console.warn("Could not construct variant URL:", e); }
                }
            }
            variants.push(variant);
        });
        if (hasDuplicateSkus) {
            showToast('Duplicate SKUs detected. Each variant must have a unique SKU.', 'warning');
        }
        if (variants.length > 0) {
            schema.hasVariant = variants;
        }
    }

     /**
     * [HELPER] Determines the final currency to use for an offer.
     * Priority: Custom Input > Discovered Entity > Default 'USD'
     * @param {Function} findProductEntity - Helper to find a specific product entity.
     * @returns {string} The determined currency code.
     */
    function _determineFinalCurrency(findProductEntity) {
        const currencyInput = DOM.customProductCurrency?.value?.trim();
        if (currencyInput) {
            const isSelector = /[.#\[\]>+~]/.test(currencyInput);
            if (isSelector) {
                const targetEl = safeQuerySelector(document, currencyInput);
                if (targetEl) return targetEl.textContent.trim();
            } else {
                return currencyInput;
            }
        }

        const currencyEntity = findProductEntity('priceCurrency');
        if (currencyEntity) {
            return currencyEntity.value;
        }

        return 'USD'; // Default fallback
    }

    /**
     * Populates product properties by dispatching to specialized helper functions.
     * @param {Object} schema - The schema object to populate.
     * @param {Array} entities - The array of all discovered entities from the page.
     * @param {boolean} isPrimary - A flag indicating if this is the primary schema entity.
     */
    function populateProductProperties(schema, entities, isPrimary) {
        const productEntities = entities.filter(e => e.type === 'Product');
        const findProductEntity = (prop) => productEntities.find(e => e.schemaProp === prop);

        let hasVariants = DOM.productHasVariantsSwitch.checked;
        if (hasVariants && !DOM.productGroupId.value.trim()) {
            showToast('Product Group ID is required for variant products.', 'danger');
            hasVariants = false; // Force single product mode if group ID is missing
        }

        if (hasVariants) {
            _populateProductGroup(schema, entities, productEntities, findProductEntity);
        } else {
            _populateSingleProduct(schema, entities, productEntities, findProductEntity);
        }

        // Final cleanup of the main schema object
        Object.keys(schema).forEach(key => (schema[key] === undefined || schema[key] === null) && delete schema[key]);
    }

    /**
     * Populates review properties, now with full support for positiveNotes and negativeNotes (Pros/Cons).
     * @param {Object} schema - The schema object to populate.
     * @param {Array} entities - The array of all discovered entities from the page.
     * @param {boolean} isPrimary - A flag indicating if this is the primary schema entity.
     */
    function populateReviewProperties(schema, entities, isPrimary) {
        const reviewEntities = entities.filter(e => e.type === 'Review');
        const dateEntity = entities.find(e => e.type === 'Article' && e.schemaProp === 'datePublished');

        const empAuthor = typeof getEntity !== 'undefined' ? getEntity('mainAuthor') : null;
        if (empAuthor) {
            schema.author = { "@type": "Person", "name": empAuthor };
        } else {
            const authorEntity = entities.find(e => e.type === 'Article' && e.schemaProp === 'author');
            if (authorEntity) schema.author = { "@type": "Person", "name": authorEntity.value };
        }

        if (dateEntity) schema.datePublished = dateEntity.rawValue || dateEntity.value;

        const publisherData = getPublisherData(entities);
        // ✅ FINAL TWEAK: Prevent publisher name from being the same as the review title.
        if (publisherData && publisherData.name !== schema.name) {
            schema.publisher = publisherData;
        }

        const ratingEntity = reviewEntities.find(e => e.schemaProp === 'reviewRating');
        if (ratingEntity) {
            schema.reviewRating = {
                "@type": "Rating",
                "ratingValue": ratingEntity.value,
                "bestRating": "5"
            };
        }

        function buildNotesList(items) {
            return {
                "@type": "ItemList",
                "itemListElement": items.map((itemText, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": itemText
                }))
            };
        }

        const prosEntity = reviewEntities.find(e => e.schemaProp === 'positiveNotes');
        if (prosEntity && prosEntity.rawValue && prosEntity.rawValue.length > 0) {
            schema.positiveNotes = buildNotesList(prosEntity.rawValue);
        }

        const consEntity = reviewEntities.find(e => e.schemaProp === 'negativeNotes');
        if (consEntity && consEntity.rawValue && consEntity.rawValue.length > 0) {
            schema.negativeNotes = buildNotesList(consEntity.rawValue);
        }

        const itemReviewed = { "@type": "Thing" };
        const itemNameEntity = reviewEntities.find(e => e.schemaProp === 'itemName');
        const productContextualName = entities.find(e => e.type === 'Product' && e.schemaProp === 'contextualName');
        if (itemNameEntity) {
            itemReviewed.name = itemNameEntity.value;
        } else if (productContextualName) {
            itemReviewed.name = productContextualName.value;
        } else {
            // Ensure we don't pick the review's own title as the item name.
            const generalNameEntity = entities.find(e => e.schemaProp === 'name' && e.value !== schema.name);
            if (generalNameEntity) itemReviewed.name = generalNameEntity.value;
        }

        const productEntities = entities.filter(e => e.type === 'Product');
        if (productEntities.length > 0) {
            itemReviewed["@type"] = "Product";
            const imageEntity = entities.find(e => e.schemaProp === 'image');
            if (imageEntity) itemReviewed.image = imageEntity.value;
            populateProductProperties(itemReviewed, productEntities, false);
        }

        if (itemReviewed.name) schema.itemReviewed = itemReviewed;
    }

    /**
     * Populates recipe properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateRecipeProperties(schema, entities, isPrimary) {
        const recipeEntities = entities.filter(e => e.type === 'Recipe');

        // Contextual image
        const contextualImage = recipeEntities.find(e => e.schemaProp === 'image');
        if (contextualImage) {
            schema.image = contextualImage.value;
        } else if (isPrimary) {
            const mainImage = entities.find(e => e.schemaProp === 'image' && !e.type);
            if (mainImage) schema.image = mainImage.value;
        }

        // Contextual name
        const contextualNameEntity = recipeEntities.find(e => e.contextualName);
        if (contextualNameEntity) {
            schema.name = contextualNameEntity.contextualName;
        }

        // Add recipe properties
        recipeEntities.forEach(e => {
            if (['prepTime', 'cookTime', 'recipeIngredient', 'recipeInstructions'].includes(e.schemaProp)) {
                if (e.rawValue) schema[e.schemaProp] = e.rawValue;
            } else if (e.schemaProp !== 'contextualName' && e.schemaProp !== 'image') {
                schema[e.schemaProp] = e.rawValue || e.value;
            }
        });
    }

    /**
     * Populates How-To properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateHowToProperties(schema, entities, isPrimary) {
        const howToEntities = entities.filter(e => e.type === 'HowTo');

        // Contextual image
        const contextualImage = howToEntities.find(e => e.schemaProp === 'image');
        if (contextualImage) {
            schema.image = contextualImage.value;
        } else if (isPrimary) {
            const mainImage = entities.find(e => e.schemaProp === 'image' && !e.type);
            if (mainImage) schema.image = mainImage.value;
        }

        // Steps
        const howToEntity = howToEntities.find(e => e.type === 'HowTo' && e.schemaProp === 'step');
        if (howToEntity) {
            if (howToEntity.contextualName) schema.name = howToEntity.contextualName;
            schema.step = howToEntity.rawValue;
        }
    }

    /**
     * Populates event properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateEventProperties(schema, entities, isPrimary) {
        const eventEntities = entities.filter(e => e.type === 'Event');

        // Contextual name
        const contextualNameEntity = eventEntities.find(e => e.schemaProp === 'contextualName');
        if (contextualNameEntity) {
            schema.name = contextualNameEntity.value;
        }

        // Add event properties
        eventEntities.forEach(e => {
            if (e.schemaProp === 'startDate') {
                try {
                    schema.startDate = new Date(e.value).toISOString();
                } catch (err) {
                    schema.startDate = e.value;
                }
            } else if (e.schemaProp === 'location') {
                schema.location = { "@type": "Place", "name": e.value, "address": e.value };
            } else if (e.schemaProp === 'organizer') {
                schema.organizer = { "@type": "Organization", "name": e.value };
            }
        });

        // Fallback name
        if (!schema.name) {
            const pageTitle = entities.find(e => e.schemaProp === 'name');
            if (pageTitle) schema.name = pageTitle.value;
        }
    }

    /**
     * Populates software application properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateSoftwareAppProperties(schema, entities, isPrimary) {
        const appEntities = entities.filter(e => e.type === 'SoftwareApplication');
        const findAppEntity = (prop) => appEntities.find(e => e.schemaProp === prop);

        const nameEntity = findAppEntity('name');
        if (nameEntity) {
            schema.name = nameEntity.value;
        } else if (isPrimary) {
            const pageTitle = entities.find(e => e.schemaProp === 'name' && !e.type);
            if (pageTitle) schema.name = pageTitle.value;
        }

        // If there is still no name, the schema cannot be valid.
        if (!schema.name) {
            console.warn('SoftwareApplication schema cannot be built without a "name".');
            return;
        }

        const priceEntity = findAppEntity('price');
        if (priceEntity) {
            schema.offers = {
                "@type": "Offer",
                "price": priceEntity.value,
                "priceCurrency": "USD"
            };
        }

        const ratingEntity = entities.find(e => e.schemaProp === 'reviewRating');
        if (ratingEntity) {
            schema.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": ratingEntity.value,
                "ratingCount": "1"
            };
        }

        if (!schema.offers && !schema.aggregateRating) {
            schema.offers = { "@type": "Offer", "price": "0", "priceCurrency": "USD" };
        }

        const categoryEntity = findAppEntity('applicationCategory');
        if (categoryEntity) schema.applicationCategory = categoryEntity.value;

        const osEntity = findAppEntity('operatingSystem');
        if (osEntity) {
            schema.operatingSystem = osEntity.value;
        }

        schema["@type"] = "SoftwareApplication";
    }

    /**
     * Populates course properties with full advanced support
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateCourseProperties(schema, entities, isPrimary) {
        const courseEntities = entities.filter(e => e.type === 'Course' && e.schemaProp === 'courseItem');

        if (courseEntities.length === 0) {
            delete schema.name;
            return;
        }

        // Convert to ItemList
        schema["@type"] = "ItemList";

        const mainTitle = entities.find(e => e.schemaProp === 'name');
        if (mainTitle) schema.name = `Courses from: ${mainTitle.value}`;

        schema.itemListElement = courseEntities.map((entity, index) => {
            const course = entity.rawValue;
            const providerType = getProviderType(course.provider);
            const provider = {
                "@type": providerType,
                "name": course.provider
            };

            if (course.providerUrl) {
                provider.sameAs = course.providerUrl;
            }

            const courseItem = {
                "@type": "Course",
                "name": course.name,
                "description": course.description,
                "provider": provider
            };

            // Add URL if available (for all-in-one pages, use anchor)
            if (course.url) {
                courseItem.url = course.url;
            }

            // Advanced properties
            if (course.courseCode) {
                courseItem.courseCode = course.courseCode;
            }

            if (course.price) {
                courseItem.offers = {
                    "@type": "Offer",
                    "price": course.price,
                    "priceCurrency": course.currency || "USD"
                };
            }

            if (course.credential) {
                courseItem.educationalCredentialAwarded = course.credential;
            }

            if (course.prerequisites) {
                courseItem.coursePrerequisites = course.prerequisites;
            }

            // Course Instance (Smart Handling)
            if (course.courseInstances && course.courseInstances.length > 0) {
                // Multiple instances detected
                courseItem.hasCourseInstance = course.courseInstances.map(inst => {
                    const instance = {
                        "@type": "CourseInstance",
                        "courseMode": inst.courseMode || "online"
                    };

                    if (inst.startDate) {
                        try {
                            instance.startDate = new Date(inst.startDate).toISOString();
                        } catch (e) {
                            instance.startDate = inst.startDate;
                        }
                    }

                    if (inst.endDate) {
                        try {
                            instance.endDate = new Date(inst.endDate).toISOString();
                        } catch (e) {
                            instance.endDate = inst.endDate;
                        }
                    }

                    if (inst.location) {
                        instance.location = {
                            "@type": "Place",
                            "name": inst.location
                        };
                    }

                    if (inst.instructor) {
                        instance.instructor = {
                            "@type": "Person",
                            "name": inst.instructor
                        };
                    }

                    return instance;
                });

            } else if (course.courseInstance) {
                // Single instance (backward compatible)
                const instance = {
                    "@type": "CourseInstance",
                    "courseMode": course.courseInstance.courseMode || "online"
                };

                if (course.courseInstance.startDate) {
                    try {
                        instance.startDate = new Date(course.courseInstance.startDate).toISOString();
                    } catch (e) {
                        instance.startDate = course.courseInstance.startDate;
                    }
                }

                if (course.courseInstance.endDate) {
                    try {
                        instance.endDate = new Date(course.courseInstance.endDate).toISOString();
                    } catch (e) {
                        instance.endDate = course.courseInstance.endDate;
                    }
                }

                if (course.courseInstance.location) {
                    instance.location = {
                        "@type": "Place",
                        "name": course.courseInstance.location
                    };
                }

                if (course.courseInstance.instructor) {
                    instance.instructor = {
                        "@type": "Person",
                        "name": course.courseInstance.instructor
                    };
                }

                courseItem.hasCourseInstance = [instance];
            }

            // Aggregate Rating
            if (course.rating) {
                courseItem.aggregateRating = {
                    "@type": "AggregateRating",
                    "ratingValue": course.rating,
                    "ratingCount": course.ratingCount || "1"
                };
            }

            return {
                "@type": "ListItem",
                "position": index + 1,
                "item": courseItem
            };
        });

        delete schema.provider;
    }

    /**
     * Populates organization properties with structured PostalAddress and full data integration.
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateOrganizationProperties(schema, entities, isPrimary) {
        // Start with the most reliable data from EMP via getPublisherData
        const orgData = getPublisherData(entities);
        if (orgData) Object.assign(schema, orgData);

        if (isPrimary) {
            // Fallback for name if not found in EMP or detected entities
            if (!schema.name) {
                const pageTitle = entities.find(e => e.schemaProp === 'name');
                if (pageTitle) schema.name = pageTitle.value;
            }
            const pageUrl = DOM.urlInput.value.trim();
            if (pageUrl) schema.url = pageUrl;
        }

        // --- Intelligent PostalAddress Parsing ---
        const addressEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'address');
        if (addressEntity) {
            const addressString = addressEntity.value;
            const addressObject = { "@type": "PostalAddress" };

            // This is a simplified parser. A more advanced version could use regex
            // to identify postal codes, countries, etc.
            const parts = addressString.split(',').map(p => p.trim());

            if (parts.length >= 3) { // e.g., Street, City, Country
                addressObject.streetAddress = parts[0];
                addressObject.addressLocality = parts[1];
                // Simple logic to detect a postal code and country at the end
                const lastPart = parts[parts.length - 1];
                const secondLastPart = parts[parts.length - 2];
                if (/\d{5,}/.test(secondLastPart)) { // Looks like a postal code
                    addressObject.postalCode = secondLastPart;
                    addressObject.addressCountry = lastPart;
                } else {
                    addressObject.addressRegion = secondLastPart;
                    addressObject.addressCountry = lastPart;
                }
            } else {
                addressObject.streetAddress = addressString;
            }
            schema.address = addressObject;
        }

        if (!schema.description) {
            const mainDesc = entities.find(e => e.schemaProp === 'description');
            if (mainDesc) {
                schema.description = mainDesc.value;
            }
        }
    }

    // ===================================================================
    //  UI Rendering Functions
    // ===================================================================

    /**
     * Renders analysis results
     * @param {Array} entities - Discovered entities
     * @param {Array} suggestions - Schema suggestions
     * @returns {string} HTML string
     */
    function renderAnalysis(entities, suggestions) {
        let html = `<h3 class="h5 mb-3 text-primary">1. Discovered Entities:</h3>`;

        if (entities.length === 0) {
            html += `<p class="text-muted small">No distinct entities were detected.</p>`;
        } else {
            const fragment = document.createDocumentFragment();

            entities.forEach(entity => {
                const card = document.createElement('div');
                card.className = 'card p-3 mb-2 entity-card';

                let badgeColor = 'bg-secondary';
                switch (entity.type) {
                    case 'Article': badgeColor = 'bg-info-subtle text-info-emphasis border border-info-subtle'; break;
                    case 'FAQ': badgeColor = 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'; break;
                    case 'Product': badgeColor = 'bg-success-subtle text-success-emphasis border border-success-subtle'; break;
                    case 'Review': badgeColor = 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'; break;
                    case 'Recipe': badgeColor = 'bg-danger-subtle text-danger-emphasis border border-danger-subtle'; break;
                    case 'HowTo': badgeColor = 'bg-primary-subtle text-primary-emphasis border border-primary-subtle'; break;
                    case 'Event': badgeColor = 'bg-info-subtle text-info-emphasis border border-info-subtle'; break;
                    case 'Organization': badgeColor = 'bg-dark text-white'; break;
                    case 'Breadcrumb': badgeColor = 'bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle'; break;
                    case 'VideoObject': badgeColor = 'bg-primary-subtle text-primary-emphasis border border-primary-subtle'; break;
                    case 'LocalBusiness': badgeColor = 'bg-success-subtle text-success-emphasis border border-success-subtle'; break;
                    case 'JobPosting': badgeColor = 'bg-info-subtle text-info-emphasis border border-info-subtle'; break;
                    case 'SoftwareApplication': badgeColor = 'bg-primary-subtle text-primary-emphasis border border-primary-subtle'; break;
                    case 'Course': badgeColor = 'bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle'; break;
                }

                card.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <strong class="text-primary-emphasis">${escapeHtml(entity.name)}</strong>
                    ${entity.type ? `<span class="badge ${badgeColor}">${escapeHtml(entity.type)}</span>` : ''}
                </div>
                <p class="mb-0 mt-2 text-muted text-truncate" title="${escapeHtml(entity.value)}">${escapeHtml(entity.value)}</p>
            `;

                fragment.appendChild(card);
            });

            // Convert fragment to HTML string
            const tempDiv = document.createElement('div');
            tempDiv.appendChild(fragment);
            html += tempDiv.innerHTML;
        }

        // Add suggestions
        html += `<hr class="my-4"><h3 class="h5 mt-4 mb-3 text-primary">2. Suggested Schema Types:</h3>`;
        suggestions.forEach((suggestion, index) => {
            const confidencePercent = Math.round(suggestion.confidence * 100);
            html += `
            <div class="p-3 mb-2 border rounded schema-suggestion" data-schema-type="${suggestion.type}"
                 role="button" tabindex="0" aria-pressed="${index === 0 ? 'true' : 'false'}">
                <strong>${suggestion.type}</strong>
                <div class="progress mt-2" style="height: 5px;">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${confidencePercent}%;"
                         aria-label="Confidence level for ${suggestion.type} suggestion" 
                         aria-valuenow="${confidencePercent}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="schema-explanation mt-2 p-2 small border-top">
                    <strong>Why?</strong> ${escapeHtml(suggestion.reason)}
                </div>
            </div>`;
        });

        return html;
    }

    /**
     * Creates and displays a modal to show a smart selector suggestion to the user.
     * @param {Object} suggestion - The suggestion object from SelectorPatternAnalyzer.
     * @param {string} targetInputId - The ID of the input field to update if accepted.
     * @param {function} onAccept - Callback function to execute when suggestion is accepted.
     * @param {function} onReject - Callback function to execute when suggestion is rejected.
     */
    function showSmartSuggestion(suggestion, targetInputId, onAccept, onReject) {
        const existingModal = document.getElementById('smartSuggestionModal');
        if (existingModal) {
            const instance = bootstrap.Modal.getInstance(existingModal);
            if (instance) instance.hide();
            existingModal.remove();
        }

        const modalHtml = `
            <div class="modal fade" id="smartSuggestionModal" tabindex="-1" aria-labelledby="smartSuggestionModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-primary">
                        <div class="modal-header bg-primary-subtle">
                            <h5 class="modal-title" id="smartSuggestionModalLabel">
                                <i class="bi bi-lightbulb-fill text-warning me-2"></i>
                                اقتراح ذكي للمحدد
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p class="mb-3 small text-muted">${suggestion.reason}</p>
                            <div class="mb-3">
                                <label class="form-label small fw-bold text-muted">المحدد الأصلي:</label>
                                <input type="text" class="form-control form-control-sm bg-light" value="${escapeHtml(suggestion.originalSelector)}" readonly>
                            </div>
                            <div>
                                <label class="form-label small fw-bold text-success">المحدد الموصى به:</label>
                                <input type="text" class="form-control form-control-sm border-success" value="${escapeHtml(suggestion.enhancedSelector)}" readonly>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" id="rejectSuggestionBtn">الاحتفاظ بالأصلي</button>
                            <button type="button" class="btn btn-success" id="applySuggestionBtn">استخدام الموصى به</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modalEl = document.getElementById('smartSuggestionModal');
        const modalInstance = new bootstrap.Modal(modalEl);

        const applyBtn = document.getElementById('applySuggestionBtn');
        const rejectBtn = document.getElementById('rejectSuggestionBtn');

        applyBtn.addEventListener('click', () => {
            onAccept(suggestion.enhancedSelector);
            modalInstance.hide();
        });

        rejectBtn.addEventListener('click', () => {
            onReject();
            modalInstance.hide();
        });

        modalEl.addEventListener('hidden.bs.modal', () => {
            modalEl.remove();
        });

        modalInstance.show();
    }

    /**
     * Updates action buttons state
     * @param {boolean} isEnabled - Whether buttons should be enabled
     * @param {string} copyText - Text for copy button
     */
    function updateActionButtonsState(isEnabled, copyText = 'Copy') {
        const buttons = [DOM.copyBtn, DOM.downloadBtn, DOM.validateBtn];
        buttons.forEach(btn => {
            btn.disabled = !isEnabled;
            btn.classList.toggle('disabled', !isEnabled);
        });
        DOM.copyBtn.innerHTML = (copyText === 'Copy') ?
            `<i class="bi bi-clipboard-check me-1"></i> Copy` :
            copyText;
    }

    /**
     * Renders SGE preview
     * @param {Object} schema - Schema object
     */
    function renderSgePreview(schema) {
        const type = schema['@type'];
        let previewHtml = '';

        switch (type) {
            case 'BreadcrumbList':
                if (schema.itemListElement && schema.itemListElement.length > 0) {
                    previewHtml = `
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb" style="font-size: 0.9rem;">
                        ${schema.itemListElement.map((item, index) => {
                        const isLast = index === schema.itemListElement.length - 1;
                        return `<li class="breadcrumb-item ${isLast ? 'active" aria-current="page' : ''}">
                                ${item.item && !isLast ? `<a href="#" onclick="return false;">${escapeHtml(item.name)}</a>` : escapeHtml(item.name)}
                            </li>`;
                    }).join('')}
                      </ol>
                    </nav>`;
                }
                break;

            case 'ItemList':
                // First, validate if this is a recognizable Course ItemList
                if (Array.isArray(schema.itemListElement) && schema.itemListElement.length > 0 && schema.itemListElement.every(item => item?.item?.['@type'] === 'Course')) {

                    /**
                     * Renders a single rich course preview item, safely accessing properties.
                     * @param {object} courseItem - The ListItem element from the schema.
                     * @returns {string} - The HTML string for the list item.
                     */
                    const renderCoursePreviewItem = (courseItem) => {
                        // Safe navigation using optional chaining (?.) and nullish coalescing (??) is CRITICAL.
                        const item = courseItem?.item;
                        if (!item) return ''; // Skip malformed items

                        const name = item.name ?? 'Untitled Course';
                        const provider = item.provider?.name ?? 'Unknown Provider';

                        // Build rich snippets for advanced properties if they exist
                        let priceHtml = '';
                        if (item.offers?.price) {
                            const currencySymbol = item.offers.priceCurrency === 'USD' ? '$' : (item.offers.priceCurrency || '');
                            priceHtml = `<span class="course-price text-success fw-bold ms-auto">${currencySymbol}${escapeHtml(item.offers.price)}</span>`;
                        }

                        let ratingHtml = '';
                        if (item.aggregateRating?.ratingValue) {
                            ratingHtml = `
                                <span class="rating text-warning small ms-2" title="Rating: ${item.aggregateRating.ratingValue}">
                                    <i class="bi bi-star-fill"></i> ${escapeHtml(item.aggregateRating.ratingValue)}
                                </span>
                            `;
                        }

                        let courseCodeHtml = '';
                        if (item.courseCode) {
                            courseCodeHtml = `<span class="badge bg-secondary">${escapeHtml(item.courseCode)}</span>`;
                        }

                        return `
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <div class="fw-bold">${escapeHtml(name)} ${ratingHtml}</div>
                                    <div class="text-muted small">
                                        ${courseCodeHtml ? courseCodeHtml + ' &bull; ' : ''}
                                        Provider: ${escapeHtml(provider)}
                                    </div>
                                </div>
                                ${priceHtml}
                            </li>
                        `;
                    };

                    const totalCourses = schema.itemListElement.length;
                    const remainingCount = totalCourses > 3 ? totalCourses - 3 : 0;

                    previewHtml = `
                    <div class="card shadow-sm">
                        <div class="card-header d-flex align-items-center bg-light-subtle">
                            <span class="bi bi-mortarboard-fill me-2 text-primary" aria-hidden="true"></span>
                            <h4 class="card-title mb-0 h6 flex-grow-1">${escapeHtml(schema.name || 'Course List')}</h4>
                            <span class="badge bg-primary-subtle text-primary-emphasis">${totalCourses} Found</span>
                        </div>
                        <ul class="list-group list-group-flush small">
                            ${schema.itemListElement.slice(0, 3).map(renderCoursePreviewItem).join('')}
                        </ul>
                        ${remainingCount > 0 ? `
                            <div class="card-footer text-muted small text-center">
                                ... and ${remainingCount} more course${remainingCount > 1 ? 's' : ''}.
                            </div>
                        ` : ''}
                    </div>`;

                } else {
                    // Fallback for other ItemList types or malformed data
                    previewHtml = `
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="text-muted small mb-0">
                                <span class="bi bi-card-list me-1" aria-hidden="true"></span>
                                Generic ItemList found. No specific preview is available.
                            </p>
                        </div>
                    </div>`;
                }
                break;

            case 'SoftwareApplication':
                let starsHtmlApp = '';
                const ratingApp = schema.aggregateRating;
                if (ratingApp) {
                    const filledStars = Math.round(parseFloat(ratingApp.ratingValue));
                    for (let i = 0; i < 5; i++) {
                        starsHtmlApp += `<i class="bi ${i < filledStars ? 'bi-star-fill text-warning' : 'bi-star'}"></i>`;
                    }
                }
                previewHtml = `
                <div class="card">
                    <div class="card-body">
                         <div class="d-flex align-items-center mb-2">
                             <div class="rounded bg-secondary-subtle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px; flex-shrink: 0;">
                                <i class="bi bi-app-indicator fs-4 text-muted"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h4 class="card-title mb-1">${escapeHtml(schema.name || 'Software Application')}</h4>
                                ${ratingApp ? `
                                    <div class="small" title="Rating: ${ratingApp.ratingValue} out of 5">
                                        ${starsHtmlApp}
                                        <span class="ms-1 fw-bold">${ratingApp.ratingValue}</span>
                                    </div>
                                ` : ''}
                            </div>
                         </div>
                         <div class="small mt-3">
                            ${schema.applicationCategory ? `
                                <span class="badge bg-info-subtle text-info-emphasis border border-info-subtle me-2">
                                    ${escapeHtml(schema.applicationCategory)}
                                </span>
                            ` : ''}
                            ${schema.operatingSystem ? `
                                <span class="badge bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle">
                                    ${escapeHtml(schema.operatingSystem)}
                                </span>
                            ` : ''}
                         </div>
                    </div>
                </div>`;
                break;

            case 'Product':
                previewHtml = `
                <div class="card">
                    <div class="card-body">
                        ${schema.image ? `<img src="${escapeHtml(schema.image)}" alt="Image of ${escapeHtml(schema.name || 'the product')}" width="100" height="100" class="img-fluid rounded float-start me-3" style="max-width: 100px; height: auto; object-fit: cover;">` : ''}
                        <h4 class="card-title">${escapeHtml(schema.name || '')}</h4>
                        <p class="card-text">
                            ${schema.offers ? `<strong class="text-high-contrast-success">${escapeHtml(schema.offers.price)} ${escapeHtml(schema.offers.priceCurrency)}</strong>` : ''}
                            ${schema.brand ? `<span class="text-muted d-block">By: ${escapeHtml(schema.brand.name)}</span>` : ''}
                        </p>
                    </div>
                </div>`;
                break;

            case 'Review':
                const rating = schema.reviewRating?.ratingValue;
                const item = schema.itemReviewed?.name;
                let starsHtml = '';
                if (rating) {
                    const filledStars = Math.round(parseFloat(rating));
                    for (let i = 0; i < 5; i++) {
                        starsHtml += `<i class="bi ${i < filledStars ? 'bi-star-fill text-warning' : 'bi-star'}"></i>`;
                    }
                }
                previewHtml = `
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">${escapeHtml(item ? `Review for: ${item}` : (schema.name || 'Review'))}</h4>
                        ${rating ? `
                        <p class="card-text mb-1" title="Rating: ${rating} out of 5">
                            ${starsHtml}
                            <span class="me-2 fw-bold">${rating} / 5</span>
                        </p>` : ''}
                        ${schema.author ? `<span class="text-muted d-block small">By: ${escapeHtml(schema.author.name)}</span>` : ''}
                    </div>
                </div>`;
                break;

            case 'Recipe':
                let prep = schema.prepTime ? String(schema.prepTime).replace('PT', '').replace('H', 'h ').replace('M', 'm') : '';
                let cook = schema.cookTime ? String(schema.cookTime).replace('PT', '').replace('H', 'h ').replace('M', 'm') : '';
                previewHtml = `
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">${escapeHtml(schema.name || '')}</h4>
                        <p class="card-text small text-muted">
                            ${prep ? `Prep time: ${prep}` : ''}
                            ${cook ? ` | Cook time: ${cook}` : ''}
                        </p>
                        <h5 class="h6 small fw-bold">Key Ingredients:</h5>
                        <ul class="list-group list-group-flush small">
                            ${schema.recipeIngredient?.slice(0, 3).map(i => `<li class="list-group-item p-1">${escapeHtml(i)}</li>`).join('') || ''}
                        </ul>
                    </div>
                </div>`;
                break;

            case 'FAQPage':
                previewHtml = `
                <div class="accordion accordion-flush" id="sgeFaqAccordion">
                ${schema.mainEntity?.slice(0, 2).map((item, index) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed small" type="button" data-bs-toggle="collapse" data-bs-target="#sge-faq-${index}">
                                ${escapeHtml(item.name)}
                            </button>
                        </h2>
                        <div id="sge-faq-${index}" class="accordion-collapse collapse" data-bs-parent="#sgeFaqAccordion">
                            <div class="accordion-body small">${escapeHtml(item.acceptedAnswer.text)}</div>
                        </div>
                    </div>`).join('') || ''}
                </div>`;
                break;

            case 'HowTo':
                previewHtml = `
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">${escapeHtml(schema.name || '')}</h4>
                         <ol class="list-group list-group-numbered list-group-flush small">
                            ${schema.step?.slice(0, 3).map(s => `<li class="list-group-item p-1">${escapeHtml(s.text)}</li>`).join('') || ''}
                        </ol>
                    </div>
                </div>`;
                break;

            case 'Event':
                let eventDate = '';
                if (schema.startDate) {
                    try {
                        eventDate = new Date(schema.startDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    } catch (e) {
                        eventDate = schema.startDate;
                    }
                }
                previewHtml = `
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title"><i class="bi bi-calendar-event me-2"></i>${escapeHtml(schema.name || '')}</h4>
                        <p class="card-text small">
                            ${eventDate ? `<span class="d-block"><strong>Date:</strong> ${eventDate}</span>` : ''}
                            ${schema.location ? `<span class="d-block"><strong>Location:</strong> ${escapeHtml(schema.location.name)}</span>` : ''}
                            ${schema.organizer ? `<span class="d-block text-muted">Organizer: ${escapeHtml(schema.organizer.name)}</span>` : ''}
                        </p>
                    </div>
                </div>`;
                break;

            case 'JobPosting':
                const org = schema.hiringOrganization;

                // --- Helper function to format the salary object ---
                const formatSalary = (salary) => {
                    if (!salary) return '';
                    if (salary['@type'] === 'PriceSpecification') {
                        return `<i class="bi bi-info-circle-fill me-1"></i> ${escapeHtml(salary.description)}`;
                    }
                    if (salary['@type'] === 'MonetaryAmount') {
                        const val = salary.value;
                        if (!val) return '';
                        const currency = salary.currency || '';
                        let amount = '';
                        if (val.minValue && val.maxValue) {
                            amount = `${val.minValue} - ${val.maxValue}`;
                        } else {
                            amount = val.value || '';
                        }
                        let unitText = '';
                        switch (val.unitText) {
                            case 'HOUR': unitText = '/hr'; break;
                            case 'DAY': unitText = '/day'; break;
                            case 'WEEK': unitText = '/wk'; break;
                            case 'MONTH': unitText = '/mo'; break;
                            case 'YEAR': unitText = '/yr'; break;
                        }
                        return `<i class="bi bi-currency-dollar me-1"></i> ${escapeHtml(amount)} ${escapeHtml(currency)} ${unitText}`;
                    }
                    return '';
                };

                // --- Helper function to format the location ---
                const formatLocation = (schema) => {
                    let locationString = '';
                    if (schema.jobLocation && schema.jobLocation.address) {
                        const addr = schema.jobLocation.address;
                        locationString = [addr.addressLocality, addr.addressRegion, addr.addressCountry].filter(Boolean).join(', ');
                    }
                    if (schema.jobLocationType === 'TELECOMMUTE') {
                        if (locationString) return `${locationString} (Hybrid)`;
                        if (schema.applicantLocationRequirements) return `Remote (${schema.applicantLocationRequirements.name})`;
                        return 'Remote';
                    }
                    return locationString;
                };

                // --- Helper function to format employment type ---
                const formatEmploymentType = (type) => {
                    if (!type) return '';
                    return type.replace('_', ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                };

                const salaryString = formatSalary(schema.baseSalary);
                const locationString = formatLocation(schema);
                const employmentTypeString = formatEmploymentType(schema.employmentType);

                previewHtml = `
                <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-start mb-3">
                                ${org && org.logo ? `
                                    <img src="${escapeHtml(org.logo.url || org.logo)}" alt="Logo" width="50" height="50" class="rounded me-3" style="object-fit: contain;">
                                ` : `
                                    <div class="rounded bg-secondary-subtle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px; flex-shrink: 0;">
                                        <i class="bi bi-briefcase-fill fs-4 text-muted"></i>
                                    </div>
                                `}
                                <div class="flex-grow-1">
                                    <h4 class="card-title mb-1">${escapeHtml(schema.title || 'Job Opening')}</h4>
                                    <p class="card-text small text-muted mb-1">
                                        ${org ? `${escapeHtml(org.name)}` : ''}
                                    </p>
                                    <p class="card-text small text-muted">
                                        <i class="bi bi-geo-alt-fill me-1"></i> ${escapeHtml(locationString)}
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2 small">
                                ${salaryString ? `<span class="badge bg-success-subtle text-success-emphasis border border-success-subtle">${salaryString}</span>` : ''}
                                ${employmentTypeString ? `<span class="badge bg-info-subtle text-info-emphasis border border-info-subtle"><i class="bi bi-clock-fill me-1"></i> ${escapeHtml(employmentTypeString)}</span>` : ''}
                            </div>
                        </div>
                    </div>`;
                break;

            case 'LocalBusiness':
                const orgData = schema.hiringOrganization || schema;
                previewHtml = `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            ${orgData.logo ? `
                                <img src="${escapeHtml(orgData.logo.url || orgData.logo)}" alt="Logo of ${escapeHtml(orgData.name || 'the business')}" width="50" height="50" class="rounded me-3" style="width: 50px; height: 50px; object-fit: contain; border: 1px solid var(--bs-border-color);">
                            ` : `
                                <div class="rounded bg-secondary-subtle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px; flex-shrink: 0;">
                                    <i class="bi bi-shop fs-4 text-muted"></i>
                                </div>
                            `}
                            <div class="flex-grow-1">
                                <h4 class="card-title mb-1">${escapeHtml(orgData.name || 'Local Business')}</h4>
                                ${schema.priceRange ? `<span class="card-text small text-muted">${escapeHtml(schema.priceRange)}</span>` : ''}
                            </div>
                        </div>
                        <ul class="list-group list-group-flush small">
                            ${schema.address ? `
                                <li class="list-group-item d-flex align-items-center px-0">
                                    <i class="bi bi-geo-alt-fill me-2 text-primary"></i>
                                    <span>${escapeHtml(schema.address.streetAddress || schema.address)}</span>
                                </li>
                            ` : ''}
                            ${orgData.contactPoint ? `
                                <li class="list-group-item d-flex align-items-center px-0">
                                    <i class="bi bi-telephone-fill me-2 text-primary"></i>
                                    <span>${escapeHtml(orgData.contactPoint.telephone)}</span>
                                </li>
                            ` : ''}
                            ${schema.openingHours ? `
                                <li class="list-group-item d-flex align-items-center px-0">
                                    <i class="bi bi-clock-fill me-2 text-primary"></i>
                                    <span>${escapeHtml(schema.openingHours)}</span>
                                </li>
                            ` : ''}
                        </ul>
                    </div>
                </div>`;
                break;

            case 'VideoObject':
                let uploadDate = '';
                if (schema.uploadDate) {
                    try {
                        uploadDate = new Date(schema.uploadDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                    } catch (e) {
                        // Ignore date errors
                    }
                }
                previewHtml = `
               <div class="card">
                    <div class="card-body d-flex align-items-center">
                        <div class="position-relative me-3 flex-shrink-0">
                            ${schema.thumbnailUrl ? `
                                <img src="${escapeHtml(schema.thumbnailUrl)}" alt="Thumbnail for ${escapeHtml(schema.name || '')}" width="100" height="75" class="rounded" style="width: 100px; height: 75px; object-fit: cover; border: 1px solid var(--bs-border-color);">
                                <i class="bi bi-play-circle-fill text-white position-absolute top-50 start-50 translate-middle fs-3" style="text-shadow: 0 0 5px black;"></i>
                            ` : `
                                <div class="rounded bg-secondary-subtle d-flex align-items-center justify-content-center" style="width: 100px; height: 75px;">
                                    <i class="bi bi-film fs-2 text-muted"></i>
                                </div>
                            `}
                        </div>
                        <div class="flex-grow-1">
                            <h4 class="card-title mb-1">${escapeHtml(schema.name || 'Video')}</h4>
                            <p class="card-text small text-muted mb-1">${schema.description ? escapeHtml(schema.description.substring(0, 80) + '...') : ''}</p>
                            ${uploadDate ? `<small class="d-block text-muted">Uploaded: ${uploadDate}</small>` : ''}
                        </div>
                    </div>
                </div>`;
                break;

            case 'Organization':
                previewHtml = `
               <div class="card">
                    <div class="card-body d-flex align-items-center">
                        ${schema.logo ? `<img src="${escapeHtml(schema.logo.url || schema.logo)}" alt="Logo of ${escapeHtml(schema.name || 'the organization')}" width="60" height="60" class="rounded-circle me-3" style="width: 60px; height: 60px; object-fit: contain; border: 1px solid var(--bs-border-color);">` : `<div class="rounded-circle me-3 bg-secondary-subtle d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; flex-shrink: 0;"><i class="bi bi-building fs-4 text-muted"></i></div>`}
                        <div class="flex-grow-1">
                            <h4 class="card-title mb-0">${escapeHtml(schema.name || '')}</h4>
                            ${schema.address ? `<p class="card-text small text-muted mb-0">${escapeHtml(schema.address.streetAddress)}</p>` : ''}
                        </div>
                    </div>
                </div>`;
                break;

            default:
                previewHtml = '<p class="text-muted small">No preview is available for this schema type.</p>';
        }

        DOM.sgePreviewContent.innerHTML = previewHtml;
        DOM.sgePreviewContainer.style.display = previewHtml.trim() ? 'block' : 'none';
    }

    // ===================================================================
    //  Main Logic Flow & Event Handlers
    // ===================================================================

    /**
     * Main analysis handler
     */
    async function handleAnalysis() {
        let url = DOM.urlInput.value.trim();
        const html = DOM.htmlContentInput.value.trim();

        // Validation
        if (!url && !html) {
            showToast("Please enter a URL or paste HTML code to begin.", 'warning');
            return;
        }

        // Add protocol if missing
        if (url && !/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
            DOM.urlInput.value = url;
        }

        // CRITICAL: Reset manual edit state on new analysis
        resetManualEditState();

        // Show loading state
        DOM.analysisResults.innerHTML = `
        <div class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Analyzing...</span>
            </div>
            <p class="mt-2">Decoding content...</p>
        </div>`;
        DOM.generatedCode.value = '';
        DOM.sgePreviewContainer.style.display = 'none';
        updateActionButtonsState(false);
        DOM.copyEnhancedPromptBtn.disabled = true;
        selectedPrimaryType = null;

        try {
            // Get content to analyze
            let contentToAnalyze = html;
            if (!contentToAnalyze && url) {
                contentToAnalyze = await fetchContent(url);
            }

            // Analyze content
            const baseUrl = DOM.urlInput.value.trim() || DOM.baseUrlInput.value.trim();
            const entities = analyzeContent(contentToAnalyze, baseUrl);
            const suggestions = suggestSchema(entities);

            // Pre-fill Job Posting UI
            const locationTypeEntity = entities.find(e => e.schemaProp === 'jobLocationType');
            const locationType = locationTypeEntity?.value;
            const findAddressPart = (prop) => entities.find(e => e.type === 'JobPosting:AddressPart' && e.schemaProp === prop);

            if (locationType) {
                DOM.customJobLocationType.value = locationType;
            }

            if (locationType === 'remote') {
                const countryEntity = findAddressPart('addressCountry');
                if (countryEntity?.value) {
                    DOM.customJobApplicantCountry.value = countryEntity.value;
                }
            } else if (locationType === 'physical' || locationType === 'hybrid') {
                const street = findAddressPart('streetAddress')?.value;
                const city = findAddressPart('addressLocality')?.value;
                const region = findAddressPart('addressRegion')?.value;
                const postalCode = findAddressPart('postalCode')?.value;
                const country = findAddressPart('addressCountry')?.value;

                if (street) DOM.customJobStreetAddress.value = street;
                if (city) DOM.customJobAddressLocality.value = city;
                if (region) DOM.customJobAddressRegion.value = region;
                if (postalCode) DOM.customJobPostalCode.value = postalCode;
                if (country) DOM.customJobAddressCountry.value = country;
            }
            DOM.customJobLocationType.dispatchEvent(new Event('change'));

            const employmentTypeEntity = entities.find(e => e.schemaProp === 'employmentType' && e.type === 'JobPosting');
            if (employmentTypeEntity?.value) {
                DOM.customJobEmploymentType.value = employmentTypeEntity.value;
            }

            // Render results
            const analysisHtml = renderAnalysis(entities, suggestions);
            const existingSchemaHtml = displayExistingSchema(contentToAnalyze);
            DOM.analysisResults.innerHTML = analysisHtml + existingSchemaHtml;

            // Update schema output function with smart merge support
            const updateSchemaOutput = (type) => {

                let finalSchema = generateFinalSchema(entities, type, baseUrl);

                if (manualEditState.isManuallyEdited && manualEditState.lastManualContent) {
                    finalSchema = smartMerge(finalSchema, manualEditState.lastManualContent);
                    showToast('Manual edits merged with new schema', 'success');
                }
                const jsonOutput = JSON.stringify(finalSchema, null, 2);
                DOM.generatedCode.value = jsonOutput;
                manualEditState.lastGeneratedContent = jsonOutput;
                updateTextareaEditability();
                renderSgePreview(finalSchema);
            };

            if (suggestions.length > 0) {
                const bestType = suggestions[0].type;
                selectedPrimaryType = bestType;
                DOM.copyEnhancedPromptBtn.disabled = false;
                updateSchemaOutput(bestType);
                updateActionButtonsState(true);

                const bestSuggestionEl = safeQuerySelector(document, `.schema-suggestion[data-schema-type="${bestType}"]`);
                if (bestSuggestionEl) {
                    bestSuggestionEl.classList.add('border-primary', 'border-2');
                    bestSuggestionEl.setAttribute('aria-pressed', 'true');
                }
            }

            document.querySelectorAll('.schema-suggestion').forEach(el => {
                const selectAction = () => {
                    document.querySelectorAll('.schema-suggestion').forEach(s => {
                        s.classList.remove('border-primary', 'border-2');
                        s.setAttribute('aria-pressed', 'false');
                    });
                    el.classList.add('border-primary', 'border-2');
                    el.setAttribute('aria-pressed', 'true');
                    const schemaType = el.dataset.schemaType;
                    selectedPrimaryType = schemaType;
                    DOM.copyEnhancedPromptBtn.disabled = false;
                    updateSchemaOutput(schemaType);
                };
                el.addEventListener('click', selectAction);
            });

            // =============================================================
            //  THE CRITICAL FIX: DISPATCH EVENT WITH RESULTS
            // =============================================================
            const event = new CustomEvent('analysisComplete', {
                detail: {
                    entities: entities,
                    suggestions: suggestions
                }
            });
            document.dispatchEvent(event);
            // =============================================================

        } catch (error) {
            showToast(error.message, 'danger');
            updateActionButtonsState(false);
        }
    }

    /**
     * Fetches content from URL with proxy fallback
     * @param {string} url - URL to fetch
     * @returns {Promise<string>} HTML content
     */
    async function fetchContent(url) {
        const PROXIES = [
            `https://throbbing-dew-da3c.amr-omar304.workers.dev/?url={url}`,
            `https://api.allorigins.win/raw?url={url}`
        ];

        for (const proxyTemplate of PROXIES) {
            try {
                const proxyUrl = proxyTemplate.replace('{url}', encodeURIComponent(url));
                const response = await fetch(proxyUrl, {
                    signal: AbortSignal.timeout(8000)
                });

                if (response.ok) return await response.text();
            } catch (error) {
                console.warn(`Proxy failed: ${proxyTemplate.split('?')[0]}. Trying next...`, error);
            }
        }

        throw new Error(`Failed to fetch content. Check your internet connection or that the proxy is working.`);
    }

    // ===================================================================
    //  Event Listeners
    // ===================================================================

    // Base URL input toggle
    if (DOM.htmlContentInput && DOM.baseUrlContainer) {
        DOM.htmlContentInput.addEventListener('input', () => {
            DOM.baseUrlContainer.style.display = DOM.htmlContentInput.value.trim() ? 'block' : 'none';
        });
    }

    // Analyze button
    DOM.analyzeBtn.addEventListener('click', handleAnalysis);

    // Copy button
    DOM.copyBtn.addEventListener('click', () => {
        if (!DOM.copyBtn.disabled && DOM.generatedCode.value) {
            navigator.clipboard.writeText(DOM.generatedCode.value)
                .then(() => {
                    updateActionButtonsState(true, `<i class="bi bi-check-lg me-1"></i> Copied!`);
                    setTimeout(() => updateActionButtonsState(true, 'Copy'), 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    showToast('Failed to copy to clipboard.', 'danger');
                });
        }
    });

    // Download button
    DOM.downloadBtn.addEventListener('click', () => {
        if (!DOM.downloadBtn.disabled && DOM.generatedCode.value) {
            const blob = new Blob([DOM.generatedCode.value], { type: 'application/ld+json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'schema.jsonld';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    });

    // Validate button
    DOM.validateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!DOM.validateBtn.disabled && DOM.generatedCode.value) {
            navigator.clipboard.writeText(DOM.generatedCode.value)
                .then(() => {
                    window.open('https://search.google.com/test/rich-results', '_blank');
                })
                .catch(err => {
                    console.error('Could not copy code: ', err);
                    showToast('Could not copy code to clipboard. Please copy it manually.', 'danger');
                });
        }
    });

    // Copy enhanced prompt button
    DOM.copyEnhancedPromptBtn.addEventListener('click', () => {
        if (DOM.copyEnhancedPromptBtn.disabled || !selectedPrimaryType) {
            return;
        }

        if (typeof DynamicPromptGenerator !== 'undefined') {
            const promptToCopy = DynamicPromptGenerator.generate(selectedPrimaryType);

            if (promptToCopy) {
                navigator.clipboard.writeText(promptToCopy)
                    .then(() => {
                        DOM.copyEnhancedPromptBtn.innerHTML = '<i class="bi bi-check-lg me-2"></i> Copied Successfully!';
                        DOM.copyEnhancedPromptBtn.classList.remove('btn-warning');
                        DOM.copyEnhancedPromptBtn.classList.add('btn-success');

                        setTimeout(() => {
                            DOM.copyEnhancedPromptBtn.innerHTML = '<i class="bi bi-robot me-2"></i> Copy Full Enhancement Prompt';
                            DOM.copyEnhancedPromptBtn.classList.remove('btn-success');
                            DOM.copyEnhancedPromptBtn.classList.add('btn-warning');
                        }, 2500);
                    })
                    .catch(err => {
                        console.error('Failed to copy prompt: ', err);
                        showToast('Sorry, the copy operation failed.', 'danger');
                    });
            }
        } else {
            console.error('Error: DynamicPromptGenerator module is not defined.');
            showToast('An error occurred while loading page components.', 'danger');
        }
    });

    // Smart UI for Job Posting Location with State Cleaning
    if (DOM.customJobLocationType) {
        DOM.customJobLocationType.addEventListener('change', (e) => {
            const selectedType = e.target.value;

            if (selectedType === 'remote') {
                DOM.physicalLocationFields.style.display = 'none';
                DOM.remoteLocationFields.style.display = 'block';

                DOM.customJobStreetAddress.value = '';
                DOM.customJobAddressLocality.value = '';
                DOM.customJobAddressRegion.value = '';
                DOM.customJobPostalCode.value = '';
                DOM.customJobAddressCountry.value = '';

            } else if (selectedType === 'physical') {
                DOM.physicalLocationFields.style.display = 'block';
                DOM.remoteLocationFields.style.display = 'none';

                DOM.customJobApplicantCountry.value = '';

            } else if (selectedType === 'hybrid') {
                DOM.physicalLocationFields.style.display = 'block';
                DOM.remoteLocationFields.style.display = 'block';
            }
        });
    }

    /**
     * Initializes all Bootstrap tooltips with an optimal balance of UX, Accessibility, and Security.
     *
     * This function enhances the default Bootstrap tooltip behavior by:
     * 1.  Allowing HTML content for richer, more informative tooltips.
     * 2.  Setting triggers to 'hover focus' to ensure accessibility for both mouse and keyboard users.
     * 3.  Adding a slight delay for a smoother, less intrusive user experience.
     * 4.  Implementing a pragmatic security check. Given that all tooltip content is currently
     *     static and developer-controlled, a full sanitization library is considered over-engineering.
     *     Instead, a robust regex-based check is used as a strong safeguard against accidental
     *     introduction of common script injection vectors in the future.
     */
    function initializeEnhancedTooltips() {
        try {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            if (tooltipTriggerList.length === 0) return; // Early return if no tooltips

            tooltipTriggerList.forEach(tooltipTriggerEl => {
                const title = tooltipTriggerEl.getAttribute('title') || tooltipTriggerEl.getAttribute('data-bs-title');

                // Proceed only if there is content for the tooltip.
                if (title) {
                    // Pragmatic Security Check: A regex to block obvious script injection attempts.
                    // This is a middle-ground solution that avoids an external library for this controlled context.
                    // It looks for "<script>", "javascript:", and "on..." event handlers.
                    const isPotentiallyUnsafe = /<script|javascript:|on\w+\s*=/i.test(title);

                    if (!isPotentiallyUnsafe) {
                        new bootstrap.Tooltip(tooltipTriggerEl, {
                            html: true,
                            trigger: 'hover focus',
                            delay: { show: 300, hide: 100 },
                            boundary: 'viewport'
                        });
                    } else {
                        // Log a warning for the developer if potentially unsafe content is found.
                        console.warn('Tooltip initialization skipped due to potentially unsafe content:', tooltipTriggerEl);
                    }
                }
            });
        } catch (error) {
            console.error("A critical error occurred while initializing tooltips:", error);
        }
    }

    // ===================================================================
    //  Manual Edit Detection System
    // ===================================================================

    /**
     * Detect manual edits with debouncing to avoid excessive checks
     */
    let editDetectionTimeout;
    DOM.generatedCode.addEventListener('input', () => {
        clearTimeout(editDetectionTimeout);
        editDetectionTimeout = setTimeout(detectManualEdit, 1500); // 1.5 second debounce
    });

    /**
     * Optional: Clear manual edit state when user explicitly clears the textarea
     */
    DOM.generatedCode.addEventListener('focus', () => {
        // If textarea is empty, clear state
        if (!DOM.generatedCode.value.trim()) {
            resetManualEditState();
        }
    });

    // Initialize textarea state on load
    updateTextareaEditability();

    // --- >> DEVTOOLS EXTENSION INTEGRATION V2 (ROBUST & SECURE) << ---
    /**
     * Listens for messages from the DevTools panel to enable remote control.
     */
    function listenForDevTools() {
        window.addEventListener('message', (event) => {
            // --- SECURITY CHECK ---
            // We only accept messages that have a specific structure and come from a trusted context.
            // A simple origin check is not always reliable for extensions.
            const data = event.data;
            if (!data || data.type !== 'ANALYZE_HTML' || !data.htmlContent) {
                // Ignore messages that don't match our expected format.
                return;
            }

            console.log('Received analysis request from DevTools panel.');

            // 1. Populate the inputs with the received data
            if (data.pageUrl) {
                DOM.urlInput.value = data.pageUrl;
            }
            if (data.htmlContent) {
                DOM.htmlContentInput.value = data.htmlContent;
                // Trigger input event to show base URL field if needed
                DOM.htmlContentInput.dispatchEvent(new Event('input'));
            }

            // 2. Programmatically click the "Analyze Content" button
            // Use a small timeout to ensure the DOM has updated with the new values
            setTimeout(() => {
                DOM.analyzeBtn.click();
            }, 100);
        });
    }

    // 1. Initialize UI components
    initializeEnhancedTooltips();

    // 2. Initialize external modules if available
    if (typeof initializeProjectHub !== 'undefined') initializeProjectHub();
    if (typeof initializeEmp !== 'undefined') initializeEmp();

    // 3. Initialize auxiliary modules like the Storage Monitor
    if (typeof StorageMonitor === 'object' && typeof StorageMonitor.init === 'function') {
        StorageMonitor.init();
    }

    // Real-time salary validation
    if (DOM.customJobSalaryValue) {
        DOM.customJobSalaryValue.addEventListener('blur', function () {
            const input = this.value.trim();

            if (!input) {
                this.classList.remove('is-invalid');
                return;
            }

            const validation = validateSalaryRange(input);

            if (!validation.isValid) {
                this.classList.add('is-invalid');

                let errorDiv = this.nextElementSibling;
                if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'invalid-feedback';
                    this.parentNode.insertBefore(errorDiv, this.nextSibling);
                }
                errorDiv.textContent = validation.error;
                errorDiv.style.display = 'block';

            } else {
                this.classList.remove('is-invalid');

                const errorDiv = this.nextElementSibling;
                if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
                    errorDiv.style.display = 'none';
                }
            }
        });
    }

    // 4. Activate listeners
    listenForDevTools();
})();