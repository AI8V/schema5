'use strict';

/**
 * @file projects.js - Updated Version
 * @description Module for managing project templates with StorageManager integration
 * @version 2.0.0 - Storage Optimized
 */

const initializeProjectHub = (function () {

    // Use centralized storage key
    const PROJECTS_STORAGE_KEY = StorageManager.KEYS.PROJECTS;

    const projectSelector = document.getElementById('projectSelector');
    const newProjectNameInput = document.getElementById('newProjectName');
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    const deleteProjectBtn = document.getElementById('deleteProjectBtn');
    const deleteConfirmModalEl = document.getElementById('deleteConfirmModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const projectNameToDeleteSpan = document.getElementById('projectNameToDelete');
    let deleteModalInstance = null;
    const overwriteConfirmModalEl = document.getElementById('overwriteConfirmModal');
    const confirmOverwriteBtn = document.getElementById('confirmOverwriteBtn');
    const projectNameOverwriteSpan = document.getElementById('projectNameOverwrite');
    let overwriteModalInstance = null;

    /**
     * Returns a definitive and up-to-date array of all savable custom identifier input IDs.
     * This list must be kept in sync with the index.html form.
     */
    function getSavableInputs() {
        return [
            // FAQ
            'customFaqItem', 'customFaqQuestion', 'customFaqAnswer',
            // Product
            'customProductImageSelector', 'customProductImageOverride', 'customProductPrice', 'customProductStrikethroughPrice', 'customProductCurrency', 'customProductSku', 'customProductBrand', 'customProductDescriptionSelector', 'customProductDescriptionOverride',
            'customProductSize', 'customProductSizeSystem', 'customProductSizeGroup',
            'customProductGtin', 'customProductMpn',
            'customProductColor', 'customProductMaterial', 'customProductPattern',
            'customProductGender', 'customProductAgeGroup',
            'customShippingRate', 'customShippingCountry', 'customReturnDays', 'customReturnFees',
            'customHandlingTime', 'customTransitTime', 'customPriceValidUntil',
            // Recipe
            'customRecipeContainer', 'customRecipeName', 'customRecipePrepTime', 'customRecipeCookTime', 'customRecipeIngredients', 'customRecipeInstructions',
            // Review
            'customReviewContainer', 'customReviewRating', 'customReviewItemName', 'customReviewCount', 'customReviewPros', 'customReviewCons',
            // HowTo
            'customHowToContainer', 'customHowToName', 'customHowToStep', 'customHowToText',
            // Breadcrumb
            'customBreadcrumbItem',
            // Event
            'customEventName', 'customEventStartDate', 'customEventLocation', 'customEventOrganizer',
            // Organization
            'customOrgLogo', 'customOrgAddress', 'customOrgTelephone',
            // Video
            'customVideoContainer', 'customVideoName', 'customVideoDesc', 'customVideoThumb', 'customVideoUrl', 'customVideoDate',
            // Local Business
            'customBizPriceRange', 'customBizOpeningHours',

            // --- Job Posting (Definitive, Corrected List) ---
            'customJobContainer',
            'customJobTitle',
            'customJobDatePosted',
            'customJobIdentifier',
            // Location UI
            'customJobLocationType',
            'customJobStreetAddress',
            'customJobAddressLocality',
            'customJobAddressRegion',
            'customJobPostalCode',
            'customJobAddressCountry',
            'customJobApplicantCountry',
            // Salary UI
            'customJobSalarySelector',
            'customJobSalaryValue',
            // Other Details
            'customJobValidThrough',
            'customJobEmploymentType',
            'customJobExperienceSelector',
            'customJobExperienceValue',
            'customJobEducationSelector',
            'customJobEducationValue',
            'customJobDirectApply',
            // ---------------------------------------------------

            // Software App
            'customAppContainer', 'customAppName', 'customAppRating', 'customAppPrice', 'customAppCategory', 'customAppOs',

            // Course
            'customCourseListContainer',
            'customCourseItemContainer',
            'customCourseName',
            'customCourseDescription',
            'customCourseProvider',
            'customCourseCode',
            'customCoursePrice',
            'customCourseCurrency',
            'customCourseCredential',
            'customCoursePrerequisites',
            'customCourseStartDate',
            'customCourseEndDate',
            'customCourseLocation',
            'customCourseMode',
            'customCourseInstructor',
            'customCourseInstanceContainer',
        ];
    }

    /**
     * Initiates the project saving process, checking for existing projects first.
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

        const allProjects = StorageManager.get(PROJECTS_STORAGE_KEY, 'project') || {};

        if (allProjects[trimmedProjectName]) {
            // Project exists, trigger confirmation modal
            projectNameOverwriteSpan.textContent = `"${trimmedProjectName}"`;
            confirmOverwriteBtn.dataset.projectName = trimmedProjectName;
            confirmOverwriteBtn.dataset.projectData = JSON.stringify(newProjectData);
            if (overwriteModalInstance) {
                overwriteModalInstance.show();
            }
        } else {
            // Project is new, save it directly
            performSave(trimmedProjectName, newProjectData);
        }
    }

    /**
     * Performs the actual saving of the project data using StorageManager
     */
    function performSave(name, data) {
        try {
            const allProjects = StorageManager.get(PROJECTS_STORAGE_KEY, 'project') || {};
            allProjects[name] = data;

            const result = StorageManager.set(PROJECTS_STORAGE_KEY, allProjects, 'project');

            populateProjectDropdown();
            projectSelector.value = name;
            newProjectNameInput.value = '';

            if (result.compressed) {
                showToast(`Project "${name}" saved successfully (compressed)`, 'success');
            } else {
                showToast(`Project "${name}" saved successfully`, 'success');
            }

            // Show storage warning if needed
            const stats = StorageManager.getStats();
            if (stats.status === 'warning') {
                showToast(`Storage usage: ${stats.percentFormatted}. Consider cleaning old projects.`, 'info');
            } else if (stats.status === 'critical') {
                showToast(`Storage critical: ${stats.percentFormatted}. Old projects may be auto-cleaned.`, 'warning');
            }

            // Handle cleanup notification
            if (result.cleaned) {
                showToast(`Storage optimized: ${result.cleaned.cache + result.cleaned.projects} items removed`, 'info');
            }

        } catch (error) {
            showToast('Failed to save project: ' + error.message, 'danger');
        }
    }

    /**
     * Loads the selectors from a saved project into the input fields
     */
    function loadProject(projectName) {
        const savableInputs = getSavableInputs();

        if (!projectName) {
            // Clear all fields
            savableInputs.forEach(id => {
                const inputElement = document.getElementById(id);
                if (inputElement) {
                    inputElement.value = '';
                }
            });
            return;
        }

        const allProjects = StorageManager.get(PROJECTS_STORAGE_KEY, 'project') || {};
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
     */
    function triggerDeleteConfirmation(projectName) {
        if (!projectName) {
            showToast('Please select a project to delete.', 'warning');
            return;
        }

        projectNameToDeleteSpan.textContent = `"${projectName}"`;
        confirmDeleteBtn.dataset.projectName = projectName;

        if (deleteModalInstance) {
            deleteModalInstance.show();
        }
    }

    /**
     * Performs the actual deletion after confirmation.
     */
    function performDelete(projectName) {
        try {
            const allProjects = StorageManager.get(PROJECTS_STORAGE_KEY, 'project') || {};
            delete allProjects[projectName];
            StorageManager.set(PROJECTS_STORAGE_KEY, allProjects, 'project');

            populateProjectDropdown();
            loadProject(''); // Reset fields

            showToast(`Project "${projectName}" has been deleted.`, 'success');

        } catch (error) {
            showToast('Failed to delete project: ' + error.message, 'danger');
        }
    }

    /**
     * Populates the project selector dropdown with projects from storage
     */
    function populateProjectDropdown() {
        const allProjects = StorageManager.get(PROJECTS_STORAGE_KEY, 'project') || {};
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

        // Initialize Bootstrap Modal instances
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

        // Confirm delete button logic
        confirmDeleteBtn.addEventListener('click', () => {
            const projectName = confirmDeleteBtn.dataset.projectName;
            if (projectName) {
                performDelete(projectName);
                deleteModalInstance.hide();
                delete confirmDeleteBtn.dataset.projectName;
            }
        });

        // Confirm overwrite button logic
        confirmOverwriteBtn.addEventListener('click', () => {
            const projectName = confirmOverwriteBtn.dataset.projectName;
            const projectDataString = confirmOverwriteBtn.dataset.projectData;

            if (projectName && projectDataString) {
                const projectData = JSON.parse(projectDataString);
                performSave(projectName, projectData);
                overwriteModalInstance.hide();
                delete confirmOverwriteBtn.dataset.projectName;
                delete confirmOverwriteBtn.dataset.projectData;
            }
        });

        populateProjectDropdown();
    }

    return init;
})();