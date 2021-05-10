import React from 'react'

export default function Card(props) {
    const {patient} = props;
    return (
        <div className="itemCard">
            <div className="cardHeader">
                <h2>{patient.name}</h2>
                <h3>{patient.id}</h3>
                <h4 className="ageTitle">{patient.age}</h4>
            </div>
            <div className="cardBody">
                <div>
                    <p>{patient.acceptedOffers}</p>
                    <p>AcceptedOffers</p>
                </div>
                <div>
                    <p>{patient.canceledOffers}</p>
                    <p>CanceledOffers</p>
                </div>
                <div>
                    <p>{patient.averageReplyTime}</p>
                    <p>AverageReplyTime</p>
                </div>
            </div>
        </div>
    )
}
