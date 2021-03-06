﻿(function(cms, $) {
    'use strict';

    var googleAnalyticsBusyIndicator;

    cms.home = {
        init: init,
        googleApiAuthorised: googleApiAuthorised
    };

    function init() {

        initControls();
    }

    function initControls() {
        googleAnalyticsBusyIndicator = $('#googleAnalyticsBusyIndicator');
    }

    function googleApiAuthorised(gaAccount, gaHistory) {

        googleAnalyticsBusyIndicator.show();

        var endDate = new Date().format("yyyy-mm-dd");

        var days = (24 * 60 * 60 * 1000) * gaHistory;
        var startDate = new Date();
        startDate.setTime(startDate.getTime() - days);
        startDate = startDate.format("yyyy-mm-dd");

        var apiQuery = gapi.client.analytics.data.ga.get({
            'ids': 'ga:' + gaAccount,
            'start-date': startDate,
            'end-date': endDate,
            'dimensions': 'ga:date',
            'metrics': 'ga:visits',
            'max-results': 50
        });

        apiQuery.execute(printResults);
    }
    
    function printResults(results) {

        googleAnalyticsBusyIndicator.hide();

        var googleAnalyticsResult = document.getElementById('googleAnalyticsResult');

        if (results.rows && results.rows.length) {

            var chartData = getVisitorChartData(results);

            new google.visualization.AreaChart(googleAnalyticsResult).
            draw(chartData.data, {
                curveType: "none",
                width: googleAnalyticsResult.clientWidth -20, height: 150, // 20px is the offset of the padding of the fluid-container
                vAxis: {
                    maxValue: chartData.maxVisits,
                    minValue: 0,
                    gridlines: { color: '#ccc', count: 1 },
                },
                hAxis: {
                    showTextEvery: 3,
                    textStyle: { fontSize: 10 },
                    slantedTextAngle: 45
                },
                series: [{ color: 'blue', areaOpacity: 0.20 }, { areaOpacity: 0 }]
            }
            );
        }
        else {
            googleAnalyticsResult.innerHtml = "no google analytics result found!";
        }
    }

    function getVisitorChartData(result) {
        var arrayNumber = 0;
        var rows = result.rows;
        var arrayOfData = new Array(rows.length);
        var maxVisits = 0;
        var avg = 0, total = 0;

        for (var j = 0; j < rows.length; j++) {
            total = total + parseInt(rows[j][1], 10);
        }
        avg = total / rows.length;

        arrayOfData[arrayNumber] = new Array(3);
        arrayOfData[arrayNumber][0] = 'x';
        arrayOfData[arrayNumber][1] = 'Visits';
        arrayOfData[arrayNumber][2] = 'avg.';

        for (var i = 0; i < rows.length; i++) {

            arrayNumber++;
            arrayOfData[arrayNumber] = new Array(2);

            var row = rows[i];
            var day = row[0];
            var numVisits = parseInt(row[1], 10);

            var dayPart = day.substring(6, 8);
            var monthPart = day.substring(4, 6);
            var yearPart = day.substring(0, 4);

            var formattedDate = dayPart + '-' + monthPart + '-' + yearPart;

            arrayOfData[arrayNumber][0] = formattedDate;
            arrayOfData[arrayNumber][1] = numVisits;
            arrayOfData[arrayNumber][2] = avg;

            if (numVisits >= maxVisits) {
                maxVisits = numVisits;
            }
        }

        return {
            maxVisits: maxVisits,
            data: google.visualization.arrayToDataTable(arrayOfData)
        };
    }

}(window.cms = window.cms || { }, jQuery));