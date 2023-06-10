import {
    Button,
    Center,
    Image,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import logo from "../assets/logo.png";
import { useLogin } from "../hooks/useLogin";

const loginScheme = z.object({
  username: z.string().nonempty({ message: "Username não pode estar vazio" }),
  password: z.string().nonempty({ message: "Senha não pode estar vazia" }),
});

type LoginForm = z.infer<typeof loginScheme>;

function LoginScreen() {
  const { mutateAsync, isLoading } = useLogin();
  const handleSubmit = async (loginForm: LoginForm) => {
    await mutateAsync(loginForm);
  };

  const form = useForm<LoginForm>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(loginScheme),
  });

  return (
    <Center h={"100vh"}>
      <form
        className="form-login"
        onSubmit={form.onSubmit((loginForm) => handleSubmit(loginForm))}
      >
        <Stack>
          <Image src={logo} alt="Logo" width={600} height={150} />
          <TextInput
            label="Username"
            type="text"
            placeholder="Username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
        </Stack>
      </form>
    </Center>
  );
}

export default LoginScreen;
