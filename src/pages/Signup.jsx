import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Form from "../components/Form";
import Input from "../components/Input";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // form validation
    if (!name) {
      return setError("Name required!");
    }
    if (!email) {
      return setError("Email required!");
    }
    if (!password) {
      return setError("Password required!");
    }
    if (password !== confirmPassword) {
      return setError("Password and confirm password doesn't match!");
    }
    if (!agree) {
      return setError("Must accept terms and conditions!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, name);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }
  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-10 rounded-md">
        <h2 className="text-center text-xl font-medium mb-4">
          Create your account
        </h2>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Your name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            label="Email address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Checkbox
            id="terms"
            label="I agree to the terms
          and conditions"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <Button
            type="submit"
            className="w-full disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-500">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}
