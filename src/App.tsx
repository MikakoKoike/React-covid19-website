import "./App.css";
import { Header } from "./components/Header";
import { Top } from "./components/Top";
import { RecoilRoot } from "recoil";
import { Sample } from "./components/Sample";
import { TopPage } from "./components/TopPage";
import { fetchUserById } from "./redux/counterSlice";
import { AppStore } from "./redux/store";
import { Footer } from "./components/Footer";
import { TopChart } from "./components/TopChart";

export const App = () => {
  //state.counterはstore.jsのcounter
  // const ncurrentpatients = useSelector(
  //   (state: any) => state.counter.info.ncurrentpatients
  // );
  // const ndeaths = useSelector((state: any) => state.counter.info.ndeaths);
  // const nexits = useSelector((state: any) => state.counter.info.nexits);

  // const dispatch = useDispatch<AppStore>(); //actionをstoreに通知するためのdispatch

  // useEffect(() => {
  //   dispatch(fetchUserById());
  // }, []);

  return (
    <div>
      {/* <RecoilRoot> */}
      <Header></Header>
      {/* <Top></Top> */}
      <TopPage></TopPage>
      <Footer></Footer>
      <TopChart></TopChart>
      {/* <Sample></Sample>
        <PrimaryButton>テスト</PrimaryButton>
        <SecondaryButton>検索</SecondaryButton>
        <br />
        <SearchInput></SearchInput> */}
      {/* </RecoilRoot> */}
    </div>
  );
};
export default App;
