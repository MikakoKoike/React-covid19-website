import "./App.css";
import { Header } from "./components/Header";
import { TopPage } from "./components/TopPage";
import { Footer } from "./components/Footer";
import { TopChart } from "./components/TopChart";

export const App = () => {
  return (
    <div>
      <Header></Header>
      <TopPage></TopPage>
      <Footer></Footer>
      <TopChart></TopChart>
    </div>
  );
};
export default App;
