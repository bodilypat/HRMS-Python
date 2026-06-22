//src/features/auth/pages/ResetPassword.jsx
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authApi";

function ResetPassword() {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const[message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
}

