import { useState } from "react";
import TodoItem from "./component/TodoItem";
import TodoList from "./component/TodoList";

export default async function Home() {
  console.log('render home');
  
  const todoItems = {
    forenoon:[],
    afternoon:[],
    tonight:[]
  }

  return (
    <>
     <div>
      <TodoList title="上午" list={todoItems.forenoon}></TodoList>
      <div>下午</div>
      <div>今晚</div>
     </div>
    </>
  );
}
