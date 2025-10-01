import { useEffect, useState } from "react";
import { Input, InputField, InputTitle } from "../components/InputField";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { CardBody, Card, CardHeader } from "../components/Card.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, error, user, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      setError(null);
    }
  }, [error, setError]);

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await login({ username, password });
    setLoading(false);
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-5 bg-background">
      <Card>
        <CardHeader>
          <h1 className="font-serif text-3xl text-foreground">
            Login To Our Blog
          </h1>
          <p className="font-sans text-muted-foreground text-center">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleFormSubmit}
            className="w-1/1 flex flex-col gap-6"
          >
            <InputField>
              <InputTitle>Username:</InputTitle>
              <Input
                placeholder={"Username"}
                handler={handleUsernameInput}
                value={username}
                required
                type="text"
              />
            </InputField>
            <InputField>
              <InputTitle>Password:</InputTitle>
              <Input
                placeholder={"Password"}
                handler={handlePasswordInput}
                value={password}
                required
                type="password"
              />
            </InputField>
            <Button
              type="submit"
              variant="primary"
              className={loading ? "opacity-50 cursor-not-allowed" : ""}
              disable={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <hr />
            <div className="text-center">
              <p className="font-sans text-muted-foreground">
                Don't Have an Account?{" "}
              </p>
              <Link to={"/signup"} className="text-blue-600 underline">
                SignUp Now!
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
