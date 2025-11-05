//src/main.js 

/* HRMS Application Entry Point, Responsible for initializing views, controllers and global behaviors */
import domUtils from './controllers/domUtils';
import employeeController from './controllers/employeeController.js';
import authController from './controllers/authController.js';
import departmentController from './controllers/departmentController.js';
import payrollController from './controllers/payrollController.js';
import attendanceController from './controllers/attendanceController.js';
import { getToken } from './utils/localStorage.js';
import { APP_ROUTES } from './utils/contains.js';

const App = (() => {
    
    /* Bootstrap application.
     * Called once when the DOM is ready.
     */
    const init = async () => {
        console.log('%c HRMS Application Bootstrapping');
        
        domUtils.showLoader(document.body);

        try {
            await _checkAuth();
            _initRouter();
            _loadIntialView();
        } catch (error) {
            console.error('App initialization failed:', error);
            domUtils.showAlert('Failed to initialize application.', 'error');
        } finally {
            domUtils.hideLoader(document.body);
        }
    };

    /* Authentication 
     * Check authentication and load the appropriate screen. 
    */
   const _checkAuth = async () => {
        const token = getToken();
        if (!token) {
            console.log('No token found, loading login screen...');
            authController.init();
            throw new Error('User not authenticated');
        }
        console.log('Authenticated user detected.')
   };

   /* Router
    * Handle module switching
    */
   const _initRouter = () => {
        window.addEventListener('hashchange', _handleRouteChange);
   };

   const _handleRouteChange = () => {
        const route = location.hash.replace('#', '') || 'dashboard';
        console.log(`Navigating to route: ${route}`);
        _renderRoute(route);
   };

   const _renderRoute = (route) => {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return console.warn('Missing #mainContent container');

        domUtils.clearElement(mainContent);
        domUtils.showLoader(mainContent);

        switch (route) {
            case APP_ROUTES.EMPLOYEES:
                employeeController.init();
                break;
            case APP_ROUTES.PAYROLL:
                payrollController.init();
                break;
            case APP_ROUTES.ATTENDANCE:
                attendanceController.init();
                break;
            case APP_ROUTES.DEPARTMENTS:
                departmentController.init();
                break;
            default:
                _renderDashboard();
        }
        domUtils.hideLoader(mainContent);
    };

    /* Renders a dashboard summary  */
    const _renderDashboard = () => {
        domUtils.setHTML(
            mainContent,
            `
                <div class="dashboard">
                    <h2>Welcome to HR Management System</h2>
                    <p>Select a module from the sidebar to begin managing your HR data.</p>
                    <div class="dashboard-summary">
                        <button id="goEmployees" class="btn primary">Manage Employees</button>
                        <button id="goPayroll" class="btn secondary">View Payroll</button>
                    </div>
                </div>
            `
        );

        document.getElementById('goEmployees')?.addEventListener('click', () => (location.hash = APP_ROUTES.EMPLOYEES));
        document.getElementById('goPayroll')?.addEventListener('click', () => (location.hash = APP_ROUTES.PAYROLL));
    };

    /* Start Application 
     * Load initial route or dashboard 
    */
    const  _loadIntialView = () => {
        const initialRoute = location.hash.replace('#', '') || 'dashboard';
        _renderRoute(initialRoute);
    };

    /* Public API */
    return {
        init
    };
})();

/* Lanch Application */
document.addEventListener('DomContentLoaded', App.init);

export default App;
