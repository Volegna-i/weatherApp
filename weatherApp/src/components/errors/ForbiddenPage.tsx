import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ErrorPages.module.scss";

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <Result
        status="403"
        title="403"
        subTitle="Извините, у вас нет доступа к этой странице"
        extra={
          <Button type="primary" onClick={() => navigate("/login")}>
            Войти в систему
          </Button>
        }
      />
    </div>
  );
};
