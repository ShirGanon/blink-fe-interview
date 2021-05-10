import React, {useState, useEffect} from "react";

export default function FilterWindow(props) {
  const {patients, setFilteredData, show, restart} = props;

  const [ageBtn, setAgeBtn] = useState(false);
  const [avgReplyTimeBtn, setavgReplyTimeBtn] = useState(false);

  const [ages, setAges] = useState([]);
  const [avgReplyTimes, setAvgReplyTimes] = useState([]);

  const [filteredAges, setFilteredAges] = useState([]);
  const [filteredAvgReplyTimes, setFilteredAvgReplyTimes] = useState([]);

  //creates a list of all unique ages
  const filterAge = () =>{
    let arr = [...patients];
    arr.sort((a, b) => {
      if(a.age > b.age) return 1
      else if(a.age < b.age) return -1
      return 0;
    });
    //
    let res = [];
    arr.filter((item)=>{
      const i = res.findIndex(x => (x === item.age))
      i < 0 && res.push(item.age);
    })
    setAges(res);
    setAgeBtn(!ageBtn); 
  }

  //creates a list of all unique AverageReplyTimes
  const filterAverageReplyTime = () =>{
    let arr = [...patients];
    arr.sort((a, b) => {
      if(a.averageReplyTime > b.averageReplyTime) return 1
      else if(a.averageReplyTime < b.averageReplyTime) return -1
      return 0;
    });
    //
    let res = [];
    arr.filter((item)=>{
      const i = res.findIndex(x => (x === item.averageReplyTime))
      i < 0 && res.push(item.averageReplyTime);
    })
    setAvgReplyTimes(res);
    setavgReplyTimeBtn(!avgReplyTimeBtn); 
  }

  //on sub filter click - css change and update of the filtered state
  const onFilterMark = (event, value, type) =>{
    let temp = [];
    type === 'age' ? temp = filteredAges : temp = filteredAvgReplyTimes;
    if(temp.includes(value)){
      event.target.className ="";
      
      const index = temp.indexOf(value);
      index > -1 && temp.splice(index, 1);
    }
    else{
      event.target.className ="subFilterSelected";
      temp.push(value);
    }
    if(type === 'age'){
      setFilteredAges(temp);
    }else{
      setFilteredAvgReplyTimes(temp);
    } 
    mainFilter();
  }
  

  const mainFilter = () =>{
    if(filteredAges.length === 0 && filteredAvgReplyTimes.length === 0) setFilteredData(patients);
    else{
      const res = patients.filter(x =>{
        return filteredAges.includes(x.age) || filteredAvgReplyTimes.includes(x.averageReplyTime);
      })
      setFilteredData(res);
    }
  }

  //on restart event
  useEffect(() => {
    setFilteredAges([]);
    setFilteredAvgReplyTimes([]);
  }, [restart])


  return (
    <div className={show ? "filterWindow" : "hide filterWindow"}>
      <div className="filterBody">
        <div>
          <p className={filteredAges.length > 0 ? "onFilterChecked filterAgeBtn" : "filterAgeBtn"} onClick={filterAge}>Age</p>  
          {ageBtn &&
            <ul className="filterList">
              {ages.map(x =>{
                return <li className={filteredAges.includes(x) ? 'subFilterSelected' : null} key={x} onClick={(e)=>onFilterMark(e, x, 'age')}>{x}</li>
              })}
            </ul>
          }
        </div>
        <div>
          <p className={filteredAvgReplyTimes.length > 0 ? "onFilterChecked filterAvgReplyTimeBtn" : "filterAvgReplyTimeBtn"} onClick={filterAverageReplyTime}>AverageReplyTime</p>
          {avgReplyTimeBtn && 
          <ul className="filterList">
            {avgReplyTimes.map(x =>{
              return <li className={filteredAvgReplyTimes.includes(x) ? 'subFilterSelected' : null} key={x} onClick={(e)=>onFilterMark(e, x, 'AverageReplyTime')}>{x}</li>
            })}
          </ul>
          }
        </div>
      </div>
    </div>
  );
}
