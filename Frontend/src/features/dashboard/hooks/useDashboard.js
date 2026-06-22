//src/features/dashboard/hooks/useDashboard.js 
function useDashboard() {

    const [stats, setStatus] = 
        useState(null);

        useEffect(() =>{
            loadDashboard();
        }, []);

        const loadDashboard = async() => {

            const res = 
                await getDashboardStats();

                setStatus(res.data);
        };

        return {
            stats,
            loadDashboard 
        };
    
}

export default useDashboard;
