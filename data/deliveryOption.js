import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions =[{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

    deliveryOptions.forEach((option)=>{
      if (option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });

    return deliveryOption || deliveryOptions[0];
}

export function validDeliveryOption(deliveryOptionId){
  let found = false;

  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      found = true;
    }
  });

  return found ;
}

export function calculateDeliveryDate(deliveryOption){

    const today = dayjs();
    const normalDeliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    let deliveryDate;
    
    if(normalDeliveryDate.format('dddd') === 'Sunday'){
      deliveryDate = today.add((deliveryOption.deliveryDays)+ 1, 'days');
    } else if(normalDeliveryDate.format('dddd') === 'Saturday'){
      deliveryDate = today.add((deliveryOption.deliveryDays)+ 2, 'days');
    } else {
      deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    }
    const dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;
}