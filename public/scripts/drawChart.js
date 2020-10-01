(function loadData() {
    this.rawData = [21.937971, 21.887972, 21.537971, 21.307972, 20.737972, 20.897972, 22.327972, 24.087973, 25.407972, 26.287971, 25.687971, 25.437971, 24.757973, 24.487972, 24.277971, 24.297972, 23.977972, 23.497972, 22.367971, 22.487972, 22.467972, 22.507973, 22.517971, 22.427973, 22.357971, 22.097973, 21.597973, 21.857971, 22.157972, 22.377972, 22.347973, 23.347973, 24.847973, 26.117971, 26.207972, 25.757973, 25.357971, 24.977972, 24.677973, 24.667973, 24.157972, 23.887972, 22.557972, 22.907972, 23.047972, 23.257973, 23.197971, 22.907972, 22.807972, 22.797972, 22.527971, 22.317972, 22.207972, 22.077972, 22.147972, 23.887972, 24.987972, 26.337973, 27.717972, 28.227972, 27.157972, 25.917973, 25.157972, 24.087973, 23.707972, 23.837973, 22.587973, 22.427973, 22.417973, 22.637972, 22.807972, 22.917973, 22.787971, 22.687971, 22.917973, 22.107971, 21.997972, 21.577972, 21.627972, 23.967972, 25.737972, 27.217972, 28.227972, 28.517971, 27.177973, 26.347973, 25.567972, 25.207972, 25.437971, 24.787971, 23.157972, 22.657972, 22.457972, 22.617971, 22.777971, 22.667973, 22.587973, 22.467972, 22.367971, 22.437971, 22.527971, 22.947971, 22.677973, 24.107971, 24.877972, 26.107971, 27.617971, 28.197971, 28.267971, 26.687971, 25.767971, 25.257973, 23.747972, 23.267971, 22.467972, 22.447971, 22.467972, 22.687971, 22.767971, 22.667973, 23.267971, 23.197971, 22.917973, 22.857971, 23.257973, 22.687971, 22.487972, 23.957972, 25.227972, 27.097973, 28.997972, 29.647972, 26.447971, 24.697971, 23.687971, 24.927973, 25.917973, 26.137972, 24.777971, 23.987972, 23.507973, 23.997972, 24.177973, 24.227972, 23.767971, 22.977972, 22.587973, 22.587973, 22.967972, 22.777971, 22.347973, 24.077972, 25.827972, 27.277971, 29.137972, 30.107971, 28.077972, 25.687971, 24.437971, 24.257973, 23.907972, 23.507973, 22.807972, 22.587973, 22.677973, 23.107971, 23.937971, 23.637972, 23.497972, 23.157972, 22.747972, 22.547972, 22.517971, 22.567972, 22.827972, 24.767971, 26.277971, 27.407972, 28.187971, 28.697971, 28.047972, 28.117971, 24.917973, 25.467972, 24.337973, 23.407972, 22.007973, 21.557972, 21.387972, 21.687971, 22.077972, 22.147972];
    this.dataPoints = [];
    let dateTemp = `_month_ _date_ 2020`;
    let incrementMonth = 5;
    let incrementDay = 1;
    this.rawData.forEach(dataPoint => {
        this.dataPoints.push({
            x: new Date(dateTemp.replace('_date_', incrementDay).replace('_month_', incrementMonth)),
            y: dataPoint,
        });
        if (incrementDay % 30 === 0) {
            incrementMonth += 1;
            incrementDay = 1;
        } else {
            incrementDay += 1;
        }
    });

    let oDiv = document.getElementById('overlaid-div');
    oDiv.style.left = (window.innerWidth - oDiv.getBoundingClientRect().width) * 0.5 + "px";
    oDiv.style.top = (window.innerHeight - oDiv.getBoundingClientRect().height) * 0.5 + "px";

})();




function showhideLoader(isVisible) {
    if (isVisible) {
        document.getElementById('overlaid-div').style.visibility = 'visible';
    } else {
        document.getElementById('overlaid-div').style.visibility = 'hidden';
    }
}

function drawAfterDelay(type) {
    showhideLoader(false);
    if (type === '') {
        return;
    }
    var chart = new CanvasJS.Chart("chart-div", {

        title: {
            text: "Pune Weather Temperature"
        },
        zoomEnabled: true,
        zoomType: "xy",
        data: [{
            markerType: "triangle",
            type: type || "column",
            lineThickness: 2.5,
            bevelEnabled: true,
            dataPoints: this.dataPoints
        }]
    });
    chart.render();
}

function drawCharts(type) {
    type !== '' ? showhideLoader(true) : "";
    document.getElementById('chart-div').innerHTML = '';
    setTimeout(() => {
        drawAfterDelay(type);
    }, 1000);
}

function triggerClick(event) {
    console.log(event.value);
    drawCharts(event.value);
}