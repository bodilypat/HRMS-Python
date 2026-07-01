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
│   │   │   ├── Login/
│   │   │	│   ├── Login.jsx              # main page
│   │   │ 	│   ├── Login.css
│   │   │ 	│   ├── index.js 
│   │   │ 	│   ├── components/
│   │   │	│   │   ├── LoginForm.jsx
│   │   │	│   │   ├── LoginHeader.jsx 
│   │   │	│   │   ├── PasswordInput.jsx 
│   │   │   │   │   └── RememberMe.jsx
│   │   │ 	│   ├── hooks/
│   │   │   │   │   └── useLogin.js
│   │   │ 	│   ├── services/
│   │   │   │   │   └── authService.js
│   │   │ 	│   ├── utils/
│   │   │	│   │   ├── validators.js
│   │   │   │   │   └── authHelpers.js
│   │   │   │   └── data/
│   │   │   │       └── mockUserData.js
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
│   │   │	│   │   ├── Notifications.jsx
│   │   │   │   │   └── Layout.css
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
│   │   │   ├── Rooms/
│   │   │	│   ├── Rooms.jsx              # main page
│   │   │ 	│   ├── Rooms.css
│   │   │ 	│   ├── index.js 
│   │   │ 	│   ├── components/
│   │   │	│   │   ├── RoomTable.jsx
│   │   │	│   │   ├── RoomCard.jsx
│   │   │	│   │   ├── RoomForm.jsx 
│   │   │	│   │   ├── RoomModal.jsx 
│   │   │	│   │   ├── RoomFilter.jsx 
│   │   │	│   │   ├── RoomSearch.jsx 
│   │   │	│   │   ├── RoomStatusBadge.jsx 
│   │   │	│   │   ├── RoomAvailability.jsx 
│   │   │	│   │   ├── RoomActions.jsx 
│   │   │	│   │   ├── RoomDetails.jsx 
│   │   │	│   │   ├── RoomTypeSelect.jsx 
│   │   │	│   │   ├── RoomPagination.jsx
│   │   │	│   │   ├── EmptyRooms.jsx 
│   │   │	│   │   ├── DeleteRoomDialog.jsx
│   │   │   │   │   └── RoomStyles.css
│   │   │ 	│   ├── hooks/
│   │   │	│   │   ├── useRooms.js 
│   │   │	│   │   ├── useRoomFilter.js
│   │   │   │   │   └── useRoomSearch.js
│   │   │ 	│   ├── services/
│   │   │   │   │   └── roomService.js
│   │   │ 	│   ├── utils/
│   │   │	│   │   ├── roomHelpers.js 
│   │   │	│   │   ├── roomValidators.js
│   │   │   │   │   └── roomConstants.js 
│   │   │   │   └── data/
│   │   │   │       └── mockRoomsData.js 
│   │   │   ├── Bookings/
│   │   │	│   ├── Bookings.jsx              # main page
│   │   │ 	│   ├── Bookings.css
│   │   │ 	│   ├── index.js 
│   │   │ 	│   ├── components/
│   │   │	│   │   ├── BookingTable.jsx 
│   │   │	│   │   ├── BookingCard.jsx 
│   │   │	│   │   ├── BookingModal.jsx 
│   │   │	│   │   ├── BookingFilter.jsx 
│   │   │	│   │   ├── BookingSearch.jsx 
│   │   │	│   │   ├── BookingStatusBadge.jsx 
│   │   │	│   │   ├── BookingDetails.jsx 
│   │   │	│   │   ├── BookingActions.jsx
│   │   │	│   │   ├── BookingPagination.jsx 
│   │   │	│   │   ├── BookingCalendar.jsx 
│   │   │	│   │   ├── CheckInDialog.jsx 
│   │   │	│   │   ├── CheckOutDialog.jsx
│   │   │   │   │   └── DeleteBookingDialog.jsx 
│   │   │ 	│   ├── hooks/
│   │   │	│   │   ├── useBooking.js 
│   │   │	│   │   ├── useBookingSearch.js
│   │   │   │   │   └── useBookingFilter.js
│   │   │ 	│   ├── services/
│   │   │   │   │   └── bookingService.js
│   │   │ 	│   ├── utils/
│   │   │	│   │   ├── bookingHelpers.js
│   │   │	│   │   ├── bookingValidators.js
│   │   │   │   │   └── bookingConstants.js
│   │   │   │   └── data/
│   │   │   │       └── mockBookingData.js
│   │   │   ├── Guests/
│   │   │	│   ├── Guests.jsx              # main page
│   │   │ 	│   ├── Guests.css
│   │   │ 	│   ├── index.js 
│   │   │ 	│   ├── components/
│   │   │	│   │   ├── GuestTable.jsx 
│   │   │	│   │   ├── GuestCard.jsx 
│   │   │	│   │   ├── GuestForm.jsx 
│   │   │	│   │   ├── GuestModal.jsx 
│   │   │	│   │   ├── GuestSearch.jsx 
│   │   │	│   │   ├── GuestFilter.jsx 
│   │   │	│   │   ├── GuestProfile.jsx 
│   │   │	│   │   ├── GuestHistory.jsx 
│   │   │	│   │   ├── GuestActions.jsx 
│   │   │	│   │   ├── GuestPagination.jsx
│   │   │	│   │   ├── LoyaltyBadge.jsx
│   │   │   │   │   └── DeleteGuestDialog.jsx
│   │   │ 	│   ├── hooks/
│   │   │	│   │   ├── useGuest.js
│   │   │	│   │   ├── useGuestFilter.js 
│   │   │   │   │   └── useGuestSearch.js
│   │   │ 	│   ├── services/
│   │   │   │   │   └── guestService.js
│   │   │ 	│   ├── utils/
│   │   │	│   │   ├── guestHelper.js
│   │   │	│   │   ├── guestValidators.js
│   │   │   │   │   └── guestConstants.js
│   │   │   │   └── data/
│   │   │   │       └── mockGuestDate.js
│   │   │   ├── Billing/
│   │   │	│   ├── Billing.jsx              # main page
│   │   │ 	│   ├── Billings.css
│   │   │ 	│   ├── index.js 
│   │   │ 	│   ├── components/
│   │   │	│   │   ├── 
│   │   │   │   │   └── 
│   │   │ 	│   ├── hooks/
│   │   │   │   │   └── 
│   │   │ 	│   ├── services/
│   │   │   │   │   └── 
│   │   │ 	│   ├── utils/
│   │   │	│   │   ├── 
│   │   │	│   │   ├── 
│   │   │   │   │   └── 
│   │   │   │   └── data/
│   │   │   │       └── 
│   │   │   ├── Employees/
│   │   │	│   ├── Employees.jsx              # main page
│   │   │ 	│   ├── Employees.css
│   │   │ 	│   ├── index.js 
│   │   │ 	│   ├── components/
│   │   │	│   │   ├── 
│   │   │   │   │   └── 
│   │   │ 	│   ├── hooks/
│   │   │   │   │   └── 
│   │   │ 	│   ├── services/
│   │   │   │   │   └── 
│   │   │ 	│   ├── utils/
│   │   │	│   │   ├── 
│   │   │	│   │   ├── 
│   │   │   │   │   └── 
│   │   │   │   └── data/
│   │   │   │       └──  
│   │   │   ├── Reports/
│   │   │	│   ├── Reports.jsx              # main page
│   │   │ 	│   ├── Reports.css
│   │   │ 	│   ├── index.js 
│   │   │ 	│   ├── components/
│   │   │	│   │   ├── 
│   │   │   │   │   └── 
│   │   │ 	│   ├── hooks/
│   │   │   │   │   └── 
│   │   │ 	│   ├── services/
│   │   │   │   │   └── 
│   │   │ 	│   ├── utils/
│   │   │	│   │   ├── 
│   │   │	│   │   ├── 
│   │   │   │   │   └── 
│   │   │   │   └── data/
│   │   │   │       └── 
│   │   │ 	└── Settings/
│   │   │	    ├── Settings.jsx              # main page
│   │   │ 	    ├── Settings.css
│   │   │ 	    ├── index.js 
│   │   │ 	    ├── components/
│   │   │	    │   ├── 
│   │   │       │   └── 
│   │   │ 	    ├── hooks/
│   │   │       │   └── 
│   │   │ 	    ├── services/
│   │   │       │   └── 
│   │   │ 	    ├── utils/
│   │   │	    │   ├── 
│   │   │	    │   ├── 
│   │   │       │   └── 
│   │   │       └── data/
│   │   │           └── 
│   │   │
│   │   ├── services/
│   │   │   ├── api.js 
│   │   │   ├── authService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── roomService.js 
│   │   │   ├── bookingService.js
│   │   │   ├── guestService.js 
│   │   │ 	└── paymentService.js
│   │   ├── hooks/                               
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── usePagination.js
│   │   ├── utils/        
│   │   │   ├── formatCurrency.js                       
│   │   │   ├── constants.js
│   │   │   ├── validators.js
│   │   │   ├── formatDate.js
│   │   │   └── helpers.js
│   │   ├── context/                                
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   ├── router/             
│   │   │   ├── AppRoutes.jsx                  
│   │   │   └── PrivateRoute.jsx
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
