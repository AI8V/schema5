'use strict';

/**
 * @file entities.js - Enhanced Entity Management Platform
 * @description Complete Organization Schema Support with Meta-Intelligence Integration
 * @version 6.0.0 - Google Documentation Compliant
 * @author Ai8V | Mind & Machine
 */

var getEntity; // Global accessor

const initializeEmp = (function () {

    const EMP_STORAGE_KEY = StorageManager.KEYS.EMP;
    let empModalInstance = null;

    // DOM Elements
    const empBtn = document.getElementById('empBtn');
    const empModalEl = document.getElementById('empModal');
    const saveEmpBtn = document.getElementById('saveEmpBtn');
    const addEmpFieldBtn = document.getElementById('addEmpFieldBtn');
    const empFormContainer = document.getElementById('emp-form-container');

    // ===================================================================
    //  ENHANCED: Structured Field Definitions
    // ===================================================================

    const FIELD_CATEGORIES = {
        // Core Organization Fields (Always Present)
        core: {
            organizationName: {
                label: 'Organization Name',
                type: 'text',
                required: true,
                placeholder: 'ex: Ai8V Technologies Inc.',
                validation: (val) => val.length >= 2 && val.length <= 100,
                errorMsg: 'Organization name must be 2-100 characters'
            },
            logo: {
                label: 'Official Logo URL',
                type: 'url',
                required: false,
                placeholder: 'https://example.com/logo.png',
                validation: (val) => !val || /^https?:\/\/.+\.(jpg|jpeg|png|svg|webp)$/i.test(val),
                errorMsg: 'Must be a valid image URL (jpg, png, svg, webp)'
            },
            url: {
                label: 'Official Website URL',
                type: 'url',
                required: false,
                placeholder: 'https://example.com',
                validation: (val) => !val || /^https?:\/\/.+/i.test(val),
                errorMsg: 'Must be a valid URL'
            },
            telephone: {
                label: 'Main Telephone Number',
                type: 'tel',
                required: false,
                placeholder: '+1-800-555-0199',
                validation: (val) => !val || /^[\d\s\-\+\(\)]+$/.test(val),
                errorMsg: 'Invalid phone number format'
            },
            email: {
                label: 'Contact Email',
                type: 'email',
                required: false,
                placeholder: 'contact@example.com',
                validation: (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
                errorMsg: 'Invalid email format'
            },
            mainAuthor: {
                label: 'Default Author',
                type: 'text',
                required: false,
                placeholder: 'John Doe'
            }
        },

        // Postal Address (Structured)
        address: {
            streetAddress: {
                label: 'Street Address',
                type: 'text',
                placeholder: '123 Innovation Drive'
            },
            addressLocality: {
                label: 'City',
                type: 'text',
                placeholder: 'San Francisco'
            },
            addressRegion: {
                label: 'State/Region',
                type: 'text',
                placeholder: 'CA'
            },
            postalCode: {
                label: 'Postal/ZIP Code',
                type: 'text',
                placeholder: '94103'
            },
            addressCountry: {
                label: 'Country',
                type: 'text',
                placeholder: 'US'
            }
        },

        // Social Media Links (sameAs)
        social: {
            facebook: {
                label: 'Facebook Page',
                type: 'url',
                placeholder: 'https://facebook.com/yourpage',
                validation: (val) => !val || /facebook\.com/.test(val),
                errorMsg: 'Must be a valid Facebook URL'
            },
            twitter: {
                label: 'Twitter/X Profile',
                type: 'url',
                placeholder: 'https://twitter.com/yourhandle',
                validation: (val) => !val || /(twitter|x)\.com/.test(val),
                errorMsg: 'Must be a valid Twitter/X URL'
            },
            linkedin: {
                label: 'LinkedIn Page',
                type: 'url',
                placeholder: 'https://linkedin.com/company/yourcompany',
                validation: (val) => !val || /linkedin\.com/.test(val),
                errorMsg: 'Must be a valid LinkedIn URL'
            },
            instagram: {
                label: 'Instagram Profile',
                type: 'url',
                placeholder: 'https://instagram.com/yourprofile',
                validation: (val) => !val || /instagram\.com/.test(val),
                errorMsg: 'Must be a valid Instagram URL'
            },
            youtube: {
                label: 'YouTube Channel',
                type: 'url',
                placeholder: 'https://youtube.com/@yourchannel',
                validation: (val) => !val || /youtube\.com/.test(val),
                errorMsg: 'Must be a valid YouTube URL'
            }
        }
    };

    // ===================================================================
    //  DATA MANAGEMENT
    // ===================================================================

    function getSavedData() {
        return StorageManager.get(EMP_STORAGE_KEY) || {};
    }

    function saveData(data) {
        try {
            StorageManager.set(EMP_STORAGE_KEY, data);
            return true;
        } catch (error) {
            console.error('EMP Save Error:', error);
            return false;
        }
    }

    // ===================================================================
    //  VALIDATION ENGINE
    // ===================================================================

    function validateField(fieldKey, value, fieldDef) {
        if (!value || !value.trim()) {
            return { valid: !fieldDef.required, error: fieldDef.required ? 'This field is required' : null };
        }

        if (fieldDef.validation && !fieldDef.validation(value)) {
            return { valid: false, error: fieldDef.errorMsg || 'Invalid value' };
        }

        return { valid: true, error: null };
    }

    // ===================================================================
    //  UI RENDERING ENGINE
    // ===================================================================

    function renderEmpForm() {
        empFormContainer.innerHTML = '';
        const savedData = getSavedData();

        // 1. Core Organization Fields
        renderFieldSection('Core Organization Information', FIELD_CATEGORIES.core, savedData);

        // 2. Address Section
        renderAddressSection(savedData);

        // 3. Social Media Section
        renderFieldSection('Social Media Links (sameAs)', FIELD_CATEGORIES.social, savedData);

        // 4. Loyalty Program Section
        renderLoyaltyProgram(savedData);

        // 5. Custom Fields
        renderCustomFields(savedData);

        // 6. Add Custom Field Button
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-outline-primary btn-sm mt-3';
        addBtn.id = 'addEmpFieldBtn';
        addBtn.type = 'button';
        addBtn.innerHTML = '<span class="bi bi-plus-circle-fill me-2"></span>Add Custom Field';
        addBtn.addEventListener('click', addCustomEmpField);
        empFormContainer.appendChild(addBtn);
    }

    function renderFieldSection(sectionTitle, fields, savedData) {
        const section = document.createElement('div');
        section.className = 'mb-4';
        
        const heading = document.createElement('h5');
        heading.className = 'text-success-emphasis mb-3 border-bottom pb-2';
        heading.innerHTML = `<span class="bi bi-building-fill me-2 text-primary"></span>${sectionTitle}`;
        section.appendChild(heading);

        for (const [key, fieldDef] of Object.entries(fields)) {
            const fieldGroup = createFieldInput(key, fieldDef, savedData[key] || '');
            section.appendChild(fieldGroup);
        }

        empFormContainer.appendChild(section);
    }

    function createFieldInput(key, fieldDef, value) {
        const group = document.createElement('div');
        group.className = 'input-group mb-2';
        group.dataset.fieldKey = key;
        group.dataset.fieldCategory = 'predefined';

        const label = document.createElement('label');
        label.className = 'input-group-text';
        label.style.width = '200px';
        label.textContent = fieldDef.label;
        if (fieldDef.required) {
            const asterisk = document.createElement('span');
            asterisk.className = 'text-danger ms-1';
            asterisk.textContent = '*';
            label.appendChild(asterisk);
        }

        const input = document.createElement('input');
        input.type = fieldDef.type || 'text';
        input.className = 'form-control';
        input.value = value;
        input.placeholder = fieldDef.placeholder || '';
        input.dataset.fieldKey = key;

        // Real-time validation
        if (fieldDef.validation) {
            input.addEventListener('blur', () => {
                const validation = validateField(key, input.value, fieldDef);
                if (!validation.valid) {
                    input.classList.add('is-invalid');
                    showValidationError(input, validation.error);
                } else {
                    input.classList.remove('is-invalid');
                    removeValidationError(input);
                }
            });
        }

        group.appendChild(label);
        group.appendChild(input);

        return group;
    }

    function renderAddressSection(savedData) {
        const section = document.createElement('div');
        section.className = 'mb-4';
        
        const heading = document.createElement('h5');
        heading.className = 'text-success-emphasis mb-3 border-bottom pb-2';
        heading.innerHTML = '<span class="bi bi-geo-alt-fill me-2 text-primary"></span>Postal Address (PostalAddress)';
        section.appendChild(heading);

        const alert = document.createElement('div');
        alert.className = 'alert alert-info alert-sm mb-3';
        alert.innerHTML = '<span class="bi bi-info-circle-fill me-2 text-primary"></span><small><strong>Google Requirement:</strong> Structured address improves local SEO and Knowledge Graph accuracy.</small>';
        section.appendChild(alert);

        for (const [key, fieldDef] of Object.entries(FIELD_CATEGORIES.address)) {
            const fieldGroup = createFieldInput(key, fieldDef, savedData[key] || '');
            section.appendChild(fieldGroup);
        }

        empFormContainer.appendChild(section);
    }

    function renderLoyaltyProgram(savedData) {
        const loyaltyTemplate = document.getElementById('loyaltyProgramTemplate');
        if (!loyaltyTemplate) return;

        const section = loyaltyTemplate.content.cloneNode(true);
        empFormContainer.appendChild(section);

        const programNameInput = empFormContainer.querySelector('#empLoyaltyProgramName');
        const tiersContainer = empFormContainer.querySelector('#empTiersContainer');

        if (savedData.loyaltyProgram) {
            programNameInput.value = savedData.loyaltyProgram.name || '';
            savedData.loyaltyProgram.tiers?.forEach(tier => {
                addTierRow(tiersContainer, tier.name, tier.id);
            });
        }

        empFormContainer.querySelector('#addEmpTierBtn').addEventListener('click', () => addTierRow(tiersContainer));
    }

    function addTierRow(container, name = '', id = '') {
        const tierTemplate = document.getElementById('tierTemplate');
        if (!tierTemplate || !container) return;

        const clone = tierTemplate.content.cloneNode(true);
        clone.querySelector('.tier-name').value = name;
        clone.querySelector('.tier-id').value = id;

        clone.querySelector('.remove-tier-btn').addEventListener('click', (e) => {
            e.target.closest('.tier-row').remove();
        });
        
        container.appendChild(clone);
    }

    function renderCustomFields(savedData) {
        const customKeys = Object.keys(savedData).filter(key => 
            !getAllPredefinedKeys().includes(key) && key !== 'loyaltyProgram'
        );

        if (customKeys.length === 0) return;

        const section = document.createElement('div');
        section.className = 'mb-4';
        
        const heading = document.createElement('h5');
        heading.className = 'text-success-emphasis mb-3 border-bottom pb-2';
        heading.innerHTML = '<span class="bi bi-gear-fill me-2 text-primary"></span>Custom Fields';
        section.appendChild(heading);

        customKeys.forEach(key => {
            const group = createCustomFieldGroup(key, savedData[key]);
            section.appendChild(group);
        });

        empFormContainer.appendChild(section);
    }

    function createCustomFieldGroup(key, value) {
        const group = document.createElement('div');
        group.className = 'input-group mb-2';
        group.dataset.fieldKey = key;
        group.dataset.fieldCategory = 'custom';

        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.className = 'form-control';
        keyInput.style.flex = '0 0 200px';
        keyInput.value = key;
        keyInput.placeholder = 'Field name...';
        keyInput.readOnly = true;

        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.className = 'form-control';
        valueInput.value = value;
        valueInput.placeholder = 'Value...';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-outline-danger btn-sm';
        deleteBtn.type = 'button';
        deleteBtn.innerHTML = '<span class="bi bi-trash"></span>';
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Delete custom field "${key}"?`)) {
                group.remove();
            }
        });

        group.appendChild(keyInput);
        group.appendChild(valueInput);
        group.appendChild(deleteBtn);

        return group;
    }

    function addCustomEmpField() {
        const group = document.createElement('div');
        group.className = 'input-group mb-2';
        group.dataset.isNew = 'true';

        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.className = 'form-control';
        keyInput.style.flex = '0 0 200px';
        keyInput.placeholder = 'Key (e.g., foundingYear)';

        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.className = 'form-control';
        valueInput.placeholder = 'Value...';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-outline-danger btn-sm';
        deleteBtn.type = 'button';
        deleteBtn.innerHTML = '<span class="bi bi-trash"></span>';
        deleteBtn.addEventListener('click', () => group.remove());

        group.appendChild(keyInput);
        group.appendChild(valueInput);
        group.appendChild(deleteBtn);

        const loyaltySection = empFormContainer.querySelector('.border-top');
        if (loyaltySection) {
            empFormContainer.insertBefore(group, loyaltySection);
        } else {
            empFormContainer.appendChild(group);
        }
        
        keyInput.focus();
    }

    function getAllPredefinedKeys() {
        return [
            ...Object.keys(FIELD_CATEGORIES.core),
            ...Object.keys(FIELD_CATEGORIES.address),
            ...Object.keys(FIELD_CATEGORIES.social)
        ];
    }

    // ===================================================================
    //  VALIDATION HELPERS
    // ===================================================================

    function showValidationError(input, message) {
        removeValidationError(input);
        const error = document.createElement('div');
        error.className = 'invalid-feedback';
        error.textContent = message;
        input.parentNode.appendChild(error);
    }

    function removeValidationError(input) {
        const error = input.parentNode.querySelector('.invalid-feedback');
        if (error) error.remove();
    }

    // ===================================================================
    //  SAVE HANDLER
    // ===================================================================

    function saveEmpData() {
        const newData = {};
        let isValid = true;
        const seenKeys = new Set();

        // Validate and collect all fields
        empFormContainer.querySelectorAll('.input-group').forEach(group => {
            // Skip tier groups
            if (group.closest('#empTiersContainer')) return;

            const isNew = group.dataset.isNew === 'true';
            const fieldKey = group.dataset.fieldKey;

            if (isNew) {
                // New custom field
                const keyInput = group.querySelectorAll('input')[0];
                const valueInput = group.querySelectorAll('input')[1];
                const key = keyInput.value.trim();
                const value = valueInput.value.trim();

                keyInput.classList.remove('is-invalid');
                
                if (!key && !value) return;
                
                if (!key || !/^[a-zA-Z0-9_]+$/.test(key) || seenKeys.has(key)) {
                    showToast(`Invalid or duplicate key: "${key}"`, 'danger');
                    keyInput.classList.add('is-invalid');
                    isValid = false;
                    return;
                }

                newData[key] = value;
                seenKeys.add(key);

            } else if (fieldKey) {
                // Predefined field
                const input = group.querySelector('input[data-field-key]');
                if (!input) return;

                const value = input.value.trim();
                
                // Find field definition
                let fieldDef = null;
                for (const category of Object.values(FIELD_CATEGORIES)) {
                    if (category[fieldKey]) {
                        fieldDef = category[fieldKey];
                        break;
                    }
                }

                if (fieldDef) {
                    const validation = validateField(fieldKey, value, fieldDef);
                    if (!validation.valid) {
                        input.classList.add('is-invalid');
                        showValidationError(input, validation.error);
                        isValid = false;
                        return;
                    }
                    input.classList.remove('is-invalid');
                }

                if (value) {
                    newData[fieldKey] = value;
                }
                seenKeys.add(fieldKey);
            }
        });

        if (!isValid) {
            showToast('Please correct the errors before saving.', 'warning');
            return;
        }

        // Save Loyalty Program
        const programNameInput = empFormContainer.querySelector('#empLoyaltyProgramName');
        if (programNameInput && programNameInput.value.trim()) {
            newData.loyaltyProgram = {
                name: programNameInput.value.trim(),
                tiers: []
            };
            empFormContainer.querySelectorAll('#empTiersContainer .tier-row').forEach(row => {
                const tierName = row.querySelector('.tier-name').value.trim();
                const tierId = row.querySelector('.tier-id').value.trim();
                if (tierName && tierId) {
                    newData.loyaltyProgram.tiers.push({ name: tierName, id: tierId });
                }
            });
        }

        // Save to storage
        if (saveData(newData)) {
            showToast('✅ Entity data saved successfully', 'success');
            if (empModalInstance) empModalInstance.hide();
        } else {
            showToast('❌ Failed to save data', 'danger');
        }
    }

    // ===================================================================
    //  GLOBAL ACCESSOR
    // ===================================================================

    getEntity = function (key) {
        const data = getSavedData();
        return data[key] || null;
    };

    // ===================================================================
    //  INITIALIZATION
    // ===================================================================

    function init() {
        if (!empBtn || !empModalEl) return;

        empModalInstance = new bootstrap.Modal(empModalEl);
        empBtn.addEventListener('click', () => empModalInstance.show());
        empModalEl.addEventListener('show.bs.modal', renderEmpForm);
        saveEmpBtn.addEventListener('click', saveEmpData);
    }

    init();
    return init;
})();