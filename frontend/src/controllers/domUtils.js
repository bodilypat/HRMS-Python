//src/controllers/domUtils.js 

/* Utility module for reusable DOM manipulation functions., used access views (employeeView, payrollView, authView, etc) */

const domUtils = (() => {
    /* Loader functions */
    /* show a full-page loading spinner */
    const showLoader = (container = document.body) => {
        const loader = document.createElement('div');
        loader.classList.add('dom-loader');
        loader.innerHTML = `
            <div class="spinner-overlay">
                <div class="spinner"></div>
            </div>
        `;
        container.appendChild(loader);
    };

    /* Remove the loader from the DOM */
    const hideLoader = (container = document.body) => {
        const loader = container.querySelector('.dom-loader');
        if (loader) loader.remove();
    };

    /* Display a temporary alert massage */
    const showAlert = (message, type='info', duration = 3000, container = document.body) => {
        const alert = document.createElement('div');
        alert.className = `dom-alert-${type}`
        alert.textContent = message;

        container.appendChild(alert);
        setTimeout(() => alert.remove(), duration);
    };
    
    /* Modal Utilities */

    /* Create and display a simple modal dialog */
    const showModal = (title, contentHTML, onClose = null) => {
        const modal = document.createElement('div');
        modal.classList.add('dom-modal-overlay');
        modal.innerHTML = ` 
            <div class="dom-modal">
                <div class="dom-modal-header">
                    <h4>${title}</h4>
                    <button class="close-modal-btn">&times;<button>
                </div>
                <div class="dom-modal-body">${contentHTML}</div>
            </div>
        `;
        document.body.appendChild(modal);

        /* Event handing */
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            closeModal(modal, onClose);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal, onClose);
        });
    };

    /* Close and remove modal */
    const closeModal = (modal, onClose = null) => {
        setTimeout(() => {
            modal.remove();
            if (onClose) onClose();
        }, 200);
    };

    /* DOM Element Helpers */

    /* Create a table cell */
    const createCell = (text, className = '') => {
        const td = document.createElement('td');
        if (className) td.classList.add(className);
        td.textContent = text;
        return td;
    };

    /* Create a button element */
    const createButton = (label, className, onClick) => {
        const btn = document.createElement('button');
        btn.className = className,
        btn.textContent = label;
        btn.addEventListener('click', onClick);
        return btn;
    };

    /* Clear all child nodes of an element */
    const clearElement = (element) => {
        while (element.firstChild) element.removeChild(element.firstChild);
    };

    /* Utility: Inject HTML safety */
    const setHTML = (element, htmlString) => {
        element.innerHTML = '';
        element.insertAdjacentHTML('beforeend', htmlString);
    };

    /* Expose functios */
    
    return {
        showLoader,
        hideLoader,
        showAlert,
        showModal,
        closeModal,
        createCell,
        createButton,
        clearElement,
        setHTML
    };
})();

