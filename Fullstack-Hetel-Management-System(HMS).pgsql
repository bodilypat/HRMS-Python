Fullstack-Hotel-Management-System/
├── Frontend (HTML, CSS, JavaScript, React)    
│   ├── public/                               
│   │   └── index.html
│   ├── src/
│   │   │ 
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── fonts/
│   │   │ 	└── styles/
│   │   │	    ├── global.css
│   │   │	    ├── variables.css
│   │   │       └── themes.css
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │	│   ├── Sidebar.jsx
│   │   │   │   └── Sidebar.css
│   │   │   ├── Footer/
│   │   │   ├── DashboardCards/ 
│   │   │   ├── RoomCard/
│   │   │   ├── BookingForm/
│   │   │   ├── GuestForm/
│   │   │   ├── Invoice/
│   │   │ 	└── Table/
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard/
│   │   │	│   ├── Dashboard.jsx              # main page
│   │   │ 	│   ├── Dashboard.css
│   │   │ 	│   ├── index.js 
│   │   │ 	│   ├── components/
│   │   │	│   │   ├── SummaryCards.jsx
│   │   │	│   │   ├── SummaryCard.jsx 
│   │   │	│   │   ├── RecentBookings.jsx 
│   │   │	│   │   ├── OccupancyChart.jsx 
│   │   │	│   │   ├── RevenueChart.jsx
│   │   │	│   │   ├── RoomStatus.jsx 
│   │   │	│   │   ├── CheckInList.jsx 
│   │   │	│   │   ├── CheckOutList.jsx 
│   │   │	│   │   ├── QuickActions.jsx
│   │   │   │   │   └── Notifications.jsx
│   │   │ 	│   ├── hooks/
│   │   │   │   │   └── useDashboard.js
│   │   │ 	│   ├── services/
│   │   │   │   │   └── dashboardService.js
│   │   │ 	│   ├── utils/
│   │   │	│   │   ├── formatCurrency.js
│   │   │	│   │   ├── formatDate.js
│   │   │   │   │   └── dashboardHelpers.js
│   │   │   │   └── data/
│   │   │   │       └── mockDashboardData.js
│   │   │   ├── Rooms.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Guests.jsx
│   │   │   ├── Billing.jsx
│   │   │   ├── Employees.jsx 
│   │   │   ├── Reports.jsx
│   │   │ 	└── Settings.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js 
│   │   │   ├── authService.jsx 
│   │   │ 	└── axiosInstance.jsx
│   │   ├── hooks/                               
│   │   │   ├── useAuth.js
│   │   │   └── useFetch.js
│   │   ├── utils/                               
│   │   │   ├── constants.js
│   │   │   ├── validations.js
│   │   │   ├── routes.js
│   │   │   └── helpers.js
│   │   ├── context/                                
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── router/                               
│   │   │   └── AppRouter.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json   
│
├── Backend/(Laravel)                           
│   │      
│   ├── app/  
│   │   ├── Models/
│   │   │	├── User.php
│   │   │	├── Room.php
│   │   │	├── Guest.php
│   │   │	├── Booking.php
│   │   │	├── Payment.php
│   │   │   └── Service.php   
│   │   └── Http/  
│   │    	├── Controllers/
│   │    	│   ├── AuthController.php
│   │    	│   ├── RoomController.php
│   │    	│   ├── BookingController.php
│   │    	│   ├── GuestController.php
│   │    	│   ├── PaymentController.php 
│   │   	│   ├── EmployeeController.php
│   │       │   └── ReportController.php
│   │    	├── Middleware/
│   │    	│   ├── Authenticate.php
│   │    	│   ├── AdminMiddleware.php
│   │       │   └── RoleMiddleware.php
│   │    	├── Requests/
│   │   	│   ├── LoginRequest.php
│   │    	│   ├── RoomRequest.php
│   │       │   └── BookingRequest.php
│   │       └── Resources/
│   │   	    ├── RoomResource.php
│   │    	    ├── BookingResource.php
│   │           └── PaymentResource.php
│   │ 
│   ├── routes/    
│   │   ├── api.php
│   │   ├── web.php
│   │   ├── console.php
│   │   └── channels.php
│   ├── database/    
│   │   ├── Migrations/
│   │   │	├── 2026_03_20_000000_create_users_table.php
│   │   │	├── 2026_03_20_000001_create_rooms_table.php 
│   │   │	├── 2026_03_20_000002_create_bookings_table.php
│   │   │	├── 2026_03_20_000003_create_guests_table.php
│   │   │	├── 2026_03_20_000004_create_payments_table.php 
│   │   │   └── 2026_03_20_000004_create_services_table.php 
│   │   ├── Factories/
│   │   │	├── UserFactory.php
│   │   │   └── RoomFactory.php
│   │   └── seeders/
│   │    	├── DatabaseSeeder.php
│   │       └── AdminSeeder.php
│   │ 
│   ├── config/                                                     
│   │   ├── app.php
│   │   ├── database.php
│   │   └── service.php
│   │   
│   ├── storage/ 
│   │   ├── app/
│   │   │   └── public/
│   │   ├── logs/
│   │   │   └── laravel.log
│   │   └── framework/
│   ├── tests/ 
│   │   ├── Feature/
│   │   └── Unit/
│   │ 
│   ├── docker/    
│   │   ├── nginx/
│   │   ├── php/
│   │   └── index.php                                             
│   ├── docker-compose.yml
│   ├── README.md
│   └── .env          
│  
