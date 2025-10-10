'use strict';

/**
 * @file 93-smart-selector-analyzer.js
 * @description Proactive Intelligence System - Smart CSS Selector Analysis & Enhancement
 * @version 2.0.0 - Product Schema Enhanced
 * @author Ai8V | Mind & Machine
 */

const SelectorPatternAnalyzer = (function () {

    // ===================================================================
    //  KNOWN PATTERNS LIBRARY
    // ===================================================================

    const KNOWN_PATTERNS = {
        
        /**
         * Pattern: List Items (Pros/Cons/Ingredients/Features/etc.)
         * Detects when user selects a single <li> but likely needs all items
         */
        list_items: {
            triggers: ['pros', 'cons', 'positive', 'negative', 'ingredient', 'instruction', 'step', 'feature', 'benefit', 'advantage', 'highlight'],
            confidence: 0.95,
            
            analyze: function(selector, targetElement, inputId) {
                if (targetElement.tagName !== 'LI') {
                    return null;
                }

                const parentList = targetElement.closest('ul, ol');
                if (!parentList) {
                    return null;
                }

                let parentSelector = '';
                if (parentList.id) {
                    parentSelector = '#' + CSS.escape(parentList.id);
                } else if (parentList.className) {
                    const stableClass = Array.from(parentList.classList).find(c => !c.includes(':') && !c.match(/^\d/));
                    if(stableClass) parentSelector = '.' + CSS.escape(stableClass);
                }

                if (!parentSelector && parentList.parentElement.className) {
                     const stableClass = Array.from(parentList.parentElement.classList).find(c => !c.includes(':') && !c.match(/^\d/));
                     if(stableClass) parentSelector = '.' + CSS.escape(stableClass) + ' ' + parentList.tagName.toLowerCase();
                }

                if (!parentSelector) {
                    return null;
                }
                
                const enhancedSelector = `${parentSelector} li`;

                if (document.querySelectorAll(enhancedSelector).length <= 1) {
                    return null;
                }

                return {
                    confidence: this.confidence,
                    originalSelector: selector,
                    enhancedSelector: enhancedSelector,
                    reason: 'تم اكتشاف عنصر قائمة (<li>). للحصول على جميع العناصر في القائمة، نوصي باستخدام الحاوية الرئيسية.',
                    patternType: 'list_items',
                    autoApply: true
                };
            }
        },

        /**
         * Pattern: FAQ Container
         * Detects when user selects question/answer but needs the parent container
         */
        faq_container: {
            triggers: ['faqitem', 'faqquestion', 'faqanswer'],
            confidence: 0.90,
            
            analyze: function(selector, targetElement, inputId) {
                if (!inputId.toLowerCase().includes('faq')) {
                    return null;
                }

                let container = targetElement;
                let attempts = 0;
                while (container && attempts < 5) {
                    const className = container.className ? container.className.toLowerCase() : '';
                    if (className.includes('faq-item') || className.includes('accordion-item') || className.includes('qa-item')) {
                        break;
                    }
                    container = container.parentElement;
                    attempts++;
                }

                if (!container || container === targetElement) {
                    return null;
                }
                
                let containerSelector = '';
                 if (container.id) {
                    containerSelector = '#' + CSS.escape(container.id);
                } else if (container.className) {
                    const stableClass = Array.from(container.classList).find(c => !c.includes(':') && !c.match(/^\d/));
                    if(stableClass) containerSelector = '.' + CSS.escape(stableClass);
                }
                
                if(!containerSelector || selector.trim() === containerSelector.trim()) return null;

                return {
                    confidence: this.confidence,
                    originalSelector: selector,
                    enhancedSelector: containerSelector,
                    reason: 'تم اكتشاف عنصر سؤال/إجابة. للحصول على زوج السؤال والإجابة معًا، نوصي بتحديد الحاوية الأم.',
                    patternType: 'faq_container',
                    autoApply: false
                };
            }
        },

        /**
         * Pattern: Repeating Siblings (for variants, specs, etc.)
         * Detects repeating sibling elements with the same structure
         */
        repeating_siblings: {
            triggers: ['product', 'item', 'variant', 'container', 'spec', 'specification'],
            confidence: 0.85,
            
            analyze: function(selector, targetElement, inputId) {
                const parent = targetElement.parentElement;
                if (!parent) return null;

                const mainClass = Array.from(targetElement.classList).find(c => !c.includes(':') && !c.match(/^\d/));
                if (!mainClass) return null;

                const selectorForSiblings = `${targetElement.tagName.toLowerCase()}.${CSS.escape(mainClass)}`;
                const siblings = parent.querySelectorAll(`:scope > ${selectorForSiblings}`);

                if (siblings.length > 1) {
                     return {
                        confidence: this.confidence,
                        originalSelector: selector,
                        enhancedSelector: selectorForSiblings,
                        reason: `تم اكتشاف نمط متكرر (${siblings.length} عناصر). للحصول على جميع العناصر المتشابهة، نوصي باستخدام هذا المحدد الأعم.`,
                        patternType: 'repeating_siblings',
                        autoApply: false
                    };
                }

                return null;
            }
        },

        /**
         * 🆕 NEW PATTERN: Product Image Gallery
         * Detects when user selects a single image from a gallery
         */
        product_image_gallery: {
            triggers: ['productimage', 'customproductimageselector'],
            confidence: 0.93,
            
            analyze: function(selector, targetElement, inputId) {
                // Only trigger for product image fields
                if (!inputId.toLowerCase().includes('productimage')) {
                    return null;
                }

                // Must be an <img> tag
                if (targetElement.tagName !== 'IMG') {
                    return null;
                }

                // Look for gallery container patterns
                const galleryPatterns = [
                    '.product-gallery', '.image-gallery', '.gallery-images',
                    '.product-images', '.image-slider', '.carousel-inner',
                    '.product-thumbnails', '[class*="gallery"]', '[class*="slider"]'
                ];

                let galleryContainer = null;
                for (const pattern of galleryPatterns) {
                    galleryContainer = targetElement.closest(pattern);
                    if (galleryContainer) break;
                }

                if (!galleryContainer) return null;

                // Build selector for gallery container
                let containerSelector = '';
                if (galleryContainer.id) {
                    containerSelector = '#' + CSS.escape(galleryContainer.id);
                } else if (galleryContainer.className) {
                    const stableClass = Array.from(galleryContainer.classList)
                        .find(c => !c.includes(':') && !c.match(/^\d/) && 
                                  (c.includes('gallery') || c.includes('slider') || c.includes('carousel')));
                    if (stableClass) containerSelector = '.' + CSS.escape(stableClass);
                }

                if (!containerSelector) return null;

                const enhancedSelector = `${containerSelector} img`;
                const allImages = document.querySelectorAll(enhancedSelector);

                if (allImages.length <= 1) return null;

                return {
                    confidence: this.confidence,
                    originalSelector: selector,
                    enhancedSelector: enhancedSelector,
                    reason: `تم اكتشاف معرض صور (${allImages.length} صور). Google يفضل استقبال جميع صور المنتج. نوصي باستهداف المعرض بالكامل.`,
                    patternType: 'product_image_gallery',
                    autoApply: true // Auto-apply because intent is clear
                };
            }
        },

        /**
         * 🆕 NEW PATTERN: Specifications Table
         * Detects when user selects a cell from a specs table
         */
        specifications_table: {
            triggers: ['productcolor', 'productsize', 'productmaterial', 'productpattern', 'productgender', 'productagegroup'],
            confidence: 0.88,
            
            analyze: function(selector, targetElement, inputId) {
                // Check if this is a product attribute field
                const attributeKeywords = ['color', 'size', 'material', 'pattern', 'gender', 'age'];
                const isAttributeField = attributeKeywords.some(kw => inputId.toLowerCase().includes(kw));
                
                if (!isAttributeField) return null;

                // Must be inside a table cell
                const cell = targetElement.closest('td, th');
                if (!cell) return null;

                // Find the parent table or list
                const table = cell.closest('table');
                const list = cell.closest('dl, ul');
                const container = table || list;
                
                if (!container) return null;

                // Build selector for container
                let containerSelector = '';
                if (container.id) {
                    containerSelector = '#' + CSS.escape(container.id);
                } else if (container.className) {
                    const stableClass = Array.from(container.classList)
                        .find(c => !c.includes(':') && !c.match(/^\d/) && 
                                  (c.includes('spec') || c.includes('detail') || c.includes('attribute') || c.includes('info')));
                    if (stableClass) containerSelector = '.' + CSS.escape(stableClass);
                }

                if (!containerSelector) {
                    // Fallback to tag selector
                    containerSelector = container.tagName.toLowerCase();
                }

                // Count rows to ensure it's a multi-row structure
                const rows = container.querySelectorAll('tr, li, dt');
                if (rows.length <= 1) return null;

                return {
                    confidence: this.confidence,
                    originalSelector: selector,
                    enhancedSelector: containerSelector,
                    reason: `تم اكتشاف جدول مواصفات (${rows.length} صفوف). يمكنك استهداف الجدول بالكامل لاستخراج جميع المواصفات دفعة واحدة.`,
                    patternType: 'specifications_table',
                    autoApply: false // User might want just one attribute
                };
            }
        },

        /**
         * 🆕 NEW PATTERN: Product Variants Grid
         * Detects when user selects an element inside a variant card
         */
        product_variants_grid: {
            triggers: ['variant', 'product'],
            confidence: 0.90,
            
            analyze: function(selector, targetElement, inputId) {
                // Look for variant-related keywords in parent classes
                let current = targetElement;
                let variantCard = null;
                let attempts = 0;

                while (current && attempts < 5) {
                    const className = current.className ? current.className.toLowerCase() : '';
                    if (className.includes('variant') && 
                        (className.includes('card') || className.includes('item') || className.includes('option'))) {
                        variantCard = current;
                        break;
                    }
                    current = current.parentElement;
                    attempts++;
                }

                if (!variantCard) return null;

                // Find the parent container for all variants
                const variantsContainer = variantCard.parentElement;
                if (!variantsContainer) return null;

                // Build selector for variant card class
                const cardClass = Array.from(variantCard.classList)
                    .find(c => !c.includes(':') && !c.match(/^\d/) && c.includes('variant'));
                
                if (!cardClass) return null;

                const enhancedSelector = `.${CSS.escape(cardClass)}`;
                const allVariants = document.querySelectorAll(enhancedSelector);

                if (allVariants.length <= 1) return null;

                return {
                    confidence: this.confidence,
                    originalSelector: selector,
                    enhancedSelector: enhancedSelector,
                    reason: `تم اكتشاف بطاقة متغير ضمن ${allVariants.length} متغيرات. للحصول على جميع بطاقات المتغيرات، نوصي بهذا المحدد.`,
                    patternType: 'product_variants_grid',
                    autoApply: false
                };
            }
        },

        /**
         * 🆕 NEW PATTERN: Price Pair Detection
         * Detects when user selects one price and there's a strikethrough price nearby
         */
        price_pair_detection: {
            triggers: ['productprice', 'productstrike', 'price'],
            confidence: 0.87,
            
            analyze: function(selector, targetElement, inputId) {
                // Only for price-related fields
                if (!inputId.toLowerCase().includes('price')) {
                    return null;
                }

                // Look for sibling prices in the same container
                const priceContainer = targetElement.closest('div, span, p, li');
                if (!priceContainer) return null;

                const allPrices = priceContainer.querySelectorAll('[class*="price"], [class*="cost"], del, s, strike');
                
                if (allPrices.length <= 1) return null;

                // Identify which is strikethrough
                let regularPrice = null;
                let strikethroughPrice = null;

                allPrices.forEach(el => {
                    const style = window.getComputedStyle(el);
                    const isStrikethrough = style.textDecoration.includes('line-through') || 
                                           el.tagName === 'DEL' || el.tagName === 'S' || el.tagName === 'STRIKE';
                    
                    if (isStrikethrough) {
                        strikethroughPrice = el;
                    } else {
                        regularPrice = el;
                    }
                });

                if (!regularPrice || !strikethroughPrice) return null;

                // Build selector for the other price
                const otherPrice = (targetElement === regularPrice) ? strikethroughPrice : regularPrice;
                const otherPriceSelector = buildSelectorForElement(otherPrice);

                return {
                    confidence: this.confidence,
                    originalSelector: selector,
                    enhancedSelector: selector, // Keep original
                    reason: `⚠️ تم اكتشاف سعرين (عادي ومخفّض). لا تنسَ إدخال المحدد للسعر الآخر أيضًا: <code>${otherPriceSelector}</code>`,
                    patternType: 'price_pair_detection',
                    autoApply: false, // This is informational only
                    isInformational: true
                };
            }
        },

        /**
         * 🆕 NEW PATTERN: Shipping/Returns Info Block
         * Detects when user selects one line from shipping/returns info
         */
        shipping_returns_block: {
            triggers: ['shipping', 'return', 'delivery', 'handling', 'transit'],
            confidence: 0.86,
            
            analyze: function(selector, targetElement, inputId) {
                // Check if this is a shipping/returns field
                const relevantKeywords = ['shipping', 'return', 'delivery', 'handling', 'transit'];
                const isRelevant = relevantKeywords.some(kw => inputId.toLowerCase().includes(kw));
                
                if (!isRelevant) return null;

                // Look for parent container
                const infoBlock = targetElement.closest('table, ul, ol, dl, [class*="shipping"], [class*="delivery"], [class*="return"]');
                if (!infoBlock) return null;

                // Build selector
                let blockSelector = '';
                if (infoBlock.id) {
                    blockSelector = '#' + CSS.escape(infoBlock.id);
                } else if (infoBlock.className) {
                    const stableClass = Array.from(infoBlock.classList)
                        .find(c => !c.includes(':') && !c.match(/^\d/) && 
                                  (c.includes('shipping') || c.includes('delivery') || c.includes('return') || c.includes('info')));
                    if (stableClass) blockSelector = '.' + CSS.escape(stableClass);
                }

                if (!blockSelector) {
                    blockSelector = infoBlock.tagName.toLowerCase();
                }

                // Check if there are multiple items
                const items = infoBlock.querySelectorAll('tr, li, dt, p');
                if (items.length <= 1) return null;

                return {
                    confidence: this.confidence,
                    originalSelector: selector,
                    enhancedSelector: blockSelector,
                    reason: `تم اكتشاف كتلة معلومات شحن/إرجاع (${items.length} عناصر). يمكنك استهداف الكتلة الكاملة لاستخراج جميع التفاصيل.`,
                    patternType: 'shipping_returns_block',
                    autoApply: false
                };
            }
        }
    };

    // ===================================================================
    //  HELPER FUNCTION: Build selector for an element
    // ===================================================================
    function buildSelectorForElement(element) {
        if (element.id) {
            return '#' + CSS.escape(element.id);
        }
        
        if (element.className) {
            const stableClass = Array.from(element.classList)
                .find(c => !c.includes(':') && !c.match(/^\d/));
            if (stableClass) {
                return '.' + CSS.escape(stableClass);
            }
        }
        
        return element.tagName.toLowerCase();
    }

    // ===================================================================
    //  MAIN ANALYSIS ENGINE
    // ===================================================================

    /**
     * Main analysis function - orchestrates pattern matching
     * @param {string} selector - CSS selector chosen by user
     * @param {Element} targetElement - The actual DOM element
     * @param {string} inputId - ID of the target input field
     * @returns {Object|null} Analysis result or null
     */
    function analyze(selector, targetElement, inputId) {
        if (!selector || !targetElement || !inputId) {
            return null;
        }

        const normalizedId = inputId.toLowerCase();

        for (const pattern of Object.values(KNOWN_PATTERNS)) {
            const isRelevant = pattern.triggers.some(trigger => 
                normalizedId.includes(trigger)
            );

            if (isRelevant) {
                const result = pattern.analyze(selector, targetElement, inputId);
                if (result) {
                    console.log(`✔ Pattern matched: ${result.patternType}`, result);
                    return result;
                }
            }
        }

        return null;
    }

    return {
        analyze,
    };

})();

window.SelectorPatternAnalyzer = SelectorPatternAnalyzer;