import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const { register } = useForm({
    defaultValues: {
      username: "",
    },
  });

  return (
    <div className="min-h-screen flex mx-auto items-center justify-center bg-gradient-to-br from-primary to-accent-lime relative overflow-hidden">
      <div className="mx-auto rounded-2xl p-8 w-full max-w-md flex gap-y-6 flex-col items-center bg-white/20 backdrop-blur-md shadow-glass">
        <h1 className="text-3xl text-center font-bold mb-2 text-white">
          Register to CrckdSheddy's Lobby!
        </h1>

        <Input placeholder="Enter your username" {...register("username")} label="Username" />

        <Button className="w-full">Register</Button>

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
