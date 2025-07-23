export async function loginUser({email, password}) {
	const formData = new URLSearchParam();
	formData.append("username", email);
	formData.append("password", password);
	
	const res = await fetch("/api/auth/login", {
		method: "POST",
		header: {
			"Content-Type": "application/x-www-form-urlencoded", 
		},
		body: formData.toString(),
	});
	
	if (!res.ok) {
		const err = await res.json();
		throw new Error(err.detail || "Login error");
	}
	return await res.json();
}
