const DEFAULT_SELECTORS = {
    "FAQPage": {
        "f1_faqContainer": ".faq-item, .accordion-item, .qa-item",
        "f2_questionSelector": ".question, .faq-q, .accordion-button, .query-title",
        "f3_answerSelector": ".answer, .faq-a, .accordion-body, .response-text"
    },
        "Product": {
        "p1_price": ".product-price, [itemprop='price']",
        "p2_currency": ".product-currency", // Although often inferred, a selector can be useful
        "p3_sku": ".product-sku, [itemprop='sku']",
        "p4_brand": ".product-brand, [itemprop='brand']",
        "p5_shippingRate": ".shipping-rate, .shipping-cost",
        "p6_shippingCountry": ".shipping-country, .shipping-zone",
        "p7_returnDays": ".return-days, .return-window",
        "p8_returnFees": ".return-fees, .return-charge"
    },
        "Review": {
        "r1_container": ".review-snippet, [itemtype*='schema.org/Review']",
        "r2_ratingValue": ".rating-value, [itemprop='ratingValue']",
        "r3_itemName": ".reviewed-item-name, .product-title-review"
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
        "j4_location": ".job-location, .work-location, [itemprop='jobLocation']",
        "j5_salary": ".salary, .compensation-package, [itemprop='baseSalary']"
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
        "k2_itemContainer": ".course-listing, [itemtype*='schema.org/Course']",
        "k3_name": ".course-title, h1, h2, h3",
        "k4_provider": ".course-provider, .instructor, [itemprop='provider']",
        "k5_description": ".course-description, p"
    },
        "Breadcrumb": {
        "b1_item": "nav[aria-label='breadcrumb'] ol li, .breadcrumb li, [class*='breadcrumbs'] li"
    },
};