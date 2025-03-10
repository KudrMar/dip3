import React from 'react';


const ProgressLineCost = ({ className }) => {

   const colorClasses = {
      1: {
         classNameColorPassengers: "navColorBlack",
         classNameColorPayments: "navColorBlack",
         classNameColorCheck: "navColorBlack",
         classNamePicTicket: "Yl_Bl",
         classNamePicPassengers: "Bl_Bl",
         classNamePicPaiment: "Bl_Bl",
      },
      2: {
         classNameColorPassengers: "navColorYellow",
         classNameColorPayments: "navColorBlack",
         classNameColorCheck: "navColorBlack",
         classNamePicTicket: "Yl_Yl",
         classNamePicPassengers: "Yl_Bl",
         classNamePicPaiment: "Bl_Bl",
      },
      3: {
         classNameColorPassengers: "navColorYellow",
         classNameColorPayments: "navColorYellow",
         classNameColorCheck: "navColorBlack",
         classNamePicTicket: "Yl_Yl",
         classNamePicPassengers: "Yl_Yl",
         classNamePicPaiment: "Yl_Bl",
      },
      4: {
         classNameColorPassengers: "navColorYellow",
         classNameColorPayments: "navColorYellow",
         classNameColorCheck: "navColorYellow",
         classNamePicTicket: "Yl_Yl",
         classNamePicPassengers: "Yl_Yl",
         classNamePicPaiment: "Yl_Yl",
         theLastBlockColor: "progressNav-theLastBlockColor-yellow"
      },
   };

   const { classNameColorPassengers, classNameColorPayments, classNameColorCheck,
      classNamePicTicket,classNamePicPassengers,classNamePicPaiment, theLastBlockColor = ''} = colorClasses[className] || colorClasses[1];

   return (
      <div className="progressNav-section">
         <div className="progressNav-blockYellow"></div>
         <div className="progressNav-list">
            <div className="progressNav-item navColorYellow">
               <p className="progressNav-item-step">1</p>
               <p className="progressNav-item-text">Билеты</p>
               <div className={"progressNav-item-pic " + classNamePicTicket}/>
            </div>
            <div className={"progressNav-item " + classNameColorPassengers}>
               <p className="progressNav-item-step">2</p>
               <p className="progressNav-item-text">Пассажиры</p>
               <div className={"progressNav-item-pic " + classNamePicPassengers}/>
            </div>
            <div className={"progressNav-item " + classNameColorPayments}>
               <p className="progressNav-item-step">3</p>
               <p className="progressNav-item-text">Оплата</p>
               <div className={"progressNav-item-pic " + classNamePicPaiment}/>
            </div>
            <div className={"progressNav-item " + classNameColorCheck}>
               <p className="progressNav-item-step">4</p>
               <p className="progressNav-item-text">Проверка</p>
               {/* <div className="progressNav-item-pic"/> */}
            </div>
         </div>
         <div className={"progressNav-blockYBlack " + theLastBlockColor}></div>
      </div>
   );
};
export default ProgressLineCost;