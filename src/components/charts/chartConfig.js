export const data = {
  labels: [
    'KCAL',
    'CARBS',
    'SUGAR',
    'FAT',
    'PROTEIN',
    ],
  datasets: [
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 39, 96, 100],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  width: 100
};
