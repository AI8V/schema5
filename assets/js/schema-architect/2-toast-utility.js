'use strict';

/**
 * @file toast-utility.js
 * @description A centralized, secure, and accessible utility for Bootstrap 5 toasts.
 * @version 3.1.0 - Production Hardened with Anti-Duplicate System
 */

let lastToastMessage = null;
let lastToastTime = 0;
const TOAST_DEBOUNCE = 2000; // 2 seconds

/**
 * SECURELY displays an accessible Bootstrap toast notification.
 * @param {string} message The message to display. It will be treated as plain text.
 * @param {string} [type='info'] Can be 'success', 'danger', 'warning', or 'info'.
 */
function showToast(message, type = 'info') {
    const now = Date.now();
    if (message === lastToastMessage && (now - lastToastTime) < TOAST_DEBOUNCE) {
        return;
    }

    lastToastMessage = message;
    lastToastTime = now;

    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        console.error('Toast container not found.');
        alert(message);
        return;
    }

    let iconClass, toastClass, iconColorClass;

    // --- >> ACCESSIBILITY & UX REFINEMENT << ---
    // Using the modern 'subtle' background with 'emphasis' text for high contrast and consistency.
    switch (type) {
        case 'success':
            iconClass = 'bi-check-circle-fill text-primary';
            toastClass = 'bg-success-subtle border-success-subtle';
            iconColorClass = 'text-success-emphasis';
            break;
        case 'danger':
            iconClass = 'bi-x-octagon-fill text-primary';
            toastClass = 'bg-danger-subtle border-danger-subtle';
            iconColorClass = 'text-danger-emphasis';
            break;
        case 'warning':
            iconClass = 'bi-exclamation-triangle-fill text-primary';
            toastClass = 'bg-warning-subtle border-warning-subtle';
            iconColorClass = 'text-warning-emphasis';
            break;
        default: // 'info'
            iconClass = 'bi-info-circle-fill text-primary';
            toastClass = 'bg-info-subtle border-info-subtle';
            iconColorClass = 'text-info-emphasis';
            break;
    }

    // Create a unique and unpredictable ID
    const toastId = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Build DOM elements programmatically to prevent XSS
    const toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = `toast align-items-center ${toastClass} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    const dFlex = document.createElement('div');
    dFlex.className = 'd-flex';

    const toastBody = document.createElement('div');
    toastBody.className = `toast-body d-flex align-items-center ${iconColorClass}`; // Apply emphasis color to body

    const iconSpan = document.createElement('span');
    iconSpan.className = `bi ${iconClass} me-2`;
    iconSpan.setAttribute('aria-hidden', 'true');

    toastBody.appendChild(iconSpan);
    // Use createTextNode to safely insert the user-provided message
    toastBody.appendChild(document.createTextNode(message));

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close me-2 m-auto';
    closeButton.setAttribute('data-bs-dismiss', 'toast');
    closeButton.setAttribute('aria-label', 'Close');

    dFlex.appendChild(toastBody);
    dFlex.appendChild(closeButton);
    toastEl.appendChild(dFlex);

    toastContainer.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl);
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    toast.show();
}