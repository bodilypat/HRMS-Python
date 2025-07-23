export function handleAuthError(error) {
	if (error.message.includes("Unauthorized") || error.message.includes("invalid")) {
		alert("Session expired. Please log in again.");
		localStorage.removeItem("token");
		window.location.href = "/login.html";
	} else {
		alert(error.message);
	}
}
