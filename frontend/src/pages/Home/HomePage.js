import React, { useEffect, useReducer} from 'react'
import { getAll, search, getAllTags, getAllByTag } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/Notfound/NotFound';

const initialState = {  foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch ] = useReducer(reducer, initialState);
  const { foods,tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect ( () => {
  getAllTags().then(tags => dispatch ({type: 'TAGS_LOADED', payload: tags}));


  let loadFoods;

  if (tag) {
    loadFoods = getAllByTag(tag);
  } else if (searchTerm) {
    loadFoods = search(searchTerm);
  } else {
    loadFoods = getAll();
  }

    loadFoods.then(foods => dispatch ( { type: 'FOODS_LOADED', payload: foods}));
  }, [searchTerm, tag] );

  return (
    <>
    <Search/>
    <Tags tags={tags}/>
    {foods.length === 0 && <NotFound linkText="Reset Search"/>}
    <Thumbnails foods={foods} />
    </>
  );
}
