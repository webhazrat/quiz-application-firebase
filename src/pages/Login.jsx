import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      return setError("Email required!");
    }
    if (!password) {
      return setError("Password required!");
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-10 rounded-md">
        <h2 className="text-center text-xl font-medium mb-4">
          Login to your account
        </h2>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email address"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full disabled:cursor-not-allowed"
            disabled={loading}
          >
            Login
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-indigo-500">
              Signup
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}
