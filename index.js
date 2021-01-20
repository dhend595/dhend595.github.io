const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.taken)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// update total cost and seats selector
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

//event listener for movie selector
movieSelect.addEventListener('change', e =>{
ticketPrice = +e.target.value
updateSelectedCount();
});

//event listener click for seats
container.addEventListener('click', e => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('taken'))
  {
  e.target.classList.toggle('selected')


  updateSelectedCount();

  }
});
