const ctxBar = document.getElementById('bar-graph').getContext('2d');
const barGraph = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Daily Energy Usage (kWh)',
            data: [120, 150, 180, 170, 160, 190, 200],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Heatmap for energy usage over time
const ctxHeatmap = document.getElementById('heatmap').getContext('2d');
const heatmapData = {
    labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    datasets: [{
        label: 'Energy Usage (Wh)',
        data: [
            30, 28, 25, 20, 22, 35, 50, 70, 80, 90, 100, 110, 120, 130, 140, 135, 130, 125, 115, 110, 100, 80, 60, 50
        ],
        backgroundColor: function (context) {
            const value = context.dataset.data[context.dataIndex];
            const alpha = (value - 20) / (140 - 20);  // Normalize value to get alpha
            return `rgba(255, 99, 132, ${alpha})`;  // Red color with variable alpha
        },
        borderWidth: 1
    }]
};
const heatmap = new Chart(ctxHeatmap, {
    type: 'bar',
    data: heatmapData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function downloadReport() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Here you can fetch data from your server based on the date range
    // For this example, let's assume we have some sample data
    const data = [
        { date: '2024-05-01', usage: 100 },
        { date: '2024-05-02', usage: 120 },
        { date: '2024-05-03', usage: 110 },
        // Add more data as needed...
    ];

    // Filter data based on the date range
    const filteredData = data.filter(item => item.date >= startDate && item.date <= endDate);

    // Prepare the CSV content
    let csvContent = "Date,Energy Usage\n";
    filteredData.forEach(item => {
        csvContent += `${item.date},${item.usage}\n`;
    });

    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'energy_report.csv';
    link.click();
}