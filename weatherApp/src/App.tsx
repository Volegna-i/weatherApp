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
import { LoginForm } from "./components/auth/LoginForm/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm/RegisterForm";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Header } from "./components/layout/Header/Header";
import { WeatherDashboard } from "./components/weather/WeatherDashboard/WeatherDashboard";
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
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </AntApp>
  );
}

export default App;
