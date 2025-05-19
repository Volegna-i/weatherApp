import { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { AuthError } from "../../types/error.types";
import styles from "../../styles/auth.module.scss";

const { Title, Text } = Typography;

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      await login(values);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof AuthError) {
        switch (err.code) {
          case "USER_NOT_FOUND":
            setError("Пользователь не найден");
            break;
          case "INVALID_PASSWORD":
            setError("Неверный пароль");
            break;
          default:
            setError("Ошибка входа");
        }
      } else {
        setError("Неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer} data-theme={themeMode}>
      <Card>
        <Title level={2}>Вход</Title>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className={styles.authForm}
        >
          {error && <div className={styles.errorMessage}>{error}</div>}

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

          <Text className={styles.authLink}>
            Еще нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
};
