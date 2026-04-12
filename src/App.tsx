import { Provider } from "react-redux";
import { store } from "./state/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouteManager } from "./pages/RouteManager";

function App() {
  return (
    <div style={{ flex: 1, minHeight: "100vh", background: "#F4F2FB" }}>
      <Provider store={store}>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastStyle={{
            borderRadius: 12,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
          }}
        />
        <RouteManager />
      </Provider>
    </div>
  );
}

export default App;
