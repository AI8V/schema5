'use strict';
/**
@file projects.js
@description Module for managing project templates (custom selector configurations) using localStorage.
*/
const initializeProjectHub = (function() {
const PROJECTS_STORAGE_KEY = 'schemaArchitect_projects';

const projectSelector = document.getElementById('projectSelector');
const newProjectNameInput = document.getElementById('newProjectName');
const saveProjectBtn = document.getElementById('saveProjectBtn');
const deleteProjectBtn = document.getElementById('deleteProjectBtn');
 const deleteConfirmModalEl = document.getElementById('deleteConfirmModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const projectNameToDeleteSpan = document.getElementById('projectNameToDelete');
    let deleteModalInstance = null; // سنقوم بتهيئته لاحقًا
  const overwriteConfirmModalEl = document.getElementById('overwriteConfirmModal');
    const confirmOverwriteBtn = document.getElementById('confirmOverwriteBtn');
    const projectNameOverwriteSpan = document.getElementById('projectNameOverwrite');
    let overwriteModalInstance = null;

/**
 * Safely parses a JSON string, returning a default object if parsing fails.
 * @param {string} jsonString The JSON string to parse.
 * @returns {object} The parsed object or an empty object on error.
 */
function safeJsonParse(jsonString) {
    try {
        // Return parsed object if string is valid, otherwise return empty object
        return jsonString ? JSON.parse(jsonString) : {};
    } catch (error) {
        console.warn("Could not parse JSON from localStorage. Data might be corrupt.", error);
        // On error, return an empty object to prevent the app from crashing.
        return {};
    }
}


/**
 * Returns an array of DOM element IDs for all savable custom identifier inputs.
 * @returns {string[]} Array of input element IDs.
 */
function getSavableInputs() {
    return [
        'customFaqItem', 'customFaqQuestion', 'customFaqAnswer',
        'customProductPrice', 'customProductCurrency', 'customProductSku', 'customProductBrand',
        'customRecipePrepTime', 'customRecipeCookTime', 'customRecipeIngredients',
        'customReviewRating', 'customReviewItemName',
        'customHowToStep', 'customHowToText',
        'customBreadcrumbItem',
        'customEventStartDate', 'customEventLocation', 'customEventOrganizer',
        'customOrgLogo', 'customOrgAddress', 'customOrgTelephone'
    ];
}

    /**
     * Initiates the project saving process, checking for existing projects first.
     * @param {string} projectName - The name for the new project.
     */
    function saveProject(projectName) {
        const trimmedProjectName = projectName ? projectName.trim() : '';
        if (!trimmedProjectName) {
            showToast('Please enter a name for the project.', 'warning');
            return;
        }

        const savableInputs = getSavableInputs();
        const newProjectData = {};
        savableInputs.forEach(id => {
            const inputElement = document.getElementById(id);
            if (inputElement && inputElement.value.trim()) {
                newProjectData[id] = inputElement.value.trim();
            }
        });

        if (Object.keys(newProjectData).length === 0) {
            showToast('No custom identifiers to save. Please fill in at least one field.', 'info');
            return;
        }

        const allProjects = safeJsonParse(localStorage.getItem(PROJECTS_STORAGE_KEY));

        // --- >> NEW MODAL-BASED LOGIC << ---
        if (allProjects[trimmedProjectName]) {
            // Project exists, so trigger the confirmation modal.
            projectNameOverwriteSpan.textContent = `"${trimmedProjectName}"`;
            // Temporarily store the data on the confirm button to be used later
            confirmOverwriteBtn.dataset.projectName = trimmedProjectName;
            confirmOverwriteBtn.dataset.projectData = JSON.stringify(newProjectData);
            if (overwriteModalInstance) {
                overwriteModalInstance.show();
            }
        } else {
            // Project is new, save it directly.
            performSave(trimmedProjectName, newProjectData);
        }
    }

    /**
     * Performs the actual saving of the project data to localStorage.
     * @param {string} name - The name of the project.
     * @param {object} data - The project data to save.
     */
    function performSave(name, data) {
        const allProjects = safeJsonParse(localStorage.getItem(PROJECTS_STORAGE_KEY));
        allProjects[name] = data;
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(allProjects));
        
        populateProjectDropdown();
        projectSelector.value = name;
        newProjectNameInput.value = '';
        showToast(`Project "${name}" was saved successfully.`, 'success');
    }

/**
 * Loads the selectors from a saved project into the input fields,
 * or clears the fields if the default option is selected.
 * @param {string} projectName - The name of the project to load.
 */
function loadProject(projectName) {
    const savableInputs = getSavableInputs();

    // If the project name is empty (user selected the default "-- Select..." option)
    if (!projectName) {
        // Clear all savable input fields
        savableInputs.forEach(id => {
            const inputElement = document.getElementById(id);
            if (inputElement) {
                inputElement.value = '';
            }
        });
        // No toast message is shown here for a smoother UX
        return; 
    }

    // Existing logic for loading a project
    const allProjects = safeJsonParse(localStorage.getItem(PROJECTS_STORAGE_KEY));

    const projectData = allProjects[projectName];

    if (!projectData) {
        showToast('The selected project was not found.', 'danger');
        return;
    }

    savableInputs.forEach(id => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.value = projectData[id] || '';
        }
    });

    showToast(`Loaded identifiers for project "${projectName}".`, 'info');
}

    /**
     * Prepares and shows the confirmation modal before deleting a project.
     * @param {string} projectName - The name of the project to delete.
     */
    function triggerDeleteConfirmation(projectName) {
        if (!projectName) {
            showToast('Please select a project to delete.', 'warning');
            return;
        }
    
        // Update the modal with the correct project name
        projectNameToDeleteSpan.textContent = `"${projectName}"`;
        // Store the project name on the confirm button to use it later
        confirmDeleteBtn.dataset.projectName = projectName;
    
        // Show the modal
        if (deleteModalInstance) {
            deleteModalInstance.show();
        }
    }
    
/**
 * Performs the actual deletion after confirmation.
 * @param {string} projectName - The name of the project to delete.
 */
function performDelete(projectName) {
    const allProjects = safeJsonParse(localStorage.getItem(PROJECTS_STORAGE_KEY));
    delete allProjects[projectName];
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(allProjects));

    populateProjectDropdown();

    // After deleting and repopulating the dropdown,
    // call loadProject with an empty string to reset all input fields to their default state.
    loadProject(''); 

    showToast(`Project "${projectName}" has been deleted.`, 'success');
}

/**
 * Populates the project selector dropdown with projects from localStorage.
 */
function populateProjectDropdown() {
    const allProjects = safeJsonParse(localStorage.getItem(PROJECTS_STORAGE_KEY));

    const projectNames = Object.keys(allProjects);

    // Clear existing options but keep the first one
    projectSelector.innerHTML = '<option selected value="">-- Select a Saved Project --</option>';

    projectNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        projectSelector.appendChild(option);
    });
}

    /**
     * Initializes the project hub by setting up event listeners.
     */
    function init() {
        if (!projectSelector || !deleteConfirmModalEl || !overwriteConfirmModalEl) return;
    
        // Initialize BOTH Bootstrap Modal instances
        deleteModalInstance = new bootstrap.Modal(deleteConfirmModalEl);
        overwriteModalInstance = new bootstrap.Modal(overwriteConfirmModalEl);
    
        saveProjectBtn.addEventListener('click', () => {
            saveProject(newProjectNameInput.value);
        });
    
        deleteProjectBtn.addEventListener('click', () => {
            triggerDeleteConfirmation(projectSelector.value);
        });
    
        projectSelector.addEventListener('change', (e) => {
            loadProject(e.target.value);
        });
    
        // The "confirm delete" button logic
        confirmDeleteBtn.addEventListener('click', () => {
            const projectName = confirmDeleteBtn.dataset.projectName;
            if (projectName) {
                performDelete(projectName);
                deleteModalInstance.hide();
                delete confirmDeleteBtn.dataset.projectName;
            }
        });

        // --- >> NEW EVENT LISTENER FOR OVERWRITE CONFIRMATION << ---
        confirmOverwriteBtn.addEventListener('click', () => {
            const projectName = confirmOverwriteBtn.dataset.projectName;
            const projectDataString = confirmOverwriteBtn.dataset.projectData;

            if (projectName && projectDataString) {
                const projectData = JSON.parse(projectDataString);
                performSave(projectName, projectData);
                overwriteModalInstance.hide();
                // Clean up the dataset attributes
                delete confirmOverwriteBtn.dataset.projectName;
                delete confirmOverwriteBtn.dataset.projectData;
            }
        });
        // --- >> END OF NEW LOGIC << ---
    
        populateProjectDropdown();
    }

// Return a reference to the init function to be called from the main script
return init;
})();