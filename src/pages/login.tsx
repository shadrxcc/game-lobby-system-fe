import Button from "@/components/shared/button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/shared/input";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/api/auth";
import type { IAuth } from "@/services/models/auth";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async (data: IAuth) => login(data.username),
    onSuccess: (data) => {
      toast.success(data.message);
      authLogin(data.token, data.username);
      navigate("/lobby");
    },
    onError: (error: { error: string }) => {
      toast.error(error.error || "Something went wrong");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
    },
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        username: z.string().min(1, { message: "Username is required" }),
      })
    ),
  });

  const onSubmit = (data: IAuth) => {
    loginMutation(data);
  };

  return (
    <div className="min-h-screen flex mx-auto px-2 sm:px-4 items-center justify-center bg-gradient-to-br from-primary to-accent-lime relative overflow-hidden">
      <div className="mx-auto rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md flex gap-y-2 flex-col items-center bg-white/20 backdrop-blur-md shadow-glass">
        <h1 className="text-2xl sm:text-3xl text-center font-bold mb-2 text-white">
          Welcome to CrckdSheddy's Lobby!
        </h1>

        <Input
          label="Username"
          error={!!errors.username}
          errorMessage={errors.username?.message}
          placeholder="Enter your username"
          {...register("username")}
        />

        <Button
          className="w-full text-base sm:text-lg"
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={!isValid}
        >
          Login
        </Button>

        <p className="text-white text-xs sm:text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-accent-lime">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
