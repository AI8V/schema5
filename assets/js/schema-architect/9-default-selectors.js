const DEFAULT_SELECTORS = {
    "FAQPage": {
        "f1_faqContainer": ".faq-item, .accordion-item, .qa-item",
        "f2_questionSelector": ".question, .faq-q, .accordion-button, .query-title",
        "f3_answerSelector": ".answer, .faq-a, .accordion-body, .response-text"
    },
    "Product": {
        "p_name": "h1, .product-title, .product-name, [itemprop='name']",
        "p_image": ".woocommerce-product-gallery__image img, img.wp-post-image, [itemprop='image'], .product-gallery img, .product-image-container img, .main-image img, article.product img, main.product-page img, picture img, article img, main img",
        "p_description": ".product-description, .product-summary, .lead, [itemprop='description']",

        "p1_price": `
        .product-price, .price, .sale-price, .current-price, .now-price,
        .price-current, .price-now, .price-sale, .price-offer, .final-price,
            [itemprop='price'], [data-price], .woocommerce-Price-amount,
            .price-tag, .product-price-value, .selling-price,
            .price-box .price, .regular-price:not(del):not(s)
            `.replace(/\s+/g, ' ').trim(),

        "p_strikethroughPrice": `
            .original-price, .list-price, .regular-price, .was-price,
            .old-price, .price-old, del .price, s .price, strike .price,
            del, s, strike, .strikethrough, [class*='strike'],
            .compare-at-price, .before-discount
        `.replace(/\s+/g, ' ').trim(),

        "p2_currency": ".product-currency, [itemprop='priceCurrency']",
        "p3_sku": ".product-sku, .sku, .sku-value, [itemprop='sku']",
        "p4_brand": ".product-brand, .brand, .brand-name, .manufacturer, [itemprop='brand'], [data-brand],.product-vendor, .vendor-name, .brand-logo, .product-meta .brand, .product-info .brand, a[href*='/brand/'], a[href*='/brands/']",
        "p5_shippingRate": ".shipping-rate, .shipping-cost",
        "p6_shippingCountry": ".shipping-country, .shipping-zone",
        "p7_returnDays": ".return-days, .return-window",
        "p8_returnFees": ".return-fees, .return-charge",
        "p9_size": ".product-size, .size-value, [itemprop='size']",
        "p10_gtin": "[itemprop*='gtin'], [itemprop='productID']",
        "p11_mpn": "[itemprop='mpn']",
        "p12_color": "[itemprop='color']",
        "p13_material": "[itemprop='material']",
        "p14_pattern": "[itemprop='pattern']"
    },
    "Review": {
        "r1_container": ".review-snippet, [itemtype*='schema.org/Review']",
        "r2_ratingValue": ".rating-value, [itemprop='ratingValue']",
        "r3_itemName": ".reviewed-item-name, .product-title-review",
        "r4_pros": ".pros-list li, .good-points li, .pros .list-item",
        "r5_cons": ".cons-list li, .bad-points li, .cons .list-item",
        "r6_reviewCount": ".review-count, .rating-count, [itemprop='reviewCount'], [itemprop='ratingCount']"
    },
    "Recipe": {
        "c1_container": ".recipe-card, [itemtype*='schema.org/Recipe']",
        "c2_name": ".recipe-title, h1, h2, h3",
        "c3_prepTime": ".prep-time, [itemprop='prepTime']",
        "c4_cookTime": ".cook-time, [itemprop='cookTime']",
        "c5_ingredients": ".ingredients li, [itemprop='recipeIngredient']",
        "c6_instructions": ".instructions li, .recipe-instructions li, [itemprop='recipeInstructions']"
    },
    "HowTo": {
        "h1_container": ".howto-guide, [itemtype*='schema.org/HowTo']",
        "h2_name": ".howto-title, h1, h2, h3",
        "h3_stepContainer": ".step, .howto-step, [itemprop='step']",
        "h4_stepText": ".step-text, .howto-text, [itemprop='text']"
    },
    "Event": {
        "e1_name": ".event-title, h1, h2, h3",
        "e2_startDate": ".event-start-date, [itemprop='startDate']",
        "e3_location": ".location, .venue, [itemprop='location']",
        "e4_organizer": ".organizer, [itemprop='organizer']"
    },
    "Organization": {
        "o1_logo": "img[src*='logo'], img[alt*='logo'], .logo",
        "o2_address": ".address, .contact-address, footer address",
        "o3_telephone": "a[href^='tel:']"
    },
    "VideoObject": {
        "v1_container": ".video-spotlight, .video-player-container, [itemtype*='schema.org/VideoObject']",
        "v2_name": ".video-title, h1, h2, h3",
        "v3_description": ".video-description, .lead, [data-card-text]",
        "v4_thumbnail": "video[poster], .video-thumb img, .video-spotlight img, [data-video-id] img",
        "v5_contentUrl": "video > source, iframe[src*='youtube'], iframe[src*='vimeo'], [data-video-id]",
        "v6_uploadDate": "time[datetime], .upload-date, [itemprop='uploadDate']"
    },
    "LocalBusiness": {
        "l1_priceRange": ".price-range, [itemprop='priceRange']",
        "l2_openingHours": ".opening-hours, .hours-of-operation, [itemprop='openingHours']"
    },
    "JobPosting": {
        "j1_container": ".job-opening, [itemtype*='schema.org/JobPosting']",
        "j2_title": ".job-title, h1, h2, h3",
        "j3_datePosted": ".date-posted, .posted-on, time[itemprop='datePosted']",
        "j4_locationContainer": ".job-location, .work-location, [itemprop='jobLocation']",
        "j5_salary": ".salary, .compensation-package, [itemprop='baseSalary']",

        // --- Expanded Default Selectors for Higher Auto-Discovery Success ---
        "j6_streetAddress": ".street-address, .address-line1, .street, .address1, [itemprop='streetAddress']",
        "j7_addressLocality": ".city, .locality, .town, [itemprop='addressLocality']",
        "j8_addressRegion": ".state, .region, .province, [itemprop='addressRegion']",
        "j9_postalCode": ".postal-code, .zip-code, .zip, [itemprop='postalCode']",
        "j10_addressCountry": ".country, .country-name, [itemprop='addressCountry']",
        "j11_identifier": ".job-id, .requisition-id, [itemprop='identifier']",
        "j12_experience": ".experience-requirements, .job-experience",
        "j13_education": ".education-requirements, .education-level"
    },
    "SoftwareApplication": {
        "s1_container": ".software-info, [itemtype*='schema.org/SoftwareApplication']",
        "s2_name": ".app-title, h1, h2, h3",
        "s3_price": ".app-price, .software-price",
        "s4_category": ".app-category, [itemprop='applicationCategory']",
        "s5_os": ".app-os, .platform, [itemprop='operatingSystem']",
        "s6_rating": "[class*='rating'], [itemprop='ratingValue']"
    },

    "Course": {
        "k1_listContainer": ".course-list, .course-catalog",
        "k2_itemContainer": ".course-listing, .course-item, [itemtype*='schema.org/Course']",
        "k3_name": ".course-title, h1, h2, h3",
        "k4_provider": ".course-provider, .instructor, [itemprop='provider']",
        "k5_description": ".course-description, p",
        "k6_courseCode": ".course-code, .course-id, [itemprop='courseCode']",
        "k7_price": ".course-price, .price, [itemprop='price']",
        "k8_currency": ".currency, [itemprop='priceCurrency']",
        "k9_credential": ".credential, .certificate, [itemprop='educationalCredentialAwarded']",
        "k10_prerequisites": ".prerequisites, .requirements, [itemprop='coursePrerequisites']",
        "k11_startDate": ".start-date, time[itemprop='startDate'], [itemprop='startDate']",
        "k12_endDate": ".end-date, time[itemprop='endDate'], [itemprop='endDate']",
        "k13_location": ".location, .venue, [itemprop='location']",
        "k14_courseMode": ".course-mode, .delivery-mode, [itemprop='courseMode']",
        "k15_instructor": ".instructor, .teacher, .faculty, [itemprop='instructor']",
        "k16_instanceContainer": ".course-session, .course-offering, .instance-item, .session-details",
    },

    "Breadcrumb": {
        "b1_item": "nav[aria-label='breadcrumb'] ol li, .breadcrumb li, [class*='breadcrumbs'] li"
    },
};