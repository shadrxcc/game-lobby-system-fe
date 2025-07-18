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
    // <div className="min-h-screen flex mx-auto px-2 sm:px-4 items-center justify-center relative overflow-hidden">
    //   <div className="mx-auto rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md flex gap-y-2 flex-col items-center bg-white/20 backdrop-blur-md shadow-glass">
    //     <h1 className="text-2xl sm:text-3xl text-center font-bold mb-2 text-white">
    //       Welcome to CrckdSheddy's Lobby!
    //     </h1>

    //     <Input
    //       label="Username"
    //       error={!!errors.username}
    //       errorMessage={errors.username?.message}
    //       placeholder="Enter your username"
    //       {...register("username")}
    //     />

    //     <Button
    //       className="w-full text-base sm:text-lg"
    //       onClick={handleSubmit(onSubmit)}
    //       loading={isPending}
    //       disabled={!isValid}
    //     >
    //       Login
    //     </Button>

    //     <p className="text-white text-xs sm:text-sm text-center">
    //       Don't have an account?{" "}
    //       <Link to="/register" className="text-accent-lime">
    //         Register
    //       </Link>
    //     </p>
    //   </div>
    // </div>
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
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

      {/* Neon Border */}
      <div className="absolute inset-0 border-4 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)] pointer-events-none"></div>

      <div className="min-h-screen flex items-center justify-center p-8 relative">
        {/* Floating Neon Orbs */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.8)] animate-pulse"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.8)] animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-ping"></div>

        <div className="w-full max-w-lg space-y-8 relative z-10">
          {/* Arcade Title */}
          <div className="text-center space-y-6">
            {/* Retro Subtitle */}
            <div className="relative">
              <p className="text-2xl font-bold text-cyan-400 tracking-widest animate-pulse">
                ◆ CRCKDSHEDDY'S LOBBY ◆
              </p>
              <div className="text-lg text-pink-400 font-mono mt-2 animate-bounce">
                {">>> INSERT USERNAME TO PLAY <<<"}
              </div>
            </div>
          </div>

          {/* Login Terminal */}
          <div className="bg-black border-4 border-green-400 p-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] relative">
            <div className="absolute -top-3 left-4 bg-black px-2 text-green-400 font-mono text-sm">
              PLAYER LOGIN TERMINAL
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-green-400 font-mono text-sm tracking-wider">
                  {"> ENTER PLAYER NAME:"}
                </label>
                <Input
                  error={!!errors.username}
                  errorMessage={errors.username?.message}
                  placeholder="Enter your username"
                  maxLength={12}
                  {...register("username")}
                />
              </div>

              <button
                type="submit"
                disabled={!isValid || isPending}
                className="w-full bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-black text-2xl py-4 px-8 border-4 border-white shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none tracking-wider"
              >
                {isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>LOADING...</span>
                  </div>
                ) : (
                  "LOGIN"
                )}
              </button>
            </form>
          </div>

          <div className="text-center space-y-2">
            <div className="text-yellow-400 font-mono text-sm animate-pulse">
              ▲ PICK NUMBERS ▲ BEAT RECORDS ▲
            </div>
            <div className="text-cyan-400 font-mono text-xs">
              {"[LOGIN TO BEGIN YOUR JOURNEY]"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
