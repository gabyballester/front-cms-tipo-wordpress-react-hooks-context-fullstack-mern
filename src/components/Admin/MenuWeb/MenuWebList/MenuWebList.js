import { useState, useEffect } from "react";

export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;

  console.log(menu);
  return (
    <div>
      <h1>Menu web list</h1>
      {menu.map(item => (
        <p key={item._id}>{item.title}</p>
        ))}
    </div>
  )

}