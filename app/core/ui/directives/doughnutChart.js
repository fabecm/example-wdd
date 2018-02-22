import $ from 'jquery';

import ChartJs from 'chart.js';
import template from './doughnutChart.template.html';

export function DoughnutChart ($timeout, $state) {
    'ngInject';

    return {
        scope: {
            arrayValues: '=',
            hideLabel: '@'
        },
        template: template,
        link: (scope) => {
            // if ($(window).width() >= 1200) {
            //     scope.width = 400;
            //     scope.height = 400;
            // } else
            if ($(window).width() >= 1025) {
                scope.width = 300;
                scope.height = 300;
            } else {
                scope.width = 250;
                scope.height = 250;
            }

            if ($state.$current.name === 'tab.dashboardSO' || $state.$current.name === 'tab.dashboardRequest') {
                scope.centeredLegend = true;
            }

            scope.chartId = `chart-${Math.floor((Math.random() * 100) + 1)}`;
            $timeout(() => {
                scope.chart = document.getElementById(scope.chartId);

                const emptyColor = ['#707c8e'];
                const emptyData = [1];

                const ctx = document.getElementById(scope.chartId).getContext('2d');
                const chartWidth = scope.chart.clientWidth;
                const chartHeight = scope.chart.clientHeight;

                scope.numLabelChart = 0;
                // let arrayBackgroundColor = emptyColor.map(e => generateColor(e, 1));
                let arrayBackgroundColor;
                let arrayHoverColor;
                // let arrayHoverColor = emptyColor.map(e => generateColor(e, 0.8));
                let valueArray = emptyData;
                let labelArray = [];

                scope.arrayValues.map(e => {
                    scope.numLabelChart += Number(e.value);
                });

                if (scope.numLabelChart === 0) {
                    scope.chartElements = Array(1);
                    scope.chartElements[0] = {
                        color: emptyColor[0],
                        value: emptyData[0]
                    };
                } else {
                    scope.chartElements = angular.copy(scope.arrayValues);
                }


                if (scope.chartElements.length > 0) {
                    // arrayBackgroundColor = scope.chartElements.map(e => generateColor(e.color, 1));
                    arrayBackgroundColor = scope.chartElements.map(e => {
                        var x = ctx.createRadialGradient(
                            chartWidth/2,
                            chartHeight/2+10,
                            0.00,
                            chartWidth/2,
                            chartHeight/2+5,
                            chartWidth*2/5);

                        let inColor = generateColor(e.color, 1);
                        let outColor = generateColor(e.color, 0.85);

                        x.addColorStop(0.00, inColor);
                        x.addColorStop(0.90, inColor);
                        x.addColorStop(0.90, outColor);
                        x.addColorStop(1.00, outColor);
                        return x;
                    });

                    // arrayHoverColor = scope.chartElements.map(e => generateColor(e.color, 0.8));
                    arrayHoverColor = scope.chartElements.map(e => {
                        var x = ctx.createRadialGradient(
                            chartWidth/2,
                            chartHeight/2+10,
                            0.00,
                            chartWidth/2,
                            chartHeight/2+5,
                            chartWidth*2/5);

                        let inColor = generateColor(e.color, 0.8);
                        let outColor = generateColor(e.color, 0.65);

                        x.addColorStop(0.00, inColor);
                        x.addColorStop(0.90, inColor);
                        x.addColorStop(0.90, outColor);
                        x.addColorStop(1.00, outColor);
                        return x;
                    });

                    labelArray = scope.arrayValues.map(e => {
                        return ({
                            label: e.label,
                            value: e.value
                        });
                    });
                    valueArray = scope.chartElements.map(e => e.value);
                }


                scope.valueArray = valueArray;
                scope.labelArray = labelArray;
                scope.arrayBackgroundColor = arrayBackgroundColor;
                scope.showLegend = !!labelArray.length;

                let myChart = new ChartJs(ctx, { // eslint-disable-line no-unused-vars
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: valueArray,
                            backgroundColor: arrayBackgroundColor,
                            hoverBackgroundColor: arrayHoverColor
                        }]
                    },
                    options: {
                        responsive: false,
                        cutoutPercentage: 65,
                        tooltips: {
                            enabled: false
                        },
                        onClick: (context, elem) => {
                            if (elem && elem.length > 0) {
                                scope.goToChild(elem[0]._index);
                            } else {
                                return;
                            }
                        }
                    }
                });

                scope.goToChild = (index) => {
                    $state.go(scope.arrayValues[index].childPage);
                };
            });
        }
    };
}

function generateColor (color, alpha) {
    let rgbObj = hexToRgb(color);
    return `rgba(${rgbObj.r},${rgbObj.g},${rgbObj.b}, ${alpha})`;
}

function hexToRgb (hex) {
    var result = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex);
    if (result) {
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    }

    return null;
}
