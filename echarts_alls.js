
echartsXdata=[]
seriesData = []
seriesName = []
//柱状堆积图 柱状图
//折线图 折线堆积图
function bar(echartsID,echartsXdata,seriesData,seriesName,lation,types,echartsColor){
	var series = []
		if (typeof(echartsID) == "undefined") {
            //alert("value is undefined"); 
           console.log('请传入容器ID名称')
        }
        if (typeof(echartsColor) == "undefined") {
            //alert("value is undefined"); 
           echartsColor = ['#91c7ae','#d48265','#61a0a8','#2f4554','#c23531']
        }
        if (typeof(echartsXdata) == "undefined" || echartsXdata == false) {
            //alert("value is undefined"); 
            echartsXdata = ['2011', '2012', '2013', '2014', '2015', '2016', '2017']
        }
        if(typeof(types) == "undefined" || types == false){
        	types = 'bar'
        }else if(types == true){
        	types = 'line'
        }
        if (typeof(seriesData) == "undefined" || seriesData == false ) {
            //alert("value is undefined"); 
           series.push({
		            name:'直接访问',
		            type:types,
		            data:[10, 52, 200, 334, 390, 330, 220]
		        },)
        }
        	if (typeof(seriesName) == "undefined" || seriesName == false) {
            //alert("value is undefined"); 
           		series.push({
		            name:'直接访问',
		            type:types,
		            data:[10, 52, 200, 334, 390, 330, 220]
		        },)
        	}
        	else if(seriesName.length>1){
        		var arr = seriesName.concat(seriesData)
        		if(lation == false || typeof(lation) == "undefined" ){
        			for(i = 0; i < arr.length-seriesName.length;i++){
        				series.push({
				            name:arr[i],
				            type:types,
				            data:arr[i+seriesName.length]
				        },)
			    	}
        		}else if(lation == true){
        			for(i = 0; i < arr.length-seriesName.length;i++){
        				series.push({
				            name:arr[i],
				            type:types,
				            stack: arr[0],
				            data:arr[i+(seriesName.length)]
				        },)
			    	}
        		}
        	}else if(seriesName.length < 2){
        		if(lation == false || typeof(lation) == "undefined" ){
        				series = [{
				            name:seriesName,
				            type:types,
				            data:seriesData
				        }]
        		}
        	}
	var myChart = echarts.init(document.getElementById(echartsID));
	option = {
    color:echartsColor,
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        top:'3%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : echartsXdata,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
        }
    ],
    series :series
};
    myChart.setOption(option);
}


//环形图
function pie(echartsID,seriesData,echartsName,radius,roseType,echartsColor){
	if (typeof(echartsID) == "undefined") {
            //alert("value is undefined"); 
           console.log('请传入容器ID名称')
        }
        if (typeof(echartsName) == "undefined" || echartsName == false) {
           echartsName = '访问来源'
        }
        if(typeof(radius) == "undefined" ||radius == false){
        	radius = '55%'
        }
        if(typeof(roseType) == "undefined" ||roseType == false){
        	roseType = ''
        }
        if (typeof(echartsColor) == "undefined") {
            //alert("value is undefined"); 
           echartsColor = ['#91c7ae','#d48265','#61a0a8','#2f4554','#c23531']
        }
        if (typeof(seriesData) == "undefined" || seriesData == false ) {
            //alert("value is undefined"); 
           series.push(
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            )
           console.log(series)
        }else{
        	series = seriesData
        }
	var myChart = echarts.init(document.getElementById(echartsID));
option = {
	color:echartsColor,
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:echartsName,
            type:'pie',
            radius:radius,
            data:series,
            roseType: roseType,
        }
    ]
};
myChart.setOption(option);
}
//地图
function map(echartsID,type,borderColor,linColor,areaColor){
	if(typeof(echartsID) == "undefined"){
		console.log('请传入容器ID名称')
	}
	if(typeof(linColor) == "undefined"||linColor == false){
		linColor = '#ccc'
	}
	if(typeof(borderColor) == "undefined" ||borderColor == false){
		borderColor = '#000'
	}
	if(typeof(areaColor) == "undefined" || areaColor == false){
		areaColor = '#050'
	}
	if(typeof(type) == "undefined" || type == false){
		type = 'world'
	}
$.get('data/'+type+'.json', function (chinaJson) {
	echarts.registerMap(type, chinaJson);
	var myChart = echarts.init(document.getElementById(echartsID));
	option = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}'
    },
    geo: [
        {
            name: '世界地图',
            type: 'map',
            map:type ,
            roam: true,
            selectedMode : 'single',
            label:{
                normal: {
                    show:false,
                },
                emphasis: {
                    label:{
                        show:true
                    }
                }
            },
            itemStyle:{
                normal:{
                	borderColor:borderColor,
                	color:linColor
                },
                emphasis:{
                	areaColor:areaColor,
                }
            }
        }
    ],
    series: []
};
	    myChart.setOption(option);
	})
	
}
