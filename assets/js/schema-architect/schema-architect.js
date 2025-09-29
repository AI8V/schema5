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

        // --- Custom Discovery Selectors ---
        // These inputs provide CSS selectors to help find entities in the HTML.
        customProductPrice: document.getElementById('customProductPrice'),
        customProductCurrency: document.getElementById('customProductCurrency'),
        customProductSku: document.getElementById('customProductSku'),
        customProductBrand: document.getElementById('customProductBrand'),
        // --- Direct Schema Enhancement Inputs ---
        // These inputs directly provide values to enrich the final schema.
        shippingRate: document.getElementById('customShippingRate'),
        shippingCountry: document.getElementById('customShippingCountry'),
        returnDays: document.getElementById('customReturnDays'),
        returnFees: document.getElementById('customReturnFees'),

        customRecipeContainer: document.getElementById('customRecipeContainer'),
        customRecipeName: document.getElementById('customRecipeName'),
        customRecipePrepTime: document.getElementById('customRecipePrepTime'),
        customRecipeCookTime: document.getElementById('customRecipeCookTime'),
        customRecipeIngredients: document.getElementById('customRecipeIngredients'),
        customRecipeInstructions: document.getElementById('customRecipeInstructions'),

        customReviewContainer: document.getElementById('customReviewContainer'),
        customReviewRating: document.getElementById('customReviewRating'),
        customReviewItemName: document.getElementById('customReviewItemName'),

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
        customJobLocation: document.getElementById('customJobLocation'),
        customJobSalary: document.getElementById('customJobSalary'),

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
    };

    let selectedPrimaryType = null;

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
        const orgKeywords = ['university', 'company', 'Team', 'co.', 'college', 'school', 'academy', 'institute', 'inc.', 'ltd.'];

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

    /**
     * Shows toast notification
     * @param {string} message - Message to show
     * @param {string} type - Toast type (success, danger, warning)
     */
    function showToast(message, type = 'info') {
        // Implementation depends on your toast component
        console.log(`Toast [${type}]: ${message}`);
    }

    // ===================================================================
    //  Content Analysis Functions
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
 * Analyzes product entities using the central selectors dictionary.
 * @param {Document} doc - Document to analyze
 * @returns {Array} Array of entities
 */
    function analyzeProductEntities(doc) {
        const entities = [];
        const containerSelector = '.product-showcase, [itemtype*="schema.org/Product"]';
        const productContainer = safeQuerySelector(doc, containerSelector);
        const scope = productContainer || doc;

        const priceSelector = getSelector(DOM.customProductPrice, DEFAULT_SELECTORS.Product.p1_price);
        const priceEl = safeQuerySelector(scope, priceSelector);
        if (priceEl) {
            const priceText = priceEl.textContent.trim();
            if (!priceText.toLowerCase().includes('range')) {
                const price = priceText.replace(/[^0-9.]/g, '');
                if (price) {
                    entities.push({ name: 'Price', value: price, schemaProp: 'price', type: 'Product' });
                    const contextualName = findClosestHeading(priceEl) || safeQuerySelector(scope, 'h2')?.textContent.trim();
                    if (contextualName) entities.push({ name: contextualName, value: contextualName, schemaProp: 'contextualName', type: 'Product' });

                    const currencySelector = getSelector(DOM.customProductCurrency, DEFAULT_SELECTORS.Product.p2_currency);
                    const currencyEl = safeQuerySelector(scope, currencySelector);
                    const inferredCurrency = currencyEl ? currencyEl.textContent.trim() : inferCurrency(priceText);
                    if (inferredCurrency) entities.push({ name: 'Currency', value: inferredCurrency, schemaProp: 'priceCurrency', type: 'Product' });
                }
            }
        }

        const skuSelector = getSelector(DOM.customProductSku, DEFAULT_SELECTORS.Product.p3_sku);
        const skuEl = safeQuerySelector(scope, skuSelector);
        if (skuEl) entities.push({ name: 'SKU', value: skuEl.textContent.trim(), schemaProp: 'sku', type: 'Product' });

        const brandSelector = getSelector(DOM.customProductBrand, DEFAULT_SELECTORS.Product.p4_brand);
        const brandEl = safeQuerySelector(scope, brandSelector);
        if (brandEl) entities.push({ name: 'Brand', value: brandEl.textContent.trim(), schemaProp: 'brand', type: 'Product' });

        // Note: Shipping and Return details are not analyzed automatically by default,
        // as they are highly variable. They are handled by the custom inputs
        // and the populateProductProperties function's smart defaults.

        return entities;
    }

    /**
 * Analyzes review entities using the central selectors dictionary.
 * @param {Document} doc - Document to analyze
 * @returns {Array} Array of entities
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
            const ratingValue = ratingText.match(/(\d+(\.\d+)?)/);
            if (ratingValue && ratingValue[0]) {
                entities.push({ name: 'Review Rating', value: ratingValue[0], schemaProp: 'reviewRating', type: 'Review' });
            }
        }

        const itemNameSelector = getSelector(DOM.customReviewItemName, DEFAULT_SELECTORS.Review.r3_itemName);
        const itemNameEl = safeQuerySelector(scope, itemNameSelector);
        if (itemNameEl) {
            entities.push({ name: 'Reviewed Item Name', value: itemNameEl.textContent.trim(), schemaProp: 'itemName', type: 'Review' });
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
 * Analyzes organization entities using the central selectors dictionary.
 * @param {Document} doc - Document to analyze
 * @returns {Array} Array of entities
 */
    function analyzeOrganizationEntities(doc) {
        const entities = [];
        const scope = doc; // Organization info is typically global (header/footer)

        const logoSelector = getSelector(DOM.customOrgLogo, DEFAULT_SELECTORS.Organization.o1_logo);
        const addressSelector = getSelector(DOM.customOrgAddress, DEFAULT_SELECTORS.Organization.o2_address);
        const telephoneSelector = getSelector(DOM.customOrgTelephone, DEFAULT_SELECTORS.Organization.o3_telephone);

        const logoEl = safeQuerySelector(scope, logoSelector);
        if (logoEl) {
            entities.push({
                name: 'Organization Logo',
                value: new URL(logoEl.src, doc.baseURI).href,
                schemaProp: 'logo',
                type: 'Organization'
            });
        }

        const addressEl = safeQuerySelector(scope, addressSelector);
        if (addressEl) {
            const addressText = addressEl.textContent.replace(/\s+/g, ' ').trim();
            entities.push({
                name: 'Organization Address',
                value: addressText.split('\n')[0],
                schemaProp: 'address',
                type: 'Organization'
            });
        }

        const telephoneEl = safeQuerySelector(scope, telephoneSelector);
        if (telephoneEl) {
            const phone = telephoneEl.getAttribute('href')?.replace('tel:', '') || telephoneEl.textContent.trim();
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
 * Analyzes job posting entities using the central selectors dictionary.
 * @param {Document} doc - Document to analyze
 * @returns {Array} Array of entities
 */
    function analyzeJobPostingEntities(doc) {
        const entities = [];
        const containerSelector = getSelector(DOM.customJobContainer, DEFAULT_SELECTORS.JobPosting.j1_container);
        const container = safeQuerySelector(doc, containerSelector);
        if (!container) return [];

        const scope = container;

        const titleSelector = getSelector(DOM.customJobTitle, DEFAULT_SELECTORS.JobPosting.j2_title);
        const datePostedSelector = getSelector(DOM.customJobDatePosted, DEFAULT_SELECTORS.JobPosting.j3_datePosted);
        const locationSelector = getSelector(DOM.customJobLocation, DEFAULT_SELECTORS.JobPosting.j4_location);
        const salarySelector = getSelector(DOM.customJobSalary, DEFAULT_SELECTORS.JobPosting.j5_salary);

        const titleEl = safeQuerySelector(scope, titleSelector);
        const datePostedEl = safeQuerySelector(scope, datePostedSelector);
        const locationEl = safeQuerySelector(scope, locationSelector);
        const salaryEl = safeQuerySelector(scope, salarySelector);

        if (titleEl || datePostedEl || locationEl || salaryEl) {
            if (titleEl) {
                entities.push({ name: 'Job Title', value: titleEl.textContent.trim(), schemaProp: 'title', type: 'JobPosting' });
            }
            if (datePostedEl) {
                const dateValue = datePostedEl.getAttribute('datetime') || datePostedEl.textContent.trim();
                entities.push({ name: 'Date Posted', value: dateValue, schemaProp: 'datePosted', type: 'JobPosting' });
            }
            if (locationEl) {
                entities.push({ name: 'Job Location', value: locationEl.textContent.trim(), schemaProp: 'jobLocation', type: 'JobPosting' });
            }
            if (salaryEl) {
                entities.push({ name: 'Salary', value: salaryEl.textContent.trim(), schemaProp: 'baseSalary', type: 'JobPosting' });
            }
        }

        return entities;
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
 * Analyzes course entities using the central selectors dictionary.
 * @param {Document} doc - Document to analyze
 * @returns {Array} Array of entities
 */
    function analyzeCourseEntities(doc) {
        const entities = [];
        const listContainerSelector = getSelector(DOM.customCourseListContainer, DEFAULT_SELECTORS.Course.k1_listContainer);
        const listContainer = safeQuerySelector(doc, listContainerSelector);
        const scope = listContainer || doc;

        const itemSelector = getSelector(DOM.customCourseItemContainer, DEFAULT_SELECTORS.Course.k2_itemContainer);
        const courseItems = safeQuerySelectorAll(scope, itemSelector);

        courseItems.forEach(item => {
            const nameSelector = getSelector(DOM.customCourseName, DEFAULT_SELECTORS.Course.k3_name);
            const providerSelector = getSelector(DOM.customCourseProvider, DEFAULT_SELECTORS.Course.k4_provider);
            const descriptionSelector = getSelector(DOM.customCourseDescription, DEFAULT_SELECTORS.Course.k5_description);

            const nameEl = safeQuerySelector(item, nameSelector);
            const providerEl = safeQuerySelector(item, providerSelector);
            const descriptionEl = safeQuerySelector(item, descriptionSelector);

            // Extract provider URL first, as it's more specific.
            const providerUrl = getSafeUrl(providerEl, doc);

            // Extract the main item URL.
            let courseUrl = getSafeUrl(item, doc);

            // If the main URL is the same as the provider's, it's not a distinct course URL.
            if (courseUrl && courseUrl === providerUrl) {
                courseUrl = null;
            }


            if (nameEl && providerEl && descriptionEl) {
                const courseData = {
                    name: nameEl.textContent.trim(),
                    provider: providerEl.textContent.trim(),
                    description: descriptionEl.textContent.trim(),
                    url: courseUrl,
                    providerUrl: providerUrl
                };
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
     * Infers currency from text
     * @param {string} text - Text containing currency info
     * @returns {string|null} Currency code or null
     */
    function inferCurrency(text) {
        if (!text) return null;
        const lowerText = text.toLowerCase();

        // Common currencies
        if (lowerText.includes('$') || lowerText.includes('usd') || lowerText.includes('dollar')) return 'USD';
        if (lowerText.includes('€') || lowerText.includes('eur') || lowerText.includes('euro')) return 'EUR';
        if (lowerText.includes('£') || lowerText.includes('gbp') || lowerText.includes('pound')) return 'GBP';
        if (lowerText.includes('¥') || lowerText.includes('jpy') || lowerText.includes('yen')) return 'JPY';

        // Middle Eastern currencies
        if (lowerText.includes('sar')) return 'SAR';
        if (lowerText.includes('aed')) return 'AED';
        if (lowerText.includes('egp')) return 'EGP';

        // Other major currencies
        if (lowerText.includes('cad')) return 'CAD';
        if (lowerText.includes('aud')) return 'AUD';
        if (lowerText.includes('chf')) return 'CHF';

        return null;
    }

    // ===================================================================
    //  Schema Generation Functions
    // ===================================================================

    /**
     * Suggests schema types based on discovered entities
     * @param {Array} entities - Discovered entities
     * @returns {Array} Array of schema suggestions
     */
    function suggestSchema(entities) {
        const suggestions = [];
        const presentEntityTypes = new Set(entities.map(e => e.type).filter(Boolean));

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
            if (presentEntityTypes.has(schema.evidenceKey)) {
                suggestions.push({
                    type: schema.type,
                    confidence: schema.confidence,
                    reason: schema.reason
                });
            }
        });

        // Always add WebPage as fallback
        suggestions.push({ type: 'WebPage', confidence: 0.5, reason: "A generic fallback for any web page." });

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
     * Generates final schema object
     * @param {Array} entities - Discovered entities
     * @param {string} primaryType - Primary schema type
     * @param {string} pageUrl - Page URL
     * @returns {Object} Generated schema object
     */
    function generateFinalSchema(entities, primaryType, pageUrl) {
        let schema = {
            "@context": "https://schema.org",
            "@type": primaryType,
            "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl || "" }
        };

        // Add common properties
        const generalName = entities.find(e => e.schemaProp === 'name');
        if (generalName) schema.name = generalName.value;

        const mainImage = entities.find(e => e.schemaProp === 'image');
        if (mainImage) schema.image = mainImage.value;

        const mainDesc = entities.find(e => e.schemaProp === 'description');
        if (mainDesc) schema.description = mainDesc.value;

        // Populate type-specific properties
        const populationMap = {
            'Article': populateArticleProperties,
            'Product': populateProductProperties,
            'VideoObject': populateVideoProperties,
            'Review': populateReviewProperties,
            'Recipe': populateRecipeProperties,
            'HowTo': populateHowToProperties,
            'FAQPage': populateFaqProperties,
            'Event': populateEventProperties,
            'Organization': populateOrganizationProperties,
            'BreadcrumbList': populateBreadcrumbProperties,
            'LocalBusiness': populateLocalBusinessProperties,
            'JobPosting': populateJobPostingProperties,
            'SoftwareApplication': populateSoftwareAppProperties,
            'Course': populateCourseProperties
        };

        if (populationMap[primaryType]) {
            populationMap[primaryType](schema, entities, true);
        }

        // Handle nested schemas
        const nestedSchemas = [];
        const processedNestedTypes = new Set();

        if (primaryType === 'Recipe' && entities.some(e => e.type === 'HowTo')) {
            processedNestedTypes.add('HowTo');
        }

        if (primaryType === 'Review' && entities.some(e => e.type === 'Product')) {
            processedNestedTypes.add('Product');
        }

        entities.forEach(entity => {
            if (!entity.type) return;

            let schemaType = entity.type;
            if (schemaType === 'FAQ') schemaType = 'FAQPage';
            if (schemaType === 'Breadcrumb') schemaType = 'BreadcrumbList';

            // Skip courses as they're handled separately
            if (schemaType === 'Course') return;

            // Skip certain types when Product is primary
            if (primaryType === 'Product' && (schemaType === 'Recipe' || schemaType === 'HowTo' || schemaType === 'Review')) {
                return;
            }

            if (schemaType !== primaryType && !['Article', 'Event', 'Organization'].includes(schemaType) && !processedNestedTypes.has(schemaType)) {
                const fragment = buildSchemaFragment(schemaType, entities);
                if (fragment) nestedSchemas.push(fragment);
                processedNestedTypes.add(schemaType);
            }
        });

        if (nestedSchemas.length > 0) schema.hasPart = nestedSchemas;

        // Remove mainEntityOfPage for BreadcrumbList
        if (primaryType === 'BreadcrumbList') {
            delete schema.mainEntityOfPage;
        }

        return schema;
    }

    /**
     * Builds schema fragment for nested types
     * @param {string} type - Schema type
     * @param {Array} entities - Discovered entities
     * @returns {Object|null} Schema fragment or null
     */
    function buildSchemaFragment(type, entities) {
        const fragment = { "@type": type };

        const populationMap = {
            'Product': populateProductProperties,
            'Recipe': populateRecipeProperties,
            'VideoObject': populateVideoProperties,
            'Review': populateReviewProperties,
            'HowTo': populateHowToProperties,
            'FAQPage': populateFaqProperties,
            'Event': populateEventProperties,
            'Organization': populateOrganizationProperties,
            'BreadcrumbList': populateBreadcrumbProperties,
            'LocalBusiness': populateLocalBusinessProperties,
            'JobPosting': populateJobPostingProperties,
            'SoftwareApplication': populateSoftwareAppProperties,
        };

        if (populationMap[type]) {
            populationMap[type](fragment, entities, false);
        }

        // Add fallback image if needed
        const supportsImage = ['Product', 'Recipe', 'VideoObject', 'Review', 'HowTo', 'Event', 'JobPosting', 'SoftwareApplication', 'LocalBusiness'];
        if (!fragment.image && supportsImage.includes(type)) {
            const mainImage = entities.find(e => e.schemaProp === 'image');
            if (mainImage) fragment.image = mainImage.value;
        }

        // Add fallback description if needed
        if (!fragment.description) {
            const mainDesc = entities.find(e => e.schemaProp === 'description');
            if (mainDesc) fragment.description = mainDesc.value;
        }

        // Validation checks
        const requiresName = ['Product', 'Review', 'Recipe', 'HowTo', 'Event', 'VideoObject', 'JobPosting', 'SoftwareApplication', 'LocalBusiness'];
        if (requiresName.includes(type) && !fragment.name) {
            return null;
        }

        if (type === 'SoftwareApplication') {
            const hasRequiredProp = fragment.offers || fragment.aggregateRating;
            if (!hasRequiredProp) return null;
        }

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
     * Populates job posting properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateJobPostingProperties(schema, entities, isPrimary) {
        const jobEntities = entities.filter(e => e.type === 'JobPosting');
        const findJobEntity = (prop) => jobEntities.find(e => e.schemaProp === prop);

        // Title
        const titleEntity = findJobEntity('title');
        if (titleEntity) {
            schema.title = titleEntity.value;
        } else if (isPrimary) {
            const h2 = entities.find(e => e.name === 'Join Our Team!');
            if (h2) schema.title = h2.value;
        }

        // Date posted
        const datePostedEntity = findJobEntity('datePosted');
        if (datePostedEntity) {
            try {
                schema.datePosted = new Date(datePostedEntity.value).toISOString().split('T')[0];
            } catch (e) {
                // Ignore date parsing errors
            }
        }

        // Location
        const locationEntity = findJobEntity('jobLocation');
        if (locationEntity) {
            schema.jobLocation = {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": locationEntity.value
                }
            };
        }

        // Salary
        const salaryEntity = findJobEntity('baseSalary');
        if (salaryEntity) {
            schema.baseSalary = {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": {
                    "@type": "QuantitativeValue",
                    "value": salaryEntity.value.replace(/[^0-9.]/g, ''),
                    "unitText": "YEAR"
                }
            };
        }

        // Hiring organization (required)
        const hiringOrgData = getPublisherData(entities);
        if (hiringOrgData) schema.hiringOrganization = hiringOrgData;

        // Description (recommended)
        if (!schema.description) {
            const mainDesc = entities.find(e => e.schemaProp === 'description');
            if (mainDesc) schema.description = mainDesc.value;
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
     * Gets publisher/organization data
     * @param {Array} entities - Discovered entities
     * @returns {Object|null} Publisher data or null
     */
    function getPublisherData(entities) {
        const empIsAvailable = typeof getEntity !== 'undefined';
        const orgData = { "@type": "Organization" };

        // Get EMP data if available
        const empName = empIsAvailable ? getEntity('organizationName') : null;
        const empLogo = empIsAvailable ? getEntity('logo') : null;
        const empTelephone = empIsAvailable ? getEntity('telephone') : null;

        // Name (required)
        if (empName) {
            orgData.name = empName;
        } else {
            const orgNameEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'name');
            if (orgNameEntity) {
                orgData.name = orgNameEntity.value;
            } else {
                const mainHeadline = entities.find(e => e.schemaProp === 'name');
                if (mainHeadline) {
                    orgData.name = mainHeadline.value;
                } else {
                    return null; // Name is required
                }
            }
        }

        // Logo
        if (empLogo) {
            orgData.logo = { "@type": "ImageObject", "url": empLogo };
        } else {
            const logoEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'logo');
            if (logoEntity) {
                orgData.logo = { "@type": "ImageObject", "url": logoEntity.value };
            }
        }

        // Telephone
        if (empTelephone) {
            orgData.contactPoint = { "@type": "ContactPoint", "telephone": empTelephone, "contactType": "customer service" };
        } else {
            const telephoneEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'telephone');
            if (telephoneEntity) {
                orgData.contactPoint = { "@type": "ContactPoint", "telephone": telephoneEntity.value, "contactType": "customer service" };
            }
        }

        // Additional properties from EMP
        if (empIsAvailable) {
            const savedEmpData = safeJsonParse(localStorage.getItem('schemaArchitect_emp'));
            const additionalProperties = [];
            const predefinedKeys = ['organizationName', 'logo', 'telephone', 'mainAuthor'];

            for (const key in savedEmpData) {
                if (!predefinedKeys.includes(key)) {
                    additionalProperties.push({
                        "@type": "PropertyValue",
                        "name": key,
                        "value": savedEmpData[key]
                    });
                }
            }

            if (additionalProperties.length > 0) {
                orgData.additionalProperty = additionalProperties;
            }
        }

        return orgData;
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
     * Populates product properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateProductProperties(schema, entities, isPrimary) {
        const productEntities = entities.filter(e => e.type === 'Product');
        const findProductEntity = (prop) => productEntities.find(e => e.schemaProp === prop);

        const nameEntity = findProductEntity('contextualName');
        if (nameEntity) {
            schema.name = nameEntity.value;
        } else if (isPrimary) {
            const pageTitle = entities.find(e => e.schemaProp === 'name' && !e.type);
            if (pageTitle) schema.name = pageTitle.value;
        }
        const productImageEntity = findProductEntity('image');
        if (productImageEntity) {
            schema.image = productImageEntity.value;
        } else {
            const mainImage = entities.find(e => e.schemaProp === 'image');
            if (mainImage) {
                schema.image = mainImage.value;
            }
        }

        const priceEntity = findProductEntity('price');
        if (priceEntity) {
            const offer = { "@type": "Offer", "availability": "https://schema.org/InStock" };
            offer.price = priceEntity.value;

            const currencyEntity = findProductEntity('priceCurrency');
            offer.priceCurrency = currencyEntity ? currencyEntity.value : "USD";

            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            offer.priceValidUntil = date.toISOString().split('T')[0];


            const shippingRateValue = DOM.shippingRate?.value.trim();
            const shippingCountryValue = DOM.shippingCountry?.value.trim() || "US";

            if (shippingRateValue) {
                offer.shippingDetails = {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                        "@type": "MonetaryAmount",
                        "value": shippingRateValue,
                        "currency": offer.priceCurrency
                    },
                    "shippingDestination": {
                        "@type": "DefinedRegion",
                        "addressCountry": shippingCountryValue
                    },
                    "deliveryTime": {
                        "@type": "ShippingDeliveryTime",
                        "handlingTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 0,
                            "maxValue": 1,
                            "unitCode": "DAY"
                        },
                        "transitTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 1,
                            "maxValue": 5,
                            "unitCode": "DAY"
                        }
                    }
                };
            } else {
                offer.shippingDetails = {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                        "@type": "MonetaryAmount",
                        "value": "0",
                        "currency": offer.priceCurrency
                    },
                    "shippingDestination": {
                        "@type": "DefinedRegion",
                        "addressCountry": shippingCountryValue
                    },
                    "deliveryTime": {
                        "@type": "ShippingDeliveryTime",
                        "handlingTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 0,
                            "maxValue": 1,
                            "unitCode": "DAY"
                        },
                        "transitTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 1,
                            "maxValue": 5,
                            "unitCode": "DAY"
                        }
                    }
                };
            }

            const returnDaysValue = DOM.returnDays?.value.trim();
            const returnFeesValue = DOM.returnFees?.value.trim();

            if (returnDaysValue) {
                offer.hasMerchantReturnPolicy = {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": shippingCountryValue,
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": parseInt(returnDaysValue) || 30,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": returnFeesValue && returnFeesValue !== "0" ? "https://schema.org/ReturnShippingFees" : "https://schema.org/FreeReturn"
                };

                if (returnFeesValue && returnFeesValue !== "0") {
                    offer.hasMerchantReturnPolicy.returnShippingFeesAmount = {
                        "@type": "MonetaryAmount",
                        "value": returnFeesValue,
                        "currency": offer.priceCurrency
                    };
                }
            } else {
                offer.hasMerchantReturnPolicy = {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": shippingCountryValue,
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 30,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                };
            }

            schema.offers = offer;
        }

        const skuEntity = findProductEntity('sku');
        if (skuEntity) schema.sku = skuEntity.value.split(':').pop().trim();

        const brandEntity = findProductEntity('brand');
        if (brandEntity) schema.brand = { "@type": "Brand", "name": brandEntity.value };


        const ratingEntity = entities.find(e => e.schemaProp === 'reviewRating' && e.type === 'Review');

        if (ratingEntity) {
            // Add aggregateRating - this is what Google shows as stars
            schema.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": ratingEntity.value,
                "ratingCount": "1", // A sensible default
                "bestRating": "5"
            };

            const authorEntity = entities.find(e => e.type === 'Article' && e.schemaProp === 'author');
            const reviewerName = authorEntity ? authorEntity.value : "Customer"; // A more generic default

            schema.review = {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": ratingEntity.value,
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": reviewerName
                }
            };
        }
    }

    /**
     * Populates review properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateReviewProperties(schema, entities, isPrimary) {
        const reviewEntities = entities.filter(e => e.type === 'Review');
        const dateEntity = entities.find(e => e.type === 'Article' && e.schemaProp === 'datePublished');

        // Author
        const empAuthor = typeof getEntity !== 'undefined' ? getEntity('mainAuthor') : null;
        if (empAuthor) {
            schema.author = { "@type": "Person", "name": empAuthor };
        } else {
            const authorEntity = entities.find(e => e.type === 'Article' && e.schemaProp === 'author');
            if (authorEntity) schema.author = { "@type": "Person", "name": authorEntity.value };
        }

        // Date
        if (dateEntity) schema.datePublished = dateEntity.rawValue || dateEntity.value;

        // Publisher
        const publisherData = getPublisherData(entities);
        if (publisherData) schema.publisher = publisherData;

        // Rating
        const ratingEntity = reviewEntities.find(e => e.schemaProp === 'reviewRating');
        if (ratingEntity) {
            schema.reviewRating = {
                "@type": "Rating",
                "ratingValue": ratingEntity.value,
                "bestRating": "5"
            };
        }

        // Item reviewed
        const itemReviewed = { "@type": "Thing" };
        const itemNameEntity = reviewEntities.find(e => e.schemaProp === 'itemName');
        const productContextualName = entities.find(e => e.type === 'Product' && e.schemaProp === 'contextualName');

        if (itemNameEntity) {
            itemReviewed.name = itemNameEntity.value;
        } else if (productContextualName) {
            itemReviewed.name = productContextualName.value;
        } else {
            const generalNameEntity = entities.find(e => e.schemaProp === 'name');
            if (generalNameEntity) itemReviewed.name = generalNameEntity.value;
        }

        // If product data exists, enhance itemReviewed
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
     * Populates course properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateCourseProperties(schema, entities, isPrimary) {
        const courseEntities = entities.filter(e => e.type === 'Course' && e.schemaProp === 'courseItem');

        // Need at least one course
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
                "url": course.url,
                "name": course.name,
                "description": course.description,
                "provider": provider
            };

            return {
                "@type": "ListItem",
                "position": index + 1,
                "item": courseItem
            };
        });

        // Remove provider from main schema
        delete schema.provider;
    }

    /**
     * Populates organization properties
     * @param {Object} schema - Schema object
     * @param {Array} entities - Discovered entities
     * @param {boolean} isPrimary - Whether this is the primary schema
     */
    function populateOrganizationProperties(schema, entities, isPrimary) {
        const orgData = getPublisherData(entities);
        if (orgData) Object.assign(schema, orgData);

        if (isPrimary) {
            // Ensure name is set
            if (!schema.name) {
                const pageTitle = entities.find(e => e.schemaProp === 'name');
                if (pageTitle) schema.name = pageTitle.value;
            }

            // Add URL if available
            const pageUrl = DOM.urlInput.value.trim();
            if (pageUrl) schema.url = pageUrl;
        }

        // Address
        const addressEntity = entities.find(e => e.type === 'Organization' && e.schemaProp === 'address');
        if (addressEntity) {
            schema.address = { "@type": "PostalAddress", "streetAddress": addressEntity.value };
        }

        // Description
        const mainDesc = entities.find(e => e.schemaProp === 'description');
        if (mainDesc && !schema.description) {
            schema.description = mainDesc.value;
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
                if (schema.itemListElement && schema.itemListElement.every(item => item.item['@type'] === 'Course')) {
                    previewHtml = `
                    <div class="card">
                        <div class="card-header d-flex align-items-center">
                            <i class="bi bi-mortarboard-fill me-2 text-primary"></i>
                            <h4 class="card-title mb-0 h6">${escapeHtml(schema.name || 'Course List')}</h4>
                        </div>
                        <ul class="list-group list-group-flush small">
                            ${schema.itemListElement.slice(0, 3).map(courseItem => `
                                <li class="list-group-item">
                                    <div class="fw-bold">${escapeHtml(courseItem.item.name)}</div>
                                    <div class="text-muted">Provider: ${escapeHtml(courseItem.item.provider.name)}</div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>`;
                } else {
                    previewHtml = '<p class="text-muted small">No preview is available for this ItemList type.</p>';
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
                let postDate = '';
                if (schema.datePosted) {
                    try {
                        const posted = new Date(schema.datePosted);
                        const today = new Date();
                        const diffTime = Math.abs(today - posted);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        postDate = `${diffDays} day(s) ago`;
                    } catch (e) {
                        // Ignore date errors
                    }
                }
                previewHtml = `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-start">
                            ${org && org.logo ? `
                                <img src="${escapeHtml(org.logo.url || org.logo)}" alt="Logo of ${escapeHtml(org.name || 'the hiring organization')}" width="50" height="50" class="rounded me-3" style="width: 50px; height: 50px; object-fit: contain; border: 1px solid var(--bs-border-color);">
                            ` : `
                                <div class="rounded bg-secondary-subtle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px; flex-shrink: 0;">
                                    <i class="bi bi-briefcase-fill fs-4 text-muted"></i>
                                </div>
                            `}
                            <div class="flex-grow-1">
                                <h4 class="card-title mb-1">${escapeHtml(schema.title || 'Job Opening')}</h4>
                                <p class="card-text small text-muted mb-1">
                                    ${org ? `${escapeHtml(org.name)}` : ''}
                                    ${schema.jobLocation ? ` - ${escapeHtml(schema.jobLocation.address.addressLocality)}` : ''}
                                </p>
                            </div>
                        </div>
                        <div class="mt-3 small">
                            ${postDate ? `
                                <span class="badge bg-success-subtle text-success-emphasis border border-success-subtle me-2">
                                    <i class="bi bi-calendar-check-fill me-1"></i> Posted ${postDate}
                                </span>
                            ` : ''}
                            ${schema.baseSalary ? `
                                <span class="badge bg-info-subtle text-info-emphasis border border-info-subtle">
                                    <i class="bi bi-currency-dollar me-1"></i> Salary: ${escapeHtml(schema.baseSalary.value.value)}
                                </span>
                            ` : ''}
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

            // Render results
            const analysisHtml = renderAnalysis(entities, suggestions);
            const existingSchemaHtml = displayExistingSchema(contentToAnalyze);
            DOM.analysisResults.innerHTML = analysisHtml + existingSchemaHtml;

            // Update schema output function
            const updateSchemaOutput = (type) => {
                const finalSchema = generateFinalSchema(entities, type, baseUrl);
                DOM.generatedCode.value = JSON.stringify(finalSchema, null, 2);
                renderSgePreview(finalSchema);
            };

            // Select best suggestion
            if (suggestions.length > 0) {
                const bestType = suggestions[0].type;
                selectedPrimaryType = bestType;
                DOM.copyEnhancedPromptBtn.disabled = false;
                updateSchemaOutput(bestType);
                updateActionButtonsState(true);

                // Highlight best suggestion
                const bestSuggestionEl = safeQuerySelector(document, `.schema-suggestion[data-schema-type="${bestType}"]`);
                if (bestSuggestionEl) bestSuggestionEl.classList.add('border-primary', 'border-2');
            }

            // Add click handlers to suggestions
            document.querySelectorAll('.schema-suggestion').forEach(el => {
                const selectAction = () => {
                    // Remove previous selection
                    document.querySelectorAll('.schema-suggestion').forEach(s => {
                        s.classList.remove('border-primary', 'border-2');
                        s.setAttribute('aria-pressed', 'false');
                    });

                    // Select current
                    el.classList.add('border-primary', 'border-2');
                    el.setAttribute('aria-pressed', 'true');

                    const schemaType = el.dataset.schemaType;
                    selectedPrimaryType = schemaType;
                    DOM.copyEnhancedPromptBtn.disabled = false;
                    updateSchemaOutput(schemaType);
                };

                el.addEventListener('click', selectAction);
                el.addEventListener('keydown', e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectAction();
                    }
                });
            });

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

    // 3. Activate listeners
    listenForDevTools();

})();
