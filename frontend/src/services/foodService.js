import axios from "axios";

export const getAll = async () => {
    const { data } = await axios.get('/api/foods');
    return data;
  };

  export const search = async (searchTerm) => {
    try {
        const { data } = await axios.get(`/api/foods/search/${encodeURIComponent(searchTerm)}`);
        return data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw error;
    }
};
   
export const getAllTags = async () => {
    const { data } = await axios.get('/api/foods/tags');
    return data;
  };

  export const getAllByTag = async (tag) => {
    const endpoint = tag === 'All' ? '/api/foods/tag/All' : `/api/foods/tag/${encodeURIComponent(tag)}`;
    const { data } = await axios.get(endpoint);
    return data;
};

export const getById = async foodId => {
    const { data } = await axios.get('/api/foods/' + foodId);
    return data;
};