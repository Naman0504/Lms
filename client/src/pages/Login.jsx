import React, { useEffect, useState } from "react";

// const Login = () => {
// return <div>Login</div>;
// import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  //Getting data from input field
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log(inputData);
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup Successfully");
      if (registerData.role === "instructor") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }

    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Successfully");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex items-center justify-center w-full mt-10 h-screen">
      <Tabs defaultValue="Login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Signup">Signup</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="Signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  placeholder="eg. Hari Kumar"
                  required
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="eg. hari@Kumar.com"
                  required
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="grid gap-3">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="eg. 12345678"
                  required
                  onChange={(e) => changeInputHandler(e, "signup")}
                  value={signupInput.password}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  className="w-4 h-4"
                  type="checkbox"
                  id="instructor"
                  onChange={(e) =>
                    setSignupInput({
                      ...signupInput,
                      role: e.target.checked ? "instructor" : "student",
                    })
                  }
                />
                <Label htmlFor="instructor">Sign up as an Instructor</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 2-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  placeholder="eg. hari@Kumar.com"
                  required
                  onChange={(e) => changeInputHandler(e, "login")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new"> Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  placeholder="eg. 12345678"
                  required
                  onChange={(e) => changeInputHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 2-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// };

export default Login;
