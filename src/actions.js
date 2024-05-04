import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchData = createAsyncThunk('data/fetchData', async () => {
  //dispatch(request());
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/farhan7reza7/farhan7reza7-1@main/data/quran-chapters.json',
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return data;
    //dispatch(success(data.data));
  } catch (error) {
    throw new Error('Failed to fetch data: ' + error.message);
    //dispatch(errored(error.message));
  }
});

export default fetchData;
