import homeLogo from "../assets/homeLogo.svg";
import { Image, Paper } from "@mantine/core";
import { useGetMe } from "../hooks/useGetMe";

function HomeScreen() {
  const user = useGetMe();
  console.log(user);
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
          marginTop: "10rem",
        }}
      >
        <h1
          style={{
            fontSize: 60,
            alignSelf: "end",
          }}
        >
          Bem vindo ao FitBro {user?.name}! Uma plataforma para te ajudar a
          acompanhar a sua evolução. Comece montando seus treinos na aba
          "Treinos"
        </h1>
      </Paper>
    </div>
  );
}

export default HomeScreen;
