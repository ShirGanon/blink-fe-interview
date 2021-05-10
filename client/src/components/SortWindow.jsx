import React, {useState, useEffect} from "react";

export default function SortWindow(props) {
  const {patients, setPatients, show, restart} = props;
  const [nameBtn, setNameBtn] = useState(false);
  const [ageBtn, setAgeBtn] = useState(false);

  const sortByName = () =>{
    ageBtn && setAgeBtn(false);
    setNameBtn(true);
    //
    let arr = patients;
    arr.sort((a, b) => a.name.localeCompare(b.name));
    setPatients([...arr])
  }

  const sortByAge = () =>{
    nameBtn && setNameBtn(false);
    setAgeBtn(true);
    //
    let arr = patients;
    arr.sort((a, b) => {
      if(a.age > b.age) return 1
      else if(a.age < b.age) return -1
      return 0;
    });
    setPatients([...arr])
  }

  useEffect(() => {
    setNameBtn(false);
    setAgeBtn(false);
  }, [restart])

  return (
    <div className={show ? "sortWindow" : "hide sortWindow"}>
      <div className="sortBody">
        <div className={nameBtn ? 'sortSelect sortByNameDiv' : 'sortByNameDiv'} onClick={sortByName}>Name</div>
        <div className={ageBtn ? 'sortSelect sortByAgeDiv' : 'sortByAgeDiv'} onClick={sortByAge}>Age</div>
      </div>
    </div>
  );
}
