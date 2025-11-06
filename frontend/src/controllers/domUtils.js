//src/controllers/domUtils.js 

/* Reusable UI helpers for views and controllers */
const domUtils = (() => {
    
    /* LOADER UTILITIES: show a loading spinner overlay inside a container */
    const showLoader = (container = document.body) => {
        if (container.querySelector('.dom-loader')) return; // Prevent duplicates

        const loader = document.createElement('div');
        loader.classList.add('dom-loader');
        loader.innerHTML = `
            <div class="dom-loader-overlay">
                <div class="dom-spinner"></div>
            </div>
            `;
        container.appendChild(loader);
    };

    /* Remove loader from container */
    const hideLoader = (container = document.body) => {
        const loader = container.querySelector('.dom-loader');
        if (loader) loader.remove()
    }
    
    /* ALERT UTILITIES: Display a temporary message */
    const showAlert = (message, type = 'info', duration = 3000, container = document.body) => {
        const alert = document.createElement('div');
        alert.className = `dom-alert dom-alert-${type}`;
        alert.textContent = message;

        container.appendChild(alert);

        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => alert.remove(), 400);
        }, duration);
    };

    /* TOAST UTILITIES: short, non-blocking alert variant */
    const showToast = (message, type = 'info', duration =  2500) => {
        const toast = document.createElement('div');
        toast.className = `dom-toast dom-toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        /* Trigger fade animation */
        requestAnimationFrame(() => toast.classList.add('visible'));

        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        }, duration)
    };

    /* MODAL UTILITIES: Show a modal with content */
    const showModal = (title = '', contentHTML = '', onClose = null) => {
        const modal = document.createElement('div');
        modal.classList.add('dom-modal-overlay');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        modal.innerHTML = ` 
            <div class="dom-modal">
                <div class="dom-modal-header">
                    <h5 class="dom-modal-title">${title}</h5>
                    <button class="close-modal-btn" aria-label="Close">&times;</button>
                </div>
                <div class="dom-modal-body">${contentHTML}</div>
            </div>
        `;
        document.body.appendChild(modal);

        /* Close modal when clicking overlay or close button */
        modal.querySelector('.Close-modal-btn').addEventListener('click', () => closeModal(modal, onClose));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal, onClose);
        });

        /* ESC key closes modal */
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal(modal, onClose);
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);

        return modal;
    };

    /* Close and remove a modal */
    const closeModal = (modal, onClose = null) => {
        if (!modal) return;
        modal.classList.add('closing');
        setTimeout(() => {
            modal.remove();
            if (typeof onClose === 'function') onClose();
        }, 250);
    };

    /* ELEMENT HELPERS: Create a table cell */
    const createCell = (text = '', className = '') => {
        const td = document.createElement('td');
        if (className) td.classList.add(className);
        td.textContent = text;
        return td;
    };

    /* Create a button element */
    const createButton =(label, className = '', onClick = null, attrs = {}) => {
        const btn = document.createElement('button');
        btn.className = className;
        btn.textContext = label;
        if (onClick) btn.addEventListener('click', onClick);

        /* Add custom attributes  */
        Object.entries(attrs).forEach(([key, value]) => {
            btn.setAttribute(key, value);
        });
        return btn;
    };

    /* Remove all children from an element */
    const clearElement = (element) => {
        if (!element) return;
        while (element.firstChild) element.removeChild(element.firstChild);
    };

    /* Safety set HTML content */
    const setHTML = (element, htmlString) => {
        if (!element) return;
        element.innerHTML = '';
        element.insertAdjacentHTML('beforeend', htmlString);
    };

    /* Toggle visibility of an element */
    const toggleVisibility = (el, show = true) => {
        if (!el) return;
        el.style.display = show ? '' : 'none';
    };

    /* EXPORTED API */
    return {
        /* Loaders */
        showLoader,
        hideLoader,

        /* Alert & Toast */
        showAlert,
        showToast,
        /* Modals */
        showModal,
        closeModal,
        /* DOM Helpers */
        createCell,
        createButton,
        clearElement,
        setHTML,
        toggleVisibility,
    };
})();

export default domUtils

