'use strict';

/**
 * @file entities.js - Updated Version
 * @description Module for the Entity Management Platform (EMP) with StorageManager integration
 * @version 4.0.0 - Storage Optimized
 */

var getEntity; // Declare globally to be accessible by schema-architect.js

const initializeEmp = (function() {

    // Use centralized storage keys
    const EMP_STORAGE_KEY = StorageManager.KEYS.EMP;
    let empModalInstance = null;

    // --- DOM Elements ---
    const empBtn = document.getElementById('empBtn');
    const empModalEl = document.getElementById('empModal');
    const saveEmpBtn = document.getElementById('saveEmpBtn');
    const addEmpFieldBtn = document.getElementById('addEmpFieldBtn');
    const empFormContainer = document.getElementById('emp-form-container');

    const predefinedEmpFields = {
        organizationName: 'Official Organization Name',
        logo: 'Official Logo URL',
        telephone: 'Main Telephone Number',
        mainAuthor: 'Default Author for Articles/Reviews',
    };

    /**
     * Retrieves all saved entity data using StorageManager
     */
    function getSavedData() {
        return StorageManager.get(EMP_STORAGE_KEY) || {};
    }

    /**
     * SECURELY Renders the form inside the EMP modal.
     */
    function renderEmpForm() {
        empFormContainer.innerHTML = ''; // Clear previous form
        const savedData = getSavedData();
        const allFields = { ...predefinedEmpFields };
        for (const key in savedData) {
            if (!allFields[key]) allFields[key] = key;
        }

        for (const key in allFields) {
            const labelText = allFields[key];
            const value = savedData[key] || '';
            const isPredefined = !!predefinedEmpFields[key];

            const group = document.createElement('div');
            group.className = 'input-group mb-2';
            group.dataset.fieldKey = key;

            const label = document.createElement('label');
            label.className = 'input-group-text';
            label.style.width = '300px';
            label.textContent = labelText;

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control';
            input.value = value;
            input.placeholder = isPredefined ? `Value for ${labelText}...` : 'Field value...';

            group.appendChild(label);
            group.appendChild(input);

            if (!isPredefined) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-outline-danger btn-sm emp-delete-field-btn';
                deleteBtn.type = 'button';
                deleteBtn.title = 'Delete this custom field';
                deleteBtn.innerHTML = '<span class="bi bi-trash" aria-hidden="true"></span>';
                group.appendChild(deleteBtn);
            }
            empFormContainer.appendChild(group);
        }

        empFormContainer.querySelectorAll('.emp-delete-field-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const group = e.currentTarget.closest('.input-group');
                const fieldKey = group.dataset.fieldKey;
                const currentData = getSavedData();
                delete currentData[fieldKey];
                
                // Use StorageManager
                try {
                    StorageManager.set(EMP_STORAGE_KEY, currentData);
                    renderEmpForm();
                    showToast(`Field "${fieldKey}" has been deleted.`, 'info');
                } catch (error) {
                    showToast('Failed to delete field: ' + error.message, 'danger');
                }
            });
        });
    }

    /**
     * Saves all data from the EMP form using StorageManager
     */
    function saveEmpData() {
        const newData = {};
        let isValid = true;
        const seenKeys = new Set(Object.keys(predefinedEmpFields));

        empFormContainer.querySelectorAll('.input-group').forEach(group => {
            const valueInput = group.querySelector('input');
            if (group.dataset.isNew) {
                const keyInput = group.querySelectorAll('input')[0];
                const key = keyInput.value.trim();
                const value = valueInput.value.trim();
                keyInput.classList.remove('is-invalid');
                valueInput.classList.remove('is-invalid');
                if (!key && !value) return;
                if (!key || !value || !/^[a-zA-Z0-9_]+$/.test(key) || seenKeys.has(key)) {
                    showToast(`The key "${key || '(empty)'}" is invalid or already in use.`, 'danger');
                    if (!key || !/^[a-zA-Z0-9_]+$/.test(key) || seenKeys.has(key)) keyInput.classList.add('is-invalid');
                    if (!value) valueInput.classList.add('is-invalid');
                    isValid = false;
                } else {
                    newData[key] = value;
                    seenKeys.add(key);
                }
            } else {
                const key = group.dataset.fieldKey;
                if (key && valueInput && valueInput.value.trim()) {
                    newData[key] = valueInput.value.trim();
                }
            }
        });

        if (!isValid) {
            showToast('Please correct the errors before saving.', 'warning');
            return;
        }
        
        // Use StorageManager with error handling
        try {
            const result = StorageManager.set(EMP_STORAGE_KEY, newData);
            
            if (result.compressed) {
                showToast('Entity data saved successfully (compressed)', 'success');
            } else {
                showToast('Entity data saved successfully', 'success');
            }
            
            if (empModalInstance) empModalInstance.hide();
            
            // Show storage stats if getting full
            const stats = StorageManager.getStats();
            if (stats.status === 'warning') {
                showToast(`Storage usage: ${stats.percentFormatted}`, 'info');
            }
            
        } catch (error) {
            showToast('Failed to save: ' + error.message, 'danger');
        }
    }

    /**
     * SECURELY adds a new, empty field row to the form UI.
     */
    function addCustomEmpField() {
        const group = document.createElement('div');
        group.className = 'input-group mb-2';
        group.dataset.isNew = 'true';

        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.className = 'form-control';
        keyInput.style.flex = '0.5 1 200px';
        keyInput.placeholder = 'Key (e.g., ceoName)';

        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.className = 'form-control';
        valueInput.style.flex = '1 1 300px';
        valueInput.placeholder = 'Value...';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-outline-danger btn-sm emp-delete-field-btn';
        deleteBtn.type = 'button';
        deleteBtn.title = 'Remove this field';
        deleteBtn.innerHTML = '<span class="bi bi-trash" aria-hidden="true"></span>';
        deleteBtn.addEventListener('click', () => group.remove());

        group.appendChild(keyInput);
        group.appendChild(valueInput);
        group.appendChild(deleteBtn);
        empFormContainer.appendChild(group);
        keyInput.focus();
    }

    /**
     * Main initialization function.
     */
    function init() {
        if (!empBtn || !empModalEl) return;
        empModalInstance = new bootstrap.Modal(empModalEl);
        empBtn.addEventListener('click', () => empModalInstance.show());
        empModalEl.addEventListener('show.bs.modal', renderEmpForm);
        saveEmpBtn.addEventListener('click', saveEmpData);
        addEmpFieldBtn.addEventListener('click', addCustomEmpField);
    }
   
    /**
     * Globally accessible and SAFE function to retrieve a single entity value.
     */
    getEntity = function(key) {
        const data = getSavedData();
        return data[key] || null;
    };

    init();
    return init;
})();