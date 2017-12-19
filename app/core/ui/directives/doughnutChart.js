import ChartJs from 'chart.js';
import { random } from 'faker';
import template from './doughnutChart.template.html';

export function DoughnutChart ($timeout, $state, $log) {
    'ngInject';

    return {
        scope: {
            arrayValues: '=',
            hideLabel: '@'
        },
        template: template,
        link: (scope) => {
            scope.chartId = random.number();
            $timeout(() => {
                scope.chart = document.getElementById(scope.chartId);

                const emptyColor = ['#707c8e'];
                const emptyData = [1];

                scope.numLabelChart = 0;
                let arrayBackgroundColor = emptyColor.map(e => generateColor(e, 1));
                let arrayHoverColor = emptyColor.map(e => generateColor(e, 0.8));
                let valueArray = emptyData;
                let labelArray = [];

                if (scope.arrayValues.length > 0) {
                    scope.arrayValues.map(e => {
                        scope.numLabelChart += Number(e.value);
                    });
                    arrayBackgroundColor = scope.arrayValues.map(e => generateColor(e.color, 1));
                    arrayHoverColor = scope.arrayValues.map(e => generateColor(e.color, 0.8));
                    labelArray = scope.arrayValues.map(e => e.label);
                    valueArray = scope.arrayValues.map(e => e.value);
                }

                const ctx = document.getElementById(scope.chartId).getContext('2d');

                scope.valueArray = valueArray;
                scope.labelArray = labelArray;
                scope.arrayBackgroundColor = arrayBackgroundColor;
                scope.showLegend = !!labelArray.length;

                let myChart = new ChartJs(ctx, {
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
                $log.debug(myChart, labelArray);

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
