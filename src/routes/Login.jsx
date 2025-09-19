import api from "../config/api";
import { useState } from "react";
import { Input, InputField, InputTitle } from "../components/InputField";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/login", { username, password });
      const { token } = data.data;
      localStorage.setItem("token", token);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-5 bg-background">
      <div className="bg-input p-5 flex flex-col items-center w-1/1 max-w-100 gap-10">
        <div className="flex flex-col gap-3 items-center ">
          <h1 className="font-serif text-3xl text-foreground ">
            Login To Our Blog
          </h1>
          <p className="font-sans text-muted-foreground text-center">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleFormSubmit} className="w-1/1 flex flex-col gap-6">
          <InputField>
            <InputTitle>Username:</InputTitle>
            <Input
              placeholder={"Username"}
              handler={handleUsernameInput}
              value={username}
            />
          </InputField>
          <InputField>
            <InputTitle>Password:</InputTitle>
            <Input
              placeholder={"Password"}
              handler={handlePasswordInput}
              value={password}
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
      </div>
    </div>
  );
}

export default Login;
