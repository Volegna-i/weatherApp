import { useState } from "react";
import { Form, Input, Button, Card, Typography, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import type { RegisterCredentials } from "../../types/user.types";
import styles from "../../styles/auth.module.scss";

const { Title, Text } = Typography;

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { themeMode } = useTheme();
  const { message } = App.useApp();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.some(
        (user: { username: string }) => user.username === values.username
      );

      if (userExists) {
        setError("Такой пользователь уже существует!");
        return;
      }

      const newUser = {
        username: values.username,
        password: values.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      message.success("Регистрация успешна!");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Регистрация не удалась!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer} data-theme={themeMode}>
      <Card>
        <div className={`${styles.formHeader} ${error ? styles.hasError : ""}`}>
          <Title level={2}>Регистрация</Title>
          <div
            className={`${styles.errorMessage} ${error ? styles.visible : ""}`}
          >
            {error}
          </div>
        </div>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className={styles.authForm}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Пожалуйста, введите свой логин!" },
              { min: 3, message: "Логин должен содержать минимум 3 символа!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Логин" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Пожалуйста, введите свой пароль!" },
              { min: 3, message: "Пароль должен содержать минимум 3 символа!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Пожалуйста, подтвердите свой пароль!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Подтвердите пароль"
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
              Зарегистрироваться
            </Button>
          </Form.Item>

          <Text className={styles.authLink}>
            Уже есть аккаунт? <Link to="/login">Авторизироваться</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
};
