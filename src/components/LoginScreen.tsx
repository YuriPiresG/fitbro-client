import {
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
  Image,
} from "@mantine/core";
import logo from "../assets/logo.png";

function LoginScreen() {
  return (
    <Center h={"100vh"}>
      <form
        className="form-login"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <Stack>
          <Image src={logo} alt="Logo" width={600} height={150} />
          <TextInput label="Username" type="text" placeholder="Username" />
          <PasswordInput label="Password" placeholder="Password" />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Center>
  );
}

export default LoginScreen;
