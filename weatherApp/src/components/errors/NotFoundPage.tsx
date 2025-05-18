import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/ErrorPages.module.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigateHome = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.errorContainer}>
      <Result
        status="404"
        title="404"
        subTitle="Извините, запрашиваемая страница не существует"
        extra={
          <Button type="primary" onClick={handleNavigateHome}>
            {user ? "Вернуться на главную" : "Войти в систему"}
          </Button>
        }
      />
    </div>
  );
};
