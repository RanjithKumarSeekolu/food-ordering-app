import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import React, { useContext, useEffect, useState } from "react";
import cartContext from "../../store/cart-context";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const cartCtx = useContext(cartContext);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  const searchChange = (e) => {
    setSearchInput(e.target.value);
  };
  cartCtx.searchChangeHandler = searchChange;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://react-http-94dfa-default-rtdb.firebaseio.com/meals.json/"
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
            rating: responseData[key].rating,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    fetchMeals();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const sortMealsHandler = (order) => {
    setSortOrder(order);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  let sortedMeals = [...meals];

  if (sortOrder === "asc") {
    sortedMeals.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    sortedMeals.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "highest-rating") {
    sortedMeals.sort((a, b) => b.rating - a.rating);
  } else if (sortOrder === "lowest-rating") {
    sortedMeals.sort((a, b) => a.rating - b.rating);
  }

  const mealsList = sortedMeals
    .filter((meal) =>
      searchInput === ""
        ? true
        : meal.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .slice(startIndex, endIndex)
    .map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        rating={meal.rating}
      />
    ));

  return (
    <section className={classes.meals}>
      <Card>
        <div className={classes.sort}>
          <label htmlFor="sortOrder">Sort by:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => sortMealsHandler(e.target.value)}
          >
            <option value="asc">Lowest Price</option>
            <option value="desc">Highest Price</option>
            <option value="highest-rating">Highest Price</option>
            <option value="lowest-rating">Lowest Price</option>
          </select>
        </div>
        {isLoading && <p className={classes.loading}>Loading...</p>}
        {httpError && <p className={classes.error}>{httpError}</p>}
        {!isLoading && !httpError && (
          <React.Fragment>
            <ul>{mealsList}</ul>
            <div className={classes.pagination}>
              <span
                className={page > 1 ? "" : classes.pagination__disable}
                onClick={() => selectPageHandler(page - 1)}
              >
                ◀
              </span>
              {[...Array(totalPages)].map((_, i) => (
                <span
                  className={page === i + 1 ? classes.pagination__selected : ""}
                  onClick={() => selectPageHandler(i + 1)}
                  key={i}
                >
                  {i + 1}
                </span>
              ))}
              <span
                className={page < totalPages ? "" : classes.pagination__disable}
                onClick={() => selectPageHandler(page + 1)}
              >
                ▶
              </span>
            </div>
          </React.Fragment>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
