import { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./LoginForm.module.scss";

const { Title, Text } = Typography;

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      await login(values);
      navigate("/dashboard");
    } catch {
      // Ошибка обрабатывается в AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer} data-theme={themeMode}>
      <Card>
        <Title level={2}>Вход</Title>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Логин" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Войти
            </Button>
          </Form.Item>

          <Text className={styles.registerLink}>
            Еще нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
};
