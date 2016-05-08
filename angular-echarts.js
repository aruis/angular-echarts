/**
 * Created by aruis on 16-5-8.
 */
angular.module('angular-echarts-aruis', [])
    .directive('echarts', function () {
        return {
            restrict: 'A',
            // template: '<div style="width:100%;height:100%;background-color: red"></div>'
            scope: {
                echartsData: "=",
                echartsOption: "="
            },
            link: function ($scope, $element, $attrs) {
                var myChart = echarts.init($element[0]);
                var title = $attrs.echartsTitle
                var label = $attrs.echartsLabel
                var x = $attrs.echartsX
                var y = $attrs.echartsY
                var type = $attrs.echarts

                var option = {
                    title: {
                        text: title
                    },
                    tooltip: {},
                    legend: {
                        data: [label]
                    },
                    xAxis: {data: []},
                    yAxis: {},
                    dataZoom: [
                        {   // 这个dataZoom组件，默认控制x轴。
                            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                            start: 10,      // 左边在 10% 的位置。
                            end: 60         // 右边在 60% 的位置。
                        }
                    ],
                    series: [{
                        name: label,
                        type: type
                    }]
                };

                $scope.$watch('echartsData', function (_value) {
                    option.xAxis.data = []
                    option.series[0].data = []

                    if (_value && _value.length > 0) {
                        _value.forEach(function (_item) {
                            option.xAxis.data.push(_item[x])
                            option.series[0].data.push(_item[y])
                        })
                    }

                    myChart.setOption(option);
                });
            }
        }
    })