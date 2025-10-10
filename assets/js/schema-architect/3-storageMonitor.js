/**
 * @file storageMonitor.js
 * @description UI component for displaying storage usage statistics
 * @version 1.0.0
 */

'use strict';
const StorageMonitor = (function () {
    let monitorElement = null;
    let updateInterval = null;
    let hardResetModalInstance = null;

    /**
     * Creates the storage monitor UI element
     */
    function createMonitorUI() {
        const monitor = document.createElement('div');
        monitor.id = 'storage-monitor';
        monitor.className = 'position-fixed bottom-0 end-0 m-3';
        monitor.style.cssText = `
            z-index: 1050;
            max-width: 300px;
            display: none;
        `;

        monitor.innerHTML = `
            <div class="card shadow-lg border-0" style="backdrop-filter: blur(10px); background: rgba(var(--bs-body-bg-rgb), 0.95);">
                <div class="card-header d-flex justify-content-between align-items-center py-2">
                    <small class="fw-bold text-success-emphasis" id="storage-monitor-label">
                    <span class="bi bi-hdd-stack text-primary me-2" aria-hidden="true"></span>Storage Usage
                    </small>
                    <button type="button" class="btn-close btn-close-sm" id="storage-monitor-close" aria-label="Close Storage Monitor"></button>
                </div>
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="small">Used:</span>
                        <strong id="storage-size" class="small">0 KB</strong>
                    </div>
                    <div class="progress" style="height: 8px;">
                        <div id="storage-progress" 
                             class="progress-bar" 
                             role="progressbar" 
                             style="width: 0%"
                             aria-valuenow="0" 
                             aria-valuemin="0" 
                             aria-valuemax="100"
                             aria-labelledby="storage-monitor-label">
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <small class="text-muted" id="storage-status">OK</small>
                        <small class="text-muted" id="storage-percent">0%</small>
                    </div>
                    <button type="button" class="btn btn-sm btn-danger-subtle text-danger-emphasis border-danger-subtle w-100 mt-2" id="storage-cleanup-btn">
                        <span class="bi bi-trash me-1" aria-hidden="true"></span>Clean Old Data
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(monitor);
        return monitor;
    }

    /**
     * Updates the monitor UI with current stats
     */
    function updateMonitorUI() {
        if (!monitorElement) return;

        const stats = StorageManager.getStats();
        const progressBar = document.getElementById('storage-progress');
        const sizeDisplay = document.getElementById('storage-size');
        const statusDisplay = document.getElementById('storage-status');
        const percentDisplay = document.getElementById('storage-percent');

        // Update size
        sizeDisplay.textContent = stats.sizeMB > 1
            ? `${stats.sizeMB} MB`
            : `${stats.sizeKB} KB`;

        // Update progress bar
        const percent = Math.min(100, Math.round(stats.percent * 100));
        progressBar.style.width = `${percent}%`;
        progressBar.setAttribute('aria-valuenow', percent);

        // Update color based on status
        progressBar.className = 'progress-bar';
        if (stats.status === 'critical') {
            progressBar.classList.add('bg-danger');
            statusDisplay.textContent = 'Critical!';
            statusDisplay.className = 'small text-danger fw-bold';
        } else if (stats.status === 'warning') {
            progressBar.classList.add('bg-warning');
            statusDisplay.textContent = 'Warning';
            statusDisplay.className = 'small text-warning fw-bold';
        } else {
            progressBar.classList.add('bg-success');
            statusDisplay.textContent = 'OK';
            statusDisplay.className = 'small text-success';
        }

        percentDisplay.textContent = stats.percentFormatted;
    }

    function show() {
        if (!monitorElement) {
            monitorElement = createMonitorUI();
            document.getElementById('storage-monitor-close').addEventListener('click', hide);
            document.getElementById('storage-cleanup-btn').addEventListener('click', performCleanup);
        }
        monitorElement.style.display = 'block';
        updateMonitorUI();
        if (!updateInterval) {
            updateInterval = setInterval(updateMonitorUI, 5000);
        }
    }

    /**
     * Hides the monitor
     */
    function hide() {
        if (monitorElement) {
            monitorElement.style.display = 'none';
        }

        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }

    function performCleanup() {
        const result = StorageManager.cleanup();
        const totalCleaned = result.cache + result.projects;

        if (totalCleaned > 0) {
            showToast(`Cleaned ${totalCleaned} items.`, 'success');
            updateMonitorUI();
        } else {
            const stats = StorageManager.getStats();

            if (stats.status === 'critical') {
                showToast(
                    'Storage critically full but no old items found. Consider manual cleanup.',
                    'warning'
                );
            } else {
                showToast('Storage is healthy. No old items to remove.', 'info');
            }
        }
    }

    function executeHardReset() {
        const confirmInput = document.getElementById('hardResetConfirmInput');
        if (confirmInput.value !== 'DELETE EVERYTHING') {
            showToast('Please type the confirmation text correctly', 'warning');
            return;
        }
        try {
            const keysToDelete = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('schemaArchitect_')) {
                    keysToDelete.push(key);
                }
            }
            keysToDelete.forEach(key => localStorage.removeItem(key));
            const cleanedCount = keysToDelete.length;
            showToast(cleanedCount > 0 ? `Hard reset complete. ${cleanedCount} items removed.` : 'Hard reset attempted, no items found.', cleanedCount > 0 ? 'success' : 'warning');
            if (hardResetModalInstance) hardResetModalInstance.hide();
            updateMonitorUI(); // استدعاء داخلي صحيح
        } catch (error) {
            showToast('Hard reset failed: ' + error.message, 'danger');
        }
    }

    /**
     * Auto-shows monitor when storage is critical
     */
    function autoShowOnWarning() {
        const stats = StorageManager.getStats();

        if (stats.status === 'warning' || stats.status === 'critical') {
            show();
        }
    }

    /**
     * Initializes the storage monitor
     */
    function init() {
        const hardResetModalEl = document.getElementById('hardResetConfirmModal');
        if (hardResetModalEl) {
            hardResetModalInstance = new bootstrap.Modal(hardResetModalEl);
            document.getElementById('confirmHardResetBtn')?.addEventListener('click', executeHardReset);
        }
        autoShowOnWarning();
        setInterval(autoShowOnWarning, 30000);
    }

    return { show, hide, init, update: updateMonitorUI };
})();