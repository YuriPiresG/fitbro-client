import homeLogo from "../assets/homeLogo.svg";
import { Image, Paper, Text } from "@mantine/core";
function HomeScreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Image src={homeLogo} alt="Logo" width={800} />
      <Paper
        shadow="xl"
        radius="xl"
        p="xl"
        style={{
          marginLeft: "1rem",
          marginTop: "10rem"}}
      >
        <h1
          style={{
            fontSize: 80,
            alignSelf: "end",
          }}
        >
          Bem vindo ao FitBro! Uma plataforma para te ajudar a acompanhar a sua
          evolução.
        </h1>
      </Paper>
    </div>
  );
}

export default HomeScreen;
