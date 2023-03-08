import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import React,{ useContext, useEffect,useState } from 'react';
import cartContext from '../../store/cart-context';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals,setMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState();
  const [page, setPage] = useState(1);
  const [searchInput,setSearchInput]=useState('');

  const cartCtx=useContext(cartContext);
  
  console.log(searchInput);
  const searchChange=(e)=>{
    setSearchInput(e.target.value);
  }
  cartCtx.searchChangeHandler=searchChange;
  useEffect(()=>{
    const fetchMeals=async ()=>{
      const response= await fetch('https://react-http-94dfa-default-rtdb.firebaseio.com/meals.json/');
      // const response=await res.json();
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const responseData=await response.json();

      const loadedMeals=[];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals().catch(error=>{
      setIsLoading(false);
      setHttpError(error.message);
    });
    setIsLoading(false);
  },[])

  if(isLoading){
    return <section className={classes.MealsIsLoading}>
      <p>loading...</p>
    </section>
  }

  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }
  const mealsList=meals.filter((meal)=>{
    return searchInput===''?meal:meal.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
  }).map((meal)=>(
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      ));


  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= meals.length / 4 && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  const pagination=<React.Fragment>{meals.length>0 && <div className={classes.pagination}>
    <span className={page > 1 ? "" : classes.pagination__disable} onClick={()=>selectPageHandler(page-1)}>◀</span>
    {[...Array(meals.length/4)].map((_,i)=>{
      return <span className={page === i + 1 ? classes.pagination__selected : ""} onClick={()=>selectPageHandler(i+1)} key={i}>
        {i+1}
        </span>
    })}
    <span className={page < meals.length / 4 ? "" : classes.pagination__disable} onClick={()=>selectPageHandler(page + 1)}>▶</span>
  </div>}
  </React.Fragment>

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {pagination}
      </Card> 
    </section>
  );
};

export default AvailableMeals;