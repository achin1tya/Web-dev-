
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr=$('#street').val();
    var cityStr=$('#city').val();
    var address=streetStr+','+cityStr;
    // YOUR CODE GOES HERE!
    $greeting.text('So you want to live at '+address+'?');
    var streetViewUrl='http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'';
    $body.append('<img class="bgimg" src=" '+streetViewUrl+'">');

    //your NYTimes AJAX request goes here

 //    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	// url += '?' + $.param({
 //  	'api-key': "0d67dae32374408e8a25b4c0f45ebe0a"
	// });
	var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	NYTurl += '?' + $.param({
  	'api-key': "0d67dae32374408e8a25b4c0f45ebe0a",
  	'q': cityStr
	});
	// $.ajax({
 //  	url:url,
 //  	method: 'GET',
	// }).done(function(result) {
 //  	console.log(result);
	// }).fail(function(err) {
 //  	throw err;
	// });

	//$nytimes-header.text('New York Times Articles about'+cityStr);


    $.getJSON(NYTurl,function(data){

    	var articles=data.response.docs;
        console.log(articles[1].headline.main);
    	for(var i=0;i<articles.length;i++){
    		var article=articles[i];
    		$nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
    		//$('#nytimes-articles').append('<li>'+articles[i].headline.main+'</li>');
    	}
    }).error(function(e){
    	$('#nytimes-header').text('NewYork times Article could not be loaded');
    });

    //Wikipedia Api 
    var wikiUrl='http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallBack';
    $.ajax({
        url: wikiUrl,
        
        dataType:"jsonp",
        //jsonp: "callback",
        
        success: function(data) {
       // do something with data
            articleList=data[1];
            console.log(articleList[1]);
           for(var i=0;i<articleList.length;i++)
           {

            var articleStr=articleList[i];
            var url='https://en.wikipedia.org/wiki/'+articleStr;
            $wikiElem.append('<li><a href="'+url+'">'+articleStr+'</a></li>'); 
            }
        }
    });
    //  }).error(function (e){
    //     $('#wikipedia-header').text('Wikipedia Articles could not be loaded');
    // });
    // $.getJSON(wikiUrl,function(response){
    //         console.log(response[1][1]);
    //         articleList=response[1];
    //        for(var i=0;i<articleList.length;i++)
    //        {
    //         var articleStr=articleList[i];
    //         var url='https://en.wikipedia.org/wiki/'+articleStr;
    //         $wikiElem.append('<li><a href="'+url+'">'+articleStr+'</a></li>'); 
    //         }
    // });
    
    
    return false;
};

$('#form-container').submit(loadData);
