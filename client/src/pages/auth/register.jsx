import { registerUser } from "@/api/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const { email, password, name } = userData;
        console.log("userData", userData);
        e.preventDefault();
        setError("");


        if (userData.password !== userData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            setLoading(true);

            const res = await registerUser(name, email, password);

            console.log("response", res);

            if (res) {
                localStorage.setItem("token", res?.data?.token);
                navigate("/");
            } else {
                setError(res?.message || "Registration failed");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-400">
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white shadow-card rounded-2xl p-8">
                    <h2 className="text-3xl font-heading font-bold text-center text-neutral-dark mb-3">
                        Create Account ✨
                    </h2>

                    <p className="text-center text-gray-600 mb-6">
                        Your tasks, your treats – Welcome to{" "}
                        <span className="font-semibold text-primary">Taskify </span>! 🌟🍕
                    </p>

                    {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                        />


                        <input
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            placeholder="Email"
                            type="email"
                            required
                            autoComplete="username"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                        />
                        <input
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            type="password"
                            placeholder="Password"
                            required
                            autoComplete="new-password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                        />
                        <input
                            value={userData.confirmPassword}
                            onChange={(e) =>
                                setUserData({ ...userData, confirmPassword: e.target.value })
                            }
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition"
                        >
                            {loading ? "Registering..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-2 text-gray-500">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <p className="text-center text-gray-600 text-sm mt-6">
                        Have an account?{" "}
                        <Link to="/login" className="text-amber-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
