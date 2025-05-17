import { Layout, Button, Space } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./Header.module.scss";

const { Header: AntHeader } = Layout;

export const Header = () => {
  const { user, logout } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AntHeader className={styles.header}>
      <div className={styles.logo}>Weather App</div>
      {user && (
        <div className={styles.controls}>
          <span className={styles.userInfo}>
            <UserOutlined /> {user.username}
          </span>
          <Space>
            <Button
              icon={themeMode === "light" ? <MoonOutlined /> : <SunOutlined />}
              onClick={toggleTheme}
              type="text"
            />
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              Выход
            </Button>
          </Space>
        </div>
      )}
    </AntHeader>
  );
};
