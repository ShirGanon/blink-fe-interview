import React,{useState} from 'react';

import FilterWindow from './FilterWindow';
import SortWindow from './SortWindow';
import Card from './Card';

import data from '../data/patients.json';
import filterIcon from '../filter.svg';
import sortIcon from '../sort.svg';
import restartIcon from '../restart.svg';


export default function Dashboard() {
    const [patients, setPatients] = useState(data);
    const [filteredData, setFilteredData] = useState([...patients]);
    const [filterStatus, setFilterStatus] = useState(false);
    const [sortStatus, setSortStatus] = useState(false);
    const [restart, setRestart] = useState(false);


    const onFilter = () =>{
        sortStatus && setSortStatus(false);
        setFilterStatus(!filterStatus);
    }

    const onSort = () =>{
        filterStatus && setFilterStatus(false);
        setSortStatus(!sortStatus);
    }

    const onRestart = () =>{
        setFilteredData([...patients]);
        setRestart(!restart);
    }

    return (
        <div>
            <div className="dashboardHeader">
                <h1>Patients Dashboard</h1>
                <img src={filterIcon} alt="filter" className="filterBtn" onClick={onFilter}/>
                <img src={sortIcon} alt="sort" className="sortBtn" onClick={onSort}/>
                <img src={restartIcon} alt="restart" className="restartBtn" onClick={onRestart}/>
                <FilterWindow show={filterStatus} patients={patients} setFilteredData={setFilteredData} restart={restart}/>
                <SortWindow show={sortStatus} patients={filteredData} setPatients={setFilteredData} restart={restart} />
            </div>
            <div className="dashboard">
                {filteredData.map((item) =>{
                    return <div key={item.id}><Card patient={item}/></div>
                })}
            </div>
        </div>
    )
}
