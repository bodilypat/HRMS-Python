//src/controllers/domUtils.js 

/* Centralized utility for reusable DOM mainipulation across views.
 * Used by employeeView, payrollView, authView 
*/

const domUtils = (() => {
    
    /* ------- Loaders ------- */

    /* Display a full-screen , container - level loading spinner
     * @parm {HTMLElement} [container=document.body] 
    */
    const showLoader = (container = document.body) => {
        if (container.querySelector('.dom-loader')) return // present duplicates
        const loader = document.createElement('div');
        loader.classList.add('dom-loader');
        loader.innerHTML = `
            <div class="dom-loader-overlay">
                <div class="dom-spinner"></div>
            </div>
        `;
        container.appendChild(loader);
    };

    /* Remove loader from DOM.
     * @param {HTMLElement} [container=document.body]
    */
    const hideLoader = (container = document.body) => {
        const loader = container.querySelector('.dom-loader');
        if (loader) loader.remove();
    };

    /* ---- Dispay a temporary alert message.----*/

    /*
     * @param {string} * message - Message text.
     * @param {'info' | 'success' | 'warning' | 'error'} [type='info']
     * @param {number} [duration=300]
     * @param {HTMLElement} [container=document.body]
     */
    const showAlert = (message, type ='info', duration = 3000, container = document.body) => {
        const alert = document.createElement('div');
        alert.className = `dom-alert dom-alert-${type}`;
        alert.textContent = message;

        container.appendChild(alert);
        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => alert.remove(), 500);
        }, duration);
    } ;

    /* --------Modals --------*/

    /* Display a modal dialog 
     * @param {string} title
     * @parm {string} contentHTML
     * @param {Function|null} [onClose=null
    */
    const showModal = (title, contentHTML, onClose = null) => {
        const modal = document.createElement('div');
        modal.classList.add('dom-modal-overlay');
        modal.innerHTML = `
            <div class="dom-modal">
                <div class="dom-modal-header">
                    <h4>${title}</h4>
                    <button class="close-modal-btn" aria-label="Close">&time;</button>
                </div>
                <div class="dom-modal-body">${contentHTML}</div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal events
        modal.querySelector('.close-modal-btn').addEventListener('click', () => closeModal(modal, onClose));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal, onClose);
        });
    };

    /* ------- Close and remove a modal ------- */

    /*
     * @param {HTMLElement} modal
     * @param {Function|null} [onControll] 
    */
    const closeModal = (modal, onClose = null) => {
        modal.classList.add('fade-out');
        modal.remove();
        setTimeout(() => {
            modal.remove();
            if (onClose) onClose();
        }, 250);
    };

    /* ------- Element Builders ------- */

    /*
     * @param {string} text 
     * @param {string} [className]
     * @param {HTMLTableCellElement}
    */
    const createCell = (text, className = '') => {
        const td = document.createElement('td');
        if (className) td.classList.add(className);
        td.textContext = text;
        return td;
    };

    /* -------- Create a reusable button element. -------- */

    /*
     * @param {string} label 
     * @param {string} className
     * @param {Function} onClick 
     * @param {HTMLButtonElement}
     */
    const createButton = (label, className, onClick) => {
        const btn = document.createElement('button');
        btn.className = className;
        btn.textContent = label;
        if (typeof onClick === 'function') btn.addEventListener('click', onClick);
        return btn;
    };

    /* -------- Remoce all child of an element. ------- */

    /*
     * @param {HTMLElement} element
    */
    const clearElement = (element) => {
        if (!element) return;
        while (element.firstChild) element.removeChild(element.firstChild);
    };

    /* -------- Safety inject HTML into an element --------*/
    /*
     * Use only with trust content
     * @param {HTMLElement} element 
     * @param {string} htmlString
     */
    const setHTML = (element, htmlString) => {
        if (!element) return;
        element.innerHTML = '';
        element.insertAdjaceHTML('beforeend', htmlString);
    };

    /* --------Visibility Helpers------- */
    /* Toggle element visibility.
     * @param {HTMLElement} el
     * @param {boolean} show 
    */
    const toggleVisibility = (el, show = true) => {
        if (!el) return;
        el.style.display = show ? '' : 'none';
    };

    /* -------Public API-------- */
    return {
        showLoader,
        hideLoader,
        showAlert,
        showModal,
        closeModal,
        createCell, 
        createButton,
        clearElement,
        setHTML,
        toggleVisibility
    };
})();

export default domUtils;