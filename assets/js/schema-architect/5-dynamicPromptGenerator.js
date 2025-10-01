/**
 * @file dynamicPromptGenerator.js
 * @description A standalone module for generating a dynamic and specialized AI prompt.
 * @version 4.1.0 - The Semantic Surgeon (EN)
 * @author Ai8V | Mind & Machine
 *
 * This module implements the "Semantic Surgeon" strategy.
 * It instructs the language model to deconstruct an initial schema structure,
 * intelligently enrich it to address any missing required data, and then
 * rebuild it using the @graph structure—a best practice for defining
 * multiple, independent entities on a single page.
 */

const DynamicPromptGenerator = (function () {

    // ===================================================================
    //  1. The Master Prompt Template v4.1
    // ===================================================================

    /**
     * The definitive, hardened master prompt template.
     * This prompt compels the AI to act as a precise Semantic Surgeon.
     * @type {string}
     */
    const PROMPT_TEMPLATE = `You are a Semantic Surgeon & Data Architect. Your mission is to perform a precision operation to transform a raw, initial JSON-LD code into a final, robust structure that is fully qualified for Rich Results.

I will provide you with three inputs:
1.  \`page.html\`: The original content file.
2.  \`base_schema.jsonld\`: The raw, generated base structure.
3.  \`PRIMARY_ENTITY_TYPE\`: A string variable specifying the chosen primary entity, with a value of **\`{{SCHEMA_TYPE}}\`**.

**Your required task is to follow this strict surgical algorithm step-by-step, without deviation:**

**Phase 1: Deconstruction and Ingestion**
1.  **Full Ingestion Rule:** Examine the \`base_schema.jsonld\` file. Extract the primary entity and all secondary entities found within the \`hasPart\` property. You now have a list of all raw entities.

**Phase 2: Semantic Enrichment & Fortification (The Surgery)**
1.  **"HowTo" Entity Enrichment Procedure (if present):**
    *   Search the raw entity list for an entity of type \`HowTo\`.
    *   If found, iterate through each step (\`HowToStep\`) within the \`step\` array.
    *   For each step, read the content of its \`text\` property.
    *   **Intelligently**, generate a concise and descriptive title (not exceeding 10 words) that summarizes the text content, and add it as a new **\`"name"\`** property to that step. **This process is mandatory to make the entity eligible.**

**Phase 3: Architectural Reconstruction using @graph**
1.  **Construction Rule:** Create a new JSON-LD object. Add the **\`"@graph"\`** property to it, and set its value to an empty array \`[]\`.
2.  **Population Rule:** For each entity (after its fortification in Phase 2), place it as a separate, independent object inside the \`@graph\` array.
3.  **Page Association Rule:** Ensure that **every object** inside the \`@graph\` array (except for \`BreadcrumbList\`) contains a \`mainEntityOfPage\` property that points to the page's URL.

**Phase 4: Final Cleanup**
1.  **Unnecessary Image Removal Rule (CRITICAL RULE):**
    *   Look at all entities inside the \`@graph\` array now.
    *   **Only** if the entity is of type **\`HowTo\`** or **\`BreadcrumbList\`**, you must **delete the \`image\` property** from it entirely.
    *   **Do not touch** the \`image\` property in any other entity type.
2.  **Data Sanitization Rule:**
    *   Go to any existing \`sku\` or \`price\` field and clean its value to be only the actual code or number.
3.  **Mandatory Validity Check:**
    *   Review the final \`@graph\` code and ensure all brackets and commas are syntactically correct.

**Phase 5: Final Output Construction**
1.  Take the original \`page.html\` file.
2.  Insert **only one** \`<script type="application/ld+json">\` block containing the complete \`@graph\` structure you created inside the \`<head>\` tag.

**Required Final Output:**
The full HTML file content with the enhanced, restructured, and Rich Result-eligible schema embedded.`;


    // ===================================================================
    //  2. Public Function
    // ===================================================================

    /**
     * Generates the final prompt based on the selected schema type.
     * @param {string} selectedSchemaType - The schema type selected by the user (e.g., "Product", "Recipe").
     * @returns {string|null} - A string containing the customized prompt, or null if the input is invalid.
     */
    function generatePrompt(selectedSchemaType) {
        // Input validation with more detailed error message
        if (!selectedSchemaType) {
            console.error("Error: Schema type is required but was not provided.");
            return null;
        }
        
        if (typeof selectedSchemaType !== 'string') {
            console.error("Error: Schema type must be a string, but received:", typeof selectedSchemaType);
            return null;
        }
        
        if (selectedSchemaType.trim() === '') {
            console.error("Error: Schema type cannot be an empty string.");
            return null;
        }

        const placeholderRegex = /{{SCHEMA_TYPE}}/g;
        
        const finalPrompt = PROMPT_TEMPLATE.replace(placeholderRegex, selectedSchemaType);

        return finalPrompt;
    }

    // Return the module's public API
    return {
        generate: generatePrompt
    };

})();