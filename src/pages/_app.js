import "@/styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />{" "}
    </Provider>
  );
}
