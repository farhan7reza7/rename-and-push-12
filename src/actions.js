import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/farhan7reza7/farhan7reza7-1@main/data/quran-chapters.json',
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data: ' + error.message);
  }
});

export const editer = createAction('tasks/editer');

export default fetchData;
