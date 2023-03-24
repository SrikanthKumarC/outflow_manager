import React from "react";
import Menu from "./Menu";
import "./menuNormalize.css";
import "./Category.css";
import { useState } from "react";
import PlusButton from "./PlusButton";
import {
  removeCategory,
  addCategory,
} from "../app/features/transactions/categorySlice";
import { CiCircleRemove } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  const categories = useSelector((state) => {
    return state.category;
  });
  const [category, setCategory] = useState("");
  
  const dispatch = useDispatch();

  return (
    <>
      <div className="contmain">
        <Menu selected="category" />
        <div className="cat_container">
          <h1>Categories</h1>
          <form action="">
            <input
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              placeholder="New Category"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addCategory(category));
              }}
            >
              Add category
            </button>
          </form>
          <div className="categoriesList">
            {categories.map((category) => {
              return (
                <div key={category} className="flex">
                  <p>{category} </p>
                  <CiCircleRemove
                    onClick={() => {
                      dispatch(removeCategory(category));
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <PlusButton />
    </>
  );
};

export default Category;
