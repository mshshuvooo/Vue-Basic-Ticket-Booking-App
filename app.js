var app = Vue.createApp({
    data() {
      return {
        confirmedTicket: false,
        name: "",
        mobile: "",
        appliedCoupon: null,
        couponCode: "",
        coupons: [
            {
                code: "100TAKAOFF",
                discount: 100
            },
            {
                code: "200TAKAOFF",
                discount: 200
            }
        ],
        seatStates: {
          sold: {
            text: "Sold",
            color: "#ff0000"
          },
          available: {
            text: "Available",
            color: "#fff"
          },
          booked: {
            text: "Booked",
            color: "gray"
          },
          selected: {
            text: "Selected",
            color: "#00ff00"
          }
        },

        seats: [
            {
              name: "A1",
              type: "available",
              price: 500
            },
            {
              name: "A2",
              type: "available",
              price: 500
            },
            {
              name: "A3",
              type: "available",
              price: 500
            },
            {
              name: "A4",
              type: "available",
              price: 500
            },
            {
              name: "B1",
              type: "available",
              price: 450
            },
            {
              name: "B2",
              type: "available",
              price: 450
            },
            {
              name: "B3",
              type: "available",
              price: 450
            },
            {
              name: "B4",
              type: "available",
              price: 450
            },
            {
              name: "C1",
              type: "sold",
              price: 500
            },
            {
              name: "C2",
              type: "sold",
              price: 500
            },
            {
              name: "C3",
              type: "sold",
              price: 500
            },
            {
              name: "C4",
              type: "sold",
              price: 500
            },
            {
              name: "D1",
              type: "available",
              price: 400
            },
            {
              name: "D2",
              type: "available",
              price: 400
            },
            {
              name: "D3",
              type: "available",
              price: 400
            },
            {
              name: "D4",
              type: "available",
              price: 400
            },
            {
              name: "E1",
              type: "available",
              price: 300
            },
            {
              name: "E2",
              type: "available",
              price: 300
            },
            {
              name: "E3",
              type: "booked",
              price: 300
            },
            {
              name: "E4",
              type: "booked",
              price: 300
            },
            {
              name: "F1",
              type: "available",
              price: 300
            },
            {
              name: "F2",
              type: "available",
              price: 300
            },
            {
              name: "F3",
              type: "available",
              price: 300
            },
            {
              name: "F4",
              type: "available",
              price: 300
            }
          ]
      };
    },

    computed : {
        selectedSeats() {
            let selected = this.seats.filter( (item) => item.type === 'selected' );
            return selected;
        },

        totalCost(){
            let total = 0
            total = this.selectedSeats.reduce((a, b) => a + b.price, 0);
            total = this.appliedCoupon !== null ? total - this.appliedCoupon.discount : total
            return total;
        }
    },

    methods: {
        handleToggleSeat(i){
            let clickedSeat = this.seats[i];
            if(clickedSeat.type === 'sold' || clickedSeat.type === 'booked'){
                alert(`You can not select this seat. It's already ${clickedSeat.type}.`);
            }else if( clickedSeat.type == "available" && this.selectedSeats.length > 2 ){
                alert('You can not select more then 3 seats.');
            } else{
                clickedSeat.type = clickedSeat.type === 'available' ? 'selected' : 'available'
            }

            
        },

        handleBuyTicket(){
            if(!this.name || !this.mobile){
                alert('Plaese enter your name and mobile');
            }else{
                this.confirmedTicket = true;
            }
        },

        handleBookAgain(){
            this.confirmedTicket = false;
            this.name = '';
            this.mobile = '';
            this.appliedCoupon = '';

            this.selectedSeats.map( (seat) => seat.type = 'sold'  )
        }
    },

    watch : {
        couponCode(customersCoupon){
            if(customersCoupon.length === 10){
                let searchedCoupons =  this.coupons.filter( (item) => item.code === customersCoupon )
                if(searchedCoupons.length){
                    this.appliedCoupon = searchedCoupons[0];
                    this.couponCode = "";
                }else{
                    alert('Your coupon is not valid.');
                }
            }
        }
    }

   
  
  });
  
  app.mount("#app");