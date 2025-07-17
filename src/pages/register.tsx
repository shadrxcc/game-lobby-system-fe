import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import type { IAuth } from "@/services/models/auth";
import { register } from "@/services/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: async (data: IAuth) => register(data.username),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error: { error: string }) => {
      toast.error(error.error || "Something went wrong");
    },
  });

  const { register: registerForm, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(
      z.object({
        username: z
          .string()
          .min(3, { message: "Username must be at least 3 characters long" }),
      })
    ),
    mode: "onChange",
  });

  const onSubmit = (data: IAuth) => {
    registerMutation(data);
  };

  return (
    <div className="min-h-screen flex mx-auto items-center justify-center bg-gradient-to-br from-primary to-accent-lime relative overflow-hidden">
      <div className="mx-auto rounded-2xl p-8 w-full max-w-md flex gap-y-3.5 flex-col items-center bg-white/20 backdrop-blur-md shadow-glass">
        <h1 className="text-3xl text-center font-bold mb-2 text-white">
          Register to CrckdSheddy's Lobby!
        </h1>

        <Input
          placeholder="Enter your username"
          {...registerForm("username")}
          label="Username"
          error={!!errors.username}
          errorMessage={errors.username?.message}
        />

        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={!isValid}
        >
          Register
        </Button>

        <p className="text-white text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-accent-lime">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
