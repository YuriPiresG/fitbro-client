import {
  AppShell,
  Avatar,
  Button,
  Flex,
  Header,
  Navbar,
  Text,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useHome } from "../hooks/useHome";
import { useLogout } from "../hooks/useLogout";
import { useGetMe } from "../hooks/useGetMe";

export const Layout = () => {
  const user = useGetMe();
  const logout = useLogout();
  const home = useHome();
  const handleLogout = () => {
    logout();
  };
  const handleHome = () => {
    home();
  };
  return (
    <div>
      <AppShell
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
        padding="md"
        header={
          <Header
            height={50}
            p="xs"
            color="red"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Text weight={400} size="xl">
              <span>Olá, {user?.username}</span>
            </Text>
            <div style={{ marginLeft: "auto" }}>
              <Link to="/home">
                <Button variant="subtle" size="sm">
                  Home
                </Button>
              </Link>
              <Link to="/workout">
                <Button variant="subtle" size="sm">
                  Treinos
                </Button>
              </Link>
              <Link to="/diet">
                <Button variant="subtle" size="sm">
                  Dieta
                </Button>
              </Link>
              <Link to="/measurements">
                <Button variant="subtle" size="sm">
                  Medidas
                </Button>
              </Link>
              <Button variant="subtle" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Header>
        }
      >
        <Outlet />
      </AppShell>
    </div>
  );
};
