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

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
        `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        ></div>
      </div>

      <div className="absolute inset-0 border-4 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)] pointer-events-none"></div>

      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-8 relative">
        <div className="absolute top-6 left-6 sm:top-20 sm:left-20 w-2 h-2 sm:w-4 sm:h-4 bg-pink-500 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.8)] animate-pulse"></div>
        <div className="absolute top-24 right-8 sm:top-40 sm:right-32 w-3 h-3 sm:w-6 sm:h-6 bg-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.8)] animate-bounce"></div>
        <div className="absolute bottom-16 left-10 sm:bottom-32 sm:left-40 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-ping"></div>

        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg space-y-6 sm:space-y-8 relative z-10">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="relative">
              <p className="text-lg sm:text-2xl font-bold text-cyan-400 tracking-widest animate-pulse">
                ◆ CRCKDSHEDDY'S LOBBY ◆
              </p>
              <div className="text-base sm:text-lg text-pink-400 font-mono mt-1 sm:mt-2 animate-bounce">
                {">>> INSERT USERNAME TO PLAY <<<"}
              </div>
            </div>
          </div>

          <div className="bg-black border-4 border-green-400 p-4 sm:p-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] relative">
            <div className="absolute -top-3 left-2 sm:left-4 bg-black px-1 sm:px-2 text-green-400 font-mono text-xs sm:text-sm">
              PLAYER REGISTRATION TERMINAL
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-green-400 font-mono text-xs sm:text-sm tracking-wider">
                  {"> ENTER PLAYER NAME:"}
                </label>
                <Input
                  error={!!errors.username}
                  errorMessage={errors.username?.message}
                  placeholder="Enter your username"
                  maxLength={12}
                  {...registerForm("username")}
                />
              </div>

              <Button
                type="submit"
                disabled={!isValid || isPending}
                isLoading={isPending}
                className="w-full text-base sm:text-lg"
              >
                REGISTER
              </Button>
            </form>

            <p className="text-white font-mono mt-2 sm:mt-4 text-xs sm:text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="!text-green-400">
                Login
              </Link>
            </p>
          </div>

          <div className="text-center space-y-1 sm:space-y-2">
            <div className="text-yellow-400 font-mono text-xs sm:text-sm animate-pulse">
              ▲ PICK NUMBERS ▲ BEAT RECORDS ▲
            </div>
            <div className="text-cyan-400 font-mono text-[10px] sm:text-xs">
              {"[REGISTER TO BEGIN YOUR JOURNEY]"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
