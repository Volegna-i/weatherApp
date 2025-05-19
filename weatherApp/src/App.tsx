import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout, App as AntApp } from "antd";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";
import { Header } from "./components/layout/Header/Header";
import { WeatherDashboard } from "./components/weather/WeatherDashboard/WeatherDashboard";
import { ForbiddenPage } from "./components/errors/ForbiddenPage";
import { NotFoundPage } from "./components/errors/NotFoundPage";
import { store } from "./store/store";
import { useTheme } from "./hooks/useTheme";
import styles from "./styles/layout.module.scss";

const { Content } = Layout;

const Dashboard = () => {
  const { themeMode } = useTheme();

  return (
    <Layout className={styles.mainLayout} data-theme={themeMode}>
      <Header />
      <Content className={styles.content}>
        <div className={styles.contentInner}>
          <WeatherDashboard />
        </div>
      </Content>
    </Layout>
  );
};

function App() {
  return (
    <AntApp>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {/* Публичные маршруты */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginForm />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <RegisterForm />
                    </PublicRoute>
                  }
                />
                <Route path="/403" element={<ForbiddenPage />} />

                {/* Защищенные маршруты */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Редирект с главной */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Navigate to="/dashboard" replace />
                    </ProtectedRoute>
                  }
                />

                {/* 404 для всех остальных маршрутов */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </AntApp>
  );
}

export default App;
