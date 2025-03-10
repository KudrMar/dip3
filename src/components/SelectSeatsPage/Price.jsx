
import { useSelector } from 'react-redux';

export default function Price() {

   const { seats, seatsCount, services, coachList } = useSelector((state) => state.seats);

   const getTotalPrice = () => {
      if (seats) {
         let j = 0;
         let calculatePrice = 0;

         Object.entries(seats).forEach(([key, items]) => {
            const targetCoach = coachList.find(item => item.coach._id === key);
            if (services[key].wifi) {
               calculatePrice += targetCoach.coach.wifi_price;
            }
            if (services[key].linen && !targetCoach.coach.is_linens_included) {
               calculatePrice += targetCoach.coach.linens_price * (seatsCount.adult + seatsCount.child);
            }

            items.forEach(item => {
               j += j;
               if (j > seatsCount.adult) {
                  calculatePrice += (item.price * 0.5);
               } else {
                  calculatePrice += item.price;
               }
            });
         });


         return calculatePrice;
      }
      return 0;
   };

   return { getTotalPrice };
}