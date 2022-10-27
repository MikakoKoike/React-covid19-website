import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Papa from "papaparse";

export const counterSlice = createSlice({
  name: "counter2",
  initialState: {
    info: {
      lastUpdate: 0,
      ncurrentpatients: 0,
      ndeaths: 0,
      nexits: 0,
      ninspections: 0,
      npatients: 0,
    },
    bedInfo: [],
    ventilatorInfo: [],
  },
  //reducersを作成すると自動的にactionCreatorも作成される
  reducers: {
    // getData: async (state: number) => {
    //   try {
    //     const res = await axios.get(
    //       "https://www.stopcovid19.jp/data/covid19japan.json"
    //     );
    //     console.log(res.data);
    //     state.ncurrentpatients = res.data.ncurrentpatients;
    //     console.log(state.ncurrentpatients);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.info = action.payload;
    });
    builder.addCase(fetchBedInfo.fulfilled, (state, action) => {
      state.bedInfo = action.payload;
    });
    builder.addCase(fetchVentilatorInfo.fulfilled, (state, action) => {
      state.ventilatorInfo = action.payload;
    });
  },
});
// 非同期で値を更新するのにcreateAsyncThunkが必要
export const fetchUserById = createAsyncThunk(
  "counter2/fetchById", //slice名/任意の名前
  async () => {
    const res = await axios.get(
      "https://www.stopcovid19.jp/data/covid19japan.json"
    );
    // console.log(res.data);
    return res.data;
  }
);
export const fetchBedInfo = createAsyncThunk("couter2/bedInfo", async () => {
  const response = await axios.get(
    "https://www.stopcovid19.jp/data/covid19japan_beds/latest.json"
  );
  // console.log(response.data);

  return response.data;
});

export const fetchVentilatorInfo = createAsyncThunk(
  "counter2/ventilatorInfo",
  async () => {
    const response = await axios.get(
      "https://www.stopcovid19.jp/data/ventilator-20200306.csv?1661483041372"
    );
    // console.log(response.data);
    const papa: any = Papa.parse<any>(response.data, {
      header: true,
    });
    // console.log(papa.data);
    return papa.data;
  }
);

export const {
  //   increment,
  //   decrement,
  //   incrementByAmount,
  //   incrementByAmount2,
  //   getData,
  // fetchUserById,
} = counterSlice.actions;
export default counterSlice.reducer;
